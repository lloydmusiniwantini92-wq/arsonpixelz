import React, { useRef, useMemo, useContext } from 'react';
import { motion, useInView } from 'framer-motion';
import { NavigationContext } from '../../App';

interface RevealTextProps {
    text: string;
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
    className?: string;
    style?: React.CSSProperties;
    delay?: number;
    stagger?: number;
    startAnimation?: boolean; // Used to wait for preloader to finish
}

// Simple pseudo-random generator consistent between renders so letters don't jump around
const seededRandom = (seed: number) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
};

export const RevealText: React.FC<RevealTextProps> = ({
    text,
    tag: Tag = 'div',
    className = '',
    style = {},
    delay = 0,
    stagger = 0.04,
    startAnimation = true
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "10%" });
    
    // Read from the root level context so it is resilient against Preloader unmount timing issues
    const { isInitialLoad } = useContext(NavigationContext);
    const activeDuration = !isInitialLoad ? 1.5 : 3.5;
    const activeStagger = !isInitialLoad ? 0.02 : stagger;

    const characters = text.split('');

    // Generate contained starting coordinates for each letter
    const scatterData = useMemo(() => {
        return characters.map((_, i) => {
            const seed = i * 100;
            const signX = seededRandom(seed) > 0.5 ? 1 : -1;
            const signY = seededRandom(seed + 1) > 0.5 ? 1 : -1;
            
            return {
                x: (seededRandom(seed + 2) * 100 + 50) * signX, 
                y: (seededRandom(seed + 3) * 100 + 50) * signY, 
                z: seededRandom(seed + 4) * 200 + 100,
                rotateX: (seededRandom(seed + 5) * 360) - 180,
                rotateY: (seededRandom(seed + 6) * 360) - 180,
                rotateZ: (seededRandom(seed + 7) * 360) - 180,
                scale: seededRandom(seed + 8) * 2 + 1.5,
            };
        });
    }, [characters]);

    const shouldAnimate = isInView && startAnimation;

    return (
        <Tag ref={ref} className={`block overflow-visible leading-none ${className}`} style={{ ...style, perspective: '2000px' }}>
            <span className="sr-only">{text}</span>
            <span aria-hidden="true" className="block relative" style={{ transformStyle: 'preserve-3d' }}>
                {characters.map((char, index) => {
                    const data = scatterData[index];
                    return (
                        <motion.span
                            key={index}
                            initial={{
                                x: data.x,
                                y: data.y,
                                z: data.z,
                                rotateX: data.rotateX,
                                rotateY: data.rotateY,
                                rotateZ: data.rotateZ,
                                scale: data.scale,
                                opacity: 0,
                                filter: 'blur(30px)' // 3x blurrier
                            }}
                            animate={shouldAnimate ? {
                                x: 0,
                                y: 0,
                                z: 0,
                                rotateX: 0,
                                rotateY: 0,
                                rotateZ: 0,
                                scale: 1,
                                opacity: 1,
                                filter: 'blur(0px)'
                            } : {}}
                            transition={{
                                duration: activeDuration, // 1.2s if visited, 3.5s if first load
                                ease: [0.16, 1, 0.3, 1],
                                delay: delay + (index * activeStagger),
                            }}
                            className="inline-block whitespace-pre will-change-transform" // Performance hint
                        >
                            {char}
                        </motion.span>
                    );
                })}
            </span>
        </Tag>
    );
};
