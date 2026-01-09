/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRightIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

// --- INTERNAL HOOK: INTERSECTION OBSERVER ---
const useInView = (options = { threshold: 0.1 }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.disconnect();
            }
        }, options);

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [options]);

    return [ref, isInView] as const;
};

// --- VISUAL 1: THE TURBINE (Branding) ---
const SchematicTurbine = () => (
    <div className="relative w-full h-full flex items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute w-64 h-64 border border-[#D16D6A]/30 rounded-full animate-[spin_10s_linear_infinite]">
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-[#D16D6A] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#D16D6A]"></div>
        </div>
        {/* Inner Fan */}
        <div className="relative w-40 h-40 border-2 border-[#1A1A1A] rounded-full flex items-center justify-center animate-[spin_3s_linear_infinite_reverse]">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                <div key={i} className="absolute w-[1px] h-full bg-[#1A1A1A]/20" style={{ transform: `rotate(${deg}deg)` }}></div>
            ))}
            <div className="w-10 h-10 bg-[#D16D6A] rounded-full opacity-80 mix-blend-multiply animate-pulse"></div>
        </div>
        {/* Label */}
        <div className="absolute bottom-10 font-mono text-[10px] tracking-[0.3em] text-[#1A1A1A]">FIG. A // IGNITION</div>
    </div>
);

// --- VISUAL 2: THE STACK (Dev) ---
const SchematicStack = () => (
    <div className="relative w-full h-full flex items-center justify-center perspective-[1000px]">
        <div className="relative w-48 h-48 preserve-3d animate-[float_4s_ease-in-out_infinite]">
            {/* Layer 1 */}
            <div className="absolute top-0 left-0 w-full h-full border border-[#1A1A1A] bg-[#1A1A1A]/5 transform rotate-x-[60deg] rotate-z-[45deg] translate-z-[0px] shadow-xl transition-all duration-500"></div>
            {/* Layer 2 */}
            <div className="absolute top-0 left-0 w-full h-full border border-[#D16D6A] bg-[#D16D6A]/10 transform rotate-x-[60deg] rotate-z-[45deg] translate-z-[40px] shadow-xl animate-[pulse_3s_infinite]"></div>
            {/* Layer 3 */}
            <div className="absolute top-0 left-0 w-full h-full border border-[#1A1A1A] bg-white/50 transform rotate-x-[60deg] rotate-z-[45deg] translate-z-[80px] shadow-xl">
                <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
                    {[...Array(16)].map((_, i) => (
                        <div key={i} className="border border-[#1A1A1A]/10"></div>
                    ))}
                </div>
            </div>
        </div>
        <div className="absolute bottom-10 font-mono text-[10px] tracking-[0.3em] text-[#1A1A1A]">FIG. B // ARCHITECTURE</div>
    </div>
);

// --- VISUAL 3: THE RADAR (Marketing) ---
const SchematicRadar = () => (
    <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-64 h-40 border-b-2 border-l-2 border-[#1A1A1A] flex items-end overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:1rem_1rem]"></div>

            {/* The Graph Line */}
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                    d="M0,100 Q20,90 30,70 T60,40 T100,10"
                    fill="none"
                    stroke="#D16D6A"
                    strokeWidth="2"
                    className="drop-shadow-[0_2px_4px_rgba(209,109,106,0.5)]"
                    vectorEffect="non-scaling-stroke"
                />
                {/* Area Fill */}
                <path
                    d="M0,100 Q20,90 30,70 T60,40 T100,10 V100 H0Z"
                    fill="#D16D6A"
                    fillOpacity="0.1"
                />
            </svg>

            {/* Moving Cursor */}
            <div className="absolute top-0 right-0 w-[1px] h-full bg-[#1A1A1A] animate-[scan_2s_linear_infinite]"></div>
        </div>
        <div className="absolute bottom-10 font-mono text-[10px] tracking-[0.3em] text-[#1A1A1A]">FIG. C // VELOCITY</div>
    </div>
);


export const Services: React.FC = () => {
    const [ref, isVisible] = useInView({ threshold: 0.1 });
    const [activeService, setActiveService] = useState(0);

    const services = [
        {
            id: "01",
            title: "Brand Ignition",
            tags: ["Identity Systems", "Strategy", "UI/UX"],
            description: "Your brand is the smoke that signals the fire. We forge identities that burn into the memory of your audience.",
            Visual: SchematicTurbine
        },
        {
            id: "02",
            title: "Digital Architecture",
            tags: ["Full Stack", "E-Commerce", "App Dev"],
            description: "A beautiful flame needs a solid structure to sustain it. We build robust, scalable platforms that act as your engine.",
            Visual: SchematicStack
        },
        {
            id: "03",
            title: "Market Acceleration",
            tags: ["SEO", "Performance", "CRO"],
            description: "We act as the accelerant for your business growth using aggressive, data-driven marketing strategies.",
            Visual: SchematicRadar
        }
    ];

    return (
        <section className="relative py-24 md:py-40 px-6 md:px-12 bg-[#EBE9DF] overflow-hidden">

            {/* --- 1. BACKGROUND NOISE & DECORATION --- */}
            <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-[#1A1A1A]/5"></div>

            <div className="max-w-[90rem] mx-auto relative z-10">

                {/* Header */}
                <div ref={ref} className={`mb-20 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-block border border-[#1A1A1A] px-4 py-1 mb-6">
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A]">System Capabilities</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-[#1A1A1A] uppercase tracking-tighter">
                        Blueprint <span className="text-[#D16D6A]">Engine</span>
                    </h2>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">

                    {/* --- LEFT: INTERACTIVE ACCORDION LIST --- */}
                    <div className="lg:col-span-7 flex flex-col">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className={`group border-t border-[#1A1A1A] transition-all duration-500 cursor-pointer ${activeService === index ? 'pb-12' : 'hover:bg-[#1A1A1A]/5'}`}
                                onMouseEnter={() => setActiveService(index)}
                            >
                                {/* Service Header */}
                                <div className="py-8 md:py-10 flex items-baseline justify-between">
                                    <div className="flex items-baseline space-x-6 md:space-x-10">
                                        <span className={`font-mono text-sm md:text-base font-bold transition-colors duration-300 ${activeService === index ? 'text-[#D16D6A]' : 'text-[#1A1A1A]/40'}`}>
                                            / {service.id}
                                        </span>
                                        <h3 className={`text-3xl md:text-5xl font-black uppercase tracking-tight transition-all duration-300 ${activeService === index ? 'translate-x-4 text-[#D16D6A]' : 'text-[#1A1A1A]'}`}>
                                            {service.title}
                                        </h3>
                                    </div>
                                    <div className="hidden md:block">
                                        <ArrowRightIcon className={`w-6 h-6 transition-all duration-300 ${activeService === index ? 'text-[#D16D6A] -rotate-45' : 'text-[#1A1A1A] opacity-20'}`} />
                                    </div>
                                </div>

                                {/* Expanded Details (Desktop & Mobile) */}
                                <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${activeService === index ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="pl-0 md:pl-20 pr-0 md:pr-10 grid md:grid-cols-2 gap-8">
                                        <p className="text-lg font-medium text-[#1A1A1A]/70 leading-relaxed">
                                            {service.description}
                                        </p>
                                        <ul className="space-y-2">
                                            {service.tags.map((tag, i) => (
                                                <li key={i} className="flex items-center space-x-3 font-mono text-sm font-bold uppercase tracking-wider text-[#1A1A1A]">
                                                    <div className="w-1.5 h-1.5 bg-[#D16D6A]"></div>
                                                    <span>{tag}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="border-t border-[#1A1A1A]"></div>
                    </div>

                    {/* --- RIGHT: HOLOGRAPHIC PREVIEW WINDOW (STICKY) --- */}
                    <div className="hidden lg:block lg:col-span-5 h-[500px] sticky top-32">
                        <div className="relative w-full h-full bg-[#EBE9DF] border-2 border-[#1A1A1A] p-2 shadow-[12px_12px_0px_#1A1A1A]">

                            {/* Blueprint Container */}
                            <div className="relative w-full h-full border border-[#1A1A1A]/20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-20 overflow-hidden">
                                {/* Grid Overlay */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>

                                {/* HUD Corners */}
                                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#1A1A1A]"></div>
                                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#1A1A1A]"></div>
                                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#1A1A1A]"></div>
                                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#1A1A1A]"></div>

                                {/* Active Visual Render */}
                                <div className="absolute inset-0 p-12 transition-all duration-700 ease-out key={activeService}">
                                    {services.map((service, index) => {
                                        const VisualComponent = service.Visual;
                                        return (
                                            <div
                                                key={index}
                                                className={`absolute inset-0 transition-all duration-500 transform ${activeService === index ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
                                            >
                                                <VisualComponent />
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Scanner Line */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D16D6A]/5 to-transparent animate-[scan_4s_linear_infinite] pointer-events-none"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- GLOBAL STYLES FOR SCHEMATICS --- */}
            <style>{`
            .preserve-3d { transform-style: preserve-3d; }
            
            @keyframes scan {
                0% { transform: translateY(-100%); }
                100% { transform: translateY(100%); }
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
        `}</style>
        </section>
    );
};