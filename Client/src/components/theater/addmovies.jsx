import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  AppBar, Toolbar, Button, Typography, List, ListItem, 
  CircularProgress, Box, TextField, IconButton 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Addmovies() {
  const navigate = useNavigate();
  const storedToken = localStorage.getItem('token');

  if (!storedToken) {
    navigate('/theaterlogin'); // Redirect if no token
    return null;
  }

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMovie, setNewMovie] = useState("");
  const token = jwtDecode(storedToken);

  useEffect(() => {
    axios.get("http://localhost:9000/theater/viewProfile", {
      headers: { id: token.theater._id }
    })
    .then((res) => {
      if (Array.isArray(res.data.movies)) {
        setMovies(res.data.movies);
      } else {
        setMovies([]); 
      }
      setLoading(false);
    })
    .catch(err => {
      console.log("Error fetching movies:", err);
      setError("Failed to load movies");
      setLoading(false);
    });
  }, []);

  // Function to add a new movie
  const handleAddMovie = () => {
    if (newMovie.trim() === "") return;

    axios.post("http://localhost:9000/theater/addMovie", 
      { movie: newMovie, theaterId: token.theater._id }
    )
    .then(res => {
      setMovies([...movies, newMovie]); // Update local state
      setNewMovie(""); // Clear input
    })
    .catch(err => console.log("Error adding movie:", err));
  };

  // Function to remove a movie
  const handleRemoveMovie = (movieToRemove) => {
    axios.post("http://localhost:9000/theater/removeMovie", 
      { movie: movieToRemove, theaterId: token.theater._id }
    )
    .then((res) => {
      setMovies(movies.filter(movie => movie !== movieToRemove)); // Remove movie locally
    })
    .catch(err => console.log("Error removing movie:", err));
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/theaterlogin"); // Redirect to login page
  };

  return (
    <>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ color: "red" }}>
            Theater Dashboard
          </Typography>
          <Box>
            <Button sx={{ color: "white", backgroundColor: "red", mx: 1 }} onClick={() => navigate('/theaterhome/profile')}>
              Profile
            </Button>
            <Button sx={{ color: "white", backgroundColor: "red", mx: 1 }} onClick={() => navigate('/theaterhome/bookings')}>
              Bookings
            </Button>
            <Button sx={{ color: "white", backgroundColor: "red", mx: 1 }} onClick={() => navigate('/theaterhome/addmovies')}>
              Movies
            </Button>
            <Button sx={{ color: "white", backgroundColor: "red", mx: 1 }} onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Movie List */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Movies in Theater
        </Typography>

        {/* Add Movie Section */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            label="New Movie"
            variant="outlined"
            value={newMovie}
            onChange={(e) => setNewMovie(e.target.value)}
            fullWidth
          />
          <Button 
            variant="contained" 
            sx={{ backgroundColor: "red", color: "white" }} 
            onClick={handleAddMovie}
          >
            Add Movie
          </Button>
        </Box>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : movies.length === 0 ? (
          <Typography>No movies available.</Typography>
        ) : (
          <List>
            {movies.map((movie, index) => (
              <ListItem 
                key={index} 
                sx={{ 
                  borderBottom: "1px solid #ccc", 
                  py: 2, 
                  display: "flex", 
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    SHOWS: NOON SHOW, EVENING SHOW, NIGHT SHOW
                  </Typography>
                  <Typography variant="h6" sx={{ color: "red", mt: 1 }}> 
                    CURRENT MOVIE: {movie.toUpperCase()}
                  </Typography>
                </Box>
                <IconButton onClick={() => handleRemoveMovie(movie)} color="error">
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </>
  );
}
