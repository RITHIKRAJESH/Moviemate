import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Grid, Button, Paper, Divider, Rating, TextField } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import AXIOS from 'axios'

const ViewMovie = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state?.movie;
  const token=jwtDecode(localStorage.getItem("token"))
  const [review, setReview] = useState('');
  const userId = token.user._id;  
  if (!movie) {
    return <Typography variant="h6">No movie data found.</Typography>;
  }

  const handleBookTickets = () => {
    navigate(`/user/book-movie/${movie._id}`);
  };

  const handleSubmitReview = () => {
    console.log("Review submitted:", { review, userId, movieId: movie._id });
    AXIOS.post("http://localhost:9000/user/review",{ review, userId, movieId: movie._id })
    .then((res)=>{
      alert("Review added successfully")
    }).catch((err)=>{
      console.log(err)
    })
    setReview('');
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
              <Rating value={movie.rating} readOnly precision={0.1} size="small" />

              <Typography variant="body1" sx={{ mt: 2 }}>
                <strong>Description:</strong> {movie.description}
              </Typography>

              <Typography variant="body2" sx={{ mt: 2 }}>
                <strong>Storyline:</strong> {movie.storyline}
              </Typography>

              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                Cast:
              </Typography>

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

              <Typography variant="h6" sx={{ mb: 1 }}>
                Watch the Trailer:
              </Typography>
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
              {movie.platform === "Theater" ? (
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBookTickets}
                    fullWidth
                  >
                    Book Tickets
                  </Button>
                </Box>
              ) : movie.video ? (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Available for Streaming:
                  </Typography>
                  <video
                    src={`http://localhost:9000/${movie.video}`}
                    controls
                    width="100%"
                    style={{ maxWidth: "600px" }}
                  />
                </Box>
              ) : null}

              {/* Add review section */}
              <Divider sx={{ my: 3 }} />
              {/* <Typography variant="h6" sx={{ mb: 1 }}>
                Leave a Review:
              </Typography>
              <TextField
                label="Your Review"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitReview}
                disabled={!review}
              >
                Submit Review
              </Button> */}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ViewMovie;
