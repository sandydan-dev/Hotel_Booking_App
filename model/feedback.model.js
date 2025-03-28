const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5, // Rating system from 1 to 5
    },
  },
  {
    timestamps: true,
  }
);

const FeedBack = mongoose.model("Feedback", feedbackSchema);

module.exports = FeedBack;
