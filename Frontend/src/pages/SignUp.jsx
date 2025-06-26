import React, { useContext, useState } from 'react';
import { TiEye, TiEyeOutline } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import axios from 'axios';
import { AuthDataContext } from '../Context/AuthContext';
import { userDataContext } from '../Context/UserContext';

function SignUp() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { serverUrl } = useContext(AuthDataContext);
  const { setUserData } = useContext(userDataContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Username is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!isValidEmail(email)) newErrors.email = "Enter a valid email";
    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signup`, { name, email, password }, { withCredentials: true });
      setUserData(result.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f8ff] to-[#d9f5f5] relative">
      <div
        className="w-[50px] h-[50px] rounded-full bg-[#10c4c4] cursor-pointer absolute top-6 left-6 flex items-center justify-center shadow-md hover:shadow-xl"
        onClick={() => navigate("/")}
      >
        <FaHome className="text-black text-xl" />
      </div>

      <form
        onSubmit={handleSignUp}
        className="w-[90%] max-w-[500px] bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-6 font-playfair border-[3px] border-[#e0eded]"
      >
        <h1 className="text-3xl font-bold text-center text-[#10c4c4]">Create your StayFinder account</h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-[18px]">Username</label>
          <input
            type="text"
            id="name"
            className="border-2 border-[#274047] rounded-lg px-4 py-2 text-[16px] outline-[#10c4c4]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="text-red-600 text-sm">{errors.name}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-[18px]">Email Id</label>
          <input
            type="email"
            id="email"
            className="border-2 border-[#274047] rounded-lg px-4 py-2 text-[16px] outline-[#10c4c4]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="text-red-600 text-sm">{errors.email}</span>}
        </div>

        <div className="flex flex-col gap-2 relative">
          <label htmlFor="password" className="text-[18px]">Password</label>
          <input
            type={show ? "text" : "password"}
            id="password"
            className="border-2 border-[#274047] rounded-lg px-4 py-2 text-[16px] outline-[#10c4c4]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!show ? (
            <TiEye className="absolute right-3 bottom-3 text-[22px] text-gray-600 cursor-pointer" onClick={() => setShow(true)} />
          ) : (
            <TiEyeOutline className="absolute right-3 bottom-3 text-[22px] text-gray-600 cursor-pointer" onClick={() => setShow(false)} />
          )}  </div>
          {errors.password && <span className="text-red-600 text-sm ">{errors.password}</span>}
       

        <button
          type="submit"
          className="w-full bg-[#10c4c4] text-black text-lg font-bold py-2 rounded-lg shadow-md hover:shadow-xl transition"
        >
          Sign Up
        </button>

        <p className="text-center text-sm">
          Already have an account?
          <span
            className="text-[#0c9c9c] text-[15px] cursor-pointer ml-1 hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
