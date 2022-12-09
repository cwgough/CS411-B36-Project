const mongoose = require('mongoose')

const watchlistSchema = mongoose.Schema({
  movies: { type: Array, required: true }
})

module.exports = mongoose.model("Watchlist", watchlistSchema)