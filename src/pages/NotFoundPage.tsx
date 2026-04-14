import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export const NotFoundPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (containerRef.current) {
                gsap.from(containerRef.current, {
                    opacity: 0,
                    filter: 'blur(12px)',
                    scale: 1.04,
                    duration: 1.4,
                    ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
                    clearProps: 'filter,scale'
                });
            }
        });
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#000000] flex flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Background Glitch */}
            <div className="absolute inset-0 bg-[url('/site-static/noise.svg')] opacity-10 mix-blend-overlay"></div>

            <h1 className="font-syne font-black text-[#FF3E00] text-[20vw] leading-none opacity-40 select-none tracking-tighter italic">
                404
            </h1>

            <div className="relative z-10 text-center -mt-8 md:-mt-16">
                <p className="font-mono text-white/50 text-[10px] md:text-sm tracking-[0.5em] uppercase mb-6 font-black">
                    System Failure // Path Not Found
                </p>
                <h2 className="font-syne font-black text-white text-2xl md:text-5xl max-w-2xl mx-auto mb-14 uppercase leading-tight tracking-tighter">
                    You have drifted into uncharted territory. This sector does not exist.
                </h2>

                <Link
                    to="/"
                    className="inline-block bg-[#FF3E00] text-black font-syne font-black text-[11px] tracking-[0.4em] uppercase px-12 py-5 hover:bg-white transition-all duration-300 hover:scale-105"
                >
                    Return to Base
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
