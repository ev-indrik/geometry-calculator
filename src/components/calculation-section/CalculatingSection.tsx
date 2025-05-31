import {type ChangeEvent, type FC, useState} from 'react';
import {Button, Col, Divider, Form, Input, Row, Space, Typography} from "antd";

import './CalculatingSection.scss'

import squareImg from "../../../public/shapes/square.svg";
import rectangleImg from "../../../public/shapes/rectangle.svg";
import circleImg from "../../../public/shapes/circle.svg";
import CardItem from "../card-item/CardItem.tsx";
import {useForm} from "antd/es/form/Form";
import {type ResultItem, useGeneralContext} from "../../context/context.tsx";
import type {FormValues, GeometryShapesProps} from '../../types.ts';
import {useGetCalculationResult} from "../../hooks/useGetCalculationResult.tsx";

const {Paragraph, Title} = Typography;

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

    const [form] = useForm()
    const {getCalculationResult}=useGetCalculationResult()

    const [activeSelectorId, setActiveSelectorId] = useState(2)
    const [resultItem, setResultItem] = useState<ResultItem | null>(null)

    const [isMetricDisabled, setIsMetricDisabled] = useState(false)
    const [isCoordsDisabled, setIsCoordsDisabled] = useState(false)

    const onFinish = (values: FormValues) => {
        const resultItem: ResultItem | undefined = getCalculationResult(activeSelectorId, values)

        if (!resultItem) {
            throw new Error('Calculation result is undefined');
        }
        setResultItem(resultItem)
        form.resetFields()
        setIsMetricDisabled(false)
        setIsCoordsDisabled(false)
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
        setIsMetricDisabled(false)
        setIsCoordsDisabled(false)
    }

    const handleSaveResult = () => {
        if (resultItem) {
            setCalculationResults([resultItem, ...calculationResults])
        }
        setResultItem(null)
        form.resetFields()
    }

    const onMetricChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsCoordsDisabled(!!e.target.value);
        form.resetFields([['point1', 'x'], ['point1', 'y'], ['point2', 'x'], ['point2', 'y']])
        form.resetFields([['center', 'x'], ['center', 'y'], ['edgePoint', 'x'], ['edgePoint', 'y']])
    };

    const onCoordsChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsMetricDisabled(!!e.target.value);
        form.resetFields(['side'])
        form.resetFields(['sideA', 'sideB'])
        form.resetFields(['radius'])
    };

    return (
        <>
            <Col
                xxl={15} xl={15} lg={15} md={14} sm={20} xs={23}
                className={'calculation-box common-panel'}
            >
                <Row justify={'center'}>
                    <Col>
                        <div className={'header-box'}>
                            <Title level={2}>{'Geometry calculator'}</Title>
                        </div>
                    </Col>
                </Row>

                <Row justify={'center'}>
                    <Col
                        xxl={16} xl={16} lg={18} md={18} sm={24} xs={24}
                    >

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
                                        <Input type={'number'} placeholder={'Enter square side'} onChange={onMetricChange} disabled={isMetricDisabled}/>
                                    </Form.Item>

                                    <Divider plain style={{borderColor: '#E84D4B'}}>
                                        <p className={'divider-text'}>{'Or put the coordinates'}</p>
                                    </Divider>
                                    <Row gutter={12}>
                                        <Col span={12}>
                                            <Form.Item label={'Point X'} name={['point1', 'x']}>
                                                <Input type={'number'} placeholder={'X coordinate'} disabled={isCoordsDisabled} onChange={onCoordsChange}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label={'Point Y'} name={['point1', 'y']}>
                                                <Input type={'number'} placeholder={'Y coordinate'} disabled={isCoordsDisabled} onChange={onCoordsChange}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={12}>
                                        <Col span={12}>
                                            <Form.Item label={'Point X'} name={['point2', 'x']}>
                                                <Input type={'number'} placeholder={'X coordinate'} disabled={isCoordsDisabled} onChange={onCoordsChange}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label={'Point Y'} name={['point2', 'y']}>
                                                <Input type={'number'} placeholder={'Y coordinate'} disabled={isCoordsDisabled} onChange={onCoordsChange}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </>
                            )}

                            {activeSelectorId === 2 && (
                                <>
                                    <Form.Item label={'Side A'} name={'sideA'}>
                                        <Input type={'number'} placeholder={'Enter rectangular first side'} onChange={onMetricChange} disabled={isMetricDisabled}/>
                                    </Form.Item>
                                    <Form.Item label={'Side B'} name={'sideB'}>
                                        <Input type={'number'} placeholder={'Enter rectangular second side'} onChange={onMetricChange} disabled={isMetricDisabled}/>
                                    </Form.Item>

                                    <Divider plain style={{borderColor: '#E84D4B'}}>
                                        <p className={'divider-text'}>{'Or put the coordinates'}</p>
                                    </Divider>
                                    <Row gutter={12}>
                                        <Col span={6}>
                                            <Form.Item label="X₁" name={['point1', 'x']}>
                                                <Input type="number" placeholder="X₁" disabled={isCoordsDisabled} onChange={onCoordsChange}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item label="Y₁" name={['point1', 'y']}>
                                                <Input type="number" placeholder="Y₁" disabled={isCoordsDisabled} onChange={onCoordsChange}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item label="X₂" name={['point2', 'x']}>
                                                <Input type="number" placeholder="X₂" disabled={isCoordsDisabled} onChange={onCoordsChange}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item label="Y₂" name={['point2', 'y']}>
                                                <Input type="number" placeholder="Y₂" disabled={isCoordsDisabled} onChange={onCoordsChange}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </>
                            )}

                            {activeSelectorId === 3 && (
                                <>
                                    <Form.Item label={'Circle radius'} name={'radius'}>
                                        <Input type={'number'} placeholder={'Enter radius here'} onChange={onMetricChange} disabled={isMetricDisabled}/>
                                    </Form.Item>

                                    <Divider plain style={{borderColor: '#E84D4B'}}>
                                        <p className="divider-text">Or enter center & edge coordinates</p>
                                    </Divider>

                                    <Row gutter={12}>
                                        <Col span={6}>
                                            <Form.Item label="Center X" name={['center', 'x']}>
                                                <Input type="number" placeholder="X" disabled={isCoordsDisabled} onChange={onCoordsChange}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item label="Center Y" name={['center', 'y']}>
                                                <Input type="number" placeholder="Y" disabled={isCoordsDisabled} onChange={onCoordsChange}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item label="Point X" name={['edgePoint', 'x']}>
                                                <Input type="number" placeholder="X" disabled={isCoordsDisabled} onChange={onCoordsChange}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item label="Point Y" name={['edgePoint', 'y']}>
                                                <Input type="number" placeholder="Y" disabled={isCoordsDisabled} onChange={onCoordsChange}/>
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
                                    isClosable={false}
                                    block={true}
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