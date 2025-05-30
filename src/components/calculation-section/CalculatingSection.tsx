import {type FC, useState} from 'react';
import {Button, Col, Divider, Form, Input, notification, Row, Space, Typography} from "antd";

import './CalculatingSection.scss'

import squareImg from "../../../public/shapes/square.svg";
import rectangleImg from "../../../public/shapes/rectangle.svg";
import circleImg from "../../../public/shapes/circle.svg";
import CardItem from "../card-item/CardItem.tsx";
import {useForm} from "antd/es/form/Form";
import {type ResultItem, useGeneralContext} from "../../context/context.tsx";
import {getCalculationResult} from "../../utils/getCalculationResult.ts";
import type {FormValues, GeometryShapesProps} from '../../types.ts';

const {Paragraph} = Typography;

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const geometryShapes: GeometryShapesProps[] = [
    {
        id: 1,
        figure: 'square',
        img: squareImg,
    },
    {
        id: 2,
        figure: 'rectangle',
        img: rectangleImg,
    },
    {
        id: 3,
        figure: 'circle',
        img: circleImg,
    },
]

const CalculatingSection: FC = () => {

    const {setCalculationResults, calculationResults} = useGeneralContext()
    const [api, contextHolder] = notification.useNotification();

    const [form] = useForm()

    const [activeSelectorId, setActiveSelectorId] = useState(2)
    // const [areaResult, setAreaResult] = useState<number>(0)
    // const [perimeterResult, setPerimeterResult] = useState<number>(0)
    const [currentDate, setCurrentDate] = useState('')
    const [resultItem, setResultItem] = useState<ResultItem | null>(null)

    const openNotificationWithIcon = (
        type: NotificationType,
        message: string,
        description: string
    ) => {
        api[type]({
            message,
            description,
        });
    };

    const onFinish = (values: FormValues) => {

        const resultItem: ResultItem | undefined = getCalculationResult(activeSelectorId, values)

        if (!resultItem) {
            throw new Error('Calculation result is undefined');
        }

       //  let areaNumber = 0
       //  let perimeterNumber = 0
       //
       //  setCurrentDate(moment().toISOString())
       ////
       //  if (activeSelectorId === 1) {
       //
       //      if (values.side) {
       //          areaNumber = Math.pow(values.side, 2)
       //          perimeterNumber = values.side * 4
       //      } else if (!values?.point1?.y || !values?.point1?.x || !values?.point2?.x || !values?.point2?.x)
       //      {
       //          openNotificationWithIcon(
       //              'warning',
       //              'Wrong coordinates',
       //              "Please insert the correct coordinates or side"
       //          )
       //          return
       //      } else {
       //          const p1 = values.point1
       //          const p2 = values.point2
       //
       //          const points = [p1, p2]
       //
       //          const isValidLine = p1.x === p2.x || p1.y === p2.y
       //          if (!isValidLine) {
       //              openNotificationWithIcon(
       //                  'warning',
       //                  'Wrong coordinates',
       //                  "Points must be aligned horizontally or vertically to form a square side"
       //              )
       //              return
       //          }
       //          const {area, perimeter} = calculateSquareByPoints(points)
       //          areaNumber = area
       //          perimeterNumber = perimeter
       //      }
       //  }
       //
       //  if (activeSelectorId === 2) {
       //      if (values.sideA && values.sideB) {
       //
       //          const a = Number(values.sideA)
       //          const b = Number(values.sideB)
       //          areaNumber = a * b
       //          perimeterNumber = 2 * (a + b)
       //      } else if (!values?.point1?.y || !values?.point1?.x || !values?.point2?.x || !values?.point2?.x)
       //      {
       //          openNotificationWithIcon(
       //              'warning',
       //              'Wrong coordinates',
       //              "Please insert the correct coordinates or sides"
       //          )
       //          return
       //      } else {
       //          const p1 = values.point1
       //          const p2 = values.point2
       //
       //          const points = [p1, p2]
       //
       //          const isDiagonal = p1.x !== p2.x && p1.y !== p2.y
       //          if (!isDiagonal) {
       //              openNotificationWithIcon(
       //                  'warning',
       //                  'Wrong coordinates',
       //                  'Points must form a diagonal of a rectangle'
       //              )
       //              return
       //          }
       //
       //          const {area, perimeter} = calculateRectangleByPoints(points)
       //          areaNumber = area
       //          perimeterNumber = perimeter
       //      }
       //  }
       //
       //  if (activeSelectorId === 3) {
       //
       //      if (values.radius) {
       //          const r = Number(values.radius);
       //          if (r <= 0) {
       //              openNotificationWithIcon(
       //                  'warning',
       //                  'Wrong radius',
       //                  'Radius must be a positive number'
       //              );
       //              return;
       //          }
       //          areaNumber = Math.round(Math.PI * r * r);
       //          perimeterNumber = Math.round(2 * Math.PI * r);
       //          openNotificationWithIcon(
       //              'success',
       //              'Calculation successful',
       //              'Note: The circle calculation results are rounded to the nearest whole number'
       //          );
       //      } else if (
       //          values.center &&
       //          values.edgePoint &&
       //          values.center.x &&
       //          values.center.y &&
       //          values.edgePoint.x &&
       //          values.edgePoint.y
       //      ) {
       //          const {x: cx, y: cy} = values.center;
       //          const {x: px, y: py} = values.edgePoint;
       //
       //          if (cx === px && cy === py) {
       //              openNotificationWithIcon(
       //                  'warning',
       //                  'Wrong coordinates',
       //                  'Center and point must not be the same'
       //              );
       //              return;
       //          }
       //
       //          const {area, perimeter} = calculateCircleByPoints(values.center, values.edgePoint);
       //          areaNumber = Math.round(area);
       //          perimeterNumber = Math.round(perimeter);
       //          openNotificationWithIcon(
       //              'success',
       //              'Calculation successful',
       //              'Note: The circle calculation results are rounded to the nearest whole number'
       //          );
       //      } else {
       //          openNotificationWithIcon(
       //              'warning',
       //              'Missing data',
       //              'Please provide valid center and edge point coordinates, or use the radius instead'
       //          );
       //          return;
       //      }
       //  }
       //
       //  // setAreaResult(areaNumber)
       //  // setPerimeterResult(perimeterNumber)
       //
       //  const resultItem: ResultItem = {
       //      uuid: uuidv4(),
       //      geometryId: activeSelectorId,
       //      area: areaNumber,
       //      perimeter: perimeterNumber,
       //      timeStamp: moment().toISOString(),
       //  }
        setResultItem(resultItem)
        form.resetFields()
    }

    const handleSelector = (id: number) => {
        setActiveSelectorId(id)
        setResultItem(null)
        form.resetFields()
        setResultItem(null)
    }

    const handleReset = () => {
        setResultItem(null)
        setCalculationResults([])
        form.resetFields()
    }

    const handleSaveResult = () => {
        if (resultItem) {
            setCalculationResults([resultItem, ...calculationResults])
        }
        setResultItem(null)
        form.resetFields()
    }

    return (<>
            {contextHolder}

            <Col
                span={16}
                className={'calculation-box common-panel'}
            >
                <Row justify={'center'}>
                    <Col>
                        <div className={'header-box'}>
                            <h1>{'Geometry calculator'}</h1>
                        </div>
                    </Col>
                </Row>

                <Row justify={'center'}>
                    <Col span={14}>

                        <Col span={24}>
                            <Row justify={'center'}>
                                <Col span={24}>
                                    <Divider plain style={{borderColor: '#E84D4B'}}>
                                        <p className={'divider-text'}>{'Select Geometry type'}</p>
                                    </Divider>
                                </Col>
                            </Row>
                        </Col>

                        <Row justify={'center'} gutter={12}>

                            {geometryShapes.map((it) => (
                                <Col span={8} key={it.id}>
                                    <Button
                                        className={it.id === activeSelectorId ? 'geometry-selector active' : 'geometry-selector'}
                                        block
                                        onClick={() => handleSelector(it.id)}
                                    >
                                        <div className={'geometry-selector-img'}>
                                            <img src={it.img} alt={`illustration of ${it.figure}`}/>
                                        </div>
                                        <div>
                                            <Paragraph>
                                                {it.figure}
                                            </Paragraph>
                                        </div>
                                    </Button>
                                </Col>
                            ))}
                        </Row>

                        <Form form={form} layout={'vertical'} onFinish={onFinish}
                              style={{paddingBottom: 12, paddingTop: 12}}>
                            {activeSelectorId === 1 && (
                                <>
                                    <Form.Item label={'Square side'} name={'side'}>
                                        <Input type={'number'} placeholder={'Enter square side'}/>
                                    </Form.Item>

                                    <Divider plain style={{borderColor: '#E84D4B'}}>
                                        <p className={'divider-text'}>{'Or put the coordinates'}</p>
                                    </Divider>
                                    <Row gutter={12}>
                                        <Col span={12}>
                                            <Form.Item label={'Point X'} name={['point1', 'x']}>
                                                <Input type={'number'} placeholder={'X coordinate'}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label={'Point Y'} name={['point1', 'y']}>
                                                <Input type={'number'} placeholder={'Y coordinate'}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={12}>
                                        <Col span={12}>
                                            <Form.Item label={'Point X'} name={['point2', 'x']}>
                                                <Input type={'number'} placeholder={'X coordinate'}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label={'Point Y'} name={['point2', 'y']}>
                                                <Input type={'number'} placeholder={'Y coordinate'}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </>
                            )}

                            {activeSelectorId === 2 && (
                                <>
                                    <Form.Item label={'Side A'} name={'sideA'}>
                                        <Input type={'number'} placeholder={'Enter rectangular first side'}/>
                                    </Form.Item>
                                    <Form.Item label={'Side B'} name={'sideB'}>
                                        <Input type={'number'} placeholder={'Enter rectangular second side'}/>
                                    </Form.Item>

                                    <Divider plain style={{borderColor: '#E84D4B'}}>
                                        <p className={'divider-text'}>{'Or put the coordinates'}</p>
                                    </Divider>
                                    <Row gutter={12}>
                                        <Col span={6}>
                                            <Form.Item label="X₁" name={['point1', 'x']}>
                                                <Input type="number" placeholder="X₁"/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item label="Y₁" name={['point1', 'y']}>
                                                <Input type="number" placeholder="Y₁"/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item label="X₂" name={['point2', 'x']}>
                                                <Input type="number" placeholder="X₂"/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item label="Y₂" name={['point2', 'y']}>
                                                <Input type="number" placeholder="Y₂"/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </>
                            )}

                            {activeSelectorId === 3 && (
                                <>
                                    <Form.Item label={'Circle radius'} name={'radius'}>
                                        <Input type={'number'} placeholder={'Enter radius here'}/>
                                    </Form.Item>

                                    <Divider plain style={{borderColor: '#E84D4B'}}>
                                        <p className="divider-text">Or enter center & edge coordinates</p>
                                    </Divider>

                                    <Row gutter={12}>
                                        <Col span={6}>
                                            <Form.Item label="Center X" name={['center', 'x']}>
                                                <Input type="number" placeholder="X"/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item label="Center Y" name={['center', 'y']}>
                                                <Input type="number" placeholder="Y"/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item label="Point X" name={['edgePoint', 'x']}>
                                                <Input type="number" placeholder="X"/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item label="Point Y" name={['edgePoint', 'y']}>
                                                <Input type="number" placeholder="Y"/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </>
                            )}

                            {resultItem ?
                                <CardItem
                                    areaResult={resultItem?.area}
                                    perimeterResult={resultItem?.perimeter}
                                    geometryTypeId={activeSelectorId}
                                    timeStamp={currentDate}
                                    isClosable={false}
                                /> : null
                            }

                            <Row style={{paddingTop: 24}}>
                                <Button
                                    type={'primary'}
                                    block
                                    htmlType={'submit'}
                                >
                                    {'Calculate'}
                                </Button>
                            </Row>
                        </Form>

                        <Space direction={'vertical'} style={{width: '100%'}}>
                            <Button
                                type={'default'}
                                block
                                onClick={handleSaveResult}
                                disabled={!resultItem}
                            >
                                {'Save calculation result'}
                            </Button>

                            <Button
                                type={'default'}
                                block
                                onClick={handleReset}
                                disabled={!calculationResults.length}
                            >
                                {'Clean results'}
                            </Button>
                        </Space>

                    </Col>
                </Row>
            </Col>
        </>
    );
};

export default CalculatingSection;