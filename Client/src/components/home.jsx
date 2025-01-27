import React, { useState } from 'react';
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
  Button,
  IconButton,
} from '@mui/material';
//  import "./styles.css";
 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Sentiment from 'sentiment'; // Import sentiment package
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import spiderman from '../assets/spidey.avif';
import johnwick from '../assets/johnwick1.jpg';
import johnwick4 from '../assets/johnwick4.png';
import amazingspidey from '../assets/amazingspidey.jpg';
import civilwar from '../assets/civilwar.jpg';
import civilwar1 from '../assets/civilwar1.jpg';
import avengers from '../assets/avengers.jpg';
import marco2 from '../assets/marco2.jpg';

const HomePage = () => {
  const moviePosters = [spiderman, avengers, johnwick, civilwar];

  const reviews = [
    { img: johnwick4, rating: 4.5, genre: 'Action', artist: 'Keanu Reeves', name: 'John Wick 4' },
    { img: amazingspidey, rating: 3.5, genre: 'Adventure', artist: 'Andrew Garfield', name: 'Amazing Spider-Man' },
    { img: civilwar1, rating: 4.1, genre: 'Action', artist: 'Chris Evans', name: 'Civil War' },
    { img: marco2, rating: 4.5, genre: 'Thriller', artist: 'Marco Johnson', name: 'Marco Thrills' },
  ];

  // States for filters and sentiment analysis
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedArtist, setSelectedArtist] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState('');
  const [wishlist, setWishlist] = useState([]); // State to track wishlist movies

  const sentimentAnalyzer = new Sentiment();

  // Sentiment analysis function
  const analyzeSentiment = (input) => {
    const result = sentimentAnalyzer.analyze(input);
    console.log(result);
    if (result.score > 0) {
      return 'Action';
    } else if (result.score < 0) {
      return 'Thriller';
    }
    return '';
  };

  // Handle sentiment analysis
  const handleSentimentAnalysis = () => {
    const result = analyzeSentiment(userInput);
    setSentimentFilter(result);
  };

  // Add or remove movies from wishlist
  const handleWishlistToggle = (movieName) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(movieName)) {
        console.log(`Removed from wishlist: ${movieName}`);
        return prevWishlist.filter((name) => name !== movieName);
      } else {
        console.log(`Added to wishlist: ${movieName}`);
        return [...prevWishlist, movieName];
      }
    });
  };

  // Filtered reviews
  const filteredReviews = reviews.filter((review) => {
    return (
      (!selectedGenre || review.genre === selectedGenre) &&
      (!selectedArtist || review.artist === selectedArtist) &&
      (!selectedRating || review.rating >= selectedRating) &&
      (!sentimentFilter || review.genre === sentimentFilter)
    );
  });

  const [animationPaused, setAnimationPaused] = useState(false);
    return (
      <Box >
        {/* Navbar */}
        <AppBar position="static" sx={{ backgroundColor: "black" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" component="div" sx={{ color: "red" }}>
              Movie Hub
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Type your interest (e.g., action, thrill)"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                sx={{ backgroundColor: "white", borderRadius: 1 }}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSentimentAnalysis}
                sx={{ backgroundColor: "red" }}
              >
                Search
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
    
        {/* Slideshow */}
        <Box sx={{ position: "relative", overflow: "hidden", height: "600px" }}>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
          >
            {moviePosters.map((poster, index) => (
              <SwiperSlide key={index}>
                <Box
                  sx={{
                    backgroundImage: `url(${poster})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "600px",
                    width: "100%",
                    position: "relative",
                    filter: "brightness(0.8) contrast(1.2)",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
    
        {/* Filter Bar */}
        <Container sx={{ mt: 4, display: "flex", gap: 2 ,backgroundColor: "white"}}>
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
            label="Artist"
            value={selectedArtist}
            onChange={(e) => setSelectedArtist(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ width: 200 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Keanu Reeves">Keanu Reeves</MenuItem>
            <MenuItem value="Andrew Garfield">Andrew Garfield</MenuItem>
            <MenuItem value="Chris Evans">Chris Evans</MenuItem>
            <MenuItem value="Marco Johnson">Marco Johnson</MenuItem>
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
            <MenuItem value={4}>4 & above</MenuItem>
            <MenuItem value={3}>3 & above</MenuItem>
          </TextField>
        </Container>
    
        {/* Reviews Section */}
        <Container sx={{ overflow: "hidden", mt: 4, position: "relative" }}>
        <Box
          className={`scrolling-row ${animationPaused ? "paused" : ""}`}
          onMouseEnter={() => setAnimationPaused(true)}
          onMouseLeave={() => setAnimationPaused(false)}
        >
          {reviews.map((review, index) => (
            <Box
              key={index}
              sx={{
                width: 250,
                marginRight: 2,
                display: "inline-block",
                border: "1px solid red",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.7)",
                backgroundColor: "white",
              }}
            >
              <Box
                sx={{
                  backgroundImage: `url(${review.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "350px",
                }}
              />
              <Box sx={{ padding: 2 }}>
                <Typography variant="h6">{review.name}</Typography>
                <Typography variant="body2">Genre: {review.genre}</Typography>
                <Typography variant="body2">Artist: {review.artist}</Typography>
                <Rating value={review.rating} readOnly precision={0.5} />
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
      </Box>
    );
};

export default HomePage;
