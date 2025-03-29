const express = require("express");
const dotenv = require("dotenv");
dotenv.config(); 

const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");


// connection to DB
const connetionDB = require("./config/db.connection");
connetionDB();

// modules imports
const hotelRouter = require("./router/hotel.router"); // booking router
const bookingRouter = require("./router/booking.router"); // booking router
const feedBackRouter = require('./router/feedback.router') // feedback router
// const feedbackRoutes = require("./routes/feedback.routes"); // feedback routes

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

//todo: routes

//? hotel routes
app.use("/api/v1/hotel", hotelRouter);

//? booking routes
app.use("/api/v1/book_hotel", bookingRouter);

//? feedback routes
app.use('/api/v1/user_feedback', feedBackRouter);

module.exports = app;
