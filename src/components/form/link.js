import React from 'react';
import { Link } from 'react-router-dom';

export default ({city, error, ...props}) => {
    //pokud neni zadny error a je zadane mesto, zobrazi se link, jinak se zobrazi error hlaska
    const cityLink = !error && city && <Link to={'/city/' + city} {...props}>
    {city} </Link>
    const errorMarkup = error && <p>Město nenalezeno</p>

    return (
        <div>
            {cityLink}
            {errorMarkup}
        </div>
    )
}