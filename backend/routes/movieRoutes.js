const getTitle = require('../imdb/index')
const getLookup = require('../utelly/index')
const movieOps = require('../watchlist/index')

module.exports = (app) => {
  const bodyParser = require("body-parser")
  app.use(bodyParser.urlencoded({ extended: true }));

  // returns movie + filmed locations
  app.route('/title/:titleID')
    .get((req, res) => {
      getTitle.readTitle(req.params.titleID)
        .then(data => res.json(data))
    })
  // returns list of movies
  app.route('/title/lookup/:movieTitle')
    .get((req, res) => {
      getLookup.getProvider(req.params.movieTitle)
        .then(data => res.json(data))
    })
  // view watchlist
  app.route('/watchlist')
    .get((req, res) => {
      movieOps.viewWatchlist(req, res)
    })
    // add movie to watchlist
    .put((req, res) => {
      movieOps.addMovie(req, res)
    })
  // delete movie from watchlist
  app.route('/watchlist/:titleID')
    .delete((req, res) => {
      movieOps.removeMovie(req, res)
    })
}