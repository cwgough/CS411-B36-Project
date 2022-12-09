import React from 'react';

const MovieCard = ({ movie }) => {

    function addTo()
    {
        const elem = document.getElementsByClassName("watchlistButton");
        if (!(elem.value in User.movieWatchlist)){
            User.movieWatchlist.append(elem.value);
        }
    }

    return(
        <div className = "movie">
            <div>
                { <p>{movie.releaseDate.year}</p> }
            </div>
            <div>
                <img src = {movie.primaryImage.url} alt ={movie.titleText.text}/>
            </div>
            <div>
                <button key={this.id} type='button' className = 'watchlistButton' onClick = {() => addTo()} value={movie.titleText.text}>+</button>
                <h3>{movie.titleText.text}</h3>
            </div>
        </div>
    )
}

export default MovieCard;