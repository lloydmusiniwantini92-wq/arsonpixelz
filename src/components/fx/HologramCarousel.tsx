import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface Project {
    id: string;
    title: string;
    category: string;
    image?: string;
    link?: string;
    texture?: string;
}

interface HologramCarouselProps {
    projects: Project[];
}

export const HologramCarousel: React.FC<HologramCarouselProps> = ({ projects }) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    
    // High-fidelity generated textures
    const textures = [
        '/images/hologram/hologram_texture_1_1773230265180.webp',
        '/images/hologram/hologram_texture_2_1773230284758.webp',
        '/images/hologram/hologram_texture_3_1773230303212.webp'
    ];

    useEffect(() => {
        const carousel = carouselRef.current;
        const container = containerRef.current;
        const cards = cardsRef.current.filter(Boolean);
        
        if (!carousel || !container || cards.length === 0) return;

        const cardCount = projects.length;
        const angleStep = 360 / cardCount;
        const radius = window.innerWidth > 768 ? 700 : 450; // Increased radius for better spread

        // Initial setup for 3D cards
        cards.forEach((card, i) => {
            const angle = i * angleStep;
            gsap.set(card, {
                rotateY: angle,
                z: radius,
                transformOrigin: `50% 50% -${radius}px`,
                opacity: 0,
                scale: 0.5,
                filter: 'blur(20px) brightness(0)'
            });
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                id: "hologram-pin",
                trigger: container,
                start: "top top",
                end: "+=8000", // Massively longer scroll for cinematic slow rotation
                scrub: 4,      // Butter-smooth interpolation
                pin: true,
                anticipatePin: 1,
            }
        });

        // Entrance animation: Digital Reveal
        tl.to(cards, {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px) brightness(1)',
            stagger: {
                each: 0.1,
                from: "center"
            },
            duration: 1.5,
            ease: "expo.out"
        }, 0);

        // Rotation with smoothing
        tl.to(carousel, {
            rotateY: 360,
            ease: "none",
        }, 0.5);

        // Advanced focus logic with GSAP QuickTo for butter-smooth updates
        const focusCtx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: container,
                start: "top top",
                end: "+=8000",
                scrub: true,
                onUpdate: (self) => {
                    const rotation = self.progress * 360;
                    cards.forEach((card, i) => {
                        const cardAngle = (i * angleStep + rotation) % 360;
                        const normalized = ((cardAngle % 360) + 360) % 360;
                        const diff = Math.min(normalized, 360 - normalized);
                        
                        // Godly focus physics
                        const focusLevel = Math.max(0, 1 - (diff / 60)); // Wider focus falloff
                        const scale = 0.8 + (focusLevel * 0.4);
                        const opacity = 0.2 + (focusLevel * 0.8);
                        const blur = (1 - focusLevel) * 8;
                        const zOffset = focusLevel * 150;

                        gsap.to(card, {
                            scale,
                            opacity,
                            z: radius + zOffset,
                            filter: `blur(${blur}px) brightness(${0.5 + focusLevel * 0.7})`,
                            duration: 0.8,
                            ease: "power2.out",
                            overwrite: "auto"
                        });
                    });
                }
            });
        });

        return () => {
            focusCtx.revert();
            ScrollTrigger.getById("hologram-pin")?.kill();
            cards.forEach(card => gsap.set(card, { clearProps: "all" }));
        };
    }, [projects]);

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-transparent perspective-[1400px]">
            {/* 3D Pivot Point */}
            <div 
                ref={carouselRef}
                className="relative w-full h-full flex items-center justify-center transform-style-3d will-change-transform"
            >
                {projects.map((project, i) => (
                    <div
                        key={project.id}
                        ref={(el) => (cardsRef.current[i] = el)}
                        className="absolute w-[320px] md:w-[450px] aspect-[16/10] md:aspect-[16/9] preserve-3d group cursor-pointer"
                    >
                        {/* MASSIVE HOVER WRAPPER - Decoupled from GSAP transforms */}
                        <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/5 shadow-[0_0_120px_rgba(209,109,106,0.15)] bg-black/60 backdrop-blur-2xl transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-125 group-hover:-translate-y-8 group-hover:shadow-[0_0_200px_rgba(209,109,106,0.6)]">
                            {/* ─── HI-TECH ARCHITECTURE ─── */}
                            <div className="absolute inset-0 z-0 select-none">
                                {/* Texture Layer (Blueprint Grid) */}
                                <div className="absolute inset-0 opacity-[0.07] mix-blend-screen bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
                                <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
                                
                                {/* Project Content */}
                                {project.image && (
                                    <div className="absolute inset-0 overflow-hidden">
                                         <img 
                                            src={project.image} 
                                            alt={project.title} 
                                            className="w-full h-full object-cover opacity-40 grayscale sepia-[0.3] group-hover:grayscale-0 group-hover:sepia-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]"
                                        />
                                        {/* Iridescent Wash */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#D16D6A]/20 via-transparent to-transparent mix-blend-plus-lighter opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                    </div>
                                )}

                                {/* Technical HUD Overlays */}
                                <div className="absolute inset-0 p-4 pointer-events-none">
                                    {/* Corners */}
                                    <div className="absolute top-4 left-4 w-8 h-8 border-t-[0.5px] border-l-[0.5px] border-[#D16D6A] group-hover:w-12 group-hover:h-12 transition-all duration-700" />
                                    <div className="absolute top-4 right-4 w-8 h-8 border-t-[0.5px] border-r-[0.5px] border-[#D16D6A] group-hover:w-12 group-hover:h-12 transition-all duration-700" />
                                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-[0.5px] border-l-[0.5px] border-white/20" />
                                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-[0.5px] border-r-[0.5px] border-white/20" />
                                    
                                    {/* Data Pips */}
                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1 items-center opacity-40">
                                        {[...Array(5)].map((_, j) => (
                                            <div key={j} className="w-1 h-1 bg-[#D16D6A] rounded-full scale-50 group-hover:scale-100 transition-transform" style={{ transitionDelay: `${j * 50}ms` }} />
                                        ))}
                                    </div>
                                    
                                    {/* Coordinate Tag */}
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[8px] tracking-[0.3em] text-white/30 uppercase group-hover:text-[#D16D6A]/60 transition-colors">
                                        POS: {i.toString().padStart(2, '0')} // NODE_{project.id.split('-')[0]}
                                    </div>
                                </div>
                                
                                {/* Scanning Pulse */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D16D6A]/10 to-transparent h-[200%] -translate-y-full group-hover:translate-y-full transition-transform duration-[2s] ease-linear repeat-infinite pointer-events-none" />
                            </div>

                            {/* ─── CONTENT DISPLAY ─── */}
                            <div className="absolute inset-0 z-10 p-8 md:p-12 flex flex-col justify-end pointer-events-none">
                                <motion.div 
                                    className="flex items-center gap-3 mb-6 overflow-hidden"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <div className="h-px w-8 bg-[#D16D6A]/60" />
                                    <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[#D16D6A] font-bold">
                                        {project.category}
                                    </span>
                                </motion.div>

                                <h3 className="text-4xl md:text-6xl font-black text-white leading-[0.85] uppercase tracking-tighter italic transition-all duration-700 group-hover:tracking-normal group-hover:text-transparent group-hover:[-webkit-text-stroke:1px_white]">
                                    {project.title}
                                </h3>

                                {/* Hover Reveal: CTA & Metadata */}
                                <div className="mt-8 flex items-center justify-between opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 pointer-events-auto">
                                    <Link 
                                        to={project.link || "#"} 
                                        className="flex items-center gap-4 group/btn"
                                    >
                                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-[#D16D6A] group-hover/btn:border-[#D16D6A] transition-all">
                                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                        <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-white uppercase">Initialize_Node</span>
                                    </Link>

                                    <div className="text-right font-mono text-[8px] text-white/40 leading-tight">
                                        [BUFFER_READY]<br/>
                                        [SYNC_STABLE]
                                    </div>
                                </div>

                                {/* Dynamic Logic Meter */}
                                <div className="mt-auto pt-8">
                                    <div className="w-full h-[1px] bg-white/10 relative">
                                        <motion.div 
                                            className="absolute inset-y-0 left-0 bg-[#D16D6A] shadow-[0_0_10px_#D16D6A]"
                                            initial={{ width: "0%" }}
                                            whileInView={{ width: "100%" }}
                                            transition={{ duration: 1.5, delay: 0.5 }}
                                        />
                                        {/* Moving Data Pip */}
                                        <motion.div 
                                            className="absolute top-[-3px] w-2 h-2 rounded-full bg-white shadow-[0_0_5px_white]"
                                            animate={{ left: ["0%", "100%"] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Interactive UI Fringe (Refraction effect) */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-tr from-[#D16D6A]/5 via-transparent to-white/5 pointer-events-none" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Ambient Red Glow Singularity */}
            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#D16D6A]/10 to-transparent pointer-events-none z-0" />
        </div>
    );
};
