import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShopHero } from '../components/shop/ShopHero';
import { ProductCard } from '../components/shop/ProductCard';
import { products } from '../data/products';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = ['all', 'template', 'font', 'agent', 'workflow'];

const categoryLabels: Record<string, string> = {
    all: 'All Assets',
    template: 'Templates',
    font: 'Typefaces',
    agent: 'Agent Systems',
    workflow: 'Workflows',
};

const ShopPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const CINEMATIC_EASE = 'cubic-bezier(0.76, 0, 0.24, 1)';
        const ctx = gsap.context(() => {
            if (!containerRef.current) return;
            
            gsap.from(containerRef.current, {
                opacity: 0,
                filter: 'blur(12px)',
                scale: 1.04,
                duration: 1.4,
                ease: CINEMATIC_EASE,
                clearProps: 'filter,scale'
            });
        }, containerRef);
        
        return () => ctx.revert();
    }, []);

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <div
            ref={containerRef}
            className="min-h-screen"
            style={{ background: 'linear-gradient(to bottom, #050505 0%, #0a0505 30%, #0f0808 100%)' }}
        >
            <ShopHero />

            {/* ── Filter / Category selector ── */}
            <div className="relative max-w-[90rem] mx-auto px-6 md:px-12 py-10">

                {/* Active category title */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
                    <div>
                        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#D16D6A]/60 block mb-1">
                            Browsing
                        </span>
                        <h2
                            className="font-black text-3xl md:text-4xl uppercase tracking-tighter text-[#EBE9DF]"
                            style={{ fontFamily: 'Syne, sans-serif' }}
                        >
                            {categoryLabels[selectedCategory]}
                        </h2>
                    </div>

                    {/* Filter pills */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className="font-mono text-[10px] uppercase tracking-[0.25em] px-4 py-2 transition-all duration-300"
                                style={{
                                    background: selectedCategory === cat ? '#D16D6A' : 'transparent',
                                    border: `1px solid ${selectedCategory === cat ? '#D16D6A' : 'rgba(209,109,106,0.2)'}`,
                                    color: selectedCategory === cat ? '#0a0a0a' : 'rgba(235,233,223,0.4)',
                                    fontWeight: selectedCategory === cat ? '900' : '500',
                                }}
                                onMouseEnter={e => {
                                    if (selectedCategory !== cat) {
                                        (e.currentTarget as HTMLElement).style.borderColor = '#D16D6A';
                                        (e.currentTarget as HTMLElement).style.color = '#D16D6A';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (selectedCategory !== cat) {
                                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(209,109,106,0.2)';
                                        (e.currentTarget as HTMLElement).style.color = 'rgba(235,233,223,0.4)';
                                    }
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Divider line */}
                <div className="w-full h-px bg-[#D16D6A]/10 mb-10" />

                {/* Product Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
                    >
                        {filteredProducts.map((product, i) => (
                            <ProductCard key={product.id} product={product} index={i} />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Empty state */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-32 flex flex-col items-center gap-6">
                        <span
                            className="text-8xl font-black text-[#D16D6A]/10 tracking-tighter"
                            style={{ fontFamily: 'Syne, sans-serif' }}
                        >
                            VOID
                        </span>
                        <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#EBE9DF]/20">
                            NO ASSETS IN SECTOR_{String(categories.indexOf(selectedCategory)).padStart(2, '0')}
                        </span>
                    </div>
                )}

                {/* Bottom padding zone */}
                <div className="h-20" />
            </div>
        </div>
    );
};

export default ShopPage;
