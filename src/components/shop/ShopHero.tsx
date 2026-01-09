import React from 'react';
import { motion } from 'framer-motion';

export const ShopHero = () => {
    return (
        <section className="relative min-h-[60vh] flex items-center bg-[#0F0F0F] overflow-hidden pt-20">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[#D16D6A] opacity-5 blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-[#D16D6A] opacity-5 blur-[100px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[#D16D6A] font-mono text-sm tracking-[0.3em] uppercase mb-4 block">
                            /// The Armory
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black text-[#EBE9DF] tracking-tighter mb-8 leading-[0.9]">
                            BUILD YOUR <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D16D6A] to-white">
                                DIGITAL EMPIRE
                            </span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed border-l-2 border-[#D16D6A] pl-6">
                            Premium templates, brutalist typography, and autonomous agent swarms.
                            Everything you need to scale from zero to Type 7 civilization status.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Decorative Grid */}
            <div className="absolute bottom-0 right-0 w-1/3 h-1/3 border-l border-t border-[#333] opacity-50 z-10 hidden md:block">
                <div className="w-full h-full relative p-8">
                    <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-[#D16D6A]" />
                    <div className="text-[#333] font-mono text-xs text-right">
                        SYS.READY<br />
                        STORE_VER.2.0
                    </div>
                </div>
            </div>
        </section>
    );
};
