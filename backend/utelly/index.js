const fetch = require('node-fetch');
require('dotenv').config()

const baseUrl = 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com'


const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.UTELLY_API_KEY,
    'X-RapidAPI-Host': process.env.UTELLY_HOST
  }
};

// getProvider is a misnomer: add a second function to return the provider
// this function just runs the search
async function getProvider(movieTitle) {
  try {
    url = `${baseUrl}/lookup?term=${movieTitle}`
    const response = await fetch(url, options)
      .then(res => res.json());
    return response;
  } catch (err) {
    console.error(`Request failed with error: ${err}`)
  }
}

module.exports = { getProvider }