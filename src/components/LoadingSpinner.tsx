import React from 'react';

export const LoadingSpinner = () => (
    <div className="flex items-center justify-center w-full h-screen bg-[#000000]">
        <div className="relative w-20 h-20">
            {/* Outer Ring */}
            <div className="absolute inset-0 border-[1px] border-[#FF3E00]/20 rounded-full animate-[spin_3s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#FF3E00] shadow-[0_0_15px_#FF3E00]"></div>
            </div>
            {/* Inner Ring */}
            <div className="absolute inset-4 border-[1px] border-white/10 rounded-full animate-[spin_2s_linear_infinite_reverse]">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 bg-white shadow-[0_0_10px_white]"></div>
            </div>
            {/* Center Dot */}
            <div className="absolute inset-[45%] bg-[#FF3E00] rounded-full animate-pulse shadow-[0_0_20px_#FF3E00]"></div>
            
            {/* Tech Text */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-mono text-[8px] tracking-[0.4em] text-white/30 uppercase whitespace-nowrap">
                INIT_PROTOCOL // LOADING
            </div>
        </div>
    </div>
);
