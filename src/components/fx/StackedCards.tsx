import React, { useEffect, useRef } from 'react';
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
}

interface StackedCardsProps {
    projects: Project[];
}

export const StackedCards: React.FC<StackedCardsProps> = ({ projects }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const container = containerRef.current;
        const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
        
        if (!container || cards.length === 0) return;

        const ctx = gsap.context(() => {
            cards.forEach((card, index) => {
                gsap.set(card, {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    xPercent: -50,
                    yPercent: -50,
                    z: -2000, // Deep back starting point
                    scale: 0.1,
                    opacity: 0,
                    zIndex: projects.length - index // First cards draw ON TOP
                });
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    id: "stacked-cards",
                    trigger: container,
                    start: "top top",
                    end: `+=${projects.length * 150}%`,
                    pin: true,
                    scrub: 1.5,
                    anticipatePin: 1,
                }
            });

            cards.forEach((card, index) => {
                const isLast = index === cards.length - 1;
                
                // 1. Enter from depth
                tl.to(card, {
                    z: 0,
                    scale: 1,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power2.out"
                }, index * 2.5); // Stagger entry

                // 2. Pause / Resist scroll (the card "hangs" in the center)
                tl.to(card, {
                    scale: 1.05, // subtle heartbeat/zoom during pause
                    duration: 1,
                    ease: "none"
                });

                // 3. Exit (unless it's the last card)
                if (!isLast) {
                    const direction = index % 2 === 0 ? -150 : 50; // xPercent: fully left or fully right
                    tl.to(card, {
                        xPercent: direction,
                        opacity: 0,
                        duration: 1.5,
                        ease: "power3.inOut"
                    });
                }
            });

        }, containerRef);

        return () => {
            ctx.revert();
        };
    }, [projects]);

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center perspective-[1200px]">
            <div ref={wrapperRef} className="relative w-full h-full transform-style-3d">
                {projects.map((project, i) => (
                    <div
                        key={project.id}
                        ref={(el) => (cardsRef.current[i] = el)}
                        className="w-[85vw] max-w-[1200px] aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/10 group bg-black"
                    >
                        {/* ─── IMAGE LAYER ─── */}
                        <div className="absolute inset-0 w-full h-full z-0">
                            {project.image && (
                                <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover opacity-60 grayscale-[0.5] group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1200ms] ease-out"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:100%_3px] pointer-events-none mix-blend-overlay" />
                        </div>

                        {/* ─── CONTENT LAYER ─── */}
                        <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 lg:p-16 z-10 flex flex-col justify-end pointer-events-none">
                            <motion.div 
                                className="flex items-center gap-3 mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="h-px w-10 bg-[#D16D6A]" />
                                <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#D16D6A] font-bold">
                                    {project.category}
                                </span>
                            </motion.div>

                            <div className="flex justify-between items-end w-full">
                                <h3 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.85] uppercase tracking-tighter" style={{ fontFamily: 'Syne, sans-serif' }}>
                                    {project.title}
                                </h3>

                                {/* Interaction Prompt */}
                                <div className="hidden lg:flex flex-col items-center gap-2 pointer-events-auto group-hover:-translate-y-4 transition-transform duration-500 cursor-pointer">
                                    <Link to={project.link || "#"} className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center hover:bg-[#D16D6A] hover:border-[#D16D6A] transition-all duration-300">
                                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                    <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase mt-2">View Case</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
