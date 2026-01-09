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
        <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center">
                <CheckCircleIcon className="w-24 h-24 text-[#D16D6A] mx-auto mb-6" />
                <h1 className="text-3xl font-black text-white uppercase mb-4 font-mono">
                    System Activated
                </h1>
                <p className="text-gray-400 font-mono mb-8">
                    Payment successful. Your assets are being provisioned and will be delivered shortly.
                </p>
                <Link
                    to="/shop"
                    className="inline-block btn-thanoic text-center py-3 px-8"
                >
                    RETURN TO ARMORY
                </Link>
            </div>
        </div>
    );
};

export default SuccessPage;
