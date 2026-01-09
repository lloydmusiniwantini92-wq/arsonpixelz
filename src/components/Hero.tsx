import React, { useEffect, useState, useRef, useCallback } from 'react';
// Import the image based on your folder structure
import HeroBg from './assets/hero-light-bg.png';
import DomeRedGlass from './assets/dome-red-glass.png';

// --- COMPONENT: EMBERS (ATMOSPHERE) ---
const Embers = () => {
    const embers = Array.from({ length: 25 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 90 + 90}s`,
        animationDelay: `${Math.random() * 45}s`,
        opacity: Math.random() * 0.5 + 0.1,
        size: Math.random() * 4 + 1,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {embers.map((ember) => (
                <div
                    key={ember.id}
                    className="absolute bottom-0 bg-[#D16D6A] rounded-full blur-[1px]"
                    style={{
                        left: ember.left,
                        width: `${ember.size}px`,
                        height: `${ember.size}px`,
                        opacity: ember.opacity,
                        animation: `floatUp ${ember.animationDuration} linear infinite ${ember.animationDelay}`,
                    }}
                />
            ))}
            <style>{`
                @keyframes floatUp {
                    0% { transform: translateY(100vh) scale(0); opacity: 0; }
                    50% { opacity: 0.8; }
                    100% { transform: translateY(-10vh) scale(1.5); opacity: 0; }
                }
            `}</style>
        </div>
    );
};

// --- COMPONENT: REALISTIC STEAM PARTICLES (OPTIMIZED) ---
const RealisticSteam = React.memo(({ isActive }: { isActive: boolean }) => {
    // Generate static particles once
    const particles = React.useMemo(() => {
        return Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            left: 20 + Math.random() * 60, // Concentrated in middle
            width: 30 + Math.random() * 40,
            duration: 3 + Math.random() * 4,
            delay: Math.random() * -5, // Start at different times
            opacity: 0.3 + Math.random() * 0.3,
        }));
    }, []);

    if (!isActive) return null;

    return (
        <div className="absolute top-[-100px] left-0 w-full h-[400px] pointer-events-none overflow-visible z-0 mix-blend-screen">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute bg-gradient-to-t from-gray-300 via-gray-300/40 to-transparent rounded-full blur-[20px]"
                    style={{
                        left: `${p.left}%`,
                        bottom: '0%',
                        width: `${p.width}px`,
                        height: `${p.width * 2}px`,
                        opacity: 0, // Start hidden, animate in
                        animation: `steamFloat ${p.duration}s linear infinite`,
                        animationDelay: `${p.delay}s`,
                    }}
                />
            ))}
            <style>{`
                @keyframes steamFloat {
                    0% { transform: translateY(50px) scale(0.5) rotate(0deg); opacity: 0; }
                    20% { opacity: ${0.4}; }
                    80% { opacity: 0; }
                    100% { transform: translateY(-200px) scale(2) rotate(45deg); opacity: 0; }
                }
            `}</style>
        </div>
    );
});

// --- COMPONENT: HEAT DISTORTION EFFECT ---
const HeatDistortion = ({ isActive }: { isActive: boolean }) => {
    if (!isActive) return null;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px]">
                <div className="w-full h-full animate-heat-wave"
                    style={{
                        background: 'radial-gradient(circle, rgba(0,0,0,0.05) 0%, transparent 70%)',
                        filter: 'blur(20px)',
                    }}
                />
            </div>
        </div>
    );
};

// --- COMPONENT: VAPOR WISPS (SUBTLE PERSISTENT STEAM) ---
const VaporWisps = ({ isActive }: { isActive: boolean }) => {
    const wisps = Array.from({ length: 5 }).map((_, i) => ({
        id: i,
        x: 35 + i * 8,
        duration: 3 + Math.random() * 2,
        delay: i * 0.3,
        opacity: 0.2 + Math.random() * 0.2,
    }));

    return (
        <div className={`absolute bottom-12 left-0 w-full h-[100px] pointer-events-none transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
            {wisps.map((wisp) => (
                <div
                    key={wisp.id}
                    className="absolute bottom-0"
                    style={{
                        left: `${wisp.x}%`,
                        animation: `wisp ${wisp.duration}s ease-in-out infinite ${wisp.delay}s`,
                    }}
                >
                    <div
                        className="w-8 h-24 bg-gradient-to-t from-gray-400/30 via-gray-400/10 to-transparent rounded-full blur-xl"
                        style={{ opacity: wisp.opacity }}
                    />
                </div>
            ))}
        </div>
    );
};

// --- COMPONENT: COOKING INTENSITY INDICATOR ---
const CookingIntensity = ({ level }: { level: number }) => {
    const bars = Array.from({ length: 5 }).map((_, i) => i < level);

    return (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-black/10">
            <span className="text-[8px] font-mono text-black/60 uppercase tracking-wider mr-1">Heat</span>
            {bars.map((active, i) => (
                <div
                    key={i}
                    className={`w-1 h-3 rounded-full transition-all duration-300 ${active
                        ? 'bg-[#D16D6A] shadow-[0_0_8px_rgba(209,109,106,0.8)]'
                        : 'bg-black/20'
                        }`}
                    style={{
                        animationDelay: `${i * 0.1}s`,
                    }}
                />
            ))}
        </div>
    );
};

export const Hero: React.FC = () => {
    const [loaded, setLoaded] = useState(false);
    const [isLidOpen, setIsLidOpen] = useState(false);
    const [isCooking, setIsCooking] = useState(false);
    const [cookingIntensity, setCookingIntensity] = useState(0);
    const [lidHovered, setLidHovered] = useState(false);
    const cookingTimer = useRef<NodeJS.Timeout>();
    const intensityTimer = useRef<NodeJS.Timeout>();

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isLidOpen && !isCooking) {
            cookingTimer.current = setTimeout(() => {
                setIsCooking(true);
                let level = 0;
                intensityTimer.current = setInterval(() => {
                    level++;
                    setCookingIntensity(Math.min(level, 5));
                    if (level >= 5) {
                        clearInterval(intensityTimer.current);
                    }
                }, 600);
            }, 300);
        } else if (!isLidOpen && isCooking) {
            setIsCooking(false);
            setCookingIntensity(0);
            if (cookingTimer.current) clearTimeout(cookingTimer.current);
            if (intensityTimer.current) clearInterval(intensityTimer.current);
        }

        return () => {
            if (cookingTimer.current) clearTimeout(cookingTimer.current);
            if (intensityTimer.current) clearInterval(intensityTimer.current);
        };
    }, [isLidOpen, isCooking]);

    const handleLidClick = useCallback(() => {
        setIsLidOpen((prev) => !prev);
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }, []);

    const handleCookClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if ('vibrate' in navigator) {
            navigator.vibrate([30, 20, 30]);
        }
        window.location.href = "mailto:hello@arsonpixels.com?subject=Ready to Cook";
    }, []);

    return (
        <section className="relative min-h-screen w-full flex flex-col justify-end md:justify-center px-6 md:px-12 pb-24 pt-32 overflow-hidden bg-[#EBE9DF]">

            {/* --- BACKGROUND FX --- */}

            {/* 1. BACKGROUND IMAGE LAYER */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <img
                    src={HeroBg}
                    alt="Background"
                    className="w-full h-full object-cover opacity-80"
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#EBE9DF] via-[#EBE9DF]/80 to-transparent"></div>
            </div>

            {/* 2. GRID OVERLAY */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] z-0 pointer-events-none"></div>

            <Embers />

            {/* --- GIANT "7" MARK --- */}
            <div
                className={`
                    absolute right-0 top-[5%] md:top-[-5%]
                    text-[40vw] leading-none font-black text-[#FFFFFF] 
                    select-none pointer-events-none z-0 mix-blend-color-dodge
                    transition-all duration-[2000ms] ease-out
                    ${loaded ? 'opacity-40 translate-x-[10%]' : 'opacity-0 translate-x-[30%]'}
                `}
                style={{ fontFamily: 'Syne, sans-serif' }}
            >
                7
            </div>

            {/* --- MAIN CONTENT LAYER --- */}
            <div className="max-w-[100rem] mx-auto w-full relative z-10 flex flex-col md:flex-row items-end h-full">

                {/* LEFT: TYPOGRAPHY ENGINE */}
                <div className="flex-1 flex flex-col w-full md:w-auto relative z-20 mb-16 md:mb-0">

                    {/* REFINED TYPOGRAPHY */}
                    <h1 className="flex flex-col font-black text-[#0a0a0a] uppercase leading-[0.85] tracking-tighter mix-blend-normal -ml-[0.02em]">
                        {/* LINE 1 */}
                        <div className="overflow-hidden">
                            <span className={`
                                block text-[11vw] md:text-[6.5rem] lg:text-[8rem] 
                                transition-transform duration-[1200ms] cubic-bezier(0.2, 1, 0.2, 1)
                                ${loaded ? 'translate-y-0' : 'translate-y-full'}
                            `}>
                                IGNITING
                            </span>
                        </div>

                        {/* LINE 2 */}
                        <div className="overflow-hidden">
                            <span
                                className={`
                                    block text-[11vw] md:text-[6.5rem] lg:text-[8rem] text-transparent
                                    transition-transform duration-[1200ms] cubic-bezier(0.2, 1, 0.2, 1) delay-150
                                    ${loaded ? 'translate-y-0' : 'translate-y-full'}
                                `}
                                style={{ WebkitTextStroke: '1px rgba(0,0,0,0.3)' }}
                            >
                                THE MODERN
                            </span>
                        </div>

                        {/* LINE 3 */}
                        <div className="overflow-hidden">
                            <span className={`
                                block text-[11vw] md:text-[6.5rem] lg:text-[8rem] text-[#D16D6A]
                                transition-transform duration-[1200ms] cubic-bezier(0.2, 1, 0.2, 1) delay-300
                            `}>
                                <span className={`block ${loaded ? 'translate-y-0' : 'translate-y-[110%]'}`}>DIGITAL</span>
                            </span>
                        </div>
                    </h1>

                    <div className={`
                        mt-8 md:mt-10 max-w-xl
                        transition-all duration-1000 delay-500
                        ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                    `}>
                        <p className="text-xs md:text-base font-mono text-black/60 leading-relaxed border-l-2 border-[#D16D6A] pl-5">
                            Constructing <strong className="text-black">high-fidelity</strong> experiences for the next internet.
                            We incinerate the boundaries between design and code.
                        </p>
                    </div>
                </div>

                {/* RIGHT: THE 3D REACTOR DOME */}
                <div className={`
                    md:w-[35%] flex justify-center md:justify-end items-end relative
                    transition-all duration-1000 delay-700
                    ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
                    md:mb-20
                `}>

                    {/* Perspective Container */}
                    <div className="relative w-[240px] sm:w-[260px] md:w-[280px] h-[140px] sm:h-[155px] flex items-end justify-center perspective-[1200px] group/reactor">

                        {/* Floor Shadow / Glow - REMOVED animate-pulse */}
                        <div
                            className={`absolute bottom-0 w-[80%] h-[20px] bg-[#D16D6A] blur-[40px] transition-opacity duration-700 ${isCooking ? 'opacity-40' : 'opacity-20'
                                }`}
                        ></div>

                        {/* Cooking Intensity Indicator */}
                        {isLidOpen && <CookingIntensity level={cookingIntensity} />}

                        {/* Heat Distortion */}
                        <HeatDistortion isActive={isCooking} />

                        {/* Vapor Wisps */}
                        <VaporWisps isActive={isLidOpen && !isCooking} />

                        {/* Realistic Steam System */}
                        <RealisticSteam
                            isActive={isCooking}
                            intensity={cookingIntensity / 2}
                        />

                        {/* --- HIDDEN ACTION BUTTON (REVEALED WHEN OPEN) --- */}
                        <div className={`
                            absolute bottom-7 z-10 
                            w-[160px] h-[44px]
                            transition-all duration-500 ease-out
                            ${isLidOpen
                                ? 'translate-y-0 opacity-100 pointer-events-auto scale-100'
                                : 'translate-y-8 opacity-0 pointer-events-none scale-95'
                            }
                        `}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.location.href = '/contact';
                                }}
                                className="
                                    relative w-full h-full rounded-full flex items-center justify-center
                                    bg-[#1A1A1A] text-white shadow-[0_0_30px_rgba(209,109,106,0.6)]
                                    font-black tracking-[0.2em] uppercase text-[0.65rem]
                                    hover:scale-105 hover:bg-[#D16D6A] hover:shadow-[0_0_50px_rgba(209,109,106,0.9)]
                                    transition-all duration-300
                                    before:absolute before:inset-0 before:rounded-full
                                    before:bg-gradient-to-t before:from-white/10 before:to-transparent
                                    before:opacity-0 hover:before:opacity-100 before:transition-opacity
                                    active:scale-95
                                "
                            >
                                <span className="relative z-10">LET'S COOK</span>
                                <div className="absolute inset-0 rounded-full bg-[#D16D6A] opacity-0 hover:opacity-20 blur-xl transition-opacity duration-300" />
                            </button>
                        </div>

                        {/* --- THE LID (RESTORED CSS VERSION) --- */}
                        <div
                            onClick={handleLidClick}
                            onMouseEnter={() => setLidHovered(true)}
                            onMouseLeave={() => setLidHovered(false)}
                            className={`
                                absolute bottom-4 z-20 cursor-pointer
                                w-[220px] sm:w-[240px] md:w-[260px]
                                h-[115px] sm:h-[125px] md:h-[130px]
                                flex flex-col items-center justify-end
                                transition-all duration-[800ms]
                                ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]
                                ${isLidOpen
                                    ? '-translate-y-[110px] rotate-[-12deg] opacity-90'
                                    : `translate-y-0 rotate-0 ${lidHovered ? '-translate-y-2 scale-[1.02]' : ''}`
                                }
                            `}
                            style={{
                                filter: lidHovered && !isLidOpen ? 'drop-shadow(0 8px 20px rgba(209,109,106,0.3))' : 'none',
                            }}
                        >
                            {/* Handle */}
                            <div className={`
                                w-11 h-5 bg-[#8B3A38] rounded-t-lg mb-[-1px] 
                                shadow-inner border-t border-white/10 relative overflow-hidden
                                transition-all duration-300
                                ${lidHovered && !isLidOpen ? 'shadow-[0_0_15px_rgba(209,109,106,0.5)]' : ''}
                            `}>
                                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent"></div>
                                <div className="absolute inset-0 flex items-center justify-center gap-1">
                                    <div className="w-[2px] h-2.5 bg-black/20 rounded-full"></div>
                                    <div className="w-[2px] h-2.5 bg-black/20 rounded-full"></div>
                                    <div className="w-[2px] h-2.5 bg-black/20 rounded-full"></div>
                                </div>
                            </div>

                            {/* Main Dome Body */}
                            <div className={`
                                w-full h-full bg-gradient-to-b from-[#D16D6A] to-[#B04E4B] 
                                rounded-t-[140px] shadow-[inset_0_10px_30px_rgba(255,255,255,0.25),inset_0_-10px_30px_rgba(0,0,0,0.2),0_15px_35px_rgba(0,0,0,0.5)] 
                                flex items-end justify-center pb-5 relative overflow-hidden 
                                border-b-4 border-[#8B3A38]
                                transition-all duration-300
                                ${lidHovered && !isLidOpen ? 'brightness-110' : ''}
                            `}>

                                {/* Specular Highlight */}
                                <div
                                    className={`
                                        absolute top-5 right-8 w-14 h-20 
                                        bg-gradient-to-br from-white/40 to-transparent 
                                        rounded-full rotate-[20deg] blur-[2px]
                                        transition-transform duration-500
                                        ${lidHovered ? 'translate-x-2 scale-110' : ''}
                                    `}
                                ></div>

                                {/* Internal Reactor Pulse */}
                                <div
                                    className={`
                                        absolute bottom-0 w-[90px] h-[35px] 
                                        bg-white blur-[30px] mix-blend-overlay 
                                        transition-opacity duration-500 
                                        ${isLidOpen ? 'opacity-0' : 'opacity-40'}
                                    `}
                                ></div>

                                {/* Surface Noise */}
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

                                {/* Metallic rim reflection */}
                                <div className="absolute bottom-0 left-0 w-full h-7 bg-gradient-to-t from-white/10 to-transparent"></div>

                                {/* Label */}
                                <div className="flex flex-col items-center z-10 transition-all duration-500">
                                    <div className={`
                                        w-16 h-[1px] bg-white/40 mb-1.5 transition-all duration-300
                                        ${lidHovered ? 'w-20 bg-white/60' : ''}
                                    `}></div>
                                    <span className={`
                                        font-mono font-bold text-[0.55rem] tracking-[0.25em] 
                                        text-white/90 drop-shadow-sm uppercase
                                        transition-all duration-300
                                        ${lidHovered ? 'text-white tracking-[0.3em]' : ''}
                                    `}>
                                        {isLidOpen ? 'Close System' : "Let's Collaborate"}
                                    </span>
                                </div>

                                {/* Hover ring indicator */}
                                {lidHovered && !isLidOpen && (
                                    <div className="absolute inset-0 rounded-t-[140px] border-2 border-white/20 animate-pulse"
                                        style={{ animationDuration: '1.5s' }}
                                    />
                                )}
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            {/* --- ANIMATIONS --- */}
            <style>{`
                @keyframes steamRise {
                    0% { 
                        transform: translateY(0) translateX(0) scale(0.8) rotate(0deg); 
                        opacity: 0; 
                    }
                    10% { 
                        opacity: var(--opacity, 0.7);
                    }
                    100% { 
                        transform: translateY(-180px) translateX(var(--steam-x, 0)) scale(1.5) rotate(15deg); 
                        opacity: 0; 
                    }
                }
                
                @keyframes wisp {
                    0%, 100% { 
                        transform: translateY(0) scaleY(1); 
                        opacity: 0.3; 
                    }
                    50% { 
                        transform: translateY(-40px) scaleY(1.5); 
                        opacity: 0.6; 
                    }
                }
                
                @keyframes heat-wave {
                    0%, 100% { 
                        transform: scale(1) translateY(0); 
                        opacity: 0.1; 
                    }
                    50% { 
                        transform: scale(1.2) translateY(-10px); 
                        opacity: 0.2; 
                    }
                }
                
                .animate-heat-wave {
                    animation: heat-wave 2s ease-in-out infinite;
                }
                
                .animate-steam-rise {
                    will-change: transform, opacity;
                }
                
                .perspective-[1200px] {
                    transform-style: preserve-3d;
                }
            `}</style>
        </section >
    );
};