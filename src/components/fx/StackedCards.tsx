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
    children?: React.ReactNode;
}

export const StackedCards: React.FC<StackedCardsProps> = ({ projects, children }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const headerWrapperRef = useRef<HTMLDivElement>(null);
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
                    z: -1500, // Faster/Closer starting point
                    scale: 0.1,
                    opacity: 0,
                    zIndex: projects.length - index 
                });
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    id: "stacked-cards",
                    trigger: container,
                    start: "top top",
                    end: `+=${projects.length * 200}%`, // Longer duration for "deliberate" feel
                    pin: true,
                    scrub: 1.2, // Smoother scrub
                    anticipatePin: 1,
                }
            });

            // Initial peek-in
            gsap.from(cards[0], {
                opacity: 0,
                scale: 0.2,
                z: -800,
                scrollTrigger: {
                    trigger: container,
                    start: "top bottom",
                    end: "top top",
                    scrub: 1
                }
            });

            cards.forEach((card, index) => {
                const isLast = index === cards.length - 1;
                
                // 1. Enter from depth (Mechanical/Precise)
                tl.to(card, {
                    z: 0,
                    scale: 1,
                    opacity: 1,
                    duration: 2, 
                    ease: "power3.out"
                }, index * 3.5); // More spacing between cards

                // 2. DELIBERATE PAUSE
                tl.to(card, {
                    scale: 1.02, 
                    duration: 2.5, // Significant pause to be "visible"
                    ease: "none"
                });

                // 3. EXIT
                if (!isLast) {
                    const direction = index % 2 === 0 ? -150 : 50; 
                    tl.to(card, {
                        xPercent: direction,
                        opacity: 0,
                        duration: 1.8,
                        ease: "power2.inOut"
                    });
                }
            });

        }, containerRef);

        return () => {
            ctx.revert();
        };
    }, [projects]);

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden flex flex-col items-center perspective-[1200px]">
            {children && (
                <div ref={headerWrapperRef} className="w-full relative z-30">
                    {children}
                </div>
            )}
            <div ref={wrapperRef} className="relative w-full flex-grow transform-style-3d mb-20">
                {projects.map((project, i) => (
                    <div
                        key={project.id}
                        ref={(el) => (cardsRef.current[i] = el)}
                        className="w-[90vw] max-w-[1250px] aspect-[16/7.5] md:aspect-[2.3/1] rounded-2xl overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.9)] border border-white/5 group bg-black"
                    >
                        {/* ─── HUD FRAME DECORATIONS ─── */}
                        <div className="absolute inset-0 z-20 pointer-events-none">
                            {/* Empty space for cleaner look */}
                        </div>

                        {/* ─── IMAGE LAYER ─── */}
                        <div className="absolute inset-0 w-full h-full z-0">
                            {project.image && (
                                <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover opacity-50 grayscale-[0.2] group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[2000ms] ease-out"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-px bg-white/5" />
                        </div>

                        {/* ─── CONTENT LAYER ─── */}
                        <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 lg:px-16 lg:pb-12 z-20 flex flex-col justify-end pointer-events-none">
                            <motion.div 
                                className="flex items-center gap-3 mb-4"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, delay: 0.2 }}
                            >
                                <div className="h-[2px] w-8 bg-[#FF3E00] shadow-[0_0_10px_#FF3E00]" />
                                <span className="font-mono text-xs uppercase tracking-[0.5em] text-[#FF3E00] font-black drop-shadow-md">
                                    {project.category}
                                </span>
                            </motion.div>

                            <div className="flex justify-between items-end w-full">
                                <div className="flex flex-col">
                                    <h3 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none uppercase tracking-tighter drop-shadow-2xl" style={{ fontFamily: 'Syne, sans-serif' }}>
                                        {project.title}
                                    </h3>
                                </div>

                                <div className="hidden lg:flex flex-col items-center gap-2 pointer-events-auto transition-all duration-500 cursor-pointer">
                                    <Link to={project.link || "#"} className="relative w-20 h-20 flex items-center justify-center group/btn">
                                        {/* HUD Circle Border */}
                                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="1" fill="none" className="text-white/10" />
                                            <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="30 271.8" className="text-[#FF3E00] group-hover/btn:stroke-white transition-all duration-500" />
                                        </svg>
                                        <svg className="w-8 h-8 text-white group-hover/btn:scale-125 group-hover/btn:text-[#FF3E00] transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                    <span className="font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase group-hover/btn:text-[#FF3E00] transition-colors mt-2">ACCESS_RECORD</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
