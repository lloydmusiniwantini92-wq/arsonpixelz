import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('arson_cookie_consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('arson_cookie_consent', 'accepted');
        setIsVisible(false);
    };

    const handleReject = () => {
        localStorage.setItem('arson_cookie_consent', 'rejected');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed bottom-0 left-0 w-full z-[1000] p-6 md:p-12 pointer-events-none"
                >
                    <div className="max-w-[1800px] mx-auto pointer-events-auto">
                        <div className="bg-[#000000] border-4 border-white p-8 md:p-12 shadow-[30px_30px_0px_#D83600] relative overflow-hidden group">
                            
                            {/* Hazard Stripes */}
                            <div className="absolute top-0 left-0 w-full h-2 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#D83600_10px,#D83600_20px)]" />
                            
                            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                                <div className="space-y-4 text-left max-w-4xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-4 h-4 bg-[#D83600] animate-pulse" />
                                        <span className="font-mono text-[10px] font-black tracking-[0.5em] text-[#D83600]">
                                            DATA PRIVACY.
                                        </span>
                                    </div>
                                    <h4 className="font-black text-4xl md:text-6xl text-white uppercase tracking-tighter leading-none" style={{ fontFamily: 'Anton, sans-serif' }}>
                                        WE USE <span className="text-[#D83600]">COOKIES.</span>
                                    </h4>
                                    <p className="font-mono text-xs md:text-sm text-white/70 leading-relaxed font-bold border-l-4 border-[#D83600] pl-6 py-2">
                                        WE STORE DATA LOCALLY TO OPTIMIZE PERFORMANCE. <br />
                                        CONTINUED USE CONSTITUTES CONSENT.
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
                                    <button 
                                        onClick={handleReject}
                                        className="px-10 py-5 border-2 border-white/20 text-white font-black font-mono text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all"
                                    >
                                        [ REJECT ]
                                    </button>
                                    <button 
                                        onClick={handleAccept}
                                        className="px-12 py-5 bg-[#D83600] text-black font-black font-mono text-xs uppercase tracking-[0.3em] hover:bg-white transition-all shadow-[8px_8px_0px_white] hover:shadow-none translate-x-[-4px] translate-y-[-4px] hover:translate-x-0 hover:translate-y-0"
                                    >
                                        ACCEPT
                                    </button>
                                </div>
                            </div>

                            {/* Background Texture */}
                            <div className="absolute right-0 top-0 bottom-0 w-32 opacity-[0.02] pointer-events-none overflow-hidden select-none">
                                <div className="font-mono text-[8px] text-white whitespace-pre rotate-90 origin-left ml-24">
                                    DATA_HARVEST_DATA_HARVEST_DATA_HARVEST_DATA_HARVEST_DATA_HARVEST_DATA_HARVEST
                                </div>
                            </div>

                            {/* Noise Grain */}
                            <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
