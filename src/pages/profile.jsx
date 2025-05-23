"use client"

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { motion, AnimatePresence } from "framer-motion";
import profilePic from "../assets/me.jpg";
import productimg from "../assets/pic2.jpg";

import { FiCheckCircle, FiPackage, FiTruck, FiHome, FiCreditCard, FiEye, FiEyeOff } from "react-icons/fi";

const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02, backgroundColor: '#3a3e1f', color: '#fff', transition: { duration: 0.2 } },
    tap: { scale: 0.98 },
};

const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeIn" } },
};

const OrderDetailsContent = () => {
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            await new Promise(resolve => setTimeout(resolve, 500));
            const dummyProduct = {
                id: "prod-xyz-123",
                name: "Luxury Wooden Swing",
                description:
                    "A beautifully crafted wooden swing, a statement piece for grand interiors.",
                price: 18000.0,
                image: productimg,
                category: "Luxury Wood",
            };

            setOrder({
                orderId: `ORD-${Date.now()}`,
                trackingId: `1234789412345689`,
                deliveryPartner: "Kalateet Logistics",
                shippingAddress: "123 Serene Heights, Green Valley, Bangalore, Karnataka 560001",
                status: "Shipping",
                product: dummyProduct,
                deliveryExpected: "May 28, 2025",
                paymentMethod: "Credit Card",
                totalAmount: 18000.0,
            });
        };
        fetchOrder();
    }, []);

    if (!order) {
        return (
            <div className="flex justify-center items-center h-full text-gray-700">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-t-2 border-[#2D3319] border-t-transparent rounded-full"
                ></motion.div>
                <p className="ml-3">Loading order details...</p>
            </div>
        );
    }

    // Determine status for timeline icons
    const statusSteps = ["Ordered", "Shipping", "Out of delivery", "Delivered"];
    const currentStatusIndex = statusSteps.indexOf(order.status);

    return (
        <motion.div
            className="w-full h-full flex flex-col xl:flex-row gap-6 p-4 md:p-6 bg-amber-50 rounded-lg shadow-md"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={contentVariants}
        >
            {/* Left - Product Overview */}
            <div className="flex flex-col items-center xl:w-1/2 text-center p-4">
                <motion.img
                    src={order.product.image}
                    alt={order.product.name}
                    className="w-48 h-48 rounded-xl object-cover shadow-md mb-4 "
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
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


            <div className="xl:w-1/2 space-y-6 text-gray-700 p-4">
                <div className="flex justify-between items-center mb-6 text-gray-500">
                    {statusSteps.map((step, index) => (
                        <React.Fragment key={step}>
                            <div className="flex flex-col items-center">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0.5 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                                >
                                    {index <= currentStatusIndex ? (
                                        <FiCheckCircle className="text-green-500 text-2xl mb-1" />
                                    ) : (
                                        <FiPackage
                                            className={`${index === currentStatusIndex + 1 ? 'text-[#2a2e0f]' : 'text-gray-400'} text-2xl mb-1`} />
                                    )}
                                </motion.div>
                                <span className="text-xs text-center mt-1">{step}</span>
                            </div>
                            {index < statusSteps.length - 1 && (
                                <motion.div
                                    className={`flex-1 h-0.5 ${index < currentStatusIndex ? 'bg-green-500' : 'bg-gray-300'} mx-2`}
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                                ></motion.div>
                            )}
                        </React.Fragment>
                    ))}
                </div>


                {/* Delivery Info */}
                <motion.div
                    className="bg-gray-100 rounded-xl p-5 shadow-inner"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
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
                </motion.div>

                {/* Shipping Address */}
                <motion.div
                    className="bg-gray-100 rounded-xl p-5 shadow-inner"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-800">
                        <FiHome className="mr-2 text-[#2a2e0f]" /> Shipping Address
                    </h3>
                    <p className="text-sm">{order.shippingAddress}</p>
                </motion.div>

                {/* Payment Info */}
                <motion.div
                    className="bg-gray-100 rounded-xl p-5 shadow-inner"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
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
                </motion.div>
            </div>
        </motion.div>
    );
};


export default function UserProfile() {
    const [activeContent, setActiveContent] = useState('info');
    const navigate = useNavigate(); 

    // State to manage form input values
    const [formData, setFormData] = useState({
        firstName: "Jimpal",
        lastName: "Sorthiya",
        phoneNumber: "+91 98765 43210",
        dob: "18/11/2006",
        email: "zulazandmore@gmail.com",
        password: "zulazandmore",
    });

    // New state for password visibility
    const [showPassword, setShowPassword] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Saving changes:", formData);

        alert("Your information has been updated successfully!");

    };

    const handleLogout = () => {
      
        console.log("Logging out...");
        localStorage.removeItem('userToken'); 
        navigate('/login'); 
    };

    return (
        <div className="min-h-screen bg-amber-50 text-[#2D3319] mt-15 p-4 md:p-8 lg:p-12">
            <div className="max-w-6xl mx-auto flex flex-col mt-12 lg:flex-row gap-6 md:gap-8 bg-yellow-50 rounded-lg shadow-md overflow-hidden">
                {/* Sidebar */}
                <motion.div
                    className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-gray-200 p-4 md:p-6 bg-amber-50 flex flex-col items-center text-center gap-4"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <motion.img
                        src={profilePic}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover shadow-lg"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 100 }}
                    />
                    <h2 className="text-xl font-serif">Hii, Jimpal</h2>
                    <div className="flex flex-row lg:flex-col gap-2 w-full justify-center lg:block">
                        <motion.button
                            onClick={() => setActiveContent('info')}
                            className={`block py-2 rounded transition-colors w-1/2 lg:w-full text-center ${activeContent === 'info' ? 'bg-[#2D3319] text-white' : 'bg-gray-100 text-[#2D3319] hover:bg-gray-200'}`}
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            My Information
                        </motion.button>
                        <motion.button
                            onClick={() => setActiveContent('order')}
                            className={`block py-2 rounded transition-colors w-1/2 lg:w-full text-center ${activeContent === 'order' ? 'bg-[#2D3319] text-white' : 'bg-gray-100 text-[#2D3319] hover:bg-gray-200'}`}
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            My Order
                        </motion.button>
                    </div>
                    {/* Logout button */}
                    <motion.button
                        onClick={handleLogout} // Call the handleLogout function
                        className="flex items-center gap-2 mt-4 text-sm text-[#2D3319] hover:text-red-500 transition-colors"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7"
                            />
                        </svg>
                        Log Out
                    </motion.button>
                </motion.div>

                {/* Main Content Area */}
                <div className="w-full lg:w-2/3 p-4 md:p-6 flex-grow relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        {activeContent === 'info' && (
                            <motion.form
                                key="infoForm"
                                className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full"
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                variants={contentVariants}
                                onSubmit={handleSubmit}
                            >
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                                    <motion.input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D3319]/50"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1, duration: 0.3 }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                                    <motion.input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D3319]/50"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2, duration: 0.3 }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">Phone Number</label>
                                    <motion.input
                                        type="text"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D3319]/50"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3, duration: 0.3 }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="dob" className="block text-sm font-medium mb-1">DOB</label>
                                    <motion.input
                                        type="text"
                                        id="dob"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D3319]/50"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4, duration: 0.3 }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                                    <motion.input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D3319]/50"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5, duration: 0.3 }}
                                    />
                                </div>
                                {/* Password Field with Show/Hide Toggle */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                                    <div className="relative">
                                        <motion.input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#2D3319]/50"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.6, duration: 0.3 }}
                                        />
                                        <motion.span
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                            onClick={togglePasswordVisibility}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.7, duration: 0.3 }}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            {showPassword ? (
                                                <FiEyeOff className="h-5 w-5 text-gray-500" />
                                            ) : (
                                                <FiEye className="h-5 w-5 text-gray-500" />
                                            )}
                                        </motion.span>
                                    </div>
                                </div>
                                <motion.button
                                    type="submit"
                                    className="md:col-span-2 bg-[#2D3319] text-white py-2 w-[150px] text-center  rounded hover:bg-[#2D3319]/90 transition-colors mt-4"
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7, duration: 0.4 }}
                                >
                                    Save Changes
                                </motion.button>
                            </motion.form>
                        )}

                        {activeContent === 'order' && (
                            <OrderDetailsContent key="orderDetails" />
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}