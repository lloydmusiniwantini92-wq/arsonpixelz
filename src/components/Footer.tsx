import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    ArrowRightIcon,
    ArrowUpRightIcon,
    GlobeAltIcon,
    CpuChipIcon
} from '@heroicons/react/24/outline';

// --- Subcomponents for cleaner organization ---

const Marquee: React.FC<{ text: string; reverse?: boolean; accentColor?: string; borderColor?: string }> = ({
    text, reverse = false, accentColor = '#FF3E00', borderColor = '#1A1A1A'
}) => {
    const content = (
        <div className={`flex gap-12 items-center whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
            {[...Array(8)].map((_, i) => (
                <React.Fragment key={i}>
                    <span className="text-7xl md:text-9xl font-syne font-black tracking-tighter uppercase text-transparent stroke-text italic" style={{ WebkitTextStroke: `1px ${borderColor}`, opacity: 0.1 }}>
                        {text}
                    </span>
                    <span className="text-3xl font-syne font-black italic" style={{ color: accentColor, opacity: 0.3 }}>///</span>
                </React.Fragment>
            ))}
        </div>
    );

    return (
        <div className="overflow-hidden py-6 select-none pointer-events-none border-t border-b border-white/5 bg-[#050505]">
            <div className="flex w-max">
                {content}
                {content}
            </div>
        </div>
    );
};

const LiveClock: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <span className="font-mono tabular-nums font-black text-[#FF3E00]">
            {time.toLocaleTimeString('en-US', { hour12: false })} UTC
        </span>
    );
};

export const Footer: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS'>('IDLE');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setStatus('PROCESSING');
        setTimeout(() => {
            setStatus('SUCCESS');
            setEmail('');
            setTimeout(() => setStatus('IDLE'), 3000);
        }, 1500);
    };

    const location = useLocation();

    // Contextual Page Data Map - Strictly Monolith
    const getFooterContent = () => {
        const baseTheme = {
            bg: '#000000',
            text: '#FFFFFF',
            accent: '#FF3E00',
            border: 'rgba(255,62,0,0.2)',
            rightBg: 'rgba(255,255,255,0.02)',
        };

        const pages: Record<string, any> = {
            '/branding': {
                marquee: "IDENTITY IS DESTINY // AESTHETICS ARE WEAPONIZED //",
                heading: <>Bland Is A <span className="text-[#FF3E00] italic">Death Sentence.</span></>,
                paragraph: "In a saturated digital landscape, safety is your greatest liability. We engineer identities that scream.",
                cta: "Initiate Brand Audit",
                directive: "Autonomous Creative System",
            },
            '/marketing': {
                marquee: "SCALE UNFAIRLY // ACCELERATE BEYOND REASON //",
                heading: <>Force <br /><span className="text-[#FF3E00] italic">Multiplier.</span></>,
                paragraph: "Stop burning venture capital on inefficient ad spend. Start accelerating.",
                cta: "Execute Campaign",
                directive: "Growth Engineering",
            },
            '/dev-ai': {
                marquee: "INFRASTRUCTURE AS CODE // SCALABILITY IS MANDATORY //",
                heading: <>Build The <br /><span className="text-[#FF3E00] italic">Engine.</span></>,
                paragraph: "Beautiful design without structural integrity is a house of cards. We engineer for exponential scale.",
                cta: "Initialize Stack",
                directive: "Digital Architecture",
            },
            '/gaming': {
                marquee: "PIXEL PERFECT // VIRTUAL WORLDS // REAL EMOTION //",
                heading: <>Enter The <br /><span className="text-[#FF3E00] italic">Arena.</span></>,
                paragraph: "Bridging the gap between interactive entertainment and high-fidelity digital experiences.",
                cta: "Load Environment",
                directive: "Interactive Media",
            },
            '/shop': {
                marquee: "GEAR UP // THE ARMORY // DIGITAL ASSETS //",
                heading: <>Equip The <br /><span className="text-[#FF3E00] italic">Future.</span></>,
                paragraph: "Physical artifacts and digital tools engineered for the modern creative operator.",
                cta: "Access Armory",
                directive: "Asset Acquisition",
            },
        };

        const pageContent = pages[location.pathname] || {
            marquee: "SYSTEMS OF INFLUENCE // DESIGN IS WARFARE //",
            heading: <>Don't Just <span className="text-[#FF3E00] italic">Exist.</span><br />Dominate<br />The Feed.</>,
            paragraph: "Attention isn't passive currency — it is agency, leverage, and revolt. We craft digital systems that cannot be ignored.",
            cta: "Initiate Sequence",
            directive: "Autonomous Creative System",
        };

        return { ...pageContent, theme: baseTheme };
    };

    const content = getFooterContent();

    const navLinks = [
        { title: 'Studio', href: '/' },
        { title: 'The Armory', href: '/shop' },
        { title: 'Intelligence', href: '/dev-ai' },
        { title: 'Protocol', href: '/tier-list' },
    ];

    const socialLinks = [
        { title: 'Instagram', href: '#' },
        { title: 'Twitter / X', href: '#' },
        { title: 'LinkedIn', href: '#' },
    ];

    return (
        <footer
            className="relative flex flex-col transition-colors duration-700 bg-[#000000] text-white"
            style={{
                borderTop: `1px solid ${content.theme.border}`,
            }}
        >
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 noise-bg z-0" />


            {/* 1. SCROLLING MARQUEE */}
            <div className="relative z-10">
                <Marquee key={content.marquee} text={content.marquee} accentColor={content.theme.accent} borderColor="rgba(255,255,255,0.1)" />
            </div>

            {/* 2. MAIN GRID CONTENT */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[500px] border-b border-white/5">

                {/* Left Col: Brand & Statement */}
                <div className="lg:col-span-8 flex flex-col justify-between p-8 md:p-16 relative group border-r border-white/5">
                    <div
                        className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: '4rem 4rem' }}
                    />

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-2 h-2 rounded-full bg-[#FF3E00] animate-pulse shadow-[0_0_10px_#FF3E00]" />
                            <p className="font-mono text-[10px] font-black tracking-[0.4em] uppercase text-white/40 italic">{content.directive}</p>
                        </div>

                        <h2 className="font-syne font-black text-[clamp(2.5rem,7vw,8.5rem)] tracking-tighter leading-[0.9] uppercase mb-12 italic">
                            {content.heading}
                        </h2>
                    </div>

                    <div className="relative z-10 mt-auto pt-16">
                        <p className="font-mono text-xs md:text-sm font-black leading-relaxed max-w-2xl text-white/40 tracking-widest uppercase italic">
                            {content.paragraph}
                        </p>
                    </div>
                </div>

                {/* Right Col: Interaction Area */}
                <div className="lg:col-span-4 flex flex-col bg-white/[0.01]">

                    {/* Subscription Module */}
                    <div className="p-8 md:p-16 flex-grow flex flex-col justify-center border-b border-white/5">
                        <label className="font-mono text-[10px] font-black tracking-[0.4em] uppercase mb-6 block text-[#FF3E00] italic">
                            / {content.cta}
                        </label>

                        <form onSubmit={handleSubmit} className="relative group/form">
                            <input
                                type="email"
                                placeholder={status === 'SUCCESS' ? "TRANSMISSION_SECURED" : "USER@PIXELZ.ENGINE"}
                                disabled={status !== 'IDLE'}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 p-8 font-mono text-[11px] font-black outline-none transition-all uppercase focus:bg-white text-black placeholder:text-white/20 tracking-[0.2em]"
                            />
                            <style>{`
                                input:focus { color: black !important; }
                                input:focus::placeholder { color: rgba(0,0,0,0.2); }
                            `}</style>

                            <button
                                type="submit"
                                disabled={status !== 'IDLE'}
                                className={`absolute right-4 top-4 bottom-4 aspect-square flex items-center justify-center transition-all duration-500
                                ${status === 'SUCCESS'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-[#FF3E00] text-white hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,62,0,0.3)]'}`}
                            >
                                {status === 'PROCESSING' ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : status === 'SUCCESS' ? (
                                    <span className="font-black">✓</span>
                                ) : (
                                    <ArrowRightIcon className="w-5 h-5" strokeWidth={3} />
                                )}
                            </button>
                        </form>

                        <p className="mt-6 font-mono text-[9px] font-black uppercase tracking-[0.4em] text-white/20 italic">
                            Protocol initialized. Data encryption active.
                        </p>
                    </div>

                    {/* Navigation Grid */}
                    <div className="grid grid-cols-2 h-full">
                        <div className="p-8 md:p-12 border-r border-white/5">
                            <span className="font-mono text-[10px] font-black tracking-[0.4em] uppercase block mb-8 text-[#FF3E00] italic">
                                Directory
                            </span>
                            <ul className="space-y-6">
                                {navLinks.map((link) => (
                                    <li key={link.title}>
                                        <Link
                                            to={link.href}
                                            className="group flex items-center gap-3 text-sm font-syne font-black uppercase tracking-[0.2em] italic transition-all duration-500 hover:text-[#FF3E00]"
                                        >
                                            <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-500 text-[#FF3E00]">/</span>
                                            {link.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-8 md:p-12">
                            <span className="font-mono text-[10px] font-black tracking-[0.4em] uppercase block mb-8 text-[#FF3E00] italic">
                                Network
                            </span>
                            <ul className="space-y-6">
                                {socialLinks.map((link) => (
                                    <li key={link.title}>
                                        <a
                                            href={link.href}
                                            className="group flex items-center justify-between text-xs font-syne font-black uppercase tracking-[0.2em] italic transition-all duration-500 hover:text-[#FF3E00]"
                                        >
                                            {link.title}
                                            <ArrowUpRightIcon className="w-3 h-3 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

            {/* 3. SYSTEM FOOTER BAR */}
            <div className="relative z-10 bg-[#000000] text-white/30 py-6 px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-mono font-black uppercase tracking-[0.4em] italic border-t border-white/5">

                <div className="flex items-center gap-8">
                    <span className="flex items-center gap-3">
                        <GlobeAltIcon className="w-4 h-4 text-[#FF3E00] shadow-[0_0_10px_#FF3E00]" />
                        SECTOR_01 // EARTH_ORIGIN
                    </span>
                    <span className="flex items-center gap-3">
                        <CpuChipIcon className="w-4 h-4 text-[#FF3E00]" />
                        MONOLITH_STATUS: 100%
                    </span>
                </div>

                <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-sm border border-white/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF3E00] animate-pulse"></div>
                    <span>SYNC_TIME: <LiveClock /></span>
                </div>

                <div className="opacity-40">
                    © {new Date().getFullYear()} ARSON_PIXELZ. ALL_RIGHTS_RESERVED.
                </div>

            </div>

        </footer>
    );
};
