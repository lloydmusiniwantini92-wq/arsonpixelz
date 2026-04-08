import React, { useEffect, useRef, useState, useContext } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroContent } from '../Hero';
import { NavigationContext } from '../../App';

gsap.registerPlugin(ScrollTrigger);

/**
 * UnifiedVoidSystem
 * 
 * This component implements the "Silicon Valley" level singular paint sweep.
 * it renders the Hero and About sections twice (Light & Dark) and uses 
 * a singular clip-path circle reveal to "paint" the dark theme over the light
 * theme as the user scrolls, emanating from the blackhole orb.
 */
export const UnifiedVoidSystem: React.FC = () => {
    const [loaded, setLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const darkLayerRef = useRef<HTMLDivElement>(null);
    const { isInitialLoad } = useContext(NavigationContext);

    useEffect(() => {
        const delay = isInitialLoad ? 3000 : 500;
        const timer = setTimeout(() => setLoaded(true), delay);
        return () => clearTimeout(timer);
    }, [isInitialLoad]);

    useEffect(() => {
        if (!loaded || !darkLayerRef.current || !containerRef.current) return;

        const isMobile = window.innerWidth < 768;
        const centerX = isMobile ? '50%' : '100%';
        const centerY = isMobile ? '80vh' : '85vh'; // Absolute unit to ensure button alignment

        const ctx = gsap.context(() => {
            // 1. Initial Blackhole Birth (The Orb appears)
            const r = isMobile ? 120 : 175;
            const entranceDelay = isInitialLoad ? 1.3 : 0.5;

            gsap.set(darkLayerRef.current, { 
                clipPath: `circle(0px at ${centerX} ${centerY})` 
            });

            const birthTl = gsap.timeline({ delay: entranceDelay });
            birthTl.to(darkLayerRef.current, { 
                clipPath: `circle(${r * 1.5}px at ${centerX} ${centerY})`, 
                duration: 0.6, 
                ease: 'expo.out' 
            }).to(darkLayerRef.current, { 
                clipPath: `circle(${r}px at ${centerX} ${centerY})`, 
                duration: 0.8, 
                ease: 'elastic.out(1, 0.5)' 
            });

            // 2. Singular Expansion on Scroll (The Paint Sweep)
            // This sweep covers BOTH Hero and About sections
            gsap.to(darkLayerRef.current, {
                clipPath: `circle(350vw at ${centerX} ${centerY})`,
                ease: 'power2.inOut',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top', // End when the hero has scrolled completely out of view
                    scrub: 2.0, // Viscous cinematic paint feel
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        document.documentElement.style.setProperty('--void-progress', self.progress.toString());
                    }
                }
            });

            // 3. Staggered Content Animations (Removed About section animations)
            
        }, containerRef);

        return () => ctx.revert();
    }, [loaded, isInitialLoad]);

    return (
        <div ref={containerRef} className="relative w-full">
            {/* ── SECTION ID REFERENCES ── */}
            {/* We render IDs only in the base layer to avoid duplicate ID issues */}
            
            {/* ========================================================= */}
            {/* LAYER 1: LIGHT THEME BASE                                 */}
            {/* ========================================================= */}
            <div className="relative z-10 w-full">
                <section id="hero-section">
                    <HeroContent loaded={loaded} />
                </section>
            </div>

            {/* ========================================================= */}
            {/* LAYER 2: DARK THEME OVERLAY (THE PAINT SWEEP)             */}
            {/* ========================================================= */}
            <div 
                ref={darkLayerRef}
                className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
                style={{ 
                    clipPath: isMobile ? 'circle(0px at 50% 80vh)' : 'circle(0px at 100% 85vh)',
                    isolation: 'isolate' // Prevent sub-pixel rendering shards/artifacts
                }}
            >
                {/* Visual Elements stacked traditionally */}
                <div className="relative w-full flex flex-col">
                    <HeroContent loaded={loaded} />
                </div>

                {/* The Blackhole Singularity Pip (stays with the expanding dark layer) */}
                <div 
                    className="absolute z-30 pointer-events-none rounded-full"
                    style={{
                        left: isMobile ? '50%' : '100%',
                        top: isMobile ? '80vh' : '85vh',
                        transform: 'translate(-50%, -50%)',
                        width: '4px', height: '4px',
                        background: '#D16D6A',
                        boxShadow: '0 0 30px 10px rgba(209,109,106,1)',
                    }}
                />
            </div>

            {/* Shared Animations Styles */}
            <style>{`
                @keyframes spark-glitch1 {
                    0%   { clip-path: inset(20% 0 65% 0); transform: translate(-3px, 1px); }
                    33%  { clip-path: inset(5%  0 80% 0); transform: translate(2px, 0); }
                    66%  { clip-path: inset(45% 0 40% 0); transform: translate(-1px, 2px); }
                    100% { clip-path: inset(30% 0 55% 0); transform: translate(1px, -1px); }
                }
                @keyframes spark-glitch2 {
                    0%   { clip-path: inset(60% 0 20% 0); transform: translate(3px, -1px); }
                    50%  { clip-path: inset(70% 0 10% 0); transform: translate(-2px, 1px); }
                    100% { clip-path: inset(55% 0 30% 0); transform: translate(1px, 2px); }
                }
                @keyframes about-marquee {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-about-marquee {
                    animation: about-marquee 22s linear infinite;
                }
            `}</style>
        </div>
    );
};

// Simple helper for responsive check inside style objects
const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
