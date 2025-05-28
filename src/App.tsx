import './App.css'
import {Col, Divider, Row} from "antd";

function App() {

    return (
        <div className={'calc-wrapper'}>
            <div className={'container'}>

                <Row
                    justify={'center'}
                >
                    <Col
                        span={16}
                        className={'calculation-box'}
                    >
                        <Row justify={'center'}>
                            <Col>
                                <h1>{'Geometry calculator'}</h1>
                            </Col>
                            <Divider className={'divider'} />
                        </Row>
                    </Col>

                    {/*Cards section*/}
                    <Col
                        className={'cards-section'}
                        span={7}
                        offset={1}
                    >
                        <Row justify={'center'}>
                            <Col>
                                <h2>{'My results'}</h2>
                            </Col>
                            <Divider className={'divider'} />
                        </Row>
                    </Col>
                </Row>

            </div>
        </div>
    )
}

export default App
