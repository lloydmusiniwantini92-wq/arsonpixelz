import React, { useState, useEffect, useRef } from 'react';
import { redirectToCheckoutLineItems, isStripeConfigured } from '../utils/stripe';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollReveal } from '../components/fx/ScrollReveal';
import { PageHeroBackground } from '../components/fx/PageHeroBackground';

gsap.registerPlugin(ScrollTrigger);

const DevAIPage: React.FC = () => {
    const [loaded, setLoaded] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const capabilitiesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const timer = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

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
            stripePriceId: 'price_mock_dev_web'
        },
        {
            id: "02",
            title: "E-COMMERCE ENGINES",
            subtitle: "The Conversion Machine",
            description: "We engineer high-performance retail experiences. From custom headless commerce solutions to heavily optimized Shopify Plus builds, we design systems tailored purely for transaction volume and conversion.",
            deliverables: ["Headless Commerce Builds", "Custom Shopify Theme Dev", "Complex Inventory Syncing", "Conversion Rate Optimization"],
            stripePriceId: 'price_mock_dev_ecommerce'
        },
        {
            id: "03",
            title: "NATIVE & CROSS-PLATFORM",
            subtitle: "The Mobile Experience",
            description: "Deploy uncompromising performance directly to your users' hands. We build native-feeling, high-fidelity applications that bridge the gap between utility and obsession.",
            deliverables: ["React Native Development", "iOS/Android Deployment", "Offline-First Architecture", "App Store Optimization"],
            stripePriceId: 'price_mock_dev_mobile'
        },
        {
            id: "04",
            title: "AI & AUTOMATION",
            subtitle: "The Force Multiplier",
            description: "Harness cognitive computation. We integrate cutting-edge machine learning protocols into your business, automating workflows and deploying intelligent predictive models that operate 24/7.",
            deliverables: ["Custom LLM Integration", "Automated Workflows", "Predictive Analytics Models", "Conversational AI Interfaces"],
            stripePriceId: 'price_mock_dev_ai'
        },
    ];

    const processes = [
        { num: "I", title: "THE ARCHITECTURE", desc: "We map the data relationships, API structures, and technological stack required to support your long-term operational scale." },
        { num: "II", title: "THE COMPILATION", desc: "Our engineers write clean, typed, modular code. We build in isolated environments, ensuring no systemic failures affect the entire platform." },
        { num: "III", title: "THE DEPLOYMENT", desc: "Rigorous QA, automated testing, and CI/CD pipelines guarantee a flawless rollout to the production environment." }
    ];

    return (
        <section ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-[#000000] text-[#FFFFFF]">
            
            {/* HER0 HEADER */}
            <div className="relative pt-28 md:pt-32 pb-28 px-6 md:px-12 max-w-[100rem] mx-auto overflow-hidden" style={{ background: '#000000' }}>
                <PageHeroBackground accentColor="#FF3E00" />
                {/* Background Code Watermark — sits above bg image but behind text */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-[0.04] pointer-events-none select-none z-[5] flex items-start justify-center">
                    <pre className="text-[#FF3E00] text-[10px] leading-relaxed font-mono w-full px-4 text-center">
                        {`// ARSON_PROTOCOL - ENGINE_v4.0
const buildTheFuture = () => ({
    frontend: ['React', 'Next.js', 'TypeScript'],
    backend: ['Node', 'Python', 'GraphQL'],
    cloud: ['AWS', 'Vercel', 'Cloudflare'],
});`.repeat(30)}
                    </pre>
                </div>
                <div className={`transition-all duration-1000 relative z-10 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-block px-4 py-1 mb-8 border border-white/20">
                    <span className="font-mono text-xs font-black uppercase tracking-[0.25em] text-white/40">Sector // Dev + AI</span>
                    </div>
                    <h1 className="hero-title text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-8 text-white italic">
                        DIGITAL <br />
                        <span className="text-[#FF3E00]">ARCHITECTURE</span>
                    </h1>
                    <p className="hero-desc text-xl md:text-3xl font-syne font-medium text-white/50 max-w-4xl border-l-4 border-[#FF3E00] pl-6 uppercase tracking-tight">
                        A beautiful flame needs a solid structure to sustain it. We build robust, scalable platforms powered by cutting-edge tech.
                    </p>
                </div>
            </div>

            {/* PHILOSOPHY SECTION */}
            <div className="py-24 md:py-32 bg-[#000000] text-white relative z-10 border-t border-b border-white/5">
                <div className="max-w-[90rem] mx-auto px-6 md:px-12">
                    <ScrollReveal staggerIndex={0}>
                        <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-12 text-white/90">
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
                    <div className="mb-24">
                        <h2 className="text-sm font-mono font-black tracking-[0.4em] uppercase text-[#FF3E00] mb-4">Engineering Capabilities</h2>
                        <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">Stack & Infrastructure</h3>
                    </div>
                </ScrollReveal>

                <div ref={capabilitiesRef} className="space-y-32 perspective-[2000px]">
                    {capabilities.map((cap, index) => (
                        <div key={cap.id} className={`capability-blade grid lg:grid-cols-12 gap-12 items-center w-full will-change-transform ${index % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''}`}>
                            
                            {/* Visual Abstract side */}
                            <div className={`lg:col-span-5 h-[400px] border border-white/5 bg-[#050505] relative overflow-hidden flex items-center justify-center p-8 group w-full ${index % 2 !== 0 ? 'lg:col-start-8' : ''}`}>
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:1rem_1rem]"></div>
                                <span className="text-[12rem] font-black text-white/5 font-mono select-none transition-transform duration-700 group-hover:scale-110">{cap.id}</span>
                                
                                {/* Tech scanner effect */}
                                <div className="absolute inset-x-0 h-[1px] bg-[#FF3E00]/50 shadow-[0_0_10px_#FF3E00] animate-[scan_3s_linear_infinite]"></div>
                            </div>

                            {/* Content Side */}
                            <div className={`lg:col-span-7 flex flex-col w-full ${index % 2 !== 0 ? 'lg:col-start-1 lg:col-end-8' : ''}`}>
                                <div className="flex items-center space-x-4 mb-4">
                                    <span className="font-mono text-sm font-black text-[#FF3E00] tracking-widest">{`<${cap.id} />`}</span>
                                    <span className="font-mono text-[10px] tracking-[0.4em] uppercase opacity-30">{cap.subtitle}</span>
                                </div>
                                <h4 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-8 italic">{cap.title}</h4>
                                <p className="text-lg font-mono text-white/50 leading-relaxed mb-10 max-w-2xl uppercase tracking-wider text-xs">
                                    {cap.description}
                                </p>
                                
                                <div className="mb-12">
                                    <h5 className="font-black text-[10px] font-mono uppercase tracking-[0.3em] text-white/20 mb-6 border-b border-white/5 pb-3">Technical Deliverables:</h5>
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
            <div className="bg-[#000000] border-t border-white/5 py-32 px-6 md:px-12 overflow-hidden relative z-10">
                <div className="max-w-[90rem] mx-auto">
                    <ScrollReveal staggerIndex={0}>
                        <div className="mb-20">
                            <h2 className="text-sm font-mono font-black tracking-[0.4em] uppercase text-[#FF3E00] mb-4">The Methodology</h2>
                            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">Build Sequence</h3>
                        </div>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
                        <div className="hidden md:block absolute top-[40px] left-0 w-full h-[1px] border-t border-dashed border-white/10 -z-10"></div>
                        {processes.map((step, index) => (
                            <ScrollReveal key={step.num} staggerIndex={index + 1}>
                                <div className="bg-[#050505] p-10 md:p-12 border border-white/5 hover:border-[#FF3E00]/40 transition-all duration-500 h-full flex flex-col group">
                                    <div className="w-20 h-20 bg-[#FF3E00]/5 text-[#FF3E00] font-black font-mono flex items-center justify-center text-xl mb-10 border border-[#FF3E00]/10 group-hover:bg-[#FF3E00] group-hover:text-black transition-all duration-500">
                                        {'/* ' + step.num + ' */'}
                                    </div>
                                    <h4 className="text-2xl font-black uppercase mb-6 tracking-tight italic">{step.title}</h4>
                                    <p className="font-mono text-[11px] text-white/40 leading-relaxed uppercase tracking-widest flex-grow">
                                        {step.desc}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>

            {/* BOTTOM CTA */}
            <div className="px-6 md:px-12 max-w-[90rem] mx-auto pb-32 pt-16 relative z-10">
                <div ref={ctaRef} className="relative p-12 md:p-24 bg-[#FF3E00] overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                    
                    <div className="absolute top-0 right-0 p-10 opacity-20">
                    <pre className="font-mono text-[10px] text-black font-black uppercase tracking-widest">
                            {'status: "WAITING_FOR_INPUT"\nlatency: "0ms"\nprotocol: "TERMINAL_AWAKE"'}
                        </pre>
                    </div>

                    <div className="relative z-10 max-w-2xl">
                        <h3 className="text-4xl md:text-6xl font-black uppercase mb-8 text-black leading-[0.85] tracking-tighter italic">
                            SYSTEMS ONLINE.
                        </h3>
                        <p className="text-black/80 font-syne font-bold text-xl mb-12 uppercase tracking-tight leading-tight">
                            Stop patching broken legacy systems. Architect the future of your platform today.
                        </p>
                        <a href="mailto:hello@arsonpixels.com?subject=Dev%20Project%20Inquiry"
                           className="inline-block px-12 py-6 bg-black text-white font-syne font-black uppercase text-[12px] tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-500 hover:scale-105"
                        >
                            Open Terminal
                        </a>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes scan { 
                    0% { transform: translateY(-200px); } 
                    100% { transform: translateY(600px); } 
                }
            `}</style>
        </section>
    );
};

export default DevAIPage;