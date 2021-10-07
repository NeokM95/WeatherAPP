import React, { useEffect, useState } from 'react';
import './WeatherDetail.css';
import iconMapper from "../../helpers/iconMapper";

import checkDayAndNight from '../../helpers/checkDayAndNight';

function WeatherDetail( { temp, type, description, time } ) {

    const [ interval, setInterval ] = useState( false )


    useEffect( () => {
        setInterval( checkDayAndNight(time) )
        console.log( interval )
    }, [] )


    return (
    <>
        <section className="day-part">
                        <span className="icon-wrapper">
                            { iconMapper( type, interval ) }
                        </span>
            <p className="description">{ description }</p>
            <p>{ temp }</p>
            <p>{ interval }</p>
        </section>
    </>)
}

export default WeatherDetail;
