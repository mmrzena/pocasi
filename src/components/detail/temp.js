import React, { Component } from 'react';
import Temp from './span';
import TempMin from './span';
import TempMax from './span';

class Temperature extends Component {


    render() {
        const { data } = this.props
        return (
            <div className='tempWrapper'>
                    <div className='tempDiv'>
                        <span>Teplota: </span>
                        {/* teplota je uvadena se dvemi desetinymi hodnotami, zaokrouhlovani na jednu */}
                        <Temp className='temp'>{Math.round(data.main.temp * 10)/10} °C</Temp>
                    </div>

                    <div className='tempMinDiv'>
                        <span>Minimální teplota: </span>
                        <TempMin className='tempMin'>{Math.round(data.main.temp_min * 10)/10} °C</TempMin>
                    </div>

                    <div className='tempMaxDiv'>
                        <span>Maximální teplota: </span>
                        <TempMax className='tempMax'>{Math.round(data.main.temp_max * 10)/10} °C</TempMax>
                    </div>
                </div>
         
        )
    }
}

export default Temperature;


