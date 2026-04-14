import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { redirectToCheckoutLineItems, isStripeConfigured } from '../utils/stripe';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PageHeroBackground } from '../components/fx/PageHeroBackground';
import GamingHeroBg from '../assets/site-static/mg.webp';
import { useIgnition } from '../components/layout/IgnitionRuntime';

gsap.registerPlugin(ScrollTrigger);

const GamingPage: React.FC = () => {
    const { lenis } = useIgnition();
    const [loaded, setLoaded] = useState(false);

    const containerRef = React.useRef<HTMLElement>(null);
    const bgGridRef = React.useRef<HTMLDivElement>(null);
    const plusRef = React.useRef<HTMLDivElement>(null);
    const headingRef = React.useRef<HTMLDivElement>(null);
    const descRef = React.useRef<HTMLDivElement>(null);
    const cardsRef = React.useRef<HTMLDivElement>(null);
    const statsRef = React.useRef<HTMLDivElement>(null);
    const ctaRef = React.useRef<HTMLDivElement>(null);

    // ── CINEMATIC TRANSITIONS (from cinematic_transitions skill) ──────────────
    // Custom expensive-feeling cubic-bezier: [0.76, 0, 0.24, 1]
    const CINEMATIC_EASE = 'cubic-bezier(0.76, 0, 0.24, 1)';

    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
        window.scrollTo(0, 0);
        const timer = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(timer);
    }, [lenis]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!containerRef.current) return;

            // ── 1. CINEMATIC PAGE WIPE ─────────────────────────────────────────
            // Skill: opacity:0, blur(10px), scale:1.05 → normal
            // Applied to the whole page on mount
            gsap.from(containerRef.current, {
                opacity: 0,
                filter: 'blur(10px)',
                scale: 1.05,
                duration: 1.4,
                ease: CINEMATIC_EASE,
                clearProps: 'filter,scale'
            });

            // ── 2. PARALLAX SCROLL ARCHITECT ──────────────────────────────────
            // Skill: containerY: [150→0], opacity: [0,0.2,0.8,1]→[0,1,1,0]
            // inner text-blocks move at counter rate for depth

            // Background grid drifts opposite direction for max depth layer
            if (bgGridRef.current) {
                gsap.to(bgGridRef.current, {
                    y: '30%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 1.5
                    }
                });
            }

            // Plus icon parallax (deeper plane)
            if (plusRef.current) {
                gsap.to(plusRef.current, {
                    y: '50%',
                    rotation: 120,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 2.5
                    }
                });
            }

            // Hero heading — cinematic blur-in from left (HUD glitch)
            if (headingRef.current && descRef.current) {
                const heroTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: 'top 85%'
                    }
                });
                heroTl
                    .from(headingRef.current, {
                        opacity: 0,
                        x: -40,
                        filter: 'blur(8px) hue-rotate(90deg)',
                        duration: 1.4,
                        ease: CINEMATIC_EASE,
                        clearProps: 'filter'
                    })
                    .from(descRef.current, {
                        opacity: 0,
                        y: 30,
                        filter: 'blur(4px)',
                        duration: 1.0,
                        ease: CINEMATIC_EASE,
                        clearProps: 'filter'
                    }, '-=0.8');
            }

            // Service Cards — Parallax Scroll Architect pattern
            // Each card: enter from y:150, opacity:0 → fade out at bottom
            if (cardsRef.current) {
                const cards = gsap.utils.toArray<HTMLElement>('.gaming-card');
                cards.forEach((card, i) => {
                    // Container enters from below (the 150→0 parallax slide)
                    gsap.fromTo(card,
                        { opacity: 0, y: 150, filter: 'blur(8px)' },
                        {
                            opacity: 1,
                            y: 0,
                            filter: 'blur(0px)',
                            duration: 1.4,
                            delay: i * 0.12,
                            ease: CINEMATIC_EASE,
                            clearProps: 'filter',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 90%',
                                once: true
                            }
                        }
                    );

                    // Inner title counter-scrolls upward (depth layer)
                    const title = card.querySelector('h3');
                    if (title) {
                        gsap.fromTo(title,
                            { y: '20%' },
                            {
                                y: '-10%',
                                ease: 'none',
                                scrollTrigger: {
                                    trigger: card,
                                    start: 'top bottom',
                                    end: 'bottom top',
                                    scrub: 1.2
                                }
                            }
                        );
                    }
                });
            }

            // Stats — parallax entrance with stagger, fade out at scroll bottom
            if (statsRef.current) {
                const statNodes = gsap.utils.toArray<HTMLElement>('.stat-node');
                statNodes.forEach((node, i) => {
                    gsap.fromTo(node,
                        { opacity: 0, y: 100, filter: 'blur(6px)' },
                        {
                            opacity: 1,
                            y: 0,
                            filter: 'blur(0px)',
                            duration: 1.2,
                            delay: i * 0.1,
                            ease: CINEMATIC_EASE,
                            clearProps: 'filter',
                            scrollTrigger: {
                                trigger: statsRef.current,
                                start: 'top 85%',
                                once: true
                            }
                        }
                    );
                });
            }

            // CTA — Cinematic Page Wipe variant: blur + clip expansion
            if (ctaRef.current) {
                gsap.fromTo(ctaRef.current,
                    {
                        opacity: 0,
                        clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
                        filter: 'blur(10px)',
                        scale: 1.02
                    },
                    {
                        opacity: 1,
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                        filter: 'blur(0px)',
                        scale: 1,
                        duration: 1.4,
                        ease: CINEMATIC_EASE,
                        clearProps: 'filter,scale',
                        scrollTrigger: {
                            trigger: ctaRef.current,
                            start: 'top 85%',
                            once: true
                        }
                    }
                );

                // CTA inner content counter-scrolls for depth
                const ctaInner = ctaRef.current.querySelector('.relative.z-10');
                if (ctaInner) {
                    gsap.fromTo(ctaInner,
                        { y: '15%' },
                        {
                            y: '-5%',
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

    const services = [
        {
            title: "GAME UI/UX DESIGN",
            description: "Interfaces that enhance gameplay without getting in the way. We design HUDs, menus, and systems that feel native to your world.",
            stripePriceId: 'price_mock_gaming_uiux'
        },
        {
            title: "CHARACTER & ASSET DESIGN",
            description: "Heroes, villains, and everything between. We create memorable characters and assets that define your game's visual identity.",
            stripePriceId: 'price_mock_gaming_assets'
        },
        {
            title: "GAME BRANDING & MARKETING",
            description: "Launch campaigns that build hype and community. From key art to trailers, we position your game for maximum impact.",
            stripePriceId: 'price_mock_gaming_marketing'
        },
        {
            title: "INTERACTIVE EXPERIENCES",
            description: "Web-based games, AR filters, and branded interactions. We blur the lines between game and marketing.",
            stripePriceId: 'price_mock_gaming_interactive'
        }
    ];

    return (
        <section ref={containerRef} className="relative min-h-screen w-full pb-24 overflow-hidden bg-[#000000] text-[#FFFFFF]">

            {/* ── HERO SECTION with homepage-level background ── */}
            <div className="relative px-6 md:px-12 pt-36 md:pt-48 pb-32 overflow-hidden" style={{ background: '#000000', maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)' }}>
                <PageHeroBackground accentColor="#FF3E00" backgroundImage={GamingHeroBg} />


                {/* Decorative Plus Icon */}
                <div
                    ref={plusRef}
                    className={`absolute right-[15%] top-[15%] text-[20vw] leading-none font-black text-[#FF3E00]/10 select-none pointer-events-none transition-all duration-[2000ms] ease-out z-10 ${loaded ? 'opacity-100 rotate-45' : 'opacity-0 rotate-0'}`}
                >
                    +
                </div>

                <div className="relative z-10">

                    {/* Main Heading */}
                    <div ref={headingRef} className="mb-16 md:mb-24">
                        <div className="overflow-hidden mb-8">
                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white leading-[0.8]" style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '0.01em' }}>
                                INDUSTRIAL <br /> ENTERTAINMENT
                            </h1>
                        </div>
                        <div className="overflow-hidden">
                            <h2 className="text-xl md:text-2xl font-mono text-white/20 uppercase tracking-[0.5em] font-bold">
                                LEGACY_WORLD_BUILDING
                            </h2>
                        </div>
                    </div>

                    {/* Description */}
                    <div ref={descRef} className="max-w-3xl">
                        <p className="text-lg md:text-3xl font-mono text-white/50 leading-relaxed border-l-8 border-[#FF3E00] pl-10 uppercase font-bold">
                            WE ARCHITECT IMMERSIVE ECOSYSTEMS. FROM INDIE TITLES TO AAA FRANCHISES, WE ENGINEER THE VISUAL NARRATIVES THAT ANCHOR GLOBAL PLAYER COMMUNITIES.
                        </p>
                    </div>
                </div>
            </div>


            {/* Animated Grid Background */}
            <div ref={bgGridRef} className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,62,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,62,0,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] animate-pulse"
                    style={{ animationDuration: '8s' }}
                />
            </div>


            <div className="relative z-10 px-6 md:px-12">

                {/* Services Grid */}
                <div ref={cardsRef} className="grid md:grid-cols-2 gap-8 md:gap-12 mb-24">
                    {services.map((service, idx) => (
                        <div key={idx} className="gaming-card group h-[450px] relative overflow-hidden flex flex-col justify-end bg-[#0A0A0A] border border-white/10 p-10 hover:border-[#FF3E00]/60 transition-all duration-700">
                            <img 
                                src="/gaming_monolith.webp"
                                alt={service.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-1000 grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

                            <div className="relative z-20">
                                <h3 className="text-3xl md:text-5xl font-black uppercase mb-6 text-white leading-none" style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '0.010em' }}>
                                    {service.title}
                                </h3>

                                <p className="text-md font-mono text-white/50 leading-relaxed mb-10 font-bold uppercase">
                                    {service.description}
                                </p>

                                <button
                                    onClick={() => handleCheckout(service.stripePriceId)}
                                    className="px-10 py-5 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-[#FF3E00] hover:text-white transition-all transform active:scale-95"
                                >
                                    Force Protocol
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div ref={statsRef} className={`
                    mb-24 grid md:grid-cols-4 gap-8
                `}>
                    {[
                        { label: 'PROJECTS SHIPPED', value: '50+' },
                        { label: 'PLATFORMS', value: 'ALL' },
                        { label: 'PLAYER RATING', value: '5★' },
                        { label: 'AWARDS WON', value: '12+' }
                    ].map((stat, idx) => (
                        <div key={idx} className="stat-node text-center p-6 bg-white/5 rounded-lg border border-white/5">
                            <div className="text-4xl md:text-5xl font-black text-[#FF3E00] mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                                {stat.value}
                            </div>
                            <div className="text-xs font-mono text-white/40 uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div ref={ctaRef} className={`
                    relative p-8 md:p-14 rounded-2xl bg-gradient-to-br from-[#FF3E00] to-[#E63900]
                    overflow-hidden
                `}>

                    <div className="absolute inset-0 bg-[url('/site-static/noise.svg')] opacity-20 mix-blend-overlay" />

                    <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(0,0,0,0.1)_50%,transparent_100%)] bg-[length:100%_4px] animate-pulse pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h3 className="text-3xl md:text-5xl font-black uppercase mb-4 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                                READY PLAYER ONE?
                            </h3>
                            <p className="text-white/80 font-mono text-lg max-w-xl">
                                Let's create gaming experiences that players will never forget.
                            </p>
                        </div>

                        <a
                            href="mailto:hello@arsonpixels.com?subject=Gaming%20Project%20Inquiry"
                            className="group px-8 py-4 bg-white text-[#FF3E00] rounded-full font-mono font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-300 whitespace-nowrap border-2 border-white hover:border-black"
                        >
                            <span className="inline-flex items-center gap-2">
                                START QUEST
                                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default GamingPage;
