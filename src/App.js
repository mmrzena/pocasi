import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Form from './components/form/form';
import Detail from './components/detail/detail';

const API = 'http://api.openweathermap.org/data/2.5/';
const weather = 'weather?q=';
const forecast = 'forecast?q=';
const APIKEY = 'appid=f714be673656be98ef85ddbba2ec76c3';
const metrics = 'units=metric';
const lang = 'lang=cz';

class App extends Component {

  constructor() {
    super();

    this.state = {
      data: {},
      error: false
    }

    this.fetchData = this.fetchData.bind(this)
  }


  fetchData(city) {
    fetch(API + weather + city + '&' + metrics + '&' + lang + '&' + APIKEY)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    //pokud je zadane spatne mesto
                    throw new Error();
                }
            })
            .then(data => {
                this.setState({ data, error: false });
                //ulozeni pouze jmena mesta do localstorage
                //pote pri kliknuti na history link je znovu volan api call pro fetch aktualnich dat
                localStorage.setItem(data.name, data.name)
            })
            .catch((error) => {
                this.setState({error: true});
            });
  }

  onClick() {
    this.setState({data: {}});
  }


  render() {
   
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' component={() => 
                            <Form 
                                data = {this.state.data}
                                error = {this.state.error}
                                fetchData={this.fetchData}
                            />} 
          exact />
          <Route path='/city/:city' component={() => 
                                      <Detail 
                                        data={this.state.data}
                                        API={API}
                                        forecast={forecast}
                                        APIKEY={APIKEY}
                                        metrics={metrics}
                                        lang={lang}
                                        onClick={this.onClick.bind(this)}
                                      />}
          />
        </Switch>
      
      </BrowserRouter>
    );
  }
}

export default App;
