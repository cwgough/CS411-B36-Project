const movieSchema = require('../models/movie')

const addMovie = (req, res) => {
  let newMovie = new movieSchema(req.body);
  newMovie.save((err, movie) => {
    if (err) {
      res.send(`Error: ${err}`)
    }
    res.json(movie)
  })
}

const viewWatchlist = (req, res) => {
  movieSchema.find({}, (err, movie) => {
    if (err) {
      res.send(`Error: ${err}`)
    }
    res.json(movie)
  })
}

const removeMovie = (req, res) => {
  movieSchema.deleteOne({ titleID: req.params.titleID }, (err, movie) => {
    if (err) {
      res.send(`Error: ${err}`)
    }
    res.json({ message: `Deleted title with ID ${req.params.titleID}` })
  })

}

module.exports = { addMovie, viewWatchlist, removeMovie }