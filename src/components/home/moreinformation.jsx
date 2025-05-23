

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

import img1 from '../../assets/pic1.jpg'; 
import img2 from '../../assets/spa.jpg'; 
import img3 from '../../assets/cloud.jpg'; 
import img4 from '../../assets/beach.jpg'; 
import img5 from '../../assets/pic1.jpg'; 
import instaLogo from '../../assets/instagram.png'; 

const imageData = [
  { id: 2, url: img2 },
  { id: 3, url: img3 },
  { id: 4, url: img4 },
  { id: 5, url: img5 },
];

const InstagramGallery = () => {
  const [hovered, setHovered] = useState(false); 
  const galleryRef = useRef(null); 
  const isGalleryInView = useInView(galleryRef, { once: true, amount: 0.3 }); 

  const leftSectionVariants = {
    hidden: { x: '-100%', opacity: 0 }, 
    visible: {
      x: 0, 
      opacity: 1, 
      transition: {
        type: 'spring',
        stiffness: 80, 
        damping: 15,
        duration: 0.8, 
      },
    },
  };

  const rightGridVariants = {
    hidden: { x: '100%', opacity: 0 }, 
    visible: {
      x: 0, 
      opacity: 1, 
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
        delay: 0.1, 
        duration: 0.8,
        when: 'beforeChildren', 
      },
    },
  };

  const individualImageVariants = {
    hidden: { opacity: 0, scale: 0.8 }, 
    visible: {
      opacity: 1, 
      scale: 1, 
      transition: {
        type: 'spring',
        stiffness: 200, 
        damping: 10, 
      },
    },
  };

  return (
    <div className="bg-amber-50 flex flex-col items-center px-4 py-8 overflow-x-hidden ">
      <div
        ref={galleryRef}
        className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10"
      >
        <motion.div
          className="flex flex-col items-center"
          variants={leftSectionVariants}
          initial="hidden"
          animate={isGalleryInView ? 'visible' : 'hidden'}
        >
          <p className="text-black text-lg font-medium mb-4 mt-6">@zulasnmore_india</p>

          <div
            className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] rounded-4xl overflow-hidden group shadow-lg cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => window.open('https://www.instagram.com/zulasnmore_india/', '_blank')}
          >
            <img
              src={img1}
              alt="Main Instagram Post"
              className="w-full h-full object-cover transition-transform duration-300 rounded-4xl group-hover:scale-105"
            />
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/30 flex items-center justify-center"
                >
                  <img src={instaLogo} alt="Instagram" className="w-12 h-12" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-4 sm:gap-6 mt-8 mb-6 md:mt-0 md:mb-0"
          variants={rightGridVariants}
          initial="hidden"
          animate={isGalleryInView ? 'visible' : 'hidden'}
        >
          {imageData.map((item) => (
            <motion.div
              key={item.id} 
              className="relative w-full aspect-square rounded-4xl overflow-hidden group shadow-md"
              variants={individualImageVariants} 
            >
              <img
                src={item.url}
                alt={`Instagram Image ${item.id}`}
                className="w-full h-full rounded-4xl object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default InstagramGallery;