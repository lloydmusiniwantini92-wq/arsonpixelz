import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const archiveImages = [
    '/images/archive1/Screenshot 2026-03-19 014514.png',
    '/images/archive1/Screenshot 2026-03-19 014606.png',
    '/images/archive1/Screenshot 2026-03-19 014652.png',
    '/images/archive1/Screenshot 2026-03-19 014726.png',
    '/images/archive1/Screenshot 2026-03-19 014751.png',
    '/images/archive1/Screenshot 2026-03-19 014815.png',
    '/images/archive1/Screenshot 2026-03-19 014840.png',
    '/images/archive1/Screenshot 2026-03-19 014901.png',
    '/images/archive1/Screenshot 2026-03-19 014940.png',
    '/images/archive1/Screenshot 2026-03-19 015005.png',
    '/images/archive1/Screenshot 2026-03-19 015111.png',
    '/images/archive1/Screenshot 2026-03-19 015229.png',
    '/images/archive1/Screenshot 2026-03-19 015258.png',
    '/images/archive1/Screenshot 2026-03-19 015328.png',
    '/images/archive1/Screenshot 2026-03-19 015345.png',
];

const archiveDescs = [
    "A fragmented memory of the first protocol ignition. The grid holds the logic of the static void.",
    "Data streams in the era of social chaos. Connecting the unconnectable through algorithmic pulse.",
    "Decentralized proof of identity. Ownership is now code, and code is law.",
    "Biological logic synthesis. The interface reacts to the observer with sentience.",
    "The silence of the void. A time before the first pixel was ignited.",
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
        <div className="relative w-full max-w-[1200px] aspect-[16/9] mx-auto group">


            {/* Main Image Container */}
            <div className="relative w-full h-full bg-[#050505] rounded-lg overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
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
                        className="absolute inset-0 w-full h-full object-contain"
                    />
                </AnimatePresence>

                {/* Grid Overlay for technical feel */}
                <div className="absolute inset-0 pointer-events-none opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
                <div className="absolute inset-0 border border-white/5 z-10" />


            </div>

            {/* Navigation Arrows (Diamond Style) */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-[-2rem] md:px-[-6rem] z-40 pointer-events-none">
                {/* Left Arrow */}
                <motion.button
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevImage}
                    className="group pointer-events-auto flex flex-col items-center gap-2 translate-x-[-50%]"
                >
                    <div className="relative w-14 h-14 flex items-center justify-center rotate-45 border border-white/20 group-hover:border-white transition-colors overflow-hidden bg-black/40 backdrop-blur-md">
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="rotate-[-45deg] font-black text-white group-hover:text-accent font-syne text-lg">A</span>
                        {/* Diamond border animation */}
                        <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-white opacity-[0.05]" />
                    </div>
                    <span className="font-mono text-[8px] uppercase tracking-widest text-white/20 group-hover:text-white/60 transition-colors">PREV_FRAG</span>
                </motion.button>

                {/* Right Arrow (The "Unique Arrow") */}
                <motion.button
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextImage}
                    className="group pointer-events-auto flex flex-col items-center gap-2 translate-x-[50%]"
                >
                    <div className="relative w-14 h-14 flex items-center justify-center rotate-45 border border-white/20 group-hover:border-white transition-colors overflow-hidden bg-black/40 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="rotate-[-45deg] font-black text-white group-hover:text-accent font-syne text-lg">D</span>
                         {/* Diamond border animation */}
                         <div className="absolute top-[-50%] left-[-50%] w-full h-full bg-white opacity-[0.05]" />
                    </div>
                    <span className="font-mono text-[8px] uppercase tracking-widest text-white/20 group-hover:text-white/60 transition-colors">NEXT_FRAG</span>
                </motion.button>
            </div>

            {/* Pagination Dots */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-4">
                {archiveImages.map((_, i) => (
                    <button 
                        key={i}
                        onClick={() => {
                            if (isAnimating) return;
                            setDirection(i > currentIndex ? 1 : -1);
                            setCurrentIndex(i);
                        }}
                        className="group relative"
                    >
                        <motion.div 
                            animate={{ 
                                scale: i === currentIndex ? 1.5 : 1,
                                opacity: i === currentIndex ? 1 : 0.3
                            }}
                            className="w-2 h-2 rounded-full bg-white"
                        />
                        {i === currentIndex && (
                            <motion.div 
                                layoutId="active-dot"
                                className="absolute inset-[-4px] border border-white/20 rounded-full"
                            />
                        )}
                    </button>
                ))}
            </div>


        </div>
    );
};
