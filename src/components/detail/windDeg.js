import React from 'react';
// import './detail.css';

export default ({wind, windDirection}) => {
    //pokud ma {wind} hodnotu, tak se renderuje karta o směru větru
    //pokud je undefined, tak se nic nerenderuje
    if(wind) {
        return (
            <div className='windDirDiv'>
                <span>Směr větru: </span>
                 <span className='windDeg'>{windDirection}</span>
            </div>
        )
    } else {
        return null
    }
   
}