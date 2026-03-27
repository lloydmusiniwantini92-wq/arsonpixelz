import React, { useRef, useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonials, Testimonial } from '../data/testimonials';
import { KineticBackground } from '../components/fx/KineticBackground';

gsap.registerPlugin(ScrollTrigger);

// Signal color palette — one per transmission entity
const SIGNAL_COLORS: Record<string, { primary: string; glow: string; rgb: string }> = {
    'trans-01': { primary: '#D16D6A', glow: 'rgba(209,109,106,0.35)', rgb: '209,109,106' },
    'trans-02': { primary: '#00E5C3', glow: 'rgba(0,229,195,0.35)',   rgb: '0,229,195'   },
    'trans-03': { primary: '#B794F4', glow: 'rgba(183,148,244,0.35)', rgb: '183,148,244' },
    'trans-04': { primary: '#F6AD55', glow: 'rgba(246,173,85,0.35)',  rgb: '246,173,85'  },
    'trans-05': { primary: '#63B3ED', glow: 'rgba(99,179,237,0.35)',  rgb: '99,179,237'  },
};

const SIGNAL_STRENGTH = [87, 94, 76, 91, 83]; // per card
const ENCRYPT_LEVELS  = ['AES-∞', 'QUANT-7', 'VOID-X', 'NEO-13', 'DEEP-0'];

const TestimonialCard: React.FC<{ item: Testimonial; index: number; cardRef: (el: HTMLDivElement | null) => void }> = ({ item, index, cardRef }) => {
    const sig = SIGNAL_COLORS[item.id] ?? SIGNAL_COLORS['trans-01'];
    const strength = SIGNAL_STRENGTH[index] ?? 88;
    const encLevel = ENCRYPT_LEVELS[index] ?? 'AES-∞';
    const signalNum = item.id.split('-')[1];

    return (
        <div
            ref={cardRef}
            className="flex-none w-[85vw] md:w-[68vw] lg:w-[48vw] h-[78vh] mx-4 md:mx-6 relative group"
            style={{ perspective: '1000px' }}
        >
            {/* ── OUTER PLASMA GLOW ── */}
            <div
                className="absolute -inset-[2px] rounded-lg opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                    background: `conic-gradient(from 0deg, ${sig.primary}, transparent 40%, ${sig.primary}88 60%, transparent 80%, ${sig.primary})`,
                    animation: 'plasma-spin 4s linear infinite',
                    filter: `blur(1px)`,
                }}
            />

            {/* ── CARD BODY ── */}
            <div
                className="relative w-full h-full rounded-lg overflow-hidden flex flex-col"
                style={{
                    background: `linear-gradient(135deg, #080808 0%, #0d0d0d 50%, #080808 100%)`,
                    boxShadow: `0 0 60px ${sig.glow}, inset 0 0 60px rgba(0,0,0,0.8)`,
                    backdropFilter: 'blur(20px)',
                }}
            >

                {/* ── BACKGROUND PHOTO ── */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={item.image}
                        alt={item.alias}
                        className="w-full h-full object-cover opacity-15 group-hover:opacity-25 group-hover:scale-105 transition-all duration-1500 ease-out grayscale"
                    />
                    {/* Deep vignette */}
                    <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 60% 40%, rgba(${sig.rgb},0.08) 0%, #000 70%)` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040404] via-transparent to-[#040404]/80" />
                </div>

                {/* ── SCANLINE SWEEP ── */}
                <div
                    className="absolute inset-x-0 h-[2px] z-30 pointer-events-none opacity-0 group-hover:opacity-100"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${sig.primary}88, transparent)`,
                        animation: 'scanline-sweep 2.5s ease-in-out infinite',
                    }}
                />

                {/* ── CRT SCANLINES ── */}
                <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.025]"
                    style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)' }} />

                {/* ── TOP HUD BAR ── */}
                <div className="relative z-20 flex items-center justify-between px-6 pt-5 pb-3 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: sig.primary, boxShadow: `0 0 8px ${sig.primary}` }} />
                        <span className="font-mono text-[9px] tracking-[0.45em] uppercase" style={{ color: sig.primary }}>
                            SIGNAL_NODE_{signalNum}
                        </span>
                    </div>
                    <div className="flex items-center gap-4 font-mono text-[9px] text-white/20 tracking-[0.3em] uppercase">
                        <span className="group-hover:text-white/50 transition-colors duration-500">{encLevel}</span>
                        <span className="text-white/10">|</span>
                        <span style={{ color: `${sig.primary}99` }}>{item.location}</span>
                    </div>
                </div>

                {/* ── SIGNAL STRENGTH STRIP ── */}
                <div className="relative z-20 px-6 pt-3 flex items-center gap-3">
                    <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest">SIG_STR</span>
                    <div className="flex gap-[3px]">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div
                                key={i}
                                className="w-[5px] h-[10px] rounded-[1px] transition-all duration-700 group-hover:opacity-100"
                                style={{
                                    backgroundColor: i < Math.round(strength / 100 * 12) ? sig.primary : 'rgba(255,255,255,0.06)',
                                    opacity: i < Math.round(strength / 100 * 12) ? (0.4 + (i / 12) * 0.6) : 1,
                                    boxShadow: i < Math.round(strength / 100 * 12) ? `0 0 4px ${sig.primary}88` : 'none',
                                }}
                            />
                        ))}
                    </div>
                    <span className="font-mono text-[9px]" style={{ color: sig.primary }}>{strength}%</span>
                </div>

                {/* ── MAIN CONTENT ── */}
                <div className="relative z-20 flex flex-col justify-end flex-1 px-8 pb-8 pt-6">

                    {/* Quote */}
                    <div className="mb-8 relative">
                        {/* Opening glyph */}
                        <div className="font-serif text-[4rem] leading-none mb-2 select-none" style={{ color: `${sig.primary}40` }}>"</div>
                        <p
                            className="font-syne text-xl md:text-2xl xl:text-3xl font-bold leading-tight text-white/70 group-hover:text-white/95 transition-colors duration-700 uppercase -mt-4"
                            style={{ animation: 'signal-flicker 8s ease-in-out infinite', textShadow: `0 0 30px ${sig.glow}` }}
                        >
                            {item.transmission}
                        </p>
                    </div>

                    {/* Energy divider */}
                    <div className="relative h-[1px] mb-8 overflow-hidden">
                        <div className="absolute inset-0 bg-white/5" />
                        <div
                            className="absolute inset-y-0 left-0 w-0 group-hover:w-full transition-all duration-1000 ease-out"
                            style={{ background: `linear-gradient(90deg, ${sig.primary}, ${sig.primary}00)` }}
                        />
                    </div>

                    {/* Identity footer */}
                    <div className="flex items-end justify-between">
                        <div>
                            <div className="font-mono text-[9px] text-white/20 uppercase tracking-[0.3em] mb-2">[ENCRYPTED_ID] // DECODING…</div>
                            <h3
                                className="font-syne text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none mb-1"
                                style={{ color: sig.primary, textShadow: `0 0 20px ${sig.glow}` }}
                            >
                                {item.alias}
                            </h3>
                            <p className="font-mono text-[10px] text-white/40 tracking-[0.35em] uppercase">{item.role}</p>
                        </div>

                        {/* Data chips */}
                        <div className="flex flex-col items-end gap-2">
                            {item.tags.map(tag => (
                                <div
                                    key={tag}
                                    className="font-mono text-[8px] uppercase tracking-widest px-3 py-1 border opacity-30 group-hover:opacity-80 transition-all duration-500"
                                    style={{ borderColor: `${sig.primary}40`, color: sig.primary, background: `${sig.primary}08` }}
                                >
                                    // {tag}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── CORNER BRACKETS ── */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 opacity-20 group-hover:opacity-80 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all duration-500" style={{ borderColor: sig.primary }} />
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 opacity-20 group-hover:opacity-80 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" style={{ borderColor: sig.primary }} />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 opacity-20 group-hover:opacity-80 group-hover:-translate-x-1 group-hover:translate-y-1 transition-all duration-500" style={{ borderColor: sig.primary }} />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 opacity-20 group-hover:opacity-80 group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-500" style={{ borderColor: sig.primary }} />

            </div>
        </div>
    );
};

export const TestimonialsPage: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        const container = containerRef.current;
        const wrapper = wrapperRef.current;
        const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

        if (!container || !wrapper) return;

        const ctx = gsap.context(() => {
            const getScrollAmount = () => wrapper.scrollWidth - window.innerWidth;

            const updateCards = () => {
                const viewportCenter = window.innerWidth / 2;
                cards.forEach(card => {
                    const rect = card.getBoundingClientRect();
                    const cardCenter = rect.left + rect.width / 2;
                    const dist = Math.abs(viewportCenter - cardCenter);
                    const maxDist = window.innerWidth * 0.8;
                    const t = Math.max(0, Math.min(1, dist / maxDist));
                    
                    gsap.set(card, {
                        scale: 1 - t * 0.1,
                        opacity: 1 - t * 0.5,
                        rotateY: (cardCenter < viewportCenter ? 1 : -1) * (t * 5),
                        overwrite: 'auto',
                    });
                });
            };

            gsap.to(wrapper, {
                x: () => -getScrollAmount(),
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: () => `+=${getScrollAmount()}`,
                    pin: true,
                    scrub: 1.5,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        updateCards();
                        setProgress(self.progress);
                    },
                    onRefresh: () => updateCards(),
                }
            });

            // Animate background header as we scroll
            gsap.to(headerRef.current, {
                opacity: 0.05,
                scale: 0.85,
                color: '#D16D6A',
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: () => `+=${getScrollAmount()}`,
                    scrub: true,
                }
            });

            // Initial entrance for header
            gsap.from(headerRef.current, {
                opacity: 0,
                scale: 1.1,
                duration: 1.5,
                ease: "power3.out"
            });

            // Cinematic Page Wipe for entire container
            gsap.from(container, {
                opacity: 0,
                filter: 'blur(12px)',
                scale: 1.04,
                duration: 1.4,
                ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
                clearProps: 'filter,scale'
            });

        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#020202] overflow-hidden relative">
            
            {/* Unified Stark-Tech Background */}
            <KineticBackground progress={progress} className="opacity-20" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
            
            {/* ── BACKGROUND HEADER PANEL ── */}
            <div 
                ref={headerRef} 
                className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-0 select-none text-center"
            >
                <div className="inline-block px-4 py-1 mb-8 border border-[#D16D6A]/40 w-fit">
                    <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-[#D16D6A]">/// SIGNAL ECHOES // ENCODED</span>
                </div>
                <h1 className="font-syne font-black text-white leading-[0.85] tracking-[-0.03em] uppercase mb-8 drop-shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full text-center" style={{ fontSize: 'clamp(4rem, 8.5vw, 12rem)' }}>
                    NETWORK<br />TRAFFIC
                </h1>
                <p className="font-mono text-white/30 text-xs md:text-xl max-w-3xl px-6 leading-relaxed">
                    Intercepted communications from the Arson Pixelz network. 
                    Validated success patterns from <span className="text-white">Sector 01</span> to the <span className="text-white">Outer Rim</span>.
                </p>
                
                <div className="mt-12 flex items-center gap-6">
                    <div className="w-40 h-[1px] bg-white/10" />
                    <span className="font-mono text-[10px] text-white/20 tracking-[0.5em] uppercase animate-pulse">Scanning Stream...</span>
                    <div className="w-40 h-[1px] bg-white/10" />
                </div>
            </div>

            <div ref={wrapperRef} className="flex items-center h-screen will-change-transform px-[15vw]">
                {/* Space for the background header to be fully visible at start - push cards off screen */}
                <div className="flex-none w-[100vw] h-screen" />

                {/* ── TESTIMONIAL CARDS ── */}
                {testimonials.map((item, index) => (
                    <TestimonialCard 
                        key={item.id} 
                        item={item} 
                        index={index} 
                        cardRef={(el) => (cardsRef.current[index] = el)} 
                    />
                ))}

                {/* ── CALL TO ACTION CARD (UNTOUCHED CTA) ── */}
                <div
                    onClick={() => navigate('/contact')}
                    className="flex-none w-[85vw] md:w-[45vw] h-[75vh] mx-4 md:mx-8 relative overflow-hidden rounded-sm group border border-[#D16D6A]/30 bg-white/5 flex items-center justify-center cursor-pointer transition-colors duration-500 hover:bg-[#D16D6A] z-10"
                >
                    <div className="text-center group-hover:scale-105 transition-transform duration-700">
                        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30 group-hover:text-white mb-6 animate-pulse">
                            [END_OF_TRANSMISSION]
                        </div>
                        <h2 className="font-syne text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.9]">
                            JOIN THE <br />NETWORK
                        </h2>
                        <div className="relative inline-block px-12 py-4 bg-white text-black font-mono text-xs font-bold uppercase tracking-[0.3em] overflow-hidden group-hover:bg-black group-hover:text-white transition-colors duration-300">
                            <span className="relative z-10">Start Project</span>
                            <div className="absolute inset-0 bg-[#D16D6A] -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                        </div>
                    </div>
                </div>

            </div>

            {/* PROGRESS METER */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 h-[2px] bg-white/10 overflow-hidden z-30">
                <motion.div 
                    className="h-full bg-[#D16D6A]"
                    style={{ scaleX: progress, transformOrigin: 'left' }}
                />
            </div>
            
        </div>
    );
};

