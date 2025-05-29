type Point = { x: number; y: number }

export const calculateSquareByPoints = (points: Point[]): { area: number; perimeter: number } => {
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
