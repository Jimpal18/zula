import React, { useState, useRef } from "react";
import { motion } from "framer-motion"; 

// Import your images (keeping the paths as you provided)
import woodenSwingImage from "../../assets/pic2.jpg";
import gardenSwingImage from "../../assets/pic1.jpg";
import cloudSwingImage from "../../assets/cloud.jpg";

// Sample product data (you can replace this with your actual stock data)
const productData = [
  {
    id: 1,
    name: "Wooden Swings",
    description:
      "Introducing our latest innovation - a perfect blend of technology and design. Experience seamless garden-nature experience in quality and a user-friendly interface. Elevate your experience with our new product. Try it today!",
    image: woodenSwingImage,
    stock: 15,
  },
  {
    id: 2,
    name: "Garden Swing",
    description:
      "Step into tranquility with our elegant Garden Swing. Crafted for comfort and durability, it's the perfect addition to your outdoor space. Enjoy peaceful moments in style.",
    image: gardenSwingImage,
    stock: 8,
  },
  {
    id: 3,
    name: "Cloud Swing",
    description:
      "Experience the ultimate relaxation with our innovative Cloud Swing. Its unique design provides unparalleled comfort. Elevate your leisure time to new heights.",
    image: cloudSwingImage,
    stock: 22,
  },
  {
    id: 4,
    name: "Another Wooden Swing",
    description: "A classic wooden swing for your porch or garden.",
    image: woodenSwingImage,
    stock: 5,
  },
  {
    id: 5,
    name: "Modern Garden Swing",
    description: "A sleek and modern swing design for contemporary spaces.",
    image: gardenSwingImage,
    stock: 12,
  },
  {
    id: 6,
    name: "Deluxe Cloud Swing",
    description: "The premium cloud swing with extra comfort features.",
    image: cloudSwingImage,
    stock: 3,
  },
];

// Animation variants for staggered appearance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, 
    },
  },
};

// Variants for main image showcase items
const mainImageItemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100, 
      damping: 10, 
      duration: 0.8,
    },
  },
  hover: {
    scale: 1.07, 
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)", 
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// Variants for product cards when displayed
const productCardVariants = {
  hidden: { opacity: 0, y: 30, rotateX: -90 }, 
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      duration: 0.7,
    },
  },
  hover: {
    scale: 1.05,
    y: -10,
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)", 
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.98,
  },
};

export default function ProductShowcase() {
  const [clickedImage, setClickedImage] = useState(null);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const productsRef = useRef(null);

  const handleImageClick = (imageSrc) => {
    setClickedImage(imageSrc);
    const filteredProducts = productData.filter(
      (product) => product.image === imageSrc
    );
    setDisplayedProducts(filteredProducts);

    // Scroll to the products section after setting the state
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-amber-50  min-h-screen px-4 py-8 md:px-8 lg:px-16 pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl pt-15 font-la-mango text-gray-800">New Arrivals</h2>
          <p className="text-md text-gray-600 pt-3 pb-15 tracking-wide">Home / Discover Our Latest Innovations</p>
        </motion.div>

        {/* Product Layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-10 mb-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column */}
          <div className="col-span-1 md:col-span-6 lg:col-span-6 flex flex-col gap-6 md:gap-10">
            <motion.div
              className="relative rounded-4xl h-[280px] md:h-[320px] lg:h-[350px] overflow-hidden group mt-0 lg:mt-40 cursor-pointer shadow-4xl"
              onClick={() => handleImageClick(woodenSwingImage)}
              variants={mainImageItemVariants}
              whileHover="hover"
            >
              <img
                src={woodenSwingImage || "/placeholder.svg"}
                alt="Wooden Swings"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Gradient overlay on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 p-4 md:p-6 text-white">
                <motion.h3
                  className="text-2xl md:text-3xl font-extrabold mb-2 drop-shadow-md"
                  initial={{ y: 20, opacity: 0 }}
                  animate={mainImageItemVariants.visible}
                  transition={{ delay: 0.2 }}
                >
                  Wooden Swings
                </motion.h3>
                <motion.p
                  className="text-sm md:text-base line-clamp-3 md:line-clamp-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={mainImageItemVariants.visible}
                  transition={{ delay: 0.3 }}
                >
                  Introducing our latest innovation - a perfect blend of technology and design. Experience seamless garden-nature
                  experience in quality and a user-friendly interface. Elevate your experience with our new product. Try it today!
                </motion.p>
              </div>
            </motion.div>
            {/* Decorative element 1 - Removed Framer Motion */}
            {/* <div
              className="absolute transform rotate-10 top-[260px] md:top-[300px] lg:top-90 left-1/2 lg:left-0 -translate-x-1/2 lg:pl-135 z-10"
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  stroke="rgba(0,0,0,0.7)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div> */}
            {/* Garden Swing - Bottom Left */}
            <motion.div
              className="relative rounded-3xl overflow-hidden group w-full lg:w-[450px] h-[180px] md:h-[240px] lg:h-[280px] ml-0 lg:ml-27 cursor-pointer shadow-xl"
              onClick={() => handleImageClick(gardenSwingImage)}
              variants={mainImageItemVariants}
              whileHover="hover"
            >
              <img
                src={gardenSwingImage || "/placeholder.svg"}
                alt="Garden Swing"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Gradient overlay on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 p-4 md:p-6 text-white">
                <motion.h3
                  className="text-2xl md:text-3xl font-extrabold mb-2 drop-shadow-md"
                  initial={{ y: 20, opacity: 0 }}
                  animate={mainImageItemVariants.visible}
                  transition={{ delay: 0.4 }}
                >
                  Garden Swing
                </motion.h3>
                <motion.p
                  className="text-sm md:text-base line-clamp-3 md:line-clamp-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={mainImageItemVariants.visible}
                  transition={{ delay: 0.5 }}
                >
                  Step into tranquility with our elegant Garden Swing. Crafted for comfort and durability, it's the perfect addition to your outdoor space. Enjoy peaceful moments in style.
                </motion.p>
              </div>
            </motion.div>
            {/* Decorative element 2 - Removed Framer Motion */}
            {/* <div
              className="absolute transform rotate-30 right-0 lg:pr-200 top-[480px] md:top-[520px] lg:top-[550px] z-10"
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  stroke="rgba(0,0,0,0.7)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div> */}
          </div>

          {/* Right Column - Cloud Swing */}
          <div className="col-span-1 md:col-span-6 lg:col-span-6">
            <motion.div
              className="relative rounded-4xl overflow-hidden group cursor-pointer h-[320px] md:h-[300px] lg:h-[750px] shadow-xl"
              onClick={() => handleImageClick(cloudSwingImage)}
              variants={mainImageItemVariants}
              whileHover="hover"
            >
              <img
                src={cloudSwingImage || "/placeholder.svg"}
                alt="Cloud Swing"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Gradient overlay on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-fuchsia-200/70 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
              {/* Decorative element 3 - Removed Framer Motion */}
              <div
                className="absolute -right-2 top-1/4 transform rotate-12 z-10"
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    stroke="rgba(0,0,0,0.7)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {/* Text overlay for Cloud Swing */}
              <div className="absolute bottom-0 left-0 p-4 md:p-6 text-white">
                <motion.h3
                  className="text-2xl md:text-3xl font-extrabold mb-2 drop-shadow-md"
                  initial={{ y: 20, opacity: 0 }}
                  animate={mainImageItemVariants.visible}
                  transition={{ delay: 0.6 }}
                >
                  Cloud Swing
                </motion.h3>
                <motion.p
                  className="text-sm md:text-base line-clamp-3 md:line-clamp-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={mainImageItemVariants.visible}
                  transition={{ delay: 0.7 }}
                >
                  Experience the ultimate relaxation with our innovative Cloud Swing. Its unique design provides unparalleled comfort.
                  Elevate your leisure time to new heights.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Display Clicked Image Products */}
        {clickedImage && displayedProducts.length > 0 && (
          <motion.div
            ref={productsRef} 
            className="mt-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              className="text-2xl font-bold mb-10 text-gray-800 pt-20"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              More from{" "}
              {displayedProducts[0].image === woodenSwingImage
                ? "Wooden Swings"
                : displayedProducts[0].image === gardenSwingImage
                ? "Garden Swing"
                : "Cloud Swing"}
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="bg-white rounded-4xl shadow-xl overflow-hidden cursor-pointer"
                  variants={productCardVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    {product.stock === 0 && (
                      <motion.div
                        className="absolute inset-0 bg-black/60 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <span className="text-white text-xl font-bold uppercase tracking-wider">
                          Out of Stock
                        </span>
                      </motion.div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="text-md text-gray-800 font-medium">
                      Stock: {product.stock > 0 ? product.stock : "Out of Stock"}
                    </p>
                    {product.stock > 0 && (
                      <motion.button
                        className="mt-3 bg-[#2a2e0f] text-white py-2.5 px-5 rounded-4xl font-semibold shadow-md hover:bg-[#3a3e1f] focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1 w-full"
                        whileHover={{ scale: 1.02, backgroundColor: "#3a3e1f" }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        Add to Cart
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}