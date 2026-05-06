import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PricingTier } from '../../../data/services';
import { useCart } from '../../../context/CartContext';
import { useIntelligence } from '../../../context/IntelligenceContext';

interface ServiceTierCardProps {
    tier: PricingTier;
    index: number;
    categoryId: string;
}

export const ServiceTierCard: React.FC<ServiceTierCardProps> = ({ tier, index, categoryId }) => {
    const { addToCart } = useCart();
    const { setHoverTarget } = useIntelligence();
    const [isHovered, setIsHovered] = useState(false);



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

    const rankConfigs = [
        {
            rank: 'B',
            label: 'FLAME',
            subLabel: 'ESSENTIAL',
            gradient: 'from-white/20 to-white/5',
            color: '#FFFFFF'
        },
        {
            rank: 'A',
            label: 'BLAZE',
            subLabel: 'MOST POPULAR',
            gradient: 'from-[#D83600]/50 to-[#E63900]/30',
            color: '#D83600'
        },
        {
            rank: 'S',
            label: 'INFERNO',
            subLabel: 'BEST VALUE',
            gradient: 'from-[#D83600] to-[#E63900]',
            color: '#D83600'
        }
    ];

    const config = rankConfigs[index] || rankConfigs[2];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
                opacity: 1, 
                y: isPremium ? 64 : 0,
                zIndex: isHovered ? 50 : (isPremium ? 20 : 1)
            }}
            whileHover={{ 
                scale: isPremium ? 1.08 : 1.05,
                y: isPremium ? 52 : -12,
                transition: { type: "spring", stiffness: 400, damping: 25 }
            }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => {
                setIsHovered(true);
                setHoverTarget({
                    id: `${categoryId}-${index}`,
                    type: 'service',
                    name: tier.title,
                    description: tier.description,
                    level: 'high' // Assumed high intent if hovering a price card
                });
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                setHoverTarget(null);
            }}
            className={`group relative flex flex-col pt-4 px-8 pb-8 transition-colors duration-500 overflow-hidden border-0 rounded-none cursor-pointer
                ${isPremium 
                    ? 'bg-[#1b1b1b] shadow-[0_40px_80px_rgba(255,62,0,0.25)] ring-2 ring-[#D83600]' 
                    : 'bg-[#131313] hover:bg-[#1b1b1b] ring-1 ring-white/5 hover:ring-[#D83600]/40 shadow-xl hover:shadow-[0_30px_60px_rgba(255,62,0,0.2)]'}
            `}
        >
            {/* Global Noise Overlay */}
            <div className="absolute inset-0 noise-bg opacity-[0.03] pointer-events-none" />
            
            {/* Scanlines for premium/hover */}
            {(isPremium || isHovered) && (
                <div className="absolute inset-0 scanline opacity-10 pointer-events-none z-0" />
            )}

            {/* Card Header */}
            <div className="relative z-10 mb-6">
                <div className="flex justify-between items-center mb-0">
                    <div className="w-12 h-[1px] bg-[#D83600]/40" />
                </div>

                {/* ESSENTIAL / MOST POPULAR / BEST VALUE - Aligned with Tier Name */}
                <div className="flex justify-start mb-1 md:ml-[9.5rem] ml-[7.5rem]">
                    <span className="text-base font-mono font-black tracking-[0.5em] text-[#D83600] ">
                        {config.subLabel}
                    </span>
                </div>
                
                {/* Ranking Badge & Title Group - Restored to Original Alignment & Scaling */}
                <div className="flex items-center gap-6 mb-2">
                    <div className={`
                        relative w-24 md:w-32 flex-shrink-0 flex flex-col items-center justify-center
                        rounded-lg bg-gradient-to-br ${config.gradient} p-[2px] overflow-hidden
                        shadow-[0_0_20px_rgba(255,62,0,0.2)]
                    `}>
                        <div className="absolute inset-0 bg-[url('/site-static/noise.svg')] opacity-20 mix-blend-overlay" />
                        <div className="relative z-10 text-center py-2">
                            <div className="text-6xl md:text-8xl font-black text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                                {config.rank}
                            </div>
                        </div>
                    </div>
                    
                    <h3 className="text-5xl md:text-7xl text-white uppercase tracking-[-0.02em] leading-none" style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '-0.01em' }}>
                        {config.label}
                    </h3>
                </div>

                <p className="text-white/70 text-base leading-relaxed tracking-wider mb-8 mt-4" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 500 }}>
                    {tier.description}
                </p>
            </div>

            {/* Features list */}
            <div className="relative z-10 flex-grow mb-10 flex flex-col gap-5">
                {tier.included.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                        <div className="mt-1 w-1.5 h-1.5 bg-[#D83600] shadow-[0_0_8px_#D83600]" />
                        <span className="text-white/80 text-[11px] leading-tight font-inter tracking-widest font-medium">
                            {item}
                        </span>
                    </div>
                ))}
            </div>

            {/* Price Footer */}
            <div className={`relative z-10 mt-auto pt-8 border-t ${isPremium ? 'border-[#D83600]/30' : 'border-white/5'} flex flex-col gap-6`}>
                <div className="flex justify-between items-baseline">
                    <div className="font-space font-black text-5xl md:text-6xl text-white tracking-tighter">
                        {tier.price.split(' ')[0]}
                    </div>
                    <div className="text-right">
                        <span className="block font-inter font-mono text-[10px] text-[#D83600] font-black tracking-widest">
                            {tier.turnaround}
                        </span>
                    </div>
                </div>
                
                <button
                    onClick={handleAcquire}
                    className={`w-full py-6 font-['Anton'] font-bold uppercase text-lg md:text-xl tracking-[0.2em] transition-all transform active:scale-95 duration-500 rounded-none shadow-2xl
                        ${isPremium 
                            ? 'bg-[#D83600] text-white hover:bg-white hover:text-black shadow-[0_0_30px_rgba(255,62,0,0.4)]' 
                            : 'bg-transparent border border-[#D83600] text-[#D83600] hover:bg-white hover:text-black hover:border-white'}
                    `}
                >
                    SECURE DOMINANCE
                </button>
            </div>

            {/* Status Footer - REMOVED FOR MONOLITHIC PURITY */}
        </motion.div>
    );
};
