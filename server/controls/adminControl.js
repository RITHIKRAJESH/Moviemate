const movieModel = require('../models/movieModel');
const artistModel=require('../models/artistModel')
const path=require('path')

// Add a new movie
const addMovie = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      movieName,
      releaseDate,
      budget,
      storyline,
      actors,
      rating,
      platform,
      platformLink,
      trailerLink,
      genre,
    } = req.body;
  
    // Create a new movie document
    const newMovie = new movieModel({
      movieName,
      releaseDate,
      budget,
      storyline,
      actors,
      rating,
      platform,
      platformLink,
      trailerLink,
      genre,
      poster: req.file ? req.file.path : null, 
    });

    // Save to database
    const savedMovie = await newMovie.save();
    console.log(savedMovie)
    // Respond with success message
    res.status(201).json({
      message: 'Movie added successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding movie', error: error.message });
    console.log(error)
  }
};



const addArtist = async (req, res) => {
  try {
    // Destructure the data from the request body
    const { name, birthPlace, dob, firstMovie, awards, netWorth, role ,stagename} = req.body;
    let image=''
    if(req.file){
      image=req.file.path
    }
    const newArtist = new artistModel({
      name,
      stagename,
      birthPlace,
      dob,
      firstMovie,
      awards,
      netWorth,
      role,
      image
    });

    // Save the artist to the database
    await newArtist.save();

    // Respond with success message
    res.status(201).json({ message: 'Artist added successfully', artist: newArtist });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to add artist', error: err.message });
  }
}

const getArtist =async(req, res) => {
 
  // Find the artist by ID
  const artist= await artistModel.find({})
    
      if (!artist) {
        return res.status(404).json({ message: "Artist not found" });
      }
      res.status(200).json(artist);
    
};

const getMovies =async(req, res) => {
  const movie= await movieModel.find({})
    
      if (!movie) {
        return res.status(404).json({ message: "Movies not found" });
      }
      res.status(200).json(movie);
    
};

module.exports = { addMovie ,addArtist, getArtist , getMovies };
