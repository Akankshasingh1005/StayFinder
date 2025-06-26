import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { userDataContext } from '../Context/UserContext';
import { AuthDataContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Bookings() {
  const { userData } = useContext(userDataContext);
  const { serverUrl } = useContext(AuthDataContext);
  const [guestBookings, setGuestBookings] = useState([]);
  const [hostBookings, setHostBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData?._id) {
      axios.get(`${serverUrl}/api/bookings/guest/${userData._id}`, { withCredentials: true })
        .then(res => setGuestBookings(res.data || []))
        .catch(err => console.log(err));

      axios.get(`${serverUrl}/api/bookings/host/${userData._id}`, { withCredentials: true })
        .then(res => setHostBookings(res.data || []))
        .catch(err => console.log(err));
    }
  }, [userData]);

  const Card = ({ listing, booking, extra, isGuestBooking }) => {
    const handleCancel = async (e) => {
      e.stopPropagation();
      const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
      if (!confirmCancel) return;

      try {
        await axios.patch(`${serverUrl}/api/bookings/cancel/${booking._id}`, {}, { withCredentials: true });
        setGuestBookings(prev => prev.filter(b => b._id !== booking._id));
        toast.success("Booking cancelled successfully!");
      } catch (err) {
        console.error("Cancel error:", err);
        toast.error("Failed to cancel booking");
      }
    };


    return (
      <div
        className="max-w-sm w-full bg-white rounded-2xl overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"
        onClick={() => navigate(`/booked/${booking._id}`)}
      >
        <img src={listing.image1 || ""} alt="listing" className="w-full h-[200px] object-cover rounded-t-2xl" />
        <div className="p-4">
          <h4 className="text-xl font-semibold text-[#10c4c4] font-playfair">{listing.title}, {listing.city}</h4>
          {extra}
          <div className="mt-2 text-sm text-gray-700 bg-[#f0fdfa] p-2 rounded-md">
            <p><strong>From:</strong> {booking.startDate?.split("T")[0] || "N/A"}</p>
            <p><strong>To:</strong> {booking.endDate?.split("T")[0] || "N/A"}</p>
          </div>

          {isGuestBooking && (
            <button
              onClick={handleCancel}
              className="mt-3 w-full bg-red-100 hover:bg-red-200 text-red-600 text-sm font-semibold py-2 px-4 rounded transition"
            >
              Cancel Booking
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full px-4 md:px-16 py-12 bg-[#f9fbfc] relative">
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate("/")}
          className="w-[50px] h-[50px] rounded-full bg-[#10c4c4] flex items-center justify-center shadow-md hover:shadow-xl"
        >
          <FaHome className="w-6 h-6 " />
        </button>
      </div>

      <h2 className="text-4xl font-extrabold text-center text-[#10c4c4] font-playfair mb-12">
        Your Bookings
      </h2>

      {/* Guest Section */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold font-playfair mb-6 text-center relative inline-block after:content-[''] after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-[60%] after:bg-[#10c4c4]">
          1. Bookings You Made
        </h3>

        {guestBookings.length === 0 ? (
          <p className="text-center text-gray-500">You haven’t made any bookings yet.</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {guestBookings.map((booking) =>
              booking?.listing ? (
                <Card
                  key={booking._id}
                  listing={booking.listing}
                  booking={booking}
                  isGuestBooking={true}
                />
              ) : null
            )}
          </div>
        )}
      </div>

      {/* Host Section */}
      <div>
        <h3 className="text-2xl font-bold font-playfair mb-6 text-center relative inline-block after:content-[''] after:absolute after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-[60%] after:bg-[#10c4c4]">
          2. Bookings on Your Listings
        </h3>

        {hostBookings.length === 0 ? (
          <p className="text-center text-gray-500">No one has booked your listings yet.</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {hostBookings.map((booking) =>
              booking?.listing && booking?.guest ? (
                <Card
                  key={booking._id}
                  listing={booking.listing}
                  booking={booking}
                  extra={<p className="text-sm text-gray-600">Guest: <strong>{booking.guest.name}</strong></p>}
                  isGuestBooking={false}
                />
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Bookings;
