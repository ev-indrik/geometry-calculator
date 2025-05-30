import './CardItem.scss'

import {type FC} from 'react';
import moment from 'moment';

import squareImg from "../../../public/shapes/square.svg";
import rectangleImg from "../../../public/shapes/rectangle.svg";
import circleImg from "../../../public/shapes/circle.svg";
import closeImg from '../../../public/x.svg'
import {Button} from "antd";
import {useGeneralContext} from '../../context/context';
import type {CardProps} from "../../types.ts";

const CardItem: FC<CardProps> = ({areaResult, perimeterResult, geometryTypeId, timeStamp, uuid, isClosable = true, block}) => {

    const {setCalculationResults, calculationResults} = useGeneralContext()

    const formattedData = moment(timeStamp).local().format('MMM DD, HH:mm:ss');

    let geometryImageUrl = ''
    let cardName = ''

    switch (geometryTypeId) {
        case 1:
            geometryImageUrl = squareImg
            cardName = 'Square'
            break

        case 2:
            geometryImageUrl = rectangleImg
            cardName = 'Rectangle'
            break

        case 3:
            geometryImageUrl = circleImg
            cardName = 'Circle'
            break

        default:
            geometryImageUrl = squareImg
    }

    const handleClose = () => {
        const newCalculationResults = calculationResults.filter(it => it.uuid !== uuid)
        setCalculationResults(newCalculationResults)
    }

    return (
        <div className={block ? 'card-item block' : 'card-item'}>

            {isClosable && (
                <Button type={'text'} className={'close-button'} onClick={handleClose}>
                    <img src={closeImg} alt={'closing icon'}/>
                </Button>)
            }

            <div className={'card-img-wrapper'}>
                <img src={geometryImageUrl} alt={`illustration of ${cardName}`}/>
            </div>
            <div className={'text-result-box'}>
                <div className={'card-title-wrapper'}>
                    {cardName}
                </div>
                <div className={'result-text'}>
                    <p>{`Area: ${areaResult}² / Perimeter: ${perimeterResult}`}</p>
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