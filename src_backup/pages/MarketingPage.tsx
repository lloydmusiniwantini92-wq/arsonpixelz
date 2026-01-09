import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const MarketingPage: React.FC = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const timer = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const services = [
        {
            title: "PERFORMANCE MARKETING",
            subtitle: "(PPC/Social Ads)",
            description:
                "Data-driven campaigns that convert browsers into buyers. We optimize every dollar for maximum ROI across all paid channels.",
        },
        {
            title: "SEO & CONTENT STRATEGY",
            subtitle: "",
            description:
                "Dominate search rankings with strategic content that captures intent and drives organic traffic at scale.",
        },
        {
            title: "CONVERSION RATE OPTIMIZATION",
            subtitle: "(CRO)",
            description:
                "Turn traffic into revenue. We analyze, test, and refine every touchpoint to maximize your conversion funnel.",
        },
    ];

    return (
        <section className="relative min-h-screen w-full px-6 md:px-12 pt-32 md:pt-40 pb-24 overflow-hidden bg-[#EBE9DF]">

            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] z-0 pointer-events-none"></div>

            {/* Background Code - Full Screen Coverage (Subtle Watermark) */}
            <div className="absolute inset-0 overflow-hidden opacity-[0.12] pointer-events-none flex items-start justify-center">
                <pre className="text-[#D16D6A] text-xs leading-relaxed font-mono w-full px-4 text-center">
                    {`// ARSON PIXELZ - MARKET ACCELERATION ENGINE v7.0

const accelerateGrowth = () => {
    return {
        channels: ['Google Ads', 'Meta Ads', 'TikTok', 'LinkedIn'],
        strategy: ['SEO', 'Content', 'Email', 'Analytics'],
        optimization: ['A/B Testing', 'CRO', 'Funnel', 'UX'],
        analytics: ['GA4', 'Mixpanel', 'Hotjar', 'Amplitude'],
    };
};

interface MarketingStrategy {
    reach: 'exponential';
    engagement: 'viral';
    conversion: 'optimized';
    roi: 'maximized';
}

export const igniteMarketing = async () => {
    await initializeCampaigns();
    await deployAds();
    await optimizeFunnels();
    return { status: 'accelerating' };
};

class GrowthEngine {
    constructor(brand) {
        this.brand = brand;
        this.fuel = 'data';
        this.velocity = Infinity;
    }
    
    async launch() {
        const research = await this.analyze();
        const strategy = await this.plan();
        const campaign = await this.execute();
        return this.amplify(campaign);
    }
}

const marketingStack = {
    datadriven: true,
    scalable: true,
    targeted: true,
    measurable: true,
    roi: 'maximized'
};

// CAMPAIGN ROUTES - IGNITION PROTOCOL
app.post('/api/campaign', async (req, res) => {
    const { brand, goals } = req.body;
    const strategy = await createStrategy(brand);
    return res.json({ strategy, status: 'live' });
});

app.get('/api/analytics/:id', async (req, res) => {
    const metrics = await fetchMetrics(req.params.id);
    return res.json({ metrics, performance: 'exceeding' });
});

// DEPLOYMENT SEQUENCE
const deploy = async (campaign) => {
    await validateCreatives();
    await optimizeBudget();
    await launchCampaign();
    console.log('🔥 Campaign Live. Performance: MAXIMUM');
};

// SEO OPTIMIZATION ENGINE
const seoPipeline = {
    tools: ['Ahrefs', 'SEMrush', 'Screaming Frog'],
    tactics: ['technical', 'content', 'backlinks'],
    optimize: async (site) => {
        const audit = await site.analyze();
        return audit.improve();
    }
};

// CONVERSION REACTOR
const conversionEngine = {
    methods: ['A/B Testing', 'Multivariate', 'Personalization'],
    metrics: {
        ctr: 'optimized',
        bounce: 'minimized',
        conversion: 'maximized',
        ltv: 'growing'
    },
    async optimizeFunnel(funnel) {
        await analyzeDropoff(funnel);
        await implementTests(funnel);
        return { success: true, lift: '+47%' };
    }
};

// CONTENT FORGE
const contentFramework = {
    formats: ['Blog', 'Video', 'Podcast', 'Social'],
    distribution: ['Organic', 'Paid', 'Email', 'PR'],
    publish: async (content) => {
        await optimizeForSEO();
        await scheduleDistribution();
        return 'VIRAL';
    }
};

export const accelerationProtocol = () => {
    const campaigns = initializeCampaigns();
    const tracking = activateAnalytics();
    const velocity = setMaximum();
    
    return {
        campaigns,
        tracking,
        velocity,
        status: 'ACCELERATING'
    };
};

// PERFORMANCE OPTIMIZATION MATRIX
const optimize = async () => {
    await analyzeData();
    await reallocateBudget();
    await scaleWinners();
    await pauseLosers();
    console.log('⚡ ROAS: MAXIMUM');
};

// TARGETING FORTRESS
const targetingLayer = {
    audiences: 'custom',
    lookalikes: 'enabled',
    retargeting: 'aggressive',
    exclusions: 'smart',
    async refine(audience) {
        await analyzeEngagement();
        await optimizeSegments();
        return 'PRECISION_MODE_ACTIVE';
    }
};

`.repeat(20)}
                </pre>
            </div>

            {/* Additional Code Layers for Full Coverage (Very Subtle) */}
            <div className="absolute inset-0 overflow-hidden opacity-[0.08] pointer-events-none">
                <div className="grid grid-cols-3 gap-6 w-full h-full p-6">
                    {/* Left Column */}
                    <pre className="text-[#D16D6A] text-[10px] leading-relaxed font-mono">
                        {`const leftEngine = {
  campaign: true,
  optimize: 'always'
};

async function processAds() {
  return await amplify();
}

export default leftEngine;`.repeat(50)}
                    </pre>

                    {/* Center Column */}
                    <pre className="text-[#D16D6A] text-[10px] leading-relaxed font-mono">
                        {`const centerCore = {
  status: 'active',
  reach: 'maximum'
};

async function processGrowth() {
  return await accelerate();
}

export default centerCore;`.repeat(50)}
                    </pre>

                    {/* Right Column */}
                    <pre className="text-[#D16D6A] text-[10px] leading-relaxed font-mono">
                        {`const rightSystem = {
  convert: true,
  scale: 'infinite'
};

async function processROI() {
  return await maximize();
}

export default rightSystem;`.repeat(50)}
                    </pre>
                </div>
            </div>

            {/* Angle Bracket Decoration - Right */}
            <div
                className={`
                    absolute right-0 top-[20%]
                    text-[35vw] leading-none font-mono text-[#0a0a0a]/5
                    select-none pointer-events-none z-0
                    transition-all duration-[2000ms] ease-out
                    ${loaded ? "opacity-100 translate-x-[10%]" : "opacity-0 translate-x-[30%]"}
                `}
            >
                {"</>"}
            </div>

            <div className="relative z-10">

                {/* Top Row */}
                <div
                    className={`
                        flex items-center justify-between mb-10 md:mb-16
                        transition-all duration-700 delay-100
                        ${loaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
                    `}
                >
                    {/* Category */}
                    <div
                        className={`
                            inline-block px-6 py-2 rounded-full bg-[#D16D6A] text-white
                            font-mono text-xs font-bold uppercase tracking-[0.3em]
                            transition-all duration-700 delay-200
                        `}
                    >
                        OUR SERVICES
                    </div>
                </div>

                {/* Heading */}
                <div className="mb-16 md:mb-24">
                    <div className="overflow-hidden mb-4">
                        <h1
                            className={`
                                text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter
                                text-[#0a0a0a]
                                transition-transform duration-1000 delay-300
                                ${loaded ? "translate-y-0" : "translate-y-full"}
                            `}
                            style={{ fontFamily: "Syne, sans-serif" }}
                        >
                        MARKET ACCELERATION
                        </h1>
                    </div>

                    <div className="overflow-hidden">
                        <h2
                            className={`
                                text-3xl md:text-5xl font-black uppercase tracking-tighter
                                text-[#0a0a0a]/40
                                transition-transform duration-1000 delay-400
                                ${loaded ? "translate-y-0" : "translate-y-full"}
                            `}
                            style={{ fontFamily: "Syne, sans-serif" }}
                        >
                            (MARKETING)
                        </h2>
                    </div>
                </div>

                {/* Description */}
                <div
                    className={`
                        max-w-3xl mb-20 md:mb-32
                        transition-all duration-1000 delay-500
                        ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                    `}
                >
                    <p className="text-lg md:text-2xl font-mono text-[#0a0a0a]/70 leading-relaxed border-l-4 border-[#D16D6A] pl-6">
                        We don't just market—we <strong className="text-[#0a0a0a]">accelerate</strong>.
                        Strategic campaigns engineered to amplify your reach, engagement,
                        and revenue at unprecedented velocity.
                    </p>
                </div>

                {/* Services */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-24">
                    {services.map((service, idx) => (
                        <div
                            key={idx}
                            className={`
                                group relative p-8 bg-white/50 backdrop-blur-sm rounded-lg
                                border-2 border-[#0a0a0a]/10 hover:border-[#D16D6A]
                                transition-all duration-700
                                ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
                            `}
                            style={{ transitionDelay: `${600 + idx * 100}ms` }}
                        >
                            <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-[#D16D6A] flex items-center justify-center">
                                <span className="font-mono text-white font-bold text-lg">{idx + 1}</span>
                            </div>

                            <h3
                                className="text-2xl font-black uppercase mb-2 text-[#0a0a0a] group-hover:text-[#D16D6A] transition-colors"
                                style={{ fontFamily: "Syne, sans-serif" }}
                            >
                                {service.title}
                            </h3>

                            {service.subtitle && (
                                <p className="text-sm font-mono font-bold uppercase mb-4 text-[#0a0a0a]/50">
                                    {service.subtitle}
                                </p>
                            )}

                            <p className="text-sm font-mono text-[#0a0a0a]/70 leading-relaxed">
                                {service.description}
                            </p>

                            <div className="absolute inset-0 bg-[#D16D6A]/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-500 -z-10" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MarketingPage;