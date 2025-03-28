const express = require("express");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables

const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Debugging log for JWT_SECRET
console.log("JWT Secret from .env:", process.env.JWT_SECRET);

// connection to DB
const connetionDB = require("./config/db.connection");
connetionDB();

// modules imports
const hotelRouter = require("./router/hotel.router"); // booking router
const bookingRouter = require("./router/booking.router"); // booking router

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

//todo: routes

//? hotel routes
app.use("/api/v1/hotel", hotelRouter);

//? booking routes
app.use("/api/v1/book-hotel", bookingRouter);

module.exports = app;
