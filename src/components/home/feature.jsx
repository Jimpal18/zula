import React, { useEffect, useRef } from "react";
import { ShoppingCart } from "lucide-react";
import { IoMdHeartEmpty } from "react-icons/io";
import { Link } from "react-router-dom";
import { motion, useAnimationControls, useInView, AnimatePresence } from "framer-motion";
import img from "../../assets/pic1.jpg";
import img1 from "../../assets/swing6.png";
import img2 from "../../assets/swing2.png";
import img3 from "../../assets/swing5.png";



// Category data
const categories = [
  {
    id: 1,
    name: "Wooden Swings",
    description: "A perfect blend of technology and design.",
    price: 10000.0,
    originalPrice: 16000.0,
    image: img,
    link: "/products/wooden-swings",
  },
  {
    id: 2,
    name: "Acrylic Swings",
    description: "Modern transparent design with elegance.",
    price: 8500.0,
    originalPrice: 12000.0,
    image: img1,
    link: "/products/acrylic-swings",
  },
  {
    id: 3,
    name: "Outdoor Swings",
    description: "Weather-resistant materials for outdoors.",
    price: 9500.0,
    originalPrice: 13000.0,
    image: img2,
    link: "/products/outdoor-swings",
  },
  {
    id: 4,
    name: "Macrame Swings",
    description: "Handcrafted with a bohemian touch.",
    price: 7800.0,
    originalPrice: 11000.0,
    image: img3,
    link: "/products/macrame-swings",
  },
];

export default function CategoryGrid() {
  return (
    <div className="w-full px-4 py-12 bg-white">
      <div className="max-w-screen-xl mx-auto">
        {/* Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start mb-8">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="text-2xl md:text-3xl font-serif text-left"
          >
            Featured collection
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
            className="max-w-md text-gray-700 mt-4 md:mt-0 text-justify font-light text-sm md:text-base"
          >
            "Introducing our latest innovation – a perfect blend of technology and
            design. Experience seamless performance, unmatched quality, and a
            user-friendly interface. Elevate your experience with our new
            product. Try it today!"
          </motion.p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {categories.map((cat, index) => (
              <ProductCard
                key={cat.id}
                product={cat}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const ProductCard = ({ product, index }) => {
  const controls = useAnimationControls();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        rotate: 0,
        scale: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut",
          delay: index * 0.2,
        },
      });
    }
    else{
      controls.start({
        opacity: 0,
        y: -80,
        rotate: 0,
        scale: 0.9
      })
    }
  }, [isInView, controls, index]);

  // Add to Cart Function
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart`);
  };

  // Add to Wishlist Function
  const addToWishlist = (product) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert(`${product.name} added to wishlist`);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -80, rotate: 0, scale: 0.9 }}
      animate={controls}
      exit={{ opacity: 0, y: -50, rotate: 0, scale: 0.9 }}
      className="pl-2 pt-2 pr-2 rounded-4xl border overflow-hidden bg-white shadow-sm transition-all duration-300 text-left group hover:bg-black hover:text-white"
    >
      {/* Image and Hover Icons */}
      <div className="relative">
        <motion.div
          className="absolute top-2 right-2 z-10 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          {/* Add to Cart Button */}
          <motion.button
            onClick={() => addToCart(product)}
            className="flex items-center gap-2 bg-amber-50 p-2 rounded-full hover:bg-amber-100 transition"
            title="Add to Cart"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-black" />
          </motion.button>

          {/* Add to Wishlist Button */}
          <motion.button
            onClick={() => addToWishlist(product)}
            className="bg-amber-50 p-2 rounded-full shadow-md hover:bg-gray-200 transition"
            title="Add to Wishlist"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <IoMdHeartEmpty className="w-4 h-4 md:w-5 md:h-5 text-black" />
          </motion.button>
        </motion.div>

        <Link to={product.link}>
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-40 sm:h-62 object-cover transition-opacity duration-300 group-hover:opacity-80 rounded-4xl"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </Link>
      </div>

      {/* Info */}
      <div className="p-4 text-left">
        <motion.h3
          className="font-medium text-lg group-hover:text-white"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          {product.name}
        </motion.h3>
        <p className="text-sm font-light text-gray-500 group-hover:text-gray-300">
          {product.description}
        </p>

        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-base font-semibold group-hover:text-white">
            ₹{product.price.toFixed(2)}
          </span>
          <span className="line-through text-sm text-gray-500 group-hover:text-gray-300">
            ₹{product.originalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
