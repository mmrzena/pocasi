import React from 'react';
import Today from '../form/button';
import FirstDay from '../form/button';
import SecondDay from '../form/button';
import ThirdDay from '../form/button';
import FourthDay from '../form/button';
import FifthDay from '../form/button';

import './moreDays.css';

export default ({classClicked, fifthDisplay, ...props}) => {
    return (
        <div className={'moreDays ' + classClicked} >
            <Today className='ForecastDayButton' onClick={props.onClick.bind(this, 0)}>Dnes</Today>
            <FirstDay className='ForecastDayButton' onClick={props.onClick.bind(this, 1)}>+1</FirstDay>
            <SecondDay className='ForecastDayButton' onClick={props.onClick.bind(this, 2)}>+2</SecondDay>
            <ThirdDay className='ForecastDayButton' onClick={props.onClick.bind(this, 3)}>+3</ThirdDay>
            <FourthDay className='ForecastDayButton' onClick={props.onClick.bind(this, 4)}>+4</FourthDay>
            <FifthDay className='ForecastDayButton' style={{ display: fifthDisplay}} onClick={props.onClick.bind(this, 5)}>+5</FifthDay>
        </div>
    )
}