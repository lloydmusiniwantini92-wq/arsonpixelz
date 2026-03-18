/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRightIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ScrollReveal } from './fx/ScrollReveal';

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


export const Services: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'light' }) => {
    const [activeService, setActiveService] = useState(0);

    const isDark = theme === 'dark';
    const bgColor = isDark ? '#020202' : '#EBE9DF';
    const textColor = isDark ? '#EBE9DF' : '#1A1A1A';
    const borderColor = isDark ? 'rgba(235,233,223,0.3)' : '#1A1A1A';
    const accentColor = '#D16D6A'; // fiery orange/red

    const services = [
        {
            id: "01",
            title: "Brand Ignition",
            tags: ["Identity Systems", "Strategy", "UI/UX"],
            description: "Your brand is the smoke that signals the fire. We forge identities that burn into the memory of your audience.",
            Visual: SchematicTurbine,
            link: "/branding"
        },
        {
            id: "02",
            title: "Digital Architecture",
            tags: ["Full Stack", "E-Commerce", "App Dev"],
            description: "A beautiful flame needs a solid structure to sustain it. We build robust, scalable platforms that act as your engine.",
            Visual: SchematicStack,
            link: "/dev-ai"
        },
        {
            id: "03",
            title: "Market Acceleration",
            tags: ["SEO", "Performance", "CRO"],
            description: "We act as the accelerant for your business growth using aggressive, data-driven marketing strategies.",
            Visual: SchematicRadar,
            link: "/marketing"
        }
    ];

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 600); 
        return () => clearTimeout(timer);
    }, [activeService]);

    return (
        <section className={`relative py-24 md:py-40 px-6 md:px-12 overflow-hidden ${isDark ? 'text-white' : 'text-black'}`} style={{ backgroundColor: bgColor }}>

            {/* --- 1. BACKGROUND NOISE & DECORATION --- */}
            {isDark && (
                <>
                    {/* Add the orangy void singularity back in for the dark theme */}
                    <div className="absolute left-1/2 top-[20%] -translate-x-1/2 w-[80vw] h-[80vw] rounded-full bg-[#D16D6A]/10 blur-[150px] mix-blend-screen pointer-events-none z-0" />
                    <div className="absolute inset-x-[-20%] inset-y-0 opacity-20 mix-blend-screen bg-cover bg-center pointer-events-none z-0" style={{ backgroundImage: "url('/images/background/kinetic_bg.png')" }} />
                </>
            )}
            <div className={`absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0`}></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full z-0" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(26,26,26,0.05)' }}></div>

            <div className="max-w-[90rem] mx-auto relative z-10">

                {/* Header */}
                <ScrollReveal staggerIndex={0}>
                    <div className="mb-20 text-center">
                        <div className="inline-block border px-4 py-1 mb-6" style={{ borderColor: isDark ? 'rgba(235,233,223,0.3)' : '#1A1A1A' }}>
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em]" style={{ color: textColor }}>System Capabilities</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter" style={{ color: textColor }}>
                            Blueprint <span className="text-[#D16D6A]" style={isDark ? { textShadow: '0 0 40px rgba(209,109,106,0.4)' } : {}}>Engine</span>
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">

                    {/* --- LEFT: INTERACTIVE ACCORDION LIST --- */}
                    <div className="lg:col-span-7 flex flex-col">
                        {services.map((service, index) => (
                            <ScrollReveal key={index} staggerIndex={index + 1}>
                                <div
                                    className={`group border-t transition-all duration-500 cursor-pointer ${activeService === index ? 'pb-12' : isDark ? 'hover:bg-white/5' : 'hover:bg-[#1A1A1A]/5'}`}
                                    style={{ borderColor: borderColor }}
                                    onMouseEnter={() => setActiveService(index)}
                                >
                                    {/* Service Header */}
                                    <div className="py-8 md:py-10 flex items-baseline justify-between">
                                        <div className="flex items-baseline space-x-6 md:space-x-10">
                                            <span 
                                                className={`font-mono text-sm md:text-base font-bold transition-colors duration-300 ${activeService === index ? 'text-[#D16D6A]' : ''}`}
                                                style={activeService !== index ? { color: isDark ? 'rgba(235,233,223,0.4)' : 'rgba(26,26,26,0.4)' } : undefined}
                                            >
                                                / {service.id}
                                            </span>
                                            <h3 
                                                className={`text-3xl md:text-5xl font-black uppercase tracking-tight transition-all duration-300 ${activeService === index ? 'translate-x-4 text-[#D16D6A]' : ''}`}
                                                style={activeService !== index ? { color: textColor } : undefined}
                                            >
                                                {service.title}
                                            </h3>
                                        </div>
                                        <div className="hidden md:block">
                                            <ArrowRightIcon 
                                                className={`w-6 h-6 transition-all duration-300 ${activeService === index ? 'text-[#D16D6A] -rotate-45' : ''}`} 
                                                style={activeService !== index ? { color: textColor, opacity: 0.2 } : undefined}
                                            />
                                        </div>
                                    </div>

                                    {/* Expanded Details (Desktop & Mobile) */}
                                    <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${activeService === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div className="pl-0 md:pl-20 pr-0 md:pr-10 grid md:grid-cols-2 gap-8 pb-8">
                                            <div className="flex flex-col space-y-8">
                                                <p className="text-lg font-medium leading-relaxed" style={{ color: isDark ? 'rgba(235,233,223,0.7)' : 'rgba(26,26,26,0.7)' }}>
                                                    {service.description}
                                                </p>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(service.link);
                                                    }}
                                                    className={`group relative inline-flex items-center justify-center px-6 py-3 w-max overflow-hidden transition-all duration-300 shadow-[4px_4px_0px_rgba(209,109,106,1)] hover:shadow-[2px_2px_0px_rgba(209,109,106,1)] hover:translate-x-[2px] hover:translate-y-[2px] ${isDark ? 'bg-white text-black' : 'bg-[#1A1A1A] text-white'}`}
                                                >
                                                    <span className={`relative z-10 font-mono font-bold uppercase tracking-widest text-[10px] sm:text-xs transition-colors ${isDark ? 'group-hover:text-black' : 'group-hover:text-[#D16D6A]'}`}>
                                                        Explore Capabilities
                                                    </span>
                                                    <ArrowRightIcon className={`relative z-10 w-3 h-3 sm:w-4 sm:h-4 ml-2 transition-colors group-hover:translate-x-1 duration-300 ${isDark ? 'text-black group-hover:text-[#D16D6A]' : 'text-white group-hover:text-[#D16D6A]'}`} />
                                                </button>
                                            </div>
                                            <ul className="space-y-2">
                                                {service.tags.map((tag, i) => (
                                                    <li key={i} className="flex items-center space-x-3 font-mono text-sm font-bold uppercase tracking-wider" style={{ color: textColor }}>
                                                        <div className="w-1.5 h-1.5 bg-[#D16D6A]"></div>
                                                        <span>{tag}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                        <ScrollReveal staggerIndex={services.length + 1}>
                            <div className="border-t" style={{ borderColor: borderColor }}></div>
                        </ScrollReveal>
                    </div>

                    {/* --- RIGHT: HOLOGRAPHIC PREVIEW WINDOW (STICKY) --- */}
                    <div className="hidden lg:block lg:col-span-5 sticky top-32">
                        <ScrollReveal staggerIndex={1}>
                            <div className="relative w-full h-[520px] bg-[#080808] overflow-hidden" style={{ boxShadow: '0 0 0 1px rgba(209,109,106,0.2), 0 20px 60px rgba(0,0,0,0.5)' }}>

                                {/* Top bar — terminal chrome */}
                                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0d0d0d]">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[#D16D6A] animate-pulse" />
                                        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/30">
                                            BLUEPRINT_ENGINE // SYSTEM.RENDER
                                        </span>
                                    </div>
                                    <span className="font-mono text-[9px] text-white/20 tracking-widest">
                                        SVC_{services[activeService].id}
                                    </span>
                                </div>

                                {/* Faint grid overlay */}
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-[0.04]"
                                    style={{ backgroundImage: 'linear-gradient(rgba(209,109,106,1) 1px, transparent 1px), linear-gradient(90deg, rgba(209,109,106,1) 1px, transparent 1px)', backgroundSize: '2.5rem 2.5rem' }}
                                />

                                {/* Corner brackets */}
                                <div className="absolute top-12 left-3 w-5 h-5 border-t border-l border-[#D16D6A]/40" />
                                <div className="absolute top-12 right-3 w-5 h-5 border-t border-r border-[#D16D6A]/40" />
                                <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#D16D6A]/40" />
                                <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#D16D6A]/40" />

                                {/* Red top glow */}
                                <div className="absolute top-8 left-0 right-0 h-40 bg-[radial-gradient(ellipse_at_50%_0%,rgba(209,109,106,0.12)_0%,transparent_70%)] pointer-events-none" />

                                {/* Schematic visuals — each service has a visual that now renders dark */}
                                <div className="absolute inset-0 pt-12 pb-16">
                                    {services.map((service, index) => {
                                        const VisualComponent = service.Visual;
                                        return (
                                            <div
                                                key={index}
                                                className={`absolute inset-0 pt-12 pb-16 transition-all duration-500 ${activeService === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                                            >
                                                <VisualComponent />
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Scan sweep */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D16D6A]/[0.04] to-transparent animate-[scan_5s_linear_infinite] pointer-events-none" />

                                {/* Bottom stats strip */}
                                <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-[#0d0d0d] px-4 py-3 flex gap-6">
                                    {[
                                        { label: 'MODULE', value: services[activeService].id },
                                        { label: 'STATUS', value: 'ACTIVE' },
                                        { label: 'INTEGRITY', value: '100%' },
                                    ].map(s => (
                                        <div key={s.label} className="flex flex-col gap-0.5">
                                            <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-white/20">{s.label}</span>
                                            <span className="font-mono text-[10px] font-bold tracking-widest text-[#D16D6A]">{s.value}</span>
                                        </div>
                                    ))}
                                    <div className="ml-auto flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#D16D6A] animate-pulse" />
                                        <span className="font-mono text-[8px] tracking-widest text-white/20 uppercase">LIVE</span>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
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