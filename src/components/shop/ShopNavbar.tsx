import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export const ShopNavbar: React.FC = () => {
    const navigate = useNavigate();
    const { cartCount, setIsCartOpen } = useCart();

    return (
        <header className="sticky top-0 z-[100] w-full border-b border-white/5 backdrop-blur-xl bg-[#080808]/95">
            <div className="flex items-center justify-between px-6 md:px-10 h-[58px] max-w-[1600px] mx-auto gap-6">

                {/* Logo */}
                <button
                    onClick={() => navigate('/')}
                    className="flex-shrink-0 font-black text-base md:text-lg uppercase tracking-tighter leading-none"
                    style={{ fontFamily: 'Syne, sans-serif', color: '#FF3E00' }}
                >
                    ARSON<span className="text-white">_STORE</span>
                </button>

                {/* Middle Info */}
                <div className="hidden lg:flex items-center gap-6 font-mono text-[9px] text-white/20 uppercase tracking-[0.4em]">
                    <span>STATUS: ARMED</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF3E00] animate-pulse" />
                    <span>SYSTEM_READY</span>
                </div>

                {/* Right: Cart + Back */}
                <div className="flex items-center gap-4 flex-shrink-0">
                    {/* Cart */}
                    <button
                        className="relative flex items-center justify-center w-9 h-9 border border-white/10 hover:border-[#FF3E00]/50 transition-all duration-300"
                        onClick={() => setIsCartOpen(true)}
                    >
                        <svg className="w-4 h-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        {cartCount > 0 && (
                            <span
                                className="absolute -top-1.5 -right-1.5 w-4 h-4 text-[8px] font-black flex items-center justify-center text-black"
                                style={{ background: '#FF3E00' }}
                            >
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* Back link */}
                    <button
                        onClick={() => navigate('/')}
                        className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/20 hover:text-[#FF3E00] transition-colors duration-300"
                    >
                        ← MAIN_SITE
                    </button>
                </div>
            </div>
        </header>
    );
};
