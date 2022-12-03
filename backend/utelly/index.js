const fetch = require('node-fetch');
require('dotenv').config()

const url = 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=inception&country=us';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.UTELLY_API_KEY,
    'X-RapidAPI-Host': process.env.UTELLY_HOST
  }
};

async function getProvider() {
  try {
    fetch(url, options)
      .then(res => res.json());
    return res;
  } catch (err) {
    console.error(`Request failed with error: ${err}`)
  }
}

module.exports = { getProvider }