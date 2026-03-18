import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const panels = [
    {
        id: 'evo-1',
        year: 'WEB 1.0',
        title: 'STATIC',
        desc: 'The age of information. Flat. Silent. Unmoving.',
        color: '#0E0E0E',
        text: '#EBE9DF',
        accent: '#D16D6A',
        gradient: 'from-[#D16D6A]/60 via-[#0E0E0E]/80 to-transparent',
        image: '/images/web_1.png'
    },
    {
        id: 'evo-2',
        year: 'WEB 2.0',
        title: 'SOCIAL',
        desc: 'Connection. Dynamic data. But still trapped in the box.',
        color: '#05131A',
        text: '#00E5C3',
        accent: '#00E5C3',
        gradient: 'from-[#00E5C3]/50 via-[#05131A]/80 to-transparent',
        image: '/images/web_2.png'
    },
    {
        id: 'evo-3',
        year: 'WEB 3.0',
        title: 'DIGITAL',
        desc: 'Ownership. Value. The beginning of the merge.',
        color: '#0A0516',
        text: '#B794F4',
        accent: '#B794F4',
        gradient: 'from-[#B794F4]/50 via-[#0A0516]/80 to-transparent',
        image: '/images/web_3.png'
    },
    {
        id: 'evo-4',
        year: 'TYPE 7',
        title: 'SENTIENT',
        desc: 'The interface is alive. It watches you. It reacts.',
        color: '#0A0A0A',
        text: '#D16D6A',
        accent: '#D16D6A',
        gradient: 'from-[#D16D6A]/60 via-[#0A0A0A]/80 to-transparent',
        image: '/images/type_7.png'
    }
];

import { KineticBackground } from './KineticBackground';

export const HorizontalScrollSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [progress, setProgress] = React.useState(0);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        const wrapper = wrapperRef.current;
        const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

        if (!container || !wrapper || cards.length === 0) return;

        ScrollTrigger.getById('h-pin')?.kill();

        const ctx = gsap.context(() => {
            const getScrollAmount = () => wrapper.scrollWidth - window.innerWidth;

            const updateCards = () => {
                const viewportCenter = window.innerWidth / 2;
                cards.forEach(card => {
                    const rect = card.getBoundingClientRect();
                    const cardCenter = rect.left + rect.width / 2;
                    const dist = Math.abs(viewportCenter - cardCenter);
                    const maxDist = window.innerWidth * 0.7;
                    const t = Math.max(0, Math.min(1, dist / maxDist));
                    card.style.transform = `scale(${1 - t * 0.22})`;
                    card.style.opacity = String(1 - t * 0.55);
                });
            };

            const tl = gsap.timeline({
                scrollTrigger: {
                    id: 'h-pin',
                    trigger: container,
                    start: 'top top',
                    end: () => `+=${getScrollAmount()}`,
                    pin: true,
                    pinSpacing: true,
                    scrub: 1.5,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    snap: {
                        snapTo: 1 / (panels.length - 1),
                        duration: { min: 0.3, max: 0.6 },
                        delay: 0.15,
                        ease: 'power2.out',
                    },
                    onUpdate: (self) => {
                        updateCards();
                        setProgress(self.progress);
                    },
                    onRefresh: updateCards,
                },
            });

            tl.to(wrapper, {
                x: () => -getScrollAmount(),
                ease: 'none'
            });

            timelineRef.current = tl;
        }, container);

        return () => {
            ctx.revert();
            timelineRef.current?.kill();
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
                        ref={(el) => (cardsRef.current[i] = el)}
                        className="flex-none w-[85vw] md:w-[70vw] h-[75vh] mx-4 md:mx-10 relative overflow-hidden rounded-2xl group border border-white/20 shadow-[0_40px_100px_rgba(0,0,0,0.8)] backdrop-blur-sm"
                        style={{ backgroundColor: `${panel.color}dd`, willChange: 'transform, opacity', transition: 'transform 0.08s linear, opacity 0.08s linear' }}
                    >
                        {/* Abstract Background Layer */}
                        <div className="absolute inset-0 z-0">
                            <img 
                                src={panel.image} 
                                alt={panel.title} 
                                className="w-full h-full object-cover select-none opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-70 transition-all duration-1000" 
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t ${panel.gradient}`} />
                            {/* Colored noise scanlines */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:100%_3px] pointer-events-none" />
                        </div>

                        {/* Content Layer */}
                        <div className="absolute inset-x-0 bottom-0 p-8 md:p-16 z-10 flex flex-col justify-end h-full">
                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="font-mono text-xs md:text-sm tracking-[0.3em] px-3 py-1 bg-black/50 text-white backdrop-blur-md rounded-full border border-white/20">
                                            FIG. {i+1}
                                        </span>
                                        <span className="font-mono text-sm tracking-[0.2em] font-bold" style={{ color: panel.accent }}>
                                            // {panel.year}
                                        </span>
                                    </div>
                                    
                                    <h2
                                        className="text-6xl md:text-8xl xl:text-[9rem] font-black uppercase leading-[0.85] tracking-tighter mb-6 transition-colors duration-500"
                                        style={{ fontFamily: 'Syne, sans-serif', color: panel.text }}
                                    >
                                        {panel.title}
                                    </h2>
                                    
                                    <p className="text-lg md:text-2xl font-mono max-w-2xl border-l-[3px] pl-6 text-white/80"
                                        style={{ borderColor: panel.accent }}
                                    >
                                        {panel.desc}
                                    </p>
                                </div>
                                
                                {/* Interactive Prompts */}
                                <div className="hidden lg:flex flex-col items-end gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                                    <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center" style={{ color: panel.accent }}>
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                    <span className="font-mono text-[10px] uppercase tracking-widest font-bold" style={{ color: panel.accent }}>
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
