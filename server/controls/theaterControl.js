const TheaterModel = require("../models/theaterModel");
const bcrypt = require("bcrypt");
const Booking=require('../models/bookingModel')
const jwt =require('jsonwebtoken')
const registerTheater = async (req, res) => {
    try {
        const { name, license, email, place, password } = req.body;

        // Check if theater already exists
        const existingTheater = await TheaterModel.findOne({ email });
        if (existingTheater) {
            return res.status(400).json({ message: "Theater already registered" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new theater
        const newTheater = new TheaterModel({
            name,
            license,
            email,
            place,
            password: hashedPassword,
        });

        await newTheater.save();
        res.status(201).json({ message: "Theater registered successfully", theater: newTheater });
    } catch (error) {
        res.status(500).json({ message: "Error registering theater", error: error.message });
    }
};


const theaterLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const theater = await TheaterModel.findOne({ email });
        if (!theater) {
            return res.status(404).json({ msg: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, theater.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }
        const token = jwt.sign(
            {theater},
           'jwt-authentication-key', 
            { expiresIn: "1h" } 
        );
        res.json({ msg: "Login successful","token":token,status:200});
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

const viewBooking=async(req,res)=>{
    try{
        const id=req.headers.id
        const mybooking=await Booking.find({theaterId:id}).populate("userId")
        .populate("movieId")
        res.json(mybooking)
    }catch(err){
        console.log(err)
    }
}


const viewProfile=async(req,res)=>{
    try{
        const id=req.headers.id
        const details=await TheaterModel.findOne({_id:id})
        res.json(details)
    }catch(err){
        console.log(err)
    }
}


const removeMovie = async (req, res) => {
    try {
        const { theaterId, movie } = req.body;
        
        if (!theaterId || !movie) {
            return res.status(400).json({ message: "Theater ID and movie are required" });
        }

        const updatedTheater = await TheaterModel.findByIdAndUpdate(
            theaterId,
            { $pull: { movies: movie } }, 
            { new: true } 
        );

        if (!updatedTheater) {
            return res.status(404).json({ message: "Theater not found" });
        }

        res.json({ message: "Movie removed successfully", updatedTheater });
    } catch (err) {
        console.error("Error removing movie:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const addMovie=async(req,res)=>{
    try{
        const { theaterId, movie } = req.body;
        const updatedTheater = await TheaterModel.findByIdAndUpdate(
            theaterId,
            { $push: { movies: movie.toUpperCase() } }, 
            { new: true } 
        );
        if (!updatedTheater) {
            return res.status(404).json({ message: "Theater not found" });
        }

        res.json({ message: "Movie added successfully", updatedTheater });
    }catch (err) {
        console.error("Error adding movie:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = { registerTheater , viewBooking ,theaterLogin ,viewProfile ,removeMovie, addMovie};
