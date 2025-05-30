import type {GeometryResult, NumericPoint} from "../types.ts";

//===>> Basic geometry formulas

export const calculateSquare = (side: number): GeometryResult => {
    const area = side * side;
    const perimeter = 4 * side;

    return { area, perimeter };
};

export const calculateRectangle = (sideA: number, sideB: number): GeometryResult => {
    const area = sideA * sideB;
    const perimeter = 2 * (sideA + sideB);

    return { area, perimeter };
};

export const calculateCircle = (radius: number): GeometryResult => {
    const area = Math.round(Math.PI * radius * radius);
    const perimeter = Math.round(2 * Math.PI * radius);

    return { area, perimeter };
};


// ===>> Formulas for coordinates
export const calculateSquareByPoints = (points: NumericPoint[]): { area: number; perimeter: number } => {
    if (points.length !== 2) {
        return { area: 0, perimeter: 0 }
    }

    const [p1, p2] = points
    const dx = p2.x - p1.x
    const dy = p2.y - p1.y
    const side = Math.sqrt(dx * dx + dy * dy)
    const area = side * side
    const perimeter = side * 4

    return { area, perimeter }
}

export const calculateRectangleByPoints = (
    points: NumericPoint[]
): { area: number; perimeter: number } => {
    if (points.length !== 2) {
        return { area: 0, perimeter: 0 }
    }

    const [p1, p2] = points
    const width = Math.abs(p2.x - p1.x)
    const height = Math.abs(p2.y - p1.y)

    const area = width * height
    const perimeter = 2 * (width + height)

    return { area, perimeter }
}

export const calculateCircleByPoints = (
    center: NumericPoint,
    edgePoint: NumericPoint
): { area: number; perimeter: number } => {
    const dx = edgePoint.x - center.x
    const dy = edgePoint.y - center.y
    const radius = Math.sqrt(dx * dx + dy * dy)

    const area = Math.PI * radius * radius
    const perimeter = 2 * Math.PI * radius

    return {
        area: Math.round(area),
        perimeter: Math.round(perimeter),
    }
}
