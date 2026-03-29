import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PricingTier } from '../../../data/services';
import { useCart } from '../../../context/CartContext';

interface ServiceTierCardProps {
    tier: PricingTier;
    index: number;
    categoryId: string;
}

export const ServiceTierCard: React.FC<ServiceTierCardProps> = ({ tier, index, categoryId }) => {
    const { addToCart } = useCart();
    const [isHovered, setIsHovered] = useState(false);

    // Feature specific metrics for the HUD feel
    const metrics = [
        { label: 'ENCRYPTION_STRENGTH', value: index === 1 ? 99 : (index === 0 ? 82 : 95) },
        { label: 'SYSTEM_LOAD_CAPACITY', value: index === 1 ? 99.9 : (index === 0 ? 40 : 85) }
    ];

    const handleAcquire = () => {
        const productAdapter = {
            id: `${categoryId}-${tier.title.toLowerCase().replace(/\s+/g, '-')}`,
            title: tier.title,
            description: tier.description,
            price: tier.price,
            priceValue: parseInt(tier.price.replace(/[^0-9]/g, '')) || 0,
            category: 'service' as any,
            image: `https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80`,
            tags: [tier.turnaround],
            stripePriceId: tier.stripePriceId
        };
        addToCart(productAdapter);
    };

    const isPremium = index === 1;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group relative flex flex-col p-8 transition-all duration-500 overflow-hidden border-0 rounded-none
                ${isPremium ? 'bg-[#1b1b1b] scale-105 z-20 shadow-[0_40px_80px_rgba(255,62,0,0.25)] ring-2 ring-[#FF3E00]' : 'bg-[#131313] hover:bg-[#1b1b1b] hover:z-10 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,62,0,0.15)] ring-1 ring-white/5 hover:ring-[#FF3E00]/20'}
            `}
        >
            {/* Global Noise Overlay */}
            <div className="absolute inset-0 noise-bg opacity-[0.03] pointer-events-none" />
            
            {/* Premium Badge */}
            {isPremium && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-30">
                    <span className="font-space font-bold text-[9px] uppercase tracking-[0.4em] bg-[#FF3E00] text-black px-4 py-1.5">
                        MOST_DEPLOYS
                    </span>
                </div>
            )}

            {/* Scanlines for premium/hover */}
            {(isPremium || isHovered) && (
                <div className="absolute inset-0 scanline opacity-10 pointer-events-none z-0" />
            )}

            {/* Card Header */}
            <div className="relative z-10 mb-10">
                <div className="flex justify-between items-center mb-6">
                    <span className="font-inter font-mono text-[9px] text-white/30 tracking-widest uppercase">
                        REF_ID: // {categoryId.toUpperCase()}_V{index + 1}
                    </span>
                    <div className={`w-2 h-2 rounded-none ${isPremium ? 'bg-[#FF3E00] animate-pulse' : 'border border-white/20'}`} />
                </div>
                
                <h3 className="font-space font-bold text-3xl mb-1 text-white uppercase tracking-tighter">
                    {tier.title.replace('The ', '')}
                </h3>
                <p className="font-inter font-mono text-[10px] text-[#FF3E00] mb-8 uppercase tracking-[0.3em]">
                    {tier.vibe}
                </p>
                
                {/* HUD Data Gauges */}
                <div className="space-y-4 mb-8">
                    {metrics.map((m, i) => (
                        <div key={i}>
                            <div className="flex justify-between mb-1.5 font-inter font-mono text-[8px] tracking-widest text-white/40">
                                <span>{m.label}</span>
                                <span className="text-[#FF3E00]">{m.value}%</span>
                            </div>
                            <div className="h-[2px] w-full bg-black">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${m.value}%` }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className={`h-full ${isPremium ? 'bg-gradient-to-r from-[#FF3E00] to-white' : 'bg-[#FF3E00]'}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-white/40 font-inter text-xs leading-relaxed uppercase tracking-tight h-12 overflow-hidden">
                    {tier.description}
                </p>
            </div>

            {/* Features list */}
            <div className="relative z-10 flex-grow mb-10 flex flex-col gap-4">
                {tier.included.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <span className="text-[#FF3E00] text-[12px] opacity-80 material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                            {i % 2 === 0 ? 'verified_user' : 'sensors'}
                        </span>
                        <span className="text-white/70 text-[10px] leading-none font-inter font-mono uppercase tracking-widest">
                            {item}
                        </span>
                    </div>
                ))}
            </div>

            {/* Price Footer */}
            <div className={`relative z-10 mt-auto pt-8 border-t ${isPremium ? 'border-[#FF3E00]/30' : 'border-white/5'} flex flex-col gap-6`}>
                <div className="flex justify-between items-end">
                    <div>
                        <span className="block font-inter font-mono text-[8px] text-white/20 uppercase tracking-[0.3em] mb-1">
                            ACQUISITION_COST
                        </span>
                        <div className="font-space font-black text-4xl text-white tracking-tighter">
                            {tier.price.split(' ')[0]}
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="block font-inter font-mono text-[8px] text-white/20 uppercase tracking-[0.2em] mb-1">
                            WINDOW
                        </span>
                        <span className="block font-inter font-mono text-[9px] text-[#FF3E00] uppercase font-bold">
                            {tier.turnaround}
                        </span>
                    </div>
                </div>
                
                <button
                    onClick={handleAcquire}
                    className={`w-full py-4 font-space font-bold uppercase text-[11px] tracking-[0.4em] transition-all duration-300 rounded-none shadow-2xl
                        ${isPremium 
                            ? 'bg-[#FF3E00] text-black hover:brightness-125 shadow-[0_0_30px_rgba(255,62,0,0.4)]' 
                            : 'bg-transparent border border-[#FF3E00] text-[#FF3E00] hover:bg-[#FF3E00] hover:text-black'}
                    `}
                >
                    INITIATE_ACQUISITION
                </button>
            </div>

            {/* Background Hex Label (Stitch Decorative) */}
            <div className="absolute bottom-1 right-2 opacity-[0.02] pointer-events-none font-inter font-mono text-[7px] text-[#FF3E00] tracking-widest leading-none">
                0x44 0x22 0xAA 0xBB 0xCC 0xDD 0xEE 0xFF
            </div>
        </motion.div>
    );
};
