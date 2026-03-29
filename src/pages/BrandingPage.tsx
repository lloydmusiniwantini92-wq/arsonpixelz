import React, { useState, useEffect, useRef } from 'react';
import { redirectToCheckoutLineItems, isStripeConfigured } from '../utils/stripe';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollReveal } from '../components/fx/ScrollReveal';
import { PageHeroBackground } from '../components/fx/PageHeroBackground';

gsap.registerPlugin(ScrollTrigger);

const BrandingPage: React.FC = () => {
    const [loaded, setLoaded] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const philosophyRef = useRef<HTMLDivElement>(null);
    const philosophyTextRef = useRef<HTMLHeadingElement>(null);
    const philosophyContentRef = useRef<HTMLDivElement>(null);

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

            // 4. Monumental Philosophy Scale (Existing)
            if (philosophyRef.current && philosophyTextRef.current && philosophyContentRef.current) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: philosophyRef.current,
                        start: 'top top',
                        end: '+=1500', // Pin for a long scroll distance
                        scrub: 1,
                        pin: true,
                    }
                });

                // Add a dummy tween to hold the text at scale 1 for the first 30% of the scroll timeline
                tl.to(philosophyTextRef.current, { scale: 1, duration: 0.3 })
                  .to(philosophyTextRef.current, {
                    scale: 30, // Aggressive scale
                    opacity: 0,
                    ease: 'power2.in',
                  })
                  .from(philosophyContentRef.current, {
                    opacity: 0,
                    y: 50,
                    duration: 0.5
                }, "-=0.3"); // Reveal content before text fully dissipates
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
            title: "LOGO & IDENTITY SYSTEMS",
            subtitle: "The Visual Anchor",
            description: "Iconic marks that become cultural symbols. We don't just design logos; we engineer visual anchors that command attention, scale flawlessly across digital and physical mediums, and live in memory forever.",
            deliverables: ["Primary & Secondary Marks", "Color & Typography Systems", "Comprehensive Brand Guidelines", "Scalable Asset Library"],
            stripePriceId: 'price_mock_branding_logo'
        },
        {
            id: "02",
            title: "BRAND VOICE & STRATEGY",
            subtitle: "The Narrative Code",
            description: "Your story, amplified and weaponized. We architect brand narratives that resonate deeply with your target demographic and differentiate ruthlessly against competitors. Silence the noise with a singular voice.",
            deliverables: ["Core Brand Positioning", "Tone & Voice Guidelines", "Messaging Frameworks", "Competitor Matrix Analysis"],
            stripePriceId: 'price_mock_branding_voice'
        },
        {
            id: "03",
            title: "UI/UX DESIGN",
            subtitle: "The Digital Experience",
            description: "Interfaces so intuitive, they feel inevitable. We craft digital experiences that users can't help but love. By merging striking aesthetics with conversion-optimized user flows, we turn visitors into disciples.",
            deliverables: ["User Flow Architecture", "Wireframing & Prototyping", "High-Fidelity Interface Design", "Interaction Motion Specs"],
            stripePriceId: 'price_mock_branding_uiux'
        },
    ];

    const processes = [
        { num: "I", title: "THE AUDIT", desc: "We deconstruct your current market position, auditing competitors and identifying the creative voids where your brand can dominate." },
        { num: "II", title: "THE BLUEPRINT", desc: "We engineer the strategic foundation—defining the voice, identity rules, and visual logic that will govern the entire ecosystem." },
        { num: "III", title: "THE IGNITION", desc: "We execute. Rolling out the high-fidelity assets, guidelines, and interfaces that bring the newly forged identity to the public." }
    ];

    return (
        <section ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-[#000000] text-[#FFFFFF]">
            
            {/* HER0 HEADER */}
            <div className="relative pt-28 md:pt-32 pb-28 px-6 md:px-12 max-w-[100rem] mx-auto overflow-hidden" style={{ background: '#000000' }}>
                <PageHeroBackground accentColor="#FF3E00" />
                <div className={`transition-all duration-1000 relative z-10 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-block px-4 py-1 mb-8 border border-white/20">
                        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/60">Sector // Brand Ignition</span>
                    </div>
                    <h1 className="hero-title text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-8 text-white">
                        IGNITE <br />
                        <span className="text-[#FF3E00]">THE BRAND</span>
                    </h1>
                    <p className="hero-desc text-xl md:text-3xl font-mono text-white/60 max-w-4xl border-l-4 border-[#FF3E00] pl-6">
                        Your brand is the smoke that signals the fire. We forge identities that burn into memory—impossible to ignore, impossible to forget.
                    </p>
                </div>
            </div>

            {/* PHILOSOPHY SECTION (MONUMENTAL SCROLL) */}
            <div ref={philosophyRef} className="h-screen w-full bg-[#050505] text-[#FFFFFF] flex flex-col items-center justify-center relative overflow-hidden">
                {/* Huge scalable text centered initially */}
                <h2 
                    ref={philosophyTextRef}
                    className="font-black uppercase tracking-tighter text-white/90 text-center leading-none absolute z-10"
                    style={{ transformOrigin: "center center", fontSize: "clamp(16px, 3.8vw, 80px)" }}
                >
                    BLAND IS A <span className="text-[#FF3E00]">DEATH SENTENCE.</span>
                </h2>

                {/* Content that fades in as text scales out */}
                <div ref={philosophyContentRef} className="max-w-[90rem] mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 relative z-20 opacity-100">
                    <p className="font-mono text-xl md:text-2xl text-white/80 leading-relaxed bg-black/50 p-6 backdrop-blur-sm border-l-4 border-[#FF3E00]">
                        In a saturated digital landscape, safety is your greatest liability. Brands that whisper are ignored. We engineer identities that scream. By fusing industrial-grade design with psychological insight, we create cultural anchors disguised as corporate marks.
                    </p>
                    <p className="font-mono text-xl md:text-2xl text-white/80 leading-relaxed bg-black/50 p-6 backdrop-blur-sm">
                        We don't do minor facelifts. We do complete molecular reconstruction. If you are looking for a gentle refinement, you are in the wrong place. If you are looking to become an apex predator in your sector, read on.
                    </p>
                </div>
            </div>

            {/* CAPABILITIES DEEP DIVE */}
            <div className="py-32 px-6 md:px-12 max-w-[90rem] mx-auto">
                <ScrollReveal staggerIndex={0}>
                    <div className="mb-24">
                        <h2 className="text-sm font-mono font-bold tracking-[0.3em] uppercase text-[#FF3E00] mb-4">Core Deliverables</h2>
                        <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Strategic Capabilities</h3>
                    </div>
                </ScrollReveal>

                <div className="space-y-32">
                    {capabilities.map((cap, index) => (
                        <div key={cap.id} className={`grid lg:grid-cols-12 gap-12 items-center ${index % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''}`}>
                            
                            {/* Visual Abstract side */}
                            <div className={`lg:col-span-5 h-[400px] bg-[#0A0A0A] border border-white/5 relative overflow-hidden flex items-center justify-center p-8 group ${index % 2 !== 0 ? 'lg:col-start-8' : ''}`}>
                                <ScrollReveal staggerIndex={1}>
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                                    <div className="absolute inset-0 border border-white/10 m-4 transition-all duration-500 group-hover:m-2"></div>
                                    <span className="text-[12rem] font-black text-white/5 font-mono select-none transition-transform duration-700 group-hover:scale-110">{cap.id}</span>
                                    <div className="absolute w-24 h-24 border border-[#FF3E00] rounded-full animate-spin-slow opacity-50"></div>
                                    <div className="absolute w-2 h-2 bg-[#FF3E00] rounded-full animate-ping"></div>
                                </ScrollReveal>
                            </div>

                            {/* Content Side */}
                            <div className={`lg:col-span-7 flex flex-col ${index % 2 !== 0 ? 'lg:col-start-1 lg:col-end-8' : ''}`}>
                                <ScrollReveal staggerIndex={2}>
                                    <div className="flex items-center space-x-4 mb-4">
                                        <span className="font-mono text-sm font-bold text-[#FF3E00]">/ {cap.id}</span>
                                        <span className="font-mono text-xs tracking-widest uppercase opacity-50">{cap.subtitle}</span>
                                    </div>
                                    <h4 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">{cap.title}</h4>
                                    <p className="text-lg font-mono text-white/70 leading-relaxed mb-8 max-w-2xl">
                                        {cap.description}
                                    </p>
                                    
                                    <div className="mb-10">
                                        <h5 className="font-bold text-xs font-mono uppercase tracking-widest text-white/30 mb-4 border-b border-white/10 pb-2">Included Artifacts:</h5>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {cap.deliverables.map((item, i) => (
                                                <li key={i} className="flex items-start">
                                                    <div className="w-1.5 h-1.5 bg-[#FF3E00] mt-2 mr-3 rounded-full flex-shrink-0"></div>
                                                    <span className="font-mono text-sm text-white/80">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <button 
                                        onClick={() => handleCheckout(cap.stripePriceId)}
                                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#FF3E00] hover:text-white transition-colors w-max"
                                    >
                                        Initiate Protocol
                                    </button>
                                </ScrollReveal>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* METHODOLOGY SECTION */}
            <div className="bg-[#000000] border-t-2 border-white/5 py-32 px-6 md:px-12 overflow-hidden">
                <div className="max-w-[90rem] mx-auto">
                    <ScrollReveal staggerIndex={0}>
                        <div className="mb-20">
                            <h2 className="text-sm font-mono font-bold tracking-[0.3em] uppercase text-[#FF3E00] mb-4">The Methodology</h2>
                            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Ignition Sequence</h3>
                        </div>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
                        <div className="hidden md:block absolute top-[40px] left-0 w-full h-[2px] bg-white/5 -z-10"></div>
                        {processes.map((step, index) => (
                            <ScrollReveal key={step.num} staggerIndex={index + 1}>
                                <div className="bg-[#0A0A0A] p-8 md:p-10 border border-white/5 hover:border-[#FF3E00] transition-colors h-full flex flex-col">
                                    <div className="w-16 h-16 bg-white/5 text-[#FF3E00] font-bold font-mono flex items-center justify-center text-xl mb-8 group-hover:scale-110 transition-transform">
                                        {step.num}
                                    </div>
                                    <h4 className="text-2xl font-black uppercase mb-4 text-white">{step.title}</h4>
                                    <p className="font-mono text-sm text-white/50 leading-relaxed flex-grow">
                                        {step.desc}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>

            {/* BOTTOM CTA */}
            <div className="px-6 md:px-12 max-w-[90rem] mx-auto pb-32">
                <div ref={ctaRef} className="relative p-12 md:p-20 bg-gradient-to-br from-[#FF3E00] to-[#E63900] overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <svg className="w-32 h-32 text-white animate-spin-slow" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" />
                            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
                        </svg>
                    </div>

                    <div className="relative z-10 max-w-2xl">
                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-6 text-white leading-[0.9]">
                            READY TO DOMINATE?
                        </h3>
                        <p className="text-white/90 font-mono text-lg mb-10">
                            Stop blending in. Let's create an identity that dictates the rules of your market.
                        </p>
                        <a href="mailto:hello@arsonpixels.com?subject=Brand%20Ignition%20Inquiry"
                           className="inline-block px-10 py-5 bg-black text-white font-mono font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                        >
                            Open Comms
                        </a>
                    </div>
                </div>
            </div>

            <style>{`
                .animate-spin-slow { animation: spin 15s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </section>
    );
};

export default BrandingPage;