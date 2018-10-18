import React, { Component } from 'react';
import Temperature from './temp';
import Wind from './wind';
import GoBack from '../form/button';
import ShowForecast from '../form/button';
import Forecast from './moreDays';
import Datum from './htri';
import Time from './htri';
import { Link } from 'react-router-dom';
import './detail.css';
import './media.css';


class Detail extends Component {
    constructor() {
        super();

        this.state = {
            data: {},
            forecastData: [],
            city: '',
            icon: '',
            today: '',
            time: '', 
            classClicked: '',
            display: '',
            displayTime: '',
            fifthDisplay: 'none',
        }

    }

    onClickFetchForecast() {       
        const props = this.props;
        fetch(props.API + props.forecast + props.data.name + '&' + props.metrics + '&' + props.lang + '&' + props.APIKEY)
                .then((response) => response.json())
                .then(data => {
                    let forecastData = data.list.filter( item => {
                        return item.dt_txt.includes('12:00')
                    })
                    //jelikoz jsou data po 3 hodinach, beru prumernou hodnotu jako data namerena ve 12h
                    // nepodarilo se mi zjistit, kdy presne se updatuji data, ale neni to presne ve 12 hodin
                    //pro jistotu jsem tedy nastavil 14h, kdy uz tam zajiste data na paty den jsou
                    // pokud se uzivatel diva na predpoved pred 14h nejsou data pro paty den
                    // pokud se diva po 14h zobrazi se data i na paty den
                    const currentDay = new Date().getHours();
                    if(currentDay >= 14) {
                        this.setState({fifthDisplay: 'block'});
                    }
                    this.setState({ forecastData, classClicked: 'clicked', display: 'none' })
                })
        
        }

    //ziskani dat na dalsich 5 dni z api
    onClickForecast(day) {
        //pokud uzivatel klikne na tlacitko dnes, zobrazi se mu data aktualni predpovedi
        if(day === 0) {
            this.setState({data: this.props.data, displayTime: 'block'}, () => {
                this.getDate();
                this.updateIcon();
            })
        } else {
            //pokud se diva na predpoved pro dalsi dny, tak se updatujou data z petidenniho forecastu podle cisla dne
            const currentDay = new Date().getHours();
            if (currentDay >= 14 ) {
                const dayNumber = day - 1;
                this.setState({ data: this.state.forecastData[dayNumber], displayTime: 'none'}, () => {
                    this.getDate();
                    this.updateIcon();
                })
            } else {
                this.setState({ data: this.state.forecastData[day], displayTime: 'none'}, () => {
                this.getDate();
                this.updateIcon();
            })
            }
            
        }

           
        
    }

    //urcovani dne a hodin ze ziskanych dat v podobe timestamp
    getDate() {
        const today = new Date(this.state.data.dt*1000);
            let dd = today.getDate();
            let mm = today.getMonth()+1; 
            let yyyy = today.getFullYear();
    
            let min = today.getMinutes();
            let hh = today.getHours();
    
            if(dd<10) {dd = '0'+dd} 
            if(mm<10) {mm = '0'+mm} 
            if(min<10) {min = '0'+min} 
            if(hh<10) {hh = '0'+hh} 
            
            const date = dd + '/' + mm + '/' + yyyy;
            const time = hh + ':' + min;
            this.setState({ today: date, time });
    }

    componentDidMount(){
        //setting state z predanych props
        this.setState({data: this.props.data, city: this.props.data.name}, () => {
            this.getDate()
            if(Object.keys(this.props.data).length > 0) {
                if(this.props.data.weather[0].icon === '01d') {
                    this.setState({icon: 'sunny'});
                }
            }
           
        })
    }
    
    // updatuje classname pro img s iconou pocasi, pokud je ikona slunce, tak se pomalu toci dokola
    updateIcon() {
        if(this.state.data.weather[0].icon === '01d') {
            this.setState({icon: 'sunny'});
        }else {
            this.setState({icon: ''})
        }
    }


    render() {
        
        const { data, city, today, time, icon } = this.state;
        /* pokud neni v this.state.data prazdny (resp. this.props.data)
            tak se zobrazi Loading -> napr. pokud uzivatel nic nevyhleda pri novem
            nacteni a rovnou klikne na mesto v historii vyhledavani */
        if (Object.keys(data).length === 0) {
            return (
                <h1 className='loading'>Loading</h1>
            )
        } else {
        return (
            <div className='detailWrapper'>
                
                <div className='cityWrapper'>
                    <Link to='/'>
                        {/* tlacitko zpet na hlavni stranku s formularem, po ceste vymaze data z hlavni App state,
                            aby se nezobrazovalo jmeno mesta ve vysledku vyhledavani */}
                        <GoBack className='goBack' onClick={this.props.onClick.bind(this)}>🡐</GoBack>
                    </Link>

                   
                    <h1 className='cityName'>
                         {city}
                         <img className={icon} src={'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png'} />
                    </h1>
                    <Datum>{today}</Datum>
                    {/* display casu se zobrazuje pouze pri aktualnim dni*/}
                    <Time style={{display: this.state.displayTime}}>{time}</Time>
                </div>
                <div className='grid'>
                    {/*button pro zobrazeni tlacitek predpovedi na dalsi dny a fetch dat */}
                    <ShowForecast
                        className='showForecast' 
                        onClick={this.onClickFetchForecast.bind(this)}
                        style={{display: this.state.display}}
                    > více dní </ShowForecast>
                        {/* componenta ktera renderuje tlacitka pro predpoved na dalsi dny, 
                            fifthDisplay se meni pod denni doby*/}
                        <Forecast 
                            onClick={this.onClickForecast.bind(this)}
                            classClicked={this.state.classClicked}
                            fifthDisplay={this.state.fifthDisplay}
                        />
                        {/* componenty pro zobrazeni karet o teplote a vetrnostnich podminkach */}
                        <Temperature data={data}/>
                        <Wind data={data}/>
                </div>
               
            </div>
        )
        }
    }
}

export default Detail;