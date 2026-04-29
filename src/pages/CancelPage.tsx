import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIgnition } from '../components/layout/IgnitionRuntime';
import { BrutalistButton } from '../components/common/BrutalistButton';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const CancelPage: React.FC = () => {
    const { lenis } = useIgnition();

    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
        window.scrollTo(0, 0);
    }, [lenis]);

    return (
        <div className="relative min-h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
            {/* Background Image: The Fractured Void */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/site-static/cancel/void.png" 
                    alt="Fractured Void" 
                    className="w-full h-full object-cover opacity-20 grayscale" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
            </div>

            <div className="relative z-10 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50, filter: 'blur(20px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="pt-32"
                >
                    <span 
                        className="block text-[10px] font-bold tracking-[2em] uppercase mb-8 text-[#FF3E00]"
                        style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                    >
                        PROTOCOL_TERMINATED
                    </span>
                    
                    <h1 
                        className="text-[clamp(60px,14vw,220px)] uppercase leading-[0.9] tracking-tighter text-white mb-10"
                        style={{ fontFamily: 'Anton, sans-serif' }}
                    >
                        SEQUENCE<br/>
                        <span className="text-[#FF3E00]">ABORTED.</span>
                    </h1>
                    
                    <p 
                        className="max-w-md mx-auto text-white/40 font-mono text-xs uppercase tracking-[0.2em] leading-loose mb-6"
                        style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                    >
                        The checkout sequence was manually terminated. Your parameters have been saved in local memory.
                    </p>

                    <div className="flex justify-center">
                        <BrutalistButton 
                            label="RETURN_TO_SHOP"
                            to="/shop"
                            variant="white"
                            size="lg"
                            icon={<ArrowLeftIcon className="w-6 h-6" />}
                            hoverIconOnly={true}
                        />
                    </div>
                </motion.div>
            </div>

        </div>
    );
};

export default CancelPage;
