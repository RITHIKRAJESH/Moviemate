import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Grid,
  Rating,
  CircularProgress,
  Button,
  TextField
} from '@mui/material';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Sentiment from 'sentiment'

import spiderman from '../assets/spidey.avif';
import johnwick from '../assets/johnwick1.jpg';
import civilwar from '../assets/civilwar.jpg';
import avengers from '../assets/avengers.jpg';
import { useNavigate, useParams } from 'react-router-dom';

const genreScores = {
  Action: 4,
  Comedy: 7,
  Drama: 3,
  Horror: -2,
  Romance: 6,
  "Sci-Fi": 5,
  Thriller: 2,
  Animation: 8,
  Documentary: 4,
  Adventure: 6,
  Fantasy: 5,
  Mystery: 2,
  Crime: 1,
  Historical: 3,
  Biography: 4,
  Family: 9,
  Musical: 7,
  War: 1,
  Western: 2,
  Superhero: 6
};

const sentiment = new Sentiment()

const SearchedMovies = () => {
  const staticPosters = [spiderman, avengers, johnwick, civilwar];

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [recommendedGenres, setRecommendedGenres] = useState([]);
  const [filteredMovie, setFilteredMovies] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  console.log(params.id); 
 // score passed in URL params

  const handleCardClick = (movieId) => {
    navigate(`/movie-details/${movieId}`);
  };

  useEffect(() => {
    axios.get('http://localhost:9000/user/viewmovie')
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
        setLoading(false);
      });
  }, []);

  // Use the score from URL params to filter movies
  useEffect(() => {
    if (params.id) {
      const score = parseInt(params.id, 10); // Parse the score from params
      const filtered = movies.filter((movie) => {
        const movieGenres = movie.genre.split(',');
        return movieGenres.some((genre) => genreScores[genre.trim()] === score);
      });
      setFilteredMovies(filtered);
    }
  }, [movies, params.score]);

 

  return (
    <Box>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ color: "red" }}>
            Movie Hub
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={() => navigate('/theaterlogin')}
          >
            Theater Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Static Slideshow */}
   

      {/* Movie Cards Section */}
      <Container sx={{ mt: 4 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {/* Filtered Movies */}
            {filteredMovie.length > 0 && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                  Filtered Movies (Score: {params.score})
                </Typography>
                <Grid container spacing={4}>
                  {filteredMovie.map((movie, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index} onClick={() => handleCardClick(movie._id)}>
                      <Box
                        sx={{
                          border: "1px solid red",
                          borderRadius: "8px",
                          overflow: "hidden",
                          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.7)",
                          backgroundColor: "white",
                        }}
                      >
                        <Box
                          component="img"
                          src={`http://localhost:9000/${movie.poster}`}
                          alt={movie.name}
                          sx={{ width: "100%", height: "350px", objectFit: "cover" }}
                        />
                        <Box sx={{ padding: 2 }}>
                          <Typography variant="h6">{movie.name}</Typography>
                          <Typography variant="body2">Genre: {movie.genre}</Typography>
                          <Typography variant="body2">Cast: {movie.actors.join(', ')}</Typography>
                          <Rating value={movie.rating} readOnly precision={0.5} />
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default SearchedMovies;
