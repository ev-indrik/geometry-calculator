import {type FC} from 'react';
import {Col, Row, Space} from "antd";
import CardItem from "../card-item/CardItem.tsx";

import './ResultSection.scss'
import {useGeneralContext} from "../../context/context.tsx";

const ResultSection: FC = () => {

    const {calculationResults} = useGeneralContext()

    return (
        <Col
            className={'cards-section common-panel'}
            // span={8}
        >
            <Row justify={'center'}>
                <Col>
                    <div className={'header-box'}>
                        <h2>{'My results'}</h2>
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