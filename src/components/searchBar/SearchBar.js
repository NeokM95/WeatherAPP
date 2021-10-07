import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({locationHandler}) {

    const [ query, setQuery ] = useState( "" )

    function onFormSubmit(e) {
        e.preventDefault()
        locationHandler(query)
    }

    return (
        <form className="searchbar" onSubmit={onFormSubmit}>
            <input
                type="text"
                name="search"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Zoek een stad in Nederland"
            />

            <button type="submit">
                Zoek
            </button>
        </form>
    );
}

export default SearchBar;
