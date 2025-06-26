import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthDataContext } from "../Context/AuthContext";
import { IoMdArrowRoundBack} from "react-icons/io";

function BookedDetails() {
  const { bookingId } = useParams();
  const { serverUrl } = useContext(AuthDataContext);
  const [booking, setBooking] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${serverUrl}/api/bookings/${bookingId}`, { withCredentials: true })
      .then((res) => setBooking(res.data))
      .catch((err) => console.error("Fetch booking error:", err));
  }, [bookingId]);

  if (!booking)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fbfc] font-playfair">
        <p className="text-gray-600 text-xl">Loading booking details...</p>
      </div>
    );

  const { guest, listing, startDate, endDate, amountPaid } = booking;

  return (
    <div className="min-h-screen px-4 md:px-16 py-10 bg-[#f9fbfc] font-playfair relative">
      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate(-1)}
          className="w-[50px] h-[50px] rounded-full bg-[#10c4c4] flex items-center justify-center shadow-md hover:shadow-xl transition"
        >
          <IoMdArrowRoundBack className="w-6 h-6 " />
        </button>
      </div>


      <h2 className="text-4xl font-semibold text-center text-[#10c4c4] mb-10">
        Booking Details
      </h2>


      <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-xl flex flex-col md:flex-row gap-8 border border-teal-100">
   
        <div className="md:w-1/2 w-full">
          <img
            src={listing?.image1}
            alt="Listing"
            className="w-full h-[250px] md:h-full object-cover rounded-xl border"
          />
        </div>


        <div className="flex flex-col justify-between md:w-1/2 w-full space-y-6">
       
          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-bold text-[#10c4c4]">
              {listing.title}, {listing.city}
            </h3>
            <p className="text-gray-700 text-[15px]">
              Rent per night: <span className="font-semibold">₹{listing.rent}</span>
            </p>
            <div className="bg-[#e6fdfd] text-gray-800 text-sm rounded-lg p-2">
              <strong>Booking Period:</strong> {startDate.split("T")[0]} → {endDate.split("T")[0]}
            </div>
            <div className="bg-[#e0f7f7] text-gray-800 text-sm rounded-lg p-2">
              <strong>Amount Paid:</strong> ₹{amountPaid}
            </div>
          </div>


          <div className="flex items-center gap-4 mt-4 border-t pt-4">
           
            <div className="text-sm text-gray-700">
              <p><strong>Name:</strong> {guest?.name}</p>
              <p><strong>Email:</strong> {guest?.email}</p>
              <p><strong>User ID:</strong> {guest?._id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookedDetails;
