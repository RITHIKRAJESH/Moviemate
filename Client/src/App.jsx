import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import ViewMovies from "./components/admin/viewcinema";
import AdminDashboard from "./components/admin/dashboard";
import Bookmovie from "./components/bookmovie";
import PaymentPage from "./components/paymentpage";
import RegisterTheater from "./components/theater/register";
import UserRegister from "./components/registerUser";
import Userhome from "./components/user/userhome";
import ViewMovie from "./components/user/viewmovies";
import TheaterLogin from "./components/theaterlogin";

// Lazy loading components
const HomePage = React.lazy(() => import("./components/home"));
const MovieDetailsPage = React.lazy(() => import("./components/viewdetail"));
const ArtistForm = React.lazy(() => import("./components/admin/addartist"));
const AddMovieForm = React.lazy(() => import("./components/admin/addmovie"));
const ViewArtist=React.lazy(()=>import("./components/admin/viewartist"))
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/userhome" element={<Userhome/>}/> 
        <Route path="/movie-details/:id" element={<MovieDetailsPage />} />
        <Route path="/user/book-movie/:id" element={<Bookmovie/>}/>
        <Route path="/user/movie/:id" element={<ViewMovie/>}/>
        {/* Admin router */}
        <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
        <Route path="/admin/add-artist-form" element={<ArtistForm />} />
        <Route path="/admin/add-movie-form" element={<AddMovieForm />} />
        <Route path="/admin/view-artists" element={<ViewArtist />} />
        <Route path="/admin/view-movies" element={<ViewMovies />} />
        <Route path="/payment-page" element={<PaymentPage/>}/>
        <Route path="/register-theater" element={<RegisterTheater/>}/>
        <Route path="/theaterlogin" element={<TheaterLogin/>}/>
        <Route path="/register-user"  element={<UserRegister/>}/>
      </Routes>
    </Suspense>
  );
}

export default App;
