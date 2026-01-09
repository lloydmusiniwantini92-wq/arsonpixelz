import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Product } from '../../data/products';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = React.useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation if wrapped in link
        addToCart(product);

        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group relative bg-[#1A1A1A] border border-[#333] overflow-hidden hover:border-[#D16D6A] transition-colors duration-300"
        >
            {/* Image Container */}
            <div className="aspect-[4/3] overflow-hidden relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500 z-10" />
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                />

                {/* Overlay Tags */}
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                    {product.featured && (
                        <span className="bg-[#D16D6A] text-white text-[10px] uppercase font-black tracking-widest px-2 py-1">
                            Featured
                        </span>
                    )}
                    <span className="bg-black/80 text-white text-[10px] uppercase font-mono tracking-widest px-2 py-1 backdrop-blur-sm border border-[#333]">
                        {product.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 relative">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-white font-black text-xl tracking-wide font-black-mont group-hover:text-[#D16D6A] transition-colors">
                        {product.title}
                    </h3>
                    <p className="text-[#D16D6A] font-mono font-bold">
                        {product.price}
                    </p>
                </div>

                <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {product.description}
                </p>

                {/* Footer */}
                <div className="flex justify-between items-end border-t border-[#333] pt-4 mt-auto">
                    <div className="flex flex-wrap gap-2">
                        {product.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] text-gray-500 uppercase tracking-wider font-mono">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className={`
                            flex items-center gap-2 transition-colors group/btn
                            ${isAdded ? 'text-[#D16D6A]' : 'text-white bg-transparent hover:text-[#D16D6A]'}
                        `}
                    >
                        <span className="text-xs font-bold uppercase tracking-widest">
                            {isAdded ? 'ADDED' : 'ACQUIRE'}
                        </span>
                        <ArrowUpRightIcon className={`w-4 h-4 transform transition-transform ${isAdded ? 'rotate-45' : 'group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1'}`} />
                    </button>
                </div>
            </div>

            {/* Hover Glitch Effect Border */}
            <div className="absolute inset-0 border border-[#D16D6A] opacity-0 group-hover:opacity-10 scale-95 group-hover:scale-100 transition-all duration-500 pointer-events-none" />
        </motion.div>
    );
};
