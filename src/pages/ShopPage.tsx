import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShopNavbar } from '../components/shop/ShopNavbar';
import { CartDrawer } from '../components/shop/CartDrawer';
import { ShopHero } from '../components/shop/ShopHero';
import { ServiceMatrix } from '../components/shop/ServiceMatrix/ServiceMatrix';
import { ShopPromoPopup } from '../components/shop/ShopPromoPopup';
import { Share2, Globe, Shield } from 'lucide-react';

// Custom SVG Icons to match Lucide style (v1.7.0 compatibility)
const Instagram = ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
);

const Twitter = ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
);

const Linkedin = ({ size = 24, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);




import { useIgnition } from '../components/layout/IgnitionRuntime';

const ShopPage = () => {
    const { lenis } = useIgnition();
    useEffect(() => { 
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
        window.scrollTo(0, 0); 
        document.body.setAttribute('data-shop-active', 'true');
        return () => {
            document.body.removeAttribute('data-shop-active');
        }
    }, [lenis]);

    return (
        <div
            className="min-h-screen text-white selection:bg-[#FF3E00] selection:text-black"
            style={{ background: '#000000', fontFamily: 'Inter, sans-serif' }}
        >

            {/* ── HERO: DIGITAL INFRASTRUCTURE ── */}
            <ShopHero />

            {/* ── SERVICE MATRIX ── */}
            <ServiceMatrix />

            {/* ── MANIFESTO SECTION ── */}
            <section className="relative border-t border-white/5 bg-[#000000] overflow-hidden min-h-[60vh] flex items-center">
                {/* Architectural Background - FULLY UNMASKED */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/images/shop/manifesto_monolith.webp" 
                        alt="" 
                        className="w-full h-full object-cover opacity-100 brightness-100"
                    />
                </div>

                <div className="max-w-[1600px] mx-auto px-8 md:px-12 py-32 relative z-10 flex flex-col items-center justify-center text-center">
                    
                    {/* Manifesto Quote */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2 }}
                        className="relative"
                    >
                        <blockquote
                            className="font-black text-4xl md:text-7xl xl:text-[7.5rem] uppercase leading-[0.85] tracking-[-0.05em] mb-12 font-['Space_Grotesk'] max-w-6xl mx-auto"
                        >
                            "WE ARE NOT JUST <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>BUILDING</span> SYSTEMS, <br/> WE ARE <span className="text-[#FF3E00]">ENGINEERING</span> DIGITAL FORTRESSES"
                        </blockquote>
                    </motion.div>
                </div>
            </section>

            {/* ── SHOP FOOTER: COMMAND CENTER ── */}
            <footer className="border-t border-white/5 bg-[#000000] relative z-20">
                <div className="max-w-[1600px] mx-auto px-8 md:px-12 py-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">
                    
                    {/* LEFT SIDE: Utility Grid */}
                    <div className="flex flex-wrap justify-start gap-8 lg:gap-14">
                        {['LEGAL', 'TERMS', 'PRIVACY', 'SECURITY'].map(l => (
                            <button 
                                key={l} 
                                className="font-mono text-[10px] font-black uppercase tracking-[0.5em] text-white/40 hover:text-[#FF3E00] transition-colors relative group py-2"
                            >
                                {l}
                                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#FF3E00] group-hover:w-full transition-all" />
                            </button>
                        ))}
                    </div>

                    {/* RIGHT SIDE: SOCIAL ICONS */}
                    <div className="flex items-center gap-8">
                        {[
                            { icon: Instagram, label: 'Instagram' },
                            { icon: Twitter, label: 'Twitter' },
                            { icon: Linkedin, label: 'LinkedIn' }
                        ].map((social, i) => (
                            <button 
                                key={i}
                                className="group p-2 text-white/40 hover:text-[#FF3E00] transition-all duration-300"
                                aria-label={social.label}
                            >
                                <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* Visual anchor bar */}
                <div className="h-1.5 w-full bg-[#FF3E00]" />
            </footer>

            <CartDrawer />
            <ShopPromoPopup />
        </div>
    );
};

export default ShopPage;
