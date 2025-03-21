import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Grid,
  Rating,
  TextField,
  MenuItem,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Button,
} from '@mui/material';
import axios from 'axios';
import Sentiment from 'sentiment'; // Import Sentiment library

const sentiment = new Sentiment(); // Initialize sentiment analysis

const UserHome = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedArtist, setSelectedArtist] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [searchText, setSearchText] = useState(''); // State to store search box input
  const navigate = useNavigate();

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

  const handleMovieClick = (movie) => {
    navigate(`/user/movie/${movie._id}`, { state: { movie } });
  };

  const handleMyBookings = () => {
    navigate('/user/mybooking'); // Navigate to My Bookings page
  };

  const handleLogout = () => {
    navigate('/'); 
    localStorage.clear();
  };

  // Filter movies based on selected criteria
  const filteredMovies = movies.filter((movie) => (
    (!selectedGenre || movie.genre.split(',').some((genre) =>
      selectedGenre.toLowerCase().includes(genre.trim().toLowerCase())
    )) &&
    (!selectedRating || movie.rating.toString().includes(selectedRating.toString()))
  ));

  // Handle Search Button Click
  const handleSearchClick = () => {
    const result = sentiment.analyze(searchText);
    const score = result.score; // Get the sentiment score (positive or negative)

    // Redirect to the search page with sentiment score
    if (searchText.trim()) {
      navigate(`/user/search/${score}`);
    }
  };

  return (
    <Box>
      {/* AppBar with My Bookings Button */}
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "flex-end", gap: "25px" }}>
          <Typography variant="h6" sx={{ color: "red" }}>
            Movie Hub
          </Typography>
          <Button variant="contained" color="error" onClick={handleMyBookings}>
            My Bookings
          </Button>
          <Button variant="contained" color="error" onClick={handleLogout}>
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>

      {/* Filters Section */}
      <Container sx={{ mt: 4, display: "flex", gap: 2, backgroundColor: "white" }}>
        <TextField
          select
          label="Genre"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ width: 200 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Action">Action</MenuItem>
          <MenuItem value="Adventure">Adventure</MenuItem>
          <MenuItem value="Thriller">Thriller</MenuItem>
        </TextField>

        <TextField
          select
          label="Rating"
          value={selectedRating}
          onChange={(e) => setSelectedRating(parseFloat(e.target.value))}
          variant="outlined"
          size="small"
          sx={{ width: 200 }}
        >
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={4}>4 </MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </TextField>

        {/* Search Box for Sentiment Analysis */}
        <TextField
          label="Search Movies"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ width: 300 }}
        />

        {/* Search Button */}
        <Button variant="contained" color="primary" onClick={handleSearchClick} sx={{ height: '100%' }}>
          Search
        </Button>
      </Container>

      {/* Movie List */}
      <Container sx={{ mt: 4 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
                  <Card
                    sx={{ maxWidth: 300, cursor: 'pointer', border: "1px solid red" }}
                    onClick={() => handleMovieClick(movie)}
                  >
                    <CardMedia
                      component="img"
                      height="350"
                      image={`http://localhost:9000/${movie.poster}`}
                      alt={movie.name}
                    />
                    <CardContent>
                      <Typography variant="h6">{movie.name}</Typography>
                      <Typography variant="body2">Genre: {movie.genre}</Typography>
                      <Typography variant="body2">Artist: {movie.artist}</Typography>
                      <Rating value={movie.rating} readOnly precision={0.5} />
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="h6" align="center" sx={{ width: "100%", mt: 2 }}>
                No movies found.
              </Typography>
            )}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default UserHome;
