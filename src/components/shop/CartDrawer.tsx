import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../context/CartContext';

export const CartDrawer = () => {
    const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0F0F0F] border-l border-[#333] z-50 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#080808] relative">
                            {/* Branded Orange Vertical Line */}
                            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#FF3E00]" />
                            <h2 className="text-xl font-black text-white uppercase tracking-tighter font-sans pl-2">
                                Sector // Armory
                            </h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 text-gray-400 hover:text-white transition-colors"
                            >
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                                    <div className="text-6xl mb-4">🛒</div>
                                    <p className="font-mono text-white/50">NO ASSETS DETECTED</p>
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 bg-[#1A1A1A] p-4 rounded-lg border border-[#333] relative group">
                                        <div className="w-20 h-20 bg-black rounded overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-white font-bold text-sm truncate pr-6">{item.title}</h3>
                                            <p className="text-[#D16D6A] font-mono text-sm mb-2">${item.priceValue}</p>

                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center bg-black/50 border border-[#333] rounded">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 hover:text-[#D16D6A] text-gray-400"
                                                    >
                                                        <MinusIcon className="w-3 h-3" />
                                                    </button>
                                                    <span className="px-2 text-xs font-mono text-white w-6 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 hover:text-[#D16D6A] text-gray-400"
                                                    >
                                                        <PlusIcon className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-6 bg-[#1A1A1A] border-t border-[#333]">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-gray-400 font-mono text-sm">TOTAL OUTPUT</span>
                                    <span className="text-2xl font-black text-[#D16D6A] font-mono">
                                        ${cartTotal.toLocaleString()}
                                    </span>
                                </div>
                                <button
                                        onClick={async () => {
                                            try {
                                                const lineItems = cartItems.map(item => {
                                                    if (!item.stripePriceId) {
                                                        console.warn(`Product ${item.title} missing stripePriceId`);
                                                        return null;
                                                    }
                                                    return {
                                                        price: item.stripePriceId,
                                                        quantity: item.quantity
                                                    };
                                                }).filter((item): item is { price: string; quantity: number } => item !== null);

                                                if (lineItems.length === 0) {
                                                    alert("No products with valid Price IDs found in cart.");
                                                    return;
                                                }

                                                const response = await fetch('/api/create-checkout-session', {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                    },
                                                    body: JSON.stringify({ lineItems }),
                                                });

                                                if (!response.ok) {
                                                    throw new Error(`HTTP error! status: ${response.status}`);
                                                }

                                                const data = await response.json();
                                                
                                                if (data.url) {
                                                    window.location.href = data.url;
                                                } else {
                                                    throw new Error('No checkout URL returned');
                                                }
                                            } catch (err) {
                                                console.error("Checkout setup failed:", err);
                                                alert("Checkout failed to setup. See console for details.");
                                            }
                                        }}
                                    className="w-full font-sans text-[11px] font-black uppercase tracking-[0.3em] px-6 py-4 bg-[#FF3E00] text-black hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(255,62,0,0.3)] mb-4"
                                >
                                    INITIALIZE CHECKOUT
                                </button>
                                <button
                                    onClick={clearCart}
                                    className="w-full text-[9px] font-mono text-center text-white/20 hover:text-[#FF3E00] uppercase tracking-widest transition-colors duration-200"
                                >
                                    // FLUSH SYSTEM //
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )
            }
        </AnimatePresence >
    );
};
