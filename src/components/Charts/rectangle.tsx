import React from "react";
import { BarProps } from "recharts";

const RectangleBar: React.FC<BarProps> = (props) => {
    const { fill, x, y, width, height } = props;
    return (
        <g>
            <rect x={x} y={y} width={width} height={height} fill={fill}/>
            <foreignObject x={x} y={y} width={width} height={height}>
                <div className="flex flex-col space-y-2">
                    <div className="w-full h-12 bg-blue-100 rounded-lg"></div>
                </div>
            </foreignObject>
        </g>
    );
};

export default RectangleBar;