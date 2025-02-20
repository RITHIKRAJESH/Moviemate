import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Grid, Button, Paper, Link, Divider, Rating } from '@mui/material';

const ViewMovie = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state?.movie;

  if (!movie) {
    return <Typography variant="h6">No movie data found.</Typography>;
  }

  const handleBookTickets = () => {
    navigate(`/user/book-movie/${movie._id}`);
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
                           {/* Show booking button only if the platform is "Theater show" */}
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
             ) : movie.platformLink ? (
               /* Show streaming platform link if available */
               <Box sx={{ mt: 3 }}>
                 <Typography variant="h6" sx={{ mb: 1 }}>
                   Available for Streaming:
                 </Typography>
                 <Link href={movie.platformLink} target="_blank" rel="noopener" color="primary">
                   Watch Now
                 </Link>
               </Box>
             ) : null}
             
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ViewMovie;
