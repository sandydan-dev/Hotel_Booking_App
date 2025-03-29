const Like = require("../model/like.model");
const Hotel = require("../model/hotel.model");
const axiosInstance = require("../axiosConfig/userAxios");

const createLike = async (req, res) => {
  try {
    const userServiceId = req.user.id;
    const { hotelId } = req.body;

    console.log("User ID from token:", userServiceId);

    const response = await axiosInstance.get(`/userId/${userServiceId}`, {
      headers: {
        Authorization: req.headers.authorization,
      },
    });

    if (!response.data || !response.data.data) {
      console.error("Unexpected response structure:", response.data);
      return res
        .status(500)
        .json({ message: "Invalid response from user service" });
    }

    const userData = response.data.data;
    console.log("User Data:", userData);

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const like = await Like.create({
      userId: userServiceId,
      hotelId,
    });

    return res.status(201).json({ message: "Hotel liked successfully", like });
  } catch (error) {
    console.error("Error during like creation:", error.message);
    if (error.response) {
      console.error("Error Response Data:", error.response.data);
    }
    return res
      .status(500)
      .json({ message: "Error while creating like", error: error.message });
  }
};

//? get all liked data

const getLikedData = async (req, res) => {
  try {
    const liked = await Like.find();

    if (!liked || liked.length === 0) {
      return res.status(404).json({ message: "Liked list not found" });
    }
    return res.status(200).json({ message: "Liked List...", liked });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while fetching liked list", error });
  }
};

//? get details which users like the hotels list
const userLikedHotels = async (req, res) => {
  try {
    const userAuthId = req.params.id;

    const hotel = await Hotel.find();

    if (!hotel) {
      return res.status(404).json({ message: "not found" });
    }

    const likedRecords = [];

    for (let i = 0; i < hotel.length; i++) {
      likedRecords.push(hotel[i]._id);
    }

    const liked = await Like.find({
      userId: userAuthId,
      hotelId: likedRecords,
    });

    const populateHotels = await Like.find().populate("hotelId");

    console.log(populateHotels);

    return res
      .status(200)
      .json({ message: "user liked hotels", populateHotels });
  } catch (error) {
    return res.status(500).json({ message: "while geting liked data", error });
  }
};

module.exports = {
  createLike,
  getLikedData,
  userLikedHotels,
};
