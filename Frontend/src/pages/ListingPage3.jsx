import React, { useContext } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../Context/ListingContext";

function ListingPage3() {
  const navigate = useNavigate();
  const {
    title, setTitle,
    description, setDescription,
    frontEndImage1, setFrontEndImage1,
    frontEndImage2, setFrontEndImage2,
    frontEndImage3, setFrontEndImage3,
    backEndImage1, setBackEndImage1,
    backEndImage2, setBackEndImage2,
    backEndImage3, setBackEndImage3,
    rent, setRent,
    city, setCity,
    landmark, setLandmark,
    category, setCategory, 
    handleAddListing,
    adding, setAdding
  } = useContext(listingDataContext);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center relative overflow-auto px-4 py-10">

      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate("/listingpage2")}
          className="w-[50px] h-[50px] rounded-full bg-[#10c4c4] flex items-center justify-center border border-white shadow-md hover:shadow-lg"
        >
          <IoMdArrowRoundBack className="w-6 h-6 text-black" />
        </button>
      </div>

      <h1 className="text-xl md:text-3xl font-bold text-black self-start ml-1 md:ml-[130px] mt-16 mb-6 font-playfair">
        {`${landmark.toUpperCase()}, ${city.toUpperCase()}`}
      </h1>

      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-3 items-center justify-center px-2">
        <div className="w-full md:w-2/3 aspect-[16/9] overflow-hidden rounded-xl shadow-md">
          <img src={frontEndImage1} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="w-full md:w-1/3 flex flex-col gap-3">
          <div className="aspect-[16/9] overflow-hidden rounded-xl shadow-md">
            <img src={frontEndImage2} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-[16/9] overflow-hidden rounded-xl shadow-md">
            <img src={frontEndImage3} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl px-2 md:px-4 mt-10 text-left">
        <h2 className="text-lg md:text-2xl font-bold font-playfair text-black mb-2">
          {`${title.toUpperCase()} · ${category.toUpperCase()} · ${landmark.toUpperCase()}, ${city.toUpperCase()}`}
        </h2>
        <p className="text-md md:text-xl font-playfair text-gray-700 mb-2">{description}</p>
        <p className="text-md md:text-xl font-bold font-playfair text-black">Rs. {rent} / day</p>
      </div>

      <button
        className={`px-[30px] py-[10px] mt-[20px] mb-[30px] rounded-lg text-[15px] font-playfair transition-all duration-300 border border-white shadow-md ${
          adding
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-[#10c4c4] text-black hover:shadow-lg hover:scale-105"
        }`}
        onClick={handleAddListing}
        disabled={adding}
      >
        {adding ? "Adding..." : "Add Listing"}
      </button>
    </div>
  );
}

export default ListingPage3;
