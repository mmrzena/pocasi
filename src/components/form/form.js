import React, { Component } from 'react';
import './form.css';
import Submit from './button';
import Input from './input';
import CityLink from './link';
import History from './history';


class Form extends Component {
    constructor() {
        super();

        this.state = {
            city: ''
        }

        this.onChange=this.onChange.bind(this);
    }

    //setting city v state pri kazde zmene v input
    onChange(e) {
        this.setState({city: e.target.value});
    }

    //pri zmacknuti vyhledat se fetchnou data, ktera se ulozi v App.js state a 
    // sem se presunou jako props
    onSubmit(e) {
        e.preventDefault();   
        this.props.fetchData(this.state.city);
        this.setState({city: ''})
    }

   

    render() {
        return (
            <div className='formWrapper'>
                <form className='form' onSubmit={this.onSubmit.bind(this)}>
                    <Input className="cityInput" placeholder='Vyplňte město'
                    onChange={this.onChange}
                    value={this.state.city}
                    />
                    <Submit className="submitButton" type='submit'>Vyhledat</Submit>
                </form>

                <div className='linkDiv'>
                        <CityLink city={this.props.data.name}
                         error={this.props.error}
                         ></CityLink>
                </div>
                <History fetchData={this.props.fetchData.bind(this)} />
            </div>
        )
    }
        
    
}

export default Form;