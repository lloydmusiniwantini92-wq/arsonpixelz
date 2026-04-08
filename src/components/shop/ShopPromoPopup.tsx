import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ShopPromoPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const [hasBeenClosed, setHasBeenClosed] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!hasBeenClosed) setIsVisible(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, [hasBeenClosed]);

    useEffect(() => {
        let scrollTimeout: NodeJS.Timeout;

        const handleScroll = () => {
            setIsScrolling(true);
            clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(() => {
                setIsScrolling(false);
            }, 1000); // Reappear after 1 second of inactivity
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, []);

    const containerVariants = {
        hidden: { x: 50, opacity: 0, scale: 0.95 },
        visible: { 
            x: 0, 
            opacity: 1, 
            scale: 1,
            transition: { 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1],
                staggerChildren: 0.1,
                delayChildren: 0.4
            } 
        },
        exit: { x: 50, opacity: 0, scale: 0.95 }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <AnimatePresence>
            {isVisible && !isScrolling && (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed bottom-12 right-12 z-[200] w-[320px]"
                >
                    <div className="relative group overflow-hidden border border-[#FF3E00]/30 backdrop-blur-2xl bg-black/90 p-8 shadow-[0_0_50px_rgba(255,62,0,0.1)]">
                        {/* ── ARCHITECTURAL CORNER REINFORCEMENTS ── */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#FF3E00] opacity-40 translate-x-[-1px] translate-y-[-1px]" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#FF3E00] opacity-40 translate-x-[1px] translate-y-[1px]" />

                        {/* ── HEADER ── */}
                        <div className="flex justify-between items-start mb-12">
                            <motion.div variants={itemVariants} className="space-y-1">
                                <div className="font-mono text-[9px] text-[#FF3E00] tracking-[0.4em] uppercase font-black">
                                    ESTABLISHED_OFFER
                                </div>
                                <div className="h-[1px] w-12 bg-[#FF3E00]/60" />
                            </motion.div>
                            <button 
                                onClick={() => {
                                    setIsVisible(false);
                                    setHasBeenClosed(true);
                                }}
                                className="text-white/20 hover:text-[#FF3E00] transition-colors flex items-center justify-center"
                            >
                                <span className="font-mono text-xs font-black">X</span>
                            </button>
                        </div>

                        {/* ── CORE CONTENT ── */}
                        <div className="space-y-8">
                            <motion.div variants={itemVariants} className="relative">
                                <motion.h4 
                                    animate={{ 
                                        scale: [1, 1.05, 1],
                                        textShadow: [
                                            "0 0 0px rgba(255,255,255,0)",
                                            "0 0 20px rgba(255,255,255,0.4)",
                                            "0 0 0px rgba(255,255,255,0)"
                                        ]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="font-space font-black text-6xl text-white leading-none uppercase tracking-tighter mb-2"
                                >
                                    50% 
                                    <span className="block text-2xl text-[#FF3E00]">OFF</span>
                                </motion.h4>
                                <div className="absolute -left-4 top-0 w-[1px] h-full bg-[#FF3E00]/20" />
                            </motion.div>

                            <motion.div variants={itemVariants} className="space-y-4">
                                <h5 className="font-space font-bold text-lg text-white uppercase tracking-tight leading-none">
                                    50% OFF YOUR<br/>WEBSITE
                                </h5>
                                <p className="font-inter text-[10px] text-[#FF3E00] uppercase font-black tracking-widest leading-relaxed">
                                    VALID UNTIL 01 MAY 2026
                                </p>
                            </motion.div>

                            {/* ── ACTION ── */}
                            <motion.button 
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-white p-4 group/btn relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-[#FF3E00]/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500" />
                                <div className="flex justify-center items-center transition-transform group-hover/btn:translate-x-1 duration-300 gap-4">
                                    <span className="font-space font-black text-[14px] text-black uppercase tracking-[0.2em]">
                                        CLAIM OFFER
                                    </span>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="black" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"/>
                                    </svg>
                                </div>
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
