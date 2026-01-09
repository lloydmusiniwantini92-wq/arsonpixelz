import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';

// --- TYPES ---
interface IgnitionContextType {
    lenis: Lenis | null;
    getPhysics: () => { velocity: number; heat: number; isScrubbing: boolean };
}

const IgnitionContext = createContext<IgnitionContextType>({
    lenis: null,
    getPhysics: () => ({ velocity: 0, heat: 0, isScrubbing: false }),
});

export const useIgnition = () => useContext(IgnitionContext);

// --- COMPONENT ---
export const IgnitionRuntime: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [lenis, setLenis] = useState<Lenis | null>(null);

    // We use Refs for high-frequency updates (60fps) to avoid re-rendering React tree
    const physicsRef = useRef({
        velocity: 0,
        heat: 0,
        isScrubbing: false
    });

    useEffect(() => {
        // 1. Initialize Lenis
        const lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential smoothing
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        setLenis(lenisInstance);

        // 2. Sync Lenis with GSAP Ticker
        // This ensures animations and scroll updates happen in the same frame
        gsap.ticker.add((time) => {
            lenisInstance.raf(time * 1000);
        });

        // 3. Physics Loop (Decoupled from React Render)
        lenisInstance.on('scroll', ({ velocity }: { velocity: number }) => {
            const absVel = Math.abs(velocity);

            // Direct mutation of physics state
            physicsRef.current.velocity = absVel;
            physicsRef.current.isScrubbing = absVel > 0.1;

            // "Poke" heat up
            physicsRef.current.heat = Math.min(physicsRef.current.heat + absVel * 0.005, 1.0); // Reduced sensitivity
        });

        // 4. Independent Game Loop for Decay
        const loop = () => {
            // Decay heat
            physicsRef.current.heat *= 0.95;
            if (physicsRef.current.heat < 0.001) physicsRef.current.heat = 0;

            // NOTE: We do NOT call setHeatLevel here. 
            // Components that need 60fps access must read the ref directly via context.

            requestAnimationFrame(loop);
        };
        const rafId = requestAnimationFrame(loop);

        return () => {
            lenisInstance.destroy();
            gsap.ticker.remove(lenisInstance.raf);
            cancelAnimationFrame(rafId);
        };
    }, []);

    // Helper to get current physics state without triggering render
    const getPhysics = () => physicsRef.current;

    return (
        <IgnitionContext.Provider value={{ lenis, getPhysics }}>
            {children}
        </IgnitionContext.Provider>
    );
};
