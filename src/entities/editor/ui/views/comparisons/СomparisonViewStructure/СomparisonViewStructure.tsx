import { TViewProps } from "@/entities/editor";

export const СomparisonViewStructure = ({
    width,
    height,
    text,
}: TViewProps) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
        >
            <polygon
                points="0,0 0,100 100,50"
                stroke="black"
                fill="white"
                strokeWidth="2"
            />

            <text x="8" y="30" fontSize="16" fill="gray">
                x
            </text>
            <text x="8" y="80" fontSize="16" fill="gray">
                y
            </text>
            <text
                x="40"
                y="55"
                fontSize="18"
                fill="black"
                // text-anchor="middle"
                // dominant-baseline="middle"
            >
                {text}
            </text>
        </svg>
    );
};
