import React, { useContext, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../Context/ListingContext";
import { userDataContext } from "../Context/UserContext";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { AuthDataContext } from "../Context/AuthContext";
import { useEffect } from "react"; 
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

function ViewCard() {
    const navigate = useNavigate();
    const { cardDetails, updating, setUpdating, deleting, setDeleting, handleBooking } = useContext(listingDataContext);
    const { userData } = useContext(userDataContext);
    const { serverUrl } = useContext(AuthDataContext);
    const [bookingPopUp, setBookingPopUp] = useState(false);
    const [updatePopUp, setUpdatePopUp] = useState(false);
    const [title, setTitle] = useState(cardDetails.title);
    const [description, setDescription] = useState(cardDetails.description);
    const [backEndImage1, setBackEndImage1] = useState(cardDetails.image1);
    const [backEndImage2, setBackEndImage2] = useState(cardDetails.image2);
    const [backEndImage3, setBackEndImage3] = useState(cardDetails.image3);
    const [rent, setRent] = useState(cardDetails.rent);
    const [city, setCity] = useState(cardDetails.city);
    const [landmark, setLandmark] = useState(cardDetails.landmark);
    const [category, setCategory] = useState(cardDetails.category);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const today = new Date().toISOString().split("T")[0];
    const [bookedDates, setBookedDates] = useState([]);

    useEffect(() => {
    if (cardDetails?._id) {
        axios
        .get(`${serverUrl}/api/bookings/dates/${cardDetails._id}`)
        .then((res) => setBookedDates(res.data))
        .catch((err) => console.error("Error loading booked dates:", err));
    }
    }, [cardDetails]);


    if (!cardDetails) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <p className="text-xl font-semibold text-gray-600">No listing selected.</p>
            </div>
        );
    }

    const handleUpdateListing = async () => {
        setUpdating(true);
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("image1", backEndImage1);
            formData.append("image2", backEndImage2);
            formData.append("image3", backEndImage3);
            formData.append("description", description);
            formData.append("rent", rent);
            formData.append("city", city);
            formData.append("landmark", landmark);
            formData.append("category", category);

            const result = await axios.post(`${serverUrl}/api/listing/update/${cardDetails._id}`, formData, { withCredentials: true });
            console.log(result);
            navigate("/");
        } catch (error) {
            console.error("Axios error:", error);
            console.error("Server response message:", error.response?.data);
        } finally {
            setUpdating(false);
        }
    };

    const handleDeleteListing = async () => {
        setDeleting(true);
        try {
            const result = await axios.delete(`${serverUrl}/api/listing/delete/${cardDetails._id}`, { withCredentials: true });
            console.log(result.data);
            navigate("/");
        } catch (error) {
            console.error(error);
        } finally {
            setDeleting(false);
        }
    };

    const handleImageUpload = (setter) => (e) => setter(e.target.files[0]);

    return (
        <div className="w-full min-h-screen bg-white flex flex-col items-center relative overflow-auto px-4 py-8 ">
            <div className="absolute top-4 left-4">
                <button
                    onClick={() => navigate(-1)}
                    className="w-[50px] h-[50px] rounded-full bg-[#10c4c4] flex items-center justify-center shadow-md hover:shadow-lg"
                >
                    <IoMdArrowRoundBack className="w-6 h-6 text-black" />
                </button>
            </div>

            <h1 className="text-xl md:text-3xl font-bold text-black self-start ml-1 md:ml-[130px] mt-16 mb-6 font-playfair">
                {`${cardDetails.landmark.toUpperCase()}, ${cardDetails.city.toUpperCase()}`}
            </h1>

            <div className="w-full max-w-6xl flex flex-col md:flex-row gap-3 items-center justify-center">
                <div className="w-full md:w-2/3 aspect-[16/9] overflow-hidden rounded-xl shadow-md">
                    <img src={cardDetails.image1} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="w-full md:w-1/3 flex flex-col gap-3">
                    <div className="aspect-[16/9] overflow-hidden rounded-xl shadow-md">
                        <img src={cardDetails.image2} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-[16/9] overflow-hidden rounded-xl shadow-md">
                        <img src={cardDetails.image3} alt="" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

            <div className="w-full max-w-6xl px-2 md:px-4 mt-10 text-left">
                <h2 className="text-lg md:text-2xl font-bold font-playfair text-black mb-2">
                    {`${cardDetails.title.toUpperCase()} · ${cardDetails.category.toUpperCase()} · ${cardDetails.landmark.toUpperCase()}, ${cardDetails.city.toUpperCase()}`}
                </h2>
                <p className="text-md md:text-xl font-playfair text-gray-700 mb-2">{cardDetails.description}</p>
                <p className="text-md md:text-xl font-bold font-playfair text-black">Rs. {cardDetails.rent} / day</p>
            </div>

                    {cardDetails.host !== userData._id ? (
            <button
                onClick={() => setBookingPopUp(true)}
                className="mt-10 px-6 py-2 bg-[#10c4c4] text-black rounded-lg shadow-md font-playfair hover:shadow-lg"
            >
                Book Now
            </button>
            ) : (
            <button
                onClick={() => setUpdatePopUp(true)}
                className="mt-10 px-6 py-2 bg-[#10c4c4] text-black rounded-lg shadow-md font-playfair hover:shadow-lg"
            >
                Edit Listing
            </button>
            )}

            {bookingPopUp && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000000a5] backdrop-blur-sm">
    <div className="relative bg-white w-[90%] max-w-[550px] rounded-xl p-6 shadow-lg font-playfair">

      <button
        onClick={() => setBookingPopUp(false)}
        className="absolute top-4 right-4 w-[30px] h-[30px] rounded-full bg-[#10c4c4] flex items-center justify-center shadow-md hover:shadow-lg"
      >
        <RxCross2 className="w-5 h-5 text-black" />
      </button>

   
      <h2 className="text-2xl font-bold text-center mb-6 text-[#10c4c4]">Confirm & Book</h2>

      <div className="flex items-center gap-4 mb-6 border p-3 rounded-lg shadow-sm">
        <img
          src={cardDetails.image1}
          alt="listing"
          className="w-[100px] h-[70px] object-cover rounded-md"
        />
        <div className="flex flex-col text-sm">
          <span className="font-semibold text-black">{cardDetails.title}</span>
          <span className="text-gray-600">
            {cardDetails.landmark}, {cardDetails.city}
          </span>
          <span className="text-[#990601] font-medium">₹{cardDetails.rent} / day</span>
        </div>
      </div>

  
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="text-[15px] mb-1">Check-In</label>
          <input
            type="date"  min={today}
            className="border px-3 py-2 rounded-lg text-sm border-[#10c4c4]"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[15px] mb-1">Check-Out</label>
          <input
            type="date"  min={today}
            className="border px-3 py-2 rounded-lg text-sm border-[#10c4c4]"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {startDate && endDate && (
        <div className="mt-6 text-md text-center border-t pt-4">
          <p>
            Nights:{" "}
            <span className="font-semibold">
              {Math.max(
                0,
                (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
              )}
            </span>
          </p>
          <p>
            Total Price:{" "}
            <span className="font-semibold text-[#990601]">
              ₹
              {Math.max(
                0,
                ((new Date(endDate) - new Date(startDate)) /
                  (1000 * 60 * 60 * 24)) * cardDetails.rent
              )}
            </span>
          </p>
        </div>
      )}

         {bookedDates.length > 0 && (
  <div className="mt-6 max-h-[150px] overflow-y-auto">
    <h3 className="text-[15px] font-semibold mb-2">
      Unavailable Dates (next 3 months):
    </h3>
    <ul className="list-disc text-[14px] text-red-600 ml-5">
      {(() => {
        const formatDate = (dateStr) => {
          const date = new Date(dateStr);
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear();
          return `${day}-${month}-${year}`;
        };

        const today = new Date();
        const threeMonthsFromNow = new Date();
        threeMonthsFromNow.setMonth(today.getMonth() + 3);

        const filtered = bookedDates
          .filter((range) => {
            const start = new Date(range.startDate);
            return start >= today && start <= threeMonthsFromNow;
          })
          .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

      
        const merged = [];
        for (let i = 0; i < filtered.length; i++) {
          const currStart = new Date(filtered[i].startDate);
          const currEnd = new Date(filtered[i].endDate);

          if (merged.length === 0) {
            merged.push({ startDate: currStart, endDate: currEnd });
          } else {
            const last = merged[merged.length - 1];
            const lastEndPlusOne = new Date(last.endDate);
            lastEndPlusOne.setDate(lastEndPlusOne.getDate() + 1);

            if (currStart <= lastEndPlusOne) {
            
              last.endDate = new Date(Math.max(last.endDate, currEnd));
            } else {
              merged.push({ startDate: currStart, endDate: currEnd });
            }
          }
        }

        return merged.map((range, idx) => (
          <li key={idx}>
            {formatDate(range.startDate)} to {formatDate(range.endDate)}
          </li>
        ));
      })()}
    </ul>
  </div>
)}



      <button
        className="mt-6 px-4 py-2 bg-[#10c4c4] text-black rounded-lg font-semibold hover:scale-105 transition-all shadow-md w-full"
        onClick={() => {
          handleBooking({ startDate, endDate });
          setBookingPopUp(false);
          navigate("/");
        }}
        disabled={!startDate || !endDate}
      >
        Book Now
      </button>
    </div>
  </div>
)}



            {updatePopUp && (
                <div className="fixed inset-0 flex items-center justify-center bg-[#000000a9] z-[100] backdrop-blur-sm">
                    <div className="absolute top-4 left-4">
                        <button
                            onClick={() => setUpdatePopUp(false)}
                            className="w-[30px] h-[30px] rounded-full bg-[#10c4c4] flex items-center justify-center shadow-md hover:shadow-lg"
                        >
                            <RxCross2 className="w-6 h-6 text-black" />
                        </button>
                    </div>

                    <form
                        className="max-w-[900px] w-[90%] max-h-[90vh] overflow-y-auto flex flex-col bg-white rounded-xl p-6 shadow-lg"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <h2 className="font-playfair text-[#10c4c4] font-semibold text-[30px] mb-4">Update your listing</h2>

                        {[{
                            id: "title",
                            label: "Title",
                            value: title,
                            setter: setTitle,
                            type: "text",
                            placeholder: "_bhk house or best title"
                        }, {
                            id: "description",
                            label: "Description",
                            value: description,
                            setter: setDescription,
                            type: "textarea",
                        }, {
                            id: "rent",
                            label: "Rent",
                            value: rent,
                            setter: setRent,
                            type: "number",
                            placeholder: "Rs. ____/day"
                        }, {
                            id: "city",
                            label: "City",
                            value: city,
                            setter: setCity,
                            type: "text",
                            placeholder: "city, state, country"
                        }, {
                            id: "landmark",
                            label: "Landmark",
                            value: landmark,
                            setter: setLandmark,
                            type: "text",
                        }].map(({ id, label, value, setter, type, placeholder }) => (
                            <div key={id} className="w-[90%] flex flex-col gap-2 mt-4">
                                <label htmlFor={id} className="text-[18px] font-playfair font-bold">{label}</label>
                                {type === "textarea" ? (
                                    <textarea id={id} value={value} onChange={(e) => setter(e.target.value)}
                                        className="w-[90%] h-[80px] border-2 border-[#274040] rounded-lg text-[15px] px-[15px] cursor-pointer"
                                        required />
                                ) : (
                                    <input type={type} id={id} value={value} onChange={(e) => setter(e.target.value)}
                                        className="w-[90%] h-[40px] border-2 border-[#274047] rounded-lg text-[15px] px-[15px] cursor-pointer"
                                        placeholder={placeholder} required />
                                )}
                            </div>
                        ))}

                        {[setBackEndImage1, setBackEndImage2, setBackEndImage3].map((setter, i) => (
                            <div key={i} className="w-[90%] flex flex-col gap-2 mt-6">
                                <label className="text-[18px] font-playfair font-bold">Image {i + 1}</label>
                                <input type="file" onChange={handleImageUpload(setter)}
                                    className="w-full border-2 border-[#274040] rounded-lg text-[13px] px-2 py-2 cursor-pointer" required />
                            </div>
                        ))}

                        <div className="flex gap-6 mt-6">
                            <button
                                onClick={handleUpdateListing}
                                className="px-6 py-2 bg-[#10c4c4] border border-white shadow-md hover:shadow-lg rounded-lg text-black font-playfair"
                                disabled={updating}
                            >
                                {updating ? "Updating..." : "Update Listing"}
                            </button>
                            <button
                                onClick={handleDeleteListing}
                                className="px-6 py-2 bg-[#10c4c4] border border-white shadow-md hover:shadow-lg rounded-lg text-black font-playfair"
                                disabled={deleting}
                            >
                                {deleting ? "Deleting..." : "Delete Listing"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>  );
        }


export default ViewCard;
