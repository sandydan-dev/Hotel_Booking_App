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

// find Feedback by userId
const findFeedBackByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const feedback = await FeedBack.find({ userId });

    if (!feedback || feedback.length === 0) {
      return res.status(404).json({ message: "Feedback for userId not found" });
    }
    return res
      .status(200)
      .json({ message: "Feedback for userId found", feedback });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while getting feedback for userId", error });
  }
};

// find feedback hotelId
const findFeedBackByHotelId = async (req, res) => {
  try {
    const hotelId = req.params.id;

    const feedback = await FeedBack.find({ hotelId });

    if (!feedback || feedback.length === 0) {
      return res.status(404).json({ message: "Feedback for hoteId not found" });
    }

    return res
      .status(200)
      .json({ message: "Feedback for hotelId found", feedback });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while getting feedback for hotelId", error });
  }
};

//? sort feedback by rating

const sortFeedByRating = async (req, res) => {
  try {
    const feedASC_DSEC = req.params.order;

    const feedback = await FeedBack.find();

    const messag = "";

    const sortFeed = feedback.sort((a, b) => {
      if (feedASC_DSEC === "asc") {
        messag = "Feedback low to high";
        return a.rating - b.rating;
      }

      if (feedASC_DSEC === "desc") {
        messag = "Feedback high to low";
        return b.rating - a.rating;
      }
    });

    if (!feedback || feedback.length === 0) {
      return res.status(404).json({ message: "Feedback not found for sort" });
    }

    return res
      .status(200)
      .json({
        msg: "Feedback sort by rating",
        feedback,
        messag,
        sortFeed,
      });
  } catch (error) {
    return res.status(500).json({ message: "error while sortinig", error });
  }
};

module.exports = {
  getFeedBack,
  createFeedBack,
  getAllFeedBackDetails,
  findFeedBackByUserId,
  findFeedBackByHotelId,
  sortFeedByRating,
};
