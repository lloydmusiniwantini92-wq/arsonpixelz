/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const DevAIPage: React.FC = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const timer = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const services = [
        {
            title: "FULL-STACK WEB DEVELOPMENT",
            subtitle: "(React, Node, Python)",
            description:
                "Scalable, maintainable, blazing-fast. We architect web applications that handle millions of users without breaking a sweat.",
            tech: ["React", "Next.js", "Node", "Python"],
        },
        {
            title: "E-COMMERCE SOLUTIONS",
            subtitle: "(Shopify/Custom)",
            description:
                "From Shopify Plus to headless commerce, we build online stores that convert browsers into buyers at scale.",
            tech: ["Shopify", "WooCommerce", "Custom"],
        },
        {
            title: "MOBILE APP DEVELOPMENT",
            subtitle: "",
            description:
                "Native iOS, Android, or cross-platform. We build apps that users love and app stores feature.",
            tech: ["React Native", "Flutter", "Swift"],
        },
        {
            title: "AI & AUTOMATION",
            subtitle: "",
            description:
                "Harness the power of AI. From chatbots to predictive analytics, we integrate cutting-edge ML into your products.",
            tech: ["OpenAI", "TensorFlow", "Custom ML"],
        },
    ];

    return (
        <section className="relative min-h-screen w-full px-6 md:px-12 pt-32 md:pt-40 pb-24 overflow-hidden bg-[#050505]">

            {/* Background Code - Full Screen Coverage (Subtle Watermark) */}
            <div className="absolute inset-0 overflow-hidden opacity-[0.06] pointer-events-none flex items-start justify-center">
                <pre className="text-[#D16D6A] text-xs leading-relaxed font-mono w-full px-4 text-center">
                    {`// ARSON PIXELS - DIGITAL ARCHITECTURE ENGINE v7.0

const buildTheFuture = () => {
    return {
        frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
        backend: ['Node', 'Python', 'GraphQL', 'Express'],
        database: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma'],
        cloud: ['AWS', 'Vercel', 'Railway', 'Cloudflare'],
    };
};

interface Architecture {
    scalability: 'infinite';
    performance: 'blazing';
    security: 'fortress';
    innovation: 'relentless';
}

export const igniteSystem = async () => {
    await initializeFirewall();
    await deployMicroservices();
    await scaleInfrastructure();
    return { status: 'burning_bright' };
};

class DigitalForge {
    constructor(vision) {
        this.vision = vision;
        this.fuel = 'innovation';
        this.temperature = Infinity;
    }
    
    async craft() {
        const design = await this.conceptualize();
        const code = await this.architect();
        const product = await this.deploy();
        return this.ignite(product);
    }
}

const techStack = {
    modern: true,
    scalable: true,
    secure: true,
    innovative: true,
    performant: 'always'
};

// API ROUTES - IGNITION PROTOCOL
app.post('/api/ignite', async (req, res) => {
    const { project, vision } = req.body;
    const flame = await igniteProject(project);
    return res.json({ flame, status: 'blazing' });
});

app.get('/api/architecture/:id', async (req, res) => {
    const blueprint = await fetchBlueprint(req.params.id);
    return res.json({ blueprint, structural_integrity: 100 });
});

// DEPLOYMENT SEQUENCE
const deploy = async (codebase) => {
    await runTests();
    await buildOptimized();
    await deployToProduction();
    console.log('🔥 System Online. Temperature: MAXIMUM');
};

// AI INTEGRATION ENGINE
const aiPipeline = {
    models: ['GPT-4', 'Claude', 'Stable Diffusion'],
    capabilities: ['generation', 'analysis', 'optimization'],
    integrate: async (model) => {
        const connection = await model.connect();
        return connection.activate();
    }
};

// E-COMMERCE REACTOR
const commerceEngine = {
    platforms: ['Shopify', 'WooCommerce', 'Custom'],
    features: {
        cart: 'optimized',
        checkout: 'streamlined',
        payments: 'secure',
        analytics: 'real-time'
    },
    async processOrder(order) {
        await validatePayment(order);
        await fulfillOrder(order);
        return { success: true, flame: 'sustained' };
    }
};

// MOBILE FORGE
const mobileFramework = {
    native: ['Swift', 'Kotlin'],
    crossPlatform: ['React Native', 'Flutter'],
    deploy: async (app) => {
        await testOnDevices();
        await submitToStores();
        return 'APPROVED';
    }
};

export const ignitionProtocol = () => {
    const systems = initializeSystems();
    const forge = activateForge();
    const temperature = setMaximum();
    
    return {
        systems,
        forge,
        temperature,
        status: 'OPERATIONAL'
    };
};

// PERFORMANCE OPTIMIZATION MATRIX
const optimize = async () => {
    await minifyAssets();
    await enableCaching();
    await loadBalance();
    await cdnDistribute();
    console.log('⚡ Performance: MAXIMUM');
};

// SECURITY FORTRESS
const securityLayer = {
    encryption: 'AES-256',
    authentication: 'JWT + OAuth',
    firewall: 'WAF enabled',
    monitoring: '24/7',
    async protect(system) {
        await scanVulnerabilities();
        await patchSystems();
        return 'FORTRESS_MODE_ACTIVE';
    }
};

`.repeat(20)}
                </pre>
            </div>

            {/* Additional Code Layers for Full Coverage (Very Subtle) */}
            <div className="absolute inset-0 overflow-hidden opacity-[0.04] pointer-events-none">
                <div className="grid grid-cols-3 gap-6 w-full h-full p-6">
                    {/* Left Column */}
                    <pre className="text-[#D16D6A] text-[10px] leading-relaxed font-mono">
                        {`const leftEngine = {
  initialize: true,
  optimize: 'always'
};

async function processLeft() {
  return await compute();
}

export default leftEngine;`.repeat(50)}
                    </pre>

                    {/* Center Column */}
                    <pre className="text-[#D16D6A] text-[10px] leading-relaxed font-mono">
                        {`const centerCore = {
  status: 'active',
  power: 'maximum'
};

async function processCtr() {
  return await ignite();
}

export default centerCore;`.repeat(50)}
                    </pre>

                    {/* Right Column */}
                    <pre className="text-[#D16D6A] text-[10px] leading-relaxed font-mono">
                        {`const rightSystem = {
  deploy: true,
  scale: 'infinite'
};

async function processRt() {
  return await launch();
}

export default rightSystem;`.repeat(50)}
                    </pre>
                </div>
            </div>

            {/* Angle Bracket Decoration - Left */}
            <div
                className={`
                    absolute left-[10%] top-[20%]
                    text-[15vw] leading-none font-mono text-[#D16D6A]/10
                    transition-all duration-[2000ms] ease-out
                    ${loaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}
                `}
            >
                {"</>"}
            </div>

            {/* Angle Bracket Decoration - Right */}
            <div
                className={`
                    absolute right-[10%] top-[20%]
                    text-[15vw] leading-none font-mono text-[#D16D6A]/10
                    transition-all duration-[2000ms] ease-out
                    ${loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}
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
                    {/* Category Tag */}
                    <div
                        className={`
                            inline-block px-6 py-2 rounded-full bg-[#D16D6A] text-white
                            font-mono text-xs font-bold uppercase tracking-[0.3em]
                            transition-all duration-700 delay-200
                        `}
                    >
                        DEVELOPMENT
                    </div>
                </div>

                {/* Title */}
                <div className="mb-20 md:mb-28">
                    <div className="overflow-hidden mb-4">
                        <h1
                            className={`
                                text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-[#EBE9DF]
                                transition-transform duration-1000 delay-300
                                ${loaded ? "translate-y-0" : "translate-y-full"}
                            `}
                            style={{ fontFamily: "Syne, sans-serif" }}
                        >
                            2. DIGITAL ARCHITECTURE
                        </h1>
                    </div>

                    <div className="overflow-hidden">
                        <h2
                            className={`
                                text-3xl md:text-5xl font-black uppercase tracking-tighter text-transparent
                                transition-transform duration-1000 delay-400
                                ${loaded ? "translate-y-0" : "translate-y-full"}
                            `}
                            style={{
                                fontFamily: "Syne, sans-serif",
                                WebkitTextStroke: "1px rgba(235,233,223,0.3)",
                            }}
                        >
                            (DEVELOPMENT)
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
                    <p className="text-lg md:text-2xl font-mono text-white/70 leading-relaxed border-l-4 border-[#D16D6A] pl-6">
                        A beautiful flame needs a <strong className="text-white">solid structure</strong> to sustain it.
                        We build robust, scalable platforms that turn vision into reality—powered by cutting-edge tech and AI.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 gap-12 mb-24">
                    {services.map((service, idx) => (
                        <div
                            key={idx}
                            className={`
                                group relative p-8 bg-[#0F0F0F] rounded-lg
                                border-2 border-white/10 hover:border-[#D16D6A]
                                transition-all duration-700
                                ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
                            `}
                            style={{ transitionDelay: `${600 + idx * 100}ms` }}
                        >
                            {/* Window Header */}
                            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                </div>
                                <span className="font-mono text-xs text-white/40 ml-2">
                                    service_{idx + 1}.tsx
                                </span>
                            </div>

                            {/* Title */}
                            <h3
                                className="text-xl font-black uppercase text-white mb-2 group-hover:text-[#D16D6A] transition-colors"
                                style={{ fontFamily: "Syne, sans-serif" }}
                            >
                                {service.title}
                            </h3>

                            {service.subtitle && (
                                <p className="text-xs font-mono font-bold uppercase text-white/50 mb-4">
                                    {service.subtitle}
                                </p>
                            )}

                            {/* Description */}
                            <p className="text-sm font-mono text-white/70 leading-relaxed mb-6">
                                {service.description}
                            </p>

                            {/* Tech Tags */}
                            <div className="flex flex-wrap gap-2">
                                {service.tech.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 text-xs font-mono font-bold bg-[#D16D6A]/10 text-[#D16D6A] rounded border border-[#D16D6A]/30 group-hover:bg-[#D16D6A] group-hover:text-white transition-colors"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div
                    className={`
                        relative p-12 md:p-16 rounded-2xl bg-gradient-to-br from-[#D16D6A] to-[#B04E4B]
                        transition-all duration-1000 delay-1200
                        overflow-hidden
                        ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                    `}
                >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                    <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8 items-center">
                        <div>
                            <h3
                                className="text-3xl md:text-4xl font-black uppercase mb-4 text-white"
                                style={{ fontFamily: "Syne, sans-serif" }}
                            >
                                READY TO BUILD?
                            </h3>
                            <p className="text-white/80 font-mono text-lg max-w-xl">
                                Let's architect a digital platform that scales with your ambition.
                            </p>
                        </div>

                        <a
                            href="mailto:hello@arsonpixels.com?subject=Development%20Project%20Inquiry"
                            className="group px-8 py-4 bg-white text-[#D16D6A] rounded-full font-mono font-bold uppercase tracking-wider hover:bg-[#0a0a0a] hover:text-white transition-all duration-300"
                        >
                            <span className="inline-flex items-center gap-2">
                                START PROJECT
                                <svg
                                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DevAIPage;