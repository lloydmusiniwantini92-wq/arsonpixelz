import React, { useEffect, useRef, useState } from 'react';
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export const About: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // --- INTERSECTION OBSERVER (REVEAL ON SCROLL) ---
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // --- MOUSE PARALLAX CALCULATION ---
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
    };

    return (
        <section
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="relative py-32 md:py-40 px-6 md:px-12 overflow-hidden bg-[#EBE9DF] text-[#1A1A1A]"
        >
            {/* --- 1. BACKGROUND TEXTURE & GRID --- */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Subtle Grain Overlay */}
                <div className="absolute inset-0 opacity-[0.3] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                {/* Technical Grid (Light Mode) */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_100%,transparent_0%)]"></div>
            </div>

            <div className="max-w-[90rem] mx-auto grid lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10">

                {/* --- LEFT: EDITORIAL CONTENT ENGINE --- */}
                <div className={`lg:col-span-7 flex flex-col space-y-10 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

                    {/* Technical Header */}
                    <div className="flex items-center space-x-3 opacity-60">
                        <div className="w-2 h-2 bg-[#D16D6A] rounded-full animate-pulse"></div>
                        <span className="font-mono text-xs font-bold tracking-[0.25em] uppercase text-[#1A1A1A]">
                            Sector 02 // Core Identity
                        </span>
                        <div className="h-[1px] w-16 bg-[#1A1A1A]"></div>
                    </div>

                    {/* Massive Typography with GLITCH */}
                    <h2 className="relative text-5xl md:text-7xl lg:text-[7rem] font-black text-[#1A1A1A] leading-[0.85] tracking-tighter">
                        <span className="block opacity-60 font-mono text-2xl md:text-3xl mb-4 tracking-normal font-normal">
                            WE ARE THE
                        </span>
                        <span className="relative inline-block text-[#D16D6A]">
                            <span className="relative z-10">SPARK</span>
                            <span className="absolute top-0 left-0 -ml-[3px] text-[#D16D6A] opacity-70 animate-glitch-1 mix-blend-multiply" aria-hidden="true">
                                SPARK
                            </span>
                            <span className="absolute top-0 left-0 ml-[3px] text-cyan-600 opacity-70 animate-glitch-2 mix-blend-multiply" aria-hidden="true">
                                SPARK
                            </span>
                        </span>
                    </h2>

                    {/* Narrative Block */}
                    <div className="relative pl-6 md:pl-8 border-l-2 border-[#D16D6A] space-y-6 max-w-2xl">
                        <div className="absolute top-0 left-[-2px] w-[2px] h-12 bg-[#D16D6A]"></div>

                        <p className="text-lg md:text-xl font-mono text-[#1A1A1A]/70 leading-relaxed">
                            In a digital landscape crowded with static noise,{" "}
                            <span className="text-[#1A1A1A] font-bold bg-[#D16D6A]/10 px-1">
                                Arson Pixelz
                            </span>{" "}
                            is the aberration. We are a reactor core for brands ready to go critical.
                        </p>

                        <p className="text-xl md:text-2xl font-bold text-[#1A1A1A] leading-tight font-sans">
                            Fusing industrial-grade code with volatile creativity to engineer ecosystems that are impossible to ignore.
                        </p>
                    </div>

                    {/* Industrial Button */}
                    <div className="pt-4">
                        <button className="group relative inline-flex items-center justify-center px-10 py-5 bg-[#1A1A1A] text-white overflow-hidden transition-all duration-300 shadow-[8px_8px_0px_rgba(209,109,106,1)] hover:shadow-[4px_4px_0px_rgba(209,109,106,1)] hover:translate-x-[2px] hover:translate-y-[2px]">
                            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                            <span className="relative z-10 font-mono font-bold uppercase tracking-widest text-sm group-hover:text-[#D16D6A] transition-colors">
                                Initialize Protocol
                            </span>
                            <ArrowRightIcon className="relative z-10 w-4 h-4 ml-3 text-white group-hover:text-[#D16D6A] transition-colors group-hover:translate-x-1 duration-300" />
                        </button>
                    </div>
                </div>

                {/* --- RIGHT: 3D ARTIFACT CASE --- */}
                <div className="lg:col-span-5 relative h-[600px] flex items-center justify-center perspective-[1000px]">
                    <div
                        className="relative w-full max-w-[420px] aspect-[4/5] transition-transform duration-100 ease-out"
                        style={{
                            transform: `rotateY(${mousePos.x * 12}deg) rotateX(${mousePos.y * -12}deg)`
                        }}
                    >
                        <div className="absolute top-10 left-10 w-full h-full border-2 border-[#1A1A1A]/10 rounded-sm -z-10"></div>

                        <div className="absolute inset-0 bg-[#151515] rounded-sm overflow-hidden shadow-2xl border border-[#333]">
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
                            <div className="absolute top-0 right-10 w-1 h-full bg-[#D16D6A]/20"></div>

                            <div
                                className="absolute inset-0 flex items-center justify-center"
                                style={{ transform: `translateX(${mousePos.x * -20}px) translateY(${mousePos.y * -20}px)` }}
                            >
                                <svg viewBox="0 0 200 200" className="w-[60%] h-[60%] text-[#EBE9DF]">
                                    <path
                                        fill="currentColor"
                                        d="M 100 20 L 180 160 L 140 160 L 125 130 L 75 130 L 60 160 L 20 160 L 100 20 Z"
                                        className="drop-shadow-[0_0_15px_rgba(235,233,223,0.3)]"
                                    />
                                    <path fill="#151515" d="M 100 65 L 82 105 L 118 105 Z" />
                                </svg>
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>

                            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                                <div className="flex flex-col">
                                    <span className="font-mono text-[10px] text-[#D16D6A] tracking-widest uppercase mb-1">
                                        Status
                                    </span>
                                    <span className="font-bold text-white text-xl tracking-tighter">
                                        UNLEASHED
                                    </span>
                                </div>
                                <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center animate-spin-slow">
                                    <div className="w-2 h-2 bg-[#D16D6A] rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -top-4 -right-4 bg-[#D16D6A] text-[#1A1A1A] font-mono text-xs font-bold px-3 py-1 rotate-3 shadow-lg">
                            FIG. 01
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-10 left-0 w-full overflow-hidden opacity-10 pointer-events-none">
                <div className="whitespace-nowrap animate-marquee font-black text-6xl text-[#1A1A1A] uppercase tracking-tighter">
                    Strategy /// Design /// Development /// Immersion /// Strategy /// Design /// Development /// Immersion ///
                </div>
            </div>

            <style>{`
                .animate-spin-slow {
                    animation: spin 10s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes glitch-1 {
                    0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
                    100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, -1px); }
                }
                @keyframes glitch-2 {
                    0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
                    100% { clip-path: inset(20% 0 70% 0); transform: translate(-2px, -2px); }
                }
                .animate-glitch-1 { animation: glitch-1 3s infinite linear alternate-reverse; }
                .animate-glitch-2 { animation: glitch-2 2.5s infinite linear alternate-reverse; }
            `}</style>
        </section>
    );
};
