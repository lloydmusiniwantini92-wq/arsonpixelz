import React from 'react';
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import VoidBg from './assets/void_bg.png';

interface Stat {
    value: string;
    label: string;
    sub?: string;
}

const stats: Stat[] = [
    { value: '120+', label: 'Brands Ignited', sub: 'since 2020' },
    { value: '7X', label: 'Avg. Growth Multiplier', sub: 'in 18 months' },
    { value: '∞', label: 'Creative Threshold', sub: 'no ceiling' },
    { value: '01', label: 'Civilization Level', sub: 'currently ascending' },
];
export const AboutContent: React.FC = () => {
    const navigate = useNavigate();

    // Thematic Classes
    const textColor = 'text-white';
    const textMuted = 'text-white/60';
    const textSub = 'text-white/30';
    
    const borderColor = 'border-white/10';
    const gridBg = 'bg-[#FF3E00]/10';
    const statBg = 'bg-[#050505]';
    const statHover = 'hover:bg-[#080808]';
    
    const buttonShadowColor = 'rgba(255,255,255,0.05)';
    const marqueeStyle = 'opacity-20 border-[#FF3E00]/10 text-white';

    return (
        <div className="relative transition-colors duration-500 overflow-hidden bg-[#000000]">
            {/* Background Layers */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div 
                    className="absolute inset-0 opacity-40"
                    style={{ 
                        backgroundImage: `url(${VoidBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed',
                        animation: 'void-drift-slow 30s ease-in-out infinite alternate',
                        mixBlendMode: 'screen',
                    }}
                />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF3E00]/50 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,62,0,0.15)_0%,transparent_75%)]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000000]/60 to-[#000000]" />
            </div>

            <div className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12 pt-28 md:pt-36 pb-0">

            {/* ── Sector tag ── */}
            <div className="flex items-center gap-4 mb-10 opacity-60">
                <div className="w-2 h-2 rounded-full bg-[#FF3E00] animate-pulse shadow-[0_0_10px_#FF3E00]" />
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white font-black">
                    Sector_02 // Monolith_Core
                </span>
                <div className="h-px flex-1 max-w-[6rem] bg-[#FF3E00]/40" />
            </div>

            {/* ── Massive headline ── */}
            <h2 className="animate-title font-black uppercase tracking-tighter leading-[0.82] mb-16" style={{ fontFamily: 'Syne, sans-serif' }}>
                <span className="block text-[clamp(4.5rem,10vw,9rem)] text-white/10 italic">
                    WE ARE
                </span>
                <span
                    className="block text-[clamp(5.5rem,14vw,13rem)] relative italic"
                    style={{
                        color: '#FF3E00',
                        textShadow: '0 0 80px rgba(255,62,0,0.4), 0 0 200px rgba(255,62,0,0.2)',
                        fontFamily: 'Syne, sans-serif',
                    }}
                >
                    THE SPARK
                    <span
                        className="absolute inset-0 text-[#FF3E00] opacity-40"
                        style={{ animation: 'spark-glitch1 4s infinite linear alternate-reverse', textShadow: 'none', clipPath: 'inset(30% 0 55% 0)' }}
                        aria-hidden="true"
                    >
                        THE SPARK
                    </span>
                    <span
                        className="absolute inset-0 text-white/20 opacity-25"
                        style={{ animation: 'spark-glitch2 3s infinite linear alternate-reverse', textShadow: 'none', clipPath: 'inset(60% 0 20% 0)' }}
                        aria-hidden="true"
                    >
                        THE SPARK
                    </span>
                </span>
            </h2>

            {/* ── Two column layout ── */}
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start pb-20">

                <div className="lg:col-span-7 flex flex-col gap-12">
                    <div className="relative pl-8 border-l-4 border-[#FF3E00] space-y-8 max-w-2xl">
                        <p className={`text-xl md:text-2xl font-mono ${textMuted} leading-relaxed uppercase tracking-tight`}>
                            At the convergence of <span className={`${textColor} font-black`}>architectural engineering</span> and volatile digital design, we operate as a high-fidelity bridge for brands ready to go critical.
                        </p>
                        <p className={`text-3xl md:text-4xl font-black ${textColor} leading-[1.1] uppercase tracking-tighter italic`}>
                            Fusing industrial-grade IT consulting with cinematic creativity to engineer ecosystems that are 
                            <span className="text-[#FF3E00] block mt-2"> impossible to ignore.</span>
                        </p>
                    </div>

                    <button
                        onClick={() => navigate('/contact')}
                        className="group relative inline-flex items-center justify-center w-max px-12 py-6 overflow-hidden transition-all duration-500 bg-white"
                    >
                        <span className="relative z-10 font-syne font-black uppercase tracking-[0.4em] text-[11px] text-black group-hover:text-white transition-colors duration-500">
                            Initialize Protocol
                        </span>
                        <ArrowRightIcon className="relative z-10 w-4 h-4 ml-4 text-black group-hover:text-white transition-all group-hover:translate-x-2 duration-500" />
                        <div className="absolute inset-0 bg-[#FF3E00] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16, 1, 0.3, 1)]" />
                    </button>
                </div>

                <div className={`lg:col-span-5 grid grid-cols-2 gap-px ${gridBg} border border-white/5 shadow-2xl`}>
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className={`stat-item ${statBg} p-10 flex flex-col gap-3 hover:border-[#FF3E00]/40 ${statHover} transition-all duration-500 group`}
                        >
                            <span
                                className="font-syne font-black text-5xl md:text-7xl leading-none tracking-tighter text-[#FF3E00] italic group-hover:scale-110 transition-transform duration-500"
                                style={{ textShadow: '0 0 30px rgba(255,62,0,0.3)' }}
                            >
                                {stat.value}
                            </span>
                            <span className={`font-syne font-black text-xs uppercase tracking-[0.2em] ${textColor} group-hover:text-[#FF3E00] transition-colors duration-500`}>
                                {stat.label}
                            </span>
                            {stat.sub && (
                                <span className={`font-mono text-[9px] font-black tracking-[0.3em] ${textSub} uppercase`}>
                                    {stat.sub}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className={`relative overflow-hidden border-t py-8 pointer-events-none ${marqueeStyle}`}>
                <div className="whitespace-nowrap font-syne font-black text-7xl uppercase tracking-tighter animate-about-marquee italic opacity-10">
                    Strategy /// Design /// Development /// Immersion /// Identity /// Strategy /// Design /// Development /// Immersion /// Identity ///
                </div>
            </div>
            <style>{`
                @keyframes void-drift-slow { from { transform: scale(1.1) rotate(-0.5deg); } to { transform: scale(1.15) rotate(0.5deg); } }
                @keyframes about-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
                .animate-about-marquee { animation: about-marquee 40s linear infinite; }
            `}</style>
            </div>
        </div>
    );
};

export const About: React.FC = () => {
    return (
        <section id="about-section" className="relative bg-[#000000]">
            <AboutContent />
        </section>
    );
};
