import React from 'react';
import Popup from 'reactjs-popup';

const Table = (movieRows) => {

    function removeMovie(titleID) {
        fetch(`http://localhost:8080/watchlist/${titleID}`, {
            mode: 'cors',
            method: 'DELETE'
        })
    }

    function renderTableData() {
        return movieRows.renderList.map((movie, index) => {
            const { titleID, titleText, locationsFilmed, provider } = movie
            return (
                <tr key={titleID}>
                    <td>{index}</td>
                    <td>{titleText}</td>
                    <td><Popup trigger={<button>View Locations</button>} position="right center">
                        <div><p>{locationsFilmed}</p></div>
                    </Popup></td>
                    <td>{provider}</td>
                    <td><button type='button' className='deleteButton' onClick={() => removeMovie(titleID)}>Remove</button></td>
                </tr>
            )
        })
    }

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