import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { XMarkIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

// --- ASSETS ---
// Ensure these paths match your project structure
import FullLogo from './assets/full.svg';
import PLogo from './assets/p.png';

// --- THEME CONFIGURATION ---
const LIGHT_BACKGROUND_ROUTES = ['/marketing', '/branding'];

// --- ICONS (Memoized) ---
const MarketingIcon = memo(({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
        <rect x="3" y="4" width="18" height="14" rx="2" vectorEffect="non-scaling-stroke" />
        <path d="M3 9h18" strokeOpacity="0.5" vectorEffect="non-scaling-stroke" />
        <path d="M7 14l3 3l3-3l4 4" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <path d="M17 14v4h-4" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
));
MarketingIcon.displayName = 'MarketingIcon';

const BrandingIcon = memo(({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
        <path d="M5 8V5H8" strokeLinecap="square" vectorEffect="non-scaling-stroke" />
        <path d="M19 8V5H16" strokeLinecap="square" vectorEffect="non-scaling-stroke" />
        <path d="M19 16V19H16" strokeLinecap="square" vectorEffect="non-scaling-stroke" />
        <path d="M5 16V19H8" strokeLinecap="square" vectorEffect="non-scaling-stroke" />
        <path d="M14.5 9.5L17 12C17 12 19.5 7 16 4.5C12.5 2 11 6 11 6L14.5 9.5Z" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <path d="M11 6L5 13V18H10L17 12" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
));
BrandingIcon.displayName = 'BrandingIcon';

const GamingIcon = memo(({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
        <path d="M10 3H14V9H20V13H14V19H10V13H4V9H10V13H4V9H10V3Z" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <circle cx="12" cy="11" r="1" className="opacity-40" fill="currentColor" stroke="none" />
    </svg>
));
GamingIcon.displayName = 'GamingIcon';

const DevAiIcon = memo(({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
        <path d="M7 8l-4 4l4 4" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <path d="M17 8l4 4l-4 4" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <rect x="10" y="6" width="4" height="12" rx="1" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <path d="M10 10h4" strokeOpacity="0.5" />
        <path d="M10 14h4" strokeOpacity="0.5" />
    </svg>
));
DevAiIcon.displayName = 'DevAiIcon';

// --- SCRAMBLE TEXT COMPONENT ---
const ScrambleText = memo(({ text, active, className }: { text: string; active: boolean; className?: string }) => {
    const [display, setDisplay] = useState(text);
    const chars = useMemo(() => "!@#$%^&*()_+~`|}{[]:;?><,./-=", []);

    useEffect(() => {
        if (!active) {
            setDisplay(text);
            return;
        }

        let iterations = 0;
        const maxIterations = text.length;

        const interval = setInterval(() => {
            setDisplay(
                text.split("").map((letter, index) => {
                    if (index < iterations) return text[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );

            iterations += 0.5;
            if (iterations >= maxIterations) {
                clearInterval(interval);
                setDisplay(text);
            }
        }, 30);

        return () => clearInterval(interval);
    }, [active, text, chars]);

    return <span className={className}>{display}</span>;
});
ScrambleText.displayName = 'ScrambleText';

// --- NAV LINK COMPONENT ---
const TopNavLink = memo(({ label, href, icon: Icon, isActive, onLightBackground }: {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    isActive: boolean;
    onLightBackground: boolean;
}) => {
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = useCallback(() => setHovered(true), []);
    const handleMouseLeave = useCallback(() => setHovered(false), []);

    return (
        <Link
            to={href}
            className="relative px-4 py-2.5 group flex flex-col items-center justify-center gap-1.5"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-label={label}
        >
            <div className={`relative z-10 font-mono text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${isActive
                ? 'text-[#D16D6A]'
                : onLightBackground
                    ? 'text-[#0F0F0F]/70 group-hover:text-[#D16D6A]'
                    : 'text-[#EBE9DF]/70 group-hover:text-[#D16D6A]'
                }`}>
                <ScrambleText text={label} active={hovered} />
            </div>

            <div className="relative z-10">
                <Icon className={`w-7 h-7 transition-all duration-300 ${hovered || isActive
                    ? 'text-[#D16D6A] scale-110'
                    : onLightBackground
                        ? 'text-[#0F0F0F]/40'
                        : 'text-[#EBE9DF]/30'
                    }`} />
            </div>

            <div className={`absolute inset-0 ${onLightBackground ? 'bg-black/5' : 'bg-white/5'} rounded-sm transform origin-bottom transition-transform duration-300 ${'scale-y-0 group-hover:scale-y-100'
                }`} />
        </Link>
    );
});
TopNavLink.displayName = 'TopNavLink';

// --- QUANTUM LOGO (TYPE 7 PHYSICS - NO SHIMMER) ---
const QuantumLogo = memo(({
    scrolled,
    onLightBackground
}: {
    scrolled: boolean;
    onLightBackground: boolean;
}) => {
    // Define primary color based on background for both Ring and Text
    const primaryColor = onLightBackground ? '#0a0a0a' : '#EBE9DF';

    return (
        <div className="group relative flex items-start gap-1 select-none pr-1">

            {/* 1. THE MAIN LOGO (Solid, No Shimmer) */}
            <div className="relative overflow-visible">
                {/* The Main Matter Logo */}
                <img
                    src={FullLogo}
                    alt="Arson Pixels"
                    className={`relative z-10 object-contain transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] origin-left
                        ${scrolled ? "h-[18px]" : "h-[22px] md:h-[26px]"}
                        ${scrolled ? "opacity-80" : "opacity-100"}
                        ${onLightBackground ? '' : 'filter brightness-0 invert drop-shadow(0 0 10px rgba(255,255,255,0.1))'}
                        group-hover:opacity-100
                    `}
                />
            </div>

            {/* 2. THE "R" SINGULARITY (Right Side) */}
            <div className={`relative flex items-center justify-center transition-all duration-500 ease-out -translate-y-[10px] -translate-x-[5px]
                ${scrolled ? '-mt-1 scale-[0.36]' : '-mt-2 scale-[0.48]'}`}>

                {/* Single, Prominent Solid Ring */}
                <div
                    className={`absolute inset-0 rounded-full opacity-80 transition-opacity duration-500`}
                    style={{
                        width: '100%', height: '100%', left: '0%', top: '0%',
                        borderWidth: '3px',
                        borderStyle: 'solid',
                        borderColor: primaryColor,
                        animation: 'singularity-spin 8s linear infinite',
                    }}
                />

                {/* The Core Text */}
                <svg
                    width="24" height="24" viewBox="0 0 20 20"
                    className="relative z-10"
                >
                    <text
                        x="10" y="15"
                        fontSize="14"
                        fontWeight="400"
                        textAnchor="middle"
                        fontFamily="sans-serif"
                        fill="currentColor"
                        className={`${onLightBackground ? 'text-[#0a0a0a]' : 'text-[#EBE9DF]'} transition-colors duration-300`}
                    >
                        R
                    </text>
                </svg>

                {/* Quantum Heartbeat (Pulse on Hover) */}
                <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[4px] h-[4px] rounded-full bg-[#D16D6A] opacity-0 group-hover:opacity-100 blur-[2px]"
                    style={{ animation: 'core-pulse 3s ease-in-out infinite' }}
                />
            </div>
        </div>
    );
});
QuantumLogo.displayName = 'QuantumLogo';

// --- MENU LINK COMPONENT ---
const MenuLink = memo(({ link, href, index, onClick }: {
    link: string;
    href: string;
    index: number;
    onClick: () => void;
}) => (
    <Link
        to={href}
        onClick={onClick}
        className="relative group block overflow-hidden py-1 md:py-2"
        style={{ animationDelay: `${index * 50}ms` }}
    >
        <span className="block text-3xl md:text-6xl lg:text-7xl font-black font-syne tracking-tighter uppercase text-black/10 group-hover:text-black transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:skew-x-[-10deg]">
            <span className="text-black/30 group-hover:text-black transition-colors duration-500">&lt;</span>
            {link}
            <span className="text-black/30 group-hover:text-black transition-colors duration-500">&gt;</span>
        </span>
        <div className="absolute top-1/2 left-0 w-full h-[3px] bg-black translate-x-[-105%] group-hover:translate-x-0 transition-transform duration-500 ease-expo" />
    </Link>
));
MenuLink.displayName = 'MenuLink';

// --- MAIN COMPONENT ---
export const Navigation: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Determine if current page has a light background
    const onLightBackground = useMemo(() =>
        LIGHT_BACKGROUND_ROUTES.includes(location.pathname),
        [location.pathname]
    );

    // Optimized scroll handler
    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const isScrolled = window.scrollY > 20;
                    if (isScrolled !== scrolled) {
                        setScrolled(isScrolled);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrolled]);

    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Close on route change
    useEffect(() => { setIsOpen(false); }, [location.pathname]);

    const navItems = useMemo(() => [
        { label: "Marketing", href: "/marketing", icon: MarketingIcon },
        { label: "Branding", href: "/branding", icon: BrandingIcon },
        { label: "Gaming", href: "/gaming", icon: GamingIcon },
        { label: "Dev / AI", href: "/dev-ai", icon: DevAiIcon },
    ], []);

    const menuLinks = useMemo(() => [
        { label: "About Construct", href: "/" },
        { label: "Product Tiers", href: "/tier-list" },
        { label: "Market Acceleration", href: "/marketing" },
        { label: "Brand Ignition", href: "/branding" },
        { label: "Gaming Experiences", href: "/gaming" },
        { label: "Digital Architecture", href: "/dev-ai" },
    ], []);

    const socialLinks = useMemo(() => [
        { name: "Instagram", url: "#instagram" },
        { name: "Twitter/X", url: "#twitter" },
        { name: "LinkedIn", url: "#linkedin" }
    ], []);

    const handleLogoClick = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);
    const closeMenu = useCallback(() => setIsOpen(false), []);

    return (
        <>
            {/* HEADER */}
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${scrolled
                    ? onLightBackground
                        ? "bg-[#EBE9DF]/95 backdrop-blur-xl py-3 md:py-4"
                        : "bg-[#0F0F0F]/80 backdrop-blur-xl py-3 md:py-4"
                    : "bg-transparent py-6 md:py-8"
                    }`}
            >
                {/* --- TYPE 7 PHYSICS ENGINE (GLOBAL STYLES - NO CHROMATIC SHIFT) --- */}
                <style>{`
                    /* -- Logo Singularity Physics -- */
                    @keyframes singularity-spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    
                    @keyframes core-pulse {
                        0%, 100% { transform: translate(-50%, -50%) scale(0.96); opacity: 0.45; }
                        50% { transform: translate(-50%, -50%) scale(1.08); opacity: 0.6; }
                    }

                    /* -- Header Border Physics -- */
                    @keyframes quantum-sweep {
                        0% { transform: translateX(-120%) scaleX(0.4) scaleY(0.8); opacity: 0; }
                        25% { transform: translateX(-10%) scaleX(1) scaleY(1); opacity: 1; }
                        100% { transform: translateX(220%) scaleX(0.3) scaleY(0.8); opacity: 0; }
                    }
                    
                    @keyframes interference {
                        0% { transform: translateX(-130%) scaleX(1.2); opacity: 0; }
                        50% { transform: translateX(40%) scaleX(1.05); opacity: 1; }
                        100% { transform: translateX(230%) scaleX(0.6); opacity: 0; }
                    }
                    
                    @keyframes energy-decay {
                        0% { transform: translateX(-140%); opacity: 0; }
                        40% { transform: translateX(0%); opacity: 1; }
                        100% { transform: translateX(200%); opacity: 0; }
                    }
                    
                    @keyframes particle-burst {
                        0% { transform: translateX(-110%) scale(0.5); opacity: 0; }
                        20% { opacity: 1; }
                        100% { transform: translateX(210%) scale(0.4); opacity: 0; }
                    }
                    
                    @keyframes dimensional-ripple {
                        0% { transform: translateX(-100%) scaleX(0.3) scaleY(0.5); opacity: 0; }
                        50% { transform: translateX(50%) scaleX(1.3) scaleY(1); opacity: 0.8; }
                        100% { transform: translateX(200%) scaleX(0.2) scaleY(0.4); opacity: 0; }
                    }
                    
                    @keyframes substrate {
                        0% { opacity: 0.3; }
                        100% { opacity: 0.7; }
                    }
                `}</style>

                {/* Header Border Energy Field (Only visible when scrolled) */}
                {scrolled && (
                    <div className="absolute bottom-0 left-0 w-full h-[4px] overflow-visible pointer-events-none">
                        <div className={`absolute inset-0 ${onLightBackground ? 'bg-gradient-to-r from-black/5 via-black/10 to-black/5' : 'bg-gradient-to-r from-white/5 via-white/10 to-white/5'}`}
                            style={{ animation: 'substrate 8s ease-in-out infinite alternate' }} />

                        <div className="absolute inset-0 h-[4px]"
                            style={{
                                background: 'linear-gradient(90deg, transparent 0%, transparent 20%, rgba(209,109,106,0.3) 35%, rgba(209,109,106,1) 50%, rgba(209,109,106,0.3) 65%, transparent 80%, transparent 100%)',
                                animation: 'quantum-sweep 7.3s cubic-bezier(0.16, 0.84, 0.44, 1) infinite',
                                filter: 'drop-shadow(0 0 4px rgba(209,109,106,0.8))',
                            }}
                        />
                        <div className="absolute inset-0 h-[3px] -top-[1px]"
                            style={{
                                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.4) 40%, rgba(209,109,106,0.6) 50%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0.1) 75%, transparent 100%)',
                                animation: 'interference 7.3s cubic-bezier(0.34, 0.12, 0.56, 1) infinite',
                                mixBlendMode: 'screen',
                            }}
                        />
                    </div>
                )}

                {/* Noise Texture */}
                <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${scrolled ? 'opacity-[0.15]' : 'opacity-0'}`} aria-hidden="true">
                    <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-overlay" />
                </div>

                <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex items-center justify-between relative z-10">

                    {/* LOGO - Now using Quantum Implementation (No Shimmer) */}
                    <Link
                        to="/"
                        onClick={handleLogoClick}
                        className={`cursor-pointer focus:outline-none rounded relative`}
                        aria-label="Arson Pixels - Go to homepage"
                    >
                        <QuantumLogo scrolled={scrolled} onLightBackground={onLightBackground} />
                    </Link>

                    {/* NAVIGATION */}
                    <nav className="hidden md:flex items-center gap-4 lg:gap-8 absolute left-1/2 -translate-x-1/2" aria-label="Main navigation">
                        {navItems.map((item) => (
                            <TopNavLink
                                key={item.label}
                                {...item}
                                isActive={location.pathname === item.href}
                                onLightBackground={onLightBackground}
                            />
                        ))}
                    </nav>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-4 md:gap-8">
                        <Link
                            to="/tier-list"
                            className={`hidden md:flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-[#D16D6A] focus:ring-offset-2 ${onLightBackground ? 'focus:ring-offset-[#EBE9DF]' : 'focus:ring-offset-[#0F0F0F]'
                                } rounded px-2 py-1`}
                        >
                            <span className={`font-syne font-bold text-sm ${onLightBackground ? 'text-[#0F0F0F]' : 'text-white'
                                } group-hover:text-[#D16D6A] transition-colors`}>
                                START PROJECT
                            </span>
                            <ArrowRightIcon className="w-4 h-4 text-[#D16D6A] -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                        </Link>

                        <div className={`hidden md:block w-[1px] h-6 ${onLightBackground ? 'bg-black/20' : 'bg-white/20'
                            } transition-opacity ${scrolled ? 'opacity-100' : 'opacity-50'}`} aria-hidden="true" />

                        <button
                            onClick={toggleMenu}
                            className={`relative group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-[#D16D6A] focus:ring-offset-2 ${onLightBackground ? 'focus:ring-offset-[#EBE9DF]' : 'focus:ring-offset-[#0F0F0F]'
                                } rounded-full`}
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isOpen}
                        >
                            <div className={`relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full ${onLightBackground
                                ? 'bg-black/10 hover:bg-[#D16D6A] border border-black/5'
                                : 'bg-white/10 hover:bg-[#D16D6A] border border-white/5'
                                } transition-colors duration-500 overflow-hidden backdrop-blur-sm`}>
                                <img
                                    src={PLogo}
                                    alt=""
                                    className={`w-5 h-5 md:w-6 md:h-6 object-contain ${onLightBackground ? '' : 'filter brightness-0 invert'
                                        } group-hover:rotate-90 transition-transform duration-500`}
                                    aria-hidden="true"
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* MENU OVERLAY */}
            <div
                id="main-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Main menu"
                className="fixed inset-0 z-[60] flex flex-col justify-between bg-[#D16D6A] text-[#0a0a0a] transition-all duration-700 ease-[cubic-bezier(0.645,0.045,0.355,1.000)]"
                style={{
                    clipPath: isOpen ? "circle(150% at 90% 5%)" : "circle(0% at 90% 5%)",
                    pointerEvents: isOpen ? "auto" : "none"
                }}
            >
                {/* Noise Texture */}
                <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply" aria-hidden="true">
                    <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
                </div>

                {/* Menu Header */}
                <div className="relative w-full px-6 py-6 md:px-12 md:py-8 flex justify-between items-center z-20">
                    <div className="flex flex-col">
                        <span className="font-mono text-xs font-bold tracking-[0.3em] uppercase opacity-50">
                            System Override
                        </span>
                        <span className="font-syne font-bold text-2xl md:text-3xl mt-1">
                            MENU_OS v7.1
                        </span>
                    </div>
                    <button
                        onClick={toggleMenu}
                        className="group relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full border border-black/10 hover:bg-black hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-[#D16D6A]"
                        aria-label="Close menu"
                    >
                        <XMarkIcon className="w-6 h-6 transition-transform duration-500 group-hover:rotate-180" />
                    </button>
                </div>

                {/* Menu Links */}
                <nav className="relative flex-1 flex flex-col justify-center items-center z-10 space-y-0 md:space-y-2">
                    {menuLinks.map((item, idx) => (
                        <MenuLink
                            key={item.label}
                            link={item.label}
                            href={item.href}
                            index={idx}
                            onClick={closeMenu}
                        />
                    ))}
                </nav>

                {/* Menu Footer */}
                <div className="relative w-full px-6 py-8 md:px-12 md:py-10 flex flex-col md:flex-row justify-between items-end md:items-center border-t border-black/10 z-20">
                    <div className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-60 max-w-xs leading-relaxed">
                        Arson Pixels ® <br />
                        Type 7 Civilization Interface <br />
                        Est. 2024 / Sector 01
                    </div>

                    <div className="hidden md:flex space-x-8 mt-4 md:mt-0">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                className="font-mono text-xs font-bold uppercase tracking-widest hover:underline decoration-2 underline-offset-4 focus:outline-none focus:ring-2 focus:ring-black rounded px-1"
                            >
                                {social.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navigation;