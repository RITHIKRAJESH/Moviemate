const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  movieName: { type: String, required: true },
  releaseDate: { type: String, required: true },
  budget: { type: Number, required: true },
  storyline: { type: String, required: true },
  actors: { type: [String], required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  platform: { type: String, required: true },
  platformLink: { type: String, required: true },
  trailerLink: { type: String, required: true },
  genre: { type: String, required: true },
  poster: { type: String, required: false },
}, { timestamps: true });

const movieModel = mongoose.model('Movie', movieSchema);

module.exports = movieModel
