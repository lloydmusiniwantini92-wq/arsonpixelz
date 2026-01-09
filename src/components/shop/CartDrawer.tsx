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
                        <div className="p-6 border-b border-[#333] flex justify-between items-center bg-[#1A1A1A]">
                            <h2 className="text-xl font-black text-white uppercase tracking-wider font-mono">
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
                                            const { redirectToCheckout, isStripeConfigured } = await import('../../utils/stripe');

                                            if (!isStripeConfigured()) {
                                                alert("Stripe is not configured. Please set VITE_STRIPE_PUBLIC_KEY in your .env file.");
                                                return;
                                            }

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

                                            await redirectToCheckout(lineItems);
                                        } catch (err) {
                                            console.error("Checkout failed:", err);
                                            alert("Checkout failed to initialize. See console for details.");
                                        }
                                    }}
                                    className="w-full btn-thanoic text-center hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    INITIALIZE CHECKOUT
                                </button>
                                <button
                                    onClick={clearCart}
                                    className="w-full mt-3 text-xs text-center text-gray-500 hover:text-white underline decoration-dotted"
                                >
                                    FLUSH SYSTEM
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
