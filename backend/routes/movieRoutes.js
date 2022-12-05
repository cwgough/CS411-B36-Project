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
        .then((data) => res.json(data))
    })
  //login route
  app.route('/oauth')
    .post((req, res) => {
      Login.Login()
    })
}

router.post("/signin", signinController)
router.post("/signup", signupController)