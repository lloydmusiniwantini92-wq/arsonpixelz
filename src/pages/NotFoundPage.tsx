import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-[#0F0F0F] flex flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Background Glitch */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

            <h1 className="font-syne font-black text-[#D16D6A] text-[20vw] leading-none opacity-50 select-none">
                404
            </h1>

            <div className="relative z-10 text-center -mt-8 md:-mt-16">
                <p className="font-mono text-white/50 text-sm tracking-[0.5em] uppercase mb-4">
                    System Failure // Path Not Found
                </p>
                <p className="font-syne font-bold text-white text-2xl md:text-4xl max-w-xl mx-auto mb-12">
                    You have drifted into the void. This sector does not exist.
                </p>

                <Link
                    to="/"
                    className="inline-block bg-[#D16D6A] text-white font-mono font-bold text-sm tracking-widest uppercase px-8 py-4 rounded hover:bg-white hover:text-[#D16D6A] transition-colors duration-300"
                >
                    Return to Base
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
