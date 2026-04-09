import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollReveal } from '../components/fx/ScrollReveal';
import { RevealText } from '../components/fx/RevealText';

gsap.registerPlugin(ScrollTrigger);

const ScanlineOverlay = () => (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] pointer-events-none" />
        <div className="absolute inset-0 animate-scanline bg-gradient-to-b from-transparent via-[#FF3E00]/5 to-transparent h-20 w-full opacity-20 pointer-events-none" />
    </div>
);

import { useIgnition } from '../components/layout/IgnitionRuntime';

export const AboutPage = () => {
    const { lenis } = useIgnition();
    const containerRef = useRef<HTMLDivElement>(null);
    const constructTextRef = useRef<HTMLSpanElement>(null);
    const heroContentRef = useRef<HTMLDivElement>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
        window.scrollTo(0, 0);
        const CINEMATIC_EASE = 'cubic-bezier(0.76, 0, 0.24, 1)';
        setLoaded(true);

        const ctx = gsap.context(() => {
            if (!containerRef.current) return;

            // 1. Cinematic Page Entrance
            gsap.from(containerRef.current, {
                opacity: 0,
                duration: 1.2,
                ease: 'power2.inOut'
            });

            // 2. Specialized Hero Reveal
            if (heroContentRef.current) {
                const lines = heroContentRef.current.querySelectorAll('.hero-line');
                gsap.from(lines, {
                    opacity: 0,
                    y: 60,
                    filter: 'blur(15px)',
                    rotateX: -20,
                    stagger: 0.15,
                    duration: 1.4,
                    ease: CINEMATIC_EASE,
                    clearProps: 'all'
                });
            }

            // 3. Parallax Effects
            const parallaxItems = [
                { selector: '.hero-content-parallax', y: '-10%' },
                { selector: '.bg-parallax', y: '15%' }
            ];

            parallaxItems.forEach(item => {
                const el = containerRef.current?.querySelector(item.selector);
                if (el) {
                    gsap.to(el, {
                        y: item.y,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1
                        }
                    });
                }
            });

            // 4. Image Parallax (Studio Core)
            const teamImg = containerRef.current.querySelector('.team-img-parallax');
            if (teamImg) {
                gsap.fromTo(teamImg, 
                    { y: '-10%', scale: 1.05 },
                    { 
                        y: '10%',
                        scale: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: teamImg.parentElement,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true
                        }
                    }
                );
            }

            // 5. Magnetic Text Effect for "STUDIO CORE"
            if (constructTextRef.current) {
                const text = constructTextRef.current;
                const onMouseMove = (e: MouseEvent) => {
                    const { clientX, clientY } = e;
                    const { left, top, width, height } = text.getBoundingClientRect();
                    const x = (clientX - (left + width / 2)) * 0.15;
                    const y = (clientY - (top + height / 2)) * 0.15;
                    
                    gsap.to(text, {
                        x: x,
                        y: y,
                        duration: 0.6,
                        ease: 'power2.out'
                    });
                };

                const onMouseLeave = () => {
                    gsap.to(text, {
                        x: 0,
                        y: 0,
                        duration: 0.8,
                        ease: 'elastic.out(1, 0.3)'
                    });
                };

                const parent = text.closest('.construct-container');
                if (parent) {
                    parent.addEventListener('mousemove', onMouseMove as any);
                    parent.addEventListener('mouseleave', onMouseLeave);
                    return () => {
                        parent.removeEventListener('mousemove', onMouseMove as any);
                        parent.removeEventListener('mouseleave', onMouseLeave);
                    };
                }
            }

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative min-h-screen bg-[#000000] pt-48 md:pt-60 pb-40 px-6 md:px-12 overflow-hidden text-[#FFFFFF]">
            
            {/* Background Narrative Layers */}
            <div className="fixed inset-0 z-0 pointer-events-none select-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />
                <img 
                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1920&q=60&auto=format&fit=crop" 
                    alt="" 
                    className="bg-parallax absolute inset-0 w-full h-[130%] object-cover grayscale opacity-[0.35] mix-blend-screen" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>
            
            <div className="relative z-10 max-w-[1920px] mx-auto hero-content-parallax">
                <div ref={heroContentRef} className="flex flex-col space-y-2 md:space-y-4">
                    <div className="hero-line overflow-hidden">
                        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold uppercase tracking-tight leading-[0.85]" style={{ fontFamily: 'Anton, sans-serif' }}>
                            We Build
                        </h1>
                    </div>
                    <div className="hero-line overflow-hidden">
                        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold uppercase tracking-tight leading-[0.85] text-transparent bg-clip-text bg-gradient-to-r from-[#FF3E00] to-[#E63900]" style={{ fontFamily: 'Anton, sans-serif' }}>
                            Empires
                        </h1>
                    </div>
                    <div className="hero-line overflow-hidden">
                        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold uppercase tracking-tight leading-[0.85]" style={{ fontFamily: 'Anton, sans-serif' }}>
                            Not Pages.
                        </h1>
                    </div>
                </div>

                <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                    <div className="lg:col-span-8">
                        <ScrollReveal delay={0.6} className="text-xl md:text-3xl font-medium leading-relaxed text-[#FFFFFF]/80 max-w-4xl space-y-8">
                            <p>
                                Arson Pixelz wasn't founded to make "pretty websites." We exist to burn down the boring, the safe, and the templated.
                            </p>
                            <p>
                                We are a collective of rogue architects, aesthetic hardliners, and growth engineers. We believe that in a saturated digital ocean, the only way to survive is to be a tsunami.
                            </p>
                        </ScrollReveal>
                    </div>

                    <div className="lg:col-span-4 flex flex-col justify-end space-y-12">
                        <ScrollReveal staggerIndex={1} className="border-t border-white/20 pt-8 group cursor-default">
                            <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#FF3E00] block mb-4 group-hover:translate-x-2 transition-transform">
                                Directive 01
                            </span>
                            <h3 className="font-anton font-bold text-2xl uppercase text-[#FFFFFF]" style={{ fontFamily: 'Anton, sans-serif' }}>
                                Scorched Earth Policy
                            </h3>
                            <p className="mt-4 text-white/50 font-mono text-sm leading-relaxed">
                                We don't iterate on your competitors. We erase them. Our designs are built to dominate attention spans and monopolize market share.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal staggerIndex={2} className="border-t border-white/20 pt-8 group cursor-default">
                            <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#FF3E00] block mb-4 group-hover:translate-x-2 transition-transform">
                                Directive 02
                            </span>
                            <h3 className="font-anton font-bold text-2xl uppercase text-[#FFFFFF]" style={{ fontFamily: 'Anton, sans-serif' }}>
                                Speed is Safety
                            </h3>
                            <p className="mt-4 text-white/50 font-mono text-sm leading-relaxed">
                                Slow is dead. We build on hyper-optimized stacks (Vite, React, Rust-based tooling) to ensure your empire loads before they can blink.
                            </p>
                        </ScrollReveal>
                    </div>
                </div>
            </div>

            {/* Team / Image Section: STUDIO CORE */}
            <ScrollReveal amount={0.1} className="mt-40 max-w-[1920px] mx-auto">
                <div className="construct-container aspect-video w-full bg-[#050505] rounded-2xl overflow-hidden relative group border border-white/5 shadow-2xl">
                    <ScanlineOverlay />
                    <img
                        src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&q=60&auto=format&fit=crop"
                        alt="The Lab"
                        className="team-img-parallax w-full h-[120%] object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out"
                    />
                    
                    {/* Centered Holographic Text */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span 
                            ref={constructTextRef}
                            className={`
                                font-anton font-black text-white/40 uppercase select-none tracking-[0.2em] z-10 
                                transition-all duration-300 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]
                                text-[6vw] lg:text-[4vw]
                            `}
                            style={{ fontFamily: 'Anton, sans-serif' }}
                        >
                            Studio Core
                        </span>
                    </div>
                </div>
            </ScrollReveal>

            {/* EXPANDED CONTENT: METHODOLOGY */}
            <div className="mt-60 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 max-w-[1920px] mx-auto">
                <ScrollReveal>
                    <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#FF3E00] block mb-6">
                        Operational Doctrine
                    </span>
                    <h2 className="font-anton font-black text-5xl md:text-7xl uppercase text-[#FFFFFF] leading-none mb-8" style={{ fontFamily: 'Anton, sans-serif' }}>
                        Burn <br /> the <br /> Handbook.
                    </h2>
                </ScrollReveal>
                <div className="space-y-12">
                    <ScrollReveal delay={0.2}>
                        <p className="text-xl md:text-2xl font-medium leading-relaxed text-[#FFFFFF]/80 border-l-2 border-[#FF3E00] pl-8">
                            Traditional agencies play it safe. They iterate. They A/B test until the soul is sanded off.
                            We don't do that. We deploy "scorched earth" creativity—stripping away the noise until only the raw, undeniable signal remains.
                        </p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {[
                            { title: "Injection", desc: "We infiltrate your brand's core. We audit every pixel, every line of copy, every user interaction. We find the weak points." },
                            { title: "Ignition", desc: "We light the match. Visual overhaul, architectural restructuring, and aggressive positioning updates." },
                            { title: "Accelerant", desc: "Launch is just the start. We pour gasoline on what works using high-velocity feedback loops and AI-driven analytics." },
                            { title: "Dominion", desc: "Your brand becomes the standard. Competitors are forced to adapt or die." }
                        ].map((item, i) => (
                            <ScrollReveal key={i} staggerIndex={i} className="group">
                                <h4 className="font-anton font-bold text-xl uppercase mb-2 text-[#FF3E00] group-hover:translate-x-1 transition-transform inline-block" style={{ fontFamily: 'Anton, sans-serif' }}>
                                    {item.title}
                                </h4>
                                <p className="font-mono text-xs leading-relaxed text-white/50 group-hover:text-white/80 transition-colors">
                                    {item.desc}
                                </p>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>

            {/* SECTOR LOG */}
            <div className="mt-60 border-t border-white/10 pt-24 max-w-[1920px] mx-auto">
                <ScrollReveal className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20">
                    <h2 className="font-anton font-black text-5xl md:text-7xl uppercase text-[#FFFFFF]" style={{ fontFamily: 'Anton, sans-serif' }}>
                        Sector Log
                    </h2>
                    <p className="font-mono text-sm tracking-widest uppercase text-white/30 mt-4 md:mt-0">
                        Archive: 2020 - Present
                    </p>
                </ScrollReveal>

                <div className="space-y-0 relative">
                    <div className="absolute left-1 md:left-2 bottom-0 w-[1px] bg-white/10 hidden md:block" style={{ top: '2rem' }} />
                    {[
                        { year: "2024", event: "The Singularity", desc: "Arson Pixelz fully integrates Generative AI into all workflows. Production speed increases by 400%." },
                        { year: "2023", event: "Global Expansion", desc: "Remote command nodes established in Tokyo, London, and Berlin. Client base exceeds 50 enterprise accounts." },
                        { year: "2022", event: "Protocol: Breach", desc: "First major award win for 'Cyber-Brutalism' utility site. The industry takes notice." },
                        { year: "2020", event: "Genesis", desc: "Founded in a basement server room. Two laptops, too much caffeine, and a refusal to compromise." }
                    ].map((item, idx) => (
                        <ScrollReveal key={idx} staggerIndex={idx} yOffset={20}>
                            <div className="sector-log-item group border-b border-white/10 py-12 flex flex-col md:flex-row gap-8 md:gap-24 items-start hover:bg-white/5 transition-all duration-500 -mx-6 px-6 md:-mx-12 md:px-12 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#FF3E00]/0 to-[#FF3E00]/0 group-hover:to-[#FF3E00]/5 transition-all duration-700" />
                                <span className="relative z-10 font-mono text-3xl md:text-5xl font-bold text-[#FF3E00]/20 group-hover:text-[#FF3E00] transition-colors">
                                    {item.year}
                                </span>
                                <div className="relative z-10 flex-1">
                                    <h3 className="font-anton font-bold text-3xl uppercase text-[#FFFFFF] mb-2" style={{ fontFamily: 'Anton, sans-serif' }}>{item.event}</h3>
                                    <p className="font-mono text-sm text-white/50 max-w-lg group-hover:text-white/80 transition-colors">{item.desc}</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default AboutPage;
