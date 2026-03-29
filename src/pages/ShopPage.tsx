import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShopNavbar } from '../components/shop/ShopNavbar';
import { CartDrawer } from '../components/shop/CartDrawer';
import { ShopHero } from '../components/shop/ShopHero';
import { ServiceMatrix } from '../components/shop/ServiceMatrix/ServiceMatrix';

// ── Metrics for manifesto section ────────────────────────────────────────────
const METRICS = [
    { label: 'CACHE_LOAD', value: 82.4, unit: '%', color: '#4a9eff', handshake: 'NODE_ALPHA_01' },
    { label: 'NET_LATENCY', value: 12.4, unit: 'ms', color: '#FF3E00', handshake: '0x42.11.B8' },
    { label: 'CORE_INTEGRITY', value: 99.9, unit: 'NOMINAL', color: '#22c55e', handshake: 'STABLE_CORE' },
];

const ShopPage = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div
            className="min-h-screen text-white selection:bg-[#FF3E00] selection:text-black"
            style={{ background: '#000000', fontFamily: 'Inter, sans-serif' }}
        >
            {/* ── SHOP NAVBAR ── */}
            <ShopNavbar />

            {/* ── HERO: DIGITAL MONOLITH ── */}
            <ShopHero />

            {/* ── SERVICE MATRIX ── */}
            <ServiceMatrix />

            {/* ── MANIFESTO / DIAGNOSTIC METRICS SECTION ── */}
            <section className="relative border-t border-white/5 bg-[#000000] overflow-hidden">
                {/* Background Watermark */}
                <div className="absolute inset-0 opacity-[0.02] flex items-center justify-center pointer-events-none select-none">
                    <span className="text-[30vw] font-black uppercase tracking-tighter font-['Space_Grotesk'] leading-none">
                        MONOLITH
                    </span>
                </div>

                <div className="max-w-[1600px] mx-auto px-8 md:px-12 py-32 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-20 lg:gap-32 items-start relative z-10">
                    
                    {/* Diagnostic Metrics */}
                    <div className="space-y-12">
                        <p className="font-['Space_Grotesk'] text-[10px] uppercase font-black tracking-[0.6em] text-[#FF3E00] mb-8">
                            SYSTEM_DIAGNOSTICS_v0.8
                        </p>
                        
                        {METRICS.map(m => (
                            <div key={m.label} className="group space-y-4">
                                <div className="flex items-center justify-between text-[11px] font-mono">
                                    <span className="text-white/40 tracking-[0.3em] uppercase">{m.label}</span>
                                    <span className="text-[#FF3E00] font-black">{m.value}{m.unit}</span>
                                </div>
                                
                                <div className="h-[3px] bg-white/5 relative overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${m.value}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                        className="h-full"
                                        style={{ background: m.color }}
                                    />
                                    {/* Scanline pattern for the bar */}
                                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px)', backgroundSize: '4px 100%' }} />
                                </div>
                                
                                <div className="flex justify-between text-[9px] font-mono text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span>{m.handshake}</span>
                                    <span>STATUS: NOMINAL</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Manifesto Quote */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2 }}
                        className="relative"
                    >
                        <blockquote
                            className="font-black text-4xl md:text-7xl xl:text-[6.5rem] uppercase leading-[0.85] tracking-[-0.05em] mb-12 font-['Space_Grotesk']"
                        >
                            "WE ARE NOT <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>BUILDING</span> WEBSITES. <br/> WE ARE <span className="text-[#FF3E00]">DEPLOYING</span> DIGITAL FORTRESSES."
                        </blockquote>
                        
                        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                            <p className="font-mono text-[11px] uppercase tracking-[0.6em] text-[#FF3E00] font-black">
                                — MANIFESTO_PROTOCOL_0.2
                            </p>
                            <div className="hidden md:block h-[1px] flex-grow bg-white/5" />
                            <div className="flex gap-4 items-center">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest">ENCRYPTION: AES-256</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── SHOP FOOTER: COMMAND CENTER ── */}
            <footer className="border-t border-white/5 bg-[#000000] relative z-20">
                <div className="max-w-[1600px] mx-auto px-8 md:px-12 py-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">
                    
                    {/* Branded Identity */}
                    <div className="flex items-center gap-10">
                        <span className="font-['Space_Grotesk'] font-black text-2xl uppercase tracking-tighter text-[#FF3E00] leading-none">ARSON_STORE</span>
                        <div className="hidden md:block w-[1px] h-6 bg-white/10" />
                        <span className="font-mono text-[10px] text-white/20 uppercase tracking-[0.4em]">
                            BUILD_SYNC_2024 [REV_4.0]
                        </span>
                    </div>

                    {/* Utility Grid */}
                    <div className="flex flex-wrap justify-center gap-8 lg:gap-14">
                        {['LEGAL', 'TERMS', 'PRIVACY', 'SECURITY'].map(l => (
                            <button 
                                key={l} 
                                className="font-mono text-[10px] font-black uppercase tracking-[0.5em] text-white/40 hover:text-[#FF3E00] transition-colors relative group py-2"
                            >
                                {l}
                                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#FF3E00] group-hover:w-full transition-all" />
                            </button>
                        ))}
                    </div>

                    {/* System Integrity Indicator */}
                    <div className="flex items-center gap-3 px-6 py-3 border border-[#FF3E00]/10 bg-white/[0.02]">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
                        <span className="font-mono text-[10px] uppercase font-black tracking-widest text-emerald-400">CORE_STABLE_ONLINE</span>
                        <span className="mx-2 text-white/10">|</span>
                        <span className="font-mono text-[10px] text-white/30 tracking-tighter">LATENCY: 12ms</span>
                    </div>
                </div>
                
                {/* Visual anchor bar */}
                <div className="h-1.5 w-full bg-[#FF3E00]" />
            </footer>

            <CartDrawer />
        </div>
    );
};

export default ShopPage;
