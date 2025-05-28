import {type FC} from 'react';
import {Button, Col, Form, Input, Row, Typography} from "antd";

import './CalculatingSection.scss'

import squareImg from "../../public/shapes/square.svg";
import rectangleImg from "../../public/shapes/rectangle.svg";
import circleImg from "../../public/shapes/circle.svg";

const {Title, Paragraph} = Typography;


export type GeometryShapesProps = {
    id: number;
    figure: string;
    img: string;
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

    const onFinish = (values: {coords: string, side: string})=>{
        console.log(Number(values.coords) + Number(values.side));
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
                                <Button className={'geometry-selector'} block>
                                    <div className={'geometry-selector-img'} >
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

                    <Form layout={'vertical'} onFinish={onFinish}>
                        <Form.Item label={'Geometry type'} name={'coords'}>
                            <Input />
                        </Form.Item>
                        <Form.Item label={'Side'} name={'side'}>
                            <Input />
                        </Form.Item>

                        <Button type={'primary'} block htmlType={'submit'}>
                            {'Calculate'}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Col>
    );
};

export default CalculatingSection;