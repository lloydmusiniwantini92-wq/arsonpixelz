import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

interface KineticBackgroundProps {
    progress?: number; // 0 to 1, to sync with scroll if needed
    className?: string;
}

export const KineticBackground: React.FC<KineticBackgroundProps> = ({ progress = 0, className = "" }) => {
    const bgLayer1Ref = useRef<HTMLDivElement>(null);
    const bgLayer2Ref = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const bg1 = bgLayer1Ref.current;
        const bg2 = bgLayer2Ref.current;
        const glow = glowRef.current;

        if (!bg1 || !bg2 || !glow) return;

        // Ambient drifting
        const driftTl = gsap.timeline({ repeat: -1 });
        driftTl.to(bg1, {
            x: -50,
            y: -20,
            duration: 15,
            ease: "sine.inOut",
            yoyo: true
        }, 0);
        driftTl.to(bg2, {
            x: 50,
            y: 20,
            duration: 18,
            ease: "sine.inOut",
            yoyo: true
        }, 0);

        // Ambient glow pulse
        gsap.to(glow, {
            opacity: 0.5,
            scale: 1.2,
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        return () => {
            driftTl.kill();
            gsap.killTweensOf(glow);
        };
    }, []);

    // Reactive parallax based on progress (if passed)
    useLayoutEffect(() => {
        if (progress === undefined) return;
        
        gsap.to(bgLayer1Ref.current, {
            x: -200 * progress,
            duration: 0.5,
            ease: "power2.out"
        });
        gsap.to(bgLayer2Ref.current, {
            x: -400 * progress,
            duration: 0.6,
            ease: "power2.out"
        });
    }, [progress]);

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
            {/* Layer 1: Static Technical Grid */}
            <div 
                ref={bgLayer1Ref}
                className="absolute inset-x-[-20%] inset-y-[-10%] opacity-30 mix-blend-screen bg-cover bg-center"
                style={{ backgroundImage: "url('/images/background/kinetic_bg.webp')" }}
            />
            
            {/* Layer 2: Parallax Energy Streams */}
            <div 
                ref={bgLayer2Ref}
                className="absolute inset-x-[-40%] inset-y-[-20%] opacity-50 mix-blend-color-dodge bg-cover bg-center"
                style={{ backgroundImage: "url('/images/background/energy_field.webp')" }}
            />

            {/* Layer 3: Dynamic Brand Glow Singularity */}
            <div 
                ref={glowRef}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vw] h-[110vw] rounded-full bg-[#D16D6A]/15 blur-[180px] mix-blend-screen opacity-40"
            />
            
            {/* Ambient Noise */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>
    );
};
