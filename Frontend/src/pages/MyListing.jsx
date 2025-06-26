import React, { useContext } from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../Context/UserContext";
import Card from "../Component/Card";

function MyListing() {
  const navigate = useNavigate();
  const { userData } = useContext(userDataContext);

  return (
    <div className="min-h-screen w-full px-4 py-8 flex flex-col items-center bg-white font-playfair">
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigate("/")}
          className="w-12 h-12 rounded-full bg-[#10c4c4] flex items-center justify-center shadow-md hover:shadow-lg border border-white"
        >
          <FaHome className="w-6 h-6 text-black" />
        </button>
      </div>

      <div className="text-3xl font-semibold text-[#054a4a] border-2 border-[#10c4c4] rounded-xl px-8 py-3 mt-16 shadow-md">
        My Listings
      </div>

      <div className="w-full mt-12 flex flex-wrap justify-center gap-6">
        {userData.listing.map((list) => (
          <Card
            key={list._id}
            title={list.title}
            landmark={list.landmark}
            city={list.city}
            image1={list.image1}
            image2={list.image2}
            image3={list.image3}
            rent={list.rent}
            id={list._id}
            rating={list.rating} 
            isOwner={true}
          />
        ))}
      </div>
    </div>
  );
}

export default MyListing;
