"use client"; // Keep this if you're using other client-side features/hooks or if this component renders client-side.

import React, { useEffect, useState } from "react";
// Removed: import { useRouter, useSearchParams } from "next/navigation"; // No longer needed
// Removed: import Image from "next/image"; // No longer needed
import { motion } from "framer-motion";
import {
  FiPackage,
  FiTruck,
  FiMapPin,
  FiCheckCircle,
  FiHome,
  FiCreditCard,
} from "react-icons/fi";

// Import useNavigate from react-router-dom if you are using it for navigation
import { useNavigate } from "react-router-dom"; // Assuming you are using react-router-dom for routing

// const PRODUCT_IMAGE_URL = "../assets/pic2.jpg"; 
import productimg from "../assets/pic2.jpg"; // Assuming you have a product image asset in this directory

const OrderConfirmationPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [order, setOrder] = useState(null);

  useEffect(() => {
    // For demonstration, we're using dummy data.
    // In a real app, you'd fetch actual order details.
    const dummyProduct = {
      id: "prod-xyz-123",
      name: "Luxury Wooden Swing",
      description:
        "A beautifully crafted wooden swing, a statement piece for grand interiors.",
      price: 18000.0,
      image: productimg, // Use the public URL path
      category: "Luxury Wood",
    };

    setOrder({
      orderId: `ORD-${Date.now()}`,
      trackingId: `1234789412345689`,
      deliveryPartner: "Kalateet",
      shippingAddress: "123 Jewelry Lane, Gold District, New York, NY 10001",
      status: "Shipping",
      product: dummyProduct,
      deliveryExpected: "May 28, 2025",
      paymentMethod: "Credit Card",
      totalAmount: 18000.0,
    });
  }, []); // Empty dependency array means this effect runs once on mount


  if (!order) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-amber-50 text-gray-700">
        Loading order details...
      </div>
    );
  }

  // Use useNavigate for navigation back to the profile page
  const handleBackToProfile = () => {
    navigate("/profile"); // Navigate to the /profile route
  };


  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4 py-10 pt-25">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white shadow-2xl rounded-3xl w-full max-w-5xl p-8 md:p-12 flex flex-col md:flex-row gap-10"
      >
        {/* Left - Product Overview */}
        <div className="flex flex-col items-center md:w-1/2 text-center">
          {/* Use a standard <img> tag and the public URL */}
          <img
            src={order.product.image} // This will be "/assets/pic2.jpg"
            alt={order.product.name}
            className="w-48 h-48 rounded-xl object-cover shadow-md mb-4"
          />
          <h2 className="text-xl font-bold text-gray-800">
            {order.product.name}
          </h2>
          <p className="text-sm text-gray-500 mb-2">{order.product.category}</p>
          <p className="text-lg font-semibold text-[#2a2e0f] mb-2">
            ₹{order.product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600">{order.product.description}</p>
          <p className="mt-4 text-sm text-gray-400">Order ID: {order.orderId}</p>
        </div>

        {/* Right - Detailed Info */}
        <div className="md:w-1/2 space-y-6 text-gray-700">
          {/* Order Status Timeline */}
          <div className="flex justify-between items-center mb-6 text-gray-500">
            <div className="flex flex-col items-center">
              <FiCheckCircle className="text-green-500 text-2xl mb-1" />
              <span className="text-xs">Ordered</span>
            </div>
            <div className="flex-1 h-0.5 bg-green-500 mx-2"></div>
            <div className="flex flex-col items-center">
              <FiCheckCircle className="text-green-500 text-2xl mb-1" />
              <span className="text-xs">Shipping</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
            <div className="flex flex-col items-center">
              <FiMapPin className="text-gray-400 text-2xl mb-1" />
              <span className="text-xs">Out of delivery</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
            <div className="flex flex-col items-center">
              <FiPackage className="text-gray-400 text-2xl mb-1" />
              <span className="text-xs">Delivered</span>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-gray-50 rounded-xl p-5 shadow-inner">
            <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-800">
              <FiTruck className="mr-2 text-[#2a2e0f]" /> Delivery Details
            </h3>
            <p>
              <span className="font-medium">Partner:</span>{" "}
              {order.deliveryPartner}
            </p>
            <p>
              <span className="font-medium">Tracking:</span>{" "}
              <span className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">
                {order.trackingId}
              </span>
            </p>
            <p>
              <span className="font-medium">Expected:</span>{" "}
              {order.deliveryExpected}
            </p>
          </div>

          {/* Shipping Address */}
          <div className="bg-gray-50 rounded-xl p-5 shadow-inner">
            <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-800">
              <FiHome className="mr-2 text-[#2a2e0f]" /> Shipping Address
            </h3>
            <p className="text-sm">{order.shippingAddress}</p>
          </div>

          {/* Payment Info */}
          <div className="bg-gray-50 rounded-xl p-5 shadow-inner">
            <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-800">
              <FiCreditCard className="mr-2 text-[#2a2e0f]" /> Payment Summary
            </h3>
            <p>
              <span className="font-medium">Method:</span>{" "}
              {order.paymentMethod}
            </p>
            <p className="text-lg font-bold text-[#2a2e0f]">
              Total: ₹{order.totalAmount.toFixed(2)}
            </p>
          </div>

          {/* Back to Profile Button */}
          <div className="text-center mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBackToProfile} // Use the navigate function
              className="bg-[#2a2e0f] text-white px-6 py-3 rounded-md font-semibold shadow hover:bg-[#3a3e1f] transition"
            >
              Back to Profile
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmationPage;