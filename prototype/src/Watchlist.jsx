import React from 'react';

const Table = (movieRows) => {

    function renderTableData() {
        return movieRows.renderList.map((movie, index) => {
            const { titleID, titleText, locationsFilmed, provider } = movie
            return (
                <tr key={titleID}>
                    <td>{index}</td>
                    <td>{titleText}</td>
                    <td>{locationsFilmed}</td>
                    <td>{provider}</td>
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