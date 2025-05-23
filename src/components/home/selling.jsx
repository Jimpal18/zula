import { useState } from "react";
import { FaPlay, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import imgLeft from "../../assets/pic2.jpg";

import img1 from "../../assets/pic1.jpg";
import img2 from "../../assets/pic2.jpg";
import img3 from "../../assets/pic3.jpg";

const smallImages = [img1, img2, img3];

export default function Selling() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animState, setAnimState] = useState("visible"); 

  const handleChangeImage = (newIndex) => {
    setAnimState("fadeOut");
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setAnimState("visible");
    }, 200);
  };

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + smallImages.length) % smallImages.length;
    handleChangeImage(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % smallImages.length;
    handleChangeImage(newIndex);
  };

  return (
    <div className="bg-amber-50 w-full py-12 md:py-16 px-4">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-8 md:gap-10">

        {/* Left Side Image with Play Button */}
        <div className="relative w-full lg:w-1/2 rounded-xl md:rounded-3xl overflow-hidden shadow-md group">
          <img
            src={imgLeft}
            alt="Wooden Swing"
            className="w-full h-[700px] object-cover rounded-xl md:rounded-3xl transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/60 hover:bg-white/80 transition p-3 md:p-4 rounded-full cursor-pointer">
              <FaPlay className="text-black text-lg md:text-xl" />
            </div>
          </div>
        </div>

        {/* Right Side Product Info */}
        <div className="w-full lg:w-1/2 text-center lg:text-left pl-0 lg:pl-30">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 md:mb-8 mt-6 lg:mt-0 pl-0 lg:pl-20">
            Top Selling Product
          </h2>

          {/* Small product image with arrows */}
          <div className="flex items-center justify-center lg:justify-start mb-4 md:mb-6">
            <button
              onClick={handlePrev}
              className="bg-white/70 hover:bg-white rounded-full p-2 cursor-pointer shadow mr-3 flex-shrink-0"
              aria-label="Previous Image"
            >
              <FaArrowLeft className="text-gray-700 text-sm md:text-md" />
            </button>

            {/* Small Image Card with animation */}
            <div
              className={`
                relative w-[350px] h-[350px] rounded-xl md:rounded-3xl overflow-hidden shadow-md group cursor-pointer 
                transition-all duration-300
                ${animState === "fadeOut" ? "opacity-0 scale-95" : "opacity-100 scale-100"}
              `}
            >
              <img
                src={smallImages[currentIndex]}
                alt="Product preview"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-105"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-3 md:p-4">
                <h4 className="text-sm md:text-lg font-semibold mb-1 md:mb-2">Wooden Swings</h4>
                <p className="text-xs md:text-sm text-center">Premium quality wooden swing with comfortable cushions</p>
                <span className="mt-1 md:mt-2 font-bold text-sm md:text-base">₹10000.00</span>
                <button className="mt-2 md:mt-3 bg-white text-black px-3 py-1 rounded-full text-xs md:text-sm font-medium hover:bg-gray-200 transition-colors">
                  View Details
                </button>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="bg-white/70 hover:bg-white rounded-full p-2 cursor-pointer shadow ml-3 flex-shrink-0"
              aria-label="Next Image"
            >
              <FaArrowRight className="text-gray-700 text-sm md:text-md" />
            </button>
          </div>

          {/* Product Title */}
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 text-center lg:text-left pl-0 lg:pl-30">
            Wooden Swings
          </h3>

          {/* Product Description */}
          <p className="text-gray-600 text-sm mb-4 text-center lg:text-left px-2">
            "Introducing our latest innovation - a perfect blend of technology and design. Experience seamless performance,
            unmatched quality, and a user-friendly interface. Elevate your experience with our new product. Try it today!"
          </p>

          {/* Price */}
          <div className="flex justify-center lg:justify-start items-center space-x-4 pl-0 lg:pl-25">
            <span className="text-xl font-bold text-gray-900">₹10000.00</span>
            <span className="text-gray-500 line-through text-sm">₹16000.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
