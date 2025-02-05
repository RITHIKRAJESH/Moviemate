const TheaterModel = require("../models/theaterModel");
const bcrypt = require("bcrypt");

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


const viewBooking=(req,res)=>{

}
module.exports = { registerTheater , viewBooking};
