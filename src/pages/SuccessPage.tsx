import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const SuccessPage: React.FC = () => {
    const { clearCart } = useCart();

    useEffect(() => {
        // Clear the cart upon successful payment
        clearCart();
    }, [clearCart]);

    return (
        <div className="min-h-screen bg-[#000000] flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center relative">
                <div className="absolute -inset-10 bg-[#FF3E00]/5 blur-[100px] rounded-full pointer-events-none" />
                
                <div className="flex justify-center mb-10">
                    <div className="relative">
                        <CheckCircleIcon className="w-24 h-24 text-[#FF3E00]" />
                        <div className="absolute -inset-2 border border-[#FF3E00]/20 animate-pulse" />
                    </div>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
                    System Activated
                </h1>
                <p className="text-white/40 font-mono text-xs uppercase tracking-[0.2em] mb-10 leading-relaxed">
                    Payment successful. Your assets are being provisioned and will be delivered shortly via secure channel.
                </p>
                <Link
                    to="/shop"
                    className="inline-block bg-[#FF3E00] text-black font-syne font-black py-4 px-10 uppercase text-[11px] tracking-[0.3em] hover:bg-white transition-colors duration-300"
                >
                    RETURN TO ARMORY
                </Link>
            </div>
        </div>
    );
};

export default SuccessPage;
