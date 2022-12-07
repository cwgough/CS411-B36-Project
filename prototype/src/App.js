import React from "react";
import ReactDOM from 'react-dom/client';
import "./App.css";
import { useState, useEffect } from 'react';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard.jsx'

const ROOT_URL = 'http://localhost:8080'

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (titleID) => {
        const response = await fetch(`${ROOT_URL}/title/${titleID}`,
            {
                mode: 'cors',

            });

        const data = await response.json()
        const movieData = data[0]
        const locationData = data[1]

        const hold = JSON.parse(movieData.Body)
        setMovies(movies.push(hold.data.title))  // BUG: after running more than once, movies becomes equal to the length of itself

        const container = document.getElementById('log2');
        const root = ReactDOM.createRoot(container);
        root.render(
            movies.map((movie) =>
                (<MovieCard movie={movie} />))
        )
    }

    // useEffect(() => {
    //     searchMovies()
    // }, []);

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

            <div id="log2"></div>

        </div>
    );
}

export default App;