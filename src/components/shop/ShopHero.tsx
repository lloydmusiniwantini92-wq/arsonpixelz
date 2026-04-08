import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import shopHeroImg from '../../assets/images/shop/shophero.jpg';

gsap.registerPlugin(ScrollTrigger);

export const ShopHero = () => {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!containerRef.current) return;

            const tl = gsap.timeline();

            // Entrance animation for content blocks
            tl.from('.monolith-item', {
                opacity: 0,
                y: 30,
                duration: 1.5,
                stagger: 0.2,
                ease: "power4.out"
            });

            // Parallax for the massive background text
            gsap.to('.monolith-watermark', {
                y: -100,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section 
            ref={containerRef} 
            className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-black py-16"
            style={{ fontFamily: "'Inter', sans-serif" }}
        >
            {/* ── BACKGROUND LAYER: SOLID MONOLITH ARCHITECTURE ── */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={shopHeroImg} 
                    alt="" 
                    className="w-full h-full object-cover opacity-100 brightness-100"
                />
                
                {/* Global Textures */}
                <div className="absolute inset-0 noise-bg opacity-[0.04] pointer-events-none" />
            </div>

            {/* ── CENTRAL CONTENT ── */}
            <div className="relative z-10 max-w-[1600px] mx-auto px-8 md:px-12 w-full text-center">
                
                {/* Watermark Background Text - Refined */}
                <div className="monolith-watermark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] select-none pointer-events-none">
                    <span className="text-[35vw] font-black tracking-tighter uppercase whitespace-nowrap leading-none text-white" 
                        style={{ fontFamily: "'Space Grotesk', sans-serif", WebkitTextStroke: '1px rgba(255,255,255,0.1)', WebkitTextFillColor: 'transparent' }}>
                        FUTURE
                    </span>
                </div>

                <div className="monolith-item mb-6">
                    <div className="h-[2px] w-24 bg-[#FF3E00] mx-auto mb-4" />
                </div>

                <h1 className="monolith-item text-[12vw] md:text-[8rem] lg:text-[10rem] font-black leading-[0.8] tracking-[-0.05em] uppercase text-black mb-16 font-['Space_Grotesk']">
                    THE ARCHITECTURE OF<br/>
                    <span className="text-[#FF3E00]">DIGITAL DOMINANCE.</span>
                </h1>

                <div className="monolith-item max-w-3xl mx-auto">
                    <div className="monolith-item pt-8 flex justify-center">
                        <button 
                            onClick={() => document.getElementById('agency-capabilities')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-20 py-6 bg-[#FF3E00] text-black font-['Space_Grotesk'] font-black uppercase tracking-[0.4em] text-xs hover:bg-white transition-all transform active:scale-95 duration-500"
                        >
                            GET_STARTED
                        </button>
                    </div>
                </div>
            </div>

            {/* Global Animation Styles */}
            <style>{`
                .text-transparent {
                    -webkit-text-fill-color: transparent;
                }
            `}</style>
        </section>
    );
};

export default ShopHero;
