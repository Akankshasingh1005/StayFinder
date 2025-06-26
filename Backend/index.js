import dotenv from "dotenv";
dotenv.config();
import express from "express"
import connectDB from "./config/db.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from 'cors';
import userRouter from "./routes/user.route.js"
import listingRouter from "./routes/listing.route.js"
import bookingRouter from "./routes/booking.route.js";


let port = process.env.PORT || 6000

let app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({ origin: 'https://stayfinder-n48x.onrender.com', credentials: true }));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listing", listingRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/listings", listingRouter);
app.use('/uploads', express.static('public/uploads'));


app.listen(port, ()=>{
    connectDB()
    console.log(`Server started on port ${port}`);
})




