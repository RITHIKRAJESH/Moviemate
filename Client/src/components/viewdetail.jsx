import React from 'react';
import { Box, Container, Typography, Grid, Button, Paper, Link, Divider } from '@mui/material';
import { Rating } from '@mui/material';

// Importing the Civil War poster image from assets
import civilwar1 from '../assets/civilwar1.jpg';

const MovieDetailsPage = () => {
  // Example movie data for Avengers: Civil War
  const movie = {
    title: "Avengers: Civil War",
    releaseDate: "April 12, 2016",
    rating: 4.1,
    description: "The Avengers must pick sides when political interference in the Avengers' activities causes a rift between former allies Captain America and Iron Man.",
    cast: [
      { actor: "Chris Evans", role: "Captain America" },
      { actor: "Robert Downey Jr.", role: "Iron Man" },
      { actor: "Scarlett Johansson", role: "Black Widow" },
      { actor: "Sebastian Stan", role: "Winter Soldier" },
      { actor: "Tom Holland", role: "Spider-Man" }
    ],
    storyline: "When political pressure mounts to install a system of accountability, the Avengers are split into opposing factions—one led by Steve Rogers and the other by Tony Stark. Their division culminates in an epic battle between friends, as well as a larger war between nations and organizations across the globe.",
    youtubeTrailerUrl: "https://www.youtube.com/embed/dKrVegVI0Us", // YouTube Trailer
    streamingLink: "https://www.netflix.com/title/80102249", // Example link to Netflix
    bookMyShowUrl: "https://in.bookmyshow.com/kochi/movies/avengers-civil-war/ET00374104" // BookMyShow link for booking
  };

  return (
    <Box>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {movie.title}
        </Typography>
        <Grid container spacing={4}>
          {/* Movie Poster */}
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src={civilwar1}
              alt={movie.title}
              sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}
            />
          </Grid>

          {/* Movie Details */}
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

              <Typography variant="h6" sx={{ mt: 2 }}>
                Cast:
              </Typography>
              <Grid container spacing={2}>
                {movie.cast.map((member, index) => (
                  <Grid item key={index}>
                    <Typography variant="body2">
                      {member.actor} as {member.role}
                    </Typography>
                  </Grid>
                ))}
              </Grid>

              <Divider sx={{ my: 3 }} />

              {/* YouTube Trailer */}
              <Typography variant="h6" sx={{ mb: 1 }}>
                Watch the Trailer:
              </Typography>
              <iframe
                width="100%"
                height="315"
                src={movie.youtubeTrailerUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              {/* Streaming Link */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Available for Streaming:
                </Typography>
                <Link href={movie.streamingLink} target="_blank" rel="noopener" color="primary">
                  Watch on Netflix
                </Link>
              </Box>

              {/* Book Tickets Button */}
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  href={movie.bookMyShowUrl}
                  target="_blank"
                  rel="noopener"
                >
                  Book Tickets
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MovieDetailsPage;
