import React, { useContext } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { GiFamilyHouse } from "react-icons/gi";
import { MdBedroomParent } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoBedOutline } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { listingDataContext } from "../Context/ListingContext";

function ListingPage2() {
  let navigate = useNavigate();
  let { category, setCategory } = useContext(listingDataContext);

  return (
    <div className="w-[100%] h-[100vh] bg-[white] flex items-center justify-center relative overflow-auto">
      <div className="w-[50px] h-[50px] rounded-full bg-[#10c4c4] cursor-pointer absolute top-[2%] left-[35px] flex items-center justify-center border-[1px] border-white shadow-md hover:shadow-lg">
        <IoMdArrowRoundBack
          className="w-[25px] h-[25px] text-[black]"
          onClick={() => navigate("/listingpage1")}
        />
      </div>

      <div className="w-[180px] h-[38px] text-[15px] font-playfair bg-[#10c4c4] text-black font-bold rounded-full flex items-center justify-center absolute top-[3%] right-[10px] border-[1px] border-white shadow-md">
        Set Your Category
      </div>

      <div className="w-full h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-[20px] text-black md:text-[28px] font-playfair font-bold mb-[30px]">
          Which of these best <span className="text-[#10c4c4]">describes</span> your place?
        </h1>

        <div className="max-w-[900px] w-[100%] min-h-[550px] flex flex-wrap items-center justify-center gap-[25px] md:gap-[40px] md:w-[60%] mb-[20px]">
          <div
            className={`w-[180px] h-[150px] flex justify-center items-center flex-col cursor-pointer border-[2px] text-[13px] rounded-lg transition-all duration-200 ease-in-out ${
              category === "Rooms"
                ? "border-[#10c4c4] shadow-md"
                : "hover:border-[#a6d5d5]"
            }`}
            onClick={() => setCategory("Rooms")}
          >
            <MdBedroomParent className="w-[40px] h-[40px]" />
            <h3 className="font-playfair font-bold text-[15px]">Rooms</h3>
          </div>

          <div
            className={`w-[180px] h-[150px] flex justify-center items-center flex-col cursor-pointer border-[2px] text-[13px] rounded-lg transition-all duration-200 ease-in-out ${
              category === "Flat"
                ? "border-[#10c4c4] shadow-md"
                : "hover:border-[#a6d5d5]"
            }`}
            onClick={() => setCategory("Flat")}
          >
            <BiBuildingHouse className="w-[40px] h-[40px]" />
            <h3 className="font-playfair font-bold text-[15px]">Flat</h3>
          </div>

          <div
            className={`w-[180px] h-[150px] flex justify-center items-center flex-col cursor-pointer border-[2px] text-[13px] rounded-lg transition-all duration-200 ease-in-out ${
              category === "Farm House"
                ? "border-[#10c4c4] shadow-md"
                : "hover:border-[#a6d5d5]"
            }`}
            onClick={() => setCategory("Farm House")}
          >
            <FaTreeCity className="w-[40px] h-[40px]" />
            <h3 className="font-playfair font-bold text-[15px] text-nowrap">Farm House</h3>
          </div>

          <div
            className={`w-[180px] h-[150px] flex justify-center items-center flex-col cursor-pointer border-[2px] text-[13px] rounded-lg transition-all duration-200 ease-in-out ${
              category === "Pool House"
                ? "border-[#10c4c4] shadow-md"
                : "hover:border-[#a6d5d5]"
            }`}
            onClick={() => setCategory("Pool House")}
          >
            <MdOutlinePool className="w-[40px] h-[40px]" />
            <h3 className="font-playfair font-bold text-[15px] text-nowrap">Pool House</h3>
          </div>

          <div
            className={`w-[180px] h-[150px] flex justify-center items-center flex-col cursor-pointer border-[2px] text-[13px] rounded-lg transition-all duration-200 ease-in-out ${
              category === "Villa"
                ? "border-[#10c4c4] shadow-md"
                : "hover:border-[#a6d5d5]"
            }`}
            onClick={() => setCategory("Villa")}
          >
            <GiFamilyHouse className="w-[40px] h-[40px]" />
            <h3 className="font-playfair font-bold text-[15px]">Villa</h3>
          </div>

          <div
            className={`w-[180px] h-[150px] flex justify-center items-center flex-col cursor-pointer border-[2px] text-[13px] rounded-lg transition-all duration-200 ease-in-out ${
              category === "PG"
                ? "border-[#10c4c4] shadow-md"
                : "hover:border-[#a6d5d5]"
            }`}
            onClick={() => setCategory("PG")}
          >
            <IoBedOutline className="w-[40px] h-[40px]" />
            <h3 className="font-playfair font-bold text-[15px]">PG</h3>
          </div>

          <div
            className={`w-[180px] h-[150px] flex justify-center items-center flex-col cursor-pointer border-[2px] text-[13px] rounded-lg transition-all duration-200 ease-in-out ${
              category === "Cabins"
                ? "border-[#10c4c4] shadow-md"
                : "hover:border-[#a6d5d5]"
            }`}
            onClick={() => setCategory("Cabins")}
          >
            <GiWoodCabin className="w-[40px] h-[40px]" />
            <h3 className="font-playfair font-bold text-[15px]">Cabins</h3>
          </div>

          <div
            className={`w-[180px] h-[150px] flex justify-center items-center flex-col cursor-pointer border-[2px] text-[13px] rounded-lg transition-all duration-200 ease-in-out ${
              category === "Shops"
                ? "border-[#10c4c4] shadow-md"
                : "hover:border-[#a6d5d5]"
            }`}
            onClick={() => setCategory("Shops")}
          >
            <SiHomeassistantcommunitystore className="w-[40px] h-[40px]" />
            <h3 className="font-playfair font-bold text-[15px]">Shops</h3>
          </div>

          <button
            className={`px-[25px] py-[5px] rounded-lg text-[15px] font-playfair mt-[15px] mb-[20px] md:px-[30px] transition-all duration-300 border-[1px] shadow-md ${
              category
                ? "bg-[#10c4c4] text-black hover:shadow-lg"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
            onClick={() => navigate("/listingpage3")}
            disabled={!category}
          >
            <b>Next</b>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListingPage2;
