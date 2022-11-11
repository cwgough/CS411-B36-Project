import React from "react";
import "./App.css";
import { useState, useEffect } from 'react';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard.jsx'

/*http://www.omdbapi.com?apikey=c032e2d7*/

const API_URL = ''

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async(title) =>{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies(' ');
    }, []);

    return (
    <div className = "app">
        <h1>Watchlist</h1>

        <div className = "search">
            <input placeholder = "Search for Movies"
            value = {searchTerm}
            onChange = {(e) => setSearchTerm(e.target.value)}/>
        <img src = {SearchIcon} alt = "search"
        onClick = {console.log(searchTerm)} /*{() => searchMovies(searchTerm)}*/ />
        </div>

        <div className = "swap">
            <button className = "button1" onClick = {() => {}}>Search by Location</button>
        </div>

        {movies?.length > 0 
        ? (<div className="container">
            {movies.map((movie) => 
            (<MovieCard movie = {movie} />))}
        </div>) : <div className = "empty">
            <h2>Try a new search!</h2>
            </div>}

    </div>
    );
}

export default App;