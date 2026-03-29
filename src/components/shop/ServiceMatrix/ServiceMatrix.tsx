import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '../../../data/services';
import { ServiceTierCard } from './ServiceTierCard';

export const ServiceMatrix = () => {
    const [activeCategory, setActiveCategory] = useState(services[0].id);

    const activeService = services.find(s => s.id === activeCategory);

    return (
        <section className="bg-[#080808] relative overflow-hidden py-32 border-t-2 border-[#FF3E00]/20">
            {/* Global HUD elements (Stitch Style) */}
            <div className="absolute inset-0 noise-bg opacity-[0.05] pointer-events-none z-0" />
            <div className="absolute inset-0 scanline opacity-30 pointer-events-none z-0" />

            <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row gap-16">
                
                {/* Asymmetric Left Column: Tactical HUD Sidebar Navigation */}
                <aside className="lg:w-72 flex flex-col shrink-0">
                    <div className="mb-12 border-l-2 border-[#FF3E00] pl-6">
                        <span className="font-inter font-mono text-[9px] uppercase tracking-[0.5em] text-[#FF3E00] mb-2 block">
                            NODE_ARCH_v1.2
                        </span>
                        <h2 className="font-space font-bold text-5xl uppercase tracking-tighter leading-[0.85] text-white">
                            TACTICAL_<br/><span className="text-[#FF3E00]">HUD</span>
                        </h2>
                    </div>

                    <nav className="flex flex-col gap-1">
                        {services.map((service) => (
                            <button
                                key={service.id}
                                onClick={() => setActiveCategory(service.id)}
                                className={`group relative flex flex-col items-start px-6 py-5 transition-all duration-300 border border-transparent 
                                    ${activeCategory === service.id 
                                        ? 'bg-[#FF3E00] text-black scale-105 origin-left' 
                                        : 'text-white/40 hover:bg-white/5 hover:text-white'}
                                `}
                            >
                                <span className="font-inter font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
                                    {service.name}
                                </span>
                                <span className={`font-inter font-mono text-[8px] uppercase tracking-widest mt-1 opacity-60 
                                    ${activeCategory === service.id ? 'text-black' : 'text-white/30'}
                                `}>
                                    {service.description}
                                </span>
                                
                                {/* Geometric Scan Decoration (Stitch) */}
                                {activeCategory === service.id && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
                                )}
                            </button>
                        ))}
                    </nav>

                    {/* Sidebar Footer Metadata */}
                    <div className="mt-20 pt-8 border-t border-white/5 flex flex-col gap-4">
                        <div className="flex justify-between items-center text-[8px] font-inter font-mono text-white/20 uppercase tracking-[0.2em]">
                            <span>COORD_X</span>
                            <span className="text-white/40">40.7128° N</span>
                        </div>
                        <div className="flex justify-between items-center text-[8px] font-inter font-mono text-white/20 uppercase tracking-[0.2em]">
                            <span>ENTROPY_LVL</span>
                            <span className="text-white/40">0.00032</span>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area: Matrix Grid */}
                <div className="flex-grow flex flex-col">
                    {/* Header Matrix Status */}
                    <div className="mb-12 flex justify-between items-end border-b border-white/5 pb-8">
                        <div>
                            <p className="font-inter font-mono text-[9px] text-[#FF3E00] tracking-[0.6em] mb-4 uppercase animate-pulse">
                                SYSTEM_STATUS: OPERATIONAL // LEVEL_04_AUTH
                            </p>
                            <h3 className="font-space font-bold text-4xl text-white uppercase tracking-tighter">
                                {activeService?.name} <span className="text-white/20">// SECTOR_OVERVIEW</span>
                            </h3>
                        </div>
                        <div className="hidden md:flex gap-1.5 opacity-20">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="w-1.5 h-6 bg-[#FF3E00]" />
                            ))}
                        </div>
                    </div>

                    {/* Tiers Grid - Dynamic Reveal */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
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

                    {/* Matrix Briefing Footer (Stitch) */}
                    <div className="mt-16 flex flex-col md:flex-row justify-between gap-12 group">
                        <div className="max-w-md">
                            <h4 className="font-space font-bold text-white uppercase tracking-[0.2em] text-sm mb-4">SYSTEM_DEBRIEF</h4>
                            <p className="font-inter font-mono text-[9px] text-white/40 leading-relaxed uppercase tracking-widest">
                                ALL DEPLOYMENTS ARE SUBJECT TO THE ARSON MONOLITH PROTOCOL. SECURE NODE 01 CURRENTLY MONITORING ALL ACTIVE MATRIX CONNECTIONS. UNAUTHORIZED ACCESS RESULTS IN IMMEDIATE SYSTEM PURGE.
                            </p>
                        </div>
                        <div className="flex gap-10 font-inter font-mono text-[8px] uppercase tracking-[0.5em] text-[#FF3E00] animate-pulse">
                            <span>// READY_FOR_DEPLOYMENT</span>
                            <span>VERIFIED_BY_MONOLITH //</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
