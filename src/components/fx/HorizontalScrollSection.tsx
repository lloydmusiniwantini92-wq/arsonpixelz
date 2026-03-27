import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const panels = [
    {
        id: 'evo-1',
        year: 'PHASE 01',
        title: 'STRATEGY',
        desc: 'Systems Architecture. Decoupling noise from systemic value.',
        color: '#0E0E0E',
        text: '#EBE9DF',
        accent: '#D16D6A',
        gradient: 'from-[#D16D6A]/60 via-[#0E0E0E]/80 to-transparent',
        image: '/images/web_1.png'
    },
    {
        id: 'evo-2',
        year: 'PHASE 02',
        title: 'IDENTITY',
        desc: 'Cinematic Disruption. High-fidelity creative that cuts through the void.',
        color: '#05131A',
        text: '#00E5C3',
        accent: '#00E5C3',
        gradient: 'from-[#00E5C3]/50 via-[#05131A]/80 to-transparent',
        image: '/images/web_2.png'
    },
    {
        id: 'evo-3',
        year: 'PHASE 03',
        title: 'ENGINEERING',
        desc: 'Industrial Performance. Ecosystems built to scale without friction.',
        color: '#0A0516',
        text: '#B794F4',
        accent: '#B794F4',
        gradient: 'from-[#B794F4]/50 via-[#0A0516]/80 to-transparent',
        image: '/images/web_3.png'
    },
    {
        id: 'evo-4',
        year: 'PHASE 04',
        title: 'INTELLIGENCE',
        desc: 'Autonomous Systems. Integrating AI to create self-evolving platforms.',
        color: '#0A0A0A',
        text: '#D16D6A',
        accent: '#D16D6A',
        gradient: 'from-[#D16D6A]/60 via-[#0A0A0A]/80 to-transparent',
        image: '/images/type_7.png'
    }
];

import { KineticBackground } from './KineticBackground';

export const HorizontalScrollSection = () => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [progress, setProgress] = React.useState(0);

    useEffect(() => {
        const container = containerRef.current;
        const wrapper = wrapperRef.current;
        const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

        if (!container || !wrapper || cards.length === 0) return;

        ScrollTrigger.getById('h-pin')?.kill();

        const ctx = gsap.context(() => {
            const getScrollAmount = () => wrapper.scrollWidth - window.innerWidth;

            // Use GSAP to animate scale/opacity — never directly mutate style 
            // in a scroll callback, as that creates jitter fighting CSS transitions.
            const updateCards = () => {
                const viewportCenter = window.innerWidth / 2;
                cards.forEach(card => {
                    const rect = card.getBoundingClientRect();
                    const cardCenter = rect.left + rect.width / 2;
                    const dist = Math.abs(viewportCenter - cardCenter);
                    const maxDist = window.innerWidth * 0.8;
                    const t = Math.max(0, Math.min(1, dist / maxDist));
                    // Use gsap.set for compositor-friendly, jitter-free updates
                    gsap.set(card, {
                        scale: 1 - t * 0.08,   // subtler scale reduction
                        opacity: 1 - t * 0.4,   // subtler fade
                        overwrite: 'auto',
                    });
                });
            };

            // Read the return panel BEFORE timeline creation so we can use it in onRefresh
            const returnToPanel = sessionStorage.getItem('ap_return_panel');
            const returnIndex = returnToPanel 
                ? panels.findIndex(p => p.id === returnToPanel)
                : -1;
            if (returnToPanel) sessionStorage.removeItem('ap_return_panel');

            // Flag so we only restore scroll once
            let hasRestored = false;

            const tl = gsap.timeline({
                scrollTrigger: {
                    id: 'h-pin',
                    trigger: container,
                    start: 'top top',
                    end: () => `+=${getScrollAmount()}`,
                    pin: true,
                    pinSpacing: true,
                    scrub: 2.5,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    snap: {
                        snapTo: 1 / (panels.length - 1),
                        duration: { min: 0.6, max: 1.2 },
                        delay: 0.3,
                        ease: 'power1.inOut',
                    },
                    onUpdate: (self) => {
                        updateCards();
                        setProgress(self.progress);
                    },
                    onRefresh: (self) => {
                        updateCards();
                        // Restore exactly once, inside onRefresh where self.start/end are guaranteed
                        if (returnIndex !== -1 && !hasRestored) {
                            hasRestored = true;
                            const cardProgress = returnIndex / (panels.length - 1);
                            // Precise calculation using the ST's own resolved start/end
                            const targetY = self.start + cardProgress * (self.end - self.start);
                            
                            // Use double-rAF to ensure GSAP has fully applied pin-spacer heights 
                            // and the layout is stable before the jump.
                            requestAnimationFrame(() => {
                                requestAnimationFrame(() => {
                                    // Use ST's own scroll method OR window.scrollTo
                                    window.scrollTo({ top: targetY, behavior: 'instant' as ScrollBehavior });
                                    // Sync GSAP's own internal scroll position immediately
                                    self.scroll(targetY);
                                    updateCards();
                                });
                            });
                        }
                    },
                },
            });

            tl.to(wrapper, {
                x: () => -getScrollAmount(),
                ease: 'none'
            });

        }, container);

        return () => {
            ctx.revert();
            ScrollTrigger.getById('h-pin')?.kill();
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="w-full h-screen overflow-hidden relative bg-[#020202] z-10 flex items-center" 
        >
            {/* Unified Kinetic Background Engine */}
            <KineticBackground progress={progress} className="opacity-40" />

            {/* Ambient Noise Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            <div
                ref={wrapperRef}
                className="flex items-center h-full will-change-transform"
                style={{ 
                    paddingLeft: 'calc(50vw - 35vw)',
                    paddingRight: 'calc(50vw - 35vw)',
                }}
            >
                {panels.map((panel, i) => (
                    <div
                        key={panel.id}
                        id={panel.id}
                        ref={(el) => (cardsRef.current[i] = el)}
                        // No CSS transition on transform or opacity — GSAP owns those
                        className="flex-none w-[85vw] md:w-[70vw] h-[75vh] mx-4 md:mx-10 relative overflow-hidden rounded-2xl group border border-white/20 shadow-[0_40px_100px_rgba(0,0,0,0.8)] backdrop-blur-sm"
                        style={{ backgroundColor: `${panel.color}dd` }}
                    >
                        {/* Abstract Background Layer */}
                        <div className="absolute inset-0 z-0">
                            <img 
                                src={panel.image} 
                                alt={panel.title} 
                                className="w-full h-full object-cover select-none opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-70 transition-opacity transition-filter duration-1000 ease-out" 
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t ${panel.gradient}`} />
                            {/* Colored noise scanlines */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:100%_3px] pointer-events-none" />
                        </div>

                        {/* Content Layer */}
                        <div 
                            className="absolute inset-x-0 bottom-0 p-8 md:p-16 z-10 flex flex-col justify-end h-full cursor-pointer pointer-events-auto"
                            onClick={() => {
                                sessionStorage.setItem('ap_return_panel', panel.id);
                                navigate(`/archive/${panel.id}`);
                            }}
                        >
                            <div className="flex justify-between items-end">
                                <div className="flex-1 min-w-0 pr-4">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="font-mono text-xs md:text-sm tracking-[0.3em] px-3 py-1 bg-black/50 text-white backdrop-blur-md rounded-full border border-white/20">
                                            FIG. {i+1}
                                        </span>
                                        <span className="font-mono text-sm tracking-[0.2em] font-bold" style={{ color: panel.accent }}>
                                            // {panel.year}
                                        </span>
                                    </div>
                                    
                                    <h2
                                        className="text-4xl sm:text-5xl md:text-6xl xl:text-[6.5vw] font-black uppercase leading-[0.8] tracking-tighter mb-4 whitespace-nowrap"
                                        style={{ fontFamily: 'Syne, sans-serif', color: panel.text }}
                                    >
                                        {panel.title}
                                    </h2>
                                    
                                    <p className="text-lg md:text-xl xl:text-2xl font-mono max-w-xl border-l-[3px] pl-6 text-white/80"
                                        style={{ borderColor: panel.accent }}
                                    >
                                        {panel.desc}
                                    </p>
                                </div>
                                
                                <div 
                                    className="relative z-[30] shrink-0 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100 cursor-pointer pointer-events-auto flex flex-col items-end gap-3"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        sessionStorage.setItem('ap_return_panel', panel.id);
                                        navigate(`/archive/${panel.id}`);
                                    }}
                                >
                                    <div 
                                        className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-current flex items-center justify-center hover:scale-110 transition-transform duration-300 ease-out shadow-[0_0_20px_rgba(0,0,0,0.4)]" 
                                        style={{ color: panel.accent }}
                                    >
                                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                    <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest font-bold hidden md:block drop-shadow-md" style={{ color: panel.accent }}>
                                        ACCESS_ARCHIVE
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
