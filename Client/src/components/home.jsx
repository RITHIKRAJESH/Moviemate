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
  Button
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import spiderman from '../assets/spidey.avif';
import johnwick from '../assets/johnwick1.jpg';
import civilwar from '../assets/civilwar.jpg';
import avengers from '../assets/avengers.jpg';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const staticPosters = [spiderman, avengers, johnwick, civilwar];

  const [movies, setMovies] = useState([]); // Store movies from API
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()
  const handleCardClick = (movieId) => {
    navigate(`/movie-details/${movieId}`);
  };
  // Fetch movies dynamically
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

  // Group movies by industry (Hollywood, Bollywood, Mollywood, etc.)
  const hollywoodMovies = movies.filter((movie) => movie.industry === 'Hollywood');
  const bollywoodMovies = movies.filter((movie) => movie.industry === 'Bollywood');
  const mollywoodMovies = movies.filter((movie) => movie.industry === 'Mollywood');
  const otherMovies = movies.filter((movie) => !['Hollywood', 'Bollywood', 'Mollywood'].includes(movie.industry));
  const redirectToTheaterLogin = () => {
    navigate('/theaterlogin');
  };

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
            onClick={redirectToTheaterLogin}
          >
            Theater Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Static Slideshow */}
      <Box sx={{ position: "relative", overflow: "hidden", height: "600px" }}>
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
        >
          {staticPosters.map((poster, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  backgroundImage: `url(${poster})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "600px",
                  width: "100%",
                  position: "relative",
                  filter: "brightness(0.8) contrast(1.2)",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Movie Cards Section */}
      <Container sx={{ mt: 4 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {/* Hollywood Movies */}
            {hollywoodMovies.length > 0 && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                  Hollywood Movies
                </Typography>
                <Grid container spacing={4}>
                  {hollywoodMovies.map((movie, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index} onClick={()=>{handleCardClick(movie._id)}}>
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

            {/* Bollywood Movies */}
            {bollywoodMovies.length > 0 && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                  Bollywood Movies
                </Typography>
                <Grid container spacing={4}>
                  {bollywoodMovies.map((movie, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index} onClick={()=>{handleCardClick(movie._id)}}>
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

            {/* Mollywood Movies */}
            {mollywoodMovies.length > 0 && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                  Mollywood Movies
                </Typography>
                <Grid container spacing={4}>
                  {mollywoodMovies.map((movie, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index} onClick={()=>{handleCardClick(movie._id)}}>
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
                          sx={{ width: "100%", height: "350px", objectFit: "fit" }}
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

            {/* Other Industry Movies */}
            {otherMovies.length > 0 && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                  Other Industry Movies
                </Typography>
                <Grid container spacing={4}>
                  {otherMovies.map((movie, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
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

export default HomePage;
