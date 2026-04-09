import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    ArrowRightIcon,
    ArrowUpRightIcon,
    GlobeAltIcon,
    CpuChipIcon
} from '@heroicons/react/24/outline';

// --- FOOTER ASSETS ---
import BrandingBG from '@/components/assets/footers/branding.webp';
import MarketingBG from '@/components/assets/footers/marketing.webp';
import DevAiBG from '@/components/assets/footers/devai.webp';
import GamingBG from '@/components/assets/footers/gaming.webp';
import ShopBG from '@/components/assets/footers/shop.webp';
import DefaultBG from '@/components/assets/footers/default.webp';

// --- CUSTOM BRUTALIST SOCIAL ICONS (Division 1 Fidelity) ---
const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-full h-full p-2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
);

const XIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full p-3">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-full h-full p-2">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);



// --- Subcomponents for cleaner organization ---

const Marquee: React.FC<{ text: string; reverse?: boolean; accentColor?: string; borderColor?: string }> = ({
    text, reverse = false, accentColor = '#FF3E00', borderColor = '#1A1A1A'
}) => {
    const content = (
        <div className={`flex gap-12 items-center whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
            {[...Array(8)].map((_, i) => (
                <React.Fragment key={i}>
                    <span 
                        className="text-7xl md:text-9xl tracking-tighter uppercase text-transparent stroke-text" 
                        style={{ 
                            WebkitTextStroke: `1px ${borderColor}`, 
                            opacity: 0.1,
                            fontFamily: 'Anton, sans-serif'
                        }}
                    >
                        {text}
                    </span>
                    <span className="text-3xl font-anton font-black" style={{ color: accentColor, opacity: 0.3 }}>///</span>
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

    // Contextual Page Data Map
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
                marquee: "AESTHETICS OVER EVERYTHING // BRAND IS BATTLE //",
                heading: <>Bland Is A <span className="text-[#FF3E00]">Death Sentence.</span></>,
                paragraph: "In a saturated digital landscape, safety is your greatest liability. We engineer identities that cut through the noise.",
                directive: "Branding Architecture",
                footerImage: BrandingBG
            },
            '/marketing': {
                marquee: "SCALE UNFAIRLY // DOMINATE THE ATTENTION ECONOMY //",
                heading: <>Force <span className="text-[#FF3E00]">Multiplier.</span></>,
                paragraph: "Burning venture capital is a choice. We accelerate growth through pure creative leverage.",
                directive: "Growth Architecture",
                footerImage: MarketingBG
            },
            '/dev-ai': {
                marquee: "ARCHITECTURAL INTEGRITY // SCALABILITY IS MANDATORY //",
                heading: <>The <span className="text-[#FF3E00]">Core Engine.</span></>,
                paragraph: "Structure without soul is a cage. Soul without structure is noise. We weave both into the architectural core.",
                directive: "Digital Infrastructure",
                footerImage: DevAiBG
            },
            '/gaming': {
                marquee: "PIXEL PERFECT // VIRTUAL WORLDS // PURE INTERACTION //",
                heading: <>Enter The <span className="text-[#FF3E00]">Arena.</span></>,
                paragraph: "Bridging the gap between interactive entertainment and high-fidelity digital archives.",
                directive: "Interactive Media",
                footerImage: GamingBG
            },
            '/shop': {
                marquee: "THE ARMORY // PHYSICAL ARTIFACTS // GEAR UP //",
                heading: <>Equip The <span className="text-[#FF3E00]">Vision.</span></>,
                paragraph: "Physical artifacts and digital tools engineered for the modern creative practitioner.",
                directive: "Archive Acquisition",
                footerImage: ShopBG
            },
            '/about': {
                marquee: "WE BUILD EMPIRES NOT PAGES // TECTONIC SHIFT //",
                heading: <>Build The <span className="text-[#FF3E00]">Empire.</span></>,
                paragraph: "Arson Pixelz wasn't founded to make 'pretty websites.' We exist to burn down the boring, the safe, and the templated.",
                directive: "Studio Foundation",
                footerImage: DefaultBG
            },
        };

        const pageContent = pages[location.pathname] || {
            marquee: "DESIGN IS WARFARE // AESTHETICS AS DEFENSE //",
            heading: <>Don't Just Exist. <span className="text-[#FF3E00]">Claim</span> Your Space.</>,
            paragraph: "Attention isn't passive currency — it is agency, leverage, and revolt. We craft digital systems that cannot be ignored.",
            directive: "Studio Foundation",
            footerImage: DefaultBG
        };

        return { ...pageContent, theme: baseTheme };
    };

    const content = getFooterContent();

    const navLinks = [
        { title: 'Studio', href: '/' },
        { title: 'The Armory', href: '/shop' },
        { title: 'Intelligence', href: '/dev-ai' },
        { title: 'START DOMINANCE', href: '/shop#agency-capabilities' },
    ];

    const socialLinks = [
        { title: 'INSTAGRAM', icon: <InstagramIcon />, href: '#' },
        { title: 'X', icon: <XIcon />, href: '#' },
        { title: 'LINKEDIN', icon: <LinkedInIcon />, href: '#' },
    ];

    return (
        <footer className="relative flex flex-col transition-colors duration-700 bg-[#000000] text-white">
            {/* 2. MAIN GRID CONTENT */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[400px] border-b border-white/5">
                {/* Left Col: Brand & Statement */}
                <div className="lg:col-span-8 flex flex-col justify-between p-6 md:p-12 relative group border-r border-white/5 overflow-hidden">
                    {/* Cinematic Background Image Overlay */}
                    {content.footerImage && (
                        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                            <img 
                                src={content.footerImage} 
                                alt="" 
                                className="w-full h-full object-cover" 
                                style={{ 
                                    maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                                    WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
                                }}
                            />
                        </div>
                    )}

                    <div className="relative z-10">
                        <h2 
                            className="text-white uppercase leading-[0.8] mb-16"
                            style={{ 
                                fontFamily: 'Anton, sans-serif', 
                                fontSize: 'clamp(4rem, 10vw, 12rem)',
                                letterSpacing: '-0.04em'
                            }}
                        >
                            {content.heading}
                        </h2>
                    </div>

                    <div className="relative z-10 mt-auto pt-16">
                        <p className="font-sans text-lg md:text-xl font-bold leading-tight max-w-3xl text-white tracking-tight uppercase decoration-[#FF3E00] decoration-4 underline underline-offset-8">
                            {content.paragraph}
                        </p>
                    </div>
                </div>

                {/* Right Col: Interaction Area */}
                <div className="lg:col-span-4 flex flex-col bg-white/[0.01]">
                    {/* Subscription Module */}
                    <div className="p-6 md:p-12 flex-grow flex flex-col justify-center border-b border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 font-syne font-black text-[200px] text-white/[0.03] leading-none -translate-y-1/2 translate-x-1/4 select-none pointer-events-none group-hover:text-[#FF3E00]/[0.08] transition-colors duration-1000 italic">01</div>
                        
                        <label className="uppercase tracking-tighter mb-8 block text-white" style={{ fontFamily: 'Anton, sans-serif', fontSize: '2.5rem' }}>
                            JOIN THE <span className="text-[#FF3E00]">MANIFESTO</span>
                        </label>

                        <form onSubmit={handleSubmit} className="relative group/form">
                            <input
                                type="email"
                                placeholder={status === 'SUCCESS' ? "SUBMISSION_SECURED" : "USER@ARSONPIXELZ.COM"}
                                disabled={status !== 'IDLE'}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 p-10 font-anton text-xl outline-none transition-all uppercase focus:bg-[#FF3E00] text-white focus:text-black placeholder:text-white/20 tracking-tighter italic"
                            />
                            <button
                                type="submit"
                                disabled={status !== 'IDLE'}
                                className={`absolute right-4 top-4 bottom-4 aspect-square flex items-center justify-center transition-all duration-500
                                ${status === 'SUCCESS' ? 'bg-green-500 text-white' : 'bg-[#FF3E00] text-white hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,62,0,0.5)] border-2 border-white'}`}
                            >
                                {status === 'PROCESSING' ? (
                                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                                ) : status === 'SUCCESS' ? (
                                    <span className="text-2xl font-black">✓</span>
                                ) : (
                                    <ArrowRightIcon className="w-8 h-8" strokeWidth={4} />
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Navigation Grid */}
                    <div className="grid grid-cols-2 h-full">
                        <div className="p-8 md:p-12 border-r border-white/5">
                            <ul className="space-y-6">
                                {navLinks.map((link) => (
                                    <li key={link.title}>
                                        <Link to={link.href} className="group flex items-center gap-3 text-sm font-anton uppercase tracking-[0.2em] italic transition-all duration-500 hover:text-[#FF3E00]">
                                            <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-500 text-[#FF3E00]">/</span>
                                            {link.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex-1 grid grid-cols-3 divide-x divide-white/5 h-full">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.title}
                                    href={link.href}
                                    className="group relative flex flex-col items-center justify-center p-4 transition-all duration-500 hover:bg-[#FF3E00] overflow-hidden"
                                >
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                                        <span className="font-anton text-3xl md:text-5xl text-black opacity-0 group-hover:opacity-10 transition-opacity duration-700 whitespace-nowrap -rotate-90 uppercase tracking-[-0.05em]">{link.title}</span>
                                    </div>
                                    <div className="relative z-10 w-8 h-8 md:w-10 md:h-10 text-white group-hover:text-black transition-colors duration-300">{link.icon}</div>
                                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10 group-hover:border-black/30" />
                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/10 group-hover:border-black/30" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. ARSON BASELINE (Division 1 Protocol) */}
            <div className="h-1.5 w-full bg-[#FF3E00] z-20" />
        </footer>
    );
};
