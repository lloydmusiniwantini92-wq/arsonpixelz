/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ScrollReveal } from './fx/ScrollReveal';

// --- HIGH-FIDELITY VISUAL 1: THE TURBINE (Branding) ---
const SchematicTurbine = () => (
    <div className="relative w-full h-full flex items-center justify-center scale-110">
        {/* Cinematic Glow Orbs */}
        <div className="absolute w-[400px] h-[400px] bg-[#FF3E00]/10 blur-[100px] rounded-full animate-pulse" />
        
        {/* Outer Ring System */}
        <div className="absolute w-80 h-80 border-2 border-[#FF3E00]/20 rounded-full animate-[spin_15s_linear_infinite]">
            <div className="absolute top-0 left-1/2 w-4 h-4 bg-[#FF3E00] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_#FF3E00]"></div>
            <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-white/20 -translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="absolute w-64 h-64 border border-white/5 rounded-full animate-[spin_8s_linear_infinite_reverse]">
             <div className="absolute top-1/2 left-0 w-2 h-2 bg-white/10 -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Inner Kinetic Core */}
        <div className="relative w-48 h-48 border-2 border-[#FF3E00]/40 rounded-full flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF3E00]/20 to-transparent animate-pulse" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                <div key={i} className="absolute w-[1px] h-full bg-[#FF3E00]/30" style={{ transform: `rotate(${deg}deg)` }}></div>
            ))}
            <div className="w-16 h-16 bg-white rounded-full mix-blend-difference shadow-[0_0_50px_#FF3E00]"></div>
        </div>
        
        <div className="absolute bottom-4 font-mono text-[8px] tracking-[0.6em] text-white/40 font-black uppercase">CORE_IGNITION // ACTIVE</div>
    </div>
);

// --- HIGH-FIDELITY VISUAL 2: THE STACK (Dev) ---
const SchematicStack = () => (
    <div className="relative w-full h-full flex items-center justify-center perspective-[2000px]">
        {/* Volumetric Glow */}
        <div className="absolute w-[500px] h-[300px] bg-white/5 blur-[120px] rotate-45 pointer-events-none" />
        
        <div className="relative w-64 h-64 preserve-3d animate-[float_6s_ease-in-out_infinite]">
            {/* Base Layer */}
            <div className="absolute top-0 left-0 w-full h-full border border-white/10 bg-white/[0.03] transform rotate-x-[60deg] rotate-z-[45deg] translate-z-[0px] shadow-2xl backdrop-blur-sm"></div>
            
            {/* Logic Layer (Glow) */}
            <div className="absolute top-0 left-0 w-full h-full border-2 border-[#FF3E00] bg-[#FF3E00]/5 transform rotate-x-[60deg] rotate-z-[45deg] translate-z-[60px] shadow-[0_0_80px_rgba(255,62,0,0.3)] animate-pulse">
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-20">
                    {[...Array(64)].map((_, i) => (
                        <div key={i} className="border-[0.5px] border-[#FF3E00]"></div>
                    ))}
                </div>
            </div>
            
            {/* Interaction Layer */}
            <div className="absolute top-0 left-0 w-full h-full border border-white/20 bg-white/[0.01] transform rotate-x-[60deg] rotate-z-[45deg] translate-z-[120px] shadow-2xl">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-white animate-ping" />
            </div>
        </div>
        <div className="absolute bottom-4 font-mono text-[8px] tracking-[0.6em] text-white/40 font-black uppercase">CORE_ARCH // STABLE</div>
    </div>
);

// --- HIGH-FIDELITY VISUAL 3: THE RADAR (Marketing) ---
const SchematicRadar = () => (
    <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-96 h-56 border-b border-l border-white/20 shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden bg-black/40 backdrop-blur-md">
            {/* Dynamic Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,62,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,62,0,0.05)_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>

            {/* The High-Resolution Curve */}
            <svg className="w-full h-full relative z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    d="M0,90 Q15,85 25,60 T50,45 T75,20 T100,5"
                    fill="none"
                    stroke="#FF3E00"
                    strokeWidth="2"
                    className="drop-shadow-[0_0_12px_rgba(255,62,0,0.8)]"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>

            {/* Scanning Strobe */}
            <div className="absolute top-0 bottom-0 w-[4px] bg-gradient-to-r from-[#FF3E00] to-transparent shadow-[10px_0_30px_rgba(255,62,0,0.5)] z-20 animate-[scan_3s_linear_infinite]"></div>
            
            {/* Floating Data Nodes */}
            <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-white shadow-[0_0_10px_white] rounded-full animate-ping" />
            <div className="absolute top-2/3 left-2/3 w-2 h-2 bg-[#FF3E00] shadow-[0_0_10px_#FF3E00] rounded-full animate-ping delay-700" />
        </div>
        <div className="absolute bottom-4 font-mono text-[8px] tracking-[0.6em] text-white/40 font-black uppercase">VELOCITY_METRIC // PEAK</div>
    </div>
);

import brandingBg from '../assets/blueprint/branding_background_brutalist_1775334234691.webp';
import devBg from '../assets/blueprint/development_background_binary_brutalist_1775334249859.webp';
import marketingBg from '../assets/blueprint/marketing_background_velocity_brutalist_1775334266276.webp';

export const Services: React.FC = () => {
    const [activeService, setActiveService] = useState(0);
    const sectionRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const services = [
        {
            id: "01",
            title: "Brand Ignition",
            bgImage: brandingBg,
            link: "/branding"
        },
        {
            id: "02",
            title: "Digital Architecture",
            bgImage: devBg,
            link: "/dev-ai"
        },
        {
            id: "03",
            title: "Market Acceleration",
            bgImage: marketingBg,
            link: "/marketing"
        }
    ];

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        let ctx = gsap.context(() => {
            const trigger = ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: "+=300%",
                pin: true,
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    if (progress < 0.33) setActiveService(0);
                    else if (progress < 0.66) setActiveService(1);
                    else setActiveService(2);
                }
            });
            return () => trigger.kill();
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Selection Logic: Direct Portal Navigation
    const handlePortalEntry = (index: number) => {
        navigate(services[index].link);
    };

    return (
        <section ref={sectionRef} className="relative w-full bg-[#000000] text-white overflow-hidden">
            
            {/* --- 1. GLOBAL BACKGROUND STAGE (40% MASKED IMAGES) --- */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeService}
                        initial={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.9, filter: 'blur(40px)' }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 w-full h-full"
                    >
                        {/* THE THEME IMAGE (UNMASKED) */}
                        <img 
                            src={services[activeService].bgImage} 
                            alt={services[activeService].title}
                            className="absolute inset-0 w-full h-full object-cover" 
                        />
                    </motion.div>
                </AnimatePresence>
                
                {/* Global Texture & Noise */}
                <div className="absolute inset-0 noise-bg opacity-[0.03] pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
            </div>

            {/* --- 2. THE STACK OVERLAY (MARK 3: DIRECT PORTAL) --- */}
            <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center pointer-events-none">
                
                {/* HUD: SECTOR TRACKER */}


                {/* THE GLOBAL TITLE (PORTAL) Purchasing our products. */}
                <div className="relative w-full max-w-[140rem] px-12 pb-[180px] flex flex-col items-center justify-center pointer-events-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeService}
                            initial={{ y: 60, opacity: 0, filter: 'blur(20px)' }}
                            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                            exit={{ y: -60, opacity: 0, filter: 'blur(20px)' }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col items-center text-center cursor-pointer group"
                            onClick={() => handlePortalEntry(activeService)}
                        >
                             <h2 
                                className="text-white uppercase leading-[0.75] tracking-tighter select-none transition-transform duration-700 group-hover:scale-[1.01]"
                                style={{ 
                                    fontFamily: 'Anton, sans-serif', 
                                    fontSize: 'clamp(4rem, 15vw, 16rem)',
                                    textShadow: '0 40px 100px rgba(0,0,0,0.5)',
                                    fontWeight: 'normal'
                                }}
                            >
                                {services[activeService].title.split(' ')[0]}
                                <br />
                                <span className="text-[#FF3E00] transition-all duration-700">
                                    {services[activeService].title.split(' ')[1]}
                                </span>
                            </h2>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* THE CTA BUTTON (ALIGNED TO BOT DATUM) */}
                <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeService}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="flex items-center gap-6 py-5 px-14 bg-white text-black font-anton text-2xl uppercase tracking-tighter hover:bg-[#FF3E00] hover:text-white transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.3)] cursor-pointer"
                            onClick={() => handlePortalEntry(activeService)}
                        >
                            Open Sector Specification
                            <ArrowRightIcon className="w-6 h-6 -rotate-45" />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* HUD: PROGRESS MARKERS */}
                <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-16 items-center">
                    {services.map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-4 group pointer-events-auto">
                             <span className={`font-mono text-[10px] font-black transition-all ${activeService === i ? 'text-[#FF3E00] scale-125' : 'text-white/20'}`}>0{i+1}</span>
                             <div className={`w-[1px] h-12 transition-all duration-500 ${activeService === i ? 'bg-[#FF3E00] h-24' : 'bg-white/10'}`} />
                        </div>
                    ))}
                </div>


            </div>

            {/* --- GLOBAL STYLES (PURE ANTON) --- */}
            <style>{`
                .preserve-3d { transform-style: preserve-3d; }
                @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                
                /* Ensure absolutely no italics across the section */
                .font-anton { font-style: normal !important; }
                h2, h3, h4, span, p { font-style: normal !important; }
            `}</style>
        </section>
    );
};
