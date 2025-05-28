import {type FC, useState} from 'react';
import {Button, Col, Form, Input, Row, Space, Typography} from "antd";

import './CalculatingSection.scss'

import squareImg from "../../../public/shapes/square.svg";
import rectangleImg from "../../../public/shapes/rectangle.svg";
import circleImg from "../../../public/shapes/circle.svg";
import CardItem from "../card-item/CardItem.tsx";
import {useForm} from "antd/es/form/Form";
import moment from "moment";
import {type ResultItem, useGeneralContext} from "../../context/context.tsx";

const {Title, Paragraph} = Typography;


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

    const [activeSelectorId, setActiveSelectorId] = useState(1)
    const [areaResult, setAreaResult] = useState<number>(0)
    const [currentDate, setCurrentDate] = useState('')
    const [resultItem, setResultItem] = useState<ResultItem | null>(null)

    const onFinish = (values: FormValues) => {

        let areaNumber = 0

        setCurrentDate(moment().toISOString())

        if (activeSelectorId === 1) {
            areaNumber = values.side * 2
        }

        if (activeSelectorId === 2) {
            areaNumber = values.sideA * values.sideB
        }

        if (activeSelectorId === 3) {
            const area = Math.PI * Math.pow(values.radius, 2)
            areaNumber = Math.round(area)
        }

        setAreaResult(areaNumber)

        const resultItem: ResultItem = {
            geometryId: activeSelectorId,
            area: areaNumber,
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
                            <Col>
                                <Title level={3} type={'success'}>
                                    {'*Select Geometry type'}
                                </Title>
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

                    <Form form={form} layout={'vertical'} onFinish={onFinish} style={{paddingBottom: 12}}>
                        {activeSelectorId === 1 && (
                            <Form.Item label={'Square side'} name={'side'}>
                                <Input type={'number'} placeholder={'Enter square side'}/>
                            </Form.Item>
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
                            <CardItem areaResult={areaResult} geometryTypeId={activeSelectorId}
                                      timeStamp={currentDate}/> : null
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