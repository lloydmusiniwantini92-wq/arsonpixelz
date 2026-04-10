import React, { useState, useEffect, useRef } from 'react';
import { redirectToCheckoutLineItems, isStripeConfigured } from '../utils/stripe';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollReveal } from '../components/fx/ScrollReveal';
import { PageHeroBackground } from '../components/fx/PageHeroBackground';
import { BrutalistButton } from '../components/common/BrutalistButton';
import PhilosophyWhiteBg from '../assets/images/branding/branding4.jpg';
import branding1 from '../assets/images/branding/branding1.jpg';
import brandingHero from '../assets/images/branding/brandinghero.jpg';
import PhilosophyBg2 from '../components/assets/branding/philosophy_bg2.webp';
import { RevealText } from '../components/fx/RevealText';

gsap.registerPlugin(ScrollTrigger);

import { useIgnition } from '../components/layout/IgnitionRuntime';

const BrandingPage: React.FC = () => {
    const { lenis } = useIgnition();
    const [loaded, setLoaded] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const philosophyRef = useRef<HTMLDivElement>(null);
    const philosophyTextRef = useRef<HTMLHeadingElement>(null);
    const philosophyContent1Ref = useRef<HTMLDivElement>(null);
    const philosophyContent2Ref = useRef<HTMLDivElement>(null);
    const bg1Ref = useRef<HTMLDivElement>(null);
    const bg2Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
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

            // 4. Monumental Philosophy Scale (Galore Suite)
            if (philosophyRef.current && philosophyTextRef.current && philosophyContent1Ref.current && philosophyContent2Ref.current) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: philosophyRef.current,
                        start: 'top top',
                        end: '+=1500', // Further tightened to eliminate redundant scrolling
                        scrub: 1,
                        pin: true,
                    }
                });

                // Start animation
                tl.to(bg1Ref.current, { opacity: 1, duration: 0.1 })
                  .to(philosophyTextRef.current, { scale: 1, duration: 0.2 })
                  .to(philosophyTextRef.current, {
                    scale: 60,
                    opacity: 0,
                    ease: 'power4.in',
                    duration: 1.0
                  })
                  .addLabel("stage1")
                  
                  // STAGE 1: FIRST PAIR OF PROTOCOL CARDS FLY-IN
                  .fromTo(bg2Ref.current, { opacity: 1, clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0 0 0 0)', duration: 0.8, ease: 'power4.inOut' }, "stage1-=0.5")
                  .to(bg2Ref.current, { yPercent: -15, ease: 'none', duration: 1.2 }, "stage1")
                  .to(philosophyContent1Ref.current, { 
                    opacity: 1, 
                    pointerEvents: 'auto', 
                    duration: 0.4,
                    ease: 'power2.out'
                  }, "stage1-=0.2") 
                  .from(philosophyContent1Ref.current?.querySelectorAll('.group') || [], {
                    opacity: 0,
                    y: 100,
                    skewY: 5,
                    filter: 'blur(15px)',
                    stagger: 0.15,
                    duration: 0.6,
                    ease: 'power4.out'
                  }, "stage1-=0.1")
                  
                  // FIRST SCROLL AFTER APPEARING: START LEAVING
                  .addLabel("stage1Exit")
                  .to(philosophyContent1Ref.current, { 
                    opacity: 0, 
                    y: -60, 
                    filter: 'blur(10px)', 
                    duration: 0.6, 
                    ease: 'power2.in' 
                  }, "stage1Exit")

                  // SUBSEQUENT SCROLL: REVEAL NEW SET
                  .addLabel("stage2")
                  .to(philosophyContent2Ref.current, { 
                    opacity: 1, 
                    pointerEvents: 'auto', 
                    duration: 0.6,
                    ease: 'power2.out'
                  }, "stage2-=0.3") // Clear overlap
                  .from(philosophyContent2Ref.current?.querySelectorAll('.group') || [], {
                    opacity: 0,
                    y: 80,
                    skewY: 3,
                    filter: 'blur(10px)',
                    stagger: 0.15,
                    duration: 0.6,
                    ease: 'power4.out'
                  }, "stage2-=0.2")

                  // VERY NEXT SCROLL: START ANIMATION ON STAGE 2 TO PAVE WAY
                  .addLabel("stage2Exit")
                  .to(philosophyContent2Ref.current, { 
                    opacity: 0, 
                    y: -100, 
                    scale: 0.95,
                    filter: 'blur(20px)', 
                    duration: 0.8, 
                    ease: 'power2.inOut' 
                  }, "stage2Exit+=0.2");
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
            <div className="relative pt-36 md:pt-48 pb-32 px-6 md:px-12 max-w-[100rem] mx-auto overflow-hidden h-screen flex flex-col justify-center" style={{ background: '#000000' }}>
                <PageHeroBackground accentColor="#FF3E00" backgroundImage={brandingHero} offsetY={-200} brightness={0.55} showGrid={false} />
                <div className={`transition-all duration-1000 relative z-10 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h1 className="hero-title text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.8] mb-10 text-white" style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '0.005em' }}>
                        IGNITE <br />
                        <span className="text-[#FF3E00]">THE BRAND</span>
                    </h1>
                    <p className="hero-desc text-lg md:text-3xl font-mono text-white/50 max-w-5xl border-l-8 border-[#FF3E00] pl-10 uppercase font-bold">
                        YOUR BRAND IS THE SIGNAL. WE ARE THE POWER. WE FORGE IDENTITIES THAT BURN INTO THE CULTURAL CONSCIOUSNESS—IMPENETRABLE, IRREFUTABLE, UNFORGETTABLE.
                    </p>
                </div>
            </div>

            {/* PHILOSOPHY SECTION (MONUMENTAL BLEND) */}
            <div ref={philosophyRef} className="min-h-screen w-full bg-[#050505] text-[#FFFFFF] flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-1000">
                {/* Background Layer 1: Death Sentence */}
                <div 
                    ref={bg1Ref}
                    className="absolute inset-0 z-0 opacity-10 transition-opacity duration-700"
                    style={{ 
                        backgroundImage: `url(${PhilosophyWhiteBg})`, 
                        backgroundSize: 'cover', 
                        backgroundPosition: 'center',
                        filter: 'saturate(0) brightness(0.5) contrast(1.2)'
                    }}
                />
                
                {/* Light Grid Overlay */}
                <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: '4rem 4rem' }} />

                {/* Huge scalable text */}
                <h2 
                    ref={philosophyTextRef}
                    className="font-black uppercase tracking-tight text-white text-center leading-[0.85] absolute z-30 font-anton"
                    style={{ 
                        transformOrigin: "center center", 
                        fontSize: "clamp(48px, 15vw, 3200px)", 
                        fontFamily: 'Anton, sans-serif',
                        letterSpacing: '0.01em',
                        pointerEvents: 'none'
                    }}
                >
                    BLAND IS A <br/><span className="text-[#FF3E00]">DEATH SENTENCE.</span>
                </h2>

                {/* STAGE 1 CONTENT */}
                <div ref={philosophyContent1Ref} className="max-w-[100rem] w-full mx-auto px-6 md:px-12 absolute inset-0 flex items-center z-20 opacity-0 pointer-events-none mt-[10vh]">
                    <div className="grid md:grid-cols-2 gap-10 md:gap-20 w-full">
                        {/* Protocol Layer 1: The Warning (New) */}
                        <div className="group relative p-10 md:p-16 bg-black/80 backdrop-blur-xl border-l-[12px] border-[#FF3E00] shadow-[0_40px_100px_rgba(0,0,0,0.9)] overflow-hidden">
                            <h3 className="text-4xl md:text-7xl font-black uppercase text-white mb-8 leading-none" style={{ fontFamily: 'Anton, sans-serif' }}>SILENCE IS <br/><span className="text-[#FF3E00]">A VIRUS.</span></h3>
                            <p className="font-mono text-xl md:text-2xl text-white/70 font-bold leading-relaxed uppercase">
                                GENERIC BRANDS ARE BACKGROUND NOISE. WE ENGINEER TECTONIC SHIFTS IN PERCEPTION. IF YOUR AUDIENCE ISN'T REACTING, YOU'RE ALREADY DEAD.
                            </p>
                        </div>

                        {/* Protocol Layer 2: The Command (New) */}
                        <div className="group relative p-10 md:p-16 bg-[#0A0A0A]/90 border border-white/5 shadow-2xl overflow-hidden">
                            <h3 className="text-4xl md:text-7xl font-black uppercase text-white mb-8 leading-none" style={{ fontFamily: 'Anton, sans-serif' }}>CHAOS BY <br/>DESIGN.</h3>
                            <p className="font-mono text-lg md:text-xl text-white/60 font-bold leading-relaxed uppercase">
                                WE DO NOT FOLLOW TRENDS; WE CRASH THEM. BY INJECTING HIGH-FIDELITY DISRUPTION INTO EVERY TOUCHPOINT, WE ENSURE YOUR BRAND IS THE ONLY CONSTANT IN THE MARKET.
                            </p>
                        </div>
                    </div>
                </div>

                {/* STAGE 2 CONTENT (Original) */}
                <div ref={philosophyContent2Ref} className="max-w-[100rem] w-full mx-auto px-6 md:px-12 absolute inset-0 flex items-center z-20 opacity-0 pointer-events-none mt-[10vh]">
                    <div className="grid md:grid-cols-2 gap-10 md:gap-20 w-full">
                        {/* Protocol Layer 3: The Threat */}
                        <div className="group relative p-10 md:p-16 bg-black/80 backdrop-blur-xl border-l-[12px] border-[#FF3E00] shadow-[0_40px_100px_rgba(0,0,0,0.9)] overflow-hidden">
                            <h3 className="text-4xl md:text-7xl font-black uppercase text-white mb-8 leading-none" style={{ fontFamily: 'Anton, sans-serif' }}>SAFETY IS <br/><span className="text-[#FF3E00]">TERMINAL.</span></h3>
                            <p className="font-mono text-xl md:text-2xl text-white/70 font-bold leading-relaxed uppercase">
                                IN A SATURATED MARKET, WHISPERS ARE ERASED. WE ENGINEER IDENTITIES THAT SCREAM. BY FUSING INDUSTRIAL-GRADE DESIGN WITH PSYCHOLOGICAL DOMINATION, WE CREATE CULTURAL ANCHORS DISGUISED AS MARKS.
                            </p>
                        </div>

                        {/* Protocol Layer 4: The Command */}
                        <div className="group relative p-10 md:p-16 bg-[#0A0A0A]/90 border border-white/5 shadow-2xl overflow-hidden">
                            <h3 className="text-4xl md:text-7xl font-black uppercase text-white mb-8 leading-none" style={{ fontFamily: 'Anton, sans-serif' }}>APEX <br/>PREDATOR.</h3>
                            <p className="font-mono text-lg md:text-xl text-white/60 font-bold leading-relaxed uppercase">
                                WE DO NOT PERFORM REFLIFTS. WE PERFORM MOLECULAR RECONSTRUCTION. IF YOU SEEK GENTLE REFINEMENT, LEAVE NOW. IF YOU SEEK ABSOLUTE DOMINANCE IN YOUR SECTOR, INITIATE.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CAPABILITIES DEEP DIVE */}
            <div className="py-24 md:py-48 px-6 md:px-12 max-w-[100rem] mx-auto">
                <ScrollReveal staggerIndex={0}>
                    <div className="mb-32">
                        <h2 className="text-sm font-mono font-bold tracking-[0.5em] uppercase text-[#FF3E00] mb-6">Execution Modules</h2>
                        <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tight leading-none" style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '0.01em' }}>Strategic Domination</h3>
                    </div>
                </ScrollReveal>

                <div className="space-y-32">
                    {capabilities.map((cap, index) => (
                        <div key={cap.id} className={`grid lg:grid-cols-12 gap-20 items-center ${index % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''}`}>
                            
                            {/* Visual Side - Integrated Selected Works Images */}
                            <div className={`lg:col-span-6 h-[500px] bg-[#0A0A0A] border border-white/5 relative overflow-hidden group shadow-2xl ${index % 2 !== 0 ? 'lg:col-start-7' : ''}`}>
                                <ScrollReveal staggerIndex={1}>
                                    <div className="absolute inset-0 bg-black z-0">
                                        <img 
                                            src={index === 0 ? '/images/laradice/laradice_01.webp' : index === 1 ? branding1 : '/images/eataly/b1cbbd148768185.62dafea48505f.webp'} 
                                            alt={cap.title}
                                            className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-1000 grayscale group-hover:grayscale-0"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                                    <div className="absolute inset-0 border-[20px] border-black pointer-events-none z-20" />
                                    <div className="absolute inset-0 border border-white/10 m-8 transition-all duration-500 group-hover:m-6 z-30"></div>
                                    <span className="absolute bottom-10 right-10 text-8xl font-black text-white/10 font-mono select-none z-30">{cap.id}</span>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-[#FF3E00]/20 rounded-full animate-spin-slow z-30"></div>
                                </ScrollReveal>
                            </div>

                            {/* Content Side */}
                            <div className={`lg:col-span-6 flex flex-col ${index % 2 !== 0 ? 'lg:col-start-1 lg:col-end-7' : ''}`}>
                                <ScrollReveal staggerIndex={2}>
                                    <div className="flex items-center space-x-6 mb-8">
                                        <span className="font-mono text-sm tracking-widest uppercase opacity-40">{cap.subtitle}</span>
                                    </div>
                                    <h4 className="text-4xl md:text-6xl font-black uppercase tracking-normal mb-8 leading-[0.9]" style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '0.01em' }}>{cap.title}</h4>
                                    <p className="text-xl font-mono text-white/50 leading-relaxed mb-10 max-w-2xl font-bold uppercase">
                                        {cap.description}
                                    </p>
                                    
                                    <div className="mb-12">
                                        <h5 className="font-bold text-sm font-mono uppercase tracking-[0.2em] text-[#FF3E00] mb-6 border-b border-white/5 pb-4">Scope of Work:</h5>
                                        <ul className="grid grid-cols-1 gap-6">
                                            {cap.deliverables.map((item, i) => (
                                                <li key={i} className="flex items-center group/item">
                                                    <div className="w-3 h-3 bg-[#FF3E00] mr-4 rounded-full group-hover/item:scale-150 transition-transform shadow-[0_0_10px_rgba(255,62,0,0.5)]"></div>
                                                    <span className="font-mono text-lg text-white/80 group-hover/item:text-white transition-colors">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <BrutalistButton 
                                        label="Initiate Protocol"
                                        onClick={() => handleCheckout(cap.stripePriceId)}
                                        variant="orange"
                                        size="md"
                                    />
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
            <div className="px-6 md:px-12 max-w-[90rem] mx-auto pb-16">
                <div ref={ctaRef} className="relative p-8 md:p-14 bg-gradient-to-br from-[#FF3E00] to-[#E63900] overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <svg className="w-32 h-32 text-white animate-spin-slow" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" />
                            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
                        </svg>
                    </div>

                    <div className="relative z-10 max-w-2xl">
                        <h3 className="text-3xl md:text-5xl font-black uppercase mb-6 text-white leading-[0.9]">
                            READY TO DOMINATE?
                        </h3>
                        <p className="text-white/90 font-mono text-lg mb-10">
                            Stop blending in. Let's create an identity that dictates the rules of your market.
                        </p>
                        <BrutalistButton 
                            label="Open Comms"
                            href="mailto:hello@arsonpixels.com?subject=Brand%20Ignition%20Inquiry"
                            variant="black"
                            size="md"
                        />
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
