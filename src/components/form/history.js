import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class History extends Component {
    constructor() {
        super();

        this.state = {
            data: [],
        }

    }

    //získání dat z localStorage a přesuní jich do Array v state
    componentDidMount() {
        let storage = JSON.parse(localStorage.getItem('pocasiapp'))
        if(storage !== null) {
            let newStorage = storage.filter((value, index, self) => self.indexOf(value) === index);
            this.setState({data: newStorage});
        }
       
    }


    //render links pro historii počasí
    //kazdy link znovu fetchne data, jelikoz se muze stat, ze uzivatel vyhleda data
    //a vrati se k nim az napr. dalsi den, kdy jiz data nebudou relevantni, proto kazdy click je api call
    renderLinks() {
        return this.state.data
                .map( (city, index) => 
                        <div key={index} className='historyLinkDiv'>
                        <Link 
                            to={'/city/' + city} 
                            onClick={this.props.fetchData.bind(this, city)}
                        > {city} 
                        </Link>
                        </div>
                    )
    }

    render() {
        return (
            <div className='historyDiv'>
                <h3>Historie vyhledávání</h3>
                <div className='linksWrapper'>
                    {this.renderLinks()}
                </div>
             
            </div>
        )
    }
}

export default History;