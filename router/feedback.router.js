const express = require("express");
const router = express.Router();

const verifyToken = require("../middelware/jwt.middelware");

const {
  getFeedBack,
  createFeedBack,
  getAllFeedBackDetails,
  findFeedBackByUserId,
  findFeedBackByHotelId,
  sortFeedByRating,
} = require("../controller/feedback.controller");

router.get("/feedback", verifyToken, getFeedBack);

//? create feedback data
router.post("/feedback_create", verifyToken, createFeedBack);

//? get all feedback datails
router.get("/feedback_details", getAllFeedBackDetails);

//? get feedback by userId
router.get("/feedback_userId/:id", findFeedBackByUserId);

//? get feedback by hotelId
router.get("/feedback_hotelId/:id", findFeedBackByHotelId);

//? get feedback for sort
router.get("/feedback_sort/:order", sortFeedByRating);

module.exports = router;
