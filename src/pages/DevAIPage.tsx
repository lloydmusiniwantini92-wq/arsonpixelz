import React, { useState, useEffect, useRef } from 'react';
import { redirectToCheckoutLineItems, isStripeConfigured } from '../utils/stripe';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollReveal } from '../components/fx/ScrollReveal';
import { PageHeroBackground } from '../components/fx/PageHeroBackground';
import devAIHero from '../assets/images/DevAI/DEVAIhero.jpg';
import devAI1 from '../assets/images/DevAI/Dev1.jpg';
import devAI2 from '../assets/images/DevAI/Dev2.jpg';
import devAI3 from '../assets/images/DevAI/Dev3.jpg';
import devAI4 from '../assets/images/DevAI/DEVAI1.jpg';
import brutalistBg from '../assets/images/DevAI/contact_brutalist_bg.webp';

gsap.registerPlugin(ScrollTrigger);

import { useIgnition } from '../components/layout/IgnitionRuntime';

const DevAIPage: React.FC = () => {
    const { lenis } = useIgnition();
    const [loaded, setLoaded] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const capabilitiesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
        window.scrollTo(0, 0);
        const timer = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(timer);
    }, [lenis]);

    useEffect(() => {
        // ── CINEMATIC TRANSITIONS ───────────────────────────────────────────────
        const CINEMATIC_EASE = 'cubic-bezier(0.76, 0, 0.24, 1)';

        const ctx = gsap.context(() => {
            if (!containerRef.current) return;

            // 1. Cinematic Page Wipe
            gsap.from(containerRef.current, {
                opacity: 0,
                filter: 'blur(12px)',
                scale: 1.04,
                duration: 1.4,
                ease: CINEMATIC_EASE,
                clearProps: 'filter,scale'
            });

            // 2. Hero Parallax Depth
            const heroTitle = containerRef.current.querySelector('.hero-title');
            const heroDesc = containerRef.current.querySelector('.hero-desc');
            
            if (heroTitle) {
                gsap.to(heroTitle, {
                    y: '-15%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: heroTitle,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.2
                    }
                });
            }
            if (heroDesc) {
                gsap.to(heroDesc, {
                    y: '-5%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: heroDesc,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1
                    }
                });
            }

            // 3. CTA Ignition Reveal - Cinematic clip-path wipe
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
            }

            // 4. 3D Server Rack Initialization (Existing)
            if (capabilitiesRef.current) {
                const blades = gsap.utils.toArray('.capability-blade', capabilitiesRef.current);
                
                blades.forEach((blade: any) => {
                    gsap.set(blade, { transformPerspective: 2000, transformOrigin: 'top center' });
                    
                    gsap.from(blade, {
                        scrollTrigger: {
                            trigger: blade,
                            start: 'top 85%',
                            toggleActions: "play reverse play reverse",
                        },
                        rotationX: -90,
                        z: -1000,
                        opacity: 0,
                        duration: 1.2,
                        ease: 'expo.out'
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
            title: "FULL-STACK PLATFORMS",
            subtitle: "The Foundation",
            description: "Scalable, maintainable, blazing-fast. We don't just build websites; we architect complex digital ecosystems capable of handling millions of concurrent operations without breaking a sweat.",
            deliverables: ["React / Next.js Architecture", "Scalable Node/Python Backends", "Custom API Development", "High-Availability Cloud Hosting"],
            stripePriceId: 'price_mock_dev_web',
            image: devAI1
        },
        {
            id: "02",
            title: "E-COMMERCE ENGINES",
            subtitle: "The Conversion Machine",
            description: "We engineer high-performance retail experiences. From custom headless commerce solutions to heavily optimized Shopify Plus builds, we design systems tailored purely for transaction volume and conversion.",
            deliverables: ["Headless Commerce Builds", "Custom Shopify Theme Dev", "Complex Inventory Syncing", "Conversion Rate Optimization"],
            stripePriceId: 'price_mock_dev_ecommerce',
            image: devAI2
        },
        {
            id: "03",
            title: "NATIVE & CROSS-PLATFORM",
            subtitle: "The Mobile Experience",
            description: "Deploy uncompromising performance directly to your users' hands. We build native-feeling, high-fidelity applications that bridge the gap between utility and obsession.",
            deliverables: ["React Native Development", "iOS/Android Deployment", "Offline-First Architecture", "App Store Optimization"],
            stripePriceId: 'price_mock_dev_mobile',
            image: devAI3
        },
        {
            id: "04",
            title: "AI & AUTOMATION",
            subtitle: "The Force Multiplier",
            description: "Harness cognitive computation. We integrate cutting-edge machine learning protocols into your business, automating workflows and deploying intelligent predictive models that operate 24/7.",
            deliverables: ["Custom LLM Integration", "Automated Workflows", "Predictive Analytics Models", "Conversational AI Interfaces"],
            stripePriceId: 'price_mock_dev_ai',
            image: devAI4
        },
    ];

    const processes = [
        { num: "I", title: "STRUCTURAL DOMINATION", desc: "WE ARCHITECT THE DATA RELATIONSHIPS AND API INFRASTRUCTURE REQUIRED TO SUPPORT UNRELENTING OPERATIONAL SCALE. NO WEAK POINTS. NO OVERHEAD." },
        { num: "II", title: "PURE COMPILATION", desc: "CLEAN, TYPED, MODULAR EXECUTION. WE BUILD IN ISOLATED ENVIRONMENTS, ENSURING SYSTEMIC INTEGRITY ACROSS THE ENTIRE PLATFORM ECOSYSTEM." },
        { num: "III", title: "ABSOLUTE IGNITION", desc: "RIGOROUS QA AND CI/CD PIPELINES GUARANTEE A FLAWLESS ROLLOUT. WE DEPLOY SYSTEMS THAT DO NOT JUST RUN; THEY DOMINATE." }
    ];

    return (
        <section ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-[#000000] text-[#FFFFFF]">
            
            {/* HER0 HEADER */}
            <div className="relative pt-36 md:pt-48 pb-32 px-6 md:px-12 max-w-[100rem] mx-auto overflow-hidden h-screen flex flex-col justify-center" style={{ background: '#000000' }}>
                <PageHeroBackground accentColor="#FF3E00" backgroundImage={devAIHero} />
                <div className={`transition-all duration-1000 relative z-10 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h1 className="hero-title text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.8] mb-10 text-white" style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '0.01em' }}>
                        DIGITAL <br />
                        <span className="text-[#FF3E00]">ARCHITECTURE</span>
                    </h1>
                    <p className="hero-desc text-lg md:text-3xl font-mono text-white/50 max-w-5xl border-l-8 border-[#FF3E00] pl-10 uppercase font-bold">
                        A BEAUTIFUL FLAME NEEDS A SOLID STRUCTURE TO SUSTAIN IT. WE ARCHITECT ROBUST, SCALABLE PLATFORMS POWERED BY ABSOLUTE ENGINEERING.
                    </p>
                </div>
            </div>
            
            {/* CONTENT START: BELOW HERO */}
            <div className="relative overflow-visible">
                {/* Continuous Page Texture / Small Mask Layer */}
                <div 
                    className="absolute inset-0 z-0 opacity-[0.12] pointer-events-none"
                    style={{ 
                        backgroundImage: `url(${brutalistBg})`, 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'top center',
                        backgroundRepeat: 'no-repeat',
                        backgroundAttachment: 'fixed',
                        filter: 'contrast(1.3) brightness(0.6)'
                    }} 
                />
                
                <div className="relative z-10">
                    {/* PHILOSOPHY SECTION */}
                    <div className="py-24 md:py-32 bg-transparent text-white relative z-10 border-t border-b border-white/5">
                <div className="max-w-[90rem] mx-auto px-6 md:px-12">
                    <ScrollReveal staggerIndex={0}>
                        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tight mb-12 text-white/90" style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '0.01em' }}>
                            SCALABILITY IS <span className="text-[#FF3E00]">NOT OPTIONAL.</span>
                        </h2>
                    </ScrollReveal>
                    <div className="grid md:grid-cols-2 gap-12">
                        <ScrollReveal staggerIndex={1}>
                            <p className="font-mono text-lg text-white/50 leading-relaxed uppercase tracking-wide">
                                Beautiful design without structural integrity is a house of cards. We engineer digital products with the assumption that they will handle exponential scale. Your platform must never be the bottleneck to your growth.
                            </p>
                        </ScrollReveal>
                        <ScrollReveal staggerIndex={2}>
                            <p className="font-mono text-lg text-white/50 leading-relaxed uppercase tracking-wide">
                                From isolated microservices to headless architectures, we enforce strict, modern engineering paradigms. No legacy code. No shortcuts. Just pure, unadulterated performance.
                            </p>
                        </ScrollReveal>
                    </div>
                </div>
            </div>

            {/* CAPABILITIES DEEP DIVE */}
            <div className="py-32 px-6 md:px-12 max-w-[90rem] mx-auto relative z-10">
                <ScrollReveal staggerIndex={0}>
                    <div className="mb-32">
                        <h2 className="text-sm font-mono font-bold tracking-[0.5em] uppercase text-[#FF3E00] mb-6">Engineering Capabilities</h2>
                        <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tight" style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '0.01em' }}>Stack & Infrastructure</h3>
                    </div>
                </ScrollReveal>

                <div ref={capabilitiesRef} className="space-y-32 perspective-[2000px]">
                    {capabilities.map((cap, index) => (
                        <div key={cap.id} className={`capability-blade grid lg:grid-cols-12 gap-12 items-center w-full will-change-transform ${index % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''}`}>
                            
                            {/* Visual Abstract side */}
                            {/* Visual Side */}
                             <div className={`lg:col-span-5 h-[500px] border border-white/5 bg-[#050505] relative overflow-hidden flex items-center justify-center group w-full ${index % 2 !== 0 ? 'lg:col-start-8' : ''}`}>
                                 <img 
                                    src={cap.image}
                                    alt={cap.title}
                                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                                 />
                                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                                 <div className="relative z-20 text-[12rem] font-black text-white/5 font-mono select-none transition-transform duration-1000 group-hover:scale-110">{cap.id}</div>
                             </div>

                            {/* Content Side */}
                            <div className={`lg:col-span-7 flex flex-col w-full ${index % 2 !== 0 ? 'lg:col-start-1 lg:col-end-8' : ''}`}>
                                <div className="flex items-center space-x-4 mb-4">
                                    <span className="font-mono text-sm font-black text-[#FF3E00] tracking-widest">{`<${cap.id} />`}</span>
                                    <span className="font-mono text-[10px] tracking-[0.4em] uppercase opacity-30">{cap.subtitle}</span>
                                </div>
                                 <h4 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-8" style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '0.01em' }}>{cap.title}</h4>
                                <p className="text-lg font-mono text-white/50 leading-relaxed mb-10 max-w-2xl uppercase tracking-wider text-xs">
                                    {cap.description}
                                </p>
                                
                                <div className="mb-12">
                                     <h5 className="font-black text-sm font-mono uppercase tracking-[0.3em] text-[#FF3E00] mb-6 border-b border-white/5 pb-3">Scope of Work:</h5>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {cap.deliverables.map((item, i) => (
                                            <li key={i} className="flex items-center space-x-3 text-[11px] font-mono text-white/40 uppercase tracking-widest">
                                                <svg className="w-4 h-4 text-[#FF3E00] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <button 
                                    onClick={() => handleCheckout(cap.stripePriceId)}
                                    className="inline-flex items-center justify-center px-10 py-5 bg-white text-black font-syne font-black text-[11px] uppercase tracking-[0.3em] hover:bg-[#FF3E00] transition-colors w-max"
                                >
                                    Initialize Stack
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

                    {/* METHODOLOGY SECTION */}
                    <div className="py-24 md:py-32 bg-[#FF3E00] text-black relative z-10 border-t border-b border-black/10">
                        <div className="max-w-[90rem] mx-auto px-6 md:px-12">
                            <ScrollReveal staggerIndex={0}>
                                <div className="mb-20">
                                    <h2 className="text-sm font-mono font-black tracking-[0.4em] uppercase text-white/80 mb-4 inline-block border-b-2 border-white/20 pb-1">The Engine</h2>
                                    <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black">Beast Mode Protocols</h3>
                                </div>
                            </ScrollReveal>

                            <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
                                <div className="hidden md:block absolute top-[40px] left-0 w-full h-[1px] border-t border-dashed border-black/20 -z-10"></div>
                                {processes.map((step, index) => (
                                    <ScrollReveal key={step.num} staggerIndex={index + 1}>
                                        <div className="bg-black/5 p-10 md:p-12 border border-black/10 hover:border-black/30 transition-all duration-500 h-full flex flex-col group">
                                            <div className="w-20 h-20 bg-white text-black font-black font-mono flex items-center justify-center text-xl mb-10 border border-black/10 group-hover:bg-black group-hover:text-[#FF3E00] transition-all duration-500">
                                                {'/* ' + step.num + ' */'}
                                            </div>
                                            <h4 className="text-2xl font-black uppercase mb-6 tracking-tight text-black">{step.title}</h4>
                                            <p className="font-mono text-[11px] text-black/70 leading-relaxed uppercase tracking-widest flex-grow font-bold">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* BOTTOM CTA */}
            <div className="px-6 md:px-12 max-w-[90rem] mx-auto pb-16 pt-16 relative z-30">
                <div ref={ctaRef} className="relative p-8 md:p-14 bg-[#FF3E00] overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

                    <div className="relative z-10 max-w-2xl">
                        <h3 className="text-3xl md:text-5xl font-black uppercase mb-8 text-black leading-[0.85] tracking-tighter">
                            SYSTEMS ONLINE.
                        </h3>
                        <p className="text-black/80 font-syne font-bold text-xl mb-12 uppercase tracking-tight leading-tight">
                            Stop patching broken legacy systems. Architect the future of your platform today.
                        </p>
                        <a href="mailto:hello@arsonpixels.com?subject=Dev%20Project%20Inquiry"
                           className="inline-flex flex-col md:flex-row items-center justify-center px-10 py-5 md:px-12 md:py-6 bg-black text-white font-syne font-black uppercase text-[12px] tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-500 hover:scale-105 text-center gap-1 md:gap-2"
                        >
                            <span>Open</span>
                            <span>Terminal</span>
                        </a>
                    </div>
                </div>

                <style>{`
                    .perspective-[2000px] { perspective: 2000px; }
                `}</style>
            </div>
        </section>
    );
};

export default DevAIPage;
