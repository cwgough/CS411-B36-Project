import React from "react";
import ReactDOM from 'react-dom/client';
import "./App.css";
import { useState, useEffect } from 'react';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard.jsx'

/*http://www.omdbapi.com?apikey=c032e2d7*/

// const API_URL = 'http://localhost:8080'

const App = () => {
    const [movies, setMovies] = useState([{}]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${'http://localhost:8080/title'}`,
            {
                mode: 'cors',

            });
        const data = await response.json()        

        const hold = JSON.parse(data.Body)
        setMovies(movies.push(hold.data.titles))
        
        const test = movies[1]
        const container = document.getElementById('log2');
        const root = ReactDOM.createRoot(container);
        root.render(
            test.map((movie) =>
            (<MovieCard movie={movie} />))
        )
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
            <div id="log2"></div>
            <p>{console.log(movies)}</p>

           {/* {movies?.length > 0 
        ? (<div className="container">
            {movies.map((movie) => 
            (<MovieCard movie = {movie} />))}
        </div>) : <div className = "empty">
            <h2>Try a new search!</h2>
            </div>} */}

        </div>
    );
}

export default App;