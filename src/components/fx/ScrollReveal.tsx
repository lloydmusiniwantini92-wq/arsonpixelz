import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    staggerIndex?: number;
    amount?: 'some' | 'all' | number;
    yOffset?: number;
}

/**
 * ScrollReveal: A temporal mechanics wrapper that enforces Progressive Scroll-Reveal Animation.
 * 
 * Axioms enforced:
 * - Zero Visual Alteration: Does not render structural DOM nodes that disrupt layout (merely a wrapper, or directly animating children).
 * - The Initial State: opacity 0, yOffset (default 30px).
 * - The Epistemological Trigger: Triggers when 'amount' is visible (default 0.15 / 15%).
 * - Temporal Staggering: 'delay' or 'staggerIndex' apply sequential pacing.
 * - Unidirectional Physics: 'once: true' ensures the actualization state is locked.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    className = '',
    delay = 0,
    staggerIndex = 0,
    amount = 0.15,
    yOffset = 30
}) => {
    // Cinematic pacing: Base delay + (Index * Stagger Multiplier)
    const calculatedDelay = delay + (staggerIndex * 0.15); 

    const variants = {
        hidden: { 
            opacity: 0, 
            y: yOffset 
        },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.8,
                delay: calculatedDelay,
                ease: [0.25, 1, 0.5, 1], // Cinematic custom bezier ease-out
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount }} // Unidirectional Physics & Threshold
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
};
