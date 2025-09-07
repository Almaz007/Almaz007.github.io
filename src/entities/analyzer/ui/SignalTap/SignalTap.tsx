import React, { useMemo, useState, useRef, useEffect } from "react";

// ---------------------- Types ----------------------
export type TDataType = "int" | "float" | "bool" | "analog";

export type SignalForOffset = {
    offset: number;
    name?: string;
    times: number[]; // ms ascending
    values: number[]; // same length as times
    dataType: TDataType;
};

type SignalRecord = {
    time: number;
    offset: number;
    value: number;
    duration: number;
    endTime: number;
    dataType?: TDataType;
};

type SignalTapProps = {
    signals: SignalForOffset[];
    initialPxPerMs?: number;
    minBlockWidthPx?: number;
    blockHeight?: number;
    ySpacing?: number;
    leftMargin?: number;
    rightMargin?: number;
    topMargin?: number;
    defaultDurationMs?: number;
    showGrid?: boolean;
    labelWidth?: number; // minimal width reserved for labels on the left (will be expanded if needed)
};

// ---------------------- Helpers ----------------------
function computeDurations(
    signal: SignalForOffset,
    defaultDurationMs = 1,
    globalMaxEnd?: number
): SignalRecord[] {
    const records: SignalRecord[] = [];
    const n = signal.times.length;
    for (let i = 0; i < n; i++) {
        const start = signal.times[i];
        let end = i < n - 1 ? signal.times[i + 1] : undefined;
        if (end === undefined && globalMaxEnd !== undefined) end = globalMaxEnd;
        end = end ?? start + defaultDurationMs;
        let duration = end - start;
        if (duration <= 0) duration = defaultDurationMs;
        records.push({
            time: start,
            offset: signal.offset,
            value: signal.values[i],
            duration,
            endTime: end,
            dataType: signal.dataType,
        });
    }
    return records;
}

function niceTickStep(msRange: number, targetTicks = 8) {
    if (msRange <= 0) return 1;
    const raw = msRange / targetTicks;
    const pow10 = Math.pow(10, Math.floor(Math.log10(raw)));
    const candidates = [1, 2, 5].map((m) => m * pow10);
    for (const c of candidates) if (raw <= c) return c;
    return 10 * pow10;
}

// ---------------------- Component ----------------------
export const SignalTap: React.FC<SignalTapProps> = ({
    signals,
    initialPxPerMs = 20,
    minBlockWidthPx = 2,
    blockHeight = 18,
    ySpacing = 8,
    leftMargin = 60,
    rightMargin = 20,
    topMargin = 8,
    defaultDurationMs = 1,
    showGrid = true,
    labelWidth = 140, // minimal label width; will be enlarged if needed to fit names
}) => {
    // global max end (last time + defaultDurationMs) so last segments stretch
    const maxEndTimeWithDuration = useMemo(() => {
        return signals.reduce((max, s) => {
            const lastIdx = s.times.length - 1;
            if (lastIdx < 0) return max;
            const end = s.times[lastIdx] + defaultDurationMs;
            return Math.max(max, end);
        }, 0);
    }, [signals, defaultDurationMs]);

    // build records for all signals
    const records = useMemo(() => {
        return signals.flatMap((s) =>
            computeDurations(s, defaultDurationMs, maxEndTimeWithDuration)
        );
    }, [signals, defaultDurationMs, maxEndTimeWithDuration]);

    const minStartTime = useMemo(() => {
        return records.length ? Math.min(...records.map((r) => r.time)) : 0;
    }, [records]);

    const timeRange = Math.max(1, maxEndTimeWithDuration - minStartTime);

    // ordered unique offsets (stable ordering)
    const offsetsOrdered = useMemo(() => {
        const uniq = Array.from(new Set(signals.map((s) => s.offset)));
        uniq.sort((a, b) => a - b);
        return uniq;
    }, [signals]);

    const maxOffset = offsetsOrdered.length ? Math.max(...offsetsOrdered) : 0;

    // group records by offset and sort
    const recordsByOffset = useMemo(() => {
        const m = new Map<number, SignalRecord[]>();
        for (const r of records) {
            const arr = m.get(r.offset) ?? [];
            arr.push(r);
            m.set(r.offset, arr);
        }
        for (const arr of m.values()) arr.sort((a, b) => a.time - b.time);
        return m;
    }, [records]);

    // compute actual required label width so names are shown fully
    const measuredLabelWidth = useMemo(() => {
        // if document not available (SSR) fall back to provided labelWidth
        if (typeof document === "undefined") return labelWidth;
        try {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return labelWidth;
            // match font used in component
            ctx.font = "12px Inter, Roboto, system-ui, sans-serif";
            let max = 0;
            for (const s of signals) {
                const name = s?.name ?? `Offset ${s.offset}`;
                const w = ctx.measureText(name).width;
                if (w > max) max = w;
            }
            // padding to keep text from touching edge
            const padding = 16;
            return Math.ceil(max + padding);
        } catch {
            return labelWidth;
        }
    }, [signals, labelWidth]);

    const finalLabelWidth = Math.max(labelWidth, measuredLabelWidth);

    const effectiveLeft = leftMargin + finalLabelWidth; // shift drawing area right by label width

    const [pxPerMs, setPxPerMs] = useState<number>(initialPxPerMs);
    const [tooltip, setTooltip] = useState<null | {
        x: number;
        y: number;
        text: string;
    }>(null);

    const svgWidth = Math.max(
        200,
        Math.ceil(timeRange * pxPerMs) + effectiveLeft + rightMargin + 2
    );
    const svgHeight =
        (offsetsOrdered.length || maxOffset + 1) * (blockHeight + ySpacing) +
        topMargin +
        40;

    const svgRef = useRef<SVGSVGElement | null>(null);

    // wheel zoom
    useEffect(() => {
        const el = svgRef.current;
        if (!el) return;
        const handler = (e: WheelEvent) => {
            e.preventDefault();
            const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
            setPxPerMs((p) => Math.max(6, Math.min(1000, p * factor)));
        };
        el.addEventListener("wheel", handler, { passive: false });
        return () => el.removeEventListener("wheel", handler as any);
    }, []);

    const tickStepMs = niceTickStep(timeRange, 8);
    const edge = 5;

    const localPoint = (e: React.MouseEvent) => {
        const rect = svgRef.current?.getBoundingClientRect();
        if (!rect) return { x: 0, y: 0 };
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    return (
        <div style={{ fontFamily: "Inter, Roboto, system-ui, sans-serif" }}>
            {/* Controls */}
            <div
                style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                    marginBottom: 8,
                }}
            >
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <button
                        onClick={() => setPxPerMs((p) => Math.max(6, p / 1.25))}
                    >
                        –
                    </button>
                    <input
                        type="range"
                        min={15}
                        max={400}
                        value={pxPerMs}
                        onChange={(e) => setPxPerMs(Number(e.target.value))}
                    />
                    <button
                        onClick={() =>
                            setPxPerMs((p) => Math.min(1000, p * 1.25))
                        }
                    >
                        +
                    </button>
                </div>
                <div style={{ color: "#333" }}>
                    px / ms: <b>{pxPerMs.toFixed(1)}</b>
                </div>
                <div style={{ color: "#666" }}>
                    time span:{" "}
                    <b>
                        {minStartTime} — {Math.ceil(maxEndTimeWithDuration)} ms
                    </b>
                </div>
                <div style={{ color: "#666" }}>
                    records: <b>{records.length}</b>
                </div>
            </div>

            {/* Chart */}
            <div
                style={{
                    overflow: "auto",
                    border: "1px solid #e2e8f0",
                    padding: 6,
                }}
            >
                <svg
                    ref={svgRef}
                    width={svgWidth}
                    height={svgHeight}
                    style={{ background: "#fff" }}
                >
                    {/* vertical grid (time ticks) */}
                    {showGrid && (
                        <g>
                            {Array.from({
                                length: Math.ceil(timeRange / tickStepMs) + 2,
                            }).map((_, idx) => {
                                const tNorm = idx * tickStepMs; // relative to minStartTime
                                const label = minStartTime + tNorm;
                                const x = effectiveLeft + tNorm * pxPerMs;
                                return (
                                    <g key={idx}>
                                        <line
                                            x1={x}
                                            y1={topMargin}
                                            x2={x}
                                            y2={svgHeight - 28}
                                            stroke="#eee"
                                            strokeDasharray="2,2"
                                        />
                                        <text
                                            x={x}
                                            y={svgHeight - 10}
                                            fontSize={11}
                                            textAnchor="middle"
                                            fill="#333"
                                        >
                                            {label} ms
                                        </text>
                                    </g>
                                );
                            })}
                        </g>
                    )}

                    {/* Y labels (in ordered offsets) - show full names */}
                    {offsetsOrdered.map((off, idx) => {
                        const signal = signals.find((s) => s.offset === off);
                        const y =
                            topMargin +
                            idx * (blockHeight + ySpacing) +
                            blockHeight / 1.2;
                        const name = signal?.name ?? `Offset ${off}`;
                        return (
                            <text
                                key={off}
                                x={8}
                                y={y}
                                fontSize={12}
                                fill="#444"
                            >
                                <title>{name}</title>
                                {name}
                            </text>
                        );
                    })}

                    {/* Signals rows - iterate offsetsOrdered to preserve alignment */}
                    {offsetsOrdered.map((offset) => {
                        const recs = recordsByOffset.get(offset) ?? [];
                        const rowIdx = offsetsOrdered.indexOf(offset);
                        const yBase =
                            topMargin + rowIdx * (blockHeight + ySpacing);

                        const isBool =
                            signals.find((s) => s.offset === offset)
                                ?.dataType === "bool";

                        if (isBool) {
                            // bool: horizontal + vertical transitions
                            return (
                                <g key={`bool-row-${offset}`}>
                                    {recs.map((r, i) => {
                                        const startX =
                                            effectiveLeft +
                                            (r.time - minStartTime) * pxPerMs;
                                        const endX =
                                            effectiveLeft +
                                            (r.endTime - minStartTime) *
                                                pxPerMs;
                                        const widthPx = Math.max(
                                            minBlockWidthPx,
                                            endX - startX
                                        );
                                        const y0 = yBase + blockHeight; // 0 -> bottom
                                        const y1 = yBase; // 1 -> top
                                        const yLine = r.value === 1 ? y1 : y0;

                                        return (
                                            <g key={`b-${offset}-${r.time}`}>
                                                <line
                                                    x1={startX}
                                                    y1={yLine}
                                                    x2={startX + widthPx}
                                                    y2={yLine}
                                                    stroke="#2b6cb0"
                                                    strokeWidth={2}
                                                    onMouseMove={(e) => {
                                                        const p = localPoint(e);
                                                        setTooltip({
                                                            x: p.x,
                                                            y: p.y,
                                                            text: `Offset: ${offset}\nValue: ${r.value}\nTime: ${r.time} — ${r.endTime}`,
                                                        });
                                                    }}
                                                    onMouseLeave={() =>
                                                        setTooltip(null)
                                                    }
                                                />
                                                {/* vertical transition to next segment when value changes */}
                                                {i < recs.length - 1 &&
                                                    recs[i + 1].value !==
                                                        r.value && (
                                                        <line
                                                            x1={
                                                                startX + widthPx
                                                            }
                                                            y1={yLine}
                                                            x2={
                                                                startX + widthPx
                                                            }
                                                            y2={
                                                                recs[i + 1]
                                                                    .value === 1
                                                                    ? y1
                                                                    : y0
                                                            }
                                                            stroke="#2b6cb0"
                                                            strokeWidth={2}
                                                            onMouseMove={(
                                                                e
                                                            ) => {
                                                                const p =
                                                                    localPoint(
                                                                        e
                                                                    );
                                                                setTooltip({
                                                                    x: p.x,
                                                                    y: p.y,
                                                                    text: `Transition at ${
                                                                        r.endTime
                                                                    } ms\n${
                                                                        r.value
                                                                    } → ${
                                                                        recs[
                                                                            i +
                                                                                1
                                                                        ].value
                                                                    }`,
                                                                });
                                                            }}
                                                            onMouseLeave={() =>
                                                                setTooltip(null)
                                                            }
                                                        />
                                                    )}
                                                {/* invisible rect to make hover area easier */}
                                                <rect
                                                    x={startX}
                                                    y={yBase}
                                                    width={Math.max(4, widthPx)}
                                                    height={blockHeight}
                                                    fill="transparent"
                                                />
                                            </g>
                                        );
                                    })}
                                </g>
                            );
                        }

                        // non-bool: polygons / blocks
                        return (
                            <g key={`row-n-${offset}`}>
                                {recs.map((r) => {
                                    const startX =
                                        effectiveLeft +
                                        (r.time - minStartTime) * pxPerMs;
                                    const endX =
                                        effectiveLeft +
                                        (r.endTime - minStartTime) * pxPerMs;
                                    const widthPx = Math.max(
                                        minBlockWidthPx,
                                        endX - startX
                                    );

                                    // clamp edge so polygon stays valid for very narrow widths
                                    const e = Math.min(
                                        edge,
                                        Math.max(0.5, widthPx / 2 - 0.5)
                                    );

                                    const points = [
                                        [startX + e, yBase],
                                        [startX + widthPx - e, yBase],
                                        [
                                            startX + widthPx,
                                            yBase + blockHeight / 2,
                                        ],
                                        [
                                            startX + widthPx - e,
                                            yBase + blockHeight,
                                        ],
                                        [startX + e, yBase + blockHeight],
                                        [startX, yBase + blockHeight / 2],
                                    ]
                                        .map((p) => p.join(","))
                                        .join(" ");

                                    const canShowText =
                                        String(r.value).length * 7 + 4 <
                                        widthPx;

                                    return (
                                        <g key={`n-${offset}-${r.time}`}>
                                            <polygon
                                                points={points}
                                                fill="#90cdf4"
                                                stroke="#2b6cb0"
                                                onMouseMove={(e) => {
                                                    const p = localPoint(e);
                                                    setTooltip({
                                                        x: p.x,
                                                        y: p.y,
                                                        text: `Offset: ${offset}\nValue: ${r.value}\nTime: ${r.time} — ${r.endTime}`,
                                                    });
                                                }}
                                                onMouseLeave={() =>
                                                    setTooltip(null)
                                                }
                                            />
                                            {canShowText && (
                                                <text
                                                    x={startX + widthPx / 2}
                                                    y={
                                                        yBase +
                                                        blockHeight / 2 +
                                                        4
                                                    }
                                                    fontSize={11}
                                                    textAnchor="middle"
                                                    fill="#000"
                                                >
                                                    {r.value}
                                                </text>
                                            )}
                                        </g>
                                    );
                                })}
                            </g>
                        );
                    })}

                    {/* tooltip */}
                    {tooltip && (
                        <g pointerEvents="none">
                            <rect
                                x={tooltip.x + 10}
                                y={tooltip.y + 10}
                                rx={4}
                                ry={4}
                                fill="#000"
                                opacity={0.85}
                                width={220}
                                height={56}
                            />
                            <text
                                x={tooltip.x + 14}
                                y={tooltip.y + 26}
                                fontSize={11}
                                fill="#fff"
                            >
                                {tooltip.text.split("\n").map((ln, i) => (
                                    <tspan
                                        key={i}
                                        x={tooltip.x + 14}
                                        dy={i === 0 ? 0 : 14}
                                    >
                                        {ln}
                                    </tspan>
                                ))}
                            </text>
                        </g>
                    )}
                </svg>
            </div>
        </div>
    );
};

// ---------------------- Generator ----------------------
export function generateRandomSignals(
    offsetCount = 10,
    pointsPerOffset = 100,
    seed = 1
): SignalForOffset[] {
    let s = seed;
    function rnd() {
        s = (s * 1664525 + 1013904223) | 0;
        return Math.abs(s) / 0x7fffffff;
    }

    const types: TDataType[] = ["int", "float", "bool", "analog"];
    const signals: SignalForOffset[] = [];

    for (let off = 0; off < offsetCount; off++) {
        const times: number[] = [];
        const values: number[] = [];
        let t = 0;
        const dataType = types[off % types.length];
        for (let i = 0; i < pointsPerOffset; i++) {
            const step = 1 + Math.floor(rnd() * 5);
            t += step;
            times.push(t);
            if (dataType === "bool") values.push(rnd() > 0.5 ? 1 : 0);
            else if (dataType === "int") values.push(Math.floor(rnd() * 256));
            else if (dataType === "float")
                values.push(parseFloat((rnd() * 100).toFixed(2)));
            else values.push(Math.floor(rnd() * 1024));
        }
        signals.push({
            offset: off,
            name: `Offset ${off} — long name example ${off}`,
            times,
            values,
            dataType,
        });
    }
    return signals;
}
