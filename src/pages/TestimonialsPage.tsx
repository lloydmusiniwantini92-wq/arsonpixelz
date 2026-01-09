import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { testimonials, Testimonial } from '../data/testimonials';

const TestimonialCard: React.FC<{ item: Testimonial; index: number }> = ({ item, index }) => {
    return (
        <motion.div
            className="relative flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[40vw] h-[70vh] mr-8 md:mr-16 overflow-hidden rounded-sm group"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-10%" }}
        >
            {/* Background Image with Parallax/Glitch Potential */}
            <div className="absolute inset-0 z-0">
                <img
                    src={item.image}
                    alt={item.alias}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/50 to-transparent mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F] via-transparent to-[#0F0F0F] opacity-60" />
            </div>

            {/* Overlay Grid */}
            <div className="absolute inset-0 z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

            {/* Content Container */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">

                {/* ID & Location Tag */}
                <div className="flex items-center gap-4 mb-6 font-mono text-[10px] md:text-xs tracking-[0.2em] text-white/50">
                    <span className="text-[#D16D6A]">/// {item.id}</span>
                    <span>{item.location}</span>
                </div>

                {/* Transmission Text */}
                <div className="relative mb-8">
                    <div className="absolute -left-4 top-0 bottom-0 w-[2px] bg-[#D16D6A] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />
                    <p className="font-syne text-xl md:text-3xl lg:text-4xl font-bold leading-tight text-white/90 group-hover:text-white transition-colors duration-300">
                        "{item.transmission}"
                    </p>
                </div>

                {/* Persona Info */}
                <div className="border-t border-white/10 pt-6 flex justify-between items-end">
                    <div>
                        <h3 className="font-syne text-2xl font-bold uppercase tracking-wide text-white mb-1">
                            {item.alias}
                        </h3>
                        <p className="font-mono text-xs text-[#D16D6A] tracking-widest uppercase">
                            {item.role}
                        </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-col items-end gap-2">
                        {item.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-white/5 border border-white/10 text-[9px] font-mono text-white/70 tracking-widest uppercase rounded-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hover Glitch Decorations */}
            <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        </motion.div>
    );
};

export const TestimonialsPage: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    const scrollContainer = (direction: 'left' | 'right') => {
        const container = containerRef.current;
        if (!container) return;

        const scrollAmount = window.innerWidth * 0.6; // Scroll by roughly one card width
        const targetScroll = direction === 'left'
            ? container.scrollLeft - scrollAmount
            : container.scrollLeft + scrollAmount;

        container.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });
    };

    return (
        <div className="min-h-screen bg-[#0F0F0F] pt-32 pb-20 overflow-x-hidden relative">

            {/* Header */}
            <div className="container mx-auto px-6 md:px-12 mb-12 md:mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-8"
                >
                    <div>
                        <span className="font-mono text-[#D16D6A] text-xs tracking-[0.3em] uppercase mb-4 block">
                            /// Incoming Transmissions
                        </span>
                        <h1 className="font-syne text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-2">
                            Network <br className="hidden md:block" /> Traffic
                        </h1>
                    </div>
                    <div className="flex flex-col items-end gap-8 mt-6 md:mt-0">
                        <p className="font-mono text-white/50 text-xs md:text-sm max-w-sm leading-relaxed text-right">
                            Intercepted communications from the Arson Pixelz network.
                            Validated success patterns from Sector 01 to the Outer Rim.
                        </p>

                        {/* Navigation Controls */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => scrollContainer('left')}
                                className="w-12 h-12 border border-white/10 flex items-center justify-center rounded-full hover:bg-white/5 hover:border-[#D16D6A] transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[#D16D6A] focus:ring-offset-2 focus:ring-offset-[#0F0F0F]"
                                aria-label="Scroll Left"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white/50 group-hover:text-white transition-colors">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                            <button
                                onClick={() => scrollContainer('right')}
                                className="w-12 h-12 border border-white/10 flex items-center justify-center rounded-full hover:bg-white/5 hover:border-[#D16D6A] transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[#D16D6A] focus:ring-offset-2 focus:ring-offset-[#0F0F0F]"
                                aria-label="Scroll Right"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white/50 group-hover:text-white transition-colors">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Horizontal Scroll Stream */}
            <div
                ref={containerRef}
                className="pl-6 md:pl-12 overflow-x-auto overflow-y-hidden hide-scrollbar flex items-center h-[75vh] cursor-grab active:cursor-grabbing"
                style={{ scrollBehavior: 'smooth' }}
            >
                <div className="flex">
                    {testimonials.map((item, index) => (
                        <TestimonialCard key={item.id} item={item} index={index} />
                    ))}

                    {/* Call to Action Card */}
                    <motion.div
                        className="relative flex-shrink-0 w-[85vw] md:w-[40vw] h-[70vh] mr-12 flex items-center justify-center border border-white/10 bg-white/5 rounded-sm hover:bg-[#D16D6A] group cursor-pointer transition-colors duration-500"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <div className="text-center group-hover:scale-110 transition-transform duration-500">
                            <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/50 group-hover:text-white mb-4 block">
                                End of Stream
                            </span>
                            <h2 className="font-syne text-4xl md:text-5xl font-bold text-white mb-6">
                                Join the<br />Network
                            </h2>
                            <span className="inline-block px-8 py-3 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest rounded-sm group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                Start Project
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>



            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};
