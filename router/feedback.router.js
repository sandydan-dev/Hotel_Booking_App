const express = require("express");
const router = express.Router();

const verifyToken = require("../middelware/jwt.middelware");

const {
  getFeedBack,
  createFeedBack,
  getAllFeedBackDetails,
} = require("../controller/feedback.controller");

router.get("/feedback", verifyToken, getFeedBack);

//? create feedback data
router.post("/create_feedback", verifyToken, createFeedBack);

//? get all feedback datails
router.get("/feedback_details", getAllFeedBackDetails);

module.exports = router;
