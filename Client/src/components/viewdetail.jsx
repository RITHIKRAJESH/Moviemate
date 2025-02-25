import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate for redirecting
import { Box, Container, Typography, Grid, Paper, Divider, Rating, Link, Button } from '@mui/material';
import axios from 'axios';

const MovieDetailsPage = () => {
  const movieId  = useParams();
  const navigate = useNavigate();  // Hook to navigate programmatically
  console.log(movieId) // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);

  // Fetch movie details by ID
  useEffect(() => {
    axios.get(`http://localhost:9000/user/movie/${movieId.id}`)
      .then((res) => {
        setMovie(res.data[0]);
        console.log(res.data)
      })
      .catch((error) => {
        console.error('Error fetching movie:', error);
      });
  }, [movieId]);

  if (!movie) {
    return <Typography variant="h6">Loading movie details...</Typography>;
  }

  // Handle booking button click to navigate to /register-user
  const handleBooking = () => {
    navigate('/register-user');  // Redirect to the register-user page
  };

  return (
    <Box>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {movie.name}
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src={`http://localhost:9000/${movie.poster}`}
              alt={movie.name}
              sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper sx={{ padding: 3, boxShadow: 3 }}>
              <Typography variant="h6" gutterBottom>
                Release Date: {movie.releaseDate}
              </Typography>
              <Rating value={movie.rating || 0} readOnly precision={0.1} size="small" />

              <Typography variant="body1" sx={{ mt: 2 }}>
                <strong>Description:</strong> {movie.description}
              </Typography>

              <Typography variant="body2" sx={{ mt: 2 }}>
                <strong>Storyline:</strong> {movie.storyline}
              </Typography>

              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>Cast:</Typography>
              {movie.actors && movie.actors.length > 0 ? (
                movie.actors.map((actor, index) => (
                  <Typography key={index} variant="body2">
                    • {actor}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2">No cast information available</Typography>
              )}

              <Divider sx={{ my: 3 }} />

              <Box sx={{ mt: 3 }}>
  <Typography variant="h6" sx={{ mb: 1 }}>Watch the Trailer:</Typography>
  <iframe
    width="100%"
    height="315"
    src={movie.trailerLink.replace("watch?v=", "embed/")}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
</Box>

              {/* Booking Button */}
              {/* Show booking button only if the platform is "Theater show" */}
{movie.platform === "Theater" ? (
  <Box sx={{ mt: 3 }}>
    <Button
      variant="contained"
      color="primary"
      onClick={handleBooking}
      fullWidth
    >
      Book Tickets
    </Button>
  </Box>
) : movie.video ? (
  /* Show streaming platform link if available */
  <Box sx={{ mt: 3 }}>
    <Typography variant="h6" sx={{ mb: 1 }}>
      Available for Streaming:
    </Typography>
    <Button  onClick={handleBooking}>View Movie</Button>
  </Box>
) : null}

            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MovieDetailsPage;
