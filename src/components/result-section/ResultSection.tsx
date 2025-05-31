import {type FC} from 'react';
import {Col, Row, Space, Typography} from "antd";
import CardItem from "../card-item/CardItem.tsx";

import './ResultSection.scss'
import {useGeneralContext} from "../../context/context.tsx";

const {Title} = Typography;

const ResultSection: FC = () => {

    const {calculationResults} = useGeneralContext()

    return (
        <Col
            xxl={8} xl={8} lg={8} md={8} sm={20} xs={23}
            className={'cards-section common-panel'}
        >
            <Row justify={'center'}>
                <Col>
                    <div className={'header-box'}>
                        <Title level={2}>{'My results'}</Title>
                    </div>
                </Col>
            </Row>

            <Col className={'cards-container'}>
               <Space direction={'vertical'} style={{width: '100%', marginTop: 24}}>
                   {calculationResults.map((it) => (
                       <CardItem
                           key={it.uuid}
                           geometryTypeId={it.geometryId}
                           areaResult={it.area}
                           perimeterResult={it.perimeter}
                           timeStamp={it.timeStamp}
                           uuid={it.uuid}
                       />
                   ))}
               </Space>
            </Col>
        </Col>
    );
};

export default ResultSection;