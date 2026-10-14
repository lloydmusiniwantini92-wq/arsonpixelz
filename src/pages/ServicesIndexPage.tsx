import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import brandingBg from '../assets/site-static/branding/brandinghero.jpg';
import devBg from '../assets/site-static/DevAI/DEVAIhero.jpg';
import marketingBg from '../assets/site-static/tim.webp';
import gamingBg from '../assets/site-static/mg.webp';

const pillars = [
    { id: "01", title: "BRAND IGNITION", route: "/branding", image: brandingBg },
    { id: "02", title: "DIGITAL ARCHITECTURE", route: "/dev-ai", image: devBg },
    { id: "03", title: "MARKET ACCELERATION", route: "/marketing", image: marketingBg },
    { id: "04", title: "GAMING DIVISION", route: "/gaming", image: gamingBg }
];

export const ServicesIndexPage: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(20px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col justify-center"
        >
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={activeIndex}
                        src={pillars[activeIndex].image}
                        initial={{ opacity: 0, scale: 1.05, filter: 'blur(20px)' }}
                        animate={{ opacity: 0.6, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, filter: 'blur(20px)' }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-12 flex flex-col justify-center h-full pt-32 pb-20">
                {/* Title / Header */}
                <div className="mb-16 pointer-events-none">
                    <h3 className="font-mono text-[#D83600] text-sm tracking-[0.4em] uppercase font-bold mb-2">DIRECTORY</h3>
                    <h1 className="text-white font-bold font-anton text-4xl tracking-tight uppercase">CORE SERVICES HUB</h1>
                </div>

                {/* Kinetic List */}
                <div className="flex flex-col items-start gap-4 md:gap-8">
                    {pillars.map((pillar, i) => {
                    const isActive = activeIndex === i;
                    return (
                        <div 
                            key={pillar.id}
                            className="group flex items-center gap-8 cursor-pointer w-full border-b border-white/10 pb-4 md:pb-8"
                            onMouseEnter={() => setActiveIndex(i)}
                            onClick={() => navigate(pillar.route)}
                        >
                            <span 
                                className={`font-mono font-bold text-sm md:text-xl transition-colors duration-500 ${isActive ? 'text-[#D83600]' : 'text-white/30'}`}
                            >
                                {pillar.id}
                            </span>
                            
                            <h2 
                                className="uppercase leading-none tracking-tighter m-0 p-0 transition-all duration-500"
                                style={{ 
                                    fontFamily: 'Anton, sans-serif',
                                    fontSize: 'clamp(3rem, 8vw, 9rem)',
                                    WebkitTextStroke: isActive ? '0px transparent' : '2px rgba(255,255,255,0.2)',
                                    color: isActive ? '#FFFFFF' : 'transparent',
                                    transform: isActive ? 'translateX(20px)' : 'translateX(0px)',
                                    textShadow: isActive ? '0 20px 50px rgba(0,0,0,0.5)' : 'none'
                                }}
                            >
                                {pillar.title}
                            </h2>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -20 }}
                                transition={{ duration: 0.4 }}
                                className="hidden md:flex ml-auto items-center gap-4 bg-[#D83600] rounded-full px-6 py-3"
                            >
                                <span className="font-sans font-bold text-white text-sm uppercase tracking-wider">VIEW DIVISION</span>
                                <ArrowRightIcon className="w-5 h-5 text-white" />
                            </motion.div>
                        </div>
                    );
                })}
                </div>
            </div>
        </motion.div>
    );
};

export default ServicesIndexPage;
