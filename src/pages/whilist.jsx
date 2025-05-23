import React from 'react';
import { Link } from 'react-router-dom';
import {  FaTrashAlt } from 'react-icons/fa';
// import { HiOutlineMenu } from 'react-icons/hi';

import acrylicBubbleSwing1 from '../assets/pic2.jpg';
import acrylicBubbleSwing2 from '../assets/pic1.jpg';

const WishlistPage = () => {
  const wishlistItems = [
    {
      id: 1,
      image: acrylicBubbleSwing1,
      description: 'Acrylic Bubble Swing',
      price: '₹120.00',
    },
    {
      id: 2,
      image: acrylicBubbleSwing2,
      description: 'Acrylic Bubble Swing',
      price: '₹120.00',
    },
  ];

  return (
    <div className="bg-amber-50 pt-20 min-h-screen px-4 py-8 md:px-8 lg:px-16 pb-10 ">
     
      {/* Wishlist Content */}
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl pt-15 font-la-mango">Wishlist</h1>
          <p className="text-sm text-gray-500 pt-3 pb-15">Home / Wishlist</p>
        </div>
        {/* Wishlist Items Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-amber-50 ">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-amber-50 divide-y divide-gray-300 ">
              {wishlistItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-25 w-25 flex-shrink-0">
                        <img className="h-full w-full object-cover rounded" src={item.image} alt={item.description} />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm text-gray-900">{item.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link to="/addcart" className="bg-black hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded text-sm">
                        Add To Cart
                      </Link>
                      <button className="text-gray-500 hover:text-red-500">
                        <FaTrashAlt className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Continue Shopping Button */}
        <div className="mt-6">
          <Link to="/products" className="inline-flex items-center px-4 py-2 border border-gray-400 shadow-sm text-sm font-medium rounded text-gray-700 bg-amber-50 hover:bg-gray-50">
            <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
