import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { cn } from '../utils/cn';

export const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [isHovering, setIsHovering] = useState(false);
    const [hoverText, setHoverText] = useState('');
    const [isMagnetic, setIsMagnetic] = useState(false);
    
    // Physics configuration for the ultra-smooth feeling
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            
            // Check for magnetic elements or interactive elements
            const magneticTarget = target.closest('[data-magnetic]');
            const interactiveTarget = target.closest('a, button, input, [data-hover]');
            
            if (magneticTarget) {
                const rect = magneticTarget.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                // Pull cursor towards center of magnetic element
                cursorX.set(centerX - 10); // Center adjustment
                cursorY.set(centerY - 10);
                setIsHovering(true);
                setIsMagnetic(true);
            } else {
                cursorX.set(e.clientX - 10);
                cursorY.set(e.clientY - 10);
                setIsMagnetic(false);
                
                if (interactiveTarget) {
                    setIsHovering(true);
                    const hoverLabel = interactiveTarget.getAttribute('data-hover');
                    setHoverText(hoverLabel || '');
                } else {
                    setIsHovering(false);
                    setHoverText('');
                }
            }
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [cursorX, cursorY]);

    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const isTouch = 
            'ontouchstart' in window || 
            navigator.maxTouchPoints > 0 || 
            window.matchMedia('(pointer: coarse)').matches;
            
        setIsTouchDevice(isTouch);

        if (!isTouch) {
            document.body.style.cursor = 'none';
        }

        return () => {
            document.body.style.cursor = 'auto';
        };
    }, []);

    if (isTouchDevice) return null;

    return (
        <motion.div
            className={cn(
                "fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[99999] flex items-center justify-center font-mono text-[8px] font-bold tracking-widest overflow-hidden transition-colors duration-300",
                isHovering ? "bg-white text-black" : "bg-white/80"
            )}
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                mixBlendMode: 'difference',
            }}
            animate={{
                scale: isHovering ? (hoverText ? 4 : 2) : 1,
                opacity: 1,
                borderRadius: isMagnetic ? '10%' : '50%',
            }}
            transition={{
                scale: { type: "spring", stiffness: 300, damping: 20 },
                borderRadius: { duration: 0.2 }
            }}
        >
            <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: hoverText ? 1 : 0 }}
                className="whitespace-nowrap absolute"
                style={{ mixBlendMode: 'normal' }}
            >
                {hoverText}
            </motion.span>
        </motion.div>
    );
};
