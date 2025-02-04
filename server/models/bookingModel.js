const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'movie', required: true },
    theater: { type: mongoose.Schema.Types.ObjectId, ref: 'theater', required: true },
    date: { type: Date, required: true },
    seats: { type: [String], required: true },
    totalPrice: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookSchema);
