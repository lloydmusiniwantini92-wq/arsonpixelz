import React from 'react';
import { motion } from 'framer-motion';
import ArsonicBg from '../assets/arsonic.webp';

interface PageHeroBackgroundProps {
    /** Accent color for the grid and glow (defaults to ArsonPixelz red) */
    accentColor?: string;
    /** Brightness of the background image. Lower = darker. Default 0.4 */
    brightness?: number;
    /** Optional background image to override the default ArsonicBg */
    backgroundImage?: string;
    /** Whether to show the coordinate grid lines. Default true. */
    showGrid?: boolean;
    /** Optional vertical offset for the background image in pixels */
    offsetY?: number;
}

/**
 * PageHeroBackground
 * Uses the same cinematic ArsonPixelz hero background as the homepage,
 * providing a unified visual identity across all service page hero sections.
 */
export const PageHeroBackground: React.FC<PageHeroBackgroundProps> = ({
    accentColor = '#D16D6A',
    brightness = 0.4,
    backgroundImage,
    showGrid = true,
    offsetY = 0,
}) => {
    const accentRGB = accentColor === '#D16D6A' ? '209,109,106' : '209,109,106';

    const bgImage = backgroundImage || ArsonicBg;

    return (
        <div className="absolute inset-0 overflow-hidden z-0">
            {/* The iconic ArsonPixelz hero image or overridden background */}
            <motion.img
                src={bgImage}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1.05, filter: `blur(15px) brightness(${brightness * 0.5})`, opacity: 0 }}
                animate={{ scale: 1, filter: `blur(0px) brightness(${brightness})`, opacity: 1 }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
                style={{ 
                    animation: 'page-hero-drift 25s ease-in-out infinite alternate',
                    objectPosition: offsetY !== 0 ? `center calc(50% + ${offsetY}px)` : 'center center',
                }}
            />

            {/* Scanlines */}
            <div
                className="absolute inset-0 pointer-events-none z-10 opacity-25"
                style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.3) 3px, rgba(0,0,0,0.3) 4px)',
                }}
            />

            {/* Coordinate grid */}
            {showGrid && (
                <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                        backgroundImage: `linear-gradient(rgba(${accentRGB},0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(${accentRGB},0.06) 1px, transparent 1px)`,
                        backgroundSize: '5rem 5rem',
                    }}
                />
            )}

            {/* Film grain noise */}
            <div
                className="absolute inset-0 pointer-events-none z-10 opacity-[0.05]"
                style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
            />

            {/* Radial accent bloom — top right */}
            <motion.div
                className="absolute -top-32 -right-32 w-[600px] h-[600px] pointer-events-none z-10"
                animate={{ opacity: [0.25, 0.4, 0.25] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                    background: `radial-gradient(ellipse at 100% 0%, rgba(${accentRGB},0.3) 0%, transparent 65%)`,
                    filter: 'blur(40px)',
                }}
            />

            {/* Heavy left vignette — text readability */}
            <div
                className="absolute inset-y-0 left-0 w-2/3 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to right, rgba(2,2,2,0.88) 0%, rgba(2,2,2,0.5) 50%, transparent 100%)' }}
            />

            {/* Top vignette */}
            <div className="absolute inset-x-0 top-0 h-32 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, rgba(2,2,2,0.7), transparent)' }}
            />

            <style>{`
                @keyframes page-hero-drift {
                    from { transform: scale(1) translateX(0px); }
                    to   { transform: scale(1.04) translateX(-8px); }
                }
            `}</style>
        </div>
    );
};
