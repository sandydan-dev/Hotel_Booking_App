const Booking = require("../model/booking.model");
const axiosInstance = require("../axiosConfig/userAxios");

//? create booking
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
    console.log("User Data:", userData);

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

//? get all booked data
const getAllBookedDataDetails = async (req, res) => {
  try {
    const bookings = await Booking.find();

    if (bookings.length === 0) {
      return res.status(404).json({
        message: "No bookings data found",
      });
    }

    res.status(200).json({
      message: "Bookings data fetched successfully",
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while fetching bookings data",
      error: error.message,
    });
  }
};

// ? update booking data
const updateBookingData = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const updatedData = req.body;
    const booking = await Booking.findByIdAndUpdate(bookingId, updatedData, {
      new: true,
    });
    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }
    res.status(200).json({ message: "Booking updated successfully", booking });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while updating booking",
      error: error.message,
    });
  }
};

//? update booking status
const updateBookingStatus = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }
    res
      .status(200)
      .json({ message: "Booking status updated successfully", booking });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while updating booking status",
      error: error.message,
    });
  }
};

//? delete booking data
const deleteBookingData = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findByIdAndDelete(bookingId);
    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }
    res.status(200).json({ message: "Booking deleted successfully", booking });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while deleting booking",
      error: error.message,
    });
  }
};

getConfirmedBookingData = async (req, res) => {
  try {
    const confirmedBooking = await Booking.find({ status: "confirmed" });
    if (confirmedBooking.length === 0) {
      return res.status(404).json({
        message: "No confirmed bookings found",
      });
    }
    res.status(200).json({
      message: "Confirmed bookings fetched successfully",
      confirmedBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while fetching confirmed bookings",
      error: error.message,
    });
  }
};

// find status if canceled
const getCancelledBookingData = async (req, res) => {
  try {
    const cancelledBooking = await Booking.find({ status: "cancelled" });
    if (cancelledBooking.length === 0) {
      return res.status(404).json({
        message: "No cancelled bookings found",
      });
    }
    res.status(200).json({
      message: "Cancelled bookings fetched successfully",
      cancelledBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while fetching cancelled bookings",
      error: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getAllBookedDataDetails,
  updateBookingData,
  updateBookingStatus,
  deleteBookingData,
  getConfirmedBookingData,
  getCancelledBookingData,
};
