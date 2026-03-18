import React, { useRef, useEffect } from 'react';
import { useIgnition } from '../layout/IgnitionRuntime';

interface SpeedTunnelProps {
    children: React.ReactNode;
}

export const SpeedTunnel: React.FC<SpeedTunnelProps> = ({ children }) => {
    const { getPhysics } = useIgnition();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let rafId: number;

        const loop = () => {
            const { velocity } = getPhysics(); // Velocity is usually between 0 (idle) and ~20+ (fast scroll)

            if (containerRef.current) {
                // 1. Calculate warped values
                // Cap velocity effect to avoid breaking the layout
                const distinctVelocity = Math.min(velocity, 50);

                // Scale DOWN as we speed up (Tunnel Vision)
                // 0 vel = 1.0 scale
                // 50 vel = 0.95 scale
                const scale = 1 - (distinctVelocity * 0.001);

                // Tilt back (Perspective)
                // 0 vel = 0deg
                // 50 vel = 2deg (subtle but feeling fast)
                const rotateX = distinctVelocity * 0.05;

                // Motion Blur
                // 0 vel = 0px
                // 50 vel = 4px
                const blur = distinctVelocity * 0.1;

                // Apply transforms
                // Use translate3d for GPU promotion
                containerRef.current.style.transform = `scale(${scale})`; // Removed rotateX for now to avoid z-index/fixed stacking context issues across browsers, sticking to pure scale/blur for safety

                // Filter is expensive, only apply if moving
                if (distinctVelocity > 0.5) {
                    containerRef.current.style.filter = `blur(${blur}px)`;
                } else {
                    containerRef.current.style.filter = 'none';
                }
            }

            rafId = requestAnimationFrame(loop);
        };

        rafId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(rafId);
    }, [getPhysics]);

    return (
        <div
            ref={containerRef}
            className="speed-tunnel-wrapper w-full min-h-screen transition-transform duration-75 ease-out will-change-transform"
            style={{ transformOrigin: 'center 30vh' }} // Pivot point near top third of screen
        >
            {children}
        </div>
    );
};
