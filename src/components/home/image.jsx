import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';

import pic1 from "../../assets/pic1.jpg";
import pic2 from "../../assets/pic2.jpg";
import pic3 from "../../assets/beach.jpg";
import pic4 from "../../assets/cloud.jpg";
import pic5 from "../../assets/spa.jpg";



export default function Image() {
  const navigate = useNavigate();
  const images = [pic1, pic2, pic3, pic4, pic5];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Animation variants
  const imageVariants = {
    initial: { opacity: 0, rotateX: -90 },
    animate: { opacity: 1, rotateX: 0, transition: { duration: 0.8, ease: "easeInOut" } },
    exit: { opacity: 0, rotateX: 90, transition: { duration: 0.5 } }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut", delay: 0.5 } },
  };

  return (
    <div className="bg-amber-50 px-4  w-full">
      <div className="max-w-screen-xl mx-auto py-12 relative">
        <div className="relative rounded-3xl overflow-hidden group cursor-pointer">
          <AnimatePresence>
            <motion.img
              key={currentIndex}
              variants={imageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              src={images[currentIndex]}
              alt="Banner"
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] object-cover absolute inset-0" 
              style={{
                transitionProperty: "opacity, rotateX",
                transformStyle: "preserve-3d",
              }}
            />
          </AnimatePresence>
          <img
              src={images[currentIndex]}
              alt="Banner"
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] object-cover"
              style={{
                
              }}
            />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300" />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <motion.h2
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-white text-2xl md:text-4xl font-bold drop-shadow-lg text-center p-4"
            >
              Explore All Products
            </motion.h2>
          </div>
        </div>

        {/* Arrow Icon (bottom right on image), clickable */}
        <div
          onClick={() => navigate("/products")}
          className="absolute bottom-18 right-5 p-3 sm:p-4 rounded-full bg-black bg-opacity-50 hover:bg-opacity-80 cursor-pointer transition-colors duration-300"
          title="Go to All Products"
          aria-label="Go to All Products"
        >
          <FaArrowAltCircleLeft className="text-white w-6 h-6 sm:w-8 sm:h-8 rotate-[140deg] transition-transform hover:scale-110" />
        </div>
      </div>
    </div>
  );
}
