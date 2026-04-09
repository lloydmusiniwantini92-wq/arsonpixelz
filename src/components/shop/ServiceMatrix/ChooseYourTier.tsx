import React from 'react';
import { Link } from 'react-router-dom';

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
        <div className="mt-20 md:mt-32 relative p-12 md:p-16 rounded-2xl bg-gradient-to-br from-[#FF3E00] to-[#E63900] overflow-hidden">
            {/* Noise Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

            {/* Animated Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(0,0,0,0.05)_50%,transparent_100%)] bg-[length:100%_4px] animate-pulse pointer-events-none" />

            <div className="relative z-10 text-center max-w-3xl mx-auto">
                <h3 className="text-3xl md:text-5xl font-black uppercase mb-6 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                    CHOOSE YOUR TIER
                </h3>
                <p className="text-white/90 font-mono text-base md:text-lg mb-8 leading-relaxed">
                    Not sure which tier fits your vision? Let's talk. We'll analyze your goals,
                    match you with the perfect ignition level, and get your fire started.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/contact"
                        className="group px-8 py-4 bg-white text-[#FF3E00] rounded-full font-mono font-bold uppercase tracking-wider hover:bg-[#0a0a0a] hover:text-white transition-all duration-300 inline-flex items-center justify-center gap-2 border-2 border-white hover:border-[#0a0a0a]"
                    >
                        START CONVERSATION
                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>

                    <button
                        onClick={scrollToServices}
                        className="px-8 py-4 bg-transparent text-white rounded-full font-mono font-bold uppercase tracking-wider hover:bg-white/10 transition-all duration-300 inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white"
                    >
                        VIEW ALL SERVICES
                    </button>
                </div>
            </div>
        </div>
    );
};
