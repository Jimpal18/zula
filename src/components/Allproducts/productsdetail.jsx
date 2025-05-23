"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiFilter, FiChevronDown, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { ShoppingCart, Heart } from "lucide-react"
import productImage from "../../assets/pic2.jpg" 

const fadeInVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99],
            type: 'spring',
            stiffness: 100,
            damping: 10
        } 
    },
}
const productCardVariants = {
    hidden: (i) => ({
        opacity: 0,
        x: -1000, 
        scale: 0.5,
        rotate: -15,
        transition: {
            delay: i * 0.3, 
            duration: 1.2,  
            ease: "anticipate", 
            type: 'spring',
            stiffness: 80,
            damping: 15
        },
    }),
   visible: (i) => ({
        opacity: 1,
        x: 0,
        scale: 1,
        rotate: 0,
        transition: {
            delay: i * 0.3,
            duration: 1.2,
            ease: "anticipate",
            type: 'spring',
            stiffness: 80,
            damping: 15
        },
    }),
    exit: { 
        opacity: 0, 
        scale: 0.7, 
        rotate: 10,
        transition: { 
            duration: 0.6,
            ease: "backIn"
        } 
    },
    hover: {
        y: -20,
        scale: 1.05,
        rotate: -1,
        transition: {
            duration: 0.4,
            type: 'spring',
            stiffness: 300
        }
    },
    tap: {
        scale: 0.95,
        rotate: 1
    }
};

// Variants for filter sidebar
const filterSidebarVariants = {
    open: {
        x: 0,
        opacity: 1,
        transition: { 
            duration: 0.6,
            ease: [0.6, -0.05, 0.01, 0.99],
            type: 'spring',
            stiffness: 100,
            damping: 15
        },
    },
    closed: { 
        x: "-120%", 
        opacity: 0, 
        transition: { 
            duration: 0.5,
            ease: "backIn"
        } 
    },
};
// Variants for dropdown content
const dropdownVariants = {
    hidden: { 
        opacity: 0, 
        y: -20,
        scale: 0.95 
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.6, -0.05, 0.01, 0.99],
            staggerChildren: 0.15,
        },
    },
    exit: { 
        opacity: 0, 
        y: -20,
        scale: 0.95, 
        transition: { 
            duration: 0.3,
            ease: "backIn"
        } 
    }
}

// Variants for dropdown options
const dropdownOptionVariants = {
    hidden: { 
        opacity: 0, 
        x: -20 
    },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 200
        }
    },
    hover: {
        x: 5,
        transition: {
            type: 'spring',
            stiffness: 300
        }
    }
}


// Variants for buttons and icons
const buttonVariants = {
    hidden: { 
        opacity: 0, 
        scale: 0.7,
        y: 20 
    },
    visible: { 
        opacity: 1, 
        scale: 1,
        y: 0,
        transition: { 
            duration: 0.6, 
            type: 'spring', 
            stiffness: 150,
            damping: 10
        } 
    },
    hover: { 
        scale: 1.1,
        y: -3,
        transition: {
            type: 'spring',
            stiffness: 400
        }
    },
    tap: { 
        scale: 0.9,
        y: 2
    }
}


// Variants for checkboxes.  Added for consistency and potential future animation
const checkboxVariants = {
    hidden: { 
        opacity: 0, 
        x: -20 
    },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { 
            duration: 0.5,
            type: 'spring',
            stiffness: 150
        } 
    },
    hover: {
        scale: 1.05,
        x: 5
    }
};


// Variants for the product detail overlay itself (the transparent background + blur)
const productDetailOverlayVariants = {
    hidden: { 
        opacity: 0,
        backdropFilter: 'blur(0px)'
    },
    visible: { 
        opacity: 1,
        backdropFilter: 'blur(10px)',
        transition: { 
            duration: 0.6,
            ease: [0.6, -0.05, 0.01, 0.99]
        } 
    },
    exit: { 
        opacity: 0,
        backdropFilter: 'blur(0px)',
        transition: { 
            duration: 0.4,
            ease: "backIn"
        } 
    },
};

// Variants for the inner detail card (the white box)
const productDetailCardVariants = {
    hidden: { 
        y: 100, 
        opacity: 0, 
        scale: 0.8,
        rotate: -5 
    },
    visible: { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        rotate: 0,
        transition: { 
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99],
            type: 'spring',
            stiffness: 100,
            damping: 15
        } 
    },
    exit: { 
        y: 100, 
        opacity: 0, 
        scale: 0.8,
        rotate: 5,
        transition: { 
            duration: 0.5,
            ease: "backIn"
        } 
    },
};

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
                    <FiChevronDown className="w-4 h-4" />
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

const ProductDetailOverlay = ({ product, onClose, onAddToCart, onAddToWishlist, onOrderNow }) => {
    if (!product) return null;

    return (
        <motion.div
            // This is the full-screen transparent overlay with backdrop blur
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            variants={productDetailOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <motion.div
                // This is the actual product detail card (smaller, white background)
                className="relative bg-white rounded-4xl shadow-xl max-w-3xl w-full p-6 md:p-8 flex flex-col md:flex-row max-h-[100vh]"
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
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        // Reduced image height from h-80 to h-72
                        className="w-full h-72 object-cover rounded-lg shadow-md"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                        }}
                    />
                    <div className="mt-8 border-t pt-6 border-gray-200 text-sm text-gray-600  ">
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
                            <li>Safety Features: {product.name.includes("Wooden") ? "Non-toxic finish" : product.name.includes("Acrylic") ? "Shatter-resistant" : product.name.includes("SS") ? "Rust-proof" : "Safety tested"}</li>


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

 



                    <div className="flex space-x-4 mb-6 w-[250px]">
                        <AnimatedButton
                            onClick={() => onAddToCart(product.id)}
                            className="flex-1  bg-[#2a2e0f] text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-[#3a3e1f] transition-colors flex items-center justify-center"
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
                        className="w-[180px] bg-gray-400 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                        Order Now
                    </AnimatedButton>

                    <div className="mt-8 border-t pt-6 border-gray-200 text-sm text-gray-600  ">
                        <h4 className="font-semibold mb-2">Product Details:</h4>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Material: High-quality {product.name.includes("Wooden") ? "Teak Wood" : product.name.includes("Acrylic") ? "Acrylic" : product.name.includes("SS") ? "Stainless Steel" : "Mixed Materials"}</li>
                            <li>Dimensions: Varies by model (e.g., 60cm x 120cm x 80cm)</li>
                            <li>Weight Capacity: Up to 150 kg</li>
                            <li>Care Instructions: Wipe with a damp cloth</li>
                            <li>Assembly: Some assembly required (tools included)</li>
                            <li>Warranty: 1 year against manufacturing defects</li>
                            <li>Shipping: Free shipping on orders over ₹5000</li>
                          
                                                 </ul>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};


export default function ProductListing() {
    const [showFilters, setShowFilters] = useState(false)
    const [categoryFilters, setCategoryFilters] = useState({
        "Single Seats Swings": false,
        "Acrylic Swings": false,
        "Outdoor Swings": false,
        "Macrame Swings": false,
        "SS Swings": false,
        "Wooden Swings": false,
        "Designer Swings": false,
    })
    const [priceFilters, setPriceFilters] = useState({
        "₹0 - ₹5000": false,
        "₹5000 - ₹10000": false,
        "₹10000 - ₹15000": false,
        "₹15000+": false,
    })
    const [sortBy, setSortBy] = useState("Sort by: High to Low");
    const filterRef = useRef(null);

    // --- New State for Product Details Overlay ---
    const [selectedProduct, setSelectedProduct] = useState(null);

    // --- Pagination State ---
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8; 

    const toggleCategoryFilter = (category) => {
        setCategoryFilters({
            ...categoryFilters,
            [category]: !categoryFilters[category],
        })
        setCurrentPage(1); 
    }

    const togglePriceFilter = (range) => {
        setPriceFilters({
            ...priceFilters,
            [range]: !priceFilters[range],
        })
        setCurrentPage(1); 
    }

    const clearFilters = () => {
        setCategoryFilters(
            Object.keys(categoryFilters).reduce((acc, key) => {
                acc[key] = false
                return acc
            }, {}),
        )
        setPriceFilters(
            Object.keys(priceFilters).reduce((acc, key) => {
                acc[key] = false
                return acc
            }, {}),
        )
        setCurrentPage(1); 
    }

    // Sample product data with imported images
    const products = [
        {
            id: 1,
            name: "Wooden Swings",
            description:
                "Handcrafted with premium teak wood, this swing offers durability and a timeless aesthetic for your home or garden.",
            price: 10000.0,
            originalPrice: 12000.0,
            image: productImage,
            category: "Indoor & Outdoor"
        },
        {
            id: 2,
            name: "Acrylic Swings",
            description:
                "Modern and stylish, these swings are made from high-quality acrylic and are perfect for contemporary spaces.",
            price: 8500.0,
            originalPrice: 9500.0,
            image: productImage,
            category: "Indoor Modern"
        },
        {
            id: 3,
            name: "Outdoor Swings",
            description:
                "Designed to withstand the elements, these swings are perfect for your patio, deck, or garden. Made with weather-resistant materials.",
            price: 11500.0,
            originalPrice: 13000.0,
            image: productImage,
            category: "Outdoor"
        },
        {
            id: 4,
            name: "Macrame Swings",
            description:
                "Handwoven with soft, durable cotton rope, these swings add a touch of bohemian elegance to any room.",
            price: 6000.0,
            originalPrice: 7500.0,
            image: productImage,
            category: "Bohemian"
        },
        {
            id: 5,
            name: "SS Swings",
            description:
                "Sleek and modern swings made from stainless steel. Durable, rust-resistant, and perfect for indoor or outdoor use.",
            price: 14000.0,
            originalPrice: 16000.0,
            image: productImage,
            category: "Modern Industrial"
        },
        {
            id: 6,
            name: "Single Seats Swings",
            description:
                "Compact and comfortable, these swings are perfect for relaxing in small spaces. Available in a variety of colors.",
            price: 4500.0,
            originalPrice: 5000.0,
            image: productImage,
            category: "Compact & Personal"
        },
        {
            id: 7,
            name: "Luxury Wooden Swing",
            description: "A beautifully crafted wooden swing, a statement piece for grand interiors.",
            price: 18000,
            originalPrice: 20000,
            image: productImage,
            category: "Luxury Wood"
        },
        {
            id: 8,
            name: "Kids Outdoor Swing",
            description: "A safe and fun swing designed specifically for children's outdoor play.",
            price: 3000,
            originalPrice: 3500,
            image: productImage,
            category: "Kids Outdoor"
        },
        {
            id: 9,
            name: "Classic Wooden Swing",
            description: "Timeless design, perfect for any traditional home setting.",
            price: 9000,
            originalPrice: 10000,
            image: productImage,
            category: "Classic Wood"
        },
        {
            id: 10,
            name: "Modern Acrylic Swivel",
            description: "A contemporary swivel chair made from clear acrylic, ideal for modern decor.",
            price: 9800,
            originalPrice: 11000,
            image: productImage,
            category: "Acrylic"
        },
        {
            id: 11,
            name: "Garden Hammock Swing",
            description: "Relax in your garden with this comfortable hammock swing, perfect for leisure.",
            price: 7000,
            originalPrice: 8000,
            image: productImage,
            category: "Outdoor Relax"
        },
        {
            id: 12,
            name: "Boho Macrame Chair",
            description: "Artistic macrame chair, a cozy addition to your living space with a bohemian vibe.",
            price: 6500,
            originalPrice: 7000,
            image: productImage,
            category: "Bohemian"
        },
        {
            id: 13,
            name: "Industrial SS Swing",
            description: "Robust stainless steel swing with an industrial look, suitable for modern lofts.",
            price: 15500,
            originalPrice: 17000,
            image: productImage,
            category: "Modern Industrial"
        },
        {
            id: 14,
            name: "Compact Balcony Swing",
            description: "Ideal for small balconies, provides a comfortable seating option without taking much space.",
            price: 4000,
            originalPrice: 4800,
            image: productImage,
            category: "Compact & Personal"
        },
    ];


    // Function to handle heart button click
    const handleHeartClick = (e, productId) => {
        e.stopPropagation() 
        console.log(`Added product ${productId} to wishlist`)
        
    }

    // Function to handle cart button click
    const handleCartClick = (e, productId) => {
        e.stopPropagation() 
        console.log(`Added product ${productId} to cart`)
        
    }

    // Function to handle product click - opens the detail overlay
    const handleProductClick = (product) => {
        console.log(`Opening details for product ${product.id}`);
        setSelectedProduct(product);
    }

    // Function to close the product detail overlay
    const closeProductDetail = () => {
        setSelectedProduct(null);
    }

    // Function to handle "Order Now" from the detail overlay
    const handleOrderNow = (productId) => {
        console.log(`Ordering product ${productId} now!`);
       
        alert(`Initiating order for product ID: ${productId}`);
        closeProductDetail();
    };

    // Filter products based on selected filters
    const filteredProducts = products.filter(product => {
        let categoryMatch = true;
        let priceMatch = true;

        // Category filter
        const activeCategories = Object.keys(categoryFilters).filter(key => categoryFilters[key]);
        if (activeCategories.length > 0) {
            categoryMatch = false; // Assume no match until one is found
            for (const category of activeCategories) {
                const categoryName = category.replace(/ Swings$/, '');
                if (product.name.includes(categoryName) || product.category.includes(categoryName)) { 
                    categoryMatch = true;
                    break;
                }
            }
        }

        // Price filter
        const activePriceRanges = Object.keys(priceFilters).filter(key => priceFilters[key]);
        if (activePriceRanges.length > 0) {
            priceMatch = false; 
            for (const range of activePriceRanges) {
                const [minStr, maxStr] = range.replace(/[₹+]/g, "").split(" - ");
                const min = parseInt(minStr);
                const max = maxStr ? parseInt(maxStr) : Infinity;
                if (product.price >= min && product.price <= max) {
                    priceMatch = true;
                    break;
                }
            }
        }

        return categoryMatch && priceMatch;
    });


    // Sort the filtered products
    let sortedProducts = [...filteredProducts];
    if (sortBy === "Sort by: High to Low") {
        sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "Sort by: Low to High") {
        sortedProducts.sort((a, b) => a.price - b.price);
    }
    else if (sortBy === "Sort by: Newest") {
       
    } else if (sortBy === "Sort by: Popular") {
        
    }


    // --- Pagination Logic ---
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Close filters when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilters(false);
            }
        };
        if (showFilters) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showFilters]);

    return (
        <div className="bg-amber-50 min-h-screen px-4 py-8 md:px-8 lg:px-16 relative">

            {/* Product Detail Overlay (Modal) */}
            <AnimatePresence>
                {selectedProduct && (
                    <ProductDetailOverlay
                        product={selectedProduct}
                        onClose={closeProductDetail}
                        onAddToCart={handleCartClick}
                        onAddToWishlist={handleHeartClick}
                        onOrderNow={handleOrderNow}
                    />
                )}
            </AnimatePresence>

            {/* Main content wrapper - apply blur when overlay is open */}
            <div className={`${selectedProduct ? "blur-sm pointer-events-none" : ""} transition-filter duration-300`}>
                {/* Page Title */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={fadeInVariants.transition}
                    className="text-center py-4"
                >
                    <h1 className="text-2xl pt-10 font-la-mango ">All Products</h1>
                    <p className="text-sm text-gray-500 pt-3">Home / All Products</p>
                </motion.div>

                {/* Filter and Sort Bar */}
                <div className="flex justify-between items-center px-6 py-3">
                    <AnimatedButton
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 bg-[#2a2e0f] text-white px-4 py-2 rounded hover:bg-[#3a3e1f] transition-colors"
                    >
                        <FiFilter className="w-4 h-4" />
                        <span>Filter</span>
                    </AnimatedButton>

                    <AnimatedDropdown
                        selectedValue={sortBy}
                        onSelect={setSortBy}
                        className="w-56"
                    >
                        <option value="Sort by: High to Low">Sort by: High to Low</option>
                        <option value="Sort by: Low to High">Sort by: Low to High</option>
                        <option value="Sort by: Newest">Sort by: Newest</option>
                        <option value="Sort by: Popular">Sort by: Popular</option>
                    </AnimatedDropdown>
                </div>

                <div className="flex flex-col md:flex-row">
                    {/* Filter Sidebar */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                ref={filterRef}
                                variants={filterSidebarVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                                className="w-full md:w-64 bg-white p-4 border-r border-gray-200 rounded-2xl h-fit md:h-120 absolute md:relative z-20"
                            >
                                <div className="mb-6">
                                    <h3 className="font-semibold mb-3 text-gray-800">Shop By Category</h3>
                                    {Object.keys(categoryFilters).map((category) => (
                                        <AnimatedCheckbox // Use AnimatedCheckbox
                                            key={category}
                                            id={category}
                                            label={category}
                                            checked={categoryFilters[category]}
                                            onChange={() => toggleCategoryFilter(category)}
                                            className="mb-2"
                                        />
                                    ))}
                                </div>

                                {/* Price Filter */}
                                <div className="mb-6">
                                    <h3 className="font-semibold mb-3 text-gray-800">Shop By Price</h3>
                                    {Object.keys(priceFilters).map((range) => (
                                        <AnimatedCheckbox
                                            key={range}
                                            id={range}
                                            label={range}
                                            checked={priceFilters[range]}
                                            onChange={() => togglePriceFilter(range)}
                                            className="mb-2"
                                        />
                                    ))}
                                </div>

                                {/* Filter Buttons */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={clearFilters}
                                        className="flex-1 border border-gray-300 rounded py-2 text-sm hover:bg-gray-50 transition-colors text-gray-700"
                                    >
                                        Clear
                                    </button>
                                    <button
                                        onClick={() => setShowFilters(false)}
                                        className="flex-1 bg-[#2a2e0f] text-white rounded py-2 text-sm hover:bg-[#3a3e1f] transition-colors">
                                        Apply
                                    </button>
                                </div>
                                <button
                                    onClick={() => setShowFilters(false)}
                                    className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white/90 text-gray-700"
                                >
                                    <FiX size={20} />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Product Grid - Conditionally change grid columns based on filter visibility */}
                    <div className={`flex-1 p-4 pb-60 ${showFilters ? "md:pl-2" : "px-4"}`}>
                        <motion.div
                            className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto ${showFilters
                                ? "lg:grid-cols-3 max-w-6xl"
                                : "lg:grid-cols-4 max-w-7xl"
                                }`}
                            initial="hidden"
                            animate="visible"
                        >
                            {currentProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    variants={productCardVariants}
                                    custom={index}
                                    exit="exit"
                                    className="pl-2 pt-2 pr-2 rounded-4xl border overflow-hidden bg-white shadow-sm transition-all duration-300 text-left group hover:bg-black hover:text-white cursor-pointer"
                                    onClick={() => handleProductClick(product)} 
                                >
                                    {/* Image and Hover Icons */}
                                    <div className="relative">
                                        {/* Action buttons - visible on hover with their own hover effects */}
                                        <div className="absolute top-2 right-2 z-10 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="flex items-center justify-center bg-amber-50 p-2 rounded-full hover:bg-amber-100 transition-colors"
                                                onClick={(e) => handleCartClick(e, product.id)}
                                            >
                                                <ShoppingCart className="w-5 h-5 text-black" />
                                                <span className="sr-only">Add to cart</span>
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="flex items-center justify-center bg-amber-50 p-2 rounded-full shadow-md hover:bg-amber-100 transition-colors"
                                                onClick={(e) => handleHeartClick(e, product.id)}
                                            >
                                                <Heart className="w-5 h-5 text-black" />
                                                <span className="sr-only">Add to Wishlist</span>
                                            </motion.button>
                                        </div>

                                        <img
                                            src={product.image || "/placeholder.svg"}
                                            alt={product.name}
                                            className="w-full h-64 object-cover transition-opacity duration-300 group-hover:opacity-80 rounded-4xl"
                                            onError={(e) => {
                                                e.target.onerror = null
                                                e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found"
                                            }}
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-4 text-left">
                                        <h3 className="font-medium text-lg group-hover:text-white">{product.name}</h3>
                                        <p className="text-sm text-gray-600 mt-1 group-hover:text-gray-300 line-clamp-2">
                                            {product.description}
                                        </p>

                                        <div className="mt-4 flex items-center">
                                            <span className="text-lg font-bold group-hover:text-white">₹{product.price.toFixed(2)}</span>
                                            {product.originalPrice && (
                                                <span className="ml-2 text-sm text-gray-500 line-through group-hover:text-gray-400">
                                                    ₹{product.originalPrice.toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* --- Pagination Controls --- */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center mt-8 space-x-2">
                                <motion.button
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    className={`px-6 py-3 rounded-lg transition ${
                                        currentPage === 1 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-[#2a2e0f] text-white hover:bg-[#1d210d]"
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FiChevronLeft className="inline-block mr-1" /> Previous
                                </motion.button>

                                <motion.button
                                    onClick={nextPage}
                                    disabled={currentPage === totalPages}
                                    className={`px-6 py-3 rounded-lg transition ${
                                        currentPage === totalPages ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-[#2a2e0f] text-white hover:bg-[#1d210d]"
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Next <FiChevronRight className="inline-block ml-1" />
                                </motion.button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

