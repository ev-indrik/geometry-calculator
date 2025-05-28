import './CardItem.scss'

import {type FC} from 'react';
import squareImg from '../../public/shapes/square.svg';

const CardItem: FC = () => {
    return (
        <div className={'card-item'}>
            <div className={'card-img-wrapper'}>
                <img src={squareImg} alt={"illustration of square"}/>
            </div>
            <div className={'text-result-box'}>
                <div>
                    {'Square'}
                </div>
                <div>
                    {'Area: 20m2'}
                </div>
                <div>
                    {'Date'}
                </div>
            </div>
        </div>
    );
};

export default CardItem;