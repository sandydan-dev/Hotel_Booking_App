const mongoose = require("mongoose");

const cancelBookingSchema = new mongoose(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    cancellationReason: {
      type: String,
      required: true,
    },
    refundStatus: {
      type: String,
      enum: ["Initiated", "Completed", "Not Applicable"],
      default: "Initiated",
    },
  },
  {
    timestamps: true,
  }
);

const CancelBooking = mongoose.model("CancelBooking", cancelBookingSchema);

module.exports = CancelBooking;
