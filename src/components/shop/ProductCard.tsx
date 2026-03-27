import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../../data/products';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
    product: Product;
    index?: number;
}

const categoryColors: Record<string, string> = {
    template: '#6DD1B0',
    font: '#D1A36D',
    agent: '#D16D6A',
    workflow: '#8E6DD1',
};

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const accentColor = categoryColors[product.category] ?? '#D16D6A';

    return (
        <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
            className="group relative flex flex-col overflow-hidden cursor-pointer"
            style={{ background: '#080808', border: '1px solid rgba(255,255,255,0.06)' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* ── IMAGE ZONE ── */}
            <div className="relative aspect-[4/3] overflow-hidden bg-[#111] flex-shrink-0">
                {/* Main Image */}
                <motion.img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    animate={{
                        scale: isHovered ? 1.08 : 1,
                        filter: isHovered ? 'grayscale(0%) brightness(0.5)' : 'grayscale(60%) brightness(0.7)',
                    }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Film-grain noise overlay */}
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none z-10"
                    style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
                />

                {/* Cinematic scan-line overlay */}
                <div
                    className="absolute inset-0 pointer-events-none z-10 opacity-20"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)',
                    }}
                />

                {/* Reveal Overlay on hover — full CTA */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35 }}
                            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4"
                            style={{ background: `linear-gradient(135deg, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.7) 100%)` }}
                        >
                            {/* Animated corner marks */}
                            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2" style={{ borderColor: accentColor }} />
                            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2" style={{ borderColor: accentColor }} />
                            <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2" style={{ borderColor: accentColor }} />
                            <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2" style={{ borderColor: accentColor }} />

                            {/* View details link */}
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/50"
                            >
                                // ASSET PREVIEW
                            </motion.p>

                            {/* Acquire CTA */}
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                                onClick={handleAddToCart}
                                className="relative flex items-center gap-3 px-8 py-3 font-mono text-xs font-black uppercase tracking-[0.3em] overflow-hidden transition-all duration-300"
                                style={{
                                    background: isAdded ? accentColor : 'transparent',
                                    border: `1px solid ${accentColor}`,
                                    color: isAdded ? '#080808' : '#fff',
                                    boxShadow: isAdded ? `0 0 30px ${accentColor}60` : `0 0 0 transparent`,
                                }}
                                whileHover={{
                                    backgroundColor: accentColor,
                                    color: '#080808',
                                    boxShadow: `0 0 30px ${accentColor}80`,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                {isAdded ? '✓ ACQUIRED' : `ACQUIRE — ${product.price}`}
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Top-left: Featured + Category chips */}
                <div className="absolute top-0 left-0 z-30 flex">
                    {product.featured && (
                        <span
                            className="text-[8px] font-black uppercase tracking-[0.3em] px-3 py-1.5 text-[#080808]"
                            style={{ background: accentColor }}
                        >
                            Featured
                        </span>
                    )}
                    <span
                        className="text-[8px] font-mono uppercase tracking-[0.2em] px-3 py-1.5 text-white/70"
                        style={{ background: 'rgba(8,8,8,0.8)', borderRight: `2px solid ${accentColor}40` }}
                    >
                        {product.category}
                    </span>
                </div>

                {/* Top-right: Price */}
                <div className="absolute top-0 right-0 z-30">
                    <div
                        className="px-4 py-2 font-mono text-sm font-black"
                        style={{
                            background: '#080808',
                            color: accentColor,
                            borderLeft: `1px solid ${accentColor}40`,
                            borderBottom: `1px solid ${accentColor}40`,
                            textShadow: `0 0 20px ${accentColor}`,
                        }}
                    >
                        {product.price}
                    </div>
                </div>

                {/* Bottom accent line — animated on hover */}
                <motion.div
                    className="absolute bottom-0 left-0 h-[2px] z-30"
                    animate={{ width: isHovered ? '100%' : '0%' }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ background: `linear-gradient(to right, ${accentColor}, transparent)` }}
                />
            </div>

            {/* ── CONTENT ZONE ── */}
            <div className="flex flex-col flex-1 p-5 gap-4 relative">
                {/* Left accent bar */}
                <motion.div
                    className="absolute left-0 top-5 bottom-5 w-[2px]"
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ background: `linear-gradient(to bottom, ${accentColor}, transparent)` }}
                />

                {/* Title + desc */}
                <div className="pl-2">
                    <motion.h3
                        className="font-black text-lg md:text-xl uppercase tracking-tight leading-tight mb-2"
                        style={{ fontFamily: 'Syne, sans-serif' }}
                        animate={{ color: isHovered ? accentColor : '#EBE9DF' }}
                        transition={{ duration: 0.3 }}
                    >
                        {product.title}
                    </motion.h3>

                    <p className="font-mono text-[11px] leading-relaxed line-clamp-2" style={{ color: 'rgba(235,233,223,0.35)' }}>
                        {product.description}
                    </p>
                </div>

                {/* Footer: tags + subtle acquire hint */}
                <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <div className="flex gap-3 flex-wrap">
                        {product.tags.slice(0, 3).map(tag => (
                            <span
                                key={tag}
                                className="font-mono text-[9px] uppercase tracking-widest transition-colors duration-300"
                                style={{ color: isHovered ? `${accentColor}90` : 'rgba(209,109,106,0.35)' }}
                            >
                                /{tag}
                            </span>
                        ))}
                    </div>

                    <motion.div
                        className="font-mono text-[9px] uppercase tracking-widest flex items-center gap-1.5"
                        animate={{ opacity: isHovered ? 0 : 0.4, x: isHovered ? 5 : 0 }}
                        style={{ color: '#EBE9DF' }}
                    >
                        <span>Hover to acquire</span>
                        <span>→</span>
                    </motion.div>
                </div>
            </div>
        </motion.article>
    );
};
