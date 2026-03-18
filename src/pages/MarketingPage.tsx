import React, { useState, useEffect, useRef } from 'react';
import { redirectToCheckoutLineItems, isStripeConfigured } from '../utils/stripe';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollReveal } from '../components/fx/ScrollReveal';

gsap.registerPlugin(ScrollTrigger);

const MarketingPage: React.FC = () => {
    const [loaded, setLoaded] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const loopContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const timer = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!containerRef.current || !ctaRef.current) return;

            // CTA Reveal
            gsap.from(ctaRef.current, {
                scaleX: 0.8,
                opacity: 0,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: ctaRef.current,
                    start: 'top 85%'
                }
            });

            // Acceleration Loop Pinned Stack
            if (loopContainerRef.current) {
                const cards = gsap.utils.toArray('.loop-card', loopContainerRef.current);
                
                // Pin the entire section
                ScrollTrigger.create({
                    trigger: loopContainerRef.current,
                    start: 'top top',
                    end: `+=${cards.length * 80}%`,
                    pin: true,
                    anticipatePin: 1
                });

                // Animate each card sweeping in from below with a violent snap rotation
                cards.forEach((card: any, i) => {
                    if (i === 0) return; // First card is already visible
                    
                    gsap.from(card, {
                        yPercent: 150,
                        rotation: 12, // Aggressive initial tilt
                        scale: 0.8,
                        boxShadow: "0px 100px 100px rgba(0,0,0,0.8)",
                        scrollTrigger: {
                            trigger: loopContainerRef.current,
                            start: `top+=${(i - 1) * 80}% top`,
                            end: `top+=${i * 80}% top`,
                            scrub: 1, // Smooth scrub but violent appearance constraints
                        }
                    });
                });
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
            stripePriceId: 'price_mock_marketing_performance'
        },
        {
            id: "02",
            title: "SEO & CONTENT STRATEGY",
            subtitle: "Organic Dominance",
            description: "Own the search results. We deploy aggressive technical SEO and highly targeted content architectures that capture high-intent traffic, turning organic search into an unstoppable revenue channel.",
            deliverables: ["Technical Site Audits", "Keyword Gap Analysis", "Content Siloing Strategy", "High-Authority Link Building"],
            stripePriceId: 'price_mock_marketing_seo'
        },
        {
            id: "03",
            title: "CONVERSION RATE OPTIMIZATION",
            subtitle: "The Funnel Architect",
            description: "Traffic is vanity; revenue is sanity. We ruthlessly analyze user behavior, deploying A/B tests and psychological friction-removal strategies to extract maximum value from every single visitor.",
            deliverables: ["Heatmap & Session Analysis", "A/B and Multivariate Testing", "Checkout Friction Removal", "Landing Page Engineering"],
            stripePriceId: 'price_mock_marketing_cro'
        },
    ];

    const processes = [
        { num: "I", title: "THE MAPPING", desc: "We audit your entire funnel, identifying traffic leaks, competitor blind spots, and the lowest-hanging fruit for immediate revenue bumps." },
        { num: "II", title: "THE INJECTION", desc: "We launch the initial campaigns—testing creative angles, deploying tracking infrastructure, and establishing baseline metrics." },
        { num: "III", title: "THE ACCELERATION", desc: "Data dictates scale. We kill the losers, ruthlessly scale the winners, and continually optimize the machine for maximum efficiency." }
    ];

    return (
        <section ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-[#EBE9DF] text-[#1A1A1A]">
            
            {/* HER0 HEADER */}
            <div className="pt-28 md:pt-32 pb-20 px-6 md:px-12 max-w-[100rem] mx-auto relative z-10">
                <div className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-block px-4 py-1 mb-8 border border-[#1A1A1A]">
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A]">Sector // Market Acceleration</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-8">
                        MARKET <br />
                        <span className="text-[#D16D6A]">ACCELERATION</span>
                    </h1>
                    <p className="text-xl md:text-3xl font-mono text-[#1A1A1A]/70 max-w-4xl border-l-4 border-[#D16D6A] pl-6">
                        We don't just market—we accelerate. Strategic campaigns engineered to amplify your reach, engagement, and revenue at unprecedented velocity.
                    </p>
                </div>
            </div>

            {/* Background Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] z-0 pointer-events-none"></div>

            {/* PHILOSOPHY SECTION */}
            <div className="py-24 md:py-32 bg-[#D16D6A] text-[#1A1A1A] relative z-10 box-shadow-[0_-20px_50px_rgba(209,109,106,0.2)] overflow-hidden">
                {/* Decorative Graph Line Background */}
                <div className="absolute inset-0 opacity-10 pointer-events-none transform -skew-y-6 scale-150">
                    <div className="absolute bottom-0 w-full h-[2px] bg-[#1A1A1A]"></div>
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="absolute bottom-0 w-[40px] bg-[#1A1A1A]" style={{ left: `${i * 5}%`, height: `${Math.random() * 80}%` }}></div>
                    ))}
                </div>

                <div className="max-w-[90rem] mx-auto px-6 md:px-12 relative z-10">
                    <ScrollReveal staggerIndex={0}>
                        <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-12 mix-blend-multiply text-[#1A1A1A]/90">
                            TRAFFIC IS VANITY. <br/> <span className="text-white">REVENUE IS SANITY.</span>
                        </h2>
                    </ScrollReveal>
                    <div className="grid md:grid-cols-2 gap-12">
                        <ScrollReveal staggerIndex={1}>
                            <p className="font-mono text-lg text-[#1A1A1A]/80 leading-relaxed font-semibold">
                                Every dollar you spend on marketing should be an employee working tirelessly to bring you more dollars. We do not care about hollow metrics, vanity likes, or empty impressions. We care about the bottom line.
                            </p>
                        </ScrollReveal>
                        <ScrollReveal staggerIndex={2}>
                            <p className="font-mono text-lg text-[#1A1A1A]/80 leading-relaxed font-semibold">
                                By fusing behavioral psychology with aggressive, data-driven mathematical models, we construct marketing machines that predictably, and ruthlessly, scale your business.
                            </p>
                        </ScrollReveal>
                    </div>
                </div>
            </div>

            {/* CAPABILITIES DEEP DIVE */}
            <div className="py-32 px-6 md:px-12 max-w-[90rem] mx-auto relative z-10">
                <ScrollReveal staggerIndex={0}>
                    <div className="mb-24">
                        <h2 className="text-sm font-mono font-bold tracking-[0.3em] uppercase text-[#D16D6A] mb-4">Growth Capabilities</h2>
                        <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Velocity Systems</h3>
                    </div>
                </ScrollReveal>

                <div className="space-y-32">
                    {capabilities.map((cap, index) => (
                        <div key={cap.id} className={`grid lg:grid-cols-12 gap-12 items-center ${index % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''}`}>
                            
                            {/* Visual Abstract side */}
                            <div className={`lg:col-span-5 h-[400px] border-2 border-[#1A1A1A] bg-white relative overflow-hidden flex items-center justify-center p-8 group ${index % 2 !== 0 ? 'lg:col-start-8' : ''}`}>
                                <ScrollReveal staggerIndex={1}>
                                    <span className="text-[12rem] font-black text-[#1A1A1A]/5 font-mono select-none transition-transform duration-700 group-hover:scale-110">{cap.id}</span>
                                    
                                    {/* Tech graph effect */}
                                    <div className="absolute inset-0 p-8 flex items-end justify-between opacity-20 transition-opacity group-hover:opacity-40">
                                        {[10, 30, 20, 50, 40, 80, 70, 100].map((h, i) => (
                                            <div key={i} className="w-[10%] bg-[#D16D6A] transition-all duration-[2s] ease-out hover:bg-[#1A1A1A]" style={{ height: `${h}%` }}></div>
                                        ))}
                                    </div>
                                    <div className="absolute top-4 right-4 text-xs font-mono font-bold text-[#D16D6A] animate-pulse">UPWARD_TREND_DETECTED</div>
                                </ScrollReveal>
                            </div>

                            {/* Content Side */}
                            <div className={`lg:col-span-7 flex flex-col ${index % 2 !== 0 ? 'lg:col-start-1 lg:col-end-8' : ''}`}>
                                <ScrollReveal staggerIndex={2}>
                                    <div className="flex items-center space-x-4 mb-4">
                                        <span className="font-mono text-sm font-bold text-[#D16D6A]">ACT {cap.id}</span>
                                        <span className="font-mono text-xs tracking-widest uppercase opacity-50">{cap.subtitle}</span>
                                    </div>
                                    <h4 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">{cap.title}</h4>
                                    <p className="text-lg font-mono text-[#1A1A1A]/70 leading-relaxed mb-8 max-w-2xl">
                                        {cap.description}
                                    </p>
                                    
                                    <div className="mb-10">
                                        <h5 className="font-bold text-xs font-mono uppercase tracking-widest text-[#1A1A1A]/40 mb-4 border-b border-[#1A1A1A]/10 pb-2">Execution Vectors:</h5>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {cap.deliverables.map((item, i) => (
                                                <li key={i} className="flex items-start">
                                                    <div className="w-4 h-4 text-[#D16D6A] mt-0.5 mr-2 flex-shrink-0">
                                                        <svg fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                                    </div>
                                                    <span className="font-mono text-sm text-[#1A1A1A]/80">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <button 
                                        onClick={() => handleCheckout(cap.stripePriceId)}
                                        className="inline-flex items-center justify-center px-8 py-4 bg-[#1A1A1A] text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#D16D6A] hover:text-white transition-colors w-max"
                                    >
                                        Execute Campaign
                                    </button>
                                </ScrollReveal>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* METHODOLOGY SECTION (PINNED LOOP) */}
            <div ref={loopContainerRef} className="bg-[#1A1A1A] text-[#EBE9DF] w-full h-screen overflow-hidden flex flex-col justify-center relative z-10 box-shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                <div className="max-w-[90rem] mx-auto px-6 md:px-12 w-full">
                    <div className="mb-12 text-center">
                        <h2 className="text-sm font-mono font-bold tracking-[0.3em] uppercase text-[#D16D6A] mb-4">The Methodology</h2>
                        <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">The Acceleration Loop</h3>
                    </div>

                    <div className="relative w-full max-w-5xl mx-auto h-[500px] perspective-[1500px]">
                        {processes.map((step, index) => (
                            <div 
                                key={step.num} 
                                className="loop-card absolute inset-0 w-full bg-[#111111] border-2 border-[#D16D6A] p-10 md:p-16 flex flex-col text-center items-center justify-center transform origin-bottom shadow-[0_-20px_50px_rgba(0,0,0,0.8)] will-change-transform"
                                style={{ zIndex: index + 1 }}
                            >
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
                                <div className="w-24 h-24 rounded-full border-4 border-[#D16D6A] text-[#D16D6A] font-black font-mono flex items-center justify-center text-3xl mb-8 relative z-10 bg-[#1A1A1A] shadow-[0_0_30px_rgba(209,109,106,0.3)]">
                                    {step.num}
                                </div>
                                <h4 className="text-4xl md:text-5xl font-black uppercase mb-6 relative z-10 text-white tracking-tight">{step.title}</h4>
                                <p className="font-mono text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl relative z-10">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* BOTTOM CTA */}
            <div className="px-6 md:px-12 max-w-[90rem] mx-auto pb-32 pt-16 relative z-10">
                <div ref={ctaRef} className="relative p-12 md:p-20 bg-white border border-[#1A1A1A] shadow-[20px_20px_0px_#1A1A1A] overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
                    
                    <div className="relative z-10 max-w-2xl">
                        <h3 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase mb-6 text-[#1A1A1A] leading-[0.9]">
                            SCALE UNFAIRLY.
                        </h3>
                        <p className="text-[#1A1A1A]/70 font-mono text-lg font-bold">
                            Stop burning venture capital on inefficient ad spend. Start accelerating.
                        </p>
                    </div>

                    <a href="mailto:hello@arsonpixels.com?subject=Marketing%20Project%20Inquiry"
                       className="relative z-10 inline-block px-12 py-6 bg-[#D16D6A] text-white font-mono font-bold text-lg uppercase tracking-widest hover:bg-[#1A1A1A] transition-colors shadow-[8px_8px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_#1A1A1A] whitespace-nowrap"
                    >
                        Force Multiplier
                    </a>
                </div>
            </div>
        </section>
    );
};

export default MarketingPage;