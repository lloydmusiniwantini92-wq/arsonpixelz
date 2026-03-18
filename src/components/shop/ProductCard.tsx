import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { Product } from '../../data/products';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = React.useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col overflow-hidden"
            style={{
                background: '#0d0d0d',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 0 0 0 rgba(209,109,106,0)',
                transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
            }}
            onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(209,109,106,0.12), 0 0 0 1px rgba(209,109,106,0.3)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(209,109,106,0.3)';
            }}
            onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 0 rgba(209,109,106,0)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.05)';
            }}
        >
            {/* ── Image ── */}
            <div className="aspect-[16/10] overflow-hidden relative bg-[#111]">
                <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-all duration-700 z-10" />
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                />

                {/* Scan line */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[length:100%_3px] z-20 pointer-events-none" />

                {/* Tags */}
                <div className="absolute top-4 left-4 z-30 flex gap-2">
                    {product.featured && (
                        <span className="bg-[#D16D6A] text-[#0a0a0a] text-[9px] uppercase font-black tracking-[0.25em] px-2 py-1">
                            Featured
                        </span>
                    )}
                    <span className="bg-black/70 text-[#EBE9DF]/70 text-[9px] uppercase font-mono tracking-[0.2em] px-2 py-1 backdrop-blur-sm border border-white/10">
                        {product.category}
                    </span>
                </div>

                {/* Price badge top-right */}
                <div className="absolute top-4 right-4 z-30">
                    <span
                        className="font-mono font-black text-sm text-[#D16D6A] bg-black/80 px-3 py-1.5 backdrop-blur-sm border border-[#D16D6A]/20"
                        style={{ textShadow: '0 0 20px rgba(209,109,106,0.6)' }}
                    >
                        {product.price}
                    </span>
                </div>
            </div>

            {/* ── Content ── */}
            <div className="flex flex-col flex-1 p-6">

                {/* Title */}
                <h3
                    className="font-black text-xl uppercase tracking-tight text-[#EBE9DF] mb-3 leading-tight group-hover:text-[#D16D6A] transition-colors duration-300"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                >
                    {product.title}
                </h3>

                {/* Description */}
                <p className="font-mono text-xs text-[#EBE9DF]/40 leading-relaxed mb-6 line-clamp-2 flex-1">
                    {product.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-white/5 pt-5">

                    {/* Tags */}
                    <div className="flex gap-3">
                        {product.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="font-mono text-[9px] text-[#D16D6A]/50 uppercase tracking-widest">
                                /{tag}
                            </span>
                        ))}
                    </div>

                    {/* CTA */}
                    <button
                        onClick={handleAddToCart}
                        className="group/btn flex items-center gap-2 transition-all duration-300"
                        style={{
                            background: isAdded ? '#D16D6A' : 'transparent',
                            border: `1px solid ${isAdded ? '#D16D6A' : 'rgba(209,109,106,0.3)'}`,
                            padding: '6px 14px',
                            color: isAdded ? '#0a0a0a' : '#EBE9DF',
                        }}
                        onMouseEnter={e => {
                            if (!isAdded) {
                                (e.currentTarget as HTMLElement).style.background = '#D16D6A';
                                (e.currentTarget as HTMLElement).style.borderColor = '#D16D6A';
                                (e.currentTarget as HTMLElement).style.color = '#0a0a0a';
                            }
                        }}
                        onMouseLeave={e => {
                            if (!isAdded) {
                                (e.currentTarget as HTMLElement).style.background = 'transparent';
                                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(209,109,106,0.3)';
                                (e.currentTarget as HTMLElement).style.color = '#EBE9DF';
                            }
                        }}
                    >
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                            {isAdded ? 'ACQUIRED' : 'ACQUIRE'}
                        </span>
                        <ArrowUpRightIcon className={`w-3.5 h-3.5 transition-transform ${isAdded ? 'rotate-45' : 'group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5'}`} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
