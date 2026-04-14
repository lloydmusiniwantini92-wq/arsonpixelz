import React from 'react';
import { BrutalistButton } from '../../common/BrutalistButton';

/**
 * ChooseYourTier component for the Shop page.
 * Provides a call to action at the bottom of the service matrix.
 */
export const ChooseYourTier: React.FC = () => {
    const scrollToServices = () => {
        const element = document.getElementById('agency-capabilities');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="mt-20 md:mt-32 relative pt-32 pb-40 px-6 md:px-10 bg-[#FF3E00] overflow-hidden border-t-4 border-b-4 border-black">
            {/* Noise overlay */}
            <div className="absolute inset-0 bg-[url('/site-static/noise.svg')] opacity-[0.2] mix-blend-overlay pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center max-w-[1700px] mx-auto">
                {/* Technical Title Label */}
                <span 
                    className="block text-sm md:text-lg font-bold tracking-[1.5em] uppercase mb-16 text-white/60"
                    style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                >
                    ANALYSIS REQUIRED
                </span>

                <h3 
                    className="text-black uppercase leading-[0.8] mb-16 tracking-tighter w-full" 
                    style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(80px, 18vw, 300px)' }}
                >
                    UNCERTAIN<span className="text-white">?</span>
                </h3>

                <div className="flex flex-col lg:flex-row gap-8 justify-center items-center mt-8">
                    <BrutalistButton
                        to="/contact"
                        label="OPEN COMMS"
                        variant="black"
                        size="xl"
                    />

                    <BrutalistButton
                        onClick={scrollToServices}
                        label="ALL SERVICES"
                        variant="white"
                        size="xl"
                    />
                </div>
            </div>
        </div>
    );
};
