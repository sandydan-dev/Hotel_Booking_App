const express = require("express");
const router = express.Router();

const verifyToken = require("../middelware/jwt.middelware");

//todo : Booking controllers
const {
  createBooking,
  getAllBookedDataDetails,
  getBookingsById,
  updateBookingData,
  updateBookingStatus,
  deleteBookingData,
  getConfirmedBookingData,
  getCancelledBookingData,
  getPendingBookingData,
} = require("../controller/booking.controller");

// routes
//? create booking
router.post("/create_booking", verifyToken, createBooking);

//? Get all booked details
router.get("/booking_details", getAllBookedDataDetails);

//? get booked data by id
router.get('/booking_id/:id', getBookingsById)

//? update booking data
router.patch("/update_booking/:id", updateBookingData);

//? update booking status
router.patch("/update_booking-status/:id", updateBookingStatus);

//? delete booking data
router.delete("/delete_booking/:id", deleteBookingData);

//? get confirmed booking data
router.get("/confirmed_booking", getConfirmedBookingData);

//? get cancelled booking data
router.get("/cancelled_booking", getCancelledBookingData);

//? get pending booking data
router.get("/pending_booking", getPendingBookingData);

module.exports = router;
