

"use client"

import React, { useState, useEffect, useRef } from "react"
import { Heart, ShoppingCart, ChevronDown, Check } from 'lucide-react'
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { FiX, FiChevronLeft, FiChevronRight, FiFilter } from "react-icons/fi"


import productImage1 from "../../assets/pic1.jpg"
import productImage2 from "../../assets/swing1.png"
import productImage3 from "../../assets/swing2.png"
import productImage4 from "../../assets/swing3.png"
import productImage5 from "../../assets/swing4.png"
import productImage6 from "../../assets/swing5.png"
import productImage7 from "../../assets/swing6.png"
import productImage8 from "../../assets/swing7.png"
import productImage9 from "../../assets/swing9.png"
import productImage10 from "../../assets/swing10.png"

import genericProductImage from "../../assets/swing10.png"


const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1 
        }
    }
}

// HEAVY ANIMATION FOR PRODUCT CARDS
const productCardVariant = {
    hidden: { opacity: 0, y: 120, scale: 0.6, rotateX: 45 }, 
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: {
            type: "spring", 
            stiffness: 70,  
            damping: 20,     
            duration: 0.8,   
        }
    },
    cardHover: {
        scale: 1.06, 
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)", 
        transition: { duration: 0.3 }
    },
    cardTap: { scale: 0.98, transition: { duration: 0.1 } } 
};

// Variants for buttons and icons
const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, type: 'spring', stiffness: 100 } },
    hover: { scale: 1.05 }, 
    tap: { scale: 0.95 }
}

// Variants for dropdown content
const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeInOut",
            staggerChildren: 0.1,
        },
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

// Variants for dropdown options
const dropdownOptionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
}

// Variants for checkboxes
const checkboxVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

// Variants for the product detail overlay itself (the transparent background + blur)
const productDetailOverlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
};

// Variants for the inner detail card (the white box)
const productDetailCardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { y: 50, opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: "easeIn" } },
};

// --- HELPER ANIMATED COMPONENTS (from previous ProductListing.jsx) ---
const AnimatedButton = ({ children, onClick, className, ...props }) => (
    <motion.button
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        onClick={onClick}
        className={className}
        {...props}
    >
        {children}
    </motion.button>
);

const AnimatedIcon = ({ children, className, ...props }) => (
    <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        className={className}
        {...props}
    >
        {children}
    </motion.div>
);

const AnimatedDropdown = ({ children, selectedValue, onSelect, className, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block" ref={dropdownRef} {...props}>
            <AnimatedButton
                onClick={() => setIsOpen(!isOpen)}
                className={`bg-white border border-gray-300 rounded px-4 py-2 pr-8 appearance-none hover:border-gray-400 transition-colors flex items-center justify-between ${className}`}
            >
                <span>{selectedValue}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-4 h-4" />
                </motion.div>
            </AnimatedButton>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                    >
                        <div className="py-1">
                            {React.Children.map(children, (child, index) => {
                                if (React.isValidElement(child) && child.type === 'option') {
                                    return (
                                        <motion.button
                                            key={index}
                                            variants={dropdownOptionVariants}
                                            onClick={() => {
                                                setIsOpen(false);
                                                onSelect(child.props.value);
                                            }}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                        >
                                            {child.props.children}
                                        </motion.button>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const AnimatedCheckbox = ({
    label,
    checked,
    onChange,
    id,
    className
}) => (
    <motion.div
        variants={checkboxVariants}
        initial="hidden"
        animate="visible"
        className={className}
    >
        <div className="flex items-center mb-2">
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={onChange}
                className="mr-2 h-4 w-4 text-[#2a2e0f] focus:ring-[#2a2e0f] border-gray-300 rounded"
            />
            <label htmlFor={id} className="text-sm text-gray-700">
                {label}
            </label>
        </div>
    </motion.div>
);

// --- PRODUCT DETAIL OVERLAY COMPONENT (from previous ProductListing.jsx) ---
const ProductDetailOverlay = ({ product, onClose, onAddToCart, onAddToWishlist, onOrderNow }) => {
    if (!product) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            variants={productDetailOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <motion.div
                // Increased max-w to 4xl and max-h to 95vh for a larger modal
                className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 md:p-8 flex flex-col md:flex-row max-h-[95vh]"
                variants={productDetailCardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-10 bg-gray-100 rounded-full p-2"
                >
                    <FiX size={24} />
                </button>

                <div className="md:w-1/2 flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                    <img
                        src={product.image || genericProductImage} // Use product.image or a generic one
                        alt={product.name}
                        className="w-full h-80 object-cover rounded-lg shadow-md" // Reverted image height to h-80
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                        }}
                    />
                    <div className="mt-2 border-t pt-2 border-gray-200 text-sm text-gray-600  ">
                        <h4 className="font-semibold mb-2">Product All:</h4>
                        <ul className="list-disc list-inside space-y-1">
                         
                            <li>Color: {product.name.includes("Wooden") ? "Natural Teak" : product.name.includes("Acrylic") ? "Clear" : product.name.includes("SS") ? "Silver" : "Mixed Colors"}</li>
                            <li>Style: {product.name.includes("Wooden") ? "Traditional" : product.name.includes("Acrylic") ? "Modern" : product.name.includes("SS") ? "Industrial" : "Contemporary"}</li>
                            <li>Usage: {product.name.includes("Wooden") ? "Indoor & Outdoor" : product.name.includes("Acrylic") ? "Indoor" : product.name.includes("SS") ? "Outdoor" : "Indoor & Outdoor"}</li>
                            <li>Care: {product.name.includes("Wooden") ? "Avoid direct sunlight" : product.name.includes("Acrylic") ? "Clean with mild soap" : product.name.includes("SS") ? "Rust-resistant" : "Easy to clean"}</li>  
                            <li>Assembly: {product.name.includes("Wooden") ? "Minimal assembly required" : product.name.includes("Acrylic") ? "Fully assembled" : product.name.includes("SS") ? "Easy assembly" : "Some assembly required"}</li>
                            <li>Warranty: {product.name.includes("Wooden") ? "2 years" : product.name.includes("Acrylic") ? "1 year" : product.name.includes("SS") ? "3 years" : "1 year"}</li>
                            <li>Shipping: {product.name.includes("Wooden") ? "Free shipping" : product.name.includes("Acrylic") ? "Standard shipping" : product.name.includes("SS") ? "Express shipping" : "Free shipping"}</li>
                            <li>Return Policy: {product.name.includes("Wooden") ? "30-day return" : product.name.includes("Acrylic") ? "No returns" : product.name.includes("SS") ? "15-day return" : "30-day return"}</li>
                            <li>Customer Support: {product.name.includes("Wooden") ? "24/7 support" : product.name.includes("Acrylic") ? "Business hours support" : product.name.includes("SS") ? "Email support" : "24/7 support"}</li>
                            <li>Care Instructions: {product.name.includes("Wooden") ? "Avoid moisture" : product.name.includes("Acrylic") ? "Use soft cloth" : product.name.includes("SS") ? "Clean with vinegar" : "General care"}</li>
                            <li>Assembly Instructions: {product.name.includes("Wooden") ? "Screwdriver needed" : product.name.includes("Acrylic") ? "No tools needed" : product.name.includes("SS") ? "Allen wrench included" : "Basic tools required"}</li>


 </ul>
                    </div>
                </div>

                <div className="md:w-1/2">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h2>
                    <p className="text-sm text-gray-500 mb-4">{product.category}</p>
                    <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

                    <div className="flex items-baseline mb-6">
                        <span className="text-4xl font-extrabold text-[#2a2e0f] mr-3">
                            ₹{product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                            <span className="text-lg text-gray-500 line-through">
                                ₹{product.originalPrice.toFixed(2)}
                            </span>
                        )}
                        {product.originalPrice && product.price < product.originalPrice && (
                            <span className="ml-3 text-sm text-red-500 font-semibold">
                                {(((product.originalPrice - product.price) / product.originalPrice) * 100).toFixed(0)}% OFF
                            </span>
                        )}
                    </div>

                    <div className="flex space-x-4 mb-6 w-[270px]">
                        <AnimatedButton
                            onClick={() => onAddToCart(product.id)}
                            className="flex-1 bg-[#2a2e0f] text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-[#3a3e1f] transition-colors flex items-center justify-center"
                        >
                            <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                        </AnimatedButton>
                        <AnimatedButton
                            onClick={() => onAddToWishlist(product.id)}
                            className="bg-gray-200 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-300 transition-colors flex items-center justify-center"
                        >
                            <Heart className="w-5 h-5" />
                        </AnimatedButton>
                    </div>

                    <AnimatedButton
                        onClick={() => onOrderNow(product.id)}
                        className="w-[200px] bg-gray-500 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-gray-400 transition-colors"
                    >
                        Order Now
                    </AnimatedButton>

                    <div className="mt-8 border-t pt-6 border-gray-200 text-sm text-gray-600">
                        <h4 className="font-semibold mb-2">Product Details:</h4>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Material: High-quality {product.name.includes("Wooden") ? "Teak Wood" : product.name.includes("Acrylic") ? "Acrylic" : product.name.includes("SS") ? "Stainless Steel" : "Mixed Materials"}</li>
                            <li>Dimensions: Varies by model (e.g., 60cm x 120cm x 80cm)</li>
                            <li>Weight Capacity: Up to 150 kg</li>
                            <li>Care Instructions: Wipe with a damp cloth</li>
                            {/* Add more details as needed */}
                        </ul>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};


// --- CATEGORY LISTING COMPONENT ---
export default function CategoryListing() {
    const [activeCategory, setActiveCategory] = useState("All")
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false)
    const [selectedSort, setSelectedSort] = useState("High to Low")
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedProduct, setSelectedProduct] = useState(null); 

    const sortOptions = ["High to Low", "Low to High", "Newest", "Popular"]

    const categories = [
        "All",
        "Single Seats Swings",
        "Acrylic Swings",
        "Outdoor Swings",
        "Macrame Swings",
        "SS Swings",
        "Wooden Swings",
    ]

    const products = [
        { id: 1, name: "Classic Wooden Swing 1", description: "This is a detailed description for Classic Wooden Swing 1, highlighting its craftsmanship and durable materials.", price: 12000, originalPrice: 15000, image: productImage1, category: "Wooden Swings" },
        { id: 2, name: "Modern Acrylic Swing 2", description: "A sleek and transparent design, the Modern Acrylic Swing 2 brings contemporary elegance to any space.", price: 8500, originalPrice: 10000, image: productImage6, category: "Acrylic Swings" },
        { id: 3, name: "Macrame Hanging Chair 3", description: "Hand-knotted macrame chair, perfect for creating a bohemian and cozy corner in your home.", price: 7000, originalPrice: 9500, image: productImage3, category: "Macrame Swings" },
        { id: 4, name: "Outdoor Garden Swing 4", description: "Weather-resistant and sturdy, this swing is designed for endless enjoyment in your garden or patio.", price: 10000, originalPrice: 13000, image: productImage9, category: "Outdoor Swings" },
        { id: 5, name: "Stainless Steel Swing 5", description: "Robust and stylish, the Stainless Steel Swing 5 offers a minimalist aesthetic and exceptional durability.", price: 11000, originalPrice: 14000, image: productImage5, category: "SS Swings" },
        { id: 6, name: "Luxury Teak Swing 6", description: "Experience ultimate comfort and luxury with this exquisite swing made from premium teak wood.", price: 18000, originalPrice: 21000, image: productImage7, category: "Wooden Swings" },
        { id: 7, name: "Kids Single Seat Swing 7", description: "A safe and fun swing designed specifically for children, perfect for indoor or outdoor play.", price: 4000, originalPrice: 5500, image: productImage10, category: "Single Seats Swings" },
        { id: 8, name: "Portable Macrame Swing 8", description: "Lightweight and easy to move, this macrame swing is ideal for small spaces or taking on trips.", price: 6000, originalPrice: 8000, image: productImage9, category: "Macrame Swings" },
        // Page 2 Products
        { id: 9, name: "Comfortable Fabric Swing 9", description: "Soft fabric swing, providing a cozy and relaxing spot for reading or unwinding.", price: 7500, originalPrice: 9000, image: productImage1, category: "Single Seats Swings" },
        { id: 10, name: "Durable Metal Swing 10", description: "Built to last, this sturdy metal swing is perfect for high-traffic areas or commercial use.", price: 13000, originalPrice: 16000, image: productImage2, category: "SS Swings" },
        { id: 11, name: "Swing for Two 11", description: "A spacious swing designed for two, ideal for couples or best friends to enjoy together.", price: 16000, originalPrice: 20000, image: productImage3, category: "Outdoor Swings" },
        { id: 12, name: "Artistic Wooden Carved Swing 12", description: "Intricately carved details make this wooden swing a true piece of art and a focal point in any room.", price: 25000, originalPrice: 30000, image: productImage1, category: "Wooden Swings" },
        { id: 13, name: "Swing Model 13", description: "Modern and elegant, this swing features a unique design that complements contemporary decor.", price: 9000, originalPrice: 11000, image: productImage2, category: "Acrylic Swings" },
        { id: 14, name: "Swing Model 14", description: "Handwoven with natural fibers, this swing offers both comfort and a rustic charm.", price: 10500, originalPrice: 12500, image: productImage3, category: "Macrame Swings" },
        { id: 15, name: "Swing Model 15", description: "Resistant to all weather conditions, making it an excellent addition to any outdoor living space.", price: 7800, originalPrice: 9200, image: productImage4, category: "Outdoor Swings" },
        { id: 16, name: "Swing Model 16", description: "Crafted from durable stainless steel, ensuring longevity and a sleek, polished look.", price: 14000, originalPrice: 17000, image: productImage5, category: "SS Swings" },
        // Page 3 Products
        { id: 17, name: "Swing Model 17", description: "A grand wooden swing designed for spacious interiors, offering unparalleled comfort.", price: 12500, originalPrice: 15500, image: productImage6, category: "Wooden Swings" },
        { id: 18, name: "Swing Model 18", description: "Compact and chic, this single-seat swing is perfect for a reading nook or a cozy balcony.", price: 6200, originalPrice: 7800, image: productImage8, category: "Single Seats Swings" },
        { id: 19, name: "Swing Model 19", description: "Bohemian-inspired macrame swing, adding a touch of global flair to your home decor.", price: 9800, originalPrice: 11200, image: productImage8, category: "Macrame Swings" },
        { id: 20, name: "Swing Model 20", description: "Its transparent design creates an illusion of floating, making it a unique statement piece.", price: 11500, originalPrice: 13500, image: productImage7, category: "Acrylic Swings" },
        { id: 21, name: "Swing Model 21", description: "Ergonomically designed for maximum comfort, this single-seat swing is ideal for relaxation.", price: 8900, originalPrice: 10200, image: productImage5 , category: "Single Seats Swings" },
        { id: 22, name: "Swing Model 22", description: "A beautifully finished wooden swing, perfect for adding warmth and elegance to any room.", price: 13200, originalPrice: 16000, image: productImage10, category: "Wooden Swings" },
        { id: 23, name: "Swing Model 23", description: "Built for the outdoors, this swing withstands harsh weather while maintaining its aesthetic appeal.", price: 10900, originalPrice: 12900, image: productImage4, category: "Outdoor Swings" },
        { id: 24, name: "Swing Model 24", description: "An industrial-style swing made from high-grade stainless steel, suitable for contemporary settings.", price: 7300, originalPrice: 8800, image: productImage9, category: "SS Swings" },
        // Page 4 Products (5 items)
        { id: 25, name: "Swing Model 25", description: "Hand-carved details and a rich finish define this premium wooden swing, a masterpiece for your home.", price: 15000, originalPrice: 18000, image: productImage8, category: "Wooden Swings" },
        { id: 26, name: "Swing Model 26", description: "A vibrant and cozy single-seat swing, perfect for adding a pop of color to your personal space.", price: 6800, originalPrice: 8200, image: productImage7, category: "Single Seats Swings" },
        { id: 27, name: "Swing Model 27", description: "Intricate macrame patterns create a stunning focal point, ideal for a relaxed, artistic vibe.", price: 9500, originalPrice: 11000, image: productImage8, category: "Macrame Swings" },
        { id: 28, name: "Swing Model 28", description: "The clear acrylic body gives this swing a minimalist and futuristic look, blending seamlessly with modern decor.", price: 12000, originalPrice: 14000, image: productImage6, category: "Acrylic Swings" },
        { id: 29, name: "Swing Model 29", description: "Enjoy the fresh air with this durable outdoor swing, perfect for relaxing on your porch or balcony.", price: 8000, originalPrice: 9500, image: productImage7, category: "Outdoor Swings" },
    ]

    const getProductsPerPage = (page) => {
        if (page >= 1 && page <= 3) {
            return 8
        } else if (page === 4) {
            return 5
        }
        return 8
    }

    const totalProducts = products.length
    let totalPages = 0
    if (totalProducts <= 8) {
        totalPages = 1;
    } else if (totalProducts <= 16) {
        totalPages = 2;
    } else if (totalProducts <= 24) {
        totalPages = 3;
    } else {
        totalPages = 4;
    }

    const filteredProducts = activeCategory === "All"
        ? products
        : products.filter(p => p.category === activeCategory)

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (selectedSort === "High to Low") return b.price - a.price
        if (selectedSort === "Low to High") return a.price - b.price
        return 0
    })

    const currentProductsPerPage = getProductsPerPage(currentPage)

    let indexOfFirstProduct = 0
    if (currentPage === 1) {
        indexOfFirstProduct = 0
    } else if (currentPage === 2) {
        indexOfFirstProduct = 8
    } else if (currentPage === 3) {
        indexOfFirstProduct = 16
    } else if (currentPage === 4) {
        indexOfFirstProduct = 24
    }
    const indexOfLastProduct = indexOfFirstProduct + currentProductsPerPage

    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct)


    const handleSortSelect = (option) => {
        setSelectedSort(option)
        setSortDropdownOpen(false)
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
        window.scrollTo(0, 0)
    }

    // Handlers for ProductDetailOverlay (copied from ProductListing.jsx)
    const handleProductClick = (product) => {
        setSelectedProduct(product);
    }

    const closeProductDetail = () => {
        setSelectedProduct(null);
    }

    const handleAddToCart = (productId) => {
        console.log(`Adding product ${productId} to cart from Category Listing!`);
        // Implement your add to cart logic here
        alert(`Product ID ${productId} added to cart!`);
    };

    const handleAddToWishlist = (productId) => {
        console.log(`Adding product ${productId} to wishlist from Category Listing!`);
        // Implement your add to wishlist logic here
        alert(`Product ID ${productId} added to wishlist!`);
    };

    const handleOrderNow = (productId) => {
        console.log(`Ordering product ${productId} now from Category Listing!`);
        // Implement your order now logic here
        alert(`Initiating order for product ID: ${productId}`);
        closeProductDetail(); // Close modal after action
    };


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-amber-50 pt-20 min-h-screen px-4 py-8 md:px-8 lg:px-16 relative"
        >
            {/* Product Detail Overlay (Modal) */}
            <AnimatePresence>
                {selectedProduct && (
                    <ProductDetailOverlay
                        product={selectedProduct}
                        onClose={closeProductDetail}
                        onAddToCart={handleAddToCart}
                        onAddToWishlist={handleAddToWishlist}
                        onOrderNow={handleOrderNow}
                    />
                )}
            </AnimatePresence>

            <div className={`${selectedProduct ? "blur-sm pointer-events-none" : ""} transition-filter duration-300`}>
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-2xl  font-la-mango">Shop By Categories</h1>
                    <p className="text-sm text-gray-500 pt-3 pb-8">Home / Shop By Categories</p>
                </motion.div>

                {/* Category Buttons & Sort */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="flex flex-wrap justify-between items-center mb-8"
                >
                    <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                        {categories.map((category) => (
                            <motion.button
                                key={category}
                                variants={productCardVariant} 
                                whileHover={{ scale: 1.08, backgroundColor: "#3a3e0f", color: "white", transition: { duration: 0.2 } }}
                                whileTap={{ scale: 0.92, transition: { duration: 0.1 } }}
                                onClick={() => {
                                    setActiveCategory(category)
                                    setCurrentPage(1)
                                }}
                                className={`px-4 py-2 text-sm rounded-md border transition-colors ${
                                    activeCategory === category
                                        ? "bg-[#2a2e0f] text-white border-[#2a2e0f]"
                                        : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                                }`}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </div>

                    {/* Sort Dropdown */}
                    <motion.div variants={productCardVariant} className="relative">
                        <motion.button
                            whileHover={{ scale: 1.08, backgroundColor: "#f0f0f0", transition: { duration: 0.2 } }}
                            whileTap={{ scale: 0.92, transition: { duration: 0.1 } }}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                            onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                        >
                            <span>Sort By: {selectedSort}</span>
                            <motion.span
                                animate={{ rotate: sortDropdownOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronDown className="w-4 h-4" />
                            </motion.span>
                        </motion.button>
                        <AnimatePresence>
                            {sortDropdownOpen && (
                                <motion.div
                                    variants={dropdownVariants} 
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                                >
                                    <ul className="py-1">
                                        {sortOptions.map((option) => (
                                            <motion.li
                                                key={option}
                                                whileHover={{ backgroundColor: "#f5f5f5" }}
                                                transition={{ duration: 0.1 }}
                                            >
                                                <button
                                                    className="flex items-center w-full px-4 py-2 text-sm"
                                                    onClick={() => handleSortSelect(option)}
                                                >
                                                    <span className="flex-grow">{option}</span>
                                                    {selectedSort === option && (
                                                        <motion.span
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            transition={{ type: "spring", stiffness: 500 }}
                                                        >
                                                            <Check className="w-4 h-4 text-[#2a2e0f]" />
                                                        </motion.span>
                                                    )}
                                                </button>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>

                {/* Product Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10"
                >
                    {currentProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            variants={productCardVariant}
                            whileHover="cardHover" 
                            whileTap="cardTap"     
                            onClick={() => handleProductClick(product)} 
                            className="p-2 rounded-4xl border bg-white shadow-sm transition-all duration-300 text-left group hover:bg-black hover:text-white cursor-pointer"
                        >
                            <div className="relative overflow-hidden rounded-4xl">
                                {/* Action buttons - visible on hover with their own hover effects */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }} 
                                    transition={{ duration: 0.5 }}
                                    className="absolute top-2 right-2 z-10 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="bg-amber-50 p-2 rounded-full hover:bg-amber-100 transition-colors"
                                        onClick={(e) => { e.stopPropagation(); handleAddToCart(product.id); }} 
                                    >
                                        <ShoppingCart className="w-5 h-5 text-black" />
                                        <span className="sr-only">Add to cart</span>
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="bg-amber-50 p-2 rounded-full shadow-md hover:bg-amber-100 transition-colors"
                                        onClick={(e) => { e.stopPropagation(); handleAddToWishlist(product.id); }} 
                                    >
                                        <Heart className="w-5 h-5 text-black" />
                                        <span className="sr-only">Add to Wishlist</span>
                                    </motion.button>
                                </motion.div>
                                <motion.img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-64 object-cover rounded-4xl"
                                    whileHover={{ scale: 1.1 }} 
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-medium text-lg">{product.name}</h3>
                                <p className="text-sm text-gray-600 group-hover:text-gray-300 mt-1 line-clamp-2">{product.description}</p>
                                <div className="mt-4 flex items-center">
                                    <motion.span
                                        className="text-lg font-bold"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        ₹{product.price.toFixed(2)}
                                    </motion.span>
                                    <motion.span
                                        className="ml-2 text-sm line-through text-gray-500 group-hover:text-gray-400"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        ₹{product.originalPrice.toFixed(2)}
                                    </motion.span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Pagination Buttons */}
                {totalPages > 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center mt-10 flex justify-center items-center gap-4"
                    >
                        <motion.button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-6 py-3 rounded-lg transition ${
                                currentPage === 1 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-[#2a2e0f] text-white hover:bg-[#1d210d]"
                            }`}
                            whileHover={{
                                scale: currentPage === 1 ? 1 : 1.08,
                                boxShadow: currentPage === 1 ? "none" : "0px 8px 18px rgba(0,0,0,0.25)", 
                                backgroundColor: currentPage === 1 ? undefined : "#1d210d", 
                                transition: { type: "spring", stiffness: 300, damping: 10 } 
                            }}
                            whileTap={{ scale: currentPage === 1 ? 1 : 0.92, transition: { duration: 0.1 } }} 
                        >
                            <FiChevronLeft className="inline-block mr-1" /> Previous Page
                        </motion.button>

                        <motion.button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-6 py-3 rounded-lg transition ${
                                currentPage === totalPages ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-[#2a2e0f] text-white hover:bg-[#1d210d]"
                            }`}
                            whileHover={{
                                scale: currentPage === totalPages ? 1 : 1.08,
                                boxShadow: currentPage === totalPages ? "none" : "0px 8px 18px rgba(0,0,0,0.25)",
                                backgroundColor: currentPage === totalPages ? undefined : "#1d210d",
                                transition: { type: "spring", stiffness: 300, damping: 10 }
                            }}
                            whileTap={{ scale: currentPage === totalPages ? 1 : 0.92, transition: { duration: 0.1 } }}
                        >
                            Next Page <FiChevronRight className="inline-block ml-1" />
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}