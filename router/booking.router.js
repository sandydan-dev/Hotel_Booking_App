const express = require("express");
const router = express.Router();

const verifyToken = require("../middelware/jwt.middelware");

//todo : Booking controllers
const { createBooking } = require("../controller/booking.controller");

// routes

router.post("/create-booking", verifyToken, createBooking);

module.exports = router;
