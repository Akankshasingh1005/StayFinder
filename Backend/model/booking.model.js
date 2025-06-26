import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["active", "cancelled"],
    default: "active"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  }
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
