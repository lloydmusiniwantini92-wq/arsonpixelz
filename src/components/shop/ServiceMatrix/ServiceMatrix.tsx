import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '../../../data/services';
import { ServiceTierCard } from './ServiceTierCard';

export const ServiceMatrix = () => {
    const [activeCategory, setActiveCategory] = useState(services[0].id);

    const activeService = services.find(s => s.id === activeCategory);

    return (
        <section id="agency-capabilities" className="relative overflow-hidden py-32 border-t border-white/5 bg-transparent">
            {/* Ambient subtle noise overlay */}
            <div className="absolute inset-0 noise-bg opacity-[0.06] pointer-events-none z-10" />
            <div className="absolute inset-0 scanline opacity-10 pointer-events-none z-10" />

            <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
                {/* ── CENTRALIZED SERVICE HEADER (Offset by Sidebar Width to Center over Grid) ── */}
                <div className="mb-12 md:mb-20 text-center w-full">
                    <h3 className="font-space font-bold text-3xl sm:text-5xl md:text-7xl text-white uppercase tracking-tighter inline-block relative px-4 text-center">
                         AGENCY CAPABILITIES <br className="md:hidden" /> AND PRODUCT RANKING
                         <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#D83600]" />
                    </h3>
                </div>
                
                {/* ── AGENCY CAPABILITIES PANEL ── */}
                <div className="mb-12 md:mb-20 flex flex-col items-center">
                    <div className="mb-6 md:mb-10 text-center h-5">
                        <span className="font-mono text-[#D83600] text-[10px] md:text-[13px] tracking-[0.5em] md:tracking-[0.8em] animate-pulse">
                            {activeService?.name}
                        </span>
                    </div>

                    <div className="w-full border-y border-white/5 bg-black/70 backdrop-blur-md sticky top-16 md:top-24 z-[100] -mx-6 md:-mx-12 px-6 md:px-12">
                        <nav className="flex items-center justify-start md:justify-center flex-nowrap md:flex-wrap gap-x-6 sm:gap-x-8 md:gap-x-10 lg:gap-x-12 gap-y-3 sm:gap-y-4 py-4 md:py-6 overflow-x-auto md:overflow-x-visible no-scrollbar">
                            {services.map((service) => (
                                <button
                                    key={service.id}
                                    onClick={() => setActiveCategory(service.id)}
                                    className={`group relative px-2.5 py-1.5 transition-all duration-300 flex flex-col items-center gap-1.5
                                        ${activeCategory === service.id ? 'text-[#D83600]' : 'text-white/40 hover:text-white'}
                                    `}
                                >
                                    <span className="font-space font-black text-[10px] md:text-[12px] tracking-[0.12em] whitespace-nowrap">
                                        {service.name}
                                    </span>
                                    {activeCategory === service.id && (
                                        <motion.div 
                                            layoutId="activeTab"
                                            className="absolute -bottom-1 h-[2px] w-full bg-[#D83600] shadow-[0_0_15px_#D83600]"
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
                                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-0 border border-[#D83600]/10 bg-[#D83600]/5"
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
            </div>
        </section>
    );
};
