import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ShopHero = () => {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!containerRef.current) return;

            const tl = gsap.timeline();

            // Entrance animation for content blocks
            tl.from('.monolith-item', {
                opacity: 0,
                x: -30,
                duration: 1.2,
                stagger: 0.15,
                ease: "power4.out"
            });

            // Parallax for the massive background text
            gsap.to('.monolith-watermark', {
                y: -100,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });

            // Animated progress bars
            gsap.from('.data-gauge-bar', {
                width: 0,
                duration: 2,
                ease: "power2.inOut",
                stagger: 0.5
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section 
            ref={containerRef} 
            className="relative min-h-screen flex flex-col justify-start overflow-hidden bg-black pt-12 md:pt-14"
            style={{ fontFamily: "'Inter', sans-serif" }}
        >
            {/* ── BACKGROUND LAYER ── */}
            <div className="absolute inset-0 z-0">
                <img 
                    className="w-full h-full object-cover opacity-30 grayscale contrast-125 brightness-75"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHjAPmBdfu92fLFpcVEUQRyn5_EyATZ2ZNYnSeTQ9B6hIslK0Uo_gTKJAuEFfheot5ONWRJyPru1xuHRFANRdqGfjORX17m6y6Pf-lvLIXJXOkGQD48qJm7qCbxmlEXyxhBoLpoZ8Z1wvY3Nyn7evpHsZKxRSLTYCkybMFf8wSXaYaRKjY8LycGSTnQuuI5jna9nB-innAgSMOLvCZ5NRCXQC8wI79CirIBiIznEgEodrG2VZGSVWNiHzc9otEt8iFMUsk7J1NcA"
                    alt="Digital Monolith Architecture"
                />
                {/* Gradient Voids */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
                
                {/* Scanline Overlay */}
                <div 
                    className="absolute inset-0 opacity-[0.08] pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(to bottom, rgba(255, 62, 0, 0.15) 50%, rgba(0, 0, 0, 0) 50%)',
                        backgroundSize: '100% 4px'
                    }}
                />
            </div>

            {/* ── ASYMMETRIC GRID CONTENT ── */}
            <div className="relative z-10 grid grid-cols-12 min-h-screen px-8 md:px-12 w-full max-w-[120rem] mx-auto">
                
                {/* LEFT METADATA COLUMN (2 cols) */}
                <div className="hidden lg:flex col-span-2 flex-col justify-between py-24 border-r border-[#FF562B]/10">
                    <div className="monolith-item space-y-12">
                        {/* System Status Gauge */}
                        <div className="space-y-3 pr-8">
                            <span className="text-[10px] font-bold tracking-[0.4em] text-[#FF3E00] uppercase font-['Space_Grotesk']">SYSTEM_STATUS</span>
                            <div className="h-[2px] w-full bg-[#1B1B1B]">
                                <div className="data-gauge-bar h-full w-3/4 bg-[#A7C8FF]" />
                            </div>
                            <span className="block text-[9px] text-zinc-500 uppercase tracking-widest font-mono">ENCRYPTION: AES-256_ACTIVE</span>
                        </div>

                        {/* Authorization Nodes */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-zinc-500 hover:text-white transition-colors">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3E00]/40 animate-pulse" />
                                <span className="text-[10px] uppercase font-mono tracking-widest leading-none">Node_Arch_v1.7</span>
                            </div>
                            <div className="flex items-center gap-3 text-zinc-500 hover:text-white transition-colors">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3E00]/40" />
                                <span className="text-[10px] uppercase font-mono tracking-widest leading-none">Level_07_Auth</span>
                            </div>
                        </div>
                    </div>

                    {/* System Log Overlay */}
                    <div className="monolith-item text-[10px] font-mono text-zinc-600 leading-relaxed uppercase tracking-tighter pr-4">
                        [LOG_INIT]<br/>
                        Establishing handshake...<br/>
                        Uplink secure.<br/>
                        Sector 11 deployment...<br/>
                        Status: <span className="text-[#FF3E00]">UNCOMPROMISED</span>
                    </div>
                </div>

                {/* CENTRAL MASSIVE CONTENT (8 cols) */}
                <div className="col-span-12 lg:col-span-8 flex flex-col justify-start lg:pl-20 relative pt-4 md:pt-6 lg:pt-8">
                    
                    {/* Watermark Background Text */}
                    <div className="monolith-watermark absolute -left-12 -top-12 opacity-[0.03] select-none pointer-events-none">
                        <span className="text-[25vw] font-black tracking-tighter uppercase whitespace-nowrap" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            CORE
                        </span>
                    </div>

                    <div className="monolith-item space-y-3 mb-6">
                        <span className="inline-block px-4 py-1.5 bg-[#FF3E00] text-black text-[11px] font-black tracking-[0.5em] uppercase font-['Space_Grotesk']">
                            ARSON MONOLITH STORE
                        </span>
                        <div className="h-[2px] w-32 bg-[#FF3E00]" />
                    </div>

                    <h1 className="monolith-item text-[14vw] md:text-[8rem] lg:text-[11rem] font-black leading-[0.8] tracking-[-0.05em] uppercase text-white mb-8 font-['Space_Grotesk']">
                        MISSION<br/>
                        <span className="text-transparent" style={{ WebkitTextStroke: '2px #FF3E00' }}>CRITICAL</span>
                    </h1>

                    <div className="monolith-item max-w-2xl space-y-12">
                        <p className="text-[#E2E2E2]/60 font-mono text-xs md:text-sm leading-relaxed border-l-[3px] border-[#FF3E00] pl-8">
                            Deploying architectural dominance in the digital void. The Service Matrix operates on zero-latency infrastructure, ensuring your operations remain unindexed and impenetrable.
                        </p>
                        
                        <div className="flex flex-wrap gap-8 items-center pt-4">
                            <button className="px-12 py-5 bg-[#FF3E00] text-black font-['Space_Grotesk'] font-black uppercase tracking-[0.25em] text-xs hover:bg-white transition-all transform active:scale-95 duration-300">
                                INITIATE_ACQUISITION
                            </button>
                            <button className="px-12 py-5 border-[2px] border-[#FF3E00] text-white font-['Space_Grotesk'] font-black uppercase tracking-[0.25em] text-xs hover:bg-[#FF3E00]/10 transition-all duration-300">
                                VIEW_PROTOCOLS
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT DETAIL COLUMN (2 cols) - INTERACTIVE DIAGNOSTIC HUB */}
                <div className="hidden lg:flex col-span-2 flex-col justify-between py-24 border-l border-[#FF562B]/10 pl-12">
                    
                    {/* 1. SECTOR MAP (TOP CELL) */}
                    <div className="monolith-item group border border-[#FF3E00]/10 p-6 space-y-4 hover:border-[#FF3E00]/30 transition-colors duration-500">
                        <div className="flex justify-between items-center text-[9px] font-mono text-[#FF3E00]">
                            <span className="tracking-[0.5em] font-black italic">SECTOR_MAP</span>
                            <span className="opacity-40 group-hover:opacity-100 transition-opacity">0x42.11.B8</span>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-2">
                            {[...Array(16)].map((_, i) => (
                                <div 
                                    key={i} 
                                    className="w-full aspect-square bg-[#FF3E00]/5 hover:bg-[#FF3E00] transition-all duration-300 border border-[#FF3E00]/10 cursor-crosshair transform hover:scale-110 active:scale-95" 
                                />
                            ))}
                        </div>
                        
                        <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest pt-2">
                            SCANNING_GRID_ALPHA_NULL
                        </div>
                    </div>

                    {/* 2. CURSOR-TRACKING RADAR (CENTER CELL) */}
                    <div className="monolith-item relative py-12 flex flex-col items-center group">
                        <div 
                            className="relative w-40 h-40 border border-white/5 rounded-full flex items-center justify-center"
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 60;
                                const y = ((e.clientY - rect.top) / rect.height - 0.5) * 60;
                                gsap.to('.radar-target', { x, y, duration: 0.3, ease: 'power2.out' });
                            }}
                            onMouseLeave={() => {
                                gsap.to('.radar-target', { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.3)' });
                            }}
                        >
                            {/* Radar Rings */}
                            <div className="absolute inset-4 border border-[#FF3E00]/10 rounded-full" />
                            <div className="absolute inset-12 border border-[#FF3E00]/5 rounded-full" />
                            
                            {/* Scanning Sweep */}
                            <div className="absolute inset-0 border-r border-[#FF3E00]/20 rounded-full animate-[spin_4s_linear_infinite]" />
                            
                            {/* Reactive Target */}
                            <div className="radar-target relative w-3 h-3 border border-[#FF3E00] flex items-center justify-center">
                                <div className="w-[1px] h-full bg-[#FF3E00]/50" />
                                <div className="absolute w-full h-[1px] bg-[#FF3E00]/50" />
                            </div>
                        </div>
                        
                        <div className="mt-8 text-center space-y-2">
                            <span className="text-[10px] font-black text-white/50 tracking-[0.4em] font-['Space_Grotesk'] group-hover:text-[#FF3E00] transition-colors">RADAR_LOCK_IDLE</span>
                            <div className="flex justify-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="w-1 h-3 bg-[#FF3E00]/20 rounded-full overflow-hidden">
                                        <div className={`h-full bg-[#FF3E00] animate-[pulse_1s_infinite] [animation-delay:${i * 0.2}s]`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 3. NEURAL SIGNAL WAVEFORM (BOTTOM CELL) */}
                    <div className="monolith-item group space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#FF3E00] animate-pulse" />
                            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.5em]">SIGNAL_WAVEFORM</span>
                        </div>
                        
                        <div className="h-20 flex items-end justify-between gap-1 px-2 border-b border-[#FF3E00]/10 pb-2">
                            {[...Array(24)].map((_, i) => (
                                <div 
                                    key={i} 
                                    className="w-[2px] bg-[#FF3E00]/20 group-hover:bg-[#FF3E00] transition-all duration-500 rounded-full"
                                    style={{ 
                                        height: `${Math.random() * 80 + 20}%`,
                                        opacity: Math.random() * 0.5 + 0.5
                                    }}
                                />
                            ))}
                        </div>
                        
                        <div className="space-y-3">
                            <div className="flex justify-between text-[10px] items-center">
                                <span className="font-mono text-white/30 tracking-widest">LATENCY</span>
                                <span className="font-['Space_Grotesk'] font-black text-[#FF3E00]">12.42ms</span>
                            </div>
                            <div className="h-[1px] w-full bg-[#FF3E00]/10 relative overflow-hidden">
                                <div className="absolute inset-0 bg-white/20 animate-[slide-right_2s_linear_infinite]" />
                            </div>
                        </div>
                        
                        <div className="pt-4 flex justify-end">
                            <span className="text-[8px] font-mono text-zinc-600 bg-[#FF3E00]/5 px-2 py-1 tracking-widest">UPLINK_STABLE_VERIFIED</span>
                        </div>
                    </div>
                </div>


            </div>

            {/* ── FOOTER BAR DECORATIONS ── */}
            <div className="absolute bottom-0 left-0 w-full px-12 py-8 flex justify-between items-end border-t border-[#FF3E00]/10 z-20 pointer-events-none">
                <div className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase opacity-40">
                    SYSTEM_PROTOCOL_AUTHORIZED_PERSONNEL_ONLY_2026
                </div>
                <div className="flex gap-12 font-mono text-[9px] tracking-[0.4em] uppercase">
                    <span className="text-[#FF3E00]">STATUS:NOMINAL</span>
                    <span className="text-zinc-500 hidden md:block">ENCRYPTION:AES-256</span>
                </div>
            </div>

            {/* Global Animation Styles */}
            <style>{`
                @keyframes scanline-sweep {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100vh); }
                }
                .text-transparent {
                    -webkit-text-fill-color: transparent;
                }
            `}</style>
        </section>
    );
};
