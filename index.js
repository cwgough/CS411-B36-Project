/* CS411 GROUP PROJECT
 * SERVER HOST FILE
 * Last edited:
 * 11/10/22
 * Kevin Smith */

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Application listening on port ${port}`)
})