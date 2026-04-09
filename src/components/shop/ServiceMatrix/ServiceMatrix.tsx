import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '../../../data/services';
import { ServiceTierCard } from './ServiceTierCard';
import { ChooseYourTier } from './ChooseYourTier';

export const ServiceMatrix = () => {
    const [activeCategory, setActiveCategory] = useState(services[0].id);

    const activeService = services.find(s => s.id === activeCategory);

    return (
        <section id="agency-capabilities" className="relative overflow-hidden py-32 border-t border-white/5">
            {/* Unified Monolith Background - WITH 90% MASK FOR ABSOLUTE LEGIBILITY */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/images/shop/matrix_monolith.webp" 
                    alt="" 
                    className="w-full h-full object-cover opacity-100 brightness-100"
                />
                <div className="absolute inset-0 bg-black/90" />
            </div>
            
            <div className="absolute inset-0 noise-bg opacity-[0.06] pointer-events-none z-10" />
            <div className="absolute inset-0 scanline opacity-10 pointer-events-none z-10" />

            <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
                {/* ── CENTRALIZED SERVICE HEADER (Offset by Sidebar Width to Center over Grid) ── */}
                <div className="mb-20 text-center w-full">
                    <h3 className="font-space font-bold text-5xl md:text-7xl text-white uppercase tracking-tighter inline-block relative px-4 text-center">
                         AGENCY CAPABILITIES <br className="md:hidden" /> AND PRODUCT RANKING
                         <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#FF3E00]" />
                    </h3>
                </div>
                
                {/* ── AGENCY CAPABILITIES PANEL ── */}
                <div className="mb-20 flex flex-col items-center">
                    <div className="mb-10 text-center h-5">
                        <span className="font-mono text-[#FF3E00] text-[11px] md:text-[13px] tracking-[0.8em] uppercase animate-pulse">
                            {activeService?.name}
                        </span>
                    </div>

                    <div className="w-full border-y border-white/5 bg-black/40 backdrop-blur-md sticky top-0 md:top-24 z-[100] -mx-6 md:-mx-12 px-6 md:px-12">
                        <nav className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 py-10">
                            {services.map((service) => (
                                <button
                                    key={service.id}
                                    onClick={() => setActiveCategory(service.id)}
                                    className={`group relative px-2 py-2 transition-all duration-300 flex flex-col items-center gap-2
                                        ${activeCategory === service.id ? 'text-[#FF3E00]' : 'text-white/40 hover:text-white'}
                                    `}
                                >
                                    <span className="font-space font-black text-[10px] md:text-[12px] uppercase tracking-[0.15em] whitespace-nowrap">
                                        {service.name}
                                    </span>
                                    {activeCategory === service.id && (
                                        <motion.div 
                                            layoutId="activeTab"
                                            className="absolute -bottom-1 h-[2px] w-full bg-[#FF3E00] shadow-[0_0_15px_#FF3E00]"
                                        />
                                    )}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                <div className="flex flex-col gap-16 items-stretch">
                    {/* Main Content Area: Matrix Grid - FULL WIDTH REDEMPTION */}
                    <div className="flex-grow flex flex-col">
                        {/* Tiers Grid - Dynamic Reveal */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-0 border border-[#FF3E00]/10 bg-[#FF3E00]/5"
                            >
                                {activeService?.tiers.map((tier, idx) => (
                                    <ServiceTierCard 
                                        key={tier.title} 
                                        tier={tier} 
                                        index={idx}
                                        categoryId={activeCategory}
                                    />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* ── CHOOSE YOUR TIER CTA ── */}
                <ChooseYourTier />
            </div>
        </section>
    );
};
