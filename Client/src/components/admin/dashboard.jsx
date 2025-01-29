import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { Box, Container, Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography } from '@mui/material';
import ViewMovies from './viewcinema'; // Import ViewMovies component
import ViewArtists from './viewartist'; // Import ViewArtists component
import AddMovieForm from './addmovie'; // Import AddMovieForm component
import AddArtistForm from './addartist'; // Import AddArtistForm component

const AdminDashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          <ListItem button component={Link} to="/admin/view-movies">
            <ListItemText primary="View Movies" />
          </ListItem>
          <ListItem button component={Link} to="/admin/view-artists">
            <ListItemText primary="View Artists" />
          </ListItem>
          {/* <ListItem button component={Link} to="/admin/add-movie-form">
            <ListItemText primary="Add Movie" />
          </ListItem>
          <ListItem button component={Link} to="/admin/add-artist-form">
            <ListItemText primary="Add Artist" />
          </ListItem> */}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
        }}
      >
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" noWrap>
              Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
