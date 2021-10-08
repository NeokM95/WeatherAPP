import React, { createContext, useState } from 'react';
import kelvinToFahrenheit from "../helpers/kelvinToFahrenheit";
import kelvinToCelsius from "../helpers/kelvinToCelsius";


export const TempContext = createContext(null);

function TempContextProvider({children}) {
    const [selectedMetric, toggleSelectedMetric] = useState('Celsius')

    function toggleTemp(){
        if (selectedMetric === 'Celsius'){
            toggleSelectedMetric('Fahrenheit')
        } else {
            toggleSelectedMetric('Celsius')
        }
    }

    return (
        <TempContext.Provider value={{
            toggleTemp,
            kelvinToMetric: selectedMetric === 'Celsius' ? kelvinToCelsius : kelvinToFahrenheit
        }}>
            {children}
        </TempContext.Provider>
    )
}

export default TempContextProvider;