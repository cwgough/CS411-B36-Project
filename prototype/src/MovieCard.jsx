import React from 'react';
import changeStatus from './App.js';

const MovieCard = ({ movie }) => {
    return(
        <div className = "movie">
            <div>
                { <p>{movie.releaseDate.year}</p> }
            </div>
            <div>
                <img src = {movie.primaryImage.url} alt ={movie.titleText.text}/>
            </div>
            <div>
                <button className = 'watchlistButton' onClick = {() => changeStatus()}>+</button>
                <h3>{movie.titleText.text}</h3>
            </div>
        </div>
    )
}

export default MovieCard;