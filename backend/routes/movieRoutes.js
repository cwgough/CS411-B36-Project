const getTitle = require('../imdb/index')

module.exports = (app) => {
  // route for finding a specific movie
  app.route('/title')  // 'title/:titleID' later
    .get((req, res) =>
      res.send(getTitle()))
}