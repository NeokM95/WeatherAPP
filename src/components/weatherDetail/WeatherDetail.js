import React, { useEffect, useState, useContext } from 'react';
import './WeatherDetail.css';

import { TempContext } from '../../context/TempProvider';
import iconMapper from "../../helpers/iconMapper";
import checkDayAndNight from '../../helpers/checkDayAndNight';


function WeatherDetail( { temp, type, description, time } ) {

    const { kelvinToMetric } = useContext(TempContext)

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
            <p>{ kelvinToMetric(temp) }</p>
            <p>{ interval }</p>
        </section>
    </>)
}

export default WeatherDetail;
