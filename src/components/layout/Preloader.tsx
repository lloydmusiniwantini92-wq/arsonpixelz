import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Phase = {
    label: string;
    detail: string;
};

const phases: Phase[] = [
    { label: 'INSTALLING VOID ENGINE', detail: 'Warming the cinematic layer stack & P-Logo rendering.' },
    { label: 'HYDRATING IDENTITY ASSETS', detail: 'Loading high-fidelity workspace textures.' },
    { label: 'STREAMLINING INTERACTION FIELD', detail: 'Aligning scroll depth and robotic arm kinematics.' },
];

export const Preloader: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState(0);

    useEffect(() => {
        let frame: number;
        let hideTimer: number | undefined;
        // Total duration matches the delay allocated in Hero.tsx (2400 + 200 hold = 2600ms)
        const duration = 2400;
        const holdAfterComplete = 200;
        const start = performance.now();

        const tick = (now: number) => {
            const elapsed = Math.max(0, now - start);
            const raw = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - raw, 3); // Cubic out
            setCount(Math.round(eased * 100));

            if (raw < 1) {
                frame = requestAnimationFrame(tick);
            } else {
                hideTimer = window.setTimeout(() => setIsLoading(false), holdAfterComplete);
            }
        };

        frame = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(frame);
            if (hideTimer) window.clearTimeout(hideTimer);
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = isLoading ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isLoading]);

    const activePhaseIndex = useMemo(() => {
        return Math.max(0, Math.min(phases.length - 1, Math.floor((count / 100) * phases.length)));
    }, [count]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[100] overflow-hidden bg-[#040404] text-[#EBE9DF]"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.4,
                        filter: 'blur(40px) brightness(2)',
                        transition: { duration: 0.85, ease: [0.85, 0, 0.15, 1] },
                    }}
                >
                    {/* Background Image Layer */}
                    <div className="absolute inset-0">
                        <img 
                            src="/images/command_center.png" 
                            alt="Command Center Workspace" 
                            className="w-full h-full object-cover object-center" 
                        />
                        {/* Dramatic vignette to focus on screens */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(0,0,0,0.6)_100%)]" />
                    </div>

                    {/* Scanline / CRT overlay for living tech feel */}
                    <div className="absolute inset-0 opacity-[0.15] mix-blend-screen pointer-events-none bg-[linear-gradient(transparent,rgba(255,255,255,0.06),transparent),repeating-linear-gradient(0deg,transparent_0,transparent_3px,rgba(255,255,255,0.08)_4px)]" />
                    
                    {/* HOLOGRAPHIC SCREEN OVERLAY (LEFT) */}
                    {/* Using 3D transform to match left-side holographic screen perspective */}
                    <div className="absolute left-[3%] top-[20%] bottom-[20%] w-[40%] max-w-[550px] flex flex-col justify-center pointer-events-none" style={{ perspective: '1200px' }}>
                        <motion.div 
                            className="w-full bg-black/50 backdrop-blur-[6px] rounded-2xl border border-white/10 p-8 shadow-[0_0_40px_rgba(209,109,106,0.15)]"
                            style={{ transform: 'rotateY(18deg) rotateX(4deg)', transformOrigin: 'right center' }}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-2 h-2 rounded-full bg-[#D16D6A] animate-pulse" />
                                <h2 className="font-mono text-xs uppercase tracking-[0.4em] text-[#D16D6A]">Protocol Sequence</h2>
                            </div>
                            
                            <div className="space-y-8">
                                {phases.map((phase, index) => {
                                    const isPast = activePhaseIndex > index;
                                    const isCurrent = activePhaseIndex === index;
                                    return (
                                        <div key={index} className="flex flex-col gap-3">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${isPast ? 'bg-white' : isCurrent ? 'bg-[#D16D6A] shadow-[0_0_15px_#D16D6A] scale-125' : 'bg-transparent border border-white/30'}`} />
                                                <span className={`font-mono text-sm tracking-widest transition-colors duration-300 ${isPast ? 'text-white' : isCurrent ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-white/30'}`}>
                                                    {index + 1}. {phase.label}
                                                </span>
                                            </div>
                                            {isCurrent && (
                                                <motion.div 
                                                    initial={{ opacity: 0, height: 0 }} 
                                                    animate={{ opacity: 1, height: 'auto' }} 
                                                    className="pl-7 font-mono text-[10px] text-[#D16D6A] tracking-[0.2em] uppercase"
                                                >
                                                    {phase.detail}
                                                </motion.div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-12 w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-gradient-to-r from-[#D16D6A]/50 via-white to-[#D16D6A]"
                                    animate={{ width: `${count}%` }}
                                    transition={{ duration: 0.1, ease: 'linear' }}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* TABLET OVERLAY (RIGHT/BOTTOM) */}
                    <div className="absolute right-[12%] bottom-[20%] w-[320px] pointer-events-none" style={{ perspective: '800px' }}>
                        <motion.div 
                            className="bg-black/70 backdrop-blur-md border border-[#D16D6A]/20 rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden"
                            style={{ transform: 'rotateX(35deg) rotateY(-18deg) rotateZ(3deg)' }}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(209,109,106,0.15),transparent_70%)]" />
                            
                            {/* Decorative graph lines */}
                            <svg className="absolute bottom-0 left-0 w-full h-1/2 opacity-20" viewBox="0 0 100 40" preserveAspectRatio="none">
                                <path d="M0,40 L10,30 L20,35 L40,15 L60,25 L80,5 L100,20 L100,40 Z" fill="rgba(209,109,106,0.5)" />
                                <polyline points="0,40 10,30 20,35 40,15 60,25 80,5 100,20" fill="none" stroke="#D16D6A" strokeWidth="1" />
                            </svg>

                            <span className="font-mono text-[10px] text-[#D16D6A] tracking-[0.5em] mb-4 uppercase text-center relative z-10">System Sync</span>
                            <div className="flex items-baseline gap-2 relative z-10">
                                <motion.span 
                                    className="text-[6rem] leading-none font-black tabular-nums tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                                    key={count}
                                    initial={{ opacity: 0.8, y: -2 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.1 }}
                                >
                                    {count}
                                </motion.span>
                                <span className="text-3xl text-[#D16D6A] font-bold">%</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* CENTER PLAQUE GLOW & DYNAMIC SHIMMER */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div 
                            className="w-[600px] h-[150px] bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,215,0,0.08),transparent_60%)] mix-blend-screen"
                            animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.95, 1.05, 0.95] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
};
