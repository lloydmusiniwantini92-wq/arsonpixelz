import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface BrutalistButtonProps {
    label: string;
    onClick?: () => void;
    to?: string;
    href?: string;
    variant?: 'black' | 'white' | 'orange';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    icon?: React.ReactNode;
    className?: string;
    shadowColor?: 'black' | 'white' | 'orange' | 'accent';
    /** Custom rotation in degrees. If not provided, it will be deterministic based on the label. */
    slant?: number;
    type?: 'button' | 'submit' | 'reset';
    id?: string;
}

/**
 * Deterministic hash to keep the "random" slant and shadow color consistent for the same button.
 */
const getDeterministicValue = (str: string, range: number) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return (hash % (range * 20)) / 10 - range;
};

const getDeterministicShadow = (str: string) => {
    const colors: ('black' | 'white' | 'orange' | 'accent')[] = ['black', 'orange', 'white'];
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};

export const BrutalistButton: React.FC<BrutalistButtonProps> = ({
    label,
    onClick,
    to,
    href,
    variant = 'black',
    size = 'md',
    icon,
    className = '',
    shadowColor,
    slant,
    type = 'button',
    id,
}) => {
    const finalSlant = slant ?? getDeterministicValue(label, 1.5);
    const finalShadowColor = shadowColor ?? getDeterministicShadow(label);

    const shadowColors = {
        black: 'rgba(0,0,0,1)',
        white: 'rgba(255,255,255,1)',
        orange: '#FF3E00',
        accent: '#D16D6A',
    };

    const bgColors = {
        black: 'bg-black text-white',
        white: 'bg-white text-black border border-black/10',
        orange: 'bg-[#FF3E00] text-white',
    };

    const sizes = {
        sm: 'px-6 py-3 text-xs tracking-[0.2em]',
        md: 'px-10 py-5 text-sm tracking-[0.3em]',
        lg: 'px-12 py-6 text-xl tracking-[0.2em]',
        xl: 'px-16 py-8 text-2xl tracking-[0.1em]',
    };

    const baseColorName = variant;
    const hoverColorName = variant === 'black' ? 'white' : variant === 'white' ? 'black' : 'white';

    // 1. Ensure initial shadow is distinct from initial surface
    let actualShadowColor = finalShadowColor;
    if (actualShadowColor === baseColorName) {
        actualShadowColor = baseColorName === 'black' ? 'white' : 
                            baseColorName === 'white' ? 'black' : 'black';
    }

    // 2. Ensure hover shadow is distinct from hover surface AND distinct from initial shadow
    const allColors: ('black' | 'white' | 'orange')[] = ['black', 'white', 'orange'];
    const hoverShadowColor = allColors.find(c => c !== hoverColorName && c !== actualShadowColor) || 'black';

    const shadowHex = shadowColors[actualShadowColor as keyof typeof shadowColors];
    const inverseShadowHex = shadowColors[hoverShadowColor as keyof typeof shadowColors];

    const hoverBg = variant === 'black' ? 'rgb(255,255,255)' : 
                   variant === 'white' ? 'rgb(0,0,0)' : 
                   'rgb(255,255,255)';
    
    const hoverText = variant === 'black' ? 'rgb(0,0,0)' : 
                     variant === 'white' ? 'rgb(255,255,255)' : 
                     '#FF3E00';

    // Core Button Rendering Logic
    const ButtonElement = () => (
        <motion.button 
            type={type}
            id={id}
            className="relative inline-block group"
            whileHover="hover"
            whileTap="tap"
            initial="initial"
            style={{ rotate: finalSlant }}
        >
            {/* The 3D Shadow Layer */}
            <motion.div 
                className="absolute inset-0 z-0"
                variants={{
                    initial: { x: 8, y: 8, backgroundColor: shadowHex },
                    hover: { x: 12, y: 12, backgroundColor: inverseShadowHex },
                    tap: { x: 4, y: 4 }
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* The Interactive Surface */}
            <motion.div
                className={`relative z-10 font-anton uppercase font-black transition-all duration-300 ${bgColors[variant]} ${sizes[size]} flex items-center justify-center gap-3 ${className}`}
                style={{ fontFamily: 'Anton, sans-serif' }}
                variants={{
                    initial: { x: 0, y: 0 },
                    hover: { 
                        x: -4, 
                        y: -4,
                        backgroundColor: hoverBg,
                        color: hoverText
                    },
                    tap: { x: -2, y: -2 }
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
                <span>{label}</span>
                {icon && <span className="shrink-0">{icon}</span>}
            </motion.div>
        </motion.button>
    );

    if (to && type !== 'submit') {
        return (
            <Link to={to} className="pointer-events-auto">
                <ButtonElement />
            </Link>
        );
    }

    if (href && type !== 'submit') {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="pointer-events-auto">
                <ButtonElement />
            </a>
        );
    }

    return (
        <div onClick={onClick} className="pointer-events-auto cursor-pointer">
            <ButtonElement />
        </div>
    );
};
