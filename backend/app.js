/* CS411 GROUP PROJECT
 * SERVER HOST FILE
 * Last edited:
 * 11/10/22
 * Kevin Smith 
 * Chris Gough */

const express = require('express')
const routes = require('./routes/movieRoutes')
const app = express()
const port = 8080

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