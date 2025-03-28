const express = require("express");
const router = express.Router();

//todo : Hotel controllers
const {
  createHotelData,
  getHotelData,
  updateHotelData,
  sortHotelByRating,
  deleteHotelData,
  findHotelByName,
  findHotelByLocation,
  sortHotelByPrice,
} = require("../controller/hotel.controller");

// todo : HOTEL ROUTES

//? create hotel data
//? endpoint : http://localhost:5001/api/v1/hotel/hotel-data
router.post("/hotel-data", createHotelData);

//? get hotel list
//? endpoint : http://localhost:5001/api/v1/hotel/hotel-lists
router.get("/hotel-lists", getHotelData);

//? update hotel data
//? endpoint : http://localhost:5001/api/v1/hotel/hotel-update/:id
router.patch("/hotel-update/:id", updateHotelData);

//? sort hotel by rating
//? endpoint : http://localhost:5001/api/v1/hotel/hotel-rating?sort=asc
router.get("/hotel-rating", sortHotelByRating);

//? find hotel by hotel name
//? endpoint : http://localhost:5001/api/v1/hotel/hotel-name?hotelName=hotelName
router.get("/hotel-name/:hotelName", findHotelByName);

//? delete hotel data
//? endpoint : http://localhost:5001/api/v1/hotel/hotel-delete/:id
router.delete("/hotel-delete/:id", deleteHotelData);

//? find hotel by location
//? endpoint : http://localhost:5001/api/v1/hotel/hotel-location/:location
router.get("/hotel-location/:location", findHotelByLocation);

//? sort hotel by price
//? endpoint : http://localhost:5001/api/v1/hotel/hotel-price?price=asc
router.get("/hotel-price", sortHotelByPrice);

module.exports = router;
