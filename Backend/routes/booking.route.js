import express from "express";
import isAuth from "../middleware/isAuth.js";
import { cancelBooking, createBooking, getBookedDates, getBookingById, getBookingsByGuest, getBookingsByHost } from "../controllers/booking.controller.js";

const bookingRouter = express.Router();

bookingRouter.post("/", isAuth, createBooking);
bookingRouter.get("/guest/:id", isAuth, getBookingsByGuest);
bookingRouter.get("/host/:id", isAuth, getBookingsByHost);
bookingRouter.patch("/cancel/:id", isAuth, cancelBooking);
bookingRouter.get("/dates/:id", getBookedDates);
bookingRouter.get('/:bookingId', getBookingById);

export default bookingRouter;

