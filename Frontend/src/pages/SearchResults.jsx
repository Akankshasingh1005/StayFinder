import React, { useContext } from "react";
import { listingDataContext } from "../Context/ListingContext";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { userDataContext } from "../Context/UserContext";

function SearchResults() {
  const { listingData } = useContext(listingDataContext);
  const { setListingData } = useContext(listingDataContext);
  const navigate = useNavigate();

  const { userData } = useContext(userDataContext);
  const { handleViewCard } = useContext(listingDataContext);
  
  const handleClick = (id) => {
  if (userData) {
    handleViewCard(id);
    navigate("/viewcard");
  } else {
    navigate("/login");
  }
};


  return (
    <div className="min-h-screen px-4 md:px-16 py-10 bg-[#f9fbfc] font-playfair">
      <div className="absolute top-4 left-4">
       
        <button
          onClick={() => {
            setListingData([]);
            navigate("/");
          }}
          className="w-[50px] h-[50px] rounded-full bg-[#10c4c4] flex items-center justify-center shadow-md hover:shadow-xl"
        >
          <FaHome className="w-6 h-6 " />
        </button>
      </div>

      <h2 className="text-3xl font-bold text-center text-[#10c4c4] mb-8">
        Search Results
      </h2>

      {listingData.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">No listings matched your search.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-8">
          {listingData.map((listing) => (
            <div
              key={listing._id}
              className="max-w-sm w-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition cursor-pointer"
             onClick={() => handleClick(listing._id)}
            >
              <img
                src={listing.image1}
                alt={listing.title}
                className="w-full h-[200px] object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-[#10c4c4] mb-2">{listing.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{listing.city}</p>
                <p className="text-sm text-gray-800">₹{listing.rent} per night</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
