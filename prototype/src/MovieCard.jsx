import React from 'react';

const MovieCard = ({ movie }) => {

    function addTo() {
        // const elem = document.getElementsByClassName("watchlistButton");
        // if (!(elem.value in User.movieWatchlist)) {
        //     User.movieWatchlist.append(elem.value);
        // }
        const body = new URLSearchParams({
            titleID: movie.id,
            titleText: movie.titleText.text,
            releaseYear: `${movie.releaseDate.year}`,
            primaryImage: movie.primaryImage.url,
            locationsFilmed: [movie.locationsFilmed],
            providers: [movie.providers]
        })
        fetch("http://localhost:8080/watchlist", {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            },
            body: body
        })
    }

    return (
        <div className="movie">
            <div>
                {<p>{movie.releaseDate.year}</p>}
            </div>
            <div>
                <img src={movie.primaryImage.url} alt={movie.titleText.text} />
            </div>
            <div>
                <button key={movie.id} type='button' className='watchlistButton' onClick={() => addTo()} value={movie.titleText.text}>+</button>
                <h3>{movie.titleText.text}</h3>
            </div>
        </div>
    )
}

export default MovieCard;