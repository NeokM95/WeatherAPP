import React, { useState, useEffect, useContext } from 'react';
import { TempContext } from './context/TempProvider';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import ForecastTab from "./pages/forecastTab/ForecastTab";
import TodayTab from "./pages/todayTab/TodayTab";

import './App.css';

/*
 Ik de apiKey hier achtergelaten mochten jullie de applicatie willen runnen.
 De Key is ook nodig in de pages `TodayTab.js` en `ForecastTab.js`.
 */
// const apiKey = "914980b7d82b6962c87c98bb639aeed3"


function App() {

    const { kelvinToMetric } = useContext( TempContext );

    const [ weatherData, setWeatherData ] = useState( {} )
    const [ location, setLocation ] = useState( '' )
    const [ error, toggleError ] = useState( false )

    useEffect( () => {

        const source = axios.CancelToken.source();

        async function fetchData() {

            toggleError( false )

            try {
                const result = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${ location.toLowerCase() },nl&appid=${ process.env.REACT_APP_API_KEY }&lang=nl`
                ,{
                        cancelToken: source.token
                    })
                setWeatherData( result.data )
                console.log( result.data )

            } catch ( e ) {
                console.error( e.message )
                toggleError( true )
            }

        }

        if ( location ) {
            fetchData()
        }

        return function cleanup() {
            source.cancel()
        }


    }, [ location ] )


    return (
        <>
            <div className="weather-container">

                {/*HEADER -------------------- */ }
                <div className="weather-header">
                    <SearchBar locationHandler={ setLocation }/>
                    { error &&
                    <p className='wrong-location-error'>"{ location }" is geen geldige plaatsnaam.. </p>
                    }

                    <span className="location-details">
                        { Object.keys( weatherData ).length > 0 &&
                        <>
                            <h2>{ weatherData.weather[0].description }</h2>
                            <h3>{ weatherData.name } </h3>
                            <h1>{kelvinToMetric(weatherData.main.temp) }</h1>
                        </>
                        }
                    </span>
                </div>

                {/*CONTENT ------------------ */ }
                <Router>
                    <div className="weather-content">
                        <TabBarMenu/>

                        <div className="tab-wrapper">
                            <Switch>
                                <Route exact path="/">
                                    <TodayTab coordinates={ weatherData.coord }/>
                                </Route>
                                <Route path="/komende-week">
                                    <ForecastTab coordinates={ weatherData.coord }/>
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </Router>

                <MetricSlider/>
            </div>
        </>
    );
}

export default App;
