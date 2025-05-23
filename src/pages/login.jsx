import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import pic1 from "../assets/logo.png";
import pic2 from "../assets/pic1.jpg";

const GoogleIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#000"
      d="M44.5 20H24v8.5h11.9C34 33.7 30.3 36 26 36c-7.5 0-13.5-6-13.5-13.5S18.5 9 26 9c3.4 0 6.2 1.3 8.3 3.4l6-6C35.8 4.5 30.3 2 24 2 12 2 2 12 2 24s10 22 22 22c12.2 0 21.5-8.6 21.5-21.5 0-1.4-.2-2.6-.5-3.5z"
    />
  </svg>
);

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#fdf6f0] flex items-center justify-center px-4 pt-10 pb-20">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-[#fdf6f0] rounded-3xl overflow-hidden">
        {/* Left Panel */}
        <div className="flex flex-col justify-center px-10 py-12 space-y-6">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/home">
              <img src={pic1} alt="Zulas n More" className="mx-auto w-40 cursor-pointer" />
            </Link>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1 text-[#2D3319]">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full border border-[#2D3319] rounded px-4 py-2 bg-transparent focus:outline-none"
            />
          </div>

          {/* Password */}
          {/* <div>
            <label className="block text-sm mb-1 text-[#2D3319]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border border-[#2D3319] rounded px-4 py-2 pr-10 bg-transparent focus:outline-none"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-[#2D3319]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div> */}



          {/* Password */}
<div>
  <label className="block text-sm mb-1 text-[#2D3319]">Password</label>
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Password"
      className="w-full border border-[#2D3319] rounded px-4 py-2 pr-10 bg-transparent focus:outline-none"
    />
    <button
      type="button"
      className="absolute right-3 top-2.5 text-[#2D3319]"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>
  {/* 👇 Forgot Password Link */}
  <div className="text-right mt-1">
    <Link to="/forgot" className="text-sm text-[#2D3319] underline hover:text-[#1e2412]">
      Forgot Password?
    </Link>
  </div>
</div>


          {/* Log In Button */}
          <button
            className="w-full bg-[#2D3319] text-white py-2 rounded mt-2 hover:bg-[#1e2412] transition"
          >
            Log In
          </button>

          {/* Social Login Buttons */}
          <div className="flex flex-col gap-3 mt-4">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded py-2 hover:bg-gray-100 transition"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt="Apple Logo"
                className="w-5 h-5"
              />
              Login with Apple
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded py-2 hover:bg-gray-100 transition"
            >
              <GoogleIcon />
              Login with Google
            </button>
          </div>

          {/* Footer */}
          <p className="text-sm text-center text-[#2D3319]">
            Can't Log in?{" "}
            <Link to="/signup" className="underline">
              Sign up an account
            </Link>
          </p>
        </div>

        {/* Right Section - Image */}
        <div className="hidden md:block w-[500px] ">
          <img
            src={pic2}
            alt="Swing"
            className="w-full h-[650px] object-cover rounded-4xl"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
