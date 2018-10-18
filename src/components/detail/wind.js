import React, { Component } from 'react';
import Speed from './span';
import WindDeg from './windDeg';

class Temperature extends Component {
    constructor() {
        super();

        this.handleWindDeg = this.handleWindDeg.bind(this);
        this.windForce = this.windForce.bind(this);
        this.windDirection = this.windDirection.bind(this);
    }

    //některá města nemají záznam o směru větru
    //tahle funkce vratí hodnotu nebo undefined 
    handleWindDeg() {
        return this.props.data.wind.deg
    }
    
    //Beaufortova stupnice síly větru
    windForce(speed){
        if (speed>0 && speed<0.2){
          return "Bezvětří";
        }else if (speed>0.3 && speed<=1.5){
          return "Vánek";
        }else if (speed>1.6 && speed<=3.3){
          return "Slabý vítr";
        }else if (speed>3.4 && speed<=5.4){
          return "Mírný vítr";
        }else if (speed>5.5 && speed<=7.9){
          return "Dosti čerstvý vítr";
        }else if (speed>8 && speed<=10.7){
          return "Čerstvý vítr";
        }else if (speed>10.8 && speed<=13.8){
          return "Silný vítr";
        }else if (speed>13.9 && speed<=17.1){
          return "Prudký vítr";
        }else if (speed>17.2 && speed<=20.7){
          return "Bouřlivý vítr";
        }else if (speed>20.8 && speed<=24.4){
          return "Vichřice";
        }else if (speed>24.5 && speed<=28.4){
          return "Silná vichřice";
        }else if (speed>28.5 && speed<=32.6){
          return "Mohutná vichřice";
        }else{
          return "Orkán"; 
        }
      }


      //směr větru je udavany ve stupnich, prevod na svetove strany
      windDirection(num) {
        let val = Math.floor((num / 22.5) + 0.5);
        let arr = ["S", "SSV", "SV", "VSV", "V", "VJV", "JV", "JJV", "J", "JJZ", "JZ", "ZJZ", "Z", "ZSZ", "SZ", "SSZ"];
        return arr[(val % 16)];
    }
    

    render() {
        const { data } = this.props
        return (
            <div className='windWrapper'>
                    <div className='windSpeedDiv'>
                        <span> Rychlost větru: </span>
                         <Speed className='windSpeed'>{Math.round(data.wind.speed * 10)/10} m/s</Speed> 
                        <span>({this.windForce(data.wind.speed)})</span> 
                    </div>

                        <WindDeg className='windDir' 
                                 wind={this.handleWindDeg()}
                                 windDirection={this.windDirection(data.wind.deg)}
                        />

                
            </div>
        )
    }
}

export default Temperature;


