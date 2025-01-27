import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import ViewMovies from "./admin/viewcinema";
import AdminDashboard from "./admin/dashboard";

// Lazy loading components
const HomePage = React.lazy(() => import("./components/home"));
const MovieDetailsPage = React.lazy(() => import("./components/viewdetail"));
const ArtistForm = React.lazy(() => import("./admin/addartist"));
const AddMovieForm = React.lazy(() => import("./admin/addmovie"));
const ViewArtist=React.lazy(()=>import("./admin/viewartist"))
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie-details" element={<MovieDetailsPage />} />
        {/* Admin router */}
        <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
        <Route path="/admin/add-artist-form" element={<ArtistForm />} />
        <Route path="/admin/add-movie-form" element={<AddMovieForm />} />
        <Route path="/admin/view-artists" element={<ViewArtist />} />
        <Route path="/admin/view-movies" element={<ViewMovies />} />
        
      </Routes>
    </Suspense>
  );
}

export default App;
