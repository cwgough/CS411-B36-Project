import React from 'react';

const MovieCard = ({ movie }) => {
    console.log(movie)
    return(
        <div className = "movie">
            <div>
                { <p>{movie.releaseDate.year}</p> }
            </div>
            <div>
                <img src = {movie.primaryImage.url} alt ={movie.titleText.text}/>
            </div>
            <div>
                <span>'movie'</span>
                <h3>{movie.titleText.text}</h3>
            </div>
        </div>
    )
}

export default MovieCard;