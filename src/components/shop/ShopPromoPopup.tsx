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
            }, 1000); 
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
                duration: 0.6, 
                ease: [0.16, 1, 0.3, 1],
                staggerChildren: 0.05,
            } 
        },
        exit: { x: 50, opacity: 0, scale: 0.95 }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    return (
        <AnimatePresence>
            {isVisible && !isScrolling && (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed bottom-8 right-8 z-[200] w-[340px]"
                >
                    <div className="relative bg-black border-[3px] border-[#FF3E00] p-10 shadow-[15px_15px_0px_rgba(255,62,0,0.1)]">
                        
                        {/* ── MINIMAL CLOSE CONTROL ── */}
                        <button 
                            onClick={() => {
                                setIsVisible(false);
                                setHasBeenClosed(true);
                            }}
                            className="absolute top-4 right-4 group flex items-center gap-2 z-50 text-white/30 hover:text-white transition-colors"
                        >
                            <span className="font-mono text-[8px] tracking-[0.3em] font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity">EXIT_</span>
                            <div className="w-5 h-5 flex items-center justify-center font-bold text-xs">X</div>
                        </button>

                        <div className="relative z-20 space-y-10">
                            <motion.div variants={itemVariants} className="space-y-4">
                                <div className="font-mono text-[9px] text-[#FF3E00] font-black uppercase tracking-[0.5em]">
                                    FE_ADJUSTMENT_ACTIVE
                                </div>
                                <div className="h-[3px] w-12 bg-[#FF3E00]" />
                            </motion.div>

                            <motion.div variants={itemVariants} className="relative">
                                <h4 className="font-anton text-[110px] text-white leading-[0.75] uppercase tracking-tighter m-0">
                                    50%
                                </h4>
                                <span className="absolute -bottom-4 right-0 font-mono text-[#FF3E00] text-sm font-black uppercase tracking-widest">
                                    REDUCTION_
                                </span>
                            </motion.div>

                            <motion.div variants={itemVariants} className="space-y-6 pt-4">
                                <p className="font-mono text-[10px] text-white/50 uppercase leading-relaxed max-w-[240px]">
                                    ACCESS TO INSTITUTIONAL-SCALE<br/>ARCHITECTURE SYSTEMS AT A<br/>NON-RECURRING FEE REDUCTION.
                                </p>
                                
                                <div className="font-mono text-[9px] text-[#FF3E00] font-black tracking-[0.2em] uppercase">
                                    OFFER_VALID_UNTIL_01_MAY_2026
                                </div>
                            </motion.div>

                            {/* ── INDUSTRIAL ACTION ── */}
                            <motion.button 
                                variants={itemVariants}
                                whileHover={{ x: 8, backgroundColor: '#FF3E00', color: '#000' }}
                                className="w-full bg-transparent border-2 border-[#FF3E00] p-5 text-[#FF3E00] flex justify-between items-center transition-all duration-300 group"
                            >
                                <span className="font-anton text-2xl uppercase tracking-widest leading-none pt-1">
                                    APPLY_OFFER
                                </span>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:translate-x-1">
                                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter"/>
                                </svg>
                            </motion.button>
                        </div>

                        {/* ── STRUCTURAL ACCENT ── */}
                        <div className="absolute top-0 left-12 w-[1px] h-full bg-white/5" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


