import React from 'react';
import { useState } from 'react';
import Popup from 'reactjs-popup';

const Table = () => {
    const [movieRows, setMovieRows] = useState([]);

    async function getWatchlist() {
        const response = await fetch(`http://localhost:8080/watchlist`, { mode: 'cors' })
        const data = await response.json()
        return data
    }

    async function loadTableData() {
        const hold = await getWatchlist()
            .then(res => setMovieRows(res))
        // console.log(data)
    }

    function renderTableData() {
        // loadTableData()
        return movieRows.map((movie, index) => {
            const { titleID, titleText, locationsFilmed, provider } = movie
            return (
                <tr key={titleID}>
                    <td>{index}</td>
                    <td>{titleText}</td>
                    <td><Popup trigger={<button>View Locations</button>} position="right center">
                    <div><p>{locationsFilmed}</p></div>
                    </Popup></td>
                    <td>{provider}</td>
                    <td><button type='button' className='deleteButton'>Remove</button></td>
                </tr>
            )
        })
    }

    loadTableData();


    return (
        <div>
            <h2 id='title'> My Watchlist </h2>
            <table id='userWatchlist'>
                <tbody>
                    <tr>
                        <td>#</td>
                        <td>Movie Title</td>
                        <td>Filming Locations</td>
                        <td>Where to Watch</td>
                    </tr>
                    {renderTableData()}
                </tbody>
            </table>
        </div>
    )
}

export default Table;