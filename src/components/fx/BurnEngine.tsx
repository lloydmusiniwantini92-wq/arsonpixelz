import React, { useEffect, useRef } from 'react';
import { useIgnition } from '../layout/IgnitionRuntime';

export const BurnEngine: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { getPhysics } = useIgnition();
    const requestRef = useRef<number>();

    // Config: Darker red for visibility on light theme
    const BURN_COLOR_RGB = '209, 109, 106';

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true }); // Optimize for transparency
        if (!ctx) return;

        const handleResize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        const animate = () => {
            // 1. GET PHYSICS DIRECTLY (Fast, no react render)
            const { heat } = getPhysics();

            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            // 2. Only draw if there is significant heat to save GPU
            if (heat > 0.01) {
                const w = window.innerWidth;
                const h = window.innerHeight;

                // --- A. VIGNETTE (Outer burn) ---
                // "Harder" gradient so it shows up on white
                const grad = ctx.createRadialGradient(w / 2, h / 2, h * 0.4, w / 2, h / 2, h * 1.2);
                grad.addColorStop(0.5, 'rgba(0,0,0,0)');
                grad.addColorStop(1, `rgba(${BURN_COLOR_RGB}, ${heat * 0.4})`); // Increased opacity

                ctx.save();
                ctx.globalCompositeOperation = 'multiply'; // Better for light themes (burns "into" the page)
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, w, h);
                ctx.restore();

                // --- B.  DISTORTION LINES (Speed blur) ---
                // Horizontal streaks
                ctx.fillStyle = `rgba(200, 50, 50, ${heat * 0.15})`;
                const lineCount = Math.floor(heat * 20); // More heat = more lines
                for (let i = 0; i < lineCount; i++) {
                    const y = Math.random() * h;
                    const lw = Math.random() * w * 0.8;
                    const lx = Math.random() * (w - lw);
                    ctx.fillRect(lx, y, lw, 1 + Math.random() * 2);
                }

                // --- C. CHROMATIC EDGES ---
                // Simple color shift at the edges
                if (heat > 0.2) {
                    ctx.save();
                    ctx.strokeStyle = `rgba(255, 0, 0, ${heat * 0.2})`;
                    ctx.lineWidth = heat * 10;
                    ctx.strokeRect(0, 0, w, h);
                    ctx.restore();
                }
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []); // Empty dep array = runs once, loop handles updates via ref

    return (
        <canvas
            ref={canvasRef}
            // Z-index high but below nav? Or top? 
            // mix-blend-multiply allows the dark burn to show on light bg
            className="fixed inset-0 pointer-events-none z-[50]"
            style={{ width: '100vw', height: '100vh' }}
        />
    );
};
