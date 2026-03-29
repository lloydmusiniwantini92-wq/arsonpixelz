import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const CINEMATIC_EASE = 'cubic-bezier(0.76, 0, 0.24, 1)';
        const ctx = gsap.context(() => {
            if (!containerRef.current) return;

            // 1. Cinematic Page Wipe
            gsap.from(containerRef.current, {
                opacity: 0,
                filter: 'blur(12px)',
                scale: 1.04,
                duration: 1.4,
                ease: CINEMATIC_EASE,
                clearProps: 'filter,scale'
            });

            // 2. Hero Parallax
            const heroTitle = containerRef.current.querySelector('.hero-title-parallax');
            const heroDesc = containerRef.current.querySelector('.hero-desc-parallax');

            if (heroTitle) {
                gsap.to(heroTitle, {
                    y: '-15%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: heroTitle,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.2
                    }
                });
            }
            if (heroDesc) {
                gsap.to(heroDesc, {
                    y: '-5%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: heroDesc,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1
                    }
                });
            }

            // 3. Image Parallax (The Construct)
            const teamImg = containerRef.current.querySelector('.team-img-parallax');
            if (teamImg) {
                gsap.fromTo(teamImg, 
                    { y: '-10%' },
                    { 
                        y: '10%',
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

            // 4. Staggered reveal for Sector Log items
            const logItems = gsap.utils.toArray('.sector-log-item');
            if (logItems.length) {
                gsap.from(logItems, {
                    opacity: 0,
                    y: 40,
                    stagger: 0.1,
                    duration: 1,
                    ease: CINEMATIC_EASE,
                    scrollTrigger: {
                        trigger: logItems[0] as HTMLElement,
                        start: 'top 85%'
                    }
                });
            }

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative min-h-screen bg-[#000000] pt-32 pb-20 px-6 md:px-12 overflow-hidden text-[#FFFFFF]">
            {/* Background Image Layer (High-Fidelity) */}
            <div className="absolute inset-0 z-0 overflow-hidden opacity-10 pointer-events-none">
                 <img 
                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2670&auto=format&fit=crop" 
                    alt="Agency Environment" 
                    className="w-full h-full object-cover grayscale mix-blend-overlay scale-105" 
                />
            </div>
            
            <div className="relative z-10 max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                {/* Left Col - Header */}
                <div className="lg:col-span-8">
                    <h1 className="hero-title-parallax font-syne font-black text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] uppercase text-[#FFFFFF] mb-12">
                        We Build <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3E00] to-[#E63900]"> empires </span> <br />
                        not pages.
                    </h1>

                    <div className="hero-desc-parallax text-xl md:text-3xl font-medium leading-relaxed text-[#FFFFFF]/80 max-w-4xl space-y-8">
                        <p>
                            Arson Pixelz wasn't founded to make "pretty websites." We exist to burn down the boring, the safe, and the templated.
                        </p>
                        <p>
                            We are a collective of rogue architects, aesthetic hardliners, and growth engineers. We believe that in a saturated digital ocean, the only way to survive is to be a tsunami.
                        </p>
                    </div>
                </div>

                {/* Right Col - Stats / details */}
                <div className="lg:col-span-4 flex flex-col justify-end space-y-12">
                    <div className="border-t border-white/20 pt-8">
                        <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#FF3E00] block mb-4">
                            Directive 01
                        </span>
                        <h3 className="font-syne font-bold text-2xl uppercase text-[#FFFFFF]">
                            Scorched Earth Policy
                        </h3>
                        <p className="mt-4 text-white/50 font-mono text-sm leading-relaxed">
                            We don't iterate on your competitors. We erase them. Our designs are built to dominate attention spans and monopolize market share.
                        </p>
                    </div>

                    <div className="border-t border-white/20 pt-8">
                        <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#FF3E00] block mb-4">
                            Directive 02
                        </span>
                        <h3 className="font-syne font-bold text-2xl uppercase text-[#FFFFFF]">
                            Speed is Safety
                        </h3>
                        <p className="mt-4 text-white/50 font-mono text-sm leading-relaxed">
                            Slow is dead. We build on hyper-optimized stacks (Vite, React, Rust-based tooling) to ensure your empire loads before they can blink.
                        </p>
                    </div>
                </div>
            </div>

            {/* Team / Image Section */}
            <div className="mt-32 max-w-[1920px] mx-auto">
                <div className="aspect-video w-full bg-[#050505] rounded-2xl overflow-hidden relative group border border-white/5">
                    <img
                        src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop"
                        alt="The Lab"
                        className="team-img-parallax w-full h-[120%] object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 scale-105 group-hover:scale-100 ease-out"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="font-syne font-black text-white/30 text-[10vw] uppercase select-none tracking-widest z-10">
                            The Construct
                        </span>
                    </div>
                </div>
            </div>

            {/* EXPANDED CONTENT: METHODOLOGY */}
            <div className="mt-40 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 max-w-[1920px] mx-auto">
                <div>
                    <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#FF3E00] block mb-6">
                        Operational Doctrine
                    </span>
                    <h2 className="font-syne font-black text-5xl md:text-7xl uppercase text-[#FFFFFF] leading-none mb-8">
                        Burn <br /> the <br /> Handbook.
                    </h2>
                </div>
                <div className="space-y-12">
                    <p className="text-xl md:text-2xl font-medium leading-relaxed text-[#FFFFFF]/80">
                        Traditional agencies play it safe. They iterate. They A/B test until the soul is sanded off.
                        We don't do that. We deploy "scorched earth" creativity—stripping away the noise until only the raw, undeniable signal remains.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-syne font-bold text-xl uppercase mb-2 text-[#FF3E00]">01. Injection</h4>
                            <p className="font-mono text-xs leading-relaxed text-white/50">
                                We infiltrate your brand's core. We audit every pixel, every line of copy, every user interaction. We find the weak points.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-syne font-bold text-xl uppercase mb-2 text-[#FF3E00]">02. Ignition</h4>
                            <p className="font-mono text-xs leading-relaxed text-white/50">
                                We light the match. Visual overhaul, architectural restructuring, and aggressive positioning updates.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-syne font-bold text-xl uppercase mb-2 text-[#FF3E00]">03. Accelerant</h4>
                            <p className="font-mono text-xs leading-relaxed text-white/50">
                                Launch is just the start. We pour gasoline on what works using high-velocity feedback loops and AI-driven analytics.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-syne font-bold text-xl uppercase mb-2 text-[#FF3E00]">04. Dominion</h4>
                            <p className="font-mono text-xs leading-relaxed text-white/50">
                                Your brand becomes the standard. Competitors are forced to adapt or die.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* EXPANDED CONTENT: SECTOR LOG (HISTORY) */}
            <div className="mt-40 border-t border-white/10 pt-24 max-w-[1920px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20">
                    <h2 className="font-syne font-black text-5xl md:text-7xl uppercase text-[#FFFFFF]">
                        Sector Log
                    </h2>
                    <p className="font-mono text-sm tracking-widest uppercase text-white/30 mt-4 md:mt-0">
                        Archive: 2020 - Present
                    </p>
                </div>

                <div className="space-y-0">
                    {[
                        { year: "2024", event: "The Singularity", desc: "Arson Pixelz fully integrates Generative AI into all workflows. Production speed increases by 400%." },
                        { year: "2023", event: "Global Expansion", desc: "Remote command nodes established in Tokyo, London, and Berlin. Client base exceeds 50 enterprise accounts." },
                        { year: "2022", event: "Protocol: Breach", desc: "First major award win for 'Cyber-Brutalism' utility site. The industry takes notice." },
                        { year: "2020", event: "Genesis", desc: "Founded in a basement server room. Two laptops, too much caffeine, and a refusal to compromise." }
                    ].map((item, idx) => (
                        <div key={idx} className="sector-log-item group border-b border-white/10 py-12 flex flex-col md:flex-row gap-8 md:gap-24 items-start hover:bg-white/5 transition-colors duration-500 -mx-6 px-6 md:-mx-12 md:px-12">
                            <span className="font-mono text-3xl md:text-5xl font-bold text-[#FF3E00]/20 group-hover:text-[#FF3E00] transition-colors">
                                {item.year}
                            </span>
                            <div className="flex-1">
                                <h3 className="font-syne font-bold text-3xl uppercase text-[#FFFFFF] mb-2">{item.event}</h3>
                                <p className="font-mono text-sm text-white/50 max-w-lg">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
