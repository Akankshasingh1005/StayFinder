import Booking from "../model/booking.model.js";
import Listing from "../model/listing.model.js";
import User from "../model/user.model.js";

export const createBooking = async (req, res) => {
  try {
    const { listing, startDate, endDate, totalPrice } = req.body;
    const guestId = req.userId;

    const listingData = await Listing.findById(listing );
    if (!listingData) {
      return res.status(404).json({ message: "Listing not found" });
    }
    if(new Date(startDate) >= new Date(endDate)){
      return res.status(400).json({ message: "Invalid Dates" });
    }

    const hostId = listingData.host;

   const conflict = await Booking.findOne({
      listing,
      status: { $ne: "cancelled" },
      $or: [
        {
          startDate: { $lte: new Date(endDate) },
          endDate: { $gte: new Date(startDate) }
        }
      ]
    });
    if (conflict) {
      return res.status(409).json({ message: "Booking dates conflict with existing booking" });
    }

    const newBooking = new Booking({
      host: hostId,
      guest: guestId,
      listing,
      startDate,
      endDate,
      totalPrice
    });

    await newBooking.save();
    return res.status(201).json(newBooking);
  } catch (error) {
    console.error("Create Booking Error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getBookingsByGuest = async (req, res) => {
  try {
    const bookings = await Booking.find({
      guest: req.params.id,
      status: { $ne: "cancelled" }
    })
    .populate("listing")
    .populate("host", "name email");


    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

export const getBookingsByHost = async (req, res) => {
  try {
      const bookings = await Booking.find({
      host: req.params.id,
      status: { $ne: "cancelled" }
    })
    .populate("listing")
    .populate("guest", "name email");


    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "cancelled";
    await booking.save();
    return res.status(200).json({ message: "Booking cancelled" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to cancel booking" });
  }
};

export const getBookedDates = async (req, res) => {
  try {

    const today = new Date();
    const futureLimit = new Date();
    futureLimit.setMonth(futureLimit.getMonth() + 3); 
    const bookings = await Booking.find({
         listing: req.params.id,
         status: { $ne: "cancelled" },
         startDate: { $lte: futureLimit },
         endDate: { $gte: today }
      });

    const dates = bookings.map((b) => ({
      startDate: b.startDate,
      endDate: b.endDate,
    }));

    res.status(200).json(dates);
  } catch (err) {
    console.error("Error fetching booked dates:", err);
    res.status(500).json({ message: "Could not fetch booked dates" });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId)
      .populate("guest", "name email displayPicture")
      .populate("listing", "title image1 city rent");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking details", error });
  }
};
