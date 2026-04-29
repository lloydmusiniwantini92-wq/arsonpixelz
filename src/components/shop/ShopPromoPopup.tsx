import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ShopPromoPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const [hasBeenClosed, setHasBeenClosed] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!hasBeenClosed) setIsVisible(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, [hasBeenClosed]);

    useEffect(() => {
        let scrollTimeout: NodeJS.Timeout;
        const handleScroll = () => {
            setIsScrolling(true);
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => setIsScrolling(false), 800);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, []);

    const containerVariants = {
        hidden: { opacity: 0, x: 40, filter: 'blur(10px)' },
        visible: { 
            opacity: 1, 
            x: 0, 
            filter: 'blur(0px)',
            transition: { 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1],
                staggerChildren: 0.1
            } 
        },
        exit: { opacity: 0, x: 100, transition: { duration: 0.4 } }
    };

    const elementVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <AnimatePresence>
            {isVisible && !isScrolling && (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed bottom-12 right-12 z-[500] w-[380px] pointer-events-auto"
                >
                    {/* ── ARSON BRUTALIST BLOCK ── */}
                    <div className="relative bg-[#000000] border-4 border-white p-10 shadow-[20px_20px_0px_#FF3E00]">
                        
                        {/* Close Trigger */}
                        <button 
                            onClick={() => { setIsVisible(false); setHasBeenClosed(true); }}
                            className="absolute -top-4 -right-4 w-10 h-10 bg-[#FF3E00] border-4 border-white flex items-center justify-center hover:scale-110 transition-transform z-20"
                        >
                            <span className="font-black text-black">X</span>
                        </button>
                        
                        <div className="relative z-10 space-y-8">
                            {/* Headline */}
                            <motion.div variants={elementVariants}>
                                <h4 className="font-black text-6xl leading-[0.85] text-white tracking-tighter uppercase" style={{ fontFamily: 'Anton, sans-serif' }}>
                                    50% <br/>
                                    <span className="text-[#FF3E00]">OFF_</span>
                                </h4>
                            </motion.div>

                            {/* Impact Text */}
                            <motion.div variants={elementVariants} className="border-l-4 border-[#FF3E00] pl-6 py-2">
                                <p className="font-mono text-xs font-bold leading-tight text-white/90 uppercase tracking-widest">
                                    INSTITUTIONAL ACCESS GRANTED. VALID FOR SINGLE DEPLOYMENT.
                                </p>
                            </motion.div>

                            {/* Minimalist Button */}
                            <motion.button
                                variants={elementVariants}
                                onClick={() => { setIsVisible(false); setHasBeenClosed(true); }}
                                className="w-full bg-[#FF3E00] text-black font-black py-4 uppercase tracking-[0.2em] text-sm hover:bg-white transition-colors border-2 border-transparent hover:border-black"
                            >
                                SECURE_ACCESS
                            </motion.button>
                        </div>

                        {/* Subtle noise grain */}
                        <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
