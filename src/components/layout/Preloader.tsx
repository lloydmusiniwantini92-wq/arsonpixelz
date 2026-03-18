import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import Project Images
import EatalyImg from '../assets/Eataly.jpg';
import PunoImg from '../assets/Puno.png';
import LevisImg from '../assets/Levis22.jpg';
import AboutImg from '../assets/ArsonPixelzAbout.jpg';

export const Preloader: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [impactTriggered, setImpactTriggered] = useState(false);

    useEffect(() => {
        const duration = 3000; // 3 seconds for a premium cinematic pulse
        const intervalTime = 20; 
        const steps = duration / intervalTime;

        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const progress = Math.min(Math.round((currentStep / steps) * 100), 100);
            setCount(progress);

            // Impact at 30% progress
            if (progress >= 30 && !impactTriggered) {
                setImpactTriggered(true);
            }

            if (currentStep >= steps) {
                clearInterval(timer);
                setTimeout(() => setIsLoading(false), 800); 
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, [impactTriggered]);

    // Lock Scroll during load
    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isLoading]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-between text-[#EBE9DF] p-8 md:p-14 bg-[#050505] overflow-hidden"
                    initial={{ y: 0 }}
                    exit={{
                        opacity: 0,
                        filter: "blur(40px)",
                        scale: 1.05,
                        transition: { duration: 1.6, ease: [0.33, 1, 0.68, 1] } 
                    }}
                >
                    {/* Atmospheric Ambient Layer */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#D16D6A]/15 via-transparent to-[#D16D6A]/5 opacity-30"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(209,109,106,0.08),transparent_70%)]"></div>
                        <div className="absolute inset-0 mix-blend-overlay opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                        {/* Scanlines Effect */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-10"
                             style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, white 2px, white 4px)' }}></div>
                    </div>

                    {/* Top Section */}
                    <div className="w-full flex justify-between items-start opacity-0 animate-[fade-in_1s_ease-out_forwards]" style={{ animationDelay: '0.4s' }}>
                        <div className="flex flex-col gap-1.5">
                            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">Initiating Neural Protocol</span>
                            <div className="h-[1px] w-16 bg-[#D16D6A]/40 shadow-[0_0_8px_#D16D6A]"></div>
                        </div>
                        <span className="font-mono text-[9px] text-white/20 uppercase tracking-[0.2em] tabular-nums">ARS_LD.V7.64</span>
                    </div>

                    {/* Center Logo Animation Area */}
                    <div className="relative w-full flex-1 flex items-center justify-center z-10">
                        <div className="relative w-[180px] md:w-[280px] aspect-[16/9] flex items-center justify-center overflow-visible">
                            
                            {/* The "Impact" Particle (Diamond Dot) */}
                            <AnimatePresence>
                                {!impactTriggered && count < 30 && (
                                    <motion.div
                                        className="absolute w-3 h-3 bg-white blur-[0.2px] shadow-[0_0_20px_white] z-30"
                                        style={{ rotate: '45deg' }}
                                        initial={{ top: "-200%", left: "-200%", opacity: 0 }}
                                        animate={{ 
                                            top: "20%", 
                                            left: "20%", 
                                            opacity: 1 
                                        }}
                                        transition={{ 
                                            duration: 0.9, 
                                            ease: "expo.in"
                                        }}
                                        exit={{ 
                                            scale: 4,
                                            opacity: 0,
                                            filter: "blur(15px)",
                                            transition: { duration: 0.3 }
                                        }}
                                    />
                                )}
                            </AnimatePresence>

                            {/* Logo Masked Container */}
                            <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                                {/* Base Ghost Outline (Subtle brand presence) */}
                                <div 
                                    className="absolute inset-0 bg-white/10"
                                    style={{
                                        maskImage: 'url(/images/logo.png)',
                                        WebkitMaskImage: 'url(/images/logo.png)',
                                        maskSize: 'contain',
                                        WebkitMaskSize: 'contain',
                                        maskRepeat: 'no-repeat',
                                        WebkitMaskRepeat: 'no-repeat',
                                        maskPosition: 'center',
                                        WebkitMaskPosition: 'center'
                                    }}
                                />

                                {/* Liquid Fill Layer */}
                                <motion.div 
                                    className="absolute inset-0 bg-white"
                                    initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                                    animate={{ 
                                        clipPath: impactTriggered 
                                            ? `inset(${100 - ((count - 30) / 70) * 100}% 0% 0% 0%)` 
                                            : 'inset(100% 0% 0% 0%)' 
                                    }}
                                    style={{
                                        maskImage: 'url(/images/logo.png)',
                                        WebkitMaskImage: 'url(/images/logo.png)',
                                        maskSize: 'contain',
                                        WebkitMaskSize: 'contain',
                                        maskRepeat: 'no-repeat',
                                        WebkitMaskRepeat: 'no-repeat',
                                        maskPosition: 'center',
                                        WebkitMaskPosition: 'center',
                                        filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.4))'
                                    }}
                                />

                                {/* Impact Shockwave Overlay */}
                                {impactTriggered && count < 45 && (
                                    <motion.div 
                                        className="absolute w-full h-full border-white/60 border-2 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                                        initial={{ scale: 0, opacity: 1 }}
                                        animate={{ scale: 2, opacity: 0 }}
                                        transition={{ duration: 0.8, ease: "circOut" }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="w-full flex justify-between items-end relative z-20">
                        <div className="flex flex-col gap-3">
                            <span className="font-syne font-black text-3xl md:text-5xl text-white tracking-tighter opacity-[0.03] leading-none select-none">ARMORY</span>
                            <div className="flex items-center gap-3">
                                <div className="h-[1px] w-10 bg-[#D16D6A] shadow-[0_0_10px_#D16D6A]"></div>
                                <span className="font-mono text-[9px] uppercase tracking-[0.6em] text-white/40">Identity Node // Arson Pixelz</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-xs text-white font-bold tracking-tight tabular-nums">{count}%</span>
                                <span className="font-mono text-[8px] text-white/20 uppercase tracking-[0.2em] animate-pulse">Syncing</span>
                            </div>
                            <div className="w-40 h-[1.5px] bg-white/5 relative overflow-hidden">
                                <motion.div 
                                    className="absolute inset-0 bg-white"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: count / 100 }}
                                    transition={{ ease: "linear" }}
                                    style={{ transformOrigin: "left" }}
                                />
                                <motion.div 
                                    className="absolute inset-0 bg-[#D16D6A]"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: impactTriggered ? (count / 100) : 0 }}
                                    transition={{ ease: "linear" }}
                                    style={{ transformOrigin: "left" }}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
