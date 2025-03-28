const express = require("express");
const router = express.Router();

const verifyToken = require("../middelware/jwt.middelware");

//todo : Booking controllers
const {
  createBooking,
  getAllBookedDataDetails,
  updateBookingData,
  updateBookingStatus,
  deleteBookingData,
  getConfirmedBookingData,
  getCancelledBookingData
} = require("../controller/booking.controller");

// routes
//? create booking
router.post("/create-booking", verifyToken, createBooking);

//? Get all booked details
router.get("/booking-details", getAllBookedDataDetails);


//? update booking data
router.patch("/update-booking/:id", updateBookingData);

//? update booking status
router.patch("/update-booking-status/:id", updateBookingStatus);

//? delete booking data
router.delete("/delete-booking/:id", deleteBookingData);

//? get confirmed booking data
router.get("/confirmed-booking", getConfirmedBookingData);

//? get cancelled booking data
router.get("/cancelled-booking", getCancelledBookingData);




module.exports = router;
