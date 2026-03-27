import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Phase = {
    label: string;
    detail: string;
};

const phases: Phase[] = [
    { label: 'ARCHITECTING DIGITAL INFRASTRUCTURE', detail: 'Deploying high-performance frameworks' },
    { label: 'SYNTHESIZING BRAND IDENTITY', detail: 'Loading premium assets & interfaces' },
    { label: 'SYNCHRONIZING GROWTH SYSTEMS', detail: 'Optimizing for ultimate conversion impact' },
];

const flipImages = [
    '/images/offbrand_1.png',
    '/images/offbrand_2.png',
    '/images/offbrand_3.png',
    '/images/offbrand_4.png',
    '/images/offbrand_5.png'
];

const playCinematicCrescendo = () => {
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return () => {};
        const ctx = new AudioContext();
        
        // Osc 1: Deep core bass (A1)
        const osc1 = ctx.createOscillator();
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(55.0, ctx.currentTime);
        
        // Osc 2: Detuned growl to create a massive acoustic beat
        const osc2 = ctx.createOscillator();
        osc2.type = 'sawtooth';
        osc2.frequency.setValueAtTime(55.5, ctx.currentTime);
        
        // Osc 3: Sub-bass fundamental (A0)
        const osc3 = ctx.createOscillator();
        osc3.type = 'square';
        osc3.frequency.setValueAtTime(27.5, ctx.currentTime);
        
        // Master filter sweeping open aggressively (Zimmer brass simulation)
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(50, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(8000, ctx.currentTime + 2.7);
        filter.Q.setValueAtTime(10, ctx.currentTime); // High resonance for bite
        filter.Q.linearRampToValueAtTime(1, ctx.currentTime + 2.7);
        
        // Dynamic swelling master volume
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.8, ctx.currentTime + 2.5);
        gainNode.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 2.9);
        
        osc1.connect(filter);
        osc2.connect(filter);
        osc3.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc1.start();
        osc2.start();
        osc3.start();
        
        osc1.stop(ctx.currentTime + 3);
        osc2.stop(ctx.currentTime + 3);
        osc3.stop(ctx.currentTime + 3);

        let isCancelled = false;
        
        const resumeAudio = () => {
            if (isCancelled) return;
            if (ctx.state === 'suspended') {
                ctx.resume();
            }
            document.removeEventListener('click', resumeAudio);
            document.removeEventListener('keydown', resumeAudio);
        };

        if (ctx.state === 'suspended') {
            document.addEventListener('click', resumeAudio);
            document.addEventListener('keydown', resumeAudio);
        }
        
        // Strict cleanup to prevent rogue ghost-swells
        return () => {
            isCancelled = true;
            document.removeEventListener('click', resumeAudio);
            document.removeEventListener('keydown', resumeAudio);
            try { 
                osc1.stop(); osc2.stop(); osc3.stop(); 
                ctx.close(); 
            } catch(e) {}
        };

    } catch(e) { console.error('Audio failed to start'); return () => {}; }
};


export const Preloader: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [sessionStarted, setSessionStarted] = useState(false);
    const [count, setCount] = useState(0);
    const [imgIndex, setImgIndex] = useState(0);

    useEffect(() => {
        if (!sessionStarted) return;
        let frame: number;
        let hideTimer: number | undefined;
        const duration = 2800; // Slightly longer for cinematic weight
        const holdAfterComplete = 300;
        const start = performance.now();

        const killAudio = playCinematicCrescendo();

        const tick = (now: number) => {
            const elapsed = Math.max(0, now - start);
            const raw = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - raw, 3);
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
            if (killAudio) killAudio(); // Terminate Hans Zimmer immediately on unmount
        };
    }, [sessionStarted]);

    // MCU-style rapid Image Flip Logic
    useEffect(() => {
        if (!isLoading || !sessionStarted) return;
        const interval = setInterval(() => {
            setImgIndex(prev => (prev + 1) % flipImages.length);
        }, 90); // Fast but perceivable
        return () => clearInterval(interval);
    }, [isLoading, sessionStarted]);

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
                    className="fixed inset-0 z-[100] overflow-hidden bg-[#020202] text-[#EBE9DF] font-sans selection:bg-[#D16D6A]/30"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        filter: 'blur(30px)',
                        scale: 1.05,
                        transition: { duration: 1.2, ease: [0.7, 0, 0.3, 1] },
                    }}
                >
                    {/* INITIATE OVERLAY (Requires interaction to unlock Audio API) */}
                    <AnimatePresence>
                        {!sessionStarted && (
                            <motion.div 
                                className="absolute inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-2xl cursor-pointer group"
                                onClick={() => {
                                    setSessionStarted(true);
                                    window.dispatchEvent(new Event('sessionInitiated'));
                                }}
                                exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)', transition: { duration: 0.8, ease: 'easeIn' } }}
                            >
                                <div className="flex flex-col items-center gap-6">
                                    <span className="font-mono text-[10px] tracking-[0.5em] text-[#D16D6A] uppercase animate-pulse">System Standby</span>
                                    <button className="px-12 py-4 border border-[#D16D6A]/30 bg-black/40 text-[#EBE9DF] font-sans text-xs font-black tracking-[0.4em] uppercase transition-all duration-500 group-hover:bg-[#D16D6A]/10 group-hover:text-white group-hover:border-[#D16D6A] group-hover:shadow-[0_0_40px_rgba(209,109,106,0.5)]">
                                        Initiate Uplink
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Flashing Cinematic Background */}
                    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
                        <AnimatePresence mode="popLayout">
                            <motion.img
                                key={`bg-${imgIndex}`}
                                src={flipImages[imgIndex]}
                                className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 contrast-125"
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.08, ease: 'linear' }}
                            />
                        </AnimatePresence>
                        {/* Glitch Overlay for Background */}
                        <motion.div 
                            className="absolute inset-0 bg-[#D16D6A]/5 pointer-events-none mix-blend-overlay z-10"
                            animate={{ opacity: [0, 0.1, 0, 0.2, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>

                    {/* Heavy Vignette & Gradient for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-[1] pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/90 z-[1] pointer-events-none" />

                    {/* Background Noise / Grid Overlay */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-[2]" 
                        style={{ backgroundImage: 'radial-gradient(#EBE9DF 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} 
                    />

                    <div className="relative z-10 h-full w-full flex flex-col p-8 md:p-12 lg:p-16">
                        
                        {/* ── TOP HUD BAR ── */}
                        <div className="flex justify-between items-start border-b border-white/5 pb-6 mb-12 relative z-20">
                            <div className="flex flex-col gap-1">
                                <span className="font-mono text-[9px] tracking-[0.5em] text-white/40 uppercase">ArsonPixelz Digital Systems</span>
                                <div className="flex items-center gap-4">
                                    <span className="font-mono text-[10px] tracking-[0.2em] text-[#D16D6A] uppercase animate-pulse underline decoration-[#D16D6A]/30 underline-offset-4">Architecture Protocol Active</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className="font-mono text-[9px] tracking-[0.5em] text-white/40 uppercase">Environment // PROD // 2.0.4</span>
                                <div className="flex gap-1">
                                    {[...Array(4)].map((_, i) => (
                                        <motion.div 
                                            key={i} 
                                            className="w-px h-2 bg-[#D16D6A]"
                                            animate={{ opacity: [0.2, 1, 0.2] }}
                                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ── MAIN CONTENT ── */}
                        <div className="flex-1 flex items-center relative z-20">
                            
                            {/* THE WEAPON HEADLINE */}
                            <div className="flex flex-col gap-8 max-w-2xl">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black leading-[0.85] tracking-tighter uppercase mb-6 drop-shadow-2xl" style={{ fontFamily: 'Syne, sans-serif' }}>
                                        Forging<br />
                                        <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(235,233,223,0.3)' }}>Digital</span><br />
                                        Excellence &<br />
                                        <span className="text-[#D16D6A] drop-shadow-[0_0_15px_rgba(209,109,106,0.3)]">Innovation.</span>
                                    </h1>
                                </motion.div>

                                <div className="h-px w-24 bg-[#D16D6A]/40" />
                                
                                <p className="font-mono text-[11px] md:text-xs text-white/40 uppercase tracking-[0.3em] leading-relaxed max-w-md">
                                    Architecting premium web experiences, sophisticated brand identities, and relentless growth systems for industry leaders.
                                </p>

                                <div className="mt-4 flex items-center gap-4">
                                     <span className="font-mono text-[10px] tracking-[0.4em] text-white/60 uppercase">
                                         Instance #{imgIndex.toString().padStart(3, '0')} // Asset Render Active
                                     </span>
                                     <motion.div 
                                         className="w-1.5 h-1.5 bg-[#D16D6A] rounded-full"
                                         animate={{ opacity: [1, 0, 1] }}
                                         transition={{ duration: 0.5, repeat: Infinity }}
                                     />
                                </div>
                            </div>
                        </div>

                        {/* ── BOTTOM HUD FOOTER ── */}
                        <div className="grid md:grid-cols-2 gap-12 items-end mt-12">
                            
                            {/* PHASE CHECKLIST */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="font-mono text-[10px] tracking-[0.4em] text-white/50 uppercase">Current Phase</div>
                                    <div className="h-px flex-1 bg-white/10" />
                                </div>
                                <div className="bg-white/[0.02] border border-white/5 backdrop-blur-xl p-6 md:p-8 rounded-lg space-y-4">
                                    {phases.map((phase, i) => (
                                        <div key={i} className="flex items-center gap-6">
                                            <div className={`w-5 h-5 flex items-center justify-center border ${activePhaseIndex >= i ? 'bg-[#D16D6A] border-[#D16D6A] shadow-[0_0_15px_rgba(209,109,106,0.5)]' : 'border-white/20'}`}>
                                                {activePhaseIndex >= i && (
                                                    <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <span className={`font-mono text-xs tracking-widest uppercase ${activePhaseIndex >= i ? 'text-white font-bold' : 'text-white/20'}`}>
                                                    {i + 1} {phase.label}
                                                </span>
                                                <span className={`font-mono text-[9px] tracking-wider uppercase ${activePhaseIndex >= i ? 'text-[#D16D6A]/70' : 'text-white/10'}`}>
                                                    {phase.detail}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* RADIAL SYNC LOADER */}
                            <div className="flex justify-end pr-4">
                                <div className="relative flex items-center justify-center">
                                    {/* Radial Progress SVG */}
                                    <svg className="w-36 h-36 -rotate-90">
                                        <circle
                                            cx="72" cy="72" r="68"
                                            className="stroke-white/5"
                                            strokeWidth="1"
                                            fill="none"
                                        />
                                        <motion.circle
                                            cx="72" cy="72" r="68"
                                            className="stroke-[#D16D6A]"
                                            strokeWidth="2"
                                            fill="none"
                                            strokeDasharray="427"
                                            strokeDashoffset={427 - (427 * count) / 100}
                                            transition={{ duration: 0.1, ease: 'linear' }}
                                            style={{ filter: 'drop-shadow(0 0 8px #D16D6A)' }}
                                        />
                                        {/* Segmented Bit Ring */}
                                        <circle
                                            cx="72" cy="72" r="58"
                                            className="stroke-white/10"
                                            strokeWidth="4"
                                            strokeDasharray="2 6"
                                            fill="none"
                                        />
                                    </svg>

                                    {/* Center Text */}
                                    <div className="absolute flex flex-col items-center">
                                        <span className="font-mono text-[10px] tracking-[0.4em] text-white/40 uppercase mb-1">Sync</span>
                                        <div className="flex items-baseline gap-0.5">
                                            <span className="text-4xl font-black tracking-tighter tabular-nums" style={{ fontFamily: 'Syne, sans-serif' }}>
                                                {count}
                                            </span>
                                            <span className="text-[10px] text-[#D16D6A] font-light">%</span>
                                        </div>
                                    </div>

                                    {/* Animated Ring bit */}
                                    <motion.div 
                                        className="absolute w-40 h-40 border border-[#D16D6A]/20 rounded-full"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                                    >
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#D16D6A] rounded-full shadow-[0_0_10px_#D16D6A]" />
                                    </motion.div>
                                </div>
                            </div>

                        </div>

                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
};

