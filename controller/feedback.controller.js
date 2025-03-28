const Booking = require("../model/booking.model");
const Hotel = require("../model/hotel.model");
const FeedBack = require("../model/feedback.model");
const axiosInstance = require("../axiosConfig/userAxios");

const getFeedBack = async (req, res) => {
  res.send("hello feedback");
};

const createFeedBack = async (req, res) => {
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

    const { hotelId, comment, rating } = req.body;

    const feedback = await FeedBack.create({
      userId: userServiceId,
      hotelId,
      comment,
      rating,
    });

    return res
      .status(201)
      .json({ messge: "Feedback create successfully", feedback });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while creating feedback", error });
  }
};

const getAllFeedBackDetails = async (req, res) => {
  try {
    const feedback = await FeedBack.find();

    if (feedback.length === 0) {
      return res.status(404).json({ message: "feedback data not found" });
    }
    return res.status(200).json({ message: "Feedback data found", feedback });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while getting feedback data", error });
  }
};

module.exports = {
  getFeedBack,
  createFeedBack,
  getAllFeedBackDetails
};
