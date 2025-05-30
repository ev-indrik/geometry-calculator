import type {NumericPoint} from "../types.ts";

export const toNumericPoints = (point1: { x: any; y: any }, point2: { x: any; y: any }): NumericPoint[] => {
    return [
        { x: Number(point1.x), y: Number(point1.y) },
        { x: Number(point2.x), y: Number(point2.y) }
    ];
};
