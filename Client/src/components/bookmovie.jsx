import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./styles.css";

const seats = Array.from({ length: 75 }, (_, i) => i + 1).reverse();
const ticketPrices = {
  "Morning Show": 8,
  "Afternoon Show": 10,
  "Evening Show": 12,
  "Night Show": 15,
};

export default function BookMovie() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [theaters, setTheaters] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState("");
  const [userId, setUserId] = useState(null); // State to store the userId
  const { id } = useParams(); // Get movie _id from URL params
  const navigate = useNavigate();

  useEffect(() => {
    // Get the email from localStorage
    const email = localStorage.getItem("email");

    // If email is found, fetch the userId from the backend
    if (email) {
      axios
        .get(`http://localhost:9000/user/getUserByEmail/`,{headers:{email:email}})
        .then((res) => {
          setUserId(res.data.userId); 
          console.log(res.data)// Store the userId in state
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
        });
    }

    // Fetch theaters displaying the movie
    axios.get(`http://localhost:9000/user/viewtheater/${id}`)
      .then((res) => {
        setTheaters(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error fetching theaters:", err);
      });
  }, [id]);

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const seatRows = [];
  const seatsPerRow = 10;
  for (let i = 0; i < seats.length; i += seatsPerRow) {
    seatRows.push(seats.slice(i, i + seatsPerRow));
  }

  const calculatePrice = () => {
    if (!selectedTime || selectedSeats.length === 0) return 0;
    return ticketPrices[selectedTime] * selectedSeats.length;
  };

  const handleBooking = () => {
    if (!userId) {
      alert("User not logged in");
      return;
    }

    // Make sure to check if all required details are provided before booking
    if (!selectedTheater || !selectedDate || !selectedTime || selectedSeats.length === 0) {
      alert("Please complete all the fields");
      return;
    }

    const bookingDetails = {
      userId,  // Include the userId in the booking details
      movieId: id,
      date: selectedDate,
      time: selectedTime,
      seats: selectedSeats,
      totalPrice: calculatePrice(),
      theater: selectedTheater, // Include selected theater in booking details
    };

    console.log("Booking Details:", bookingDetails);

    // Send booking data to backend
    axios
      .post("http://localhost:9000/user/bookTickets", bookingDetails)
      .then((res) => {
        if(res.status==200){
        navigate("/payment-page", { state: { price: bookingDetails.totalPrice } });}
      })
      .catch((err) => {
        console.error("Error booking tickets:", err);
        alert("There was an issue with the booking. Please try again later.");
      });
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-3 text-center">Book Your Movie Tickets</h1>

      {/* Theater Selection */}
      <div className="form-group">
        <label>Select Theater:</label>
        <select
          className="form-control"
          value={selectedTheater}
          onChange={(e) => setSelectedTheater(e.target.value)}
        >
          <option value="">Select Theater</option>
          {theaters.map((theater) => (
            <option key={theater._id} value={theater._id}>
              {theater.name}
            </option>
          ))}
        </select>
      </div>

      {/* Date Picker */}
      <div className="form-group">
        <label>Select Date:</label>
        <input
          type="date"
          className="form-control"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      {/* Show Time Selection */}
      <div className="form-group mt-2">
        <label>Select Show Time:</label>
        <select
          className="form-control"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          <option value="">Select Show Time</option>
          {Object.keys(ticketPrices).map((time) => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
      </div>

      {/* Seat Selection */}
      <div className="theater mt-3">
        {seatRows.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {row.map((seat, seatIndex) => (
              <button
                key={seat}
                className={`seat-btn ${selectedSeats.includes(seat) ? "selected" : ""}`}
                onClick={() => toggleSeat(seat)}
                style={{
                  marginRight: (seatIndex + 1) % 5 === 0 ? "20px" : "0",
                }}
              >
                {seat}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Summary */}
      <p className="text-center mt-3">Selected Seats: {selectedSeats.join(", ") || "None"}</p>
      <p className="text-center">Total Price: ${calculatePrice()}</p>
      <button
        className="book-btn w-100"
        disabled={!selectedDate || !selectedTime || selectedSeats.length === 0 || !selectedTheater}
        onClick={handleBooking}
      >
        Book Now
      </button>
    </div>
  );
}
