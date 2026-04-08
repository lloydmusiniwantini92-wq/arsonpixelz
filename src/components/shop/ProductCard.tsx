import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../../data/products';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
    product: Product;
    index?: number;
    assetNum?: string;
}

const categoryTag: Record<string, string> = {
    template: '/FRAMEWORK',
    font: '/TYPOGRAPHY',
    agent: '/STRATEGY',
    workflow: '/INFRASTRUCTURE',
};

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0, assetNum }) => {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const assetLabel = assetNum || `SPECIFICATION // ${product.title.split(' ')[0]}`;
    const tagLabel = categoryTag[product.category] ?? '/COLLECTION';

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
            whileHover={{ y: -8 }}
            className="group relative flex flex-col overflow-hidden cursor-pointer"
            style={{ 
                background: '#111111', 
                boxShadow: isHovered ? '0 20px 40px rgba(255, 62, 0, 0.1)' : 'none',
                transition: 'box-shadow 0.4s ease'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* ── Top Label Strip ── */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#FF3E00]">
                    {assetLabel}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/25">
                    {tagLabel}
                </span>
            </div>

            {/* ── IMAGE ZONE ── */}
            <div className="relative aspect-[4/3] overflow-hidden bg-[#0d0d0d] flex-shrink-0">
                <motion.img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    animate={{
                        scale: isHovered ? 1.12 : 1.02,
                        filter: isHovered ? 'grayscale(0%) brightness(1.1)' : 'grayscale(40%) brightness(0.75)',
                    }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Animated Scanlines - Minimal purity */}
                <motion.div
                    className="absolute inset-0 pointer-events-none opacity-[0.05] z-10 mix-blend-overlay"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.8) 3px, rgba(255,255,255,0.8) 4px)',
                        backgroundSize: '100% 100%'
                    }}
                    animate={{
                        backgroundPosition: ['0px 0px', '0px -100px']
                    }}
                    transition={{
                        duration: 8,
                        ease: "linear",
                        repeat: Infinity
                    }}
                />

                {/* Diagonal Sweeping Sheen (Hover Only) */}
                <motion.div
                    className="absolute inset-0 pointer-events-none z-15"
                    style={{
                        background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.1) 25%, transparent 30%)',
                        backgroundSize: '200% 100%'
                    }}
                    animate={{
                        backgroundPosition: isHovered ? ['200% 0', '-100% 0'] : '200% 0'
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                />

                {/* Hover overlay with acquire */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="absolute inset-0 z-20 flex items-end justify-center pb-6"
                            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }}
                        >
                            <motion.span
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.08 }}
                                className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/40"
                            >
                                VIEW DETAILS
                            </motion.span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Featured badge */}
                {product.featured && (
                    <div className="absolute top-3 left-3 z-30">
                        <span
                            className="font-mono text-[8px] font-black uppercase tracking-[0.3em] px-2 py-1 text-black"
                            style={{ background: '#FF3E00' }}
                        >
                            FEATURED
                        </span>
                    </div>
                )}
            </div>

            {/* ── BOTTOM ROW ── */}
            <div className="flex items-center justify-between px-4 py-4 border-t border-white/5">
                <div className="flex flex-col gap-1">
                    <h3
                        className="font-black text-sm md:text-base uppercase tracking-tight leading-none text-white transition-colors duration-300"
                        style={{ fontFamily: 'Syne, sans-serif', color: isHovered ? '#ffffff' : 'rgba(255,255,255,0.9)' }}
                    >
                        {product.title}
                    </h3>
                    <span className="font-mono text-[11px] text-white/40">{product.price}</span>
                </div>

                <motion.button
                    onClick={handleAddToCart}
                    className="flex-shrink-0 font-mono text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2.5 transition-all duration-300 relative overflow-hidden group/btn"
                    style={{
                        background: isAdded ? '#22c55e' : (isHovered ? '#FF3E00' : 'transparent'),
                        color: isAdded ? '#050505' : (isHovered ? '#000000' : '#FF3E00'),
                        border: isAdded ? '1px solid #22c55e' : '1px solid #FF3E00',
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    {isAdded ? '✓ CONFIRMED' : 'SELECT'}
                </motion.button>
            </div>
        </motion.article>
    );
};
