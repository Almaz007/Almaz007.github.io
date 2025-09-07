import { useAnalyzerStore } from "@/entities/analyzer";
import { createWithEqualityFn } from "zustand/traditional";

type Status = "connecting" | "connected" | "disconnected";

interface WebSocketState {
    ws: WebSocket | null;
    status: Status;
    error: string | null;
    messages: string[];
    connect: (url: string) => void;
    disconnect: () => void;
    parseOscilografFile: (file: Blob) => Promise<void>;
    sendMessage: (newMessage: string) => void;
    sendFile: (arrayBuffer: Uint8Array<ArrayBuffer>) => void;
}

export const useWebSocketStore = createWithEqualityFn<WebSocketState>(
    (set, get) => ({
        ws: null,
        status: "disconnected",
        error: null,
        messages: [],
        parseOscilografFile: async (file: Blob) => {
            const arrayBuffer = await file.arrayBuffer();
            const dataView = new DataView(arrayBuffer);
            console.log(arrayBuffer);

            const offsetsData: Record<
                number,
                { timePoints: number[]; values: number[] }
            > = {};

            for (let i = 0; i + 16 <= dataView.byteLength; i += 16) {
                const number = dataView.getUint32(i, true);
                if (number === 0) return;

                const timestamp = dataView.getUint32(i + 4, true);
                const offset = dataView.getUint32(i + 8, true);
                const value = dataView.getUint32(i + 12, true);
                console.log(
                    `номер: ${number}, метка: ${timestamp}, смещение: ${offset}, значение: ${value}`
                );
                if (!offsetsData[offset]) {
                    offsetsData[offset] = { timePoints: [], values: [] };
                }

                offsetsData[offset].timePoints.push(timestamp);
                offsetsData[offset].values.push(value);
            }

            const store = useAnalyzerStore.getState();
            store.updateOscillographicData(offsetsData);
        },
        connect: (url: string) => {
            let { ws, parseOscilografFile, status } = get();
            if (ws) return;

            set({ status: "connecting", error: null });

            ws = new WebSocket(url);
            set({ ws });
            ws.onopen = () => {
                set({ error: null, status: "connected" });
                console.log("WebSocket connected");
            };

            ws.onmessage = async (event) => {
                if (event.data instanceof Blob) {
                    set((state) => ({
                        messages: [...state.messages, "Получен бинарный пакет"],
                    }));
                    await parseOscilografFile(event.data);
                } else {
                    console.log("Получено с сервера:", event.data);
                    set((state) => ({
                        messages: [...state.messages, event.data.toString()],
                    }));
                }
            };

            ws.onerror = () => {
                set({ error: "Connection error", status: "disconnected" });
            };

            ws.onclose = () => {
                console.log("WebSocket closed. Status was:", status);
                ws = null;
                set({ ws: null });
                // setTimeout(() => connect(url), 3000);
            };
        },
        disconnect: () => {
            const { ws } = get();
            if (ws) {
                ws.close();
                set({ ws: null, status: "disconnected" });
            }
        },
        sendMessage: (message) => {
            const { ws } = get();
            if (!ws) return;

            set((prev) => ({ messages: [...prev.messages, message] }));
            ws.send(message);
        },
        sendFile: (arrayBuffer) => {
            const { ws } = get();
            if (!ws) return;

            set((prev) => ({ messages: [...prev.messages, "файл отправлен"] }));
            ws.send(arrayBuffer);
        },
    })
);
