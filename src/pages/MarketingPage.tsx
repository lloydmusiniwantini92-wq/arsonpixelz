import React, { useState, useEffect, useRef } from 'react';
import { redirectToCheckoutLineItems, isStripeConfigured } from '../utils/stripe';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollReveal } from '../components/fx/ScrollReveal';
import { PageHeroBackground } from '../components/fx/PageHeroBackground';
import { BrutalistButton } from '../components/common/BrutalistButton';
import MarketingHeroBg from '../assets/site-static/tim.webp';
import MarketingImg1 from '../assets/site-static/marketing/marketing1.jpg';
import MarketingImg2 from '../assets/site-static/marketing/marketing2.jpg';
import MarketingImg3 from '../assets/site-static/marketing/marketing3.jpg';

gsap.registerPlugin(ScrollTrigger);

import { useIgnition } from '../components/layout/IgnitionRuntime';

const MarketingPage: React.FC = () => {
    const { lenis } = useIgnition();
    const [loaded, setLoaded] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const loopContainerRef = useRef<HTMLDivElement>(null);
    const heroHeadingRef = useRef<HTMLHeadingElement>(null);
    const heroDescRef = useRef<HTMLParagraphElement>(null);
    const philosophyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
        window.scrollTo(0, 0);
        const timer = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // ── CINEMATIC TRANSITIONS (from cinematic_transitions skill) ────────────
        const CINEMATIC_EASE = 'cubic-bezier(0.76, 0, 0.24, 1)';

        const ctx = gsap.context(() => {
            if (!containerRef.current) return;

            // ── 1. CINEMATIC PAGE WIPE ────────────────────────────────────────
            gsap.from(containerRef.current, {
                opacity: 0,
                filter: 'blur(12px)',
                scale: 1.04,
                duration: 1.4,
                ease: CINEMATIC_EASE,
                clearProps: 'filter,scale'
            });

            // ── 2. HERO PARALLAX DEPTH ────────────────────────────────────────
            if (heroHeadingRef.current) {
                gsap.to(heroHeadingRef.current, {
                    y: '-18%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: heroHeadingRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.5
                    }
                });
            }
            if (heroDescRef.current) {
                gsap.to(heroDescRef.current, {
                    y: '-8%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: heroDescRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1
                    }
                });
            }

            // ── 3. PHILOSOPHY SECTION — cinematic reveal ──────────────────────
            if (philosophyRef.current) {
                gsap.fromTo(philosophyRef.current,
                    { opacity: 0, y: 80, filter: 'blur(8px)' },
                    {
                        opacity: 1, y: 0, filter: 'blur(0px)',
                        duration: 1.4,
                        ease: CINEMATIC_EASE,
                        clearProps: 'filter',
                        scrollTrigger: {
                            trigger: philosophyRef.current,
                            start: 'top 85%',
                            once: true
                        }
                    }
                );
            }

            // ── 4. CAPABILITY ROWS — Parallax Scroll Architect ────────────────
            const capRows = gsap.utils.toArray<HTMLElement>('.cap-row');
            capRows.forEach((row, i) => {
                const contentPanel = row.querySelector('.cap-content');
                const visualPanel  = row.querySelector('.cap-visual');

                if (contentPanel) {
                    gsap.fromTo(contentPanel,
                        { opacity: 0, y: 120, filter: 'blur(10px)' },
                        {
                            opacity: 1, y: 0, filter: 'blur(0px)',
                            duration: 1.4,
                            delay: 0.1,
                            ease: CINEMATIC_EASE,
                            clearProps: 'filter',
                            scrollTrigger: {
                                trigger: row,
                                start: 'top 82%',
                                once: true
                            }
                        }
                    );
                    const heading = contentPanel.querySelector('h4');
                    if (heading) {
                        gsap.fromTo(heading,
                            { y: '15%' },
                            {
                                y: '-8%',
                                ease: 'none',
                                scrollTrigger: {
                                    trigger: row,
                                    start: 'top bottom',
                                    end: 'bottom top',
                                    scrub: 1.2
                                }
                            }
                        );
                    }
                }

                if (visualPanel) {
                    gsap.fromTo(visualPanel,
                        { opacity: 0, x: i % 2 === 0 ? -60 : 60, filter: 'blur(8px)' },
                        {
                            opacity: 1, x: 0, filter: 'blur(0px)',
                            duration: 1.4,
                            ease: CINEMATIC_EASE,
                            clearProps: 'filter',
                            scrollTrigger: {
                                trigger: row,
                                start: 'top 82%',
                                once: true
                            }
                        }
                    );
                }
            });

            // ── 5. METHODOLOGY — enhanced page-flip with blur + scanline sweep ─
            if (loopContainerRef.current) {
                const cards = gsap.utils.toArray<HTMLElement>('.loop-card', loopContainerRef.current);

                ScrollTrigger.create({
                    trigger: loopContainerRef.current,
                    start: 'top top',
                    end: `+=${cards.length * 80}%`,
                    pin: true,
                    anticipatePin: 1
                });

                cards.forEach((card, i) => {
                    if (i === 0) return;

                    gsap.fromTo(card,
                        {
                            yPercent: 130,
                            rotation: 10,
                            scale: 0.85,
                            filter: 'blur(14px)',
                            boxShadow: '0px 120px 120px rgba(0,0,0,0.9)'
                        },
                        {
                            yPercent: 0,
                            rotation: 0,
                            scale: 1,
                            filter: 'blur(0px)',
                            boxShadow: '0px 0px 0px rgba(0,0,0,0)',
                            ease: CINEMATIC_EASE,
                            clearProps: 'filter',
                            scrollTrigger: {
                                trigger: loopContainerRef.current,
                                start: `top+=${(i - 1) * 80}% top`,
                                end: `top+=${i * 80}% top`,
                                scrub: 1.2
                            }
                        }
                    );

                    // Scanline sweep — wipes across card as it flips in
                    const scanline = card.querySelector('.scanline-sweep');
                    if (scanline) {
                        gsap.fromTo(scanline,
                            { opacity: 0.8, y: '-100%' },
                            {
                                y: '200%',
                                opacity: 0,
                                ease: 'power2.in',
                                scrollTrigger: {
                                    trigger: loopContainerRef.current,
                                    start: `top+=${(i - 1) * 80}% top`,
                                    end: `top+=${(i - 0.3) * 80}% top`,
                                    scrub: 1
                                }
                            }
                        );
                    }
                });
            }

            // ── 6. CTA — Cinematic clip-path wipe + blur ─────────────────────
            if (ctaRef.current) {
                gsap.fromTo(ctaRef.current,
                    {
                        opacity: 0,
                        clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
                        filter: 'blur(10px)'
                    },
                    {
                        opacity: 1,
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                        filter: 'blur(0px)',
                        duration: 1.4,
                        ease: CINEMATIC_EASE,
                        clearProps: 'filter',
                        scrollTrigger: {
                            trigger: ctaRef.current,
                            start: 'top 85%',
                            once: true
                        }
                    }
                );

                const ctaInner = ctaRef.current.querySelector('.relative.z-10');
                if (ctaInner) {
                    gsap.fromTo(ctaInner,
                        { y: '12%' },
                        {
                            y: '-4%',
                            ease: 'none',
                            scrollTrigger: {
                                trigger: ctaRef.current,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: 1
                            }
                        }
                    );
                }
            }

        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleCheckout = async (priceId: string | undefined) => {
        if (!priceId) {
            alert('Price ID not found for this package.');
            return;
        }
        if (!isStripeConfigured()) {
            alert("Stripe is not configured. Please set VITE_STRIPE_PUBLIC_KEY in your .env file.");
            return;
        }

        try {
            await redirectToCheckoutLineItems([{ price: priceId, quantity: 1 }]);
        } catch (error) {
            console.error("Stripe checkout error:", error);
            alert("Failed to initialize checkout. If you are using mock IDs, please ensure they exist in your Stripe Dashboard.");
        }
    };

    const capabilities = [
        {
            id: "01",
            title: "PERFORMANCE MARKETING",
            subtitle: "The Revenue Engine",
            description: "Data-driven campaigns that convert browsers into buyers. We don't guess; we execute aggressively optimized media buying across Meta, Google, and TikTok to maximize ROAS and scale infinitely.",
            deliverables: ["Cross-Channel Media Buying", "Creative Testing Frameworks", "Audience Segmentation", "Advanced Pixel Tracking"],
            image: MarketingImg1,
            stripePriceId: 'price_mock_marketing_performance'
        },
        {
            id: "02",
            title: "SEO & CONTENT STRATEGY",
            subtitle: "Organic Dominance",
            description: "Own the search results. We deploy aggressive technical SEO and highly targeted content architectures that capture high-intent traffic, turning organic search into an unstoppable revenue channel.",
            deliverables: ["Technical Site Audits", "Keyword Gap Analysis", "Content Siloing Strategy", "High-Authority Link Building"],
            image: MarketingImg2,
            stripePriceId: 'price_mock_marketing_seo'
        },
        {
            id: "03",
            title: "CONVERSION RATE OPTIMIZATION",
            subtitle: "The Funnel Architect",
            description: "Traffic is vanity; revenue is sanity. We ruthlessly analyze user behavior, deploying A/B tests and psychological friction-removal strategies to extract maximum value from every single visitor.",
            deliverables: ["Heatmap & Session Analysis", "A/B and Multivariate Testing", "Checkout Friction Removal", "Landing Page Engineering"],
            image: MarketingImg3,
            stripePriceId: 'price_mock_marketing_cro'
        },
    ];

    const processes = [
        { num: "I", title: "THE MAPPING", desc: "We audit your entire funnel, identifying traffic leaks, competitor blind spots, and the lowest-hanging fruit for immediate revenue bumps." },
        { num: "II", title: "THE INJECTION", desc: "We launch the initial campaigns—testing creative angles, deploying tracking infrastructure, and establishing baseline metrics." },
        { num: "III", title: "THE ACCELERATION", desc: "Data dictates scale. We kill the losers, ruthlessly scale the winners, and continually optimize the machine for maximum efficiency." }
    ];

    return (
        <section ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-[#000000] text-[#FFFFFF]">
            
            {/* HER0 HEADER */}
            <div className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-[100rem] mx-auto overflow-hidden" style={{ background: '#000000' }}>
                <PageHeroBackground accentColor="#FF3E00" backgroundImage={MarketingHeroBg} showGrid={false} offsetY={40} />
                <div className={`relative z-10 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h1 ref={heroHeadingRef} className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.8] mb-10 text-white" style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '0.01em' }}>
                        MARKET <br />
                        <span className="text-[#FF3E00]">ACCELERATION</span>
                    </h1>
                    <p ref={heroDescRef} className="text-lg md:text-3xl font-mono text-white/50 max-w-5xl border-l-8 border-[#FF3E00] pl-10 uppercase font-bold">
                        WE DON'T JUST MARKET—WE ACCELERATE. STRATEGIC CAMPAIGNS ENGINEERED TO AMPLIFY YOUR REACH, ENGAGEMENT, AND REVENUE AT UNPRECEDENTED VELOCITY.
                    </p>
                </div>
            </div>

            {/* Background Grid Lines - REMOVED PER REQUEST */}

            {/* PHILOSOPHY SECTION */}
            <div ref={philosophyRef} className="py-24 md:py-32 bg-[#000000] text-white relative z-10 overflow-hidden border-t border-b border-white/5">

                <div className="max-w-[90rem] mx-auto px-6 md:px-12 relative z-10">
                    
                        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tight mb-12 text-white/90" style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '0.01em' }}>
                            TRAFFIC IS VANITY. <br/> <span className="text-[#FF3E00]">REVENUE IS SANITY.</span>
                        </h2>
                    
                    <div className="grid md:grid-cols-2 gap-12">
                        
                            <p className="font-mono text-lg text-white/60 leading-relaxed">
                                Every dollar you spend on marketing should be an employee working tirelessly to bring you more dollars. We do not care about hollow metrics, vanity likes, or empty impressions. We care about the bottom line.
                            </p>
                        
                        
                            <p className="font-mono text-lg text-white/60 leading-relaxed">
                                By fusing behavioral psychology with aggressive, data-driven mathematical models, we construct marketing machines that predictably, and ruthlessly, scale your business.
                            </p>
                        
                    </div>
                </div>
            </div>

            {/* CAPABILITIES DEEP DIVE */}
            <div className="py-32 px-6 md:px-12 max-w-[90rem] mx-auto relative z-10">
                <ScrollReveal staggerIndex={0}>
                    <div className="mb-32">
                        <h2 className="text-sm font-mono font-bold tracking-[0.5em] uppercase text-[#FF3E00] mb-6">Growth Capabilities</h2>
                        <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tight" style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '0.01em' }}>Velocity Systems</h3>
                    </div>
                </ScrollReveal>

                <div className="space-y-32">
                    {capabilities.map((cap, index) => (
                        <div key={cap.id} className={`cap-row grid lg:grid-cols-12 gap-12 items-center ${index % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''}`}>
                            
                            {/* Visual Abstract side */}
                             <div className={`cap-visual lg:col-span-12 xl:col-span-5 h-[500px] border border-white/10 bg-[#0A0A0A] relative overflow-hidden flex items-center justify-center group ${index % 2 !== 0 ? 'lg:col-start-8' : ''}`}>
                                  <img 
                                     src={cap.image} 
                                     alt={cap.title}
                                     className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-105"
                                  />
                                 <div className="relative z-10 text-[12rem] font-black text-white/5 font-mono select-none transition-transform duration-1000 group-hover:scale-110 pointer-events-none">{cap.id}</div>
                            </div>

                            {/* Content Side */}
                            <div className={`cap-content lg:col-span-7 flex flex-col ${index % 2 !== 0 ? 'lg:col-start-1 lg:col-end-8' : ''}`}>
                                
                                    <span className="font-mono text-xs tracking-widest uppercase opacity-50">{cap.subtitle}</span>
                                    <h4 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-8" style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '0.01em' }}>{cap.title}</h4>
                                    <p className="text-lg font-mono text-white/60 leading-relaxed mb-8 max-w-2xl">
                                        {cap.description}
                                    </p>
                                    
                                    <div className="mb-10">
                                        <h5 className="font-bold text-sm font-mono uppercase tracking-[0.2em] text-[#FF3E00] mb-6 border-b border-white/5 pb-4">Scope of Delivery:</h5>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {cap.deliverables.map((item, i) => (
                                                <li key={i} className="flex items-start">
                                                    <div className="w-4 h-4 text-[#FF3E00] mt-0.5 mr-2 flex-shrink-0">
                                                        <svg fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                                    </div>
                                                    <span className="font-mono text-sm text-white/80">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <BrutalistButton 
                                        label="Execute Campaign"
                                        onClick={() => handleCheckout(cap.stripePriceId)}
                                        variant="white"
                                        size="md"
                                    />
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* METHODOLOGY SECTION (PINNED LOOP) — enhanced flip */}
            <div
                ref={loopContainerRef}
                className="bg-[#050505] text-[#FFFFFF] w-full h-screen overflow-hidden flex flex-col justify-center relative z-10 border-t border-white/5"
            >
                {/* Atmospheric background for methodology */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,62,0,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,62,0,0.06)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(255,62,0,0.12)_0%,transparent_70%)]" />
                </div>

                <div className="max-w-[90rem] mx-auto px-6 md:px-12 w-full relative z-10">
                    <div className="mb-12 text-center">
                        <h2 className="text-sm font-mono font-bold tracking-[0.3em] uppercase text-[#FF3E00] mb-4">The Methodology</h2>
                        <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">The Acceleration Loop</h3>
                    </div>

                    <div className="relative w-full max-w-5xl mx-auto h-[500px] perspective-[1500px]">
                        {processes.map((step, index) => (
                            <div
                                key={step.num}
                                className="loop-card absolute inset-0 w-full bg-[#000000] border-2 border-[#FF3E00] p-10 md:p-16 flex flex-col text-center items-center justify-center origin-bottom will-change-transform overflow-hidden"
                                style={{ zIndex: index + 1 }}
                            >
                                {/* Noise texture */}
                                <div className="absolute inset-0 bg-[url('/site-static/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
                                {/* Static scan-line atmosphere */}
                                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.02)_2px,rgba(255,255,255,0.02)_4px)] pointer-events-none" />
                                {/* Scanline sweep — animated by GSAP on flip */}
                                <div className="scanline-sweep absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FF3E00]/40 to-transparent pointer-events-none z-20 opacity-0" />

                                <div className="w-24 h-24 rounded-full border-4 border-[#FF3E00] text-[#FF3E00] font-black font-mono flex items-center justify-center text-3xl mb-8 relative z-10 bg-black shadow-[0_0_30px_rgba(255,62,0,0.3)]">
                                    {step.num}
                                </div>
                                <h4 className="text-4xl md:text-5xl font-black uppercase mb-6 relative z-10 text-white tracking-tight">{step.title}</h4>
                                <p className="font-mono text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl relative z-10">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* BOTTOM CTA */}
            <div className="px-6 md:px-12 max-w-[90rem] mx-auto pb-16 pt-16 relative z-10">
                <div ref={ctaRef} className="relative p-8 md:p-14 bg-[#000000] border border-white/10 shadow-[20px_20px_0px_#FF3E00] overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="absolute inset-0 bg-[url('/site-static/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
                    <div className="relative z-10 max-w-2xl">
                        <h3 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase mb-6 text-white leading-[0.9]">
                            SCALE UNFAIRLY.
                        </h3>
                        <p className="text-white/70 font-mono text-lg font-bold">
                            Stop burning venture capital on inefficient ad spend. Start accelerating.
                        </p>
                    </div>
                    <BrutalistButton 
                        label="Force Multiplier"
                        href="mailto:hello@arsonpixels.com?subject=Marketing%20Project%20Inquiry"
                        variant="orange"
                        size="lg"
                    />
                </div>
            </div>
        </section>
    );
};

export default MarketingPage;
