import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { XMarkIcon, ArrowRightIcon, ShoppingBagIcon, SignalIcon } from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

// --- ASSETS ---
import PLogo from './assets/p.png';

// --- THEME CONFIGURATION ---
const LIGHT_BACKGROUND_ROUTES = ['/', '/marketing', '/branding', '/contact', '/about', '/work', '/legal'];

// --- Helpers ---
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(" ");

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
        <path d="M10 3H14V9H20V13H14V19H10V13H4V9H10V13H4V9H10V13H4V9H10V3Z" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
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

const ShopIcon = memo(({ className }: { className?: string }) => (
    <ShoppingBagIcon className={className} strokeWidth={1.5} />
));
ShopIcon.displayName = 'ShopIcon';

const TransmissionsIcon = memo(({ className }: { className?: string }) => (
    <SignalIcon className={className} strokeWidth={1.5} />
));
TransmissionsIcon.displayName = 'TransmissionsIcon';

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
const TopNavLink = memo(({ 
    label, href, icon: Icon, isActive, onLightBackground, isHUDActive, hudIntensity,
    cartCount = 0, onCartClick
}: {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
    isActive: boolean;
    onLightBackground: boolean;
    isHUDActive: boolean;
    hudIntensity: number;
    cartCount?: number;
    onCartClick?: (e: React.MouseEvent) => void;
}) => {
    const [hovered, setHovered] = useState(false);
    const location = useLocation();

    const handleMouseEnter = useCallback(() => setHovered(true), []);
    const handleMouseLeave = useCallback(() => setHovered(false), []);

    const isShop = label.toLowerCase() === 'shop';
    const hasItems = isShop && cartCount > 0;
    const isRevealed = hovered || isActive || hasItems;

    const handleClick = (e: React.MouseEvent) => {
        if (isShop && location.pathname === '/shop' && onCartClick) {
            e.preventDefault();
            onCartClick(e);
        }
    };

    return (
        <Link
            to={href}
            className={cn(
                "group relative flex items-center justify-center gap-3 px-10 h-full transition-all duration-500 overflow-hidden pointer-events-auto",
                "text-white"
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            aria-label={label}
        >
            {/* Elegant Hover Glow / OS Scanline background */}
            <div className={cn(
                "absolute inset-0 bg-gradient-to-t from-[#D16D6A]/[0.15] to-transparent transition-opacity duration-700 ease-out",
                isRevealed ? "opacity-100" : "opacity-0"
            )}>
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, transparent 50%, rgba(209,109,106,0.3) 50%)', backgroundSize: '100% 4px', mixBlendMode: 'overlay' }} />
            </div>
            
            <div className={cn(
                "relative z-10 flex items-center gap-2.5 transition-transform duration-500 will-change-transform",
                isRevealed ? "-translate-y-0.5" : "translate-y-0"
            )}>
                <Icon className={cn(
                    "w-[14px] h-[14px] transition-all duration-500",
                    isRevealed ? "text-[#D16D6A] drop-shadow-[0_0_8px_rgba(209,109,106,1)] scale-110" : "text-white opacity-80 group-hover:opacity-100 group-hover:text-white"
                )} />
                <span className={cn(
                    "font-sans text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-500 relative text-white",
                    isRevealed ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" : "opacity-100"
                )}>
                    <ScrambleText text={label} active={hovered} />
                    
                    {/* Micro data pip on hover */}
                    {isRevealed && (
                        <motion.span 
                            initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
                            className="absolute -top-3 -right-6 text-[6px] font-mono text-[#D16D6A] tracking-wider"
                        >
                            SYS_{String(label.length).padStart(2, '0')}
                        </motion.span>
                    )}
                </span>
            </div>

            {/* Hyper-Advanced Kinetic Brackets */}
            <div className={cn(
                "absolute top-1/2 -translate-y-1/2 left-3 w-[2px] h-4 bg-[#D16D6A] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] before:content-[''] before:absolute before:top-0 before:left-0 before:w-2 before:h-[2px] before:bg-[#D16D6A] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-2 after:h-[2px] after:bg-[#D16D6A]",
                isRevealed ? "opacity-100 scale-100 drop-shadow-[0_0_8px_rgba(209,109,106,1)]" : "opacity-0 scale-[0.5] -translate-x-2"
            )} />
            <div className={cn(
                "absolute top-1/2 -translate-y-1/2 right-3 w-[2px] h-4 bg-[#D16D6A] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] before:content-[''] before:absolute before:top-0 before:right-0 before:w-2 before:h-[2px] before:bg-[#D16D6A] after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-2 after:h-[2px] after:bg-[#D16D6A]",
                isRevealed ? "opacity-100 scale-100 drop-shadow-[0_0_8px_rgba(209,109,106,1)]" : "opacity-0 scale-[0.5] translate-x-2"
            )} />

            {/* Glowing Bottom Digital Scanner Line */}
            <div className={cn(
                "absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#D16D6A] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]",
                isRevealed ? "w-full opacity-100 shadow-[0_0_20px_#D16D6A]" : "w-0 opacity-0"
            )}>
                 {isRevealed && (
                    <motion.div 
                        className="w-[10%] h-[2px] bg-white absolute top-0"
                        animate={{ left: ['0%', '90%', '0%'] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                    />
                )}
            </div>

            {hasItems && (
                 <span className="absolute top-1/2 -translate-y-[15px] right-2 bg-[#D16D6A] text-[#050505] px-1.5 py-0.5 text-[8px] font-black rounded-sm shadow-[0_0_10px_#D16D6A]">
                    {cartCount}
                </span>
            )}
        </Link>
    );
});
TopNavLink.displayName = 'TopNavLink';

// --- QUANTUM LOGO ---
const QuantumLogo = memo(({
    scrolled,
    onLightBackground,
    isHUDActive,
    hudIntensity
}: {
    scrolled: boolean;
    onLightBackground: boolean;
    isHUDActive: boolean;
    hudIntensity: number;
}) => {
    const [furnaceActive, setFurnaceActive] = useState(true);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        // Fallback for hot reloads or missing preloader
        let initialFallbackTimer = setTimeout(() => setFurnaceActive(false), 8000); 

        const startTimer = () => {
            clearTimeout(initialFallbackTimer);
            // Preloader takes ~3100ms. We hold the animation for slightly longer, then let the 5s fade-out begin.
            timer = setTimeout(() => setFurnaceActive(false), 4500);
        };
        
        window.addEventListener('sessionInitiated', startTimer);
        
        return () => {
            window.removeEventListener('sessionInitiated', startTimer);
            clearTimeout(timer);
            clearTimeout(initialFallbackTimer);
        };
    }, []);

    const primaryColor = onLightBackground ? '#0a0a0a' : '#EBE9DF';
    const svgPaths = [
        "M1.27,10.22c.84-1.69,1.99-2.99,3.45-3.9,1.45-.91,3.08-1.36,4.87-1.36,1.53,0,2.88.31,4.03.93,1.16.62,2.05,1.44,2.67,2.46v-3.08h6.66v21.75h-6.66v-3.08c-.65,1.01-1.55,1.83-2.71,2.45-1.16.62-2.5.94-4.03.94-1.77,0-3.38-.46-4.83-1.38-1.46-.92-2.61-2.23-3.45-3.94-.84-1.7-1.27-3.67-1.27-5.9s.42-4.2,1.27-5.88ZM14.91,12.21c-.92-.96-2.05-1.44-3.37-1.44s-2.45.47-3.37,1.42c-.92.95-1.38,2.25-1.38,3.92s.46,2.98,1.38,3.96c.92.97,2.05,1.46,3.37,1.46s2.45-.48,3.37-1.44,1.38-2.27,1.38-3.94-.46-2.97-1.38-3.94Z",
        "M36.4,6.07c1.17-.69,2.47-1.03,3.9-1.03v7.05h-1.83c-1.66,0-2.91.36-3.74,1.07-.83.72-1.25,1.97-1.25,3.76v10.09h-6.66V5.28h6.66v3.62c.78-1.2,1.75-2.14,2.92-2.83Z",
        "M46.3,26.36c-1.48-.65-2.65-1.54-3.51-2.67-.86-1.13-1.34-2.4-1.44-3.8h6.59c.08.75.43,1.36,1.05,1.83.62.47,1.39.7,2.3.7.83,0,1.47-.16,1.93-.49.45-.32.68-.75.68-1.27,0-.62-.33-1.08-.97-1.38-.65-.3-1.7-.63-3.16-.99-1.56-.36-2.86-.75-3.9-1.15-1.04-.4-1.94-1.04-2.69-1.91-.75-.87-1.13-2.05-1.13-3.53,0-1.25.34-2.38,1.03-3.41.69-1.03,1.7-1.84,3.04-2.44,1.34-.6,2.93-.9,4.77-.9,2.73,0,4.88.68,6.45,2.03,1.57,1.35,2.47,3.14,2.71,5.38h-6.16c-.1-.75-.44-1.35-.99-1.79-.56-.44-1.29-.66-2.2-.66-.78,0-1.38.15-1.79.45-.42.3-.62.71-.62,1.23,0,.62.33,1.09.99,1.4.66.31,1.7.62,3.1.94,1.61.42,2.92.82,3.94,1.23,1.01.4,1.9,1.05,2.67,1.95.77.9,1.16,2.1,1.19,3.6,0,1.27-.36,2.41-1.07,3.41s-1.74,1.79-3.08,2.36c-1.34.57-2.89.86-4.66.86-1.9,0-3.59-.32-5.07-.97Z",
        "M67.44,25.97c-1.7-.91-3.04-2.21-4.01-3.9-.97-1.69-1.46-3.66-1.46-5.92s.49-4.2,1.48-5.9,2.34-3.01,4.05-3.92c1.71-.91,3.64-1.36,5.77-1.36s4.05.45,5.77,1.36c1.71.91,3.07,2.22,4.05,3.92.99,1.7,1.48,3.67,1.48,5.9s-.5,4.2-1.5,5.9c-1,1.7-2.36,3.01-4.09,3.92-1.73.91-3.66,1.36-5.79,1.36s-4.05-.45-5.75-1.36ZM76.44,20.16c.9-.94,1.34-2.27,1.34-4.01s-.43-3.08-1.31-4.01c-.87-.94-1.94-1.4-3.22-1.4s-2.38.46-3.23,1.38c-.86.92-1.29,2.27-1.29,4.03s.42,3.08,1.27,4.01c.84.94,1.9,1.4,3.18,1.4s2.36-.47,3.25-1.4Z",
        "M106.49,7.52c1.52,1.65,2.28,3.92,2.28,6.8v12.7h-6.62v-11.81c0-1.45-.38-2.58-1.13-3.39-.75-.8-1.77-1.21-3.04-1.21s-2.29.4-3.04,1.21c-.75.81-1.13,1.94-1.13,3.39v11.81h-6.66V5.28h6.66v2.88c.68-.96,1.58-1.72,2.73-2.28,1.14-.56,2.43-.84,3.86-.84,2.55,0,4.58.83,6.1,2.47Z",
        "M118.21,27.02V0h3.98v27.02h-3.98ZM121.73,18.65v-3.62h4.43c2.08,0,3.65-.52,4.71-1.55,1.06-1.03,1.59-2.55,1.59-4.54,0-1.74-.53-3.06-1.59-3.96-1.06-.9-2.63-1.35-4.71-1.35h-4.36V0h4.36c3.39,0,5.95.75,7.7,2.26,1.74,1.51,2.62,3.74,2.62,6.68,0,3.18-.87,5.6-2.62,7.24-1.74,1.64-4.31,2.46-7.7,2.46h-4.43Z",
        "M138.59,27.02v-3.27h8.07v3.27h-8.07ZM139.73,11.75v-3.27h10.58v3.27h-10.58ZM148.16,5.54c-.77,0-1.44-.25-1.99-.76-.55-.51-.83-1.12-.83-1.83s.28-1.33.83-1.84c.55-.5,1.21-.75,1.99-.75s1.45.25,2,.75c.55.5.82,1.11.82,1.84s-.27,1.32-.82,1.83c-.55.51-1.21.76-2,.76ZM146.27,27.02V9.53h4.03v17.49h-4.03ZM149.93,27.02v-3.27h6.58v3.27h-6.58Z",
        "M173.63,27.02l-6.11-8.71-8.11-11.46h4.59l6.18,9.06,8.03,11.11h-4.59ZM159.42,27.02l8.03-11.11,6.18-9.06h4.59l-8.34,11.46-5.88,8.71h-4.59Z",
        "M192.43,27.4c-3.44,0-6.09-.9-7.96-2.71-1.87-1.81-2.81-4.41-2.81-7.79s.79-5.86,2.38-7.69,3.83-2.74,6.72-2.74c2.73,0,4.84.82,6.33,2.47,1.49,1.65,2.24,4.05,2.24,7.19,0,.93-.04,1.79-.11,2.59h-14.16v-3.08h10.6c0-1.81-.43-3.2-1.28-4.17s-2.05-1.45-3.57-1.45c-1.71,0-3.04.58-3.98,1.74s-1.41,2.81-1.41,4.94c0,2.33.65,4.11,1.94,5.32,1.29,1.21,3.14,1.82,5.54,1.82.84,0,1.66-.05,2.47-.14.81-.1,1.64-.22,2.47-.39l.49,3.56c-1.19.23-2.28.37-3.27.44s-1.86.1-2.63.1Z",
        "M202.95,30.04l12.79-28.64h3.39l-12.79,28.64h-3.39Z",
        "M220.22,11.17v-2.52l12.61-5.3v2.7l-9.51,3.75v.21l9.51,3.75v2.7l-12.61-5.3Z",
        "M232.99,16.7l-.21-.09-12.71-5.34v-2.72l.09-.04,12.83-5.39v3.04l-9.51,3.75,9.51,3.75v3.04ZM220.38,11.06l12.31,5.17v-2.37l-9.51-3.75v-.42l9.51-3.75v-2.37l-12.31,5.17v2.31Z",
        "M219.91,26.88l9.96-3.75v-.21l-9.96-3.75v-2.7l12.61,5.3v2.52l-12.61,5.3v-2.7Z",
        "M219.75,29.81v-3.04l.1-.04,9.86-3.71-9.96-3.75v-3.04l.21.09,12.71,5.34v2.72l-.09.04-12.83,5.39ZM220.06,26.99v2.37l12.31-5.17v-2.31l-12.31-5.17v2.37l9.96,3.75v.42l-.1.04-9.86,3.71Z"
    ];

    return (
        <div className="group relative flex items-start gap-1 select-none pr-1" style={{ scale: scrolled ? 0.82 : 1 }}>
            <div className={cn(
                "relative origin-left",
                scrolled ? "h-[18px] w-[139.79px] opacity-80" : "h-[22px] md:h-[26px] w-[170px] md:w-[201px] opacity-100",
                "group-hover:opacity-100",
                furnaceActive ? "transition-none duration-[0ms]" : "transition-all duration-[5000ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            )}
                style={{
                  filter: furnaceActive 
                    ? 'drop-shadow(0 0 40px rgba(255,69,0,0.8)) drop-shadow(0 0 15px rgba(255,0,0,1)) brightness(1.5)' 
                    : (isHUDActive ? `drop-shadow(0 0 10px rgba(209,109,106,${0.3 * hudIntensity}))` : 'none')
                }}
            >
                {/* HUD Data Pip Layer */}
                {isHUDActive && (
                  <div className="absolute inset-x-0 -top-1 flex justify-between px-2 pt-1 pointer-events-none" style={{ opacity: hudIntensity * 0.5 }}>
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="w-[1px] h-1 bg-[#D16D6A] opacity-40 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                )}

                {/* Core Logo */}
                <svg viewBox="0 0 232.99 30.04" className={cn("w-full h-full overflow-visible", furnaceActive && "animate-[furnace-flicker_0.1s_ease-in-out_infinite]")}>
                    <g fill={furnaceActive ? '#ff4500' : (isHUDActive ? '#D16D6A' : 'white')} className="transition-colors duration-[5000ms] ease-out">
                        {svgPaths.map((d, i) => <path key={`core-${i}`} d={d} />)}
                    </g>
                </svg>
            </div>
            
            {/* R Singularity Icon */}
            <div className={`relative flex items-center justify-center transition-all duration-500 -translate-y-[10px] -translate-x-[5px]
                ${scrolled ? 'scale-[0.38]' : 'scale-[0.52]'}
                ${isHUDActive ? 'rotate-[45deg]' : 'rotate-0'}`}
            >
                <div
                    className="absolute inset-0 rounded-full opacity-80 transition-all duration-500"
                    style={{
                        width: '100%', height: '100%', left: '0%', top: '0%',
                        borderWidth: isHUDActive ? '1px' : '3px',
                        borderStyle: 'solid',
                        borderColor: isHUDActive ? '#D16D6A' : primaryColor,
                        animation: 'singularity-spin 8s linear infinite',
                        boxShadow: isHUDActive ? '0 0 15px rgba(209,109,106,0.5)' : 'none'
                    }}
                />
                <svg width="24" height="24" viewBox="0 0 20 20" className="relative z-10">
                    <text x="10" y="15" fontSize="14" fontWeight="400" textAnchor="middle" fontFamily="sans-serif" fill="currentColor"
                        className={`${isHUDActive ? 'text-[#D16D6A]' : 'text-white'} transition-colors duration-300`}>R</text>
                </svg>
                <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[4px] h-[4px] rounded-full bg-[#D16D6A] blur-[2px] ${isHUDActive ? 'opacity-100' : 'opacity-0'}`} />
            </div>
        </div>
    );
});
QuantumLogo.displayName = 'QuantumLogo';

// --- MENU LINK COMPONENT ---
const MenuLink = memo(({ label, href, index, onClick, isHovered, onHoverChange }: {
    label: string;
    href: string;
    index: number;
    onClick: (e: React.MouseEvent) => void;
    isHovered: boolean;
    onHoverChange: (hovered: boolean) => void;
}) => {
    return (
        <Link
            to={href}
            onClick={onClick}
            onMouseEnter={() => onHoverChange(true)}
            onMouseLeave={() => onHoverChange(false)}
            className={cn(
                "group flex flex-col justify-between p-8 border-b border-r border-white/5 transition-all duration-300 min-h-[160px] md:min-h-[180px]",
                isHovered ? "bg-white text-[#050505]" : "hover:bg-white/5"
            )}
        >
            <div className={cn(
                "font-mono text-[10px] tracking-[0.3em] transition-colors",
                isHovered ? "text-[#D16D6A]" : "text-white/40 group-hover:text-[#D16D6A]"
            )}>
                [{String(index + 1).padStart(2, '0')}]
            </div>
            <div className="font-black uppercase tracking-tight text-3xl md:text-4xl leading-none">
                {label}
            </div>
        </Link>
    );
});
MenuLink.displayName = 'MenuLink';


// --- MAIN COMPONENT ---
export const Navigation: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [voidProgress, setVoidProgress] = useState(0);
    const [hoveredMenuIndex, setHoveredMenuIndex] = useState<number | null>(null);
    const location = useLocation();
    const { setIsCartOpen, cartCount } = useCart();

    // Listen to the global void progress (HUD state)
    useEffect(() => {
        const interval = setInterval(() => {
            const progress = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--void-progress') || '0');
            if (progress !== voidProgress) setVoidProgress(progress);
        }, 32); 
        return () => clearInterval(interval);
    }, [voidProgress]);

    const isHUDActive = voidProgress > 0.3;
    const hudIntensity = Math.max(0, Math.min((voidProgress - 0.3) * 3, 1));

    const onLightBackground = useMemo(() => {
        if (location.pathname === '/') return scrolled && voidProgress < 0.3;
        return LIGHT_BACKGROUND_ROUTES.includes(location.pathname) && voidProgress < 0.3;
    }, [location.pathname, voidProgress, scrolled]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    useEffect(() => { setIsOpen(false); }, [location.pathname]);

    const navItems = useMemo(() => [
        { label: "Marketing", href: "/marketing", icon: MarketingIcon },
        { label: "Branding", href: "/branding", icon: BrandingIcon },
        { label: "Gaming", href: "/gaming", icon: GamingIcon },
        { label: "Dev / AI", href: "/dev-ai", icon: DevAiIcon },
        { label: "Shop", href: "/shop", icon: ShopIcon },
        { label: "Network Traffic", href: "/transmissions", icon: TransmissionsIcon },
    ], []);

    const menuLinks = useMemo(() => [
        { label: "The Construct",        href: "/about",         image: "https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=1600&q=80&auto=format" },
        { label: "Selected Works",        href: "/#work-section",  image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1600&q=80&auto=format" },
        { label: "Digital Architecture",  href: "/dev-ai",        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80&auto=format" },
        { label: "Brand Ignition",        href: "/branding",      image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=1600&q=80&auto=format" },
        { label: "Market Acceleration",   href: "/marketing",     image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80&auto=format" },
        { label: "Gaming Experiences",    href: "/gaming",        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80&auto=format" },
        { label: "The Armory",            href: "/shop",          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&q=80&auto=format" },
        { label: "Network Traffic",         href: "/transmissions", image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1600&q=80&auto=format" },
        { label: "Initiate Protocol",     href: "/contact",       image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1600&q=80&auto=format" },
    ], []);

    const socialLinks = useMemo(() => [
        { name: "Instagram", url: "#instagram" },
        { name: "Twitter/X", url: "#twitter" },
        { name: "LinkedIn", url: "#linkedin" }
    ], []);

    const toggleMenu = useCallback(() => setIsOpen(v => !v), []);
    const closeMenu = useCallback(() => setIsOpen(false), []);

    const handleMenuLinkClick = useCallback((e: React.MouseEvent, href: string) => {
        const isHash = href.includes('#');

        if (isHash) {
            const [path, hash] = href.split('#');
            // If we are already on the target path, handle the scroll manually to be safe
            if (location.pathname === path || (path === '/' && location.pathname === '')) {
                e.preventDefault();
                setIsOpen(false);
                const element = document.getElementById(hash);
                if (element) {
                    setTimeout(() => {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                }
            } else {
                // Otherwise let the router take us there, and ScrollToTop will handle the hash on mount
                setIsOpen(false);
            }
        } else {
            setIsOpen(false);
        }
    }, [location.pathname]);

    return (
        <>
            <motion.header
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
                className={cn(
                    "fixed top-0 left-0 w-full z-50 transition-all duration-700 h-16 pointer-events-none mix-blend-difference text-white"
                )}
            >
                <div className="max-w-[1920px] mx-auto h-full flex items-stretch">
                    {/* Logo Section */}
                    <div className="flex items-center px-6 md:px-12 h-full pointer-events-auto">
                        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="relative block group">
                            <QuantumLogo 
                                scrolled={scrolled}
                                onLightBackground={false}
                                isHUDActive={isHUDActive} 
                                hudIntensity={hudIntensity}
                            />
                        </Link>
                    </div>

                    {/* Nav Links */}
                    <nav className="hidden lg:flex flex-1 overflow-hidden justify-center relative z-10" aria-label="Main navigation">
                        {navItems.map((item, i) => (
                            <TopNavLink 
                                key={item.label}
                                {...item} 
                                isActive={location.pathname === item.href} 
                                onLightBackground={onLightBackground}
                                isHUDActive={isHUDActive}
                                hudIntensity={hudIntensity}
                                cartCount={item.label === 'Shop' ? cartCount : 0}
                                onCartClick={item.label === 'Shop' ? (e) => { e.preventDefault(); setIsCartOpen(true); } : undefined}
                            />
                        ))}
                    </nav>

                    {/* Right UI Controls */}
                    <div className="flex items-stretch ml-auto">
                        {/* Advanced Weaponized Initiate CTA */}
                        <Link 
                            to="/contact" 
                            className={cn(
                                "relative hidden md:flex items-center justify-center px-14 font-sans text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-500 overflow-hidden group pointer-events-auto border-l border-white/20",
                                "hover:bg-white hover:text-[#050505] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] text-white"
                            )}
                        >
                            {/* Crosshairs & Alignment Marks */}
                            <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-white/40 group-hover:opacity-0 transition-opacity" />
                            <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-white/40 group-hover:opacity-0 transition-opacity" />
                            
                            <span className="relative z-10 transition-transform duration-500 group-hover:scale-[1.03]">
                                Initiate
                            </span>
                        </Link>

                        {/* Hamburger Menu Toggle */}
                        <button
                            onClick={toggleMenu}
                            className={cn(
                                "relative w-16 md:w-20 border-l border-white/20 flex items-center justify-center group focus:outline-none transition-colors pointer-events-auto",
                                "hover:bg-white text-white hover:text-[#050505]"
                            )}
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                        >
                            <div className={`relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black ${onLightBackground ? 'border border-black/5' : 'border border-white/5'} transition-colors duration-500 overflow-hidden backdrop-blur-sm animate-[menu-breathe_3s_ease-in-out_infinite] group-hover:animate-none group-hover:bg-[#D16D6A]`}>
                                <div
                                    className="w-5 h-5 md:w-6 md:h-6 bg-white transition-all duration-500"
                                    style={{
                                        maskImage: `url(${PLogo})`,
                                        WebkitMaskImage: `url(${PLogo})`,
                                        maskSize: 'contain',
                                        WebkitMaskSize: 'contain',
                                        maskRepeat: 'no-repeat',
                                        WebkitMaskRepeat: 'no-repeat',
                                        maskPosition: 'center',
                                        WebkitMaskPosition: 'center'
                                    }}
                                />
                            </div>
                        </button>
                    </div>
                </div>

                <style>{`
                    @keyframes singularity-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                    @keyframes menu-breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); } }
                    @keyframes shimmer { 100% { transform: translateX(100%); } }
                    @keyframes scan-vertical { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
                    @keyframes scan-down { 0% { top: 0; } 100% { top: 100%; } }
                    @keyframes furnace-flicker { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.01); } 100% { opacity: 1; transform: scale(1); } }
                `}</style>
            </motion.header>

            {/* Terminal Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-[100] bg-[#050505] text-white flex flex-col overflow-hidden"
                    >
                        {/* Menu Top Bar */}
                        <div className="flex items-stretch h-16 border-b border-white/5 shrink-0">
                            <div className="flex items-center px-8 border-r border-white/5 flex-1 font-mono text-[10px] tracking-[0.4em] text-white/40 uppercase">
                                <span className={cn("inline-block w-2 h-2 rounded-full mr-4 bg-[#D16D6A] animate-pulse")} />
                                SYS.NAV.OVERRIDE // SECTOR_01
                            </div>
                            <button onClick={closeMenu} className="w-16 md:w-20 flex items-center justify-center border-l border-white/5 hover:bg-[#D16D6A] hover:text-[#050505] transition-all duration-300">
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Layout: Links Grid & Info Panel */}
                        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                            {/* Left: Scrollable Links Grid */}
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 border-r border-white/5 overflow-y-auto no-scrollbar content-start">
                                {menuLinks.map((item, idx) => (
                                    <MenuLink 
                                        key={item.label} 
                                        label={item.label} 
                                        href={item.href} 
                                        index={idx} 
                                        onClick={(e) => handleMenuLinkClick(e, item.href)} 
                                        isHovered={hoveredMenuIndex === idx}
                                        onHoverChange={(h) => setHoveredMenuIndex(h ? idx : null)}
                                    />
                                ))}
                            </div>

                            {/* Right: Dynamic Info Panel (Desktop) */}
                            <div className="hidden md:flex w-1/3 flex-col relative bg-white/5 shrink-0 overflow-hidden">
                                <AnimatePresence mode="wait">
                                    {hoveredMenuIndex !== null && (
                                        <motion.div 
                                            key={hoveredMenuIndex}
                                            initial={{ opacity: 0, scale: 1.05 }}
                                            animate={{ opacity: 0.4, scale: 1 }}
                                            exit={{ opacity: 0, scale: 1.1 }}
                                            transition={{ duration: 0.4 }}
                                            className="absolute inset-0"
                                        >
                                            <img src={menuLinks[hoveredMenuIndex].image} alt="" className="w-full h-full object-cover grayscale mix-blend-luminosity" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="absolute top-10 right-10 w-12 h-12 border-t border-r border-[#D16D6A]/40 pointer-events-none" />
                                <div className="absolute bottom-40 left-10 w-12 h-12 border-b border-l border-[#D16D6A]/40 pointer-events-none" />

                                <div className="mt-auto p-10 relative z-10 border-t border-white/5 bg-[#050505]/90 backdrop-blur-xl font-mono text-[10px] text-white/30 tracking-[0.2em] space-y-4">
                                    <div className="flex justify-between border-b border-white/5 pb-4">
                                        <span>TARGET_DIR:</span>
                                        <span className="text-white/80">{hoveredMenuIndex !== null ? menuLinks[hoveredMenuIndex].href : "AWAITING_INPUT"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>SYS_STATUS:</span>
                                        <span className={cn(hoveredMenuIndex !== null ? "text-[#D16D6A] animate-pulse" : "text-white/20")}>
                                            {hoveredMenuIndex !== null ? "ROUTING..." : "IDLE"}
                                        </span>
                                    </div>
                                    <div className="pt-6 border-t border-white/5 mt-6">
                                        <div className="text-[8px] mb-2 opacity-50">PROJECT_SPOTLIGHT // 2024</div>
                                        <div className="text-white/70 tracking-widest leading-relaxed">PROJECT TITAN: REARCHITECTING THE DIGITAL FRONTIER THROUGH INDUSTRIAL-GRADE IT STRATEGY.</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Menu Footer */}
                        <div className="flex items-stretch h-12 border-t border-white/5 font-mono text-[9px] text-white/20 uppercase tracking-[0.4em] shrink-0">
                            <div className="flex items-center px-8 border-r border-white/5">
                                ARSON PIXELS © {new Date().getFullYear()}
                            </div>
                            <div className="flex-1 flex items-center px-8 gap-10">
                                {socialLinks.map((social) => (
                                    <a key={social.name} href={social.url} className="hover:text-white transition-colors">{social.name}</a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;
