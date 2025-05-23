import React from "react";
import { motion } from "framer-motion";
import woodenSwingImage from "../../assets/pic1.jpg";
import gardenSwingImage from "../../assets/pic2.jpg";

const MoreZula = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const leftImageVariants = {
    hidden: { opacity: 0, x: -50, rotate: -5 },
    show: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 80,
        damping: 10
      }
    },
    hover: {
      scale: 1.05,
      rotate: -1,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 300
      }
    }
  };

  const rightImageVariants = {
    hidden: { opacity: 0, x: 50, rotate: 5 },
    show: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 80,
        damping: 10,
        delay: 0.3
      }
    },
    hover: {
      scale: 1.05,
      rotate: 1,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 300
      }
    }
  };

  const smallImageVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: i * 0.2,
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }),
    hover: {
      scale: 1.03,
      y: -5,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 400
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="bg-amber-50 pt-5 min-h-screen px-4 py-8 md:px-8 lg:px-16 pb-20"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          variants={textVariants}
          className="text-center mb-8"
        >
          <h1 className="text-2xl pt-15 font-la-mango">Our Story</h1>
          <p className="text-sm text-gray-500 pt-3 pb-15">Home / Story</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start mr-10">
          <div>
            <motion.h3 
              variants={textVariants}
              className="text-xl font-la-mango mb-4 leading-snug"
            >
              Zulas n More brings you top-notch swings which gives you better comfort and luxury.
            </motion.h3>
            
            <motion.p 
              variants={textVariants}
              className="text-gray-400 mb-6 pt-5 text-1xl"
            >
              Zulas n More is a leading force in the world of furniture manufacturing, driven by a relentless commitment to craftsmanship, innovation, and design excellence. Having cumulative experience of 15+ Years, we have garnered a reputation for creating exceptional furniture pieces that adorn homes, offices, and spaces of all kinds. Our mission is to blend form and function seamlessly to provide comfort, style, and quality to our customers.
            </motion.p>

            <motion.div 
              variants={containerVariants}
              className="flex gap-6 pt-9"
            >
              <motion.img
                variants={smallImageVariants}
                custom={0}
                whileHover="hover"
                src={gardenSwingImage}
                alt="Garden Swing"
                className="w-1/2 h-[350px] rounded-4xl shadow-md object-cover"
              />
              <motion.img
                variants={smallImageVariants}
                custom={1}
                whileHover="hover"
                src={gardenSwingImage}
                alt="Cloud Swing"
                className="w-1/2 h-[350px] rounded-4xl shadow-md object-cover"
              />
            </motion.div>
          </div>

          <motion.div
            variants={rightImageVariants}
            whileHover="hover"
          >
            <motion.img
              src={woodenSwingImage}
              alt="Wooden Swing"
              className="w-full h-[610px] ml-10 rounded-4xl shadow-4xl object-cover"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MoreZula;