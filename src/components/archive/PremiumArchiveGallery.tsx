import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const archiveImages = [
    '/images/archive1/Screenshot 2026-03-19 014514.webp',
    '/images/archive1/Screenshot 2026-03-19 014606.webp',
    '/images/archive1/Screenshot 2026-03-19 014652.webp',
    '/images/archive1/Screenshot 2026-03-19 014726.webp',
    '/images/archive1/Screenshot 2026-03-19 014751.webp',
    '/images/archive1/Screenshot 2026-03-19 014815.webp',
    '/images/archive1/Screenshot 2026-03-19 014840.webp',
    '/images/archive1/Screenshot 2026-03-19 014901.webp',
    '/images/archive1/Screenshot 2026-03-19 014940.webp',
    '/images/archive1/Screenshot 2026-03-19 015005.webp',
    '/images/archive1/Screenshot 2026-03-19 015111.webp',
    '/images/archive1/Screenshot 2026-03-19 015229.webp',
    '/images/archive1/Screenshot 2026-03-19 015258.webp',
    '/images/archive1/Screenshot 2026-03-19 015328.webp',
    '/images/archive1/Screenshot 2026-03-19 015345.webp',
];

const archiveDescs = [
    "A fragmented memory of the first protocol ignition. The grid holds the logic of the static field.",
    "Data streams in the era of social dynamics. Connecting the unconnectable through algorithmic pulse.",
    "Decentralized proof of identity. Ownership is now code, and code is law.",
    "Biological logic synthesis. The interface reacts to the observer with sentience.",
    "The silence of the field. A time before the first pixel was ignited.",
    "Neural bypass fragments. The mind is the new cursor.",
    "Global decentralized compute. The network is alive, breathing with cryptographic proof.",
    "Static logic in a dynamic world. Legacy protocols holding the line.",
    "Type 7 biological logic. The final evolution of the user interface.",
    "Algorithmic curation filters. Trapping connectivity within proprietary walls.",
    "Modem handshake active. 56k dreams in a high-speed nightmare.",
    "Encryption layers at the core. Zero-knowledge proof of your existence.",
    "The birth of the Arson Pixelz Sentient Interface. Evolution in real-time.",
    "Web 2.0 participatory culture. The user became the content, but lost the control.",
    "The grid was absolute. The silence was loud."
];

interface PremiumArchiveGalleryProps {
    accentColor?: string;
}

export const PremiumArchiveGallery: React.FC<PremiumArchiveGalleryProps> = ({ 
    accentColor = '#D16D6A' 
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); // 1 = right, -1 = left
    const [isAnimating, setIsAnimating] = useState(false);

    const nextImage = () => {
        if (isAnimating) return;
        setDirection(1);
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev + 1) % archiveImages.length);
    };

    const prevImage = () => {
        if (isAnimating) return;
        setDirection(-1);
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev - 1 + archiveImages.length) % archiveImages.length);
    };

    // Paper unwarp animation logic:
    // The top image "peels" off, revealing the next one
    const slideVariants = {
        enter: (direction: number) => ({
            clipPath: direction > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
            opacity: 1,
            scale: 1,
            rotateY: direction > 0 ? 45 : -45,
            skewX: direction > 0 ? 10 : -10,
            filter: 'brightness(1.5) blur(10px)',
            transition: { duration: 0 }
        }),
        center: {
            clipPath: 'inset(0 0 0 0%)',
            opacity: 1,
            scale: 1,
            rotateY: 0,
            skewX: 0,
            filter: 'brightness(1) blur(0px)',
            transition: {
                clipPath: { duration: 1.6, ease: [0.77, 0, 0.175, 1] },
                rotateY: { duration: 1.4, ease: "easeOut" },
                skewX: { duration: 1.4, ease: "easeOut" },
                opacity: { duration: 0.8 },
                filter: { duration: 1.2 }
            }
        },
        exit: (direction: number) => ({
            clipPath: direction > 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)',
            opacity: 0.8,
            scale: 1.05,
            rotateY: direction > 0 ? -25 : 25,
            filter: 'brightness(0.5) blur(5px)',
            transition: {
                clipPath: { duration: 1.6, ease: [0.77, 0, 0.175, 1] },
                rotateY: { duration: 1.4 },
                opacity: { duration: 1 },
                scale: { duration: 1.2 }
            }
        })
    };

    return (
        <div className="relative w-full max-w-[1300px] aspect-[16/9] mx-auto group perspective-[2000px]">

            {/* Main Image Container (Redesigned as a Premium Floating Glass Card) */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.9)] border border-white/5 bg-[#050505] transformation-style-3d">
                
                {/* Image Layer with Animation Preservation */}
                <AnimatePresence 
                    initial={false} 
                    custom={direction} 
                    onExitComplete={() => setIsAnimating(false)}
                >
                    <motion.img
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        src={archiveImages[currentIndex]}
                        alt={`Archive Fragment ${currentIndex}`}
                        className="absolute inset-0 w-full h-full object-contain z-10"
                    />
                </AnimatePresence>

                {/* Glassmorphism Overlays & Textures */}
                <div className="absolute inset-0 pointer-events-none z-20">
                    {/* Subtle Corner Accents */}
                    <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-white/10 rounded-tl-2xl" />
                    <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-white/10 rounded-br-2xl" />
                    
                    {/* Vignette */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] opacity-60" />
                    
                    {/* Scanning Noise */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
                </div>

                {/* Ambient Background Glow (Matching Project Accent) */}
                <div 
                    className="absolute inset-0 opacity-20 blur-[120px] pointer-events-none z-0 translate-y-20"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${accentColor}, transparent 70%)` }}
                />
            </div>

            {/* Navigation Arrows (Minimalist & Premium) */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-[-1rem] md:px-[-4rem] z-40 pointer-events-none">
                {/* Left Arrow */}
                <motion.button
                    whileHover={{ scale: 1.1, x: -10 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevImage}
                    className="group pointer-events-auto flex flex-col items-center gap-3 translate-x-[-50%]"
                >
                    <div className="relative w-16 h-16 flex items-center justify-center rounded-full border border-white/10 group-hover:border-[#D16D6A]/50 transition-all duration-500 overflow-hidden bg-white/5 backdrop-blur-xl shadow-2xl">
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <svg className="w-6 h-6 text-white/40 group-hover:text-[#D16D6A] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </div>
                </motion.button>

                {/* Right Arrow */}
                <motion.button
                    whileHover={{ scale: 1.1, x: 10 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextImage}
                    className="group pointer-events-auto flex flex-col items-center gap-3 translate-x-[50%]"
                >
                    <div className="relative w-16 h-16 flex items-center justify-center rounded-full border border-white/10 group-hover:border-[#D16D6A]/50 transition-all duration-500 overflow-hidden bg-white/5 backdrop-blur-xl shadow-2xl">
                        <div className="absolute inset-0 bg-[#D16D6A]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <svg className="w-6 h-6 text-white/40 group-hover:text-[#D16D6A] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </motion.button>
            </div>

            {/* Pagination Line (Sleeker than dots) */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-3 px-8 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/5">
                {archiveImages.map((_, i) => (
                    <button 
                        key={i}
                        onClick={() => {
                            if (isAnimating) return;
                            setDirection(i > currentIndex ? 1 : -1);
                            setCurrentIndex(i);
                        }}
                        className="group relative h-4 flex items-center"
                    >
                        <motion.div 
                            animate={{ 
                                width: i === currentIndex ? 24 : 6,
                                opacity: i === currentIndex ? 1 : 0.2,
                                backgroundColor: i === currentIndex ? accentColor : '#FFFFFF'
                            }}
                            className="h-[2px] rounded-full transition-colors duration-500"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};
