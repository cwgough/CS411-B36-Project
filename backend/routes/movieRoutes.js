const getTitle = require('../imdb/index')
const Login = require('../oauth/index')
const express = require("express")
const { signinController, signupController } = require("../controllers/userController")
const router = express.Router()

module.exports = (app) => {
  // route for finding a specific movie
  app.route('/title')  // 'title/:titleID' later
    .get((req, res) => {
      getTitle.readTitle()
        .then(data => res.json(data))
    })

  app.route('/title/lookup/:movieTitle')
    .get((req, res) => {
      getLookup.getProvider(req.params.movieTitle)
        .then(data => res.json(data))
    })
}