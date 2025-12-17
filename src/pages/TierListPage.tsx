import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TierListPage: React.FC = () => {
    const [loaded, setLoaded] = useState(false);
    const [activeFilter, setActiveFilter] = useState<'all' | 'fire' | 'heat' | 'spark'>('all');

    useEffect(() => {
        window.scrollTo(0, 0);
        const timer = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const tiers = [
        {
            rank: 'S',
            label: 'INFERNO TIER',
            subtitle: 'Maximum Heat',
            color: '#D16D6A',
            gradient: 'from-[#D16D6A] to-[#B04E4B]',
            bgGlow: 'bg-[#D16D6A]',
            products: [
                {
                    title: 'Full Brand Transformation',
                    category: 'fire',
                    description: 'Complete visual identity overhaul',
                    metrics: { impact: 100, duration: '12-16 weeks', investment: '$$$$$' }
                },
                {
                    title: 'AAA Game Launch Campaign',
                    category: 'fire',
                    description: 'End-to-end gaming experience',
                    metrics: { impact: 100, duration: '16-24 weeks', investment: '$$$$$' }
                }
            ]
        },
        {
            rank: 'A',
            label: 'BLAZE TIER',
            subtitle: 'High Temperature',
            color: '#E88B87',
            gradient: 'from-[#E88B87] to-[#D16D6A]',
            bgGlow: 'bg-[#E88B87]',
            products: [
                {
                    title: 'Website + E-Commerce Platform',
                    category: 'heat',
                    description: 'Full-stack digital storefront',
                    metrics: { impact: 90, duration: '8-12 weeks', investment: '$$$$' }
                },
                {
                    title: 'Game UI/UX Design System',
                    category: 'heat',
                    description: 'Complete interface overhaul',
                    metrics: { impact: 88, duration: '6-10 weeks', investment: '$$$$' }
                },
                {
                    title: 'Marketing Campaign Suite',
                    category: 'heat',
                    description: 'Multi-channel brand amplification',
                    metrics: { impact: 85, duration: '4-8 weeks', investment: '$$$$' }
                }
            ]
        },
        {
            rank: 'B',
            label: 'FLAME TIER',
            subtitle: 'Sustained Burn',
            color: '#F5A9A5',
            gradient: 'from-[#F5A9A5] to-[#E88B87]',
            bgGlow: 'bg-[#F5A9A5]',
            products: [
                {
                    title: 'Brand Identity Package',
                    category: 'spark',
                    description: 'Logo, colors, typography system',
                    metrics: { impact: 75, duration: '4-6 weeks', investment: '$$$' }
                },
                {
                    title: 'Custom Web Application',
                    category: 'spark',
                    description: 'React/Node full-stack build',
                    metrics: { impact: 80, duration: '6-8 weeks', investment: '$$$' }
                },
                {
                    title: 'Character Design Suite',
                    category: 'spark',
                    description: '5-10 hero/villain concepts',
                    metrics: { impact: 72, duration: '3-5 weeks', investment: '$$$' }
                }
            ]
        },
        {
            rank: 'C',
            label: 'EMBER TIER',
            subtitle: 'Core Ignition',
            color: '#FFCDC9',
            gradient: 'from-[#FFCDC9] to-[#F5A9A5]',
            bgGlow: 'bg-[#FFCDC9]',
            products: [
                {
                    title: 'Landing Page Design',
                    category: 'spark',
                    description: 'Single high-converting page',
                    metrics: { impact: 65, duration: '2-3 weeks', investment: '$$' }
                },
                {
                    title: 'Social Media Brand Kit',
                    category: 'spark',
                    description: 'Templates + guidelines',
                    metrics: { impact: 60, duration: '1-2 weeks', investment: '$$' }
                },
                {
                    title: 'Mobile App Prototype',
                    category: 'spark',
                    description: 'Interactive MVP design',
                    metrics: { impact: 68, duration: '3-4 weeks', investment: '$$' }
                }
            ]
        }
    ];

    const filters = [
        { id: 'all', label: 'ALL PRODUCTS', icon: '🔥' },
        { id: 'fire', label: 'ENTERPRISE', icon: '🌋' },
        { id: 'heat', label: 'GROWTH', icon: '🔥' },
        { id: 'spark', label: 'IGNITION', icon: '✨' }
    ];

    const filteredTiers = tiers.map(tier => ({
        ...tier,
        products: tier.products.filter(p =>
            activeFilter === 'all' || p.category === activeFilter
        )
    })).filter(tier => tier.products.length > 0);

    return (
        <section className="relative min-h-screen w-full px-6 md:px-12 pt-32 md:pt-40 pb-24 overflow-hidden bg-[#050505]">

            {/* Background Code Pattern */}
            <div className="absolute inset-0 overflow-hidden opacity-[0.04] pointer-events-none">
                <pre className="text-[#D16D6A] text-[10px] leading-loose font-mono">
                    {`const tierSystem = { S: 'INFERNO', A: 'BLAZE', B: 'FLAME', C: 'EMBER' };
const rankProducts = (impact) => impact > 95 ? 'S' : impact > 85 ? 'A' : impact > 70 ? 'B' : 'C';
export const ignite = () => tiers.map(tier => tier.products.filter(p => p.impact > threshold));`.repeat(100)}
                </pre>
            </div>

            {/* Animated Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(209,109,106,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(209,109,106,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

            {/* Glowing Orbs */}
            <div className="absolute top-40 right-20 w-96 h-96 bg-[#D16D6A] rounded-full blur-[200px] opacity-10 animate-pulse" style={{ animationDuration: '12s' }} />
            <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-[#D16D6A] rounded-full blur-[250px] opacity-8 animate-pulse" style={{ animationDuration: '18s' }} />

            {/* Decorative "S" Tier Mark */}
            <div
                className={`
                    absolute right-[5%] top-[10%]
                    text-[25vw] leading-none font-black text-[#D16D6A]/5
                    select-none pointer-events-none
                    transition-all duration-[2500ms] ease-out
                    ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
                `}
                style={{ fontFamily: 'Syne, sans-serif' }}
            >
                S
            </div>

            <div className="relative z-10">

                {/* Header */}
                <div className={`
                    mb-16 md:mb-20
                    transition-all duration-1000 delay-100
                    ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}
                `}>
                    {/* Category Tag */}
                    <div className="inline-block px-6 py-2 rounded-full bg-[#D16D6A] text-white font-mono text-xs font-bold uppercase tracking-[0.3em] mb-8">
                        TIER SYSTEM
                    </div>

                    {/* Main Title */}
                    <div className="overflow-hidden mb-4">
                        <h1 className={`
                            text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter text-[#EBE9DF]
                            transition-transform duration-1200 delay-200
                            ${loaded ? 'translate-y-0' : 'translate-y-full'}
                        `} style={{ fontFamily: 'Syne, sans-serif' }}>
                            PRODUCT RANKING
                        </h1>
                    </div>

                    <div className="overflow-hidden">
                        <h2 className={`
                            text-2xl md:text-4xl font-black uppercase tracking-tighter text-transparent
                            transition-transform duration-1200 delay-300
                            ${loaded ? 'translate-y-0' : 'translate-y-full'}
                        `} style={{
                                fontFamily: 'Syne, sans-serif',
                                WebkitTextStroke: '1px rgba(235,233,223,0.25)'
                            }}>
                            IGNITION POWER SCALE
                        </h2>
                    </div>
                </div>

                {/* Description */}
                <div className={`
                    max-w-4xl mb-16 md:mb-20
                    transition-all duration-1000 delay-400
                    ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}>
                    <p className="text-base md:text-xl font-mono text-white/70 leading-relaxed border-l-4 border-[#D16D6A] pl-6">
                        From <strong className="text-white">enterprise transformations</strong> to targeted ignition projects—
                        every offering is ranked by <span className="text-[#D16D6A]">impact potential</span>,
                        <span className="text-[#D16D6A]"> execution complexity</span>, and
                        <span className="text-[#D16D6A]"> fire temperature</span>.
                        Pick your tier. Start your burn.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className={`
                    flex flex-wrap gap-3 mb-12 md:mb-16
                    transition-all duration-1000 delay-500
                    ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}>
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id as any)}
                            className={`
                                px-6 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-wider
                                transition-all duration-300 border-2
                                ${activeFilter === filter.id
                                    ? 'bg-[#D16D6A] text-white border-[#D16D6A] shadow-[0_0_20px_rgba(209,109,106,0.5)]'
                                    : 'bg-transparent text-white/60 border-white/20 hover:border-[#D16D6A] hover:text-white'
                                }
                            `}
                        >
                            <span className="mr-2">{filter.icon}</span>
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Tier List */}
                <div className="space-y-8 md:space-y-12">
                    {filteredTiers.map((tier, tierIdx) => (
                        <div
                            key={tier.rank}
                            className={`
                                transition-all duration-1000
                                ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                            `}
                            style={{ transitionDelay: `${600 + tierIdx * 150}ms` }}
                        >
                            {/* Tier Header */}
                            <div className="flex items-stretch gap-4 mb-4">
                                {/* Rank Badge */}
                                <div className={`
                                    relative w-24 md:w-32 flex-shrink-0 flex flex-col items-center justify-center
                                    rounded-xl bg-gradient-to-br ${tier.gradient} p-[3px] overflow-hidden
                                    shadow-[0_0_30px_rgba(209,109,106,0.3)]
                                `}>
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                                    <div className="relative z-10 text-center">
                                        <div className="text-5xl md:text-6xl font-black text-white mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
                                            {tier.rank}
                                        </div>
                                        <div className="text-[8px] md:text-[9px] font-mono font-bold uppercase tracking-widest text-white/80">
                                            TIER
                                        </div>
                                    </div>
                                </div>

                                {/* Tier Info */}
                                <div className="flex-1 flex flex-col justify-center">
                                    <h3 className="text-2xl md:text-3xl font-black uppercase text-white mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
                                        {tier.label}
                                    </h3>
                                    <p className="text-xs md:text-sm font-mono text-white/50 uppercase tracking-wider">
                                        {tier.subtitle} • {tier.products.length} Product{tier.products.length !== 1 ? 's' : ''}
                                    </p>
                                </div>
                            </div>

                            {/* Products Grid */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {tier.products.map((product, idx) => (
                                    <div
                                        key={idx}
                                        className="group relative p-6 bg-[#0F0F0F] rounded-lg border-2 border-white/10 hover:border-[#D16D6A] transition-all duration-500 overflow-hidden"
                                    >
                                        {/* Glow Effect */}
                                        <div className={`absolute inset-0 ${tier.bgGlow} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`} />

                                        {/* Content */}
                                        <div className="relative z-10">
                                            {/* Product Header */}
                                            <div className="flex items-start justify-between mb-4">
                                                <h4 className="text-lg font-black uppercase text-white group-hover:text-[#D16D6A] transition-colors leading-tight flex-1" style={{ fontFamily: 'Syne, sans-serif' }}>
                                                    {product.title}
                                                </h4>

                                                {/* Impact Badge */}
                                                <div className="ml-2 px-2 py-1 rounded bg-white/5 border border-white/10">
                                                    <span className="text-xs font-mono font-bold" style={{ color: tier.color }}>
                                                        {product.metrics.impact}%
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-xs font-mono text-white/60 mb-4 leading-relaxed">
                                                {product.description}
                                            </p>

                                            {/* Metrics */}
                                            <div className="space-y-2 pb-4 mb-4 border-b border-white/10">
                                                <div className="flex justify-between text-[10px] font-mono">
                                                    <span className="text-white/40 uppercase tracking-wider">Duration</span>
                                                    <span className="text-white/80 font-bold">{product.metrics.duration}</span>
                                                </div>
                                                <div className="flex justify-between text-[10px] font-mono">
                                                    <span className="text-white/40 uppercase tracking-wider">Investment</span>
                                                    <span className="text-white/80 font-bold">{product.metrics.investment}</span>
                                                </div>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full bg-gradient-to-r ${tier.gradient} transition-all duration-1000 delay-100 group-hover:scale-x-100`}
                                                    style={{
                                                        width: `${product.metrics.impact}%`,
                                                        transformOrigin: 'left'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Footer */}
                <div className={`
                    mt-20 md:mt-32 relative p-12 md:p-16 rounded-2xl bg-gradient-to-br from-[#D16D6A] to-[#B04E4B]
                    overflow-hidden
                    transition-all duration-1000 delay-1000
                    ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                `}>
                    {/* Noise Overlay */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

                    {/* Animated Scanlines */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(0,0,0,0.05)_50%,transparent_100%)] bg-[length:100%_4px] animate-pulse pointer-events-none" />

                    <div className="relative z-10 text-center max-w-3xl mx-auto">
                        <h3 className="text-3xl md:text-5xl font-black uppercase mb-6 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                            CHOOSE YOUR TIER
                        </h3>
                        <p className="text-white/90 font-mono text-base md:text-lg mb-8 leading-relaxed">
                            Not sure which tier fits your vision? Let's talk. We'll analyze your goals,
                            match you with the perfect ignition level, and get your fire started.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="mailto:hello@arsonpixels.com?subject=Tier%20Consultation%20Request"
                                className="group px-8 py-4 bg-white text-[#D16D6A] rounded-full font-mono font-bold uppercase tracking-wider hover:bg-[#0a0a0a] hover:text-white transition-all duration-300 inline-flex items-center justify-center gap-2 border-2 border-white hover:border-[#0a0a0a]"
                            >
                                START CONVERSATION
                                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>

                            <Link
                                to="/"
                                className="px-8 py-4 bg-transparent text-white rounded-full font-mono font-bold uppercase tracking-wider hover:bg-white/10 transition-all duration-300 inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white"
                            >
                                VIEW ALL SERVICES
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default TierListPage;