import React, { useRef, useEffect } from 'react';
import { useIgnition } from './layout/IgnitionRuntime';
import { cn } from '../utils/cn';
import gsap from 'gsap';

interface KineticTextProps {
    children: React.ReactNode;
    className?: string;
    intensity?: number;
}

export const KineticText: React.FC<KineticTextProps> = ({ children, className, intensity = 1 }) => {
    const textRef = useRef<HTMLDivElement>(null);
    const { lenis } = useIgnition();

    useEffect(() => {
        if (!lenis || !textRef.current) return;

        const onScroll = (e: any) => {
            const velocity = e.velocity;
            
            // Map velocity to skew and scale for extreme brutalist feel
            const skewAmount = velocity * 1.5 * intensity;
            const scaleAmount = 1 - Math.abs(velocity) * 0.005 * intensity;
            
            gsap.to(textRef.current, {
                skewY: skewAmount,
                scaleY: Math.max(0.8, scaleAmount),
                duration: 0.5,
                ease: "power2.out",
                overwrite: "auto" // Prevent conflicts
            });
        };

        lenis.on('scroll', onScroll);

        return () => {
            lenis.off('scroll', onScroll);
        };
    }, [lenis, intensity]);

    return (
        <div 
            ref={textRef} 
            className={cn("origin-center will-change-transform inline-block", className)}
        >
            {children}
        </div>
    );
};
