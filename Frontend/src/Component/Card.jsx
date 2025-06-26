import React, { useContext } from "react";
import { userDataContext } from "../Context/UserContext";
import { listingDataContext } from "../Context/ListingContext";
import { useNavigate } from "react-router-dom";
import { GoStarFill, GoStar } from "react-icons/go";

function Card({ title, landmark, image1, image2, image3, rent, city, id, rating = 0 }) {
  const navigate = useNavigate();
  const { userData } = useContext(userDataContext);
  const { handleViewCard } = useContext(listingDataContext);

  const handleClick = () => {
    if (userData) {
      handleViewCard(id);
    } else {
      navigate("/login");
    }
  };


  return (
    <div
      className="w-[320px] max-w-[90vw] h-[400px] bg-white rounded-lg shadow-lg hover:shadow-2 transition-all duration-300 overflow-hidden cursor-pointer font-playfair transform hover:-translate-y-1"
      onClick={handleClick}
    >
      <div className="w-full h-[70%] flex overflow-x-auto scroll-smooth snap-x snap-mandatory rounded-t-2xl">
        {[image1, image2, image3].map((img, index) => (
          img && (
            <img
              key={index}
              src={img}
              alt={`slide-${index}`}
              className="w-full flex-shrink-0 object-cover snap-center transition-transform duration-300"
            />
          )
        ))}
      </div>

      <div className="p-4 flex flex-col justify-between h-[30%]">
        <div className="mb-2">
          <div className="flex items-center justify-between">
            <h3 className="text-[18px] font-bold uppercase text-[#10c4c4] truncate">{title}</h3>
           
          </div>
          <p className="text-sm text-gray-600 truncate">In {city}, near {landmark}</p>
        </div>
        <div>
          <p className="text-[16px] font-semibold text-[#990601]">₹{rent} / day</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
