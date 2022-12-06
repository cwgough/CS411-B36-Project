/* CS411 GROUP PROJECT
 * SERVER HOST FILE */

require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose');
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const routes = require('./routes/movieRoutes')
const app = express()
const port = 8080
// const { MongoClient } = require('mongodb');

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb+srv://watchlist.bzjzmvz.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);

/* async function connect() {
  const uri = "mongodb+srv://watchlist.bzjzmvz.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    await client.connect();
  } catch(e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

connect().catch(console.error); */

const userSchema = new mongoose.Schema ({
  username: String,
  name: String,
  googleId: String,
  secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

// OAuth Login Procedure
passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id, username: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get("/logout", function(req, res){
  res.redirect("http://localhost:3000/");
});

app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
  function(req, res) {
    // Successful authentication, redirect secrets.
    res.redirect("http://localhost:3000");
);

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

routes(app);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Location-based recommendations engine listening on port ${port}`)
})