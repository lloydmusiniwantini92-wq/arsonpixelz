import React, { useMemo, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '../components/fx/MagneticButton';
import { PremiumArchiveGallery } from '../components/archive/PremiumArchiveGallery';
import gsap from 'gsap';

const archiveData = {
    'evo-1': {
        title: 'STRATEGY ARCHIVE',
        subtitle: 'Phase 01 // Architectural Mapping',
        desc: 'Consulting on core systems to ensure a foundation that holds under extreme pressure. We decouple noise from systemic value, building blueprints for long-term scalability and business logic clarity.',
        accent: '#D16D6A',
        image: '/images/archive_static.png',
        stats: [
            { label: 'LOGIC DEPTH', value: '98%' },
            { label: 'INFRASTRUCTURE', value: 'TIER-1' },
            { label: 'ROI MULTIPLIER', value: '7X+' }
        ],
        details: [
            "Systemic Growth Audit.",
            "UX Logic Mapping.",
            "Performance Strategy.",
            "Tech-Stack Alignment."
        ],
        specs: [
            "Logic Layer: Immutable",
            "Context: Institutional",
            "Architecture: Micro-services",
            "Void Engine Status: STABLE"
        ]
    },
    'evo-2': {
        title: 'IDENTITY ARCHIVE',
        subtitle: 'Phase 02 // Cinematic Disruption',
        desc: 'High-fidelity creative that cuts through the void. We engineer visual voices that are as visceral as they are precise, ensuring your brand presence is both premium and impossible to ignore.',
        accent: '#00E5C3',
        image: '/images/archive_social.png',
        stats: [
            { label: 'PERCEPTION', value: '100%' },
            { label: 'BRAND FIDELITY', value: 'ULTRA' },
            { label: 'RECALL RATE', value: 'VOLATILE' }
        ],
        details: [
            "Visual DNA Architecture.",
            "Cinematic Asset Design.",
            "Motion Brand Systems.",
            "Interactive Aesthetics."
        ],
        specs: [
            "Resolution: Dynamic 8K",
            "Rendering: Real-time GPU",
            "Physics: Interactive",
            "Void Engine Status: BURNING"
        ]
    },
    'evo-3': {
        title: 'ENGINEERING ARCHIVE',
        subtitle: 'Phase 03 // Industrial Performance',
        desc: 'We don\'t just write code; we engineer ecosystems. Full-stack industrial-grade development designed for extreme scale, deep security, and frictionless user interaction.',
        accent: '#B794F4',
        image: '/images/web_3.png',
        stats: [
            { label: 'STABILITY', value: '99.9%' },
            { label: 'LATENCY', value: '< 15ms' },
            { label: 'SECURITY', value: 'SOVEREIGN' }
        ],
        details: [
            "Full-Stack Ecosystems.",
            "Scalable API Fabric.",
            "Cloud Infrastructure.",
            "Performance Optimization."
        ],
        specs: [
            "Runtime: Arson-V8 Engine",
            "Language: TypeScript/Rust",
            "Protocol: End-to-End Secure",
            "Void Engine Status: IGNITED"
        ]
    },
    'evo-4': {
        title: 'INTELLIGENCE ARCHIVE',
        subtitle: 'Phase 04 // Autonomous Logic',
        desc: 'The future is self-evolving. We integrate advanced AI and machine learning logic to create interfaces that anticipate user needs, learn from patterns, and adapt in real-time.',
        accent: '#D16D6A',
        image: '/images/sentient_archive.png',
        stats: [
            { label: 'AUTONOMY', value: 'FULL' },
            { label: 'PREDICTION', value: '95%+' },
            { label: 'LOGIC SYNC', value: 'REAL-TIME' }
        ],
        details: [
            "AI Integration Layer.",
            "LLM Orchestration.",
            "Predictive UI Systems.",
            "Neural Feedback Loops."
        ],
        specs: [
            "Brain: Neural Core Active",
            "Learning: Active/Passive",
            "Sync: Deep-Link Node",
            "Void Engine Status: SENTIENT"
        ]
    },
    'tt-01': {
        title: 'TONY THOMPSON',
        subtitle: 'Brand & Digital Platform',
        desc: 'Bespoke gallery experience.',
        accent: '#D16D6A',
        image: '/images/black_void.png',
        stats: [], details: [], specs: []
    }
};

const ArchivePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const data = useMemo(() => archiveData[id as keyof typeof archiveData] || archiveData['evo-1'], [id]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
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
    }, [id]);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#020202] text-[#EBE9DF] font-sans selection:bg-[#D16D6A] selection:text-white overflow-x-hidden">
            {/* Background Image Layer */}
            <div className="fixed inset-0 z-0 overflow-hidden">
                <motion.img 
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.3 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    key={`${id}-bg`}
                    src={data.image} 
                    alt={data.title} 
                    className="w-full h-full object-cover grayscale saturate-50 mix-blend-luminosity" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/60 to-transparent" />
                <div className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.8)_100%)]`} />
            </div>

            {/* Cinematic Noise & Grain Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

            {/* Vertical Scanner Line Effect */}
            <motion.div 
               className="fixed inset-0 pointer-events-none z-40 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)] h-[100vh]"
               animate={{ y: ['-100%', '100%'] }}
               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            {/* Content Layer */}
            {id === 'tt-01' ? (
                <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center pt-24 pb-20 overflow-hidden">
                    <div className="w-full max-w-[1400px] px-6 flex justify-between items-center mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-px bg-current opacity-50" style={{ color: data.accent }} />
                            <span className="font-mono text-xs md:text-sm uppercase tracking-[0.5em] font-bold" style={{ color: data.accent }}>
                                TRANS-ERA PROTOCOL // {id?.toUpperCase() || "001"}
                            </span>
                        </div>
                        
                        <div 
                            className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-[#D16D6A] transition-colors duration-300 flex items-center gap-2"
                            onClick={() => navigate(-1)}
                        >
                            ← Back to Void
                        </div>
                    </div>
                    
                    <div className="w-full px-6 flex justify-center flex-1 items-center">
                        <PremiumArchiveGallery accentColor={data.accent} />
                    </div>
                </div>
            ) : (
            <div className="relative z-10 container mx-auto px-6 py-20 md:py-32 flex flex-col min-h-screen items-center md:items-start">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl"
                >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-px bg-current opacity-50" style={{ color: data.accent }} />
                            <span className="font-mono text-xs md:text-sm uppercase tracking-[0.5em] font-bold" style={{ color: data.accent }}>
                                TRANS-ERA PROTOCOL // {id?.toUpperCase() || "001"}
                            </span>
                        </div>
                        
                        <div 
                            className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-[#D16D6A] transition-colors duration-300 flex items-center gap-2"
                            onClick={() => navigate(-1)}
                        >
                            ← Back to Void
                        </div>
                    </div>

                    <>
                            <h1 
                                className="text-6xl md:text-[9rem] font-black uppercase leading-[0.8] tracking-tighter mb-16"
                                style={{ fontFamily: 'Syne, sans-serif' }}
                            >
                                <span className="block">{data.title.split(' ')[0]}</span>
                                <span className="text-transparent" style={{ WebkitTextStroke: `1.5px ${data.accent}` }}>
                                    {data.title.split(' ').slice(1).join(' ')}
                                </span>
                            </h1>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
                                {/* Summary & Stats */}
                                <div className="lg:col-span-12">
                                    <p className="text-xl md:text-3xl font-mono text-white/90 leading-snug max-w-4xl mb-16 border-l-[3px] md:border-l-4 pl-8" style={{ borderColor: data.accent }}>
                                        {data.desc}
                                    </p>
                                </div>

                                {/* Technical Matrix */}
                                <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
                                    {data.stats.map((stat, i) => (
                                        <div key={i} className="flex flex-col gap-3 group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: data.accent }} />
                                                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">{stat.label}</span>
                                            </div>
                                            <span className="text-2xl font-black md:text-5xl tracking-tighter transition-all duration-300 group-hover:scale-105 origin-left" style={{ color: data.accent }}>
                                                {stat.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Specs Sidebar */}
                                <div className="lg:col-span-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-2xl relative overflow-hidden">
                                     <div className="absolute top-0 right-0 w-32 h-32 bg-current opacity-10 blur-3xl pointer-events-none" style={{ color: data.accent }} />
                                     <h3 className="font-mono text-xs uppercase tracking-[0.3em] mb-6 font-bold text-white/80 border-b border-white/10 pb-4">
                                        TECHNICAL_SPECS
                                     </h3>
                                     <div className="space-y-4">
                                        {data.specs.map((spec, i) => (
                                            <div key={i} className="flex items-center gap-3 font-mono text-[11px] text-white/60 tracking-wider">
                                                <div className="w-1 h-1 bg-white/30 rounded-full" />
                                                {spec}
                                            </div>
                                        ))}
                                     </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
                                {data.details.map((detail, i) => (
                                    <motion.div 
                                        key={i} 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 + i * 0.1 }}
                                        className="px-6 py-4 bg-black/40 border border-white/10 rounded-xl font-mono text-[10px] md:text-xs uppercase tracking-widest text-white/70 backdrop-blur-sm flex items-center justify-center text-center leading-relaxed"
                                    >
                                        {detail}
                                    </motion.div>
                                ))}
                            </div>
                        </>

                    <div className="flex flex-col md:flex-row gap-8 items-center pt-16 border-t border-white/10 group/footer w-full pb-32">
                        <button 
                            className="relative px-12 py-6 bg-[#EBE9DF] text-black font-mono text-[11px] uppercase tracking-[0.4em] font-black hover:bg-[#D16D6A] hover:text-white transition-all duration-500 shadow-[0_30px_70px_rgba(0,0,0,0.6)] group overflow-hidden pointer-events-auto"
                            onClick={() => navigate(-1)}
                        >
                            <span className="relative z-10 block transition-transform duration-500 group-hover:-translate-x-2">
                                ← DISCONNECT_ARCHIVE
                            </span>
                        </button>
                        
                        <div className="flex flex-col gap-1">
                             <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
                                Connection: SOVEREIGN_VOICE_ENCRYPTED
                             </span>
                             <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#D16D6A]">
                                Unauthorized access monitored by SENTIENT Core.
                             </span>
                        </div>
                    </div>
                </motion.div>
            </div>
            )}

            {/* Persistent HUD Frame (Enhanced) */}
            <div className="fixed inset-0 pointer-events-none border-[12px] md:border-[20px] border-[#020202] z-50 overflow-hidden">
                <div className="absolute top-10 left-10 font-mono text-[10px] uppercase tracking-[0.6em] text-white/20 flex items-center gap-4">
                    <div className="w-3 h-3 border border-white/20 rounded-full animate-pulse" />
                    Archive_Index_v.3.7 // {id?.toUpperCase()}
                </div>
                <div className="absolute bottom-10 left-10 font-mono text-[9px] uppercase tracking-[0.5em] text-white/20 hidden md:block">
                    Sector: {id === 'evo-4' ? 'DEEP_CORE' : 'LEGACY_VOID'}
                </div>
                <div className="absolute top-10 right-10 flex gap-1 items-end opacity-20">
                     {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-[2px] bg-white" style={{ height: `${Math.random() * 20 + 5}px` }} />
                     ))}
                </div>
                <div className="absolute bottom-10 right-10 font-mono text-[10px] uppercase tracking-[0.6em] text-white/20">
                    ARSONPIXELZ © 2024
                </div>
            </div>
            
            {/* Cinematic Scanline Overlay Filter */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.1] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-[60]" />
        </div>
    );
};

export default ArchivePage;
