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
        <div className="absolute w-64 h-64 border border-[#FF3E00]/20 rounded-full animate-[spin_12s_linear_infinite]">
            <div className="absolute top-0 left-1/2 w-3 h-3 bg-[#FF3E00] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_#FF3E00]"></div>
        </div>
        {/* Inner Fan */}
        <div className="relative w-40 h-40 border-2 border-white/5 rounded-full flex items-center justify-center animate-[spin_4s_linear_infinite_reverse]">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                <div key={i} className="absolute w-[1px] h-full bg-white/10" style={{ transform: `rotate(${deg}deg)` }}></div>
            ))}
            <div className="w-12 h-12 bg-[#FF3E00] rounded-full opacity-60 mix-blend-screen animate-pulse shadow-[0_0_30px_#FF3E00]"></div>
        </div>
        {/* Label */}
        <div className="absolute bottom-10 font-mono text-[9px] tracking-[0.4em] text-white/20 font-black uppercase">FIG_A // IGNITION_SEQUENCE</div>
    </div>
);

// --- VISUAL 2: THE STACK (Dev) ---
const SchematicStack = () => (
    <div className="relative w-full h-full flex items-center justify-center perspective-[1200px]">
        <div className="relative w-48 h-48 preserve-3d animate-[float_5s_ease-in-out_infinite]">
            {/* Layer 1 */}
            <div className="absolute top-0 left-0 w-full h-full border border-white/10 bg-white/[0.02] transform rotate-x-[60deg] rotate-z-[45deg] translate-z-[0px] shadow-2xl"></div>
            {/* Layer 2 */}
            <div className="absolute top-0 left-0 w-full h-full border border-[#FF3E00]/50 bg-[#FF3E00]/10 transform rotate-x-[60deg] rotate-z-[45deg] translate-z-[50px] shadow-[0_0_30px_rgba(255,62,0,0.2)] animate-pulse"></div>
            {/* Layer 3 */}
            <div className="absolute top-0 left-0 w-full h-full border border-white/20 bg-white/[0.05] transform rotate-x-[60deg] rotate-z-[45deg] translate-z-[100px] shadow-2xl">
                <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
                    {[...Array(16)].map((_, i) => (
                        <div key={i} className="border border-white/10"></div>
                    ))}
                </div>
            </div>
        </div>
        <div className="absolute bottom-10 font-mono text-[9px] tracking-[0.4em] text-white/20 font-black uppercase">FIG_B // ARCHITECTURE_STACK</div>
    </div>
);

// --- VISUAL 3: THE RADAR (Marketing) ---
const SchematicRadar = () => (
    <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-72 h-44 border-b border-l border-white/10 flex items-end overflow-hidden bg-white/[0.01]">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:1rem_1rem]"></div>

            {/* The Graph Line */}
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                    d="M0,100 Q20,90 30,70 T60,40 T100,10"
                    fill="none"
                    stroke="#FF3E00"
                    strokeWidth="3"
                    className="drop-shadow-[0_0_8px_rgba(255,62,0,0.6)]"
                    vectorEffect="non-scaling-stroke"
                />
                {/* Area Fill */}
                <path
                    d="M0,100 Q20,90 30,70 T60,40 T100,10 V100 H0Z"
                    fill="#FF3E00"
                    fillOpacity="0.05"
                />
            </svg>

            {/* Moving Cursor */}
            <div className="absolute top-0 right-0 w-[2px] h-full bg-[#FF3E00] shadow-[0_0_10px_#FF3E00] animate-[scan_2s_linear_infinite]"></div>
        </div>
        <div className="absolute bottom-10 font-mono text-[9px] tracking-[0.4em] text-white/20 font-black uppercase">FIG_C // VELOCITY_METRIC</div>
    </div>
);


export const Services: React.FC = () => {
    const [activeService, setActiveService] = useState(0);

    const bgColor = '#000000';
    const textColor = '#FFFFFF';
    const borderColor = 'rgba(255,255,255,0.1)';
    const accentColor = '#FF3E00'; // Safety Orange

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
        <section className="relative py-24 md:py-40 px-6 md:px-12 overflow-hidden text-white" style={{ backgroundColor: bgColor }}>

            {/* --- 1. BACKGROUND NOISE & DECORATION --- */}
            <div className="absolute left-1/2 top-[20%] -translate-x-1/2 w-[80vw] h-[80vw] rounded-full bg-[#FF3E00]/5 blur-[150px] mix-blend-screen pointer-events-none z-0" />
            <div className="absolute inset-x-[-20%] inset-y-0 opacity-10 mix-blend-screen bg-cover bg-center pointer-events-none z-0" style={{ backgroundImage: "url('/images/background/kinetic_bg.png')" }} />
            
            <div className={`absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0`}></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full z-0 bg-white/5"></div>

            <div className="max-w-[90rem] mx-auto relative z-10">

                {/* Header */}
                <ScrollReveal staggerIndex={0}>
                    <div className="mb-24 text-center">
                        <div className="inline-block border px-6 py-2 mb-8 border-white/10 bg-white/[0.03]">
                            <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-white/40">System Capabilities</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic">
                            Blueprint <span className="text-[#FF3E00]" style={{ textShadow: '0 0 40px rgba(255,62,0,0.3)' }}>Engine</span>
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">

                    {/* --- LEFT: INTERACTIVE ACCORDION LIST --- */}
                    <div className="lg:col-span-7 flex flex-col">
                        {services.map((service, index) => (
                            <ScrollReveal key={index} staggerIndex={index + 1}>
                                <div
                                    className={`group border-t transition-all duration-500 cursor-pointer ${activeService === index ? 'pb-12 bg-white/[0.02]' : 'hover:bg-white/[0.03]'}`}
                                    style={{ borderColor: borderColor }}
                                    onMouseEnter={() => setActiveService(index)}
                                >
                                    {/* Service Header */}
                                    <div className="py-10 md:py-14 flex items-baseline justify-between px-6">
                                        <div className="flex items-baseline space-x-6 md:space-x-12">
                                            <span 
                                                className={`font-mono text-sm md:text-lg font-black transition-colors duration-500 ${activeService === index ? 'text-[#FF3E00]' : 'text-white/20'}`}
                                            >
                                                / {service.id}
                                            </span>
                                            <h3 
                                                className={`text-3xl md:text-6xl font-black uppercase tracking-tighter transition-all duration-500 italic ${activeService === index ? 'translate-x-6 text-[#FF3E00]' : 'text-white'}`}
                                            >
                                                {service.title}
                                            </h3>
                                        </div>
                                        <div className="hidden md:block">
                                            <ArrowRightIcon 
                                                className={`w-8 h-8 transition-all duration-500 ${activeService === index ? 'text-[#FF3E00] -rotate-45' : 'text-white/10'}`} 
                                            />
                                        </div>
                                    </div>

                                    {/* Expanded Details (Desktop & Mobile) */}
                                    <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16, 1, 0.3, 1)] ${activeService === index ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div className="pl-6 md:pl-24 pr-6 md:pr-12 grid md:grid-cols-2 gap-12 pb-12">
                                            <div className="flex flex-col space-y-10">
                                                <p className="text-lg font-syne font-medium leading-relaxed text-white/50 uppercase tracking-tight">
                                                    {service.description}
                                                </p>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        navigate(service.link);
                                                    }}
                                                    className="group relative inline-flex items-center justify-center px-10 py-5 w-max bg-white text-black transition-all duration-500 overflow-hidden"
                                                >
                                                    <span className="relative z-10 font-syne font-black uppercase tracking-[0.3em] text-[11px]">
                                                        Explore Capabilities
                                                    </span>
                                                    <ArrowRightIcon className="relative z-10 w-4 h-4 ml-3 transition-transform group-hover:translate-x-2 duration-500" />
                                                    <div className="absolute inset-0 bg-[#FF3E00] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                                </button>
                                            </div>
                                            <ul className="space-y-4">
                                                {service.tags.map((tag, i) => (
                                                    <li key={i} className="flex items-center space-x-4 font-mono text-[11px] font-black uppercase tracking-[0.3em] text-white/40">
                                                        <div className="w-2 h-2 bg-[#FF3E00]"></div>
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
                            <div className="relative w-full h-[560px] bg-[#050505] overflow-hidden border border-white/5" style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.8)' }}>

                                {/* Top bar — terminal chrome */}
                                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#080808]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-[#FF3E00] animate-pulse" />
                                        <span className="font-mono text-[10px] font-black tracking-[0.4em] uppercase text-white/30">
                                            BLUEPRINT_ENGINE // SYSTEM.RENDER
                                        </span>
                                    </div>
                                    <span className="font-mono text-[10px] text-white/20 tracking-[0.3em]">
                                        SVC_{services[activeService].id}
                                    </span>
                                </div>

                                {/* Faint grid overlay */}
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-[0.03]"
                                    style={{ backgroundImage: 'linear-gradient(rgba(255,62,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,62,0,1) 1px, transparent 1px)', backgroundSize: '3rem 3rem' }}
                                />

                                {/* Corner brackets */}
                                <div className="absolute top-16 left-6 w-8 h-8 border-t border-l border-[#FF3E00]/30" />
                                <div className="absolute top-16 right-6 w-8 h-8 border-t border-r border-[#FF3E00]/30" />
                                <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-[#FF3E00]/30" />
                                <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-[#FF3E00]/30" />

                                {/* Orange top glow */}
                                <div className="absolute top-12 left-0 right-0 h-48 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,62,0,0.15)_0%,transparent_70%)] pointer-events-none" />

                                {/* Schematic visuals — each service has a visual that now renders dark */}
                                <div className="absolute inset-0 pt-16 pb-20">
                                    {services.map((service, index) => {
                                        const VisualComponent = service.Visual;
                                        return (
                                            <div
                                                key={index}
                                                className={`absolute inset-0 pt-16 pb-20 transition-all duration-700 ${activeService === index ? 'opacity-100 scale-100' : 'opacity-0 scale-90 blur-xl pointer-events-none'}`}
                                            >
                                                <VisualComponent />
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Scan sweep */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF3E00]/[0.05] to-transparent animate-[scan_6s_linear_infinite] pointer-events-none" />

                                {/* Bottom stats strip */}
                                <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-[#080808] px-6 py-4 flex gap-8">
                                    {[
                                        { label: 'MODULE', value: services[activeService].id },
                                        { label: 'STATUS', value: 'ACTIVE' },
                                        { label: 'INTEGRITY', value: '100%' },
                                    ].map(s => (
                                        <div key={s.label} className="flex flex-col gap-1">
                                            <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/20 font-black">{s.label}</span>
                                            <span className="font-mono text-[11px] font-black tracking-widest text-[#FF3E00]">{s.value}</span>
                                        </div>
                                    ))}
                                    <div className="ml-auto flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF3E00] animate-pulse shadow-[0_0_10px_#FF3E00]" />
                                        <span className="font-mono text-[8px] font-black tracking-[0.4em] text-white/30 uppercase">LIVE</span>
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
                50% { transform: translateY(-15px); }
            }
        `}</style>
        </section>
    );
};