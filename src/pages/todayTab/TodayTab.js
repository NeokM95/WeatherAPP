import React, { useEffect, useState } from 'react';
import './TodayTab.css';
import axios from "axios";
import WeatherDetail from "../../components/weatherDetail/WeatherDetail";
import createTimeString from "../../helpers/createTimeString";

// const apiKey = "914980b7d82b6962c87c98bb639aeed3"

function TodayTab( { coordinates } ) {

    const [ hourlyForecasts, setHourlyForecasts] = useState( [] )
    const [ error, toggleError ] = useState( false )
    const [ loading, toggleLoading ] = useState( false )

    useEffect( () => {

        const source = axios.CancelToken.source();


        async function fetchData() {

            toggleLoading( true )
            toggleError( false )

            try {
                const result = await axios.get(
                    `https://api.openweathermap.org/data/2.5/onecall?lat=${ coordinates.lat }&lon=${ coordinates?.lon }&exclude=minutely,current,daily&appid=${ process.env.REACT_APP_API_KEY }&lang=nl`
                ,{
                        cancelToken: source.token
                    })
                console.log( "Today", result.data )
                setHourlyForecasts([
                    //hourly[0] is het afgelopen hele uur, vandaar dat [3] 2 uur na het aanstaande hele uur is.
                    result.data.hourly[3],
                    result.data.hourly[5],
                    result.data.hourly[7],
                ])
                toggleLoading(false)

            } catch ( e ) {
                console.error( e )
                toggleError( true )
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
            <div className="chart">
                { hourlyForecasts.map( ( forecast ) => {
                    return <WeatherDetail
                        key={ forecast.dt }
                        temp={ forecast.temp }
                        type={ forecast.weather[0].main }
                        time={ forecast.dt }
                        description={ forecast.weather[0].description }
                    />
                } ) }
            </div>
            {error && <span>Het ophalen van de voorspellingen is mislukt. Probeer het opnieuw.</span>}
            {loading && <span>Loading...</span>}
            <div className="legend">
                { hourlyForecasts.map( ( forecast ) => {
                    return <span key={ `${ forecast.dt }-timestamp` }>{ createTimeString( forecast.dt ) }</span>
                } ) }
            </div>
        </div>
    );
};

export default TodayTab;
