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
    text, reverse = false, accentColor = '#D16D6A', borderColor = '#1A1A1A'
}) => {
    const content = (
        <div className={`flex gap-8 items-center whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
            {[...Array(8)].map((_, i) => (
                <React.Fragment key={i}>
                    <span className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-transparent stroke-text" style={{ WebkitTextStroke: `2px ${borderColor}`, opacity: 0.15 }}>
                        {text}
                    </span>
                    <span className="text-2xl font-black" style={{ color: accentColor, opacity: 0.5 }}>///</span>
                </React.Fragment>
            ))}
        </div>
    );

    return (
        <div className="overflow-hidden py-4 select-none pointer-events-none" style={{ borderTop: `2px solid ${borderColor}20`, borderBottom: `2px solid ${borderColor}20` }}>
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
        <span className="font-mono tabular-nums">
            {time.toLocaleTimeString('en-US', { hour12: false })} UTC
        </span>
    );
};

export const Footer: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'light' }) => {
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

    // Contextual Page Data Map
    const getFooterContent = () => {
        switch (location.pathname) {
            case '/branding':
                return {
                    marquee: "IDENTITY IS DESTINY // AESTHETICS ARE WEAPONIZED //",
                    heading: <>Bland Is A <span style={{ color: '#D16D6A' }} className="italic">Death Sentence.</span></>,
                    paragraph: "In a saturated digital landscape, safety is your greatest liability. We engineer identities that scream.",
                    cta: "Initiate Brand Audit",
                    directive: "Autonomous Creative System",
                    theme: {
                        bg: '#EBE9DF',        // warm parchment — on-brand homepage base
                        text: '#1A1A1A',
                        accent: '#D16D6A',    // the classic Arson red
                        border: '#1A1A1A',
                        rightBg: 'rgba(209,109,106,0.08)',
                    }
                };
            case '/marketing':
                return {
                    marquee: "SCALE UNFAIRLY // ACCELERATE BEYOND REASON //",
                    heading: <>Force <br /><span style={{ color: '#00E5C3' }} className="italic">Multiplier.</span></>,
                    paragraph: "Stop burning venture capital on inefficient ad spend. Start accelerating.",
                    cta: "Execute Campaign",
                    directive: "Growth Engineering",
                    theme: {
                        bg: '#0A1A16',        // deep teal-black
                        text: '#E8FFF9',
                        accent: '#00E5C3',    // electric mint
                        border: '#00E5C3',
                        rightBg: 'rgba(0,229,195,0.06)',
                    }
                };
            case '/dev-ai':
                return {
                    marquee: "INFRASTRUCTURE AS CODE // SCALABILITY IS MANDATORY //",
                    heading: <>Build The <br /><span style={{ color: '#4FC3F7' }} className="italic">Engine.</span></>,
                    paragraph: "Beautiful design without structural integrity is a house of cards. We engineer for exponential scale.",
                    cta: "Initialize Stack",
                    directive: "Digital Architecture",
                    theme: {
                        bg: '#050D1A',        // deep navy-black
                        text: '#C9E8FF',
                        accent: '#4FC3F7',    // electric sky blue
                        border: '#1B3A5C',
                        rightBg: 'rgba(79,195,247,0.06)',
                    }
                };
            case '/gaming':
                return {
                    marquee: "PIXEL PERFECT // VIRTUAL WORLDS // REAL EMOTION //",
                    heading: <>Enter The <br /><span style={{ color: '#D16D6A' }} className="italic">Arena.</span></>,
                    paragraph: "Bridging the gap between interactive entertainment and high-fidelity digital experiences.",
                    cta: "Load Environment",
                    directive: "Interactive Media",
                    theme: {
                        bg: '#0A0A0A',        // pure noir — matches GamingPage bg
                        text: '#EBE9DF',
                        accent: '#D16D6A',
                        border: '#2A0A0A',
                        rightBg: 'rgba(209,109,106,0.07)',
                    }
                };
            case '/shop':
                return {
                    marquee: "GEAR UP // THE ARMORY // DIGITAL ASSETS //",
                    heading: <>Equip The <br /><span style={{ color: '#F5C842' }} className="italic">Future.</span></>,
                    paragraph: "Physical artifacts and digital tools engineered for the modern creative operator.",
                    cta: "Access Armory",
                    directive: "Asset Acquisition",
                    theme: {
                        bg: '#1A1500',        // dark amber-black
                        text: '#FFF8DC',
                        accent: '#F5C842',    // gold
                        border: '#3D2E00',
                        rightBg: 'rgba(245,200,66,0.07)',
                    }
                };
            default:
                // Homepage / Catch-all
                return {
                    marquee: "SYSTEMS OF INFLUENCE // DESIGN IS WARFARE //",
                    heading: <>Don't Just <span style={{ color: '#D16D6A' }} className="italic">Exist.</span><br />Dominate<br />The Feed.</>,
                    paragraph: "Attention isn't passive currency — it is agency, leverage, and revolt. We craft digital systems that cannot be ignored.",
                    cta: "Initiate Sequence",
                    directive: "Autonomous Creative System",
                    theme: {
                        bg: '#EBE9DF',
                        text: '#1A1A1A',
                        accent: '#D16D6A',
                        border: '#1A1A1A',
                        rightBg: 'rgba(255,255,255,0.4)',
                    }
                };
        }
    };

    const content = getFooterContent();

    // If 'dark' theme is explicitly requested via props (ReverseVoidSystem),
    // override the theme colors to match the Void.
    if (theme === 'dark') {
        content.theme.bg = '#020202';
        content.theme.text = '#EBE9DF';
        content.theme.accent = '#D16D6A'; // Explicitly ensure brand red in dark mode
        content.theme.border = 'rgba(235,233,223,0.3)';
        content.theme.rightBg = 'rgba(255,255,255,0.03)';
    }

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
            className="relative flex flex-col noise-bg transition-colors duration-700"
            style={{
                backgroundColor: content.theme.bg,
                color: content.theme.text,
                borderTop: `12px solid ${content.theme.border}`,
            }}
        >

            {/* 1. SCROLLING MARQUEE */}
            <Marquee key={content.marquee} text={content.marquee} accentColor={content.theme.accent} borderColor={content.theme.border} />

            {/* 2. MAIN GRID CONTENT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]" style={{ borderBottom: `2px solid ${content.theme.border}` }}>

                {/* Left Col: Brand & Statement */}
                <div className="lg:col-span-7 flex flex-col justify-between p-6 md:p-12 relative overflow-hidden group" style={{ borderRight: `2px solid ${content.theme.border}` }}>
                    <div
                        className="absolute inset-0 opacity-[0.08] pointer-events-none"
                        style={{ backgroundImage: `linear-gradient(${content.theme.border} 1px, transparent 1px), linear-gradient(90deg, ${content.theme.border} 1px, transparent 1px)`, backgroundSize: '2rem 2rem' }}
                    />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-3 h-3 animate-pulse" style={{ backgroundColor: content.theme.accent }} />
                            <p className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-60">{content.directive}</p>
                        </div>

                        <h2 className="font-black text-5xl sm:text-7xl xl:text-8xl tracking-tighter leading-[0.85] uppercase mb-8 transition-all duration-500">
                            {content.heading}
                        </h2>
                    </div>

                    <div className="relative z-10 mt-auto pt-12">
                        <p className="font-medium text-lg md:text-xl leading-relaxed max-w-xl opacity-75">
                            {content.paragraph}
                        </p>
                    </div>
                </div>

                {/* Right Col: Interaction Area */}
                <div className="lg:col-span-5 flex flex-col" style={{ backgroundColor: content.theme.rightBg }}>

                    {/* Subscription Module */}
                    <div
                        className="p-8 md:p-12 flex-grow flex flex-col justify-center border-b-2 group/sub transition-colors duration-500"
                        style={{
                            borderColor: `${content.theme.border}40`,
                            '--sub-text': content.theme.text,
                            '--sub-bg': content.theme.bg,
                            '--sub-accent': content.theme.accent,
                        } as React.CSSProperties}
                    >
                        <label
                            className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4 block opacity-60"
                            style={{ color: content.theme.text }}
                        >
                            / {content.cta}
                        </label>

                        <form onSubmit={handleSubmit} className="relative group/form">
                            <input
                                type="email"
                                placeholder={status === 'SUCCESS' ? "TRANSMISSION RECEIVED" : "ENTER_EMAIL_ADDRESS"}
                                disabled={status !== 'IDLE'}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent p-6 font-mono text-sm outline-none transition-all uppercase focus:pl-8 border"
                                style={{
                                    borderColor: `${content.theme.border}40`,
                                    color: content.theme.text,
                                    '--tw-placeholder-color': `${content.theme.text}40`,
                                } as React.CSSProperties}
                            />
                            <style>{`
                                input::placeholder { color: ${content.theme.text}55; }
                                input:focus { border-color: ${content.theme.accent} !important; box-shadow: 0 0 20px -5px ${content.theme.accent}30; }
                            `}</style>

                            <button
                                type="submit"
                                disabled={status !== 'IDLE'}
                                className={`absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center border transition-all duration-500
                                ${status === 'SUCCESS'
                                        ? 'bg-green-500 text-white border-green-600'
                                        : 'hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(209,109,106,0.4)]'}`}
                                style={status !== 'SUCCESS' ? {
                                    backgroundColor: content.theme.text,
                                    color: content.theme.bg,
                                    borderColor: content.theme.border,
                                    '--hover-bg': content.theme.accent
                                } as React.CSSProperties : {}}
                                onMouseEnter={e => {
                                    if(status === 'IDLE') {
                                        e.currentTarget.style.backgroundColor = content.theme.accent;
                                        e.currentTarget.style.color = 'white';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if(status === 'IDLE') {
                                        e.currentTarget.style.backgroundColor = content.theme.text;
                                        e.currentTarget.style.color = content.theme.bg;
                                    }
                                }}
                            >
                                {status === 'PROCESSING' ? (
                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                ) : status === 'SUCCESS' ? (
                                    <span className="font-bold">✓</span>
                                ) : (
                                    <ArrowRightIcon className="w-5 h-5" />
                                )}
                            </button>
                        </form>

                        <p className="mt-4 font-mono text-[9px] uppercase tracking-widest opacity-40" style={{ color: content.theme.text }}>
                            By connecting, you agree to the data retention protocols.
                        </p>
                    </div>

                    {/* Navigation Grid */}
                    <div className="grid grid-cols-2 h-full">
                        <div className="p-8" style={{ borderRight: `2px solid ${content.theme.border}40` }}>
                            <span
                                className="font-mono text-[10px] tracking-[0.3em] uppercase block mb-6 transition-colors duration-300"
                                style={{ color: content.theme.accent }}
                            >
                                Directory
                            </span>
                            <ul className="space-y-4">
                                {navLinks.map((link) => (
                                    <li key={link.title}>
                                        <Link
                                            to={link.href}
                                            className="group flex items-center gap-2 text-lg font-bold uppercase tracking-tight transition-all duration-300 hover:translate-x-2"
                                            style={{ 
                                                '--hover-color': content.theme.accent,
                                                '--base-color': content.theme.text 
                                            } as React.CSSProperties}
                                        >
                                            <span 
                                                className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 opacity-0 group-hover:opacity-100 font-mono text-xs"
                                                style={{ color: content.theme.accent }}
                                            >
                                                /
                                            </span>
                                            <span className="transition-colors group-hover:text-[var(--hover-color)]" style={{ color: content.theme.text }}>
                                                {link.title}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-8">
                            <span
                                className="font-mono text-[10px] tracking-[0.3em] uppercase block mb-6 transition-colors duration-300"
                                style={{ color: content.theme.accent }}
                            >
                                Network
                            </span>
                            <ul className="space-y-4">
                                {socialLinks.map((link) => (
                                    <li key={link.title}>
                                        <a
                                            href={link.href}
                                            className="group flex items-center justify-between text-sm font-bold uppercase pb-2 transition-all border-b border-transparent"
                                            style={{ 
                                                color: content.theme.text, 
                                                borderBottomColor: `${content.theme.border}25`,
                                                '--hover-color': content.theme.accent 
                                            } as React.CSSProperties}
                                        >
                                            <span className="group-hover:text-[var(--hover-color)] transition-colors">
                                                {link.title}
                                            </span>
                                            <ArrowUpRightIcon 
                                                className="w-3 h-3 transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-all group-hover:text-[var(--hover-color)]" 
                                            />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

            {/* 3. SYSTEM FOOTER BAR */}
            <div className="bg-arson-dark text-arson-base py-4 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs font-mono uppercase tracking-widest">

                <div className="flex items-center gap-6">
                    <span className="flex items-center gap-2">
                        <GlobeAltIcon className="w-4 h-4 text-arson-accent" />
                        Sector: Earth
                    </span>
                    <span className="hidden md:flex items-center gap-2">
                        <CpuChipIcon className="w-4 h-4 text-arson-accent" />
                        Sys.Integrity: 100%
                    </span>
                </div>

                <div className="flex items-center gap-2 bg-arson-base/10 px-3 py-1 rounded-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span>Live: <LiveClock /></span>
                </div>

                <div className="text-arson-base/40">
                    © 2025 Arson Pixelz. All Rights Secured.
                </div>

            </div>

        </footer>
    );
};
