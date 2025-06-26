import React, { useContext } from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../Context/ListingContext";

function ListingPage1() {
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
    landmark, setLandmark
  } = useContext(listingDataContext);

  const handleImage1 = (e) => {
    let file = e.target.files[0];
    setBackEndImage1(file);
    setFrontEndImage1(URL.createObjectURL(file));
  };

  const handleImage2 = (e) => {
    let file = e.target.files[0];
    setBackEndImage2(file);
    setFrontEndImage2(URL.createObjectURL(file));
  };

  const handleImage3 = (e) => {
    let file = e.target.files[0];
    setBackEndImage3(file);
    setFrontEndImage3(URL.createObjectURL(file));
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#f7fcfc] to-[#d9f5f5] flex items-center justify-center py-10 relative overflow-auto">

      <div
        className="w-[50px] h-[50px] rounded-full bg-[#10c4c4] cursor-pointer absolute top-6 left-6 flex items-center justify-center shadow-md hover:shadow-xl"
        onClick={() => navigate("/")}
      >
        <FaHome className="text-black text-xl " />
      </div>

      <div className="absolute top-6 right-6 bg-[#10c4c4] text-black text-sm font-bold px-5 py-2 rounded-full shadow-md font-playfair">
        SetUp Your Home
      </div>

      <form
        className="w-[90%] max-w-[750px] bg-white rounded-2xl shadow-xl px-8 py-10 flex flex-col gap-6 font-playfair mt-10"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/listingpage2");
        }}
      >
        <h1 className="text-2xl font-bold text-center text-[#10c4c4] mb-2">Tell us about your listing</h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-lg">Title</label>
          <input
            type="text"
            id="title"
            placeholder="2BHK house in Goa..."
            className="border-2 border-[#274047] rounded-lg px-4 py-2 text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-lg">Description</label>
          <textarea
            id="description"
            rows={3}
            className="border-2 border-[#274047] rounded-lg px-4 py-2 text-sm resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {[handleImage1, handleImage2, handleImage3].map((handler, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <label className="text-lg">Image {idx + 1}</label>
            <input
              type="file"
              accept="image/*"
              className="border-2 border-[#274047] rounded-lg px-4 py-2 text-sm cursor-pointer"
              onChange={handler}
              required
            />
          </div>
        ))}

        <div className="flex flex-col gap-2">
          <label htmlFor="rent" className="text-lg">Rent (per day)</label>
          <input
            type="number"
            id="rent"
            placeholder="Rs. ___/day"
            className="border-2 border-[#274047] rounded-lg px-4 py-2 text-sm"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="city" className="text-lg">City</label>
          <input
            type="text"
            id="city"
            placeholder="City, State, Country"
            className="border-2 border-[#274047] rounded-lg px-4 py-2 text-sm"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="landmark" className="text-lg">Landmark</label>
          <input
            type="text"
            id="landmark"
            className="border-2 border-[#274047] rounded-lg px-4 py-2 text-sm"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#10c4c4] text-black font-bold px-6 py-2 rounded-lg shadow-md hover:shadow-xl mt-2 w-fit self-center"
        >
          Next
        </button>
      </form>
    </div>
  );
}

export default ListingPage1;
