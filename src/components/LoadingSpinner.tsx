import React from 'react';

export const LoadingSpinner = () => (
    <div className="flex items-center justify-center w-full h-screen bg-[#EBE9DF]">
        <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-[#D16D6A]/30 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 border-4 border-t-[#D16D6A] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
    </div>
);
