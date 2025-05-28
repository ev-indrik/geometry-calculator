import {type FC} from 'react';
import {Col, Row} from "antd";
import CardItem from "./CardItem.tsx";

import './ResultSection.scss'

const ResultSection: FC = () => {
    return (
        <Col
            className={'cards-section common-panel'}
            span={7}
            offset={1}
        >
            <Row justify={'center'}>
                <Col>
                    <div className={'header-box'}>
                        <h2>{'My results'}</h2>
                    </div>
                </Col>
            </Row>

            <Col className={'cards-container'}>
                <CardItem/>
            </Col>
        </Col>
    );
};

export default ResultSection;