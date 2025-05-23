"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

// Import sample product images for testing
import pic1 from "../assets/pic1.jpg" 
import pic2 from "../assets/pic2.jpg" 

const CheckoutPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // Get cart items from localStorage or navigation state
  const [cartItems, setCartItems] = useState(() => {
    const sampleItems = [
      {
        id: 1,
        name: "Acrylic Bubble Swing",
        image: pic1,
        price: 120,
        quantity: 1,
      },
      {
        id: 2,
        name: "Acrylic Bubble Swing",
        image: pic2,
        price: 120,
        quantity: 1,
      },
    ]

    // First try to get cart items from navigation state (if coming from cart page)
    if (location.state && location.state.cartItems && location.state.cartItems.length > 0) {
      console.log("Using cart items from navigation state:", location.state.cartItems)
      return location.state.cartItems
    }

    // Otherwise try to get from localStorage
    try {
      const savedCart = localStorage.getItem("cartItems")
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        console.log("Using cart items from localStorage:", parsedCart)
        return parsedCart.length > 0 ? parsedCart : sampleItems
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error)
    }

    // Return sample items if nothing else is available
    console.log("Using sample cart items")
    return sampleItems
  })

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    paymentMethod: "creditCard",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  })

  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shipping: 20.0,
    tax: 25.0,
    total: 0,
  })

  useEffect(() => {
    // Calculate subtotal
    const calculatedSubtotal = cartItems.reduce((acc, item) => {
      // Handle both qty and quantity property names
      const quantity = item.qty || item.quantity || 0
      return acc + item.price * quantity
    }, 0)
    const calculatedTotal = calculatedSubtotal + orderSummary.shipping + orderSummary.tax

    setOrderSummary((prev) => ({
      ...prev,
      subtotal: calculatedSubtotal,
      total: calculatedTotal,
    }))
  }, [cartItems, orderSummary.shipping, orderSummary.tax])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentMethodChange = (method) => {
    setFormData({ ...formData, paymentMethod: method })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Order details:", { formData, cartItems, orderSummary })

    // Clear cart after successful order
    localStorage.removeItem("cartItems")

    // Navigate to order confirmation page
    navigate("/order-confirmation", {
      state: {
        orderDetails: {
          formData,
          cartItems,
          orderSummary,
          orderId: `ORD-${Math.floor(Math.random() * 1000000)}`,
        },
      },
    })
  }

  const currency = (amount) => `₹${amount.toFixed(2)}`

  return (
    <div className="bg-amber-50 pt-20 min-h-screen px-4 py-8 md:px-8 lg:px-16 pb-60">
      <div className="max-w-5xl mx-auto">
         <div className="text-center mb-8">
          <h1 className="text-2xl pt-15 font-la-mango">Check Out</h1>
          <p className="text-sm text-gray-500 pt-3 pb-15">Home /Check Out</p>
        </div>


        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to your cart before checking out.</p>
            <button
              onClick={() => navigate("/products")}
              className="px-6 py-2 bg-[#1c2c1a] text-white rounded-md hover:bg-opacity-90 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Contact and Shipping Information */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <div>
                <h2 className=" font-normal text-xl text-gray-900 mb-8">Contact Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-normal text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-normal text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-normal text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-normal text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="font-normal text-xl text-gray-900 mb-8">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-normal text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="apartment" className="block text-sm font-normal text-gray-700 mb-1">
                      Apartment, suite, etc. (optional)
                    </label>
                    <input
                      type="text"
                      id="apartment"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleChange}
                      placeholder="Apartment, suite, etc."
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-normal text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter your City"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-normal text-gray-700 mb-1">
                        State
                      </label>
                      <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none bg-yellow-50"
                        required
                      >
                        <option value="">Select State</option>
                        <option value="gujarat">Gujarat</option>
                        <option value="maharashtra">Maharashtra</option>
                        <option value="rajasthan">Rajasthan</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="zip" className="block text-sm font-normal text-gray-700 mb-1">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        placeholder="Enter ZIP Code"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="font-normal text-xl text-gray-900 mb-8">Payment Method</h2>
                <div className="space-y-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="creditCard"
                      checked={formData.paymentMethod === "creditCard"}
                      onChange={() => handlePaymentMethodChange("creditCard")}
                      className="h-4 w-4 text-[#1c2c1a] focus:ring-[#1c2c1a] border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Credit/Debit Card</span>
                  </label>

                  {formData.paymentMethod === "creditCard" && (
                    <div className="pl-7 space-y-4">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-normal text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="number"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="0000 0000 0000 0000"
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                          required={formData.paymentMethod === "creditCard"}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4  ">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-normal text-gray-700 mb-1 ">
                            Expiry Date
                          </label>
                          <input
                            type="date"
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            placeholder="MM / YY"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                            required={formData.paymentMethod === "creditCard"}
                          />
                        </div>
                        <div>
                          <label htmlFor="cvc" className="block text-sm font-normal text-gray-700 mb-1">
                            CVC
                          </label>
                          <input
                            type="text"
                            id="cvc"
                            name="cvc"
                            value={formData.cvc}
                            onChange={handleChange}
                            placeholder="CVC"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                            required={formData.paymentMethod === "creditCard"}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="onlinePayment"
                      checked={formData.paymentMethod === "onlinePayment"}
                      onChange={() => handlePaymentMethodChange("onlinePayment")}
                      className="h-4 w-4 text-[#1c2c1a] focus:ring-[#1c2c1a] border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Online payment</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cashOnDelivery"
                      checked={formData.paymentMethod === "cashOnDelivery"}
                      onChange={() => handlePaymentMethodChange("cashOnDelivery")}
                      className="h-4 w-4 text-[#1c2c1a] focus:ring-[#1c2c1a] border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Cash on delivery</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-amber-50 rounded-lg p-6 border border-gray-200">
                <h2 className="font-normal text-xl text-gray-900 mb-8">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-start justify-between pb-4">
                      <div className="flex items-start">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded mr-3"
                        />
                        <div>
                          <p className="text-sm font-normal text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.qty || item.quantity}</p>
                        </div>
                      </div>
                      <span className="text-sm font-normal text-gray-900">{currency(item.price)}</span>
                    </div>
                  ))}

                  <div className="pt-4 space-y-2 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Subtotal</span>
                      <span className="text-sm text-gray-900">{currency(orderSummary.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Shipping</span>
                      <span className="text-sm text-gray-900">{currency(orderSummary.shipping)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tax</span>
                      <span className="text-sm text-gray-900">{currency(orderSummary.tax)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="text-sm font-medium text-gray-900">Total</span>
                      <span className="text-sm font-medium text-gray-900">{currency(orderSummary.total)}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-[#1c2c1a] text-white text-sm rounded-md hover:bg-opacity-90 transition-colors"
                >
                  Place Order
                </button>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default CheckoutPage
