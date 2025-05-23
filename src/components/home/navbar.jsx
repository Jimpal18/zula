// "use client"

// import React, { useState, useEffect, useRef } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Link } from "react-router-dom"
// import { MenuIcon, XIcon } from "@heroicons/react/outline"
// import { FaSearch } from "react-icons/fa"
// import { FiShoppingCart, FiHeart, FiUser } from "react-icons/fi"
// import logo from "../../assets/logo.png"

// function Navbar() {
//   const [nav, setNav] = useState(false)
//   const [isLargeScreen, setIsLargeScreen] = useState(false)
//   const containerRef = useRef(null)

//   const handleClick = () => setNav(!nav)
//   const handleClose = () => setNav(false)

//   const scrollToTop = () => {
//     setNav(false) 
//     setTimeout(() => {
//       window.scrollTo({ top: 0, behavior: "smooth" })
//     }, 100) 
//   }

//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsLargeScreen(window.innerWidth >= 768)
//     }

//     checkScreenSize()
//     window.addEventListener("resize", checkScreenSize)

//     return () => {
//       window.removeEventListener("resize", checkScreenSize)
//     }
//   }, [])

//   const routes = {
//     Home: "/home",
//     "All Product": "/products",
//     "Shop by Categories": "/categories",
//     "New Product": "/newproducts",
//     "Our Story": "/ourstory",
//     Contact: "/contact"
//   }

//   const navItemVariants = {
//     hidden: { opacity: 0, y: -10 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: i * 0.1, duration: 0.6, ease: "easeInOut" }
//     }),
//     exit: { opacity: 0, y: 10 }
//   }

//   const iconVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeInOut" } },
//     hover: {
//       scale: 1.1,
//       backgroundColor: "#000000",
//       borderColor: "#000000",
//       color: "#fff",
//       transition: { duration: 0.2 }
//     }
//   }

//   const logoVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeInOut" } },
//     hover: { scale: 1.1, transition: { duration: 0.3, yoyo: Infinity } }
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8, ease: "easeInOut" }}
//       className="w-full fixed top-0 left-0 bg-amber-50 z-50 shadow-md"
//     >
//       <div className="px-4 max-w-screen-xl mx-auto flex items-center justify-between h-[70px]" ref={containerRef}>
//         {/* LOGO */}
//         <motion.div variants={logoVariants} initial="hidden" animate="visible" whileHover="hover">
//           <Link to="/home" onClick={scrollToTop}>
//             <img src={logo || "/placeholder.svg"} alt="Logo" className="h-25 w-auto object-contain" />
//           </Link>
//         </motion.div>

//         {/* DESKTOP MENU */}
//         <motion.ul className="hidden md:flex gap-6 text-black font-normal text-sm" initial="hidden" animate="visible">
//           {Object.entries(routes).map(([item, path], index) => (
//             <motion.li
//               key={item}
//               variants={navItemVariants}
//               custom={index}
//               whileHover={{ scale: 1.1, color: "#f59e0b" }}
//             >
//               <Link to={path} onClick={scrollToTop} className="hover:text-amber-600">
//                 {item}
//               </Link>
//             </motion.li>
//           ))}
//         </motion.ul>

//         {/* RIGHT ICONS */}
//         <div className="flex items-center gap-2 sm:gap-3 md:gap-4 bg-amber-50 p-2 rounded-full">
//           {/* Cart */}
//           <motion.div
//             variants={iconVariants}
//             initial="hidden"
//             animate="visible"
//             whileHover="hover"
//             className="p-2 rounded-full bg-amber-50 border  flex items-center justify-center transition-all duration-200"
//           >
//             <Link to="/addcart" onClick={scrollToTop} className="text-black hover:text-amber-200">
//               <FiShoppingCart className="w-5 h-5" />
//             </Link>
//           </motion.div>

//           {/* Wishlist */}
//           <motion.div
//             variants={iconVariants}
//             initial="hidden"
//             animate="visible"
//             whileHover="hover"
//             className="p-2 rounded-full bg-amber-50 border  flex items-center justify-center transition-all duration-200"
//           >
//             <Link to="/whilist" onClick={scrollToTop} className="text-black hover:text-amber-200">
//               <FiHeart className="w-5 h-5" />
//             </Link>
//           </motion.div>

//           {/* Profile */}
//           <motion.div
//             variants={iconVariants}
//             initial="hidden"
//             animate="visible"
//             whileHover="hover"
//             className="p-2 rounded-full bg-amber-50 border  flex items-center justify-center transition-all duration-200"
//           >
//             <Link to="/profile" onClick={scrollToTop} className="text-black hover:text-amber-200">
//               <FiUser className="w-5 h-5" />
//             </Link>
//           </motion.div>

//           {/* Login */}
//           <motion.div
//             whileHover={{ scale: 1.1, color: "white" }}
//             transition={{ type: "spring", stiffness: 400, damping: 17 }}
//           >
//             <Link to="/login" onClick={scrollToTop} className="text-black hover:text-amber-200 px-2 py-1 border rounded-xl hover:bg-black">
//               Login
//             </Link>
//           </motion.div>

//           {/* MOBILE MENU ICON */}
//           <div onClick={handleClick} className="md:hidden cursor-pointer">
//             {nav ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
//           </div>
//         </div>
//       </div>

//       {/* MOBILE DROPDOWN */}
//       <AnimatePresence>
//         {nav && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//             className="md:hidden bg-amber-50 w-full px-4 pb-4 overflow-hidden"
//           >
//             {/* Optional Search Bar */}
//             <div className="py-3 flex justify-center">
//               <div className="relative w-full max-w-[660px]">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="w-full p-2 pr-10 rounded-3xl bg-black text-white placeholder-white focus:outline-none"
//                 />
//                 <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white w-4 h-4" />
//               </div>
//             </div>

//             {/* MOBILE MENU ITEMS */}
//             <ul className="flex flex-col space-y-3 text-black font-bold">
//               {Object.entries(routes).map(([item, path]) => (
//                 <li key={item}>
//                   <Link to={path} onClick={scrollToTop}>
//                     {item}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   )
// }

// export default Navbar


// "use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import { FaSearch } from "react-icons/fa"
import { FiShoppingCart, FiHeart, FiUser } from "react-icons/fi"
import logo from "../../assets/logo.png"

function Navbar() {
  const [nav, setNav] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const containerRef = useRef(null)

  const handleClick = () => setNav(!nav)
  const handleClose = () => setNav(false)

  // Scroll to top and close mobile nav smoothly
  const scrollToTop = () => {
    setNav(false) // Close mobile menu first
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 100) // Delay so menu close animation works before scroll
  }

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  const routes = {
    Home: "/home",
    "All Product": "/products",
    "Shop by Categories": "/categories",
    "New Product": "/newproducts",
    "Our Story": "/ourstory",
    Contact: "/contact"
  }

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeInOut" }
    }),
    exit: { opacity: 0, y: 10 }
  }

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeInOut" } },
    hover: {
      scale: 1.1,
      backgroundColor: "#000000",
      borderColor: "#000000",
      color: "#fff",
      transition: { duration: 0.2 }
    }
  }

  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeInOut" } },
    hover: { scale: 1.1, transition: { duration: 0.3, yoyo: Infinity } }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      // Removed 'fixed', 'top-0', and 'left-0' classes
      className="w-full bg-amber-50 z-50 shadow-md pt-3"
    >
      <div className="px-4 max-w-screen-xl mx-auto flex items-center justify-between h-[70px]" ref={containerRef}>
        {/* LOGO */}
        <motion.div variants={logoVariants} initial="hidden" animate="visible" whileHover="hover">
          <Link to="/home" onClick={scrollToTop}>
            <img src={logo} alt="Logo" className="h-25 w-auto object-contain" />
          </Link>
        </motion.div>

        {/* DESKTOP MENU */}
        <motion.ul className="hidden md:flex gap-6 text-black font-normal text-sm" initial="hidden" animate="visible">
          {Object.entries(routes).map(([item, path], index) => (
            <motion.li
              key={item}
              variants={navItemVariants}
              custom={index}
              whileHover={{ scale: 1.1, color: "#f59e0b" }}
            >
              <Link to={path} onClick={scrollToTop} className="hover:text-amber-600">
                {item}
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 bg-amber-50 p-2 rounded-full">
          {/* Cart */}
          <motion.div
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="p-2 rounded-full bg-amber-50 border flex items-center justify-center transition-all duration-200"
          >
            <Link to="/addcart" onClick={scrollToTop} className="text-black hover:text-amber-200">
              <FiShoppingCart className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Wishlist */}
          <motion.div
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="p-2 rounded-full bg-amber-50 border flex items-center justify-center transition-all duration-200"
          >
            <Link to="/whilist" onClick={scrollToTop} className="text-black hover:text-amber-200">
              <FiHeart className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Profile */}
          <motion.div
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="p-2 rounded-full bg-amber-50 border flex items-center justify-center transition-all duration-200"
          >
            <Link to="/profile" onClick={scrollToTop} className="text-black hover:text-amber-200">
              <FiUser className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Login */}
          <motion.div
            whileHover={{ scale: 1.1, color: "white" }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link to="/login" onClick={scrollToTop} className="text-black hover:text-amber-200 px-2 py-1 border rounded-xl hover:bg-black">
              Login
            </Link>
          </motion.div>

          {/* MOBILE MENU ICON */}
          <div onClick={handleClick} className="md:hidden cursor-pointer">
            {nav ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {nav && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-amber-50 w-full px-4 pb-4 overflow-hidden"
          >
            {/* Optional Search Bar */}
            <div className="py-3 flex justify-center">
              <div className="relative w-full max-w-[660px]">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full p-2 pr-10 rounded-3xl bg-black text-white placeholder-white focus:outline-none"
                />
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white w-4 h-4" />
              </div>
            </div>

            {/* MOBILE MENU ITEMS */}
            <ul className="flex flex-col space-y-3 text-black font-bold">
              {Object.entries(routes).map(([item, path]) => (
                <li key={item}>
                  <Link to={path} onClick={scrollToTop}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Navbar