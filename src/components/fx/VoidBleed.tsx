/**
 * VoidBleed.tsx (v2)
 * 
 * A fixed-position overlay that covers the About section ONLY.
 * Uses a GSAP scroll-driven clip-path that grows from the hero orb position,
 * making it appear to bleed down from the hero into the About section.
 * 
 * Key fix: The overlay sits BELOW the hero section (top: 100vh) so it
 * doesn't interfere with hero content. The clip-path origin is at
 * calc(100vw - 200px), -50vh — the same as the orb but relative to the 
 * overlay's top position.
 */
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const VoidBleed: React.FC = () => {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const heroEl = document.getElementById('hero-section');
        const aboutEl = document.getElementById('about-section');

        if (!heroEl || !aboutEl || !overlayRef.current) return;

        const overlay = overlayRef.current;

        // The orb in the hero is at:
        //   X: calc(100% - 200px) of the hero section = calc(100vw - 200px)
        //   Y: 50% of the hero = 50vh
        //
        // Since our overlay starts at top: 100vh (below the hero),
        // the orb's position relative to our overlay's local context is:
        //   clipX: calc(100vw - 200px)
        //   clipY: -50vh (50vh above our overlay's top edge = inside hero)

        const clipOriginX = 'calc(100vw - 200px)';
        const clipOriginY = '-50vh'; // relative to overlay's top: 100vh

        // Start with just enough radius to show the existing orb outline at the boundary
        // The orb is 175px radius. At the hero/about boundary, the circle should just
        // be starting to poke through. We start at 0 (invisible).
        gsap.set(overlay, {
            clipPath: `circle(0px at ${clipOriginX} ${clipOriginY})`,
            opacity: 1,
        });

        const ctx = gsap.context(() => {
            gsap.to(overlay, {
                // Expand to cover the entirely of the About section
                clipPath: `circle(300vw at ${clipOriginX} ${clipOriginY})`,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroEl,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                },
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={overlayRef}
            aria-hidden="true"
            style={{
                // Positioned just below the hero section, covering the About section
                position: 'fixed',
                top: '100vh',
                left: 0,
                width: '100vw',
                height: '100vh',  // Covers the About section height
                pointerEvents: 'none',
                // Must be above About section content (which is z-10) 
                // but below any UI chrome (nav is very high z-index)
                zIndex: 5,
                // The blackhole's visual aesthetic
                background: `
                    radial-gradient(
                        ellipse 70% 60% at 85% -20%,
                        rgba(180, 50, 40, 0.8) 0%,
                        rgba(100, 15, 10, 0.85) 30%,
                        rgba(20, 5, 5, 0.95) 60%,
                        rgba(8, 8, 8, 1) 100%
                    )
                `,
            }}
        >
            {/* Fine red grid - the singularity coordinate system */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.04,
                    backgroundImage: 'linear-gradient(rgba(209,109,106,1) 1px, transparent 1px), linear-gradient(90deg, rgba(209,109,106,1) 1px, transparent 1px)',
                    backgroundSize: '5rem 5rem',
                    pointerEvents: 'none',
                }}
            />
            {/* Atmospheric red glow bloom at the top (the orb bleeding through) */}
            <div
                style={{
                    position: 'absolute',
                    top: '-20%',
                    right: '0',
                    width: '70vw',
                    height: '60vh',
                    background: 'radial-gradient(ellipse at 85% 0%, rgba(209,109,106,0.6) 0%, rgba(180,50,40,0.3) 40%, transparent 70%)',
                    filter: 'blur(40px)',
                    pointerEvents: 'none',
                }}
            />
        </div>
    );
};
