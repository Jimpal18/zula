
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom" 
import pic1 from "../assets/pic1.jpg" 
import pic2 from "../assets/pic2.jpg"

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: pic1,
      price: 120.0,
      quantity: 1,
    },
    {
      id: 2,
      image: pic2,
      price: 180.0,
      quantity: 1,
    },
    {
      id: 3, 
      image: pic2,
      price: 180.0,
      quantity: 1,
    },
  ])

  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shipping: 20.0,
    tax: 20.0,
    total: 0,
  })

  useEffect(() => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const total = subtotal + orderSummary.shipping + orderSummary.tax
    setOrderSummary((prev) => ({ ...prev, subtotal, total }))
  }, [cartItems, orderSummary.shipping, orderSummary.tax])


const updateQuantity = (id, change) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    )
  )
}

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const currency = (amount) => `₹${amount.toFixed(2)}`

  return (
    <div className="min-h-screen bg-amber-50 text-[#2D3319] font-['Muli'] pt-20 rounded-lg shadow-md">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl pt-15 font-la-mango">cart</h1>
        <p className="text-sm text-gray-500 pt-3 pb-5">Home / Cart</p>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Table */}
          <div className="lg:col-span-2">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-amber-50 ">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-amber-50 divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-30 h-30 object-cover rounded-md mr-4"
                          />
                          <span className="font-medium text-gray-900">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">Swing Description</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-2 py-1 rounded-md border border-black-800 hover:bg-amber-50"
                          >
                            -
                          </motion.button>
                          <span className="mx-2 text-gray-900">{item.quantity}</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-2 py-1 rounded-md border border-black-400 hover:bg-gray-100"
                          >
                            +
                          </motion.button>
                        </div>
                      </td>
                     <td className="px-6 py-4 whitespace-nowrap text-gray-900">{currency(item.price)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                          {currency(item.price * item.quantity)}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg
                            width="25"
                            height="25"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </motion.button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8">
              <a href="/products" className="inline-flex items-center text-gray-700 hover:text-amber-600">
                <svg
                  width="20"
                  height="20"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="mr-2"
                >
                  <path d="M19 11H5m6-6l-6 6 6 6m7 4v-8a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v8m6-4h4" />
                </svg>
                Continue Shopping
              </a>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-amber-50 border-b-gray-400 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="text-gray-900">{currency(orderSummary.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Shipping</span>
                  <span className="text-gray-900">{currency(orderSummary.shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Tax</span>
                  <span className="text-gray-900">{currency(orderSummary.tax)}</span>
                </div>
                <div className="border-t border-gray-400 pt-3 flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-gray-900">{currency(orderSummary.total)}</span>
                </div>
              </div>

              {/* Updated Checkout Button with Link */}
              <Link to="/checkout">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-full bg-[#2D3319] text-white py-3 rounded-md hover:bg-opacity-90 transition-colors duration-200"
                >
                  Proceed to Checkout
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
