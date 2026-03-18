import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    speed?: number; // Parallax intensity (0-1)
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
    src,
    alt,
    className = "",
    speed = 0.15 // Subtle by default
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const img = imgRef.current;

        if (!container || !img) return;

        // Reset transform
        gsap.set(img, { y: "-10%", scale: 1.2 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });

        tl.to(img, {
            y: "10%", // Move 20% total relative to container height
            ease: "none"
        });

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(t => t.kill()); // Cleanup specific triggers if needed or assume global management
        };
    }, [speed]);

    return (
        <div ref={containerRef} className={`overflow-hidden relative ${className}`}>
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                className="w-full h-full object-cover will-change-transform" // Scale is handled by GSAP
            />
        </div>
    );
};
