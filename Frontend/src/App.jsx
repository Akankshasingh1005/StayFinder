import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ListingPage1 from './pages/ListingPage1'
import ListingPage2 from './pages/ListingPage2'
import ListingPage3 from './pages/ListingPage3'
import { userDataContext } from './Context/UserContext'
import MyListing from './pages/MyListing'
import ViewCard from './pages/ViewCard'
import Bookings from './pages/Bookings';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookedDetails from "./pages/BookedDetails";
import SearchResults from "./pages/SearchResults";


function App(){
  let {userData, setUserData} = useContext(userDataContext)
  return(
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/listingpage1' element={userData != null? <ListingPage1/> :<Navigate to ={"/"}/>}/>
      <Route path='/listingpage2' element={userData != null? <ListingPage2/> :<Navigate to ={"/"}/>}/>
      <Route path='/listingpage3' element={userData != null? <ListingPage3/> :<Navigate to ={"/"}/>}/>
      <Route path='/mylisting' element={userData != null? <MyListing/> :<Navigate to ={"/"}/>}/>
      <Route path='/viewcard' element={userData != null? <ViewCard/> :<Navigate to ={"/"}/>}/>
      <Route path='/bookings' element={userData ? <Bookings /> : <Navigate to="/" />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="/booked/:bookingId" element={<BookedDetails />} />
    </Routes>
     <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App