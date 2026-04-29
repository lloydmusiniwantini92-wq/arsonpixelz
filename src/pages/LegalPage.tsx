import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

import { useIgnition } from '../components/layout/IgnitionRuntime';

export const LegalPage = () => {
    const { lenis } = useIgnition();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
        window.scrollTo(0, 0);
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
        <div ref={containerRef} className="min-h-screen bg-[#030303] text-white pt-40 pb-32 px-6 md:px-12 relative overflow-hidden">
            {/* Tactical SVG Noise Texture */}
            <div 
                className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none z-0" 
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Harsh Background Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
                <div className="absolute inset-0 bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-[size:5rem_5rem]" />
            </div>

            <div className="max-w-[1700px] mx-auto relative z-10">
                
                {/* ── HEADER BLOCK ── */}
                <div className="mb-32 border-l-[12px] border-[#FF3E00] pl-12">
                    <span className="font-mono text-xs font-black tracking-[1em] uppercase text-[#FF3E00] block mb-8">
                        LEGAL.
                    </span>
                    <h1 className="text-7xl md:text-[11rem] font-black uppercase tracking-tighter leading-[0.8] mb-12" style={{ fontFamily: 'Anton, sans-serif' }}>
                        THE <br /> <span className="text-[#FF3E00]">PROTOCOLS</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-32">
                    
                    {/* ── LEFT: NAVIGATION ── */}
                    <div className="lg:col-span-4 sticky top-40 self-start hidden lg:block">
                        <nav className="space-y-6">
                            {[
                                { id: 'terms', num: '01', title: 'TERMS.' },
                                { id: 'privacy', num: '02', title: 'PRIVACY.' },
                                { id: 'cookies', num: '03', title: 'COOKIES.' },
                                { id: 'disclaimer', num: '04', title: 'LIABILITY.' }
                            ].map(link => (
                                <a 
                                    key={link.id}
                                    href={`#${link.id}`} 
                                    className="block group relative"
                                >
                                    <div className="flex items-center gap-6 py-4 border-b-2 border-white/5 group-hover:border-[#FF3E00] transition-colors">
                                        <span className="font-mono text-xs font-black text-[#FF3E00] opacity-40 group-hover:opacity-100 transition-opacity">{link.num}</span>
                                        <span className="font-mono text-[11px] font-black uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-colors">{link.title}</span>
                                    </div>
                                    <div className="absolute left-[-12px] top-0 bottom-0 w-1 bg-[#FF3E00] scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                                </a>
                            ))}
                        </nav>

                        <div className="mt-20 p-8 border-4 border-white/10 bg-white/[0.02] shadow-[15px_15px_0px_rgba(255,62,0,0.1)]">
                            <h4 className="font-mono text-[10px] font-black text-[#FF3E00] mb-4 tracking-[0.3em] uppercase">NOTICE:</h4>
                            <p className="font-mono text-[9px] leading-relaxed text-white/40 uppercase font-bold">
                                BY REMAINING WITHIN THIS SECTOR, YOU ACCEPT ALL PROTOCOLS. DEVIATION IS NOT PERMITTED.
                            </p>
                        </div>
                    </div>

                    {/* ── RIGHT: CONTENT ── */}
                    <div className="lg:col-span-8 space-y-40 pb-64">
                        
                        {/* SECTION 01: TERMS */}
                        <section id="terms" className="relative">
                            <div className="flex items-end gap-6 mb-16">
                                <span className="font-mono text-5xl font-black text-[#FF3E00] leading-none">01</span>
                                <h2 className="font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none" style={{ fontFamily: 'Anton, sans-serif' }}>
                                    TERMS OF <br/> <span className="text-[#FF3E00]">SERVICE</span>
                                </h2>
                            </div>
                            <div className="space-y-12 font-mono text-xs md:text-sm font-bold uppercase tracking-wider leading-loose text-white/70">
                                <div className="p-8 border-2 border-white/10 bg-white/[0.01]">
                                    <p className="mb-8"><span className="text-white">1.1 THE CONSTRUCT.</span> BY INTERACTING WITH ARSON PIXELZ DIGITAL INFRASTRUCTURE, YOU AGREE TO BE BOUND BY THESE PROTOCOLS. ACCESS IS A PRIVILEGE, NOT A RIGHT.</p>
                                    <p className="mb-8"><span className="text-white">1.2 INTELLECTUAL ARMORY.</span> ALL ARCHITECTURES, CODE-SIGNALS, AND VISUAL DEPLOYMENTS ARE PROTECTED UNDER INTERNATIONAL PROPERTY LAW. REVERSE ENGINEERING IS A BREACH OF SECURITY.</p>
                                    <p><span className="text-white">1.3 TERMINATION.</span> WE RESERVE THE RIGHT TO TERMINATE ACCESS TO ANY ENTITY THAT COMPROMISES THE INTEGRITY OF OUR SYSTEMS.</p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="border-4 border-white p-8 shadow-[10px_10px_0px_#FF3E00]">
                                        <h4 className="text-[#FF3E00] mb-4 font-black tracking-widest text-[10px]">PROHIBITED ACTIONS:</h4>
                                        <ul className="space-y-4 text-[9px] font-black opacity-60">
                                            <li>- UNAUTHORIZED SYSTEM SCRAPING</li>
                                            <li>- BRAND IDENTITY SPOOFING</li>
                                            <li>- REPRODUCTION WITHOUT LICENSE</li>
                                        </ul>
                                    </div>
                                    <div className="border-4 border-white p-8 shadow-[10px_10px_0px_#FF3E00]">
                                        <h4 className="text-[#FF3E00] mb-4 font-black tracking-widest text-[10px]">USER OBLIGATIONS:</h4>
                                        <ul className="space-y-4 text-[9px] font-black opacity-60">
                                            <li>- SECURE AUTHENTICATION</li>
                                            <li>- COMPLIANCE WITH THE BURN</li>
                                            <li>- NO DESTRUCTIVE INPUTS</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* SECTION 02: PRIVACY */}
                        <section id="privacy" className="relative">
                            <div className="flex items-end gap-6 mb-16">
                                <span className="font-mono text-5xl font-black text-[#FF3E00] leading-none">02</span>
                                <h2 className="font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none" style={{ fontFamily: 'Anton, sans-serif' }}>
                                    PRIVACY <br/> <span className="text-[#FF3E00]">GOVERNANCE</span>
                                </h2>
                            </div>
                            <div className="space-y-10 font-mono text-xs md:text-sm font-bold uppercase tracking-wider leading-loose text-white/70">
                                <p className="text-xl text-white font-black italic border-l-4 border-[#FF3E00] pl-8 py-4 bg-white/[0.03]">
                                    "YOUR DATA IS A STRATEGIC ASSET. WE DEFEND IT WITH ABSOLUTE INTENSITY."
                                </p>
                                <p className="mb-8">
                                    <span className="text-white">2.1 TELEMETRY HARVEST.</span> WE COLLECT ONLY WHAT IS NECESSARY TO OPTIMIZE YOUR EXPERIENCE: GPU PERFORMANCE DATA, VIEWPORT RESOLUTION, AND NAVIGATIONAL FLOW.
                                </p>
                                <p className="mb-8">
                                    <span className="text-white">2.2 IDENTITY SIGNATURES.</span> PERSONAL DATA PROVIDED VOLUNTARILY (NAME, EMAIL) IS ENCRYPTED VIA AES-256 AND NEVER TRADED TO THIRD-PARTY BROKERS.
                                </p>
                                <div className="p-8 border-2 border-white bg-[#FF3E00] text-black">
                                    <h4 className="font-black mb-4 tracking-[0.2em]">DATA_ENCRYPTION_STATUS:</h4>
                                    <div className="flex justify-between items-center font-mono text-xs font-black">
                                        <span>IN_TRANSIT: TLS 1.3</span>
                                        <span>AT_REST: AES-256</span>
                                        <span>STATUS: SECURE</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* SECTION 03: COOKIES */}
                        <section id="cookies" className="relative">
                            <div className="flex items-end gap-6 mb-16">
                                <span className="font-mono text-5xl font-black text-[#FF3E00] leading-none">03</span>
                                <h2 className="font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none" style={{ fontFamily: 'Anton, sans-serif' }}>
                                    SIGNAL <br/> <span className="text-[#FF3E00]">CONSENT</span>
                                </h2>
                            </div>
                            <div className="space-y-8 font-mono text-xs md:text-sm font-bold uppercase tracking-wider leading-loose text-white/70">
                                <p>
                                    <span className="text-white">3.1 PACKET STORAGE.</span> WE UTILIZE LOCALSTORAGE AND SESSIONSTORAGE PACKETS TO PERSIST YOUR DEPLOYMENT PREFERENCES. WE DO NOT USE INTRUSIVE TRACKING PIXELS.
                                </p>
                                <p>
                                    <span className="text-white">3.2 OPT-OUT.</span> DELETING YOUR BROWSER CACHE WILL RESET ALL ARCHIVE DATA. NOTE THAT THIS MAY DEGRADE SYSTEM PERFORMANCE.
                                </p>
                            </div>
                        </section>

                        {/* SECTION 04: DISCLAIMER */}
                        <section id="disclaimer" className="relative">
                            <div className="flex items-end gap-6 mb-16">
                                <span className="font-mono text-5xl font-black text-[#FF3E00] leading-none">04</span>
                                <h2 className="font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none" style={{ fontFamily: 'Anton, sans-serif' }}>
                                    LIABILITY <br/> <span className="text-[#FF3E00]">LIMITS</span>
                                </h2>
                            </div>
                            <div className="p-12 border-4 border-[#FF3E00] bg-black shadow-[20px_20px_0px_white]">
                                <p className="font-mono text-sm md:text-lg font-black uppercase leading-relaxed text-white tracking-tight">
                                    ARSON PIXELZ IS NOT LIABLE FOR ANY LOSS OF REVENUE, DATA, OR DIGITAL REPUTATION ARISING FROM SYSTEM OVERLOAD, EXCESSIVE EXPOSURE TO HIGH-FIDELITY ASSETS, OR MISUSE OF THE ARMORY MODULES. PROCEED AT YOUR OWN RISK.
                                </p>
                            </div>
                        </section>

                    </div>
                </div>
            </div>

            {/* Bottom Finality */}
            <div className="max-w-[1700px] mx-auto border-t-2 border-white/10 pt-20 text-center">
                <p className="font-mono text-[10px] text-white/20 uppercase tracking-[1em] font-black">
                    SIGNAL_END // ARSON_PIXELZ_LEGAL_DIVISION
                </p>
            </div>
        </div>
    );
};
