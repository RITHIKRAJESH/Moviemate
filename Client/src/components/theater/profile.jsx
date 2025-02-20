import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Box, Typography, Paper, CircularProgress, AppBar, Toolbar, Button 
} from '@mui/material';

export default function Profile() {
  const navigate = useNavigate();
  const storedToken = localStorage.getItem('token');

  if (!storedToken) {
    navigate('/theaterlogin'); // Redirect if no token
    return null;
  }

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = jwtDecode(storedToken);

  useEffect(() => {
    axios.get("http://localhost:9000/theater/viewProfile", {
      headers: { id: token.theater._id }
    })
    .then((res) => {
      setProfile(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.log("Error fetching profile:", err);
      setError("Failed to load profile");
      setLoading(false);
    });
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/theaterlogin");
  };

  if (loading) return <CircularProgress sx={{ mt: 3, mx: "auto", display: "block" }} />;
  if (error) return <Typography color="error" sx={{ mt: 3, textAlign: "center" }}>{error}</Typography>;

  return (
    <>
      {/* AppBar Navigation */}
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

      {/* Profile Information */}
      <Box sx={{ p: 3 }}>
        <Paper sx={{ p: 3, maxWidth: 400, mx: "auto", backgroundColor: "#f8f9fa" }}>
          <Typography variant="h4" gutterBottom>Profile</Typography>
          <Typography variant="h6"><strong>Theater Name:</strong> {profile.name}</Typography>
          <Typography variant="h6"><strong>Email:</strong> {profile.email}</Typography>
          <Typography variant="h6"><strong>License:</strong> {profile.license}</Typography>
          <Typography variant="h6"><strong>Location:</strong> {profile.place}</Typography>
          <Typography variant="h6"><strong>Last Updated:</strong> {new Date(profile.updatedAt).toLocaleString()}</Typography>
        </Paper>
      </Box>
    </>
  );
}
