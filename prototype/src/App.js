import React from "react";
// import ReactDOM from 'react-dom/client';
import "./App.css";
import { useState, useEffect } from 'react';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard.jsx'

const ROOT_URL = 'http://localhost:8080'

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (movieTitle) => {
        setMovies([])

        const utellyResponse = await fetch(`${ROOT_URL}/title/lookup/${movieTitle}`, { mode: 'cors' });
        const utellyData = await utellyResponse.json()
        let titleIDs = []
        utellyData.results.forEach((returnedMovie) => {
            titleIDs.push(returnedMovie.external_ids.imdb.id)
        })

        titleIDs.forEach(async (titleID) => {
            const IMDbResponse = await fetch(`${ROOT_URL}/title/${titleID}`, { mode: 'cors' });
            const IMDbData = await IMDbResponse.json()
            const movieData = IMDbData[0]
            // const locationData = IMDbData[1]
            const hold = JSON.parse(movieData.Body)
            setMovies(arr => [...arr, hold.data.title])
        })
    }

    // useEffect(() => {

    // })

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

            {movies?.length > 0
                ? (<div className="container">
                    {movies.map((movie) =>
                        (<MovieCard movie={movie} />))}
                </div>)
                : <div className="empty">
                    <h2>Try a new search!</h2>
                </div>}

        </div>
    );
}

export default App;