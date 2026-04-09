import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { XMarkIcon, ShoppingBagIcon, SignalIcon } from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useIgnition } from "./layout/IgnitionRuntime";

// --- ASSETS ---
import PLogo from './assets/p.webp';
import FullLogo from './assets/p.webp';

// --- Helpers ---
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(" ");

// --- HIGH-FIDELITY TECHNICAL ICONS (RECONSTRUCTED) ---
const MarketingIcon = memo(({ className, scrolled }: { className?: string; scrolled?: boolean }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
        <rect x="3" y="4" width="18" height="14" rx="2" vectorEffect="non-scaling-stroke" />
        <path d="M3 9h18" strokeOpacity="0.5" vectorEffect="non-scaling-stroke" />
        <path d="M7 14l3 3l3-3l4 4" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" 
            style={{ transform: !scrolled ? 'translateY(-3px)' : 'none', transition: 'transform 0.5s ease' }} 
        />
        <path d="M17 14v4h-4" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"
            style={{ transform: !scrolled ? 'translateY(-3px)' : 'none', transition: 'transform 0.5s ease' }} 
        />
    </svg>
));
MarketingIcon.displayName = 'MarketingIcon';

const BrandingIcon = memo(({ className, scrolled }: { className?: string; scrolled?: boolean }) => (
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

const GamingIcon = memo(({ className, scrolled }: { className?: string; scrolled?: boolean }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
        <path d="M10 3H14V9H20V13H14V19H10V13H4V9H10V13H4V9H10V13H4V9H10V3Z" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <circle cx="12" cy="11" r="1" className="opacity-40" fill="currentColor" stroke="none" />
    </svg>
));
GamingIcon.displayName = 'GamingIcon';

const DevAiIcon = memo(({ className, scrolled }: { className?: string; scrolled?: boolean }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
        <path d="M7 8l-4 4l4 4" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <path d="M17 8l4 4l-4 4" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <rect x="10" y="6" width="4" height="12" rx="1" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <path d="M10 10h4" strokeOpacity="0.5" />
        <path d="M10 14h4" strokeOpacity="0.5" />
    </svg>
));
DevAiIcon.displayName = 'DevAiIcon';

const ShopIcon = memo(({ className, scrolled }: { className?: string; scrolled?: boolean }) => (
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

// --- METADATA STREAM (SHUFFLING DATA NODES) ---
const MetadataStream = memo(({ active }: { active: boolean }) => {
    const [data, setData] = useState("0x000000");
    useEffect(() => {
        if (!active) return;
        const interval = setInterval(() => {
            const hex = Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0').toUpperCase();
            setData(`0x${hex}`);
        }, 100);
        return () => clearInterval(interval);
    }, [active]);
    return <span className="font-mono text-[8px] tracking-[0.2em] opacity-40">{data}</span>;
});
MetadataStream.displayName = 'MetadataStream';

// --- SECTOR SURVEILLANCE OVERLAY ---
const SectorSurveillance = memo(({ active }: { active: boolean }) => {
    return (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
            <motion.div 
                animate={active ? { top: ["0%", "100%"] } : { top: ["0%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-[1px] bg-[#FF3E00]/60 shadow-[0_0_15px_#FF3E00]"
            />
            <div className="absolute top-4 left-4 flex gap-1 animate-pulse">
                <div className="w-1 h-3 bg-[#FF3E00]/40" />
                <div className="w-4 h-[1px] bg-[#FF3E00]/40 self-center" />
            </div>
            <div className="absolute bottom-4 right-4 flex flex-col items-end opacity-20">
                <span className="font-mono text-[8px]">FEED_ACTIVE // PORT_8080</span>
                <div className="w-12 h-[1px] bg-[#FF3E00]" />
            </div>
        </div>
    );
});
SectorSurveillance.displayName = 'SectorSurveillance';

// --- SYSTEM HUD (CENTRAL DATA CORE) ---
const SystemHUD = memo(({ active }: { active: boolean }) => {
    const [status, setStatus] = useState("SYNC_STATUS: ACTIVE");
    useEffect(() => {
        const statuses = ["SYNC_STATUS: ACTIVE", "PROTOCOL: DIVISION_1", "ENCRYPTION: HIGH", "LATENCY: 12ms", "BUFFER: STABLE"];
        const interval = setInterval(() => {
            setStatus(statuses[Math.floor(Math.random() * statuses.length)]);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="hidden lg:flex flex-col items-center justify-center -translate-y-1">
            <div className="font-mono text-[8px] tracking-[0.6em] text-[#FF3E00] uppercase mb-1 drop-shadow-[0_0_8px_rgba(255,62,0,0.4)]">
                {status}
            </div>
            <div className="flex items-center gap-1">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-1 h-[2px] bg-white opacity-20" />
                ))}
            </div>
        </div>
    );
});
SystemHUD.displayName = 'SystemHUD';

// --- HIGH-FIDELITY ORGANIC INTERNAL FIRE (BONE-DEEP) ---
const ArsonInternalBurn = memo(({ active, dissipating }: { active: boolean; dissipating: boolean }) => (
    <AnimatePresence>
        {(active || dissipating) && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={dissipating ? { 
                    opacity: 0, scale: 1.2, filter: "blur(20px)",
                    transition: { duration: 1.2, ease: "easeOut" }
                } : { 
                    opacity: 1, scale: 1,
                    transition: { duration: 0.8 }
                }}
                exit={{ opacity: 0 }}
                className="absolute inset-[-20px] z-1 pointer-events-none"
            >
                <div 
                    className="absolute inset-0"
                    style={{ 
                        background: 'linear-gradient(45deg, #FF3E00, #FFFFFF, #FF3E00)',
                        backgroundSize: '200% 200%',
                        animation: 'arson-burn 3s linear infinite',
                        filter: 'url(#arson-fire-filter)',
                        mixBlendMode: 'screen'
                    }} 
                />
            </motion.div>
        )}
    </AnimatePresence>
));

const HeatRipple = memo(({ active }: { active: boolean }) => (
  <AnimatePresence>
    {active && (
      <motion.div
        initial={{ right: '-12vw', opacity: 0 }}
        animate={{
          right: '108vw',
          opacity: [0, 0.35, 0.9, 0.55, 0],
          scaleX: [0.8, 1, 1.08, 1.15],
        }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 1.8,
          ease: [0.22, 0.8, 0.22, 1],
        }}
        className="fixed top-0 h-20 z-[9997] pointer-events-none"
      >
        <div className="relative h-full w-[24vw] min-w-[240px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-l from-[#FF3E00]/0 via-[#FF3E00]/55 to-cyan-300/0 blur-2xl" />
          <div className="absolute inset-y-0 left-1/2 w-[2px] bg-cyan-300/70 blur-[1px]" />
          <div className="absolute inset-0 backdrop-blur-[10px] border-l border-cyan-300/30 border-r border-[#FF3E00]/40 skew-x-[-24deg]" />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
));

const ScanlineEffect = memo(() => (
    <div className="absolute inset-0 pointer-events-none z-[99] opacity-[0.03]"
        style={{
            background: `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))`,
            backgroundSize: `100% 2px, 3px 100%`
        }}
    />
));
ScanlineEffect.displayName = 'ScanlineEffect';


// --- NAV LINK COMPONENT (SECTOR HORIZON) ---
const TopNavLink = memo(({ 
    label, href, icon: Icon, isActive, isHUDActive, hudIntensity,
    scrolled, isHome, index,
    cartCount = 0, onCartClick,
    isArsonInfected = false,
    isAshy = false,
    arsonStatus = 'idle',
    offsetX = 0,
    offsetY = 0
}: {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties; scrolled?: boolean }>;
    isActive: boolean;
    isHUDActive: boolean;
    hudIntensity: number;
    scrolled: boolean;
    isHome: boolean;
    index: number;
    cartCount?: number;
    onCartClick?: (e: React.MouseEvent) => void;
    isArsonInfected?: boolean;
    isAshy?: boolean;
    arsonStatus?: string;
    offsetX?: number;
    offsetY?: number;
}) => {
    const [hovered, setHovered] = useState(false);
    const location = useLocation();

    // ── CALC GHOST SCALE ────────────────────────────────────────────────────
    // index 4 (Shop)    -> 1.8
    // index 3 (Gaming)  -> 1.55
    // index 2 (Market)  -> 1.3
    // index 1 (Dev/AI)  -> 1.05
    // index 0 (Brand)   -> 0.8
    const ghostScale = 0.8 + (index * 0.25); 

    const handleMouseEnter = useCallback(() => setHovered(true), []);
    const handleMouseLeave = useCallback(() => setHovered(false), []);

    const isShop = label.toLowerCase() === 'shop';
    const hasItems = isShop && cartCount > 0;
    const isHeroState = location.pathname === '/' && !scrolled;

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
                "group relative flex flex-col items-center justify-center px-8 md:px-12 h-full transition-all duration-500 pointer-events-auto",
                isArsonInfected ? "text-[#FF3E00] drop-shadow-[0_0_15px_rgba(255,62,0,0.8)]" : "text-white",
                isHeroState && "gap-1"
            )}
            style={{ transform: `translate(${offsetX}px, ${offsetY}px)` }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            aria-label={label}
        >
            <AnimatePresence>
                {isArsonInfected && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ 
                            opacity: 0, 
                            scale: [0.6, ghostScale, ghostScale * 1.1, ghostScale * 1.2],
                            filter: ["blur(4px)", "blur(0px)", "blur(8px)", "blur(20px)"]
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-[-40px] z-[5] pointer-events-none flex items-center justify-center"
                    >
                         <img 
                            src={PLogo} 
                            alt="" 
                            className="w-full h-full object-contain mix-blend-screen brightness-0 invert" 
                            style={{ opacity: 0.15 }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {isHeroState && (
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={isArsonInfected ? { 
                        opacity: 1, y: 0, scale: [1, 1.3, 1],
                        rotate: [0, -5, 5, 0],
                        filter: ["brightness(1)", "brightness(2)", "brightness(1)"],
                        color: "#FF3E00"
                    } : { opacity: 1, y: 0 }}
                    className="flex flex-col items-center translate-y-[8px]"
                >
                    <Icon className={cn(
                        "transition-all duration-700",
                        isArsonInfected && 'opacity-100 drop-shadow-[0_0_18px_rgba(255,62,0,0.9)]',
                        (label === 'Shop' && isHeroState) ? "w-[16px] h-[16px]" : "w-[24px] h-[24px]", 
                        "text-white"
                    )} 
                    scrolled={scrolled}
                    />
                </motion.div>
            )}

            <motion.div 
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={cn(
                    "relative flex items-center gap-2 transition-all duration-[175ms] px-2",
                    isHeroState && "mt-0"
                )}>
                {!isHeroState && (
                    <Icon className={cn(
                        "transition-all duration-[175ms]",
                        "w-[12px] h-[12px]",
                        isActive ? "text-[#FF3E00] drop-shadow-[0_0_8px_rgba(255,62,0,0.6)]" : "text-white"
                    )} 
                    scrolled={scrolled}
                />
                )}
                <span className={cn(
                    "font-mono font-bold uppercase tracking-[0.1em] whitespace-nowrap transition-all duration-[175ms] relative",
                    isActive ? "text-[#FF3E00] drop-shadow-[0_0_5px_rgba(255,62,0,0.4)]" : 
                    (label === 'Shop' && isHeroState) ? "text-[10px] text-white" : 
                    (label === 'Branding' && isHeroState) ? "text-[10px] text-white" :
                    (scrolled ? "text-[12px] text-white" : "text-[10px] text-white/90")
                )}>
                    {label}
                    {isArsonInfected && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            className="absolute inset-0 bg-[#FF3E00] blur-[2px] mix-blend-screen"
                            style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
                        >
                            {label}
                        </motion.span>
                    )}
                </span>
            </motion.div>

            {hasItems && (
                <span className="absolute top-1/2 -translate-y-6 right-2 bg-[#FF3E00] text-[#000000] px-1 py-0.5 text-[7px] font-black rounded-sm shadow-[0_0_10px_#FF3E00]">
                    {cartCount}
                </span>
            )}
        </Link>
    );
});
TopNavLink.displayName = 'TopNavLink';


// --- ORIGINAL LOGO (RESTRUCTURED FOR NATIVE DOM TRAVERSAL) ---
const OriginalLogo = ({
  scrolled,
  arsonStatus = 'idle',
}: {
  scrolled: boolean;
  isHUDActive: boolean;
  hudIntensity: number;
  arsonStatus?: string;
}) => {
  const mountedIgnition =
    arsonStatus === 'ghost_start' ||
    arsonStatus === 'burst_start';

  const mountedRight = arsonStatus === 'traveling_left';

  const mountedLeft =
    arsonStatus === 'teleporting_left' ||
    arsonStatus === 'complete';

  const ignitionNode = (
    <motion.div
      key="arson-ignition"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-[21.5px] left-[45px] md:left-[70px] z-[9999] pointer-events-none"
    >
      <div className="relative h-[42px] w-[42px] md:h-[52px] md:w-[52px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.08, 0.45, 1, 0.7],
            scale: [0.76, 0.92, 1.08, 1],
            rotate: [-1.5, 0.5, -0.25, 0],
            filter: [
              'drop-shadow(0 0 6px rgba(255,62,0,0.4))',
              'drop-shadow(0 0 12px rgba(255,62,0,0.7))',
              'drop-shadow(0 0 24px rgba(255,62,0,1))',
              'drop-shadow(0 0 12px rgba(255,62,0,0.65))',
            ],
          }}
          transition={{
            duration: 1.7,
            ease: [0.2, 0.9, 0.25, 1],
          }}
          className="absolute inset-0"
          style={{
            WebkitMaskImage: `url(${FullLogo})`,
            maskImage: `url(${FullLogo})`,
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            WebkitMaskSize: 'contain',
            background:
              'linear-gradient(180deg,#FF3E00 0%,#ffffff 45%,#FF3E00 100%)',
            filter:
              'drop-shadow(0 0 18px rgba(255,62,0,0.9)) blur(0.5px)',
          }}
        >
          <div className="absolute inset-0 animate-[arson-burn_0.9s_linear_infinite] bg-[length:100%_240%]" />
        </motion.div>
      </div>
    </motion.div>
  );

  const rightNode = (
    <motion.div
      key="arson-right"
      initial={{ opacity: 0 }}
      animate={{ opacity: mountedRight ? 1 : 0 }}
      exit={{ opacity: 0 }}
      className="fixed top-[21.5px] right-6 md:right-12 z-[9999] pointer-events-none"
    >
      <div className="relative h-[48px] w-[48px] md:h-[64px] md:w-[64px]">
        <AnimatePresence>
          {arsonStatus === 'traveling_left' && (
            <motion.img
              key="right-logo-rammer"
              src={FullLogo}
              alt=""
              initial={{ opacity: 0, scale: 0.4, filter: 'blur(8px)' }}
              animate={{
                opacity: 0,
                scale: [0.4, 1.4, 1.2, 0.8],
                x: [0, -12, -30],
                filter: [
                  'brightness(2) blur(8px)',
                  'brightness(1.5) blur(0px)',
                  'brightness(1) blur(0px)',
                  'brightness(2) blur(8px)',
                ],
              }}
              transition={{ duration: 1.1, times: [0, 0.25, 0.6, 1] }}
              className="absolute inset-0 h-full w-full object-contain brightness-0 invert"
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );

  const leftNode = (
    <motion.div
      key="arson-left"
      initial={false}
      animate={{ opacity: 1 }}
      className={cn(
        'fixed top-[21.5px] left-[45px] md:left-[70px] z-[9999] pointer-events-auto',
        arsonStatus === 'complete' && 'transition-none'
      )}
    >
      <motion.div
        initial={
          arsonStatus === 'teleporting_left'
            ? {
                opacity: 0,
                x: 140,
                scale: 0.8,
                filter: 'blur(15px) brightness(2)',
              }
            : false
        }
        animate={{
          opacity: [0, 1, 0.8, 1],
          x: [160, -8, 0], // 'Lazy Recoil' (8px overshoot)
          scale: [0.8, 1.15, 1],
          filter: ['blur(15px) brightness(2)', 'blur(0px) brightness(1.5)', 'blur(0px) brightness(1)'],
        }}
        transition={{
          x: { type: "spring", stiffness: 45, damping: 12, mass: 2.2, delay: 0.1 },
          default: { duration: 6.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }
        }}
        className="relative"
      >
        <AnimatePresence>
            {arsonStatus === 'complete' && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                        opacity: [0, 0.25, 0], 
                        scale: [1, 2.5, 3],
                        filter: ["blur(0px)", "blur(10px)", "blur(30px)"]
                    }}
                    transition={{ duration: 3.5, delay: 0.2 }}
                    className="absolute inset-0 pointer-events-none z-[-1]"
                >
                    <img src={PLogo} className="w-full h-full object-contain brightness-0 invert opacity-40" />
                </motion.div>
            )}
        </AnimatePresence>
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="relative block group"
        >
          {/* Base White Logo */}
          <img
            src={FullLogo}
            alt="Arson Pixelz"
            className={cn(
              'relative z-10 object-contain brightness-0 invert transition-all duration-300',
              scrolled ? 'h-[20px] md:h-[24px]' : 'h-[22px] md:h-[32px]'
            )}
          />

          {/* Cinematic 'Orange Furnace' Emergence (Masked strictly to logo) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ 
                opacity: [0, 1, 1, 0.6, 0],
                filter: [
                    'drop-shadow(0 0 40px rgba(255,62,0,0.9)) brightness(2)',
                    'drop-shadow(0 0 30px rgba(255,62,0,0.8)) brightness(1.8)',
                    'drop-shadow(0 0 20px rgba(255,62,0,0.6)) brightness(1.5)',
                    'drop-shadow(0 0 10px rgba(255,62,0,0.4)) brightness(1.2)',
                    'drop-shadow(0 0 0px rgba(255,62,0,0)) brightness(1)'
                ],
                scale: [1, 1.02, 0.98, 1.01, 1], // Subtle furnace flicker (Pulse)
            }}
            transition={{ 
                opacity: { duration: 6.8, times: [0, 0.1, 0.4, 0.8, 1], ease: "linear" },
                filter: { duration: 6.8, times: [0, 0.1, 0.4, 0.8, 1], ease: "linear" },
                scale: { duration: 0.15, repeat: 30, ease: "easeInOut" }, // Rapid micro-flicker during emergence
                delay: 0.1
            }}
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
                WebkitMaskImage: `url(${FullLogo})`,
                maskImage: `url(${FullLogo})`,
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                WebkitMaskSize: 'contain',
                background: '#FF3E00', // Solid orange foundation for a 'burning' look
            }}
          />
        </Link>
      </motion.div>
    </motion.div>
  );

  if (typeof document === 'undefined') return null;

  return createPortal(
    <>
      <AnimatePresence mode="wait">
        {mountedIgnition && ignitionNode}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {mountedRight && rightNode}
      </AnimatePresence>
      {(mountedLeft || arsonStatus === 'complete') && leftNode}
    </>,
    document.body
  );
};
OriginalLogo.displayName = 'OriginalLogo';


// --- MENU LINK COMPONENT (NODE PROTOCOL) ---
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
                "group relative flex flex-col items-center justify-center p-12 text-center border-b border-white/5 transition-all duration-500 overflow-hidden",
                isHovered ? "bg-white/5" : "hover:bg-white/[0.02]"
            )}
            style={{ perspective: '1000px' }}
        >
            <motion.div 
                animate={{ 
                    rotateX: isHovered ? -15 : 0, 
                    rotateY: isHovered ? 15 : 0,
                    scale: isHovered ? 1.05 : 1,
                    z: isHovered ? 50 : 0
                }}
                className="relative z-10 flex flex-col items-center"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-[1px] bg-[#FF3E00]/40" />
                </div>
                <div 
                    className={cn(
                        "uppercase tracking-tighter text-4xl md:text-5xl lg:text-7xl transition-all duration-500 flex flex-col leading-[0.85]",
                        isHovered ? "text-[#FF3E00] drop-shadow-[0_0_20px_rgba(255,62,0,0.6)]" : "text-white"
                    )}
                    style={{ fontFamily: 'Anton, sans-serif' }}
                >
                    {label.split(" ").map((word, i) => (
                        <span key={i} className="block">{word}</span>
                    ))}
                </div>
                <div className="flex items-center gap-3 mt-6">
                    <div className="w-8 h-[1px] bg-white/10" />
                </div>
            </motion.div>
            {isHovered && <div className="absolute inset-x-0 h-full w-full pointer-events-none bg-gradient-to-b from-transparent via-[#FF3E00]/5 to-transparent top-0 animate-[scan-down_1.5s_linear_infinite]" />}
        </Link>
    );
});
MenuLink.displayName = 'MenuLink';


// --- MAIN COMPONENT ---
export const Navigation: React.FC<{ isOpen: boolean; setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }> = ({ isOpen, setIsOpen }) => {
    const [scrolled, setScrolled] = React.useState(false);
    const [voidProgress, setVoidProgress] = useState(0);
    const [hoveredMenuIndex, setHoveredMenuIndex] = useState<number | null>(null);
    const [arsonStatus, setArsonStatus] = useState<
        | 'idle'
        | 'ghost_start'
        | 'burst_start'
        | 'traveling_left'
        | 'infecting_nodes'
        | 'teleporting_left'
        | 'complete'
    >('idle');
    const [infectedIndex, setInfectedIndex] = useState<number>(-1);
    const location = useLocation();
    const { setIsCartOpen, cartCount } = useCart();
    const { lenis } = useIgnition();

    const navItems = useMemo(() => [
        { label: "Branding", href: "/branding", icon: BrandingIcon },
        { label: "Dev / AI", href: "/dev-ai", icon: DevAiIcon },
        { label: "Marketing", href: "/marketing", icon: MarketingIcon },
        { label: "Gaming", href: "/gaming", icon: GamingIcon },
        { label: "Shop", href: "/shop", icon: ShopIcon },
    ], []);

    const menuLinks = useMemo(() => [
        { label: "Brand Ignition",        href: "/branding",      image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=1600&q=80&auto=format" },
        { label: "Digital Architecture",  href: "/dev-ai",        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80&auto=format" },
        { label: "Market Acceleration",   href: "/marketing",     image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80&auto=format" },
        { label: "Gaming Experiences",    href: "/gaming",        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80&auto=format" },
        { label: "Studio Core",        href: "/about",         image: "https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=1600&q=80&auto=format" },
        { label: "Selected Works",        href: "/#work-section",  image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1600&q=80&auto=format" },
        { label: "Arson Store",            href: "/shop",          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&q=80&auto=format" },
        { label: "Initiate Protocol",     href: "/contact",       image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1600&q=80&auto=format" },
    ], []);

    const socialLinks = useMemo(() => [
        { name: "Instagram", url: "#instagram" },
        { name: "Twitter/X", url: "#twitter" },
        { name: "LinkedIn", url: "#linkedin" }
    ], []);

    useEffect(() => {
        if (!lenis) return;
        if (isOpen) {
            lenis.stop();
        } else {
            lenis.start();
        }
    }, [isOpen, lenis]);

    useEffect(() => {
        const interval = setInterval(() => {
            const progress = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--void-progress') || '0');
            if (progress !== voidProgress) setVoidProgress(progress);
        }, 32); 
        return () => clearInterval(interval);
    }, [voidProgress]);

    const isHUDActive = voidProgress > 0.3;
    const hudIntensity = Math.max(0, Math.min((voidProgress - 0.3) * 3, 1));

    useEffect(() => {
        let cancelled = false;
        const timers: number[] = [];

        const queue = (fn: () => void, delay: number) => {
            const id = window.setTimeout(() => {
                if (!cancelled) fn();
            }, delay);
            timers.push(id);
        };

        queue(() => {
            setArsonStatus('ghost_start');
            queue(() => {
                setArsonStatus('burst_start');
                queue(() => {
                    setArsonStatus('traveling_left');
                    queue(() => {
                        setArsonStatus('infecting_nodes');
                        let current = navItems.length; // Start with the Hamburger Menu (right)
                        const infectionInterval = window.setInterval(() => {
                            setInfectedIndex(current);
                            current -= 1;
                            if (current < -1) { // End once past all nav nodes
                                window.clearInterval(infectionInterval);
                                setArsonStatus('teleporting_left');
                                queue(() => {
                                    setArsonStatus('complete');
                                }, 19200); // 19.2s Ultimate Drift (2x Slower)
                            }
                        }, 800); // Decelerated Cinematic Ramming (800ms)
                        timers.push(infectionInterval);
                    }, 50); // Instant ramming start
                }, 100); // Instant travel
            }, 100); // Instant burst
        }, 800); // Accelerated start: 800ms delay (synchronous with Hero 'loaded' state)

        return () => {
            cancelled = true;
            timers.forEach(clearTimeout);
        };
    }, [navItems.length]);

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

    const toggleMenu = useCallback(() => setIsOpen(v => !v), []);
    const closeMenu = useCallback(() => setIsOpen(false), []);

    const handleMenuLinkClick = useCallback((e: React.MouseEvent, href: string) => {
        const isHash = href.includes('#');
        if (isHash) {
            const [path, hash] = href.split('#');
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
                setIsOpen(false);
            }
        } else {
            setIsOpen(false);
        }
    }, [location.pathname]);
    
    const isHeroState = location.pathname === '/' && !scrolled;

    return (
        <>
            <motion.header
                initial={{ y: -150, opacity: 0, filter: 'blur(20px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ 
                    duration: 1.6, 
                    ease: [0.16, 1, 0.3, 1], 
                    delay: 1.2 
                }}
                className={cn(
                    "fixed top-0 left-0 w-full z-50 transition-all duration-700 h-16 pointer-events-none text-white",
                    !isHeroState && "mix-blend-difference"
                )}
            >
                {/* The Header Root Container */}
                <div className="max-w-[1920px] mx-auto h-full flex items-stretch px-6 md:px-12 relative">
                    
                    {/* NEW ARCHITECTURE: Absolute DOM Logo Node (Bypasses Frame Trap & Double-P Issue) */}
                    {!isOpen && (
                        location.pathname !== '/shop' ? (
                            <OriginalLogo 
                                scrolled={scrolled}
                                isHUDActive={isHUDActive} 
                                hudIntensity={hudIntensity}
                                arsonStatus={arsonStatus}
                            />
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="fixed top-[21.5px] left-[45px] md:left-[70px] z-[9999] pointer-events-auto"
                            >
                                <Link
                                    to="/"
                                    className="font-black text-base md:text-lg uppercase tracking-tighter leading-none hover:opacity-80 transition-opacity"
                                    style={{ fontFamily: 'Syne, sans-serif', color: '#FF3E00' }}
                                >
                                    ARSON<span className="text-white">_STORE</span>
                                </Link>
                            </motion.div>
                        )
                    )}

                    {/* Logo Slot Placeholder: Standardized at 110px to achieve perfect margin symmetry with the right-side hamburger pillar */}
                    <div className="hidden md:flex flex-col items-center justify-center shrink-0 w-[110px] pointer-events-none" aria-hidden="true" />

                    <motion.div 
                        animate={{ y: isHeroState ? 7 : 0 }}
                        className="hidden md:flex items-center justify-center flex-1 transition-all duration-700"
                    >
                        {location.pathname !== '/shop' && (
                            <nav className="flex-1 flex overflow-visible relative z-10 transition-all duration-700 items-center justify-center gap-4 md:gap-8" aria-label="Main navigation">
                                {navItems.map((item, i) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, y: 120, x: -50, scale: 0.2, rotateX: 90, filter: 'blur(30px) brightness(2)' }}
                                        animate={{ 
                                            opacity: 1,
                                            y: isHeroState ? 0 : 0, 
                                            x: "0vw",
                                            rotateX: 0,
                                            scale: 1,
                                            filter: 'blur(0px) brightness(1)'
                                        }}
                                        transition={{ 
                                            duration: 3.6, // Doubled for 2x system-wide deceleration
                                            delay: 0.8 + (i * 0.1), // Synchronized with Hero entrance
                                            ease: [0.16, 1, 0.3, 1] 
                                        }}
                                    >
                                        <TopNavLink 
                                            key={item.label}
                                            {...item}
                                            isActive={location.pathname === item.href}
                                            isHUDActive={isHUDActive}
                                            hudIntensity={hudIntensity}
                                            scrolled={scrolled}
                                            isHome={location.pathname === '/'}
                                            index={i}
                                            cartCount={cartCount}
                                            onCartClick={() => setIsCartOpen(true)}
                                            isArsonInfected={infectedIndex === i}
                                            isAshy={ arsonStatus === 'infecting_nodes' && infectedIndex < i }
                                            arsonStatus={arsonStatus}
                                            offsetX={0}
                                            offsetY={(item.label === 'Branding' && isHeroState) ? 8 : (item.label === 'Gaming' ? 4 : (item.label === 'Marketing' ? 2 : 0))}
                                        />
                                    </motion.div>
                                ))}
                            </nav>
                        )}
                    </motion.div>

                    <div className="flex items-stretch ml-auto justify-end w-[110px]">
                        <button
                            onClick={toggleMenu}
                            className={cn(
                                "relative w-16 md:w-20 flex items-center justify-center group focus:outline-none transition-all duration-[175ms] pointer-events-auto",
                                infectedIndex === navItems.length && "text-[#FF3E00] drop-shadow-[0_0_15px_rgba(255,62,0,0.8)]"
                            )}
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                        >
                        <div className="flex flex-col items-center justify-center gap-[5px] w-6 h-6 relative">
                            {/* Hamburger Ghost Strike (Biggest) */}
                            <AnimatePresence>
                                {infectedIndex === navItems.length && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ 
                                            opacity: 0, 
                                            scale: [0.8, 2.2, 2.4, 2.6],
                                            filter: ["blur(4px)", "blur(0px)", "blur(12px)", "blur(24px)"]
                                        }}
                                        transition={{ duration: 0.8 }}
                                        className="absolute inset-[-40px] pointer-events-none flex items-center justify-center z-[5]"
                                    >
                                        <img src={PLogo} className="w-full h-full object-contain mix-blend-screen brightness-0 invert opacity-[0.15]" />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <span className={cn(
                                    "block h-[1.5px] bg-white transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center",
                                    isOpen ? "w-5 rotate-45 translate-y-[6.5px]" : "w-5",
                                    isOpen ? "bg-white" : (infectedIndex === navItems.length ? "bg-[#FF3E00]" : "bg-white")
                                )} />
                                <span className={cn(
                                    "block h-[1.5px] bg-white transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                                    isOpen ? "w-0 opacity-0" : "w-4 opacity-100",
                                    isOpen ? "bg-white" : (infectedIndex === navItems.length ? "bg-[#FF3E00]" : "bg-white")
                                )} />
                                <span className={cn(
                                    "block h-[1.5px] bg-white transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center",
                                    isOpen ? "w-5 -rotate-45 -translate-y-[6.5px]" : "w-3",
                                    isOpen ? "bg-white" : (infectedIndex === navItems.length ? "bg-[#FF3E00]" : "bg-white")
                                )} />
                            </div>
                        </button>
                    </div>

                    {isHeroState && (
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10 pointer-events-none" />
                    )}
                </div>

                <style>{`
                    @keyframes arson-burn { 0% { background-position: 0% 0%; } 100% { background-position: 100% 100%; } }
                    @keyframes scan-down { 0% { top: 0; } 100% { top: 100%; } }
                    .no-scrollbar::-webkit-scrollbar { display: none; }
                    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                    .command-scrollbar::-webkit-scrollbar { width: 4px; }
                    .command-scrollbar::-webkit-scrollbar-thumb { background: white; border-radius: 0; }
                    .command-scrollbar::-webkit-scrollbar-track { background: transparent; }
                `}</style>
                <svg className="absolute w-0 h-0 invisible" aria-hidden="true">
                    <defs>
                        <filter id="arson-fire-filter">
                            <feTurbulence type="fractalNoise" baseFrequency="0.015 0.08" numOctaves="3" seed="1">
                                <animate attributeName="baseFrequency" dur="5s" values="0.015 0.08; 0.015 0.15; 0.015 0.08" repeatCount="indefinite" />
                            </feTurbulence>
                            <feDisplacementMap in="SourceGraphic" scale="25" />
                        </filter>
                    </defs>
                </svg>
            </motion.header>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-[100] bg-black text-white flex flex-col overflow-hidden"
                    >

                        <div className="relative z-30 flex items-stretch h-20 border-b border-white/5 bg-[#000000]/40 backdrop-blur-sm shrink-0">
                            {/* Strengthened P Logo Branding */}
                            <div className="flex items-center px-8 md:px-12 border-r border-white/5">
                                <Link to="/" onClick={closeMenu} className="flex items-center group">
                                    <img src={PLogo} alt="Arson Pixelz" className="h-8 md:h-10 w-auto object-contain brightness-0 invert group-hover:opacity-80 transition-opacity" />
                                </Link>
                            </div>
                            
                            <div className="flex-1 px-8 md:px-12" />
                            <button onClick={closeMenu} className="w-20 md:w-24 flex items-center justify-center border-l border-white/5 hover:bg-[#FF3E00] hover:text-white transition-all duration-500 group">
                                <XMarkIcon className="w-8 h-8 transition-transform duration-500 group-hover:rotate-90" />
                            </button>
                        </div>

                        <div className="flex-1 flex flex-col md:flex-row relative z-20 overflow-hidden min-h-0">
                            <div className="flex-1 border-r border-white/5 flex flex-col relative min-h-0">
                                <div className="py-8 md:py-12 border-b border-white/5 flex items-center justify-center shrink-0">
                                    <div className="font-mono text-[#FF3E00] text-[11px] md:text-[13px] tracking-[0.7em] uppercase animate-pulse">
                                        COMMAND CENTRE
                                    </div>
                                </div>
                                <div 
                                    className="flex-1 overflow-y-auto command-scrollbar py-6 md:py-10 pointer-events-auto touch-pan-y"
                                    style={{ WebkitOverflowScrolling: 'touch' }}
                                    data-lenis-prevent
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2">
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
                                </div>
                                
                                {/* Centralized Scroll Indicator */}
                                <div className="absolute left-1/2 bottom-8 -translate-x-1/2 flex flex-col items-center pointer-events-none z-30">
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="font-mono text-[#FF3E00] text-[10px] tracking-[0.5em] uppercase animate-pulse mb-[-2px]">
                                            SCROLL
                                        </span>
                                        <svg className="w-4 h-4 text-[#FF3E00] opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden md:flex w-2/5 flex-col sticky top-0 h-[calc(100vh-80px-48px)] bg-black shrink-0 overflow-hidden">
                                <AnimatePresence mode="wait">
                                    {hoveredMenuIndex !== null ? (
                                        <motion.div 
                                            key={hoveredMenuIndex}
                                            initial={{ opacity: 0, scale: 1.1 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 1.1 }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                            className="absolute inset-0"
                                        >
                                            <img src={menuLinks[hoveredMenuIndex].image} alt="" className="w-full h-full object-cover relative z-50 brightness-100" />
                                        </motion.div>
                                    ) : (
                                        <motion.div 
                                            key="awaiting-input"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 bg-[#050505] z-0 flex items-center justify-center p-12"
                                        >
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="font-mono text-[#FF3E00] text-[10px] md:text-[12px] tracking-[0.8em] uppercase animate-pulse text-center">
                                                    AWAITING INPUT...
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        <div className="relative z-30 flex items-stretch h-12 border-t border-white/5 bg-[#000000] font-mono text-[9px] tracking-[0.4em] shrink-0">
                            <div className="flex-1 flex items-center px-12 border-r border-white/5 text-white/20">
                            </div>
                            <div className="hidden md:flex w-2/5 items-center justify-between px-12">
                                {socialLinks.map((social) => (
                                    <a 
                                        key={social.name} 
                                        href={social.url} 
                                        className="text-white/40 hover:text-[#FF3E00] transition-colors uppercase"
                                    >
                                        {social.name}
                                    </a>
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
