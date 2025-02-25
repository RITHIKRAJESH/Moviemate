const express = require('express');
const adminRouter = express.Router();
const { addMovie, addArtist, getArtist, getMovies } = require('../controls/adminControl');
const multer = require('multer');
const path=require('path')

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
    console.log("multer")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now()+ path.extname(file.originalname));
  },
});

const upload = multer({ storage:storage });

adminRouter.route('/add-movie').post(
  upload.fields([
    { name: 'poster', maxCount: 1 },
    { name: 'video', maxCount: 1 }
  ]),
  addMovie
);

adminRouter.route('/add-artist').post(upload.single('image'), addArtist);

adminRouter.route("/get-artist").get(getArtist)
adminRouter.route("/get-movies").get(getMovies)
module.exports = adminRouter;
