import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TheaterLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData)
    axios.post("http://localhost:9000/theater/theaterlogin",formData)
    .then((res)=>
      {
        alert(res.data.msg)
        if(res.data.status==200)
        {
         navigate('/theaterhome')
         localStorage.setItem("token",res.data.token)
        }
      })
    .catch(err=>{
      console.log(err)
    })
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Theater Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>

          <Grid container justifyContent="center" sx={{ mt: 2 }}>
            <Grid item>
              <Button onClick={() => navigate("/register-theater")} color="secondary">
                Don't have an account? Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default TheaterLogin;
