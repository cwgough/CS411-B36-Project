const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
  titleID: { type: String, required: true },
  titleText: { type: String, required: true },
  releaseYear: { type: String, required: true },
  primaryImage: { type: String, required: true },
  locationsFilmed: { type: Array, required: true }
})

module.exports = mongoose.model("Movie", movieSchema)