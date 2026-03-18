import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
    children: React.ReactNode;
}

const variants = {
    initial: {
        opacity: 0,
        y: 20, // Slide up slightly
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1], // Quartic ease out
            delay: 0.2 // Small delay to allow exit to breathe
        },
        transitionEnd: {
            transform: "none"
        }
    },
    exit: {
        opacity: 0,
        y: -20, // Slide up slightly on exit
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    return (
        <motion.main
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full relative z-10 overflow-x-hidden"
        >
            {children}
        </motion.main>
    );
};
