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
                    className="fixed bottom-12 right-12 z-[500] w-[420px] pointer-events-auto"
                >
                    {/* ── INDUSTRIAL SHELL ── */}
                    <div className="relative group overflow-hidden">
                        
                        {/* Background Infrastructure */}
                        <div className="absolute inset-0 bg-glass-industrial hud-grid border-2 border-white/10" />
                        <div className="absolute inset-0 noise-bg opacity-[0.03] pointer-events-none" />
                        
                        {/* Structural Accents */}
                        <div className="absolute top-0 right-0 w-24 h-[1px] bg-[#FF3E00]" />
                        <div className="absolute bottom-0 left-0 w-[1px] h-24 bg-[#FF3E00]" />
                        
                        <div className="relative p-8 flex gap-8">
                            
                            {/* ── LEFT: DYNAMIC 50% GAUGE ── */}
                            <div className="flex flex-col items-center gap-4">
                                <span className="font-mono text-[9px] text-white/30 [writing-mode:vertical-lr] rotate-180 tracking-[0.3em] uppercase">SYSTEM_LOAD</span>
                                <div className="w-[6px] h-48 bg-white/5 relative overflow-hidden border border-white/10">
                                    <motion.div 
                                        initial={{ height: 0 }}
                                        animate={{ height: '50%' }}
                                        transition={{ delay: 0.8, duration: 1.5, ease: "circOut" }}
                                        className="absolute bottom-0 left-0 w-full bg-[#FF3E00] shadow-[0_0_15px_rgba(255,62,0,0.5)]"
                                    />
                                    {/* Tick marks */}
                                    <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none opacity-20">
                                        {[...Array(8)].map((_, i) => (
                                            <div key={i} className="w-full h-[1px] bg-white" />
                                        ))}
                                    </div>
                                </div>
                                <span className="font-mono text-[10px] text-[#FF3E00] font-black">50%</span>
                            </div>

                            {/* ── RIGHT: COMMAND DATA ── */}
                            <div className="flex-1 flex flex-col justify-between py-1">
                                
                                <div className="space-y-6">
                                    {/* Header Meta */}
                                    <div className="flex justify-between items-start">
                                        <motion.div variants={elementVariants} className="space-y-1">
                                            <div className="font-mono text-[8px] text-[#FF3E00] font-black tracking-[0.4em] uppercase">ACCESS_LEVEL: ELITE</div>
                                            <div className="font-mono text-[10px] text-white/40 uppercase tracking-tighter">REF: ARS_INTEL_2026</div>
                                        </motion.div>
                                        <button 
                                            onClick={() => { setIsVisible(false); setHasBeenClosed(true); }}
                                            className="font-mono text-[10px] text-white/20 hover:text-white transition-colors p-2 -mr-2"
                                        >
                                            [ESC_]
                                        </button>
                                    </div>

                                    {/* The Offer Headline */}
                                    <motion.div variants={elementVariants} className="relative">
                                        <h4 className="font-syne text-[52px] font-black leading-[0.9] text-white tracking-[-0.04em] uppercase italic">
                                            OVERRIDE_ <br/>
                                            <span className="text-[#FF3E00]">OFFER.</span>
                                        </h4>
                                        <div className="absolute -top-4 -right-2 font-mono text-[8px] text-white/10 tracking-[0.8em] pointer-events-none">CODE: RED_50</div>
                                    </motion.div>

                                    {/* Technical Context */}
                                    <motion.p variants={elementVariants} className="font-mono text-[10px] leading-relaxed text-white/50 uppercase max-w-[240px]">
                                        50% SYSTEM REDUCTION APPLIED TO ALL INSTITUTIONAL ASSETS. VALID FOR SINGLE DEPLOYMENT AUTHENTICATION.
                                    </motion.p>
                                </div>

                                {/* ── FINAL ACTION ── */}
                                <motion.button
                                    variants={elementVariants}
                                    whileHover={{ x: 5 }}
                                    className="mt-8 group relative overflow-hidden flex items-center justify-between border border-[#FF3E00] bg-black p-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,62,0,0.2)]"
                                >
                                    <div className="absolute inset-0 bg-[#FF3E00] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                                    <span className="relative z-10 font-syne text-sm font-black uppercase tracking-[0.2em] group-hover:text-black transition-colors">
                                        SECURE_ACCESS
                                    </span>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:text-black">
                                        <path d="M4 10H16M16 10L12 6M16 10L12 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
                                    </svg>
                                    
                                    {/* Scanline effect on hover */}
                                    <div className="absolute inset-x-0 h-[2px] bg-white/20 group-hover:animate-scanline pointer-events-none opacity-0 group-hover:opacity-100" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Scrolling Log Background Texture */}
                        <div className="absolute top-0 right-0 h-full w-[60px] pointer-events-none opacity-[0.03] overflow-hidden whitespace-nowrap">
                            <div className="animate-vertical-scroll font-mono text-[7px] text-white leading-loose italic uppercase">
                                DECRYPT_01_SECURE_AUTH_GRANTED_SYS_OK_05_LOAD_SEQUENCE_COMPLETE_
                            </div>
                        </div>
                        
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
