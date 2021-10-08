import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import { TempContext } from '../../context/TempProvider';
import createDateString from "../../helpers/createDateString";

import './ForecastTab.css';


// const apiKey = "914980b7d82b6962c87c98bb639aeed3"

function ForecastTab( { coordinates } ) {

    const { kelvinToMetric } = useContext( TempContext )

    const [ forecasts, setForecasts ] = useState( [] )
    const [ error, toggleError ] = useState( false )
    const [ loading, toggleLoading ] = useState( false )

    useEffect( () => {

        const source = axios.CancelToken.source();

        async function fetchData() {

            toggleError( false )
            toggleLoading( true )

            try {
                const result = await axios.get(
                    `https://api.openweathermap.org/data/2.5/onecall?lat=${ coordinates.lat }&lon=${ coordinates?.lon }&exclude=minutely,current,hourly&appid=${ process.env.REACT_APP_API_KEY }&lang=nl`
                    , {
                        cancelToken: source.token
                    } )
                // setTimeout( () =>
                toggleLoading( false )
                // , 300 )

                console.log( "Five-day Forecast", result.data.daily.slice( 1, 6 ) )
                setForecasts( result.data.daily.slice( 1, 6 ) )
            } catch ( e ) {
                console.error( e )
                toggleError( true )
                toggleLoading( false )
            }
        }

        if ( coordinates ) {
            fetchData()
        }

        return function cleanup() {
            source.cancel()
        }

    }, [ coordinates ] )

    return (
        <div className="tab-wrapper">
            { forecasts.length === 0 && !error &&
            <span className="no-forecast">
              Zoek eerst een locatie om het weer voor deze week te bekijken
            </span>
            }
            { error === true && <span>Er is iets misgegaan met het ophalen van de data</span> }
            { loading && <span>Loading...</span> }
            { forecasts.map( ( day ) => {
                return (
                    <article className="forecast-day" key={ day.dt }>
                        <p className="day-description">
                            { createDateString( day.dt ) }
                        </p>
                        <section className="forecast-weather">
                            <span>
                              { kelvinToMetric( day.temp.day ) }
                            </span>
                            <span className="weather-description">
                              { day.weather[0].description }
                            </span>
                        </section>
                    </article>
                )
            } ) }
        </div>
    )
};

export default ForecastTab;
