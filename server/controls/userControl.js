const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/userModel'); // Assuming you have a User model
const Movie=require('../models/movieModel')
const Theater=require('../models/theaterModel')
const Booking=require('../models/bookingModel')
const loginUser = async (req, res) => {
    const { name, email } = req.body;
    console.log(name, email); // Assuming you're getting name and email from the request body

    try {
        // 1. Check if user exists
        let user = await User.findOne({ email });

        if (!user) {
            // If the user does not exist, create a new user
            user = new User({
                name,
                email,
                otp: crypto.randomInt(100000, 999999), // Generate OTP
                verify: false // Set verify to false until the OTP is verified
            });
            await user.save();
            console.log('New user created:', user);
        } else {
            // If user exists, generate a new OTP for login
            user.otp = crypto.randomInt(100000, 999999); // 6-digit OTP
            user.verify = false; // Reset verify field
            await user.save();
        }

        // 2. Send OTP via email
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Or your email service
            auth: {
                user: 'rajeshrithik49@gmail.com',
                pass: process.env.pass // Use environment variables for security
            }
        });

        const mailOptions = {
            from: 'rajeshrithik49@gmail.com',
            to: email,
            subject: 'Your OTP for login/registration',
            text: `Your OTP is: ${user.otp}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Error sending OTP', error });
            }
            res.status(200).json({ message: 'OTP sent successfully' });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
           
            return res.status(404).json({ message: 'User not found' });
        }
       
        console.log(otp,"data:",user.otp)
        // Ensure OTP is a string for comparison (to avoid type issues)
        if (user.otp == otp) {
            // Update user to verified
             user.verify=true
           
            res.status(200).json({ message: 'User verified successfully' });
        } else {
            res.status(400).json({ message: 'Invalid OTP' });
        }
        console.log(user.verify)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const userViewmovie = async (req, res) => {
    try {
        // Fetch all movies from the database
        const movies = await Movie.find();

        // Send the movies as a JSON response
        res.status(200).json(movies);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


const userBookTickets = async (req, res) => {
    const id = req.params._id;
    const movieSent = await Movie.findOne({ id });
    if (!movieSent) {
        return res.status(404).json({ message: "Movie not found" });
    }
    const name = movieSent.movieName;
    console.log(name);
    const theaters = await Theater.find({ movies: name });
    console.log(theaters)
   if (theaters.length > 0) {
        res.json(theaters);
    } else {
        res.status(404).json({ message: "No theaters found for this movie" });
    }
};
// In your user controller
const getUserByEmail = async (req, res) => {
    try {
      const user = await User.findOne({ email:req.headers.email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ userId: user._id });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  };
  
  const useraddtickets = async (req, res) => {
    console.log(req.body);
    try {
        const { userId, movieId, theaterId, date, time, seats, totalPrice } = req.body;
        
        const booking = new Booking({
            userId, movieId, theaterId, date, time, seats, totalPrice
        });

        await booking.save();  

        res.status(200).json({ message: "Ticket booked successfully" });  
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something went wrong" });  
    }
};

const ticketPayment=async(req,res)=>{
   
}

const fetchBookedTicket = async (req, res) => {
    try {
        const booked = await Booking.find({paymentStatus:"Completed"})
            .populate('movieId')   
            .populate('theaterId'); 
        res.status(200).json(booked);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong while fetching booked tickets" });
    }
};


module.exports = { loginUser, verifyOtp ,userViewmovie,userBookTickets,getUserByEmail,useraddtickets,fetchBookedTicket};
