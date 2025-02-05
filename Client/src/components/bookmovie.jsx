// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import "./styles.css";

// const seats = Array.from({ length: 75 }, (_, i) => i + 1).reverse();
// const ticketPrices = {
//   "Morning Show": 8,
//   "Afternoon Show": 10,
//   "Evening Show": 12,
//   "Night Show": 15,
// };

// export default function BookMovie() {
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedTime, setSelectedTime] = useState("");
//   const [theaters, setTheaters] = useState([]);
//   const [booked, setBooked] = useState([]);
//   const [bookedSeats, setBookedSeats] = useState([]);
//   const [selectedTheater, setSelectedTheater] = useState("");
//   const [userId, setUserId] = useState(null);

//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const email = localStorage.getItem("email");

//     if (email) {
//       axios
//         .get(`http://localhost:9000/user/getUserByEmail/`, { headers: { email } })
//         .then((res) => setUserId(res.data.userId))
//         .catch((err) => console.error("Error fetching user:", err));
//     }

//     axios
//       .get(`http://localhost:9000/user/viewtheater/${id}`)
//       .then((res) => setTheaters(res.data))
//       .catch((err) => console.error("Error fetching theaters:", err));

//     axios
//       .get("http://localhost:9000/user/fetchbooked")
//       .then((res) => setBooked(res.data))
//       .catch((err) => console.error("Error fetching booked seats:", err));
//   }, [id]);

//   useEffect(() => {
//     if (selectedTheater && selectedDate && selectedTime && booked.length > 0) {
//       const filteredSeats = booked
//         .filter(
//           (ticket) =>
//             ticket.movieId._id === id &&
//             ticket.theaterId._id === selectedTheater &&
//             ticket.date.split("T")[0] === selectedDate &&
//             ticket.time === selectedTime
//         )
//         .flatMap((ticket) => ticket.seats);

//       setBookedSeats(filteredSeats.map(Number)); // Convert to integers
//     }
//   }, [selectedTheater, selectedDate, selectedTime, booked, id]);

//   const toggleSeat = (seat) => {
//     if (bookedSeats.includes(seat)) {
//       alert("This seat is already booked. Please choose another.");
//       return;
//     }
//     setSelectedSeats((prev) =>
//       prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
//     );
//   };

//   const seatRows = [];
//   const seatsPerRow = 10;
//   for (let i = 0; i < seats.length; i += seatsPerRow) {
//     seatRows.push(seats.slice(i, i + seatsPerRow));
//   }

//   const calculatePrice = () => {
//     return selectedTime && selectedSeats.length > 0
//       ? ticketPrices[selectedTime] * selectedSeats.length
//       : 0;
//   };

//   const handleBooking = () => {
//     if (!userId) {
//       alert("User not logged in");
//       return;
//     }
//     if (!selectedTheater || !selectedDate || !selectedTime || selectedSeats.length === 0) {
//       alert("Please complete all the fields.");
//       return;
//     }

//     const email = localStorage.getItem("email");
//     const bookingDetails = {
//       userId,
//       movieId: id,
//       date: selectedDate,
//       time: selectedTime,
//       seats: selectedSeats,
//       totalPrice: calculatePrice(),
//       theaterId: selectedTheater,
//       email,
//     };

//     axios
//       .post("http://localhost:9000/user/bookTickets", bookingDetails)
//       .then((res) => {
//         if (res.status === 200) {
//           navigate("/payment-page", { state: { price: bookingDetails.totalPrice } });
//         }
//       })
//       .catch((err) => {
//         console.error("Error booking tickets:", err);
//         alert("There was an issue with the booking. Please try again later.");
//       });
//   };

//   return (
//     <div className="container mt-4">
//       <h1 className="mb-3 text-center">Book Your Movie Tickets</h1>

//       {/* Theater Selection */}
//       <div className="form-group">
//         <label>Select Theater:</label>
//         <select
//           className="form-control"
//           value={selectedTheater}
//           onChange={(e) => setSelectedTheater(e.target.value)}
//         >
//           <option value="">Select Theater</option>
//           {theaters.map((theater) => (
//             <option key={theater._id} value={theater._id}>
//               {theater.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Date Picker */}
//       <div className="form-group">
//         <label>Select Date:</label>
//         <input
//           type="date"
//           className="form-control"
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//           min={new Date().toISOString().split("T")[0]}
//         />
//       </div>

//       {/* Show Time Selection */}
//       <div className="form-group mt-2">
//         <label>Select Show Time:</label>
//         <select
//           className="form-control"
//           value={selectedTime}
//           onChange={(e) => setSelectedTime(e.target.value)}
//         >
//           <option value="">Select Show Time</option>
//           {Object.keys(ticketPrices).map((time) => (
//             <option key={time} value={time}>
//               {time}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Seat Selection */}
//       <div className="theater mt-3">
//         {seatRows.map((row, rowIndex) => (
//           <div key={rowIndex} className="seat-row">
//             {row.map((seat, seatIndex) => (
//               <button
//                 key={seat}
//                 className={`seat-btn ${selectedSeats.includes(seat) ? "selected" : ""}`}
//                 onClick={() => toggleSeat(seat)}
//                 disabled={bookedSeats.includes(seat)}
//                 style={{
//                   marginRight: (seatIndex + 1) % 5 === 0 ? "20px" : "0",
//                   backgroundColor: bookedSeats.includes(seat) ? "red" : "",
//                   cursor: bookedSeats.includes(seat) ? "not-allowed" : "pointer",
//                 }}
//               >
//                 {seat}
//               </button>
//             ))}
//           </div>
//         ))}
//       </div>

//       {/* Summary */}
//       <p className="text-center mt-3">Selected Seats: {selectedSeats.join(", ") || "None"}</p>
//       <p className="text-center">Total Price: ${calculatePrice()}</p>
//       <button
//         className="book-btn w-100"
//         disabled={!selectedDate || !selectedTime || selectedSeats.length === 0 || !selectedTheater}
//         onClick={handleBooking}
//       >
//         Book Now
//       </button>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
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
  const [booked, setBooked] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState("");
  const [userId, setUserId] = useState(null);
  const [movieName, setMovieName] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (email) {
      axios
        .get(`http://localhost:9000/user/getUserByEmail/`, { headers: { email } })
        .then((res) => setUserId(res.data.userId))
        .catch((err) => console.error("Error fetching user:", err));
    }

    // Fetch movie details and filter theaters
    const fetchAndFilterTheaters = async () => {
      try {
        // Fetch movie details
        const movieResponse = await axios.get(`http://localhost:9000/user/movie/${id}`);
        
        console.log("Movie API Response:", movieResponse.data); // Debugging
    
        if (!Array.isArray(movieResponse.data) || movieResponse.data.length === 0) {
          console.error("Movie not found or response is not an array");
          return;
        }
    
        const movie = movieResponse.data[0]; // Get the first object from the array
        const movieName = movie.movieName; // Extract movie name correctly
    
        console.log("Extracted Movie Name:", movieName); // Debugging
    
        setMovieName(movieName); // Update state
    
        // Fetch theaters
        const theaterResponse = await axios.get(`http://localhost:9000/user/viewtheater/${id}`);
        
        console.log("Theater API Response:", theaterResponse.data); // Debugging
    
        // Filter theaters based on movie name
        const filteredTheaters = theaterResponse.data.filter((theater) =>
          theater.movies.includes(movieName)
        );
    
        setTheaters(filteredTheaters);
        console.log("Filtered Theaters:", filteredTheaters);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchAndFilterTheaters();

    axios
      .get("http://localhost:9000/user/fetchbooked")
      .then((res) => setBooked(res.data))
      .catch((err) => console.error("Error fetching booked seats:", err));
  }, [id]);

  useEffect(() => {
    if (selectedTheater && selectedDate && selectedTime && booked.length > 0) {
      const filteredSeats = booked
        .filter(
          (ticket) =>
            ticket.movieId._id === id &&
            ticket.theaterId._id === selectedTheater &&
            ticket.date.split("T")[0] === selectedDate &&
            ticket.time === selectedTime
        )
        .flatMap((ticket) => ticket.seats);

      setBookedSeats(filteredSeats.map(Number));
    }
  }, [selectedTheater, selectedDate, selectedTime, booked, id]);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) {
      alert("This seat is already booked. Please choose another.");
      return;
    }
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
    return selectedTime && selectedSeats.length > 0
      ? ticketPrices[selectedTime] * selectedSeats.length
      : 0;
  };

  const handleBooking = () => {
    if (!userId) {
      alert("User not logged in");
      return;
    }
    if (!selectedTheater || !selectedDate || !selectedTime || selectedSeats.length === 0) {
      alert("Please complete all the fields.");
      return;
    }

    const email = localStorage.getItem("email");
    const bookingDetails = {
      userId,
      movieId: id,
      date: selectedDate,
      time: selectedTime,
      seats: selectedSeats,
      totalPrice: calculatePrice(),
      theaterId: selectedTheater,
      email,
    };

    axios
      .post("http://localhost:9000/user/bookTickets", bookingDetails)
      .then((res) => {
        if (res.status === 200) {
          navigate("/payment-page", { state: { price: bookingDetails.totalPrice } });
        }
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
            <option key={time} value={time}>
              {time}
            </option>
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
                disabled={bookedSeats.includes(seat)}
                style={{
                  marginRight: (seatIndex + 1) % 5 === 0 ? "20px" : "0",
                  backgroundColor: bookedSeats.includes(seat) ? "red" : "",
                  cursor: bookedSeats.includes(seat) ? "not-allowed" : "pointer",
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
