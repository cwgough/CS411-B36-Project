import React from "react";
import ReactDOM from 'react-dom';
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
        
        //console.log(data)
        
        const hold = JSON.parse(data.Body)
        //setMovies(hold.data);
        setMovies(movies.push([hold.data.title]))
        /*console.log(data)
        console.log(hold)
        console.log(hold.data.title)
        console.log(movies)
        console.log(movies[1][0])
        console.log(movies[1][0].releaseDate.year)*/
        const container = document.getElementById('log2');
        const root = ReactDOM.createRoot(container);
        root.render(
            <MovieCard movie={movies[1][0]} />
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
            
        </div>
    );
}

export default App;