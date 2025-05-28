import './CardItem.scss'

import {type FC} from 'react';
import moment from 'moment';

import squareImg from "../../../public/shapes/square.svg";
import rectangleImg from "../../../public/shapes/rectangle.svg";
import circleImg from "../../../public/shapes/circle.svg";

type Props = {
    areaResult: number,
    geometryTypeId: number,
    timeStamp: string,
}

const CardItem: FC<Props> = ({areaResult, geometryTypeId, timeStamp}) => {

    const formattedData = moment(timeStamp).local().format('MMM DD, HH:mm:ss');

    let geometryImageUrl = ''
    let cardName = ''

    switch (geometryTypeId) {
        case 1: geometryImageUrl=squareImg
            cardName='Square'
            break

        case 2: geometryImageUrl=rectangleImg
            cardName='Rectangle'
            break

        case 3: geometryImageUrl=circleImg
            cardName='Circle'
            break

        default: geometryImageUrl=squareImg
    }

    return (
        <div className={'card-item'}>
            <div className={'card-img-wrapper'}>
                <img src={geometryImageUrl} alt={`illustration of ${cardName}`}/>
            </div>
            <div className={'text-result-box'}>
                <div className={'card-title-wrapper'}>
                    {cardName}
                </div>
                <div className={'result-text'}>
                    {`Area: ${areaResult}²`}
                </div>
                <div className={'time-stamp'}>
                    {`Date: ${formattedData}`}
                    {/*{`Date: ${moment().format('MMM DD, HH:mm:ss')}`}*/}
                </div>
            </div>
        </div>
    );
};

export default CardItem;