// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import Navbar from "./components/home/navbar"
// import Home from "./pages/home"
// import Product from "./pages/products"
// import Category from "./pages/categories"
// import Newproduct from "./pages/newproducts"
// import OurStory from "./pages/ourstory"
// import Contact from "./pages/contact"
// import Footer from "./components/home/footer"
// import ShoppingCart from "./pages/addcart"
// import CheckoutPage from "./pages/checkout"
// import WishlistPage from "./pages/whilist"
// import UserProfile from "./pages/profile"
// import LoginPage from "./pages/login"
// import SignPage from "./pages/signup"
// import WhatsAppButton from "./pages/whatsapp"
// import "./App.css"

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Navbar />

//         <main>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/home" element={<Home />} />
//             <Route path="/products" element={<Product />} />
//             <Route path="/categories" element={<Category />} />
//             <Route path="/newproducts" element={<Newproduct />} />
//             <Route path="/ourstory" element={<OurStory />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/addcart" element={<ShoppingCart />} />
//             <Route path="/checkout" element={<CheckoutPage />} />
//             <Route path="/whilist" element={<WishlistPage />} />
//             <Route path="/profile" element={<UserProfile />} />
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/signup" element={<SignPage />} />
            

//             {/* Add more routes as needed */}
//           </Routes>
//         </main>

//         <Footer />
//         <WhatsAppButton />
//       </div>
//     </Router>
//   )
// }

// export default App



import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Navbar from "./components/home/navbar"
import Home from "./pages/home"
import Product from "./pages/products"
import Category from "./pages/categories"
import Newproduct from "./pages/newproducts"
import OurStory from "./pages/ourstory"
import Contact from "./pages/contact"
import Footer from "./components/home/footer"
import ShoppingCart from "./pages/addcart"
import CheckoutPage from "./pages/checkout"
import WishlistPage from "./pages/whilist"
import UserProfile from "./pages/profile"
import LoginPage from "./pages/login"
import SignPage from "./pages/signup"
import WhatsAppButton from "./pages/whatsapp"
import CategoryPage2 from "./components/categories/page2"
import CategoryPage3 from "./components/categories/page3"
import ForgotPasswordPage from "./pages/forgot"
// import OrderConfirmationPage from "./pages/profile2"
import "./App.css"

function AppContent() {
  const location = useLocation()

  // Paths where Navbar and Footer should NOT appear
  const hideHeaderFooterPaths = ["/login", "/signup"]

  const shouldHideHeaderFooter = hideHeaderFooterPaths.includes(location.pathname)

  return (
    <div className="App">
      {!shouldHideHeaderFooter && <Navbar />}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/newproducts" element={<Newproduct />} />
          <Route path="/ourstory" element={<OurStory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/addcart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/whilist" element={<WishlistPage />} />
          <Route path="/profile" element={<UserProfile />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignPage />} />
          <Route path="/categories/page2" element={<CategoryPage2 />} />
          <Route path="/categories/page3" element={<CategoryPage3 />} />
          <Route path="/forgot" element={<ForgotPasswordPage/>}/>

          
          {/* <Route path="/profile2" element={<OrderConfirmationPage />} /> */}

         
          
          {/* Add more routes as needed */}
        </Routes>
      </main>

      {!shouldHideHeaderFooter && <Footer />}
      {!shouldHideHeaderFooter && <WhatsAppButton />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
