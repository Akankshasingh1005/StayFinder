import React, { useContext, useState } from 'react'
import logo from '../assets/wholelogo.png'
import { IoSearchSharp } from "react-icons/io5";
import { IoReorderThreeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { GiFamilyHouse } from "react-icons/gi";
import { MdBedroomParent } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { CiHome } from "react-icons/ci";
import { GiWoodCabin } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoBedOutline } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthDataContext } from '../Context/AuthContext';
import { userDataContext } from '../Context/UserContext';
import { listingDataContext } from '../Context/ListingContext';

function Nav(){
    let [showpopup, setShowpopup] = useState(false)
    let {userData, setUserData} = useContext(userDataContext)
    let navigate = useNavigate()
    let {serverUrl} = useContext(AuthDataContext)
    let [cate, setCate] = useState()
    let {listingData, setListingData, setNewListData, newListData} = useContext(listingDataContext)
    const [searchInput, setSearchInput] = useState("");


    const handleLogOut = async () =>{
        try {
            let result = await axios.post( serverUrl + "/api/auth/logout", {withCredentials:true})
            setUserData(null)
            console.log(result)

        } catch (error) {
           console.log(error) 
        }
    } 
    const handleCategory = (category) => {
    setCate(category)
    setListingData(
    newListData.filter(
      (list) => list.category?.toLowerCase() === category.toLowerCase()
    )
  )
}

const handleSearch = async () => {
  try {
    const res = await axios.get(`${serverUrl}/api/listings?search=${searchInput}`);
    setListingData(res.data);
    navigate("/search-results");
  } catch (err) {
    console.error("Search failed:", err.message, err.response?.data || err);
  }
};


  return(
   <div  >
    <div className='w-[100vw] min-h-[80px] border-b-[1px] border-[#dcdcdc] px-[30px] flex items-center justify-between  '>
        <div><img src ={logo} alt="" className='w-[180px] '/></div>


  <div className="hidden md:flex items-center gap-2 w-full max-w-[400px] mx-4">
         <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search by city, title, or category"
        className="border border-gray-300 rounded-full px-4 py-2 outline-none w-full shadow-sm focus:ring-2 ring-[#10c4c4]"
/>
    <button className='bg-[#10c4c4] text-white p-3 rounded-full hover:scale-105 transition'
      onClick={handleSearch}>
        <IoSearchSharp className='text-lg' />
      </button>
        </div>
  

    <div className='flex items-center gap-4 relative'>
          <span className='text-gray-700 cursor-pointer hover:underline font-playfair font-bold hidden md:block ' onClick={()=>{navigate("/listingpage1");}}>
            List your home
          </span>
          <button className='flex items-center gap-2 border px-3 py-1 rounded-full hover:shadow-md bg-[#10c4c4] border-[1px] border-white shadow-md hover:scale-105 transition' 
           onClick={()=> setShowpopup(prev => !prev)}>
            <span><IoReorderThreeOutline className='text-xl' /></span>
            {userData == null && <span> <CgProfile className='text-xl' /> </span>}
            {userData != null && <span className='w-[27px] h-[27px] bg-[#222222] text-[white] rounded-full flex items-center justify-center border-[0.7px] border-[white]'>{userData?.name.slice(0,1).toUpperCase()}</span>}
          </button>

     {showpopup && (
            <div className="absolute top-[110%] right-0 bg-white border border-gray-200 rounded-lg shadow-lg w-[190px] backdrop-blur-md z-50 animate-fade-in">
              <ul className="p-4 flex flex-col gap-2 text-gray-700 text-sm font-playfair">
                {!userData && (
                  <li className="hover:bg-[#10c4c4]/10 px-3 py-2 rounded cursor-pointer"
                    onClick={() => { navigate("/login"); setShowPopup(false); }}>
                    Login
                  </li>
                )}
                {userData && (
                  <li className="hover:bg-[#10c4c4]/10 px-3 py-2 rounded cursor-pointer"
                    onClick={() => { handleLogOut(); setShowPopup(false); }}>
                    Logout
                  </li>
                )}
                <hr className="my-1" />
                <li className="hover:bg-[#10c4c4]/10 px-3 py-2 rounded cursor-pointer" onClick={() => { navigate("/listingpage1"); setShowPopup(false); }}>
                  List your Home
                </li>
                <li className="hover:bg-[#10c4c4]/10 px-3 py-2 rounded cursor-pointer" onClick={() => { navigate("/mylisting"); setShowPopup(false); }}>
                  My Listings
                </li>
                <li className="hover:bg-[#10c4c4]/10 px-3 py-2 rounded cursor-pointer" onClick={() => { navigate("/bookings"); setShowPopup(false); }}>
                  Check Bookings
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

    <div className='flex items-center gap-2 px-[30px] py-2 md:hidden'>
  <input
    type="text"
    value={searchInput}
    onChange={(e) => setSearchInput(e.target.value)}
    placeholder="Search by city, title, or category"
    className='border border-gray-300 rounded-full px-4 py-2 outline-none w-full focus:ring-2 ring-[#10c4c4]'
  />
  <button className='bg-[#10c4c4] text-white p-3 rounded-full hover:scale-105 transition'
   onClick={handleSearch}>
    <IoSearchSharp className='text-lg' />
  </button>
   </div>


    <div className='w-[100vw] h-[85px] flex items-center justify-center gap-[40px] overflow-auto mb-0'>
       <div onClick={() => {
          setCate(null)
          setListingData(newListData)
        }} className='flex items-center justify-center flex-col cursor-pointer hover:border-b-[1px] border-[#dcdcdc]'>
          <CiHome className='w-[30px] h-[30px]' />
          <h3 className='font-playfair font-bold text-[12px]'>All</h3>
        </div>

      <div onClick={() => handleCategory("Rooms")} className={`flex items-center justify-center flex-col cursor-pointer hover:border-b-[1px] border-[#dcdcdc] ${cate == "Rooms" ? "border-b-[1px] border-[#a6a5a5]" : ""}`}>
        <MdBedroomParent className='w-[30px] h-[30px]' />
        <h3 className='font-playfair font-bold text-[12px]'>Rooms</h3>
      </div>

       <div onClick={() => handleCategory("Flat")} className={`flex items-center justify-center flex-col cursor-pointer hover:border-b-[1px] border-[#dcdcdc] ${cate == "Flat" ? "border-b-[1px] border-[#a6a5a5]" : ""}`}>
          <BiBuildingHouse className='w-[30px] h-[30px]' />
          <h3 className='font-playfair font-bold text-[12px]'>Flat</h3>
        </div>

       <div onClick={() => handleCategory("Farm House")} className={`flex items-center justify-center flex-col cursor-pointer hover:border-b-[1px] border-[#dcdcdc] ${cate == "Farm House" ? "border-b-[1px] border-[#a6a5a5]" : ""}`}>
        <FaTreeCity className='w-[30px] h-[30px]' />
        <h3 className='font-playfair font-bold text-[12px] text-nowrap'>Farm House</h3>
      </div>

      <div onClick={() => handleCategory("Pool House")} className={`flex items-center justify-center flex-col cursor-pointer hover:border-b-[1px] border-[#dcdcdc] ${cate == "Pool House" ? "border-b-[1px] border-[#a6a5a5]" : ""}`}>
        <MdOutlinePool className='w-[30px] h-[30px]' />
        <h3 className='font-playfair font-bold text-[12px] text-nowrap'>Pool House</h3>
      </div>

      <div onClick={() => handleCategory("Villa")} className={`flex items-center justify-center flex-col cursor-pointer hover:border-b-[1px] border-[#dcdcdc] ${cate == "Villa" ? "border-b-[1px] border-[#a6a5a5]" : ""}`}>
        <GiFamilyHouse className='w-[30px] h-[30px]' />
        <h3 className='font-playfair font-bold text-[12px]'>Villa</h3>
      </div>


       <div onClick={() => handleCategory("PG")} className={`flex items-center justify-center flex-col cursor-pointer hover:border-b-[1px] border-[#dcdcdc] ${cate == "PG" ? "border-b-[1px] border-[#a6a5a5]" : ""}`}>
        <IoBedOutline className='w-[30px] h-[30px]' />
        <h3 className='font-playfair font-bold text-[12px]'>PG</h3>
      </div>

    
       <div onClick={() => handleCategory("Cabins")} className={`flex items-center justify-center flex-col cursor-pointer hover:border-b-[1px] border-[#dcdcdc] ${cate == "Cabins" ? "border-b-[1px] border-[#a6a5a5]" : ""}`}>
        <GiWoodCabin className='w-[30px] h-[30px]' />
        <h3 className='font-playfair font-bold text-[12px]'>Cabins</h3>
      </div>

       <div onClick={() => handleCategory("Shops")} className={`flex items-center justify-center flex-col cursor-pointer hover:border-b-[1px] border-[#dcdcdc] ${cate == "Shops" ? "border-b-[1px] border-[#a6a5a5]" : ""}`}>
        <SiHomeassistantcommunitystore className='w-[30px] h-[30px]' />
        <h3 className='font-playfair font-bold text-[12px]'>Shops</h3>
      </div>
      
      
    </div>
      
   </div>
  )
}

export default Nav