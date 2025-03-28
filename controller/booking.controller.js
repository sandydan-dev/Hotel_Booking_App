const Booking = require("../model/booking.model");
const axiosInstance = require("../axiosConfig/userAxios");

//? create booking
const createBooking = async (req, res) => {
  try {
    let userServiceId = req.user.id;

    console.log("User ID from token:", userServiceId);

    const response = await axiosInstance.get(`/userId/${userServiceId}`, {
      headers: {
        Authorization: req.headers.authorization,
      },
    });

    const userData = response.data.data;
    console.log("User Data:", userData);

    const {
      userId,
      hotelId,
      roomNumber,
      checkInDate,
      checkOutDate,
      bookingDate,
      totalPrice,
      status,
    } = req.body;

    const newBooking = new Booking({
      userId: userServiceId,
      hotelId,
      roomNumber,
      checkInDate,
      checkOutDate,
      bookingDate,
      totalPrice,
      status,
    });
    const savedBooking = await newBooking.save();

    const populatedBooking = await Booking.findById(savedBooking._id).populate(
      "hotelId"
    );

    res.status(201).json({
      message: "Booking created successfully",
      booking: populatedBooking,
    });
  } catch (error) {
    console.error("Error during booking creation:", error);
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

//? get booking by id
const getBookingsById = async (req, res) => {
  try {
    const bookId = req.params.id;

    const bookedHotel = await Booking.findById(bookId);

    if (!bookedHotel) {
      return res.status(404).json({ message: "Booking Id not found" });
    }

    return res.status(200).json({ message: "Booked Id found", bookedHotel });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while getting booking Id", error });
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

//? get pending booking data
const getPendingBookingData = async (req, res) => {
  try {
    const booking = await Booking.find({ status: "pending" });
    if (!booking) {
      return res
        .status(404)
        .json({ message: "Pending Booking is not available" });
    }
    return res.status(200).json({ messges: "Pending Bookings", booking });
  } catch (error) {
    return res
      .statu(500)
      .json({ message: "Error while getting pending data", error });
  }
};

module.exports = {
  createBooking,
  getAllBookedDataDetails,
  getBookingsById,
  updateBookingData,
  updateBookingStatus,
  deleteBookingData,
  getConfirmedBookingData,
  getCancelledBookingData,
  getPendingBookingData,
};
