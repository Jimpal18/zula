import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import image from "../../assets/pic1.jpg";
import img1 from "../../assets/swing6.png";
import img2 from "../../assets/swing2.png";
import img3 from "../../assets/swing5.png";
import img4 from "../../assets/swing4.png";
import img5 from "../../assets/swing3.png";
import img6 from "../../assets/swing1.png";
import img7 from "../../assets/swing10.png";
import img8 from "../../assets/swing9.png";

import { useInView } from "react-intersection-observer";

const products = [
    { id: 1, name: "Wooden Swings", description: "Introducing our latest innovation...", image: image, link: "/products/wooden-swings" },
    { id: 2, name: "Acrylic Swings", description: "Modern transparent design...", image: img1, link: "/products/acrylic-swings" },
    { id: 3, name: "Outdoor Swings", description: "Weather-resistant materials...", image: img2, link: "/products/outdoor-swings" },
    { id: 4, name: "Macrame Swings", description: "Handcrafted with intricate patterns...", image: img3, link: "/products/macrame-swings" },
    { id: 5, name: "SS Swings", description: "Stainless steel construction...", image: img4, link: "/products/ss-swings" },
    { id: 6, name: "Wooden Swings", description: "Introducing our latest innovation...", image: img5, link: "/products/wooden-swings" },
    { id: 7, name: "Acrylic Swings", description: "Modern transparent design...", image: img6, link: "/products/acrylic-swings" },
    { id: 8, name: "Outdoor Swings", description: "Weather-resistant materials...", image: img7, link: "/products/outdoor-swings" },
    { id: 9, name: "Outdoor Swings", description: "Weather-resistant materials...", image: img8, link: "/products/outdoor-swings" },
];


function CategorySlider() {
    const sliderRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [bgColor, setBgColor] = useState('transparent');
    const [intervalId, setIntervalId] = useState(null);
    const cardWidth = isMobile ? 250 : 320;
    const { ref, inView } = useInView({ triggerOnce: true });

    const scrollRight = () => {
        if (sliderRef.current) {
            const newScroll = sliderRef.current.scrollLeft + cardWidth;
            sliderRef.current.scroll({ left: newScroll, behavior: "smooth" });
        }
    };

    const scrollToStart = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
    };

    const checkScrollPosition = () => {
        if (!sliderRef.current) return;
        setShowLeftArrow(sliderRef.current.scrollLeft > 0);
    };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);

        const sliderEl = sliderRef.current;
        if (sliderEl) sliderEl.addEventListener("scroll", checkScrollPosition);

        const timer = setTimeout(() => setBgColor("white"), 500);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (sliderEl) sliderEl.removeEventListener("scroll", checkScrollPosition);
            clearTimeout(timer);
            if (intervalId) clearInterval(intervalId);
        };
    }, [isMobile, cardWidth]);

    useEffect(() => {
        if (inView) {
            const id = setInterval(() => {
                if (sliderRef.current) {
                    const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
                    if (sliderRef.current.scrollLeft >= maxScroll - 10) scrollToStart();
                    else scrollRight();
                }
            }, 3000);
            setIntervalId(id);
        } else {
            if (intervalId) clearInterval(intervalId);
        }

        return () => intervalId && clearInterval(intervalId);
    }, [inView, cardWidth]);

    return (
        <motion.div ref={ref} className="w-full px-4 py-12" style={{ backgroundColor: bgColor }}>
            <div className="max-w-screen-xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-serif mb-8 text-[#2a2e0f] text-center"
                >
                    Shop by Category
                </motion.h2>

                <div className="relative">
                    <motion.div
                        ref={sliderRef}
                        className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        <AnimatePresence mode="wait">
                            {products.map((product, index) => (
                                <ProductCard key={product.id} product={product} index={index} inView={inView} />
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {showLeftArrow && (
                        <motion.button
                            onClick={scrollToStart}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black p-2 rounded-full shadow-md z-10"
                            aria-label="Go to first product"
                        >
                            <ArrowLeft className="h-6 w-6 text-white" />
                        </motion.button>
                    )}

                    <motion.button
                        onClick={scrollRight}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black p-2 rounded-full shadow-md z-10"
                        aria-label="Scroll right"
                    >
                        <ArrowRight className="h-6 w-6 text-white" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}

function ProductCard({ product, index, inView }) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const controls = useAnimationControls();

    useEffect(() => {
        if (inView) {
            controls.start({ x: 0, opacity: 1, transition: { duration: 0.5, delay: index * 0.1 } });
        } else {
            controls.start({ x: -200, opacity: 0 });
        }
    }, [controls, index, inView]);

    return (
        <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={controls}
            exit={{ opacity: 0, x: -200, transition: { duration: 0.2 } }}
            className="relative flex-shrink-0 w-[280px] h-[350px] rounded-3xl overflow-hidden group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link to={product.link} className="block h-full">
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: imageLoaded ? 1 : 0 }}
                    exit={{ opacity: 0 }}
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onLoad={() => setImageLoaded(true)}
                />
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-0 left-0 w-full bg-black/70 text-white p-4"
                    >
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <p className="text-sm">{product.description}</p>
                    </motion.div>
                )}
            </Link>
        </motion.div>
    );
}

export default CategorySlider;
