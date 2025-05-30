import {v4 as uuidv4} from 'uuid';
import moment from "moment";
import type {ResultItem} from '../context/context';
import type {FormValues, NumericPoint} from '../types';
import {
    calculateCircle,
    calculateCircleByPoints, calculateRectangle,
    calculateRectangleByPoints,
    calculateSquare,
    calculateSquareByPoints
} from "./geometry-formulas.ts";
import {toNumericPoints} from "./toNumericPoints.ts";


export const getCalculationResult = (activeSelectorId: number, values: FormValues) => {

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

            alert('Please insert the correct coordinates or side')
            // openNotificationWithIcon(
            //     'warning',
            //     'Wrong coordinates',
            //     "Please insert the correct coordinates or side"
            // )
            return
        } else {

            const points: NumericPoint[] = toNumericPoints(values.point1, values.point2);

            const [numericP1, numericP2] = points;

            const isSamePoint = numericP1.x === numericP2.x && numericP1.y === numericP2.y;
            const isValidLine = !isSamePoint && (numericP1.x === numericP2.x || numericP1.y === numericP2.y);

            // const p1 = values.point1
            // const p2 = values.point2
            //
            // const numericP1: NumericPoint = {
            //     x: Number(p1.x),
            //     y: Number(p1.y),
            // };
            //
            // const numericP2: NumericPoint = {
            //     x: Number(p2.x),
            //     y: Number(p2.y),
            // };
            //
            // const points: NumericPoint[] = [numericP1, numericP2]
            //
            // const isSamePoint = numericP1.x === numericP2.x && numericP1.y === numericP2.y;
            // const isValidLine = !isSamePoint &&
            // (numericP1.x === numericP2.x || numericP1.y === numericP2.y);

            if (!isValidLine) {

                alert('Please make sure the two points are different and aligned either horizontally or vertically to form square side')
                // openNotificationWithIcon(
                //     'warning',
                //     'Wrong coordinates',
                //     "Points must be aligned horizontally or vertically to form a square side"
                // )
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
            alert("Please insert the correct coordinates or sides")
            // openNotificationWithIcon(
            //     'warning',
            //     'Wrong coordinates',
            //     "Please insert the correct coordinates or sides"
            // )
            return
        } else {
            const points: NumericPoint[] = toNumericPoints(values.point1, values.point2);

            const [numericP1, numericP2] = points;

            const isDiagonal = numericP1.x !== numericP2.x && numericP1.y !== numericP2.y;

            if (!isDiagonal) {

                alert('Points must form a diagonal of a rectangle')
                // openNotificationWithIcon(
                //     'warning',
                //     'Wrong coordinates',
                //     'Points must form a diagonal of a rectangle'
                // )
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
                alert('Radius must be a positive number')
                // openNotificationWithIcon(
                //     'warning',
                //     'Wrong radius',
                //     'Radius must be a positive number'
                // );
                return;
            }

            const {area, perimeter} = calculateCircle(r)

            areaNumber = area
            perimeterNumber = perimeter

            alert('Note: The circle calculation results are rounded to the nearest whole number')
            // openNotificationWithIcon(
            //     'success',
            //     'Calculation successful',
            //     'Note: The circle calculation results are rounded to the nearest whole number'
            // );
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
                alert('Center and point must not be the same')
                // openNotificationWithIcon(
                //     'warning',
                //     'Wrong coordinates',
                //     'Center and point must not be the same'
                // );
                return;
            }

            const {area, perimeter} = calculateCircleByPoints(numericCenter, numericEdgePoint);
            areaNumber = Math.round(area);
            perimeterNumber = Math.round(perimeter);
            alert('Note: The circle calculation results are rounded to the nearest whole number')
            // openNotificationWithIcon(
            //     'success',
            //     'Calculation successful',
            //     'Note: The circle calculation results are rounded to the nearest whole number'
            // );
        } else {
            alert('Please provide valid center and edge point coordinates, or use the radius instead')
            // openNotificationWithIcon(
            //     'warning',
            //     'Missing data',
            //     'Please provide valid center and edge point coordinates, or use the radius instead'
            // );
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