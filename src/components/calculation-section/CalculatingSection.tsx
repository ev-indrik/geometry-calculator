import {type FC, useState} from 'react';
import {Button, Col, Divider, Form, Input, Row, Space, Typography} from "antd";

import './CalculatingSection.scss'

import squareImg from "../../../public/shapes/square.svg";
import rectangleImg from "../../../public/shapes/rectangle.svg";
import circleImg from "../../../public/shapes/circle.svg";
import CardItem from "../card-item/CardItem.tsx";
import {useForm} from "antd/es/form/Form";
import moment from "moment";
import {type ResultItem, useGeneralContext} from "../../context/context.tsx";

const {Paragraph} = Typography;


type GeometryShapesProps = {
    id: number;
    figure: string;
    img: string;
}

type FormValues = {
    side: number;
    sideA: number;
    sideB: number;
    radius: number;
}

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

    const [activeSelectorId, setActiveSelectorId] = useState(2)
    const [areaResult, setAreaResult] = useState<number>(0)
    const [perimeterResult, setPerimeterResult] = useState<number>(0)
    const [currentDate, setCurrentDate] = useState('')
    const [resultItem, setResultItem] = useState<ResultItem | null>(null)

    const onFinish = (values: FormValues) => {

        let areaNumber = 0
        let perimeterNumber = 0

        setCurrentDate(moment().toISOString())

        if (activeSelectorId === 1) {
            areaNumber = values.side * 2
            perimeterNumber = values.side * 4
        }

        if (activeSelectorId === 2) {
            areaNumber = values.sideA * values.sideB
            perimeterNumber = (values.sideA * values.sideB) * 2
        }

        if (activeSelectorId === 3) {
            const area = Math.PI * Math.pow(values.radius, 2)
            areaNumber = Math.round(area)
            perimeterNumber = Math.round(2 * Math.PI * values.radius)
        }

        setAreaResult(areaNumber)
        setPerimeterResult(perimeterNumber)

        const resultItem: ResultItem = {
            geometryId: activeSelectorId,
            area: areaNumber,
            perimeter: perimeterNumber,
            timeStamp: moment().toISOString()
        }

        setResultItem(resultItem)
    }

    const handleSelector = (id: number) => {
        setActiveSelectorId(id)
        setAreaResult(0)
        form.resetFields()
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

    return (
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
                                        <Form.Item label={'Point X'} name={['points', 0, 'x']}>
                                            <Input type={'number'} placeholder={'X coordinate'}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={'Point Y'} name={['points', 0, 'y']}>
                                            <Input type={'number'} placeholder={'Y coordinate'}/>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={12}>
                                    <Col span={12}>
                                        <Form.Item label={'Point X'} name={['points', 1, 'x']}>
                                            <Input type={'number'} placeholder={'X coordinate'}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label={'Point Y'} name={['points', 1, 'y']}>
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
                            </>
                        )}

                        {activeSelectorId === 3 && (
                            <Form.Item label={'Circle radius'} name={'radius'}>
                                <Input type={'number'} placeholder={'Enter radius here'}/>
                            </Form.Item>
                        )}

                        {areaResult ?
                            <CardItem
                                areaResult={areaResult}
                                perimeterResult={perimeterResult}
                                geometryTypeId={activeSelectorId}
                                timeStamp={currentDate}
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
                        >
                            {'Clean results'}
                        </Button>
                    </Space>

                </Col>
            </Row>
        </Col>
    );
};

export default CalculatingSection;