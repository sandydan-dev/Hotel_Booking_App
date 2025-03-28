const Hotel = require("../model/hotel.model");
const axios = require("axios"); // Import axios for HTTP requests

//? create hotel data
const createHotelData = async (req, res) => {
  try {
    // Fetch user ID from user service
    const userServiceUrl = "http://user-service-url/api/users"; // Replace with actual user service URL
    const userResponse = await axios.get(`${userServiceUrl}/${req.body.userId}`);
    const userId = userResponse.data.id;

    // Attach userId to the hotel data
    const newHotel = new Hotel({ ...req.body, userId });
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "something went wrong",
      error: error.message,
    });
  }
};

//? get hotel data
const getHotelData = async (req, res) => {
  try {
    const hotelData = await Hotel.find();
    res.status(200).json(hotelData);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "something went wrong",
      error: error.message,
    });
  }
};

//? update hotel data
const updateHotelData = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const updatedData = req.body;
    const hotel = await Hotel.findByIdAndUpdate(hotelId, updatedData, {
      new: true,
    });

    if (!hotel) {
      return res.status(404).json({
        status: "fail",
        message: "Hotel not found",
      });
    }
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({
      message: "something went wrong, try again",
      error: error.message,
    });
  }
};

//? sort hotel by rating
const sortHotelByRating = async (req, res) => {
  try {
    const sortByRating = req.query.sort;
    const hotel = await Hotel.find();

    const sortedHotel = hotel.sort((a, b) => {
      if (sortByRating === "asc") {
        return (a.rating = b.rating);
      }
      if (sortByRating === "desc") {
        return (b.rating = a.rating);
      }
      return hotel;
    });
    res.status(200).json(sortedHotel);
  } catch (error) {
    res.status(500).json({
      message: "Error occured while sorting hotel",
      error: error.message,
    });
  }
};

//? delete hotel data
const deleteHotelData = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const hotel = await Hotel.findByIdAndDelete(hotelId);
    if (!hotel) {
      return res.status(404).json({
        message: "Hotel not found",
      });
    }
    res.status(200).json({ message: "Hotel deleted successfully", hotel });
  } catch (error) {
    res.status(500).json({
      message: "Error occured while deleting hotel",
      error: error.message,
    });
  }
};

//? find hotel by hotel name
const findHotelByName = async (req, res) => {
  try {
    const hotelName = req.params.hotelName;
    const hotel = await Hotel.find({
      hotelName: { $regex: hotelName, $options: "i" },
    });

    if (!hotel || hotel.length === 0) {
      return res.status(404).json({
        message: "Hotel not found",
      });
    }
    res.status(200).json({ message: "Hotel Name found", hotel });
  } catch (error) {
    res.status(500).json({
      message: "Error occured while finding hotel",
      error: error.message,
    });
  }
};

//? find hotel by location
const findHotelByLocation = async (req, res) => {
  try {
    const location = req.params.location;
    const hotel = await Hotel.find({
      location: {
        $regex: location,
        $options: "i",
      },
    });

    if (!hotel || hotel.length === 0) {
      return res.status(404).json({
        message: "Hotel not found",
      });
    }
    res.status(200).json({ message: "Hotel location found", hotel });
  } catch (error) {
    res.status(500).json({
      message: "Error occured while finding hotel locationF",
      error: error.message,
    });
  }
};

//? sort hotel by price
const sortHotelByPrice = async (req, res) => {
  try {
    const pricePerNight = req.query.price;
    const hotel = await Hotel.find();
    let message = "";

    const sortedHotelPrice = hotel.sort((a, b) => {
      if (pricePerNight === "asc") {
        message = "Hotel sorted by price low to high";
        return a.pricePerNight - b.pricePerNight;
      }
      if (pricePerNight === "desc") {
        message = "Hotel sorted by price high to low";
        return b.pricePerNight - a.pricePerNight;
      }
    });

    res.status(200).json({ message, hotel });
  } catch (error) {
    res.status(500).json({
      message: "Error occured while sorting hotel",
      error: error.message,
    });
  }
};

module.exports = {
  createHotelData,
  getHotelData,
  updateHotelData,
  sortHotelByRating,
  deleteHotelData,
  findHotelByName,
  findHotelByLocation,
  sortHotelByPrice,
};
