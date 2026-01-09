import React from 'react';
import { Link } from 'react-router-dom';
import { XCircleIcon } from '@heroicons/react/24/outline';

const CancelPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center">
                <XCircleIcon className="w-24 h-24 text-gray-500 mx-auto mb-6" />
                <h1 className="text-3xl font-black text-white uppercase mb-4 font-mono">
                    Sequence Aborted
                </h1>
                <p className="text-gray-400 font-mono mb-8">
                    Checkout process was cancelled. Your cart items have been retained in local storage.
                </p>
                <Link
                    to="/shop"
                    className="inline-block bg-white text-black font-bold font-mono py-3 px-8 uppercase tracking-wider hover:bg-gray-200 transition-colors"
                >
                    RETURN TO ARMORY
                </Link>
            </div>
        </div>
    );
};

export default CancelPage;
