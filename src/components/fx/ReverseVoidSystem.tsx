import React, { useEffect, useRef } from 'react';
import { Services } from '../Services';
import { Footer } from '../Footer';

/**
 * ReverseVoidSystem
 *
 * Uses plain requestAnimationFrame + window.scrollY (no GSAP/ScrollTrigger)
 * to drive a clip-path circle that shrinks from full-screen to zero
 * as the user scrolls down into the Services section.
 *
 * Refined: Shrinks specifically into the TOP-LEFT corner of the Footer section.
 * This ensures the Services section (Brand Ignition, etc.) stays dark for longer,
 * creating a "late reveal" transition.
 */
export const ReverseVoidSystem: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);
    const darkLayerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const darkLayer = darkLayerRef.current;
        const services = servicesRef.current;
        if (!container || !darkLayer || !services) return;

        let rafId: number;

        const update = () => {
            const rect = container.getBoundingClientRect();
            const servicesRect = services.getBoundingClientRect();
            const viewH = window.innerHeight;

            // COLLAPSE POINT: Diagonally mirrored boundary (0, 0) relative to Footer
            // Offset 15vh into the footer to mirror the Hero's 85vh depth (15vh from boundary).
            const COLLAPSE_X = '0%';
            const COLLAPSE_Y = `calc(${services.offsetHeight}px + 15vh)`; 
            // 150px is roughly 15vh on a standard 1000px viewport

            // Progress logic:
            // We want it to start shrinking when Services is halfway in view,
            // and finish shrinking exactly when the Footer top hits the middle of the screen.
            
            // startValue: the rect.top value where animation starts.
            // endValue: the rect.top value where animation ends.
            
            // container.top is relative to viewport.
            // When container top is -services.offsetHeight, the boundary is at viewport top.
            
            const scrollStart = viewH * 0.5;   // start when top is 50% down view
            const scrollEnd   = -(services.offsetHeight - viewH * 0.5); // end when footer top is 50% down view

            let progress = (scrollStart - rect.top) / (scrollStart - scrollEnd);
            progress = Math.max(0, Math.min(1, progress)); // clamp 0–1

            // radius: 200vmax → 0vmax
            const maxR = 200;
            const radius = maxR * (1 - progress);

            darkLayer.style.clipPath = `circle(${radius}vmax at ${COLLAPSE_X} ${COLLAPSE_Y})`;

            rafId = requestAnimationFrame(update);
        };

        rafId = requestAnimationFrame(update);

        return () => {
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative w-full">
            {/* ── LAYER 1: BEIGE BASE (always underneath) ── */}
            <div className="relative z-10 w-full">
                <div ref={servicesRef}>
                    <Services theme="light" />
                </div>
                <Footer theme="light" />
            </div>

            {/* ── LAYER 2: DARK VOID (collapsing) ── */}
            <div
                ref={darkLayerRef}
                className="absolute inset-0 z-20 bg-[#020202] pointer-events-none"
                style={{ clipPath: `circle(200vmax at 0% 1000px)` }} // initial guess for Y
            >
                <div className="w-full h-full flex flex-col relative pointer-events-auto">
                    <Services theme="dark" />
                    <Footer theme="dark" />

                    {/* Mirrored Singularity Pip for Footer Collapse */}
                    <div 
                        className="absolute w-2 h-2 rounded-full bg-[#D16D6A] z-[100]"
                        style={{ 
                            left: '0%', 
                            top: `calc(${(servicesRef.current?.offsetHeight || 1000)}px + 15vh)`,
                            transform: 'translate(-50%, -50%)',
                            boxShadow: `0 0 20px 4px rgba(209,109,106,0.6)`
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
