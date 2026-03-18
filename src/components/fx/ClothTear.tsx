import React, { useRef, useEffect } from 'react';
import { useIgnition } from '../layout/IgnitionRuntime';

interface ClothTearProps {
    children: React.ReactNode;
}

export const ClothTear: React.FC<ClothTearProps> = ({ children }) => {
    const { getPhysics } = useIgnition();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let rafId: number;

        const loop = () => {
            const { velocity } = getPhysics();

            if (containerRef.current) {
                // We specifically DO NOT apply a transform here. 
                // Any 'transform' or 'will-change: transform' creates a new CSS 
                // formatting block which completely breaks GSAP's position: fixed 
                // pinning calculations for all child components.
            }

            rafId = requestAnimationFrame(loop);
        };

        rafId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(rafId);
    }, [getPhysics]);

    return (
        <div
            ref={containerRef}
            className="cloth-tear-wrapper w-full min-h-screen origin-center"
        >
            {children}
        </div>
    );
};
