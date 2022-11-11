import React from "react";
import "./App.css";
import { useState, useEffect } from 'react';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard.jsx'

/*http://www.omdbapi.com?apikey=c032e2d7*/

// const API_URL = 'http://localhost:8080'

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${'http://localhost:8080/title'}`,
            {
                mode: 'cors',

            });
        const data = await response.json()
        console.log(data)
        setMovies(data.Search);
        //temporary just to get data to display not just in console
        document.getElementById("log").innerHTML=data
        }

    useEffect(() => {
        searchMovies()
    }, []);

    return (
        <div className="app">
            <h1>Watchlist</h1>

            <div className="search">
                <input placeholder="Search for Movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
                <img src={SearchIcon} alt="search"
                    onClick={() => searchMovies(searchTerm)} />
            </div>

            <div className="swap">
                <button className="button1" onClick={() => { }}>Search by Location</button>
            </div>
            
            <br></br><br></br>
            <div id="log"></div>

            {movies?.length > 0
                ? (<div className="container">
                    {movies.map((movie) =>
                        (<MovieCard movie={movie} />))}
                </div>) : <div className="empty">
                    <div>Try a new search!</div>
                </div>}

        </div>
    );
}

export default App;