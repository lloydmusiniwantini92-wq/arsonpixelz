import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface ArchiveCTAButtonProps {
    to: string;
}

export const ArchiveCTAButton: React.FC<ArchiveCTAButtonProps> = ({ to }) => {
    const navigate = useNavigate();

    return (
        <motion.button
            onClick={() => navigate(to)}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="relative group cursor-pointer border-none bg-transparent p-0 outline-none"
            style={{ fontFamily: 'Anton, sans-serif' }}
        >
            {/* Primary Surface (Just the Text now) */}
            <motion.div
                className="relative z-10 flex items-center justify-center overflow-visible"
                variants={{
                    initial: { scale: 1, color: '#D83600', filter: 'drop-shadow(0 0 0px rgba(0,0,0,0))' },
                    hover: { 
                        scale: 1.15, 
                        color: '#000000',
                        filter: 'drop-shadow(0 0 30px rgba(0,0,0,0.15))'
                    },
                    tap: { scale: 0.9 }
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Text: START (Monolithic) */}
                <span className="text-[12rem] font-black tracking-tighter uppercase font-anton leading-none select-none">
                    START
                </span>
            </motion.div>
        </motion.button>
    );
};
