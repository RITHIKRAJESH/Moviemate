import React, { useEffect, useState } from 'react';
import AXIOS from 'axios';
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Fab
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material'; // Import AddIcon for the button
import { Link } from 'react-router-dom'; // Import Link for navigation

const ViewMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AXIOS.get('http://localhost:9000/admin/get-movies')
      .then((response) => {
        setMovies(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load movie details');
        setLoading(false);
      });
  }, []);

  // If loading
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  // If there's an error
  if (error) {
    return <Typography>{error}</Typography>;
  }

  

  return (
    <Container maxWidth="xl">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Movies List
        </Typography>

        {/* Table to display movie information */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Movie Name</strong></TableCell>
                <TableCell><strong>Release Date</strong></TableCell>
                <TableCell><strong>Budget</strong></TableCell>
                <TableCell><strong>Actors</strong></TableCell>
                <TableCell><strong>Rating</strong></TableCell>
                <TableCell><strong>Platform</strong></TableCell>
                <TableCell><strong>Poster</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movies.map((movie) => (
                <TableRow key={movie._id}>
                  <TableCell>{movie.movieName}</TableCell>
                  <TableCell>{new Date(movie.releaseDate).toLocaleDateString()}</TableCell>
                  <TableCell>${movie.budget}million</TableCell>
                  <TableCell>{movie.actors.join(', ')}</TableCell>
                  <TableCell>{movie.rating}</TableCell>
                  <TableCell>{movie.platform}</TableCell>
                  <TableCell>
                    {movie.poster && (
                      <img
                        src={`http://localhost:9000/${movie.poster}`}
                        alt={movie.movieName}
                        style={{ width: '100px', height: 'auto' }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {/* <Button variant="contained" color="primary" size="small">
                      Edit
                    </Button> */}
                    <Button variant="contained" color="secondary" size="small" style={{ marginLeft: '10px' }}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box mt={2}>
          <Button variant="contained" color="primary" href="/admin/dashboard">
            Back to Dashboard
          </Button>
        </Box>
      </Box>

      {/* Floating action button to redirect to Add Movie Form */}
      <Link to="/admin/add-movie-form">
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 1000, // Ensure it stays on top
          }}
        >
          <AddIcon />
        </Fab>
      </Link>
    </Container>
  );
};

export default ViewMovies;
