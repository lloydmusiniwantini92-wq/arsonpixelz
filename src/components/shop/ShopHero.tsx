import React, { useEffect, useRef } from 'react';
import { PageHeroBackground } from '../fx/PageHeroBackground';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ShopHero = () => {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const CINEMATIC_EASE = 'cubic-bezier(0.76, 0, 0.24, 1)';
        const ctx = gsap.context(() => {
            if (!containerRef.current) return;

            const tl = gsap.timeline();

            // Entrance animation for content
            tl.from('.hero-content-item', {
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.1,
                ease: CINEMATIC_EASE,
                clearProps: 'all'
            });

            // Parallax Scroll Depth effect on titles and stats
            const heroTitles = gsap.utils.toArray('.hero-title-parallax');
            heroTitles.forEach(title => {
                gsap.to(title as HTMLElement, {
                    y: '-18%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 1.2
                    }
                });
            });

            const heroDesc = containerRef.current.querySelector('.hero-desc-parallax');
            if (heroDesc) {
                gsap.to(heroDesc, {
                    y: '-8%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 1
                    }
                });
            }

            // Bloom entrance
            const bloom = containerRef.current.querySelector('.bloom-effect');
            if (bloom) {
                gsap.from(bloom, {
                    scale: 0.4,
                    opacity: 0,
                    duration: 1.4,
                    ease: CINEMATIC_EASE
                });
            }

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-[72vh] flex flex-col justify-end overflow-hidden pt-28 md:pt-32 pb-0"
            style={{ background: '#020202' }}
        >
            {/* Homepage-level immersive background */}
            <PageHeroBackground accentColor="#D16D6A" />
            
            {/* ── Red coordinate grid ── — enhanced on top of bg */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.06] z-[3]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(209,109,106,1) 1px, transparent 1px), linear-gradient(90deg, rgba(209,109,106,1) 1px, transparent 1px)',
                    backgroundSize: '5rem 5rem',
                }}
            />

            {/* ── Noise ── */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* ── Red bloom top-right ── */}
            <div
                className="bloom-effect absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at 100% 0%, rgba(209,109,106,0.22) 0%, rgba(180,50,40,0.08) 40%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />

            {/* ── Left bottom ambient ── */}
            <div
                className="absolute bottom-0 left-0 w-[500px] h-[350px] pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at 0% 100%, rgba(209,109,106,0.1) 0%, transparent 60%)',
                    filter: 'blur(50px)',
                }}
            />

            {/* ── ARMORY watermark ── */}
            <div
                className="hero-title-parallax absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
                aria-hidden="true"
            >
                <span
                    className="text-[22vw] font-black uppercase leading-none text-[#D16D6A]/[0.025] tracking-tighter"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                >
                    ARMORY
                </span>
            </div>

            {/* ── Content ── */}
            <div 
                className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12 pb-0 opacity-100"
            >
                {/* Sector tag */}
                <div className="hero-content-item flex items-center gap-3 mb-8 opacity-60">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D16D6A] animate-pulse" />
                    <span className="font-mono text-xs tracking-[0.35em] uppercase text-[#D16D6A]">
                        /// The Armory
                    </span>
                    <div className="h-px w-12 bg-[#D16D6A]/40" />
                </div>

                {/* Headline */}
                <h1 className="hero-content-item hero-title-parallax font-black uppercase tracking-tighter leading-[0.82] mb-10" style={{ fontFamily: 'Syne, sans-serif' }}>
                    <span className="block text-[13vw] md:text-[9vw] text-[#EBE9DF]" style={{ textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
                        BUILD YOUR
                    </span>
                    <span className="block text-[13vw] md:text-[9vw] text-[#ff8e8a]" style={{ textShadow: '0 0 60px rgba(209,109,106,0.6)' }}>
                        DIGITAL EMPIRE
                    </span>
                </h1>

                {/* Description + stats row */}
                <div className="hero-content-item hero-desc-parallax grid md:grid-cols-12 gap-8 md:gap-16 items-end pb-12 border-b border-[#D16D6A]/10">

                    {/* Description */}
                    <div className="md:col-span-6 border-l-2 border-[#D16D6A] pl-6">
                        <p className="font-mono text-base md:text-lg text-[#EBE9DF]/80 leading-relaxed">
                            Premium templates, brutalist typography, and autonomous agent swarms.{' '}
                            <span className="text-[#EBE9DF] font-bold">
                                Everything you need to scale from zero to Type 7 civilization status.
                            </span>
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="md:col-span-6 flex gap-8 md:gap-12 justify-start md:justify-end">
                        {[
                            { val: '40+', label: 'War Assets' },
                            { val: '$0', label: 'To Start' },
                            { val: '∞', label: 'Scalability' },
                        ].map((s, i) => (
                            <div 
                                key={s.label} 
                                className="hero-content-item flex flex-col gap-1"
                            >
                                <span className="font-black text-4xl md:text-5xl leading-none tracking-tighter text-[#ff8e8a]" style={{ fontFamily: 'Syne, sans-serif', textShadow: '0 0 30px rgba(209,109,106,0.35)' }}>
                                    {s.val}
                                </span>
                                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#EBE9DF]/30">
                                    {s.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
