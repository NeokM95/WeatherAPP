import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TempContextProvider from './context/TempProvider';


ReactDOM.render(
    <React.StrictMode>
        <TempContextProvider>
            <App/>
        </TempContextProvider>
    </React.StrictMode>,
    document.getElementById( 'root' )
);

