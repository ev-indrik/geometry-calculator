import type {FormValues, NotificationType, NumericPoint} from "../types.ts";
import {
    calculateCircle, calculateCircleByPoints,
    calculateRectangle,
    calculateRectangleByPoints,
    calculateSquare,
    calculateSquareByPoints
} from "../utils/geometry-formulas.ts";
import {toNumericPoints} from "../utils/toNumericPoints.ts";
import type {ResultItem} from "../context/context.tsx";
import {v4 as uuidv4} from "uuid";
import moment from "moment/moment";
import {useAppNotification} from "../context/notificationContext.tsx";



export const useGetCalculationResult = () => {

    const openNotification = useAppNotification()

    const getCalculationResult = (activeSelectorId: number, values: FormValues) => {
        let areaNumber = 0
        let perimeterNumber = 0

        if (!values)
            return

        if (activeSelectorId === 1) {

            if (values.side) {

                const numberSide = Number(values.side)
                const { area, perimeter } = calculateSquare(numberSide)

                areaNumber = area
                perimeterNumber = perimeter

            } else if (!values?.point1?.y || !values?.point1?.x || !values?.point2?.x || !values?.point2?.x) {

                openNotification(
                    'warning',
                    'Wrong coordinates',
                    "Please insert the correct coordinates or side"
                )
                return
            } else {

                const points: NumericPoint[] = toNumericPoints(values.point1, values.point2);

                const [numericP1, numericP2] = points;

                const isSamePoint = numericP1.x === numericP2.x && numericP1.y === numericP2.y;
                const isValidLine = !isSamePoint && (numericP1.x === numericP2.x || numericP1.y === numericP2.y);

                if (!isValidLine) {

                    openNotification(
                        'warning',
                        'Wrong coordinates',
                        "Please make sure the two points are different and aligned either horizontally or vertically to form square side"
                    )
                    return
                }
                const {area, perimeter} = calculateSquareByPoints(points)

                areaNumber = area
                perimeterNumber = perimeter
            }
        }

        if (activeSelectorId === 2) {
            if (values.sideA && values.sideB) {

                const a = Number(values.sideA)
                const b = Number(values.sideB)

                const {area, perimeter} = calculateRectangle(a, b)

                areaNumber = area
                perimeterNumber = perimeter

            } else if (!values?.point1?.y || !values?.point1?.x || !values?.point2?.x || !values?.point2?.x) {
                openNotification(
                    'warning',
                    'Wrong coordinates',
                    "Please insert the correct coordinates or sides"
                )
                return
            } else {
                const points: NumericPoint[] = toNumericPoints(values.point1, values.point2);

                const [numericP1, numericP2] = points;

                const isDiagonal = numericP1.x !== numericP2.x && numericP1.y !== numericP2.y;

                if (!isDiagonal) {

                    openNotification(
                        'warning',
                        'Wrong coordinates',
                        'Points must form a diagonal of a rectangle'
                    )
                    return
                }

                const {area, perimeter} = calculateRectangleByPoints(points)
                areaNumber = area
                perimeterNumber = perimeter
            }
        }

        if (activeSelectorId === 3) {

            if (values.radius) {
                const r = Number(values.radius);
                if (r <= 0) {
                    openNotification(
                        'warning',
                        'Wrong radius',
                        'Radius must be a positive number'
                    );
                    return;
                }

                const {area, perimeter} = calculateCircle(r)

                areaNumber = area
                perimeterNumber = perimeter

                openNotification(
                    'success',
                    'Calculation successful',
                    'Note: The circle calculation results are rounded to the nearest whole number'
                );
            } else if (
                values.center &&
                values.edgePoint &&
                values.center.x !== undefined &&
                values.center.y !== undefined &&
                values.edgePoint.x !== undefined &&
                values.edgePoint.y !== undefined
            ) {
                const [numericCenter, numericEdgePoint] = toNumericPoints(values.center, values.edgePoint);

                if (numericCenter.x === numericEdgePoint.x && numericCenter.y === numericEdgePoint.y) {
                    openNotification(
                        'warning',
                        'Wrong coordinates',
                        'Center and point must not be the same'
                    );
                    return;
                }

                const {area, perimeter} = calculateCircleByPoints(numericCenter, numericEdgePoint);
                areaNumber = Math.round(area);
                perimeterNumber = Math.round(perimeter);

                openNotification(
                    'success',
                    'Calculation successful',
                    'Note: The circle calculation results are rounded to the nearest whole number'
                );
            } else {
                openNotification(
                    'warning',
                    'Missing data',
                    'Please provide valid center and edge point coordinates, or use the radius instead'
                );
                return;
            }
        }

        const resultItem: ResultItem = {
            uuid: uuidv4(),
            geometryId: activeSelectorId,
            area: areaNumber,
            perimeter: perimeterNumber,
            timeStamp: moment().toISOString(),
        }
        return resultItem
    }
    return {getCalculationResult}
}