"use client"

import { useState } from "react"
import { Heart, ShoppingCart, ChevronDown, Check } from 'lucide-react'
import { Link } from "react-router-dom"
import productImage1 from "../../assets/pic1.jpg"
import productImage2 from "../../assets/pic2.jpg"
import productImage3 from "../../assets/pic3.jpg"
import productImage4 from "../../assets/pic4.jpg"
import productImage5 from "../../assets/pic5.jpg"
import { motion } from "framer-motion"

export default function CategoryPage3() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false)
  const [selectedSort, setSelectedSort] = useState("High to Low")

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
    {
      id: 1,
      name: "Classic Wooden Swing",
      description: "Crafted with high-quality teak wood, suitable for patios.",
      price: 12000,
      originalPrice: 15000,
      image: productImage1,
      category: "Wooden Swings"
    },
    {
      id: 2,
      name: "Modern Acrylic Swing",
      description: "A transparent swing seat for modern interiors.",
      price: 8500,
      originalPrice: 10000,
      image: productImage2,
      category: "Acrylic Swings"
    },
    {
      id: 3,
      name: "Macrame Hanging Chair",
      description: "Bohemian style handmade macrame swing for relaxation.",
      price: 7000,
      originalPrice: 9500,
      image: productImage3,
      category: "Macrame Swings"
    },
    {
      id: 4,
      name: "Outdoor Garden Swing",
      description: "Perfect for gardens with weather-resistant material.",
      price: 10000,
      originalPrice: 13000,
      image: productImage4,
      category: "Outdoor Swings"
    },
    {
      id: 5,
      name: "Stainless Steel Swing",
      description: "Elegant stainless steel design, strong and durable.",
      price: 11000,
      originalPrice: 14000,
      image: productImage5,
      category: "SS Swings"
    },
  ]

  const filteredProducts = activeCategory === "All"
    ? products
    : products.filter(p => p.category === activeCategory)

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (selectedSort === "High to Low") return b.price - a.price
    if (selectedSort === "Low to High") return a.price - b.price
    return 0
  })

  const handleSortSelect = (option) => {
    setSelectedSort(option)
    setSortDropdownOpen(false)
  }

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const productCardVariant = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.4, 0, 0.2, 1] 
      } 
    }
  }

  return (
    <div className="bg-amber-50 pt-20 min-h-screen px-4 py-8 md:px-8 lg:px-16">
      <div className="text-center mb-8">
        <h1 className="text-2xl pt-15 font-la-mango">Shop By Categories3</h1>
        <p className="text-sm text-gray-500 pt-3 pb-8">Home / Shop By Categories3</p>
      </div>

      {/* Category Buttons & Sort */}
      <div className="flex flex-wrap justify-between items-center mb-8">
        <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm rounded-md border transition-colors ${
                activeCategory === category
                  ? "bg-[#2a2e0f] text-white border-[#2a2e0f]"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
          >
            <span>Sort By: {selectedSort}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          {sortDropdownOpen && (
            <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <ul className="py-1">
                {sortOptions.map((option) => (
                  <li key={option}>
                    <button
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => handleSortSelect(option)}
                    >
                      <span className="flex-grow">{option}</span>
                      {selectedSort === option && <Check className="w-4 h-4 text-[#2a2e0f]" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10"
      >
        {sortedProducts.map((product) => (
          <motion.div
            key={product.id}
            variants={productCardVariant}
            className="p-2 rounded-4xl border bg-white shadow-sm group hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
          >
            <div className="relative">
              <div className="absolute top-2 right-2 z-10 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-amber-50 p-2 rounded-full hover:bg-amber-100">
                  <Heart className="w-5 h-5 text-black" />
                </button>
                <button className="bg-amber-50 p-2 rounded-full hover:bg-amber-100">
                  <ShoppingCart className="w-5 h-5 text-black" />
                </button>
              </div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-4xl"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg">{product.name}</h3>
              <p className="text-sm text-gray-600 group-hover:text-gray-300 mt-1 line-clamp-2">{product.description}</p>
              <div className="mt-4 flex items-center">
                <span className="text-lg font-bold">₹{product.price.toFixed(2)}</span>
                <span className="ml-2 text-sm line-through text-gray-500 group-hover:text-gray-400">
                  ₹{product.originalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Next Page Button */}
      <div className="text-center mt-10">
        <Link
          to="/categories/page2"
          onClick={() => window.scrollTo(0, 0)}
          className="inline-block px-6 py-3 bg-[#2a2e0f] text-white rounded-lg hover:bg-[#1d210d] transition"
        >
          ← Previous Page
        </Link>
      </div>
    </div>
  )
}
