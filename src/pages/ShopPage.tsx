import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShopHero } from '../components/shop/ShopHero';
import { ProductCard } from '../components/shop/ProductCard';
import { products, Product } from '../data/products';

const categories = ['all', 'template', 'font', 'agent', 'workflow'];

const ShopPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <div className="min-h-screen bg-[#0F0F0F] pb-20">
            <ShopHero />

            <div className="container mx-auto px-6 mt-12">
                {/* Filter Bar */}
                <div className="flex flex-wrap gap-4 mb-12 border-b border-[#333] pb-6">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`text-sm uppercase tracking-widest font-mono px-4 py-2 border transition-all duration-300 ${selectedCategory === category
                                    ? 'bg-[#D16D6A] border-[#D16D6A] text-white'
                                    : 'bg-transparent border-[#333] text-gray-500 hover:border-[#D16D6A] hover:text-[#D16D6A]'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-20 text-gray-500 font-mono">
                        NO ASSETS FOUND IN SECTOR_0{categories.indexOf(selectedCategory)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopPage;
