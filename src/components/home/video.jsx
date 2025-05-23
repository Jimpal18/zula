import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import img1 from '../../assets/women.jpg';

const Video = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="flex justify-center items-center  py-8 bg-white rounded-b-4xl">
            <div
                className="relative mb-5 mt-5 rounded-4xl overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.img
                    src={img1}
                    alt="Play Button Example"
                    className="w-350 h-150 rounded-4xl"
                    style={{ cursor: 'pointer' }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                />
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 flex justify-center items-center bg-black/40"
                        >
                            <PlayCircle size={80} className="text-white/80" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Video;
