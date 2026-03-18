import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { createPortal } from 'react-dom';

export const MagneticCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const cursorSize = isHovering ? 60 : 15;

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, { damping: 40, stiffness: 300, mass: 0.8 });
    const smoothY = useSpring(mouseY, { damping: 40, stiffness: 300, mass: 0.8 });

    useEffect(() => {
        const moveMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, [data-cursor="hover"]')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveMouse);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    // Create a portal to ensure cursor is top-most layer
    return createPortal(
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
            style={{
                x: smoothX,
                y: smoothY,
                translateX: '-50%',
                translateY: '-50%',
            }}
        >
            <motion.div
                animate={{
                    width: cursorSize,
                    height: cursorSize,
                    backgroundColor: isHovering ? '#FFF' : '#FFF',
                }}
                className="rounded-full"
            />
        </motion.div>,
        document.body
    );
};
