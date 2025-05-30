export type GeometryShapesProps = {
    id: number;
    figure: string;
    img: string;
}

export type Point = {
    x: string;
    y: string;
};

export type NumericPoint = {
    x: number;
    y: number;
};

export type FormValues = {
    side?: string;
    sideA?: string;
    sideB?: string;
    radius?: string;
    point1: Point;
    point2: Point;
    center?: Point;
    edgePoint?: Point;
}

export type GeometryResult = {
    area: number;
    perimeter: number;
};

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export type CardProps = {
    uuid?: string
    areaResult: number,
    perimeterResult: number,
    geometryTypeId: number,
    isClosable?: boolean,
    timeStamp?: string,
}