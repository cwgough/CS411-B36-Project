import React from 'react';

const MovieCard = ({ movie }) => {
    // parse movie here
    let movieYear = movie.data.title.releaseDate.year
    let movieTitle = movie.data.title.titleText.text
    let moviePoster = movie.data.title.primaryImag.url
    console.log(movieYear)
    return (
        <div className="movie">
            <div>
                <p>{movieYear}</p>
            </div>
            <div>
                <img src={moviePoster !== 'N/A' ? moviePoster : 'https://via.placeholder.com/400'} alt={movieTitle} />
            </div>
            <div>
                {/* <span>{movie.Type}</span> */}
                <h3>{movieTitle}</h3>
            </div>
        </div>
        // <div></div>
    )
}

export default MovieCard;