import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

import truckImg from '../../assets/truck.png';
import awardImg from '../../assets/quality.png';
import messageImg from '../../assets/online.png';
import cardImg from '../../assets/payment.png';

export default function FeaturesSection() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = [
    {
      icon: <img src={truckImg} alt="Truck" className="w-16 h-16 md:w-20 md:h-20 rounded-3xl object-cover" />,
      title: "PAN India Delivery",
      description: "Get your products delivered at your home with ease.",
      moreInfo: "We deliver across all pin codes in India within 3-5 working days. Track your shipment real-time and opt for scheduled delivery.,We’re committed to offering a wide range of new-age logistics solutions to the various delivery needs of businesses and individuals. Our customer-focused strategy ensures that the well-being of our customers is always our top priority. Experience swift delivery of documents and parcels at the most competitive rates and guaranteed speed for a scalable business!",
    },
    {
      icon: <img src={awardImg} alt="Award" className="w-16 h-16 md:w-20 md:h-20 rounded-3xl object-cover" />,
      title: "Quality Assurance",
      description: "Easy exchange and return options. Premium Materials.",
      moreInfo: "We ensure every product passes a 5-step quality check. Return within 7 days if unsatisfied with no questions asked,Quality Assurance (QA) is a critical aspect of software development that ensures the delivery of high-quality products that meet customer expectations. A well-defined software QA process helps identify and prevent defects, enhances customer satisfaction, reduces risks and costs, and improves overall product quality. In this comprehensive guide, we will walk you through the key stages, steps, and tools involved in the QA process",
    },
    {
      icon: <img src={messageImg} alt="Message" className="w-16 h-16 md:w-20 md:h-20 rounded-3xl object-cover" />,
      title: "Online Support",
      description: "24 hours a day, 7 days a week.",
      moreInfo: "Get instant help via chat, call or email. Our AI bot solves basic issues, and agents are always ready for complex queries, Empowering companies to excel in customer experience with HELPX.AI's cutting-edge AI automation, we're redefining global business standards for customer service. From answering FAQs to resolving complex issues and enhancing product support, our platform excels in driving customer satisfaction. HELPX.AI ensures your business stays ahead in service excellence.",
    },
    {
      icon: <img src={cardImg} alt="Credit Card" className="w-16 h-16 md:w-20 md:h-20 rounded-3xl object-cover" />,
      title: "Flexible Payment",
      description: "Pay with Multiple payment options.",
      moreInfo: "We support UPI, Credit/Debit cards, Wallets, EMI, and Cash on Delivery in selected cities, Create an unmatched customer experience with the simplest and easiest integrations for your website and mobile app. A wide range of SDKs. RESTful APIs, plug-ins, support for all major platform languages.",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="bg-amber-50 py-8 px-4 md:py-12 md:px-8 overflow-x-hidden">
      <motion.div
        ref={ref}
        className="container mx-auto max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              onClick={() => setSelectedFeature(feature)}
              className="bg-[#2a2e0f] rounded-3xl p-6 flex flex-col items-start transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
              variants={cardVariants}
              whileHover={{
                y: -5,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-white font-semibold text-lg md:text-xl mb-2">{feature.title}</h3>
              <p className="text-white text-sm md:text-base opacity-90">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* More Info Section */}
        {selectedFeature && (
          <div className="mt-10 bg-amber-80 rounded-4xl shadow-2xl p-10 border border-gray-300 max-w-3xl mx-auto transition-all duration-500">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedFeature.title}</h2>
                <p className="text-gray-700 text-base">{selectedFeature.moreInfo}</p>
              </div>
              <button
                className="text-gray-400 hover:text-red-500 text-xl font-bold"
                onClick={() => setSelectedFeature(null)}
                title="Close"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
