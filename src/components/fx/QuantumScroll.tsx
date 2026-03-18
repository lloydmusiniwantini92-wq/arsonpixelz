import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface QuantumScrollProps {
    isDark?: boolean;
}

export const QuantumScroll: React.FC<QuantumScrollProps> = ({ isDark = false }) => {
    const coreRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!coreRef.current || !glowRef.current) return;

        const tl = gsap.timeline({ repeat: -1 });

        // High-gravity "Drop & Burn" loop
        tl.to(coreRef.current, {
            y: 24,
            opacity: 1,
            duration: 0.8,
            ease: "power4.in",
        })
        .to(glowRef.current, {
            scale: 2,
            opacity: 0.8,
            duration: 0.2,
            ease: "expo.out"
        }, "-=0.2")
        .to([coreRef.current, glowRef.current], {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
        })
        .set(coreRef.current, { y: -8 })
        .to(coreRef.current, {
            opacity: 0.4,
            duration: 0.4,
            ease: "power2.out"
        });

        return () => {
            tl.kill();
        };
    }, []);

    const accentColor = "#D16D6A";
    const borderColor = isDark ? "rgba(209,109,106,0.3)" : "rgba(26,26,26,0.2)";
    const textColor = isDark ? "text-[#D16D6A]/70" : "text-black/40";

    return (
        <div 
            ref={containerRef}
            className="flex items-center gap-6 group cursor-pointer select-none"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
            {/* HUD Diagnostic Data (Left) */}
            <div className="hidden lg:flex flex-col items-end">
                <span className={`font-mono text-[7px] tracking-[0.3em] uppercase ${textColor} animate-pulse`}>
                    grav_lock_engaged
                </span>
                <span className={`font-mono text-[7px] tracking-[0.3em] uppercase ${textColor}`}>
                    depth_01 // 0.00
                </span>
            </div>

            {/* The Quantum Track */}
            <div className="relative flex flex-col items-center">
                <div 
                    className="w-[1px] h-10 relative overflow-hidden"
                    style={{ background: `linear-gradient(to bottom, transparent, ${borderColor}, transparent)` }}
                >
                    <div 
                        ref={coreRef}
                        className="absolute left-1/2 -translate-x-1/2 w-1 h-2 rounded-full opacity-40"
                        style={{ backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}` }}
                    />
                </div>
                
                {/* Visual Anchor / Pulse Point */}
                <div className="mt-2 relative">
                    <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-[#D16D6A]' : 'bg-black/40'}`} />
                    <div 
                        ref={glowRef}
                        className="absolute inset-0 rounded-full opacity-0 translate-x-[-25%] translate-y-[-25%]"
                        style={{ 
                            width: '150%', height: '150%',
                            background: accentColor,
                            filter: 'blur(4px)',
                            boxShadow: `0 0 15px 2px ${accentColor}`
                        }}
                    />
                </div>
            </div>

            {/* HUD Signal (Right) */}
            <div className="flex flex-col items-start translate-y-1">
                <span className={`font-mono text-[9px] font-bold tracking-[0.4em] uppercase ${isDark ? 'text-[#D16D6A]' : 'text-[#1A1A1A]'}`}>
                    Scroll
                </span>
                <div className="flex items-center gap-2 mt-1">
                    <div className={`h-[1px] w-6 ${isDark ? 'bg-[#D16D6A]/30' : 'bg-black/20'}`} />
                    <span className={`font-mono text-[6px] tracking-[0.2em] uppercase ${textColor}`}>
                        init_ascension
                    </span>
                </div>
            </div>
        </div>
    );
};
