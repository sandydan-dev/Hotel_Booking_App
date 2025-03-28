const Booking = require("../model/booking.model");
const axiosInstance = require("../axiosConfig/userAxios");

const createBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("User ID from token:", userId);

    // Fetch user data from user service
    const response = await axiosInstance.get(`/userId/${userId}`, {
      headers: {
        Authorization: req.headers.authorization,
      },
    });

    const userData = response.data.data;

    const { hotelId, roomNumber, checkInDate, checkOutDate, totalPrice } =
      req.body;

    const newBooking = new Booking({
      userId,
      hotelId,
      roomNumber,
      checkInDate,
      checkOutDate,
      totalPrice,
    });
    const savedBooking = await newBooking.save();

    // populate hotel details
    const populatedBooking = await Booking.findById(savedBooking._id).populate(
      "userId"
    ); 

    res.status(201).json({
      message: "Booking created successfully",
      booking: populatedBooking,
    });
  } catch (error) {
    console.error("Error during booking creation:", error.message); 
    res.status(500).json({
      message: "Error occurred while creating booking",
      error: error.message,
    });
  }
};

module.exports = {
  createBooking,
};


