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

interface AboutContentProps {
  theme: 'light' | 'dark';
}

/**
 * AboutContent renders the visual structure, styled for light/dark mode.
 */
export const AboutContent: React.FC<AboutContentProps> = ({ theme }) => {
    const isDark = theme === 'dark';
    const navigate = useNavigate();

    // Thematic Classes
    const textColor = isDark ? 'text-[#EBE9DF]' : 'text-[#1A1A1A]';
    const textMuted = isDark ? 'text-[#EBE9DF]/70' : 'text-[#1A1A1A]/70';
    const textSub = isDark ? 'text-[#EBE9DF]/30' : 'text-[#1A1A1A]/40';
    
    const borderColor = isDark ? 'border-[#EBE9DF]/10' : 'border-[#1A1A1A]/10';
    const gridBg = isDark ? 'bg-[#D16D6A]/10' : 'bg-[#1A1A1A]/10';
    const statBg = isDark ? 'bg-[#0a0a0a]' : 'bg-[#EBE9DF]';
    const statHover = isDark ? 'hover:bg-[#0f0808]' : 'hover:bg-[#f5f3eb]';
    
    const buttonShadowColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(26,26,26,0.15)';
    const marqueeStyle = isDark ? 'opacity-20 border-[#D16D6A]/10 text-[#EBE9DF]' : 'opacity-10 border-[#1A1A1A]/10 text-[#1A1A1A]';

    return (
        <div className={`relative transition-colors duration-500 overflow-hidden ${isDark ? 'bg-[#0a0a0a]' : ''}`}>
            {/* Dark theme specifics: extraordinary background */}
            {isDark && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div 
                        className="absolute inset-0 opacity-60"
                        style={{ 
                            backgroundImage: `url(${VoidBg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundAttachment: 'fixed',
                            animation: 'void-drift-slow 30s ease-in-out infinite alternate',
                            mixBlendMode: 'screen',
                        }}
                    />
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D16D6A]/50 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(209,109,106,0.2)_0%,transparent_75%)]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/40 to-[#0a0a0a]" />
                </div>
            )}

            <div className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12 pt-28 md:pt-36 pb-0">

            {/* ── Sector tag ── */}
            <div className={`flex items-center gap-3 mb-10 ${isDark ? 'opacity-50' : 'opacity-60'}`}>
                <div className="w-2 h-2 rounded-full bg-[#D16D6A] animate-pulse" />
                <span className={`font-mono text-xs tracking-[0.3em] uppercase ${textColor}`}>
                    Sector_02 // Core Identity
                </span>
                <div className={`h-px flex-1 max-w-[4rem] ${isDark ? 'bg-[#D16D6A]/40' : 'bg-[#D16D6A]/60'}`} />
            </div>

            {/* ── Massive headline ── */}
            <h2 className="animate-title font-black uppercase tracking-tighter leading-[0.82] mb-16" style={{ fontFamily: 'Syne, sans-serif' }}>
                <span
                    className="block text-[13vw] md:text-[10vw] text-transparent"
                    style={{ WebkitTextStroke: `1.5px ${isDark ? 'rgba(235,233,223,0.2)' : 'rgba(26,26,26,0.15)'}` }}
                >
                    WE ARE
                </span>
                <span
                    className="block text-[18vw] md:text-[14vw] relative"
                    style={{
                        color: '#D16D6A',
                        textShadow: isDark ? '0 0 80px rgba(209,109,106,0.6), 0 0 200px rgba(209,109,106,0.25)' : 'none',
                        fontFamily: 'Syne, sans-serif',
                    }}
                >
                    THE SPARK
                    {isDark && (
                        <>
                            <span
                                className="absolute inset-0 text-[#D16D6A] opacity-40"
                                style={{ animation: 'spark-glitch1 4s infinite linear alternate-reverse', textShadow: 'none', clipPath: 'inset(30% 0 55% 0)' }}
                                aria-hidden="true"
                            >
                                THE SPARK
                            </span>
                            <span
                                className="absolute inset-0 text-[#00E5C3] opacity-25"
                                style={{ animation: 'spark-glitch2 3s infinite linear alternate-reverse', textShadow: 'none', clipPath: 'inset(60% 0 20% 0)' }}
                                aria-hidden="true"
                            >
                                THE SPARK
                            </span>
                        </>
                    )}
                </span>
            </h2>

            {/* ── Two column layout ── */}
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start pb-20">

                <div className="lg:col-span-7 flex flex-col gap-10">
                    <div className="relative pl-6 border-l-2 border-[#D16D6A] space-y-6 max-w-2xl">
                        <p className={`text-xl md:text-2xl font-mono ${textMuted} leading-relaxed`}>
                            In a digital landscape crowded with static noise,{' '}
                            <span className={`${textColor} font-bold`}>Arson Pixelz</span>{' '}
                            is the aberration. We are a reactor core for brands ready to go critical.
                        </p>
                        <p className={`text-2xl md:text-3xl font-bold ${textColor} leading-tight`}>
                            Fusing industrial-grade code with volatile creativity to engineer ecosystems that are{' '}
                            <span className="text-[#D16D6A]">impossible to ignore.</span>
                        </p>
                    </div>

                    <button
                        onClick={() => navigate('/contact')}
                        className="group relative inline-flex items-center justify-center w-max px-10 py-5 overflow-hidden transition-all duration-300"
                        style={{ background: '#D16D6A', boxShadow: `8px 8px 0px ${buttonShadowColor}` }}
                    >
                        <span className="font-mono font-bold uppercase tracking-widest text-sm text-[#0a0a0a]">
                            Initialize Protocol
                        </span>
                        <ArrowRightIcon className="w-4 h-4 ml-3 text-[#0a0a0a] transition-transform group-hover:translate-x-1 duration-300" />
                    </button>
                </div>

                <div className={`lg:col-span-5 grid grid-cols-2 gap-px ${gridBg}`}>
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className={`stat-item ${statBg} border ${borderColor} p-8 flex flex-col gap-2 hover:border-[#D16D6A]/40 ${statHover} transition-all duration-300`}
                        >
                            <span
                                className="font-black text-5xl md:text-6xl leading-none tracking-tighter text-[#D16D6A]"
                                style={{ fontFamily: isDark ? 'Syne, sans-serif' : 'Montserrat, sans-serif', textShadow: isDark ? '0 0 30px rgba(209,109,106,0.4)' : '0 0 30px rgba(209,109,106,0.2)' }}
                            >
                                {stat.value}
                            </span>
                            <span className={`font-bold text-sm uppercase tracking-wider ${textColor}`}>
                                {stat.label}
                            </span>
                            {stat.sub && (
                                <span className={`font-mono text-[10px] tracking-widest ${textSub} uppercase`}>
                                    {stat.sub}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className={`relative overflow-hidden border-t py-6 pointer-events-none ${marqueeStyle}`}>
                <div className="whitespace-nowrap font-black text-6xl uppercase tracking-tighter animate-about-marquee">
                    Strategy /// Design /// Development /// Immersion /// Identity /// Strategy /// Design /// Development /// Immersion /// Identity ///
                </div>
            </div>
            <style>{`
                @keyframes void-drift-slow { from { transform: scale(1.1) rotate(-0.5deg); } to { transform: scale(1.15) rotate(0.5deg); } }
            `}</style>
            </div>
        </div>
    );
};

export const About: React.FC = () => {
    return (
        <section id="about-section" className="relative bg-[#EBE9DF]">
            <AboutContent theme="light" />
        </section>
    );
};
