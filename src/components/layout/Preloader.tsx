import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import EatalyImg from '../assets/Eataly.jpg';
import PunoImg from '../assets/Puno.png';
import LevisImg from '../assets/Levis22.jpg';
import AboutImg from '../assets/ArsonPixelzAbout.jpg';

type Phase = {
    label: string;
    detail: string;
};

const frames = [
    { src: EatalyImg, title: 'EATALY', category: 'Luxury Commerce' },
    { src: PunoImg, title: 'PUNO', category: 'Brand Systems' },
    { src: LevisImg, title: 'LEVIS 22', category: 'Campaign Worlds' },
    { src: AboutImg, title: 'ARSONPIXELZ', category: 'Studio Core' },
];

const phases: Phase[] = [
    { label: 'Initializing void engine', detail: 'Warming the cinematic layer stack.' },
    { label: 'Hydrating identity assets', detail: 'Loading premium brand surfaces and motion cues.' },
    { label: 'Synchronizing interaction field', detail: 'Aligning scroll, depth, and magnetic response.' },
    { label: 'Launching experience shell', detail: 'Preparing the first strike.' },
];

export const Preloader: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState(0);

    useEffect(() => {
        let frame: number;
        let hideTimer: number | undefined;
        const duration = 3400;
        const holdAfterComplete = 500;
        const start = performance.now();

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
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = isLoading ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isLoading]);

    const activePhase = useMemo(() => {
        const index = Math.max(0, Math.min(phases.length - 1, Math.floor((count / 100) * phases.length)));
        return phases[index] || phases[0];
    }, [count]);

    const activeFrame = useMemo(() => {
        const index = Math.max(0, Math.min(frames.length - 1, Math.floor((count / 100) * frames.length)));
        return frames[index] || frames[0];
    }, [count]);

    const ringOffset = 339.292 - (339.292 * count) / 100;
    const beamWidth = `${18 + count * 0.72}%`;

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[100] overflow-hidden bg-[#040404] text-[#EBE9DF]"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.02,
                        filter: 'blur(22px)',
                        transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
                    }}
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(209,109,106,0.22),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(235,233,223,0.08),transparent_25%),radial-gradient(circle_at_50%_80%,rgba(209,109,106,0.15),transparent_30%)]" />
                    <div className="absolute inset-0 opacity-[0.14] mix-blend-screen bg-[linear-gradient(transparent,rgba(255,255,255,0.06),transparent),repeating-linear-gradient(0deg,transparent_0,transparent_3px,rgba(255,255,255,0.08)_4px)]" />
                    <motion.div
                        className="absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D16D6A]/20"
                        animate={{ rotate: -360, scale: [1, 1.04, 1] }}
                        transition={{ duration: 16, ease: 'easeInOut', repeat: Infinity }}
                    />

                    <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-10 lg:p-14">
                        <div className="flex items-start justify-between gap-6">
                            <div>
                                <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-white/45">ArsonPixelz Launch Sequence</p>
                                <h1 className="mt-3 max-w-xl text-2xl font-black uppercase tracking-[-0.04em] text-white md:text-4xl lg:text-5xl">
                                    A drastically more cinematic intro, tuned like a weapon.
                                </h1>
                            </div>
                            <div className="hidden text-right md:block">
                                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/30">Runtime</p>
                                <p className="mt-2 font-mono text-sm text-white/70">ARS-LD // V8.0</p>
                            </div>
                        </div>

                        <div className="grid flex-1 grid-cols-1 items-center gap-8 py-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
                            <div className="relative flex min-h-[320px] items-center justify-center lg:min-h-[420px]">
                                <motion.div
                                    className="absolute inset-0 m-auto h-[90%] w-full max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4.2, ease: 'easeInOut', repeat: Infinity }}
                                />

                                <div className="relative z-10 aspect-[4/5] w-[min(72vw,520px)] overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/40 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={activeFrame.src}
                                            src={activeFrame.src}
                                            alt={activeFrame.title}
                                            className="absolute inset-0 h-full w-full object-cover"
                                            initial={{ scale: 1.14, opacity: 0, filter: 'blur(16px)' }}
                                            animate={{ scale: 1, opacity: 0.84, filter: 'blur(0px)' }}
                                            exit={{ scale: 0.96, opacity: 0, filter: 'blur(18px)' }}
                                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                        />
                                    </AnimatePresence>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                    <motion.div
                                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#D16D6A]/30 via-white/20 to-transparent"
                                        animate={{ x: ['-15%', '115%'] }}
                                        transition={{ duration: 1.3, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.4 }}
                                        style={{ width: beamWidth, mixBlendMode: 'screen' }}
                                    />

                                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                                        <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.35em] text-white/60">
                                            <span>{activeFrame.category}</span>
                                            <span>{String(count).padStart(3, '0')} / 100</span>
                                        </div>
                                        <div className="mt-3 flex items-end justify-between gap-4">
                                            <div>
                                                <p className="text-3xl font-black uppercase tracking-[-0.05em] text-white md:text-5xl">{activeFrame.title}</p>
                                                <p className="mt-2 max-w-md text-sm text-white/65 md:text-base">{activePhase.detail}</p>
                                            </div>
                                            <div className="hidden h-12 w-12 rounded-full border border-white/15 lg:block" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-8">
                                <div className="flex items-center gap-6">
                                    <div className="relative h-32 w-32 md:h-40 md:w-40">
                                        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                                            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
                                            <motion.circle
                                                cx="60"
                                                cy="60"
                                                r="54"
                                                fill="none"
                                                stroke="#D16D6A"
                                                strokeWidth="4"
                                                strokeLinecap="round"
                                                strokeDasharray="339.292"
                                                animate={{ strokeDashoffset: ringOffset }}
                                                transition={{ duration: 0.25, ease: 'easeOut' }}
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">Sync</span>
                                            <span className="mt-1 text-3xl font-black tabular-nums md:text-4xl">{count}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#D16D6A]">Current phase</p>
                                        <p className="mt-3 text-2xl font-bold uppercase tracking-[-0.04em] text-white md:text-3xl">{activePhase.label}</p>
                                        <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/55 md:text-base">Precision loading for motion, artwork, and interaction layers so the first frame lands with more impact.</p>
                                    </div>
                                </div>

                                <div className="space-y-4 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
                                    {phases.map((phase, index) => {
                                        const completed = count >= ((index + 1) / phases.length) * 100;
                                        const current = activePhase.label === phase.label;
                                        return (
                                            <div key={phase.label} className="grid grid-cols-[auto_1fr] items-start gap-4">
                                                <div className={`mt-1 h-2.5 w-2.5 rounded-full transition-all ${completed || current ? 'bg-[#D16D6A] shadow-[0_0_18px_rgba(209,109,106,0.9)]' : 'bg-white/15'}`} />
                                                <div>
                                                    <p className={`font-mono text-[11px] uppercase tracking-[0.3em] ${current ? 'text-white' : 'text-white/40'}`}>{phase.label}</p>
                                                    <p className="mt-1 text-sm text-white/45">{phase.detail}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-white/35">Experience payload</p>
                                <div className="mt-3 h-[2px] w-full max-w-xl overflow-hidden rounded-full bg-white/10">
                                    <motion.div
                                        className="h-full rounded-full bg-gradient-to-r from-[#D16D6A] via-white to-[#D16D6A]"
                                        animate={{ width: `${count}%` }}
                                        transition={{ duration: 0.25, ease: 'easeOut' }}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-right">
                                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/30">Readying hero strike</p>
                                <div className="h-px w-14 bg-gradient-to-r from-transparent via-[#D16D6A] to-transparent" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
