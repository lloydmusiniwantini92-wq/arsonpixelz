import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useIgnition } from './IgnitionRuntime';

interface PreloaderProps {
    onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
    const [isLoading, setIsLoading] = useState(true);
    const { lenis } = useIgnition();

    useEffect(() => {
        if (isLoading && lenis) {
            lenis.stop();
        }
        document.body.style.overflow = isLoading ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
            if (lenis) lenis.start();
        };
    }, [isLoading, lenis]);

    const handleEnter = () => {
        setIsLoading(false);
        if (lenis) lenis.start();
        window.dispatchEvent(new Event('sessionInitiated'));
        if (onComplete) onComplete();
    };

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div 
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: 'blur(20px)', transition: { duration: 1.2, ease: [0.7, 0, 0.3, 1] } }}
                    className="fixed inset-0 z-[200] bg-[#000000] text-white overflow-hidden font-sans selection:bg-[#FF3E00] selection:text-white flex flex-col items-center justify-center p-4 md:p-8"
                >
                    {/* --- BACKGROUND LAYERS --- */}
                    <motion.div 
                        animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.15, 0.1] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 z-0 mix-blend-screen"
                        style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=3270&auto=format&fit=crop')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'contrast(1.5) brightness(0.2) grayscale(1)',
                        }}
                    />
                    
                    <motion.div 
                        animate={{ scale: [1.05, 1, 1.05], opacity: [0.02, 0.08, 0.02] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 z-0 mix-blend-color-dodge"
                        style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=3270&auto=format&fit=crop')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'contrast(2) brightness(0.3)',
                        }}
                    />

                    <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_90%)]" />
                    <motion.div 
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(255,62,0,0.05)_0%,transparent_70%)]" 
                    />

                    <motion.div 
                        animate={{ opacity: [0.1, 0.2, 0.1] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" 
                    />
                    
                    {/* --- HUD LINES & ACCENTS --- */}
                    <motion.div animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-[20%] left-0 right-0 h-px bg-white/5 z-0" />
                    <motion.div animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="absolute top-[80%] left-0 right-0 h-px bg-white/5 z-0" />
                    
                    <motion.div animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 6, repeat: Infinity }} className="absolute left-[15%] top-0 bottom-0 w-px bg-white/5 z-0" />
                    <motion.div animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 7, repeat: Infinity, delay: 1 }} className="absolute right-[15%] top-0 bottom-0 w-px bg-white/5 z-0" />

                    {/* --- TOP STATUS BARS --- */}
                    <div className="absolute top-0 left-0 right-0 flex justify-between px-6 py-6 md:px-12 md:py-10 z-20 pointer-events-none">
                        <motion.div 
                            animate={{ y: [-1, 1, -1], opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="font-mono text-[9px] md:text-[10px] tracking-[0.4em] text-white/40 uppercase flex items-center gap-3">
                                <span className="text-white font-black bg-white/5 px-2 py-1 uppercase tracking-[0.2em]">Ignition Sequence</span> 
                            </div>
                        </motion.div>

                        <motion.div 
                            animate={{ y: [-1, 1, -1], opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        >
                            <div className="font-mono text-[9px] md:text-[10px] tracking-[0.4em] text-white/40 uppercase flex items-center gap-3">
                                <span className="text-white/20">STATUS:</span>
                                <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="text-[#FF3E00] font-black flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF3E00] shadow-[0_0_10px_#FF3E00]"></span> ONLINE
                                </motion.span>
                            </div>
                        </motion.div>
                    </div>

                    {/* --- MAIN CONTENT --- */}
                    <main className="relative z-20 flex flex-col items-center justify-center w-full max-w-[90rem] h-full">
                        
                        <div className="flex flex-col items-center justify-center flex-1 w-full gap-8 md:gap-12 translate-y-8">
                            <motion.div 
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                className="flex flex-col items-center w-full"
                            >
                                <div className="flex flex-col items-center leading-none text-center">
                                    <span className="font-syne text-[12vw] md:text-[120px] lg:text-[160px] font-black uppercase tracking-tighter text-white italic">
                                        ARSON_
                                    </span>
                                    <motion.span 
                                        animate={{ textShadow: ['0 0 20px rgba(255,62,0,0)', '0 0 40px rgba(255,62,0,0.4)', '0 0 20px rgba(255,62,0,0)'] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                        className="font-syne text-[15vw] md:text-[150px] lg:text-[200px] font-black uppercase tracking-tighter text-[#FF3E00] italic -mt-4 md:-mt-8"
                                    >
                                        PIXELZ
                                    </motion.span>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8, duration: 1 }}
                                className="flex flex-col items-center gap-6"
                            >
                                <p className="text-xs md:text-sm font-mono font-black text-white/40 text-center max-w-2xl tracking-[0.3em] uppercase leading-loose">
                                    Architecting high-impact digital infrastructures through brutalist industrial strategy and kinetic brand ignition.
                                </p>
                                                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-px bg-white/10" />
                                    <div className="w-12 h-px bg-white/10" />
                                </div>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                className="group cursor-pointer mt-12"
                                onClick={handleEnter}
                            >
                                <button className="relative px-12 py-6 bg-white text-black font-syne font-black uppercase tracking-[0.4em] text-[11px] overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95">
                                    <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                                        Enter
                                    </span>
                                    <div className="absolute inset-0 bg-[#FF3E00] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16, 1, 0.3, 1)]" />
                                </button>
                                
                                {/* Orbiting ring detail */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%+40px)] h-[calc(100%+40px)] border border-white/5 rounded-full pointer-events-none group-hover:border-[#FF3E00]/20 transition-colors duration-500" />
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%+40px)] h-[calc(100%+40px)] pointer-events-none"
                                >
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-[#FF3E00] rounded-full shadow-[0_0_10px_#FF3E00] opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.div>
                            </motion.div>
                        </div>

                    </main>

                    {/* --- BOTTOM HUD ELEMENTS --- */}
                     <div className="absolute bottom-0 left-0 right-0 flex justify-between px-6 py-6 md:px-12 md:py-10 z-20 pointer-events-none font-mono text-[8px] tracking-[0.4em] text-white/20">
                        <div className="flex items-center gap-4">
                            <span className="text-[#FF3E00]">01</span>
                            <div className="w-24 h-px bg-white/5" />
                        </div>

                        <div className="flex items-center gap-6">
                            <span className="text-white/40">© {new Date().getFullYear()}</span>
                        </div>
                    </div>


                </motion.div>
            )}
        </AnimatePresence>
    );
};

