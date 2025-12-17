import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const GamingPage: React.FC = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const timer = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const services = [
        {
            title: "GAME UI/UX DESIGN",
            description: "Interfaces that enhance gameplay without getting in the way. We design HUDs, menus, and systems that feel native to your world."
        },
        {
            title: "CHARACTER & ASSET DESIGN",
            description: "Heroes, villains, and everything between. We create memorable characters and assets that define your game's visual identity."
        },
        {
            title: "GAME BRANDING & MARKETING",
            description: "Launch campaigns that build hype and community. From key art to trailers, we position your game for maximum impact."
        },
        {
            title: "INTERACTIVE EXPERIENCES",
            description: "Web-based games, AR filters, and branded interactions. We blur the lines between game and marketing."
        }
    ];

    return (
        <section className="relative min-h-screen w-full px-6 md:px-12 pt-32 md:pt-40 pb-24 overflow-hidden bg-[#0a0a0a]">

            {/* Background Code - Full Screen Coverage (Gaming Theme) */}
            <div className="absolute inset-0 overflow-hidden opacity-[0.06] pointer-events-none flex items-start justify-center">
                <pre className="text-[#D16D6A] text-xs leading-relaxed font-mono w-full px-4 text-center">
                    {`// ARSON PIXELS - GAMING EXPERIENCE ENGINE v7.0

class GameWorld {
    constructor() {
        this.players = new Map();
        this.assets = [];
        this.immersion = 'maximum';
    }
    
    async render() {
        const scene = await this.buildScene();
        const ui = await this.designInterface();
        const audio = await this.mixSoundscape();
        return this.launch({ scene, ui, audio });
    }
}

const experienceConfig = {
    graphics: 'ultra',
    performance: '144fps',
    engagement: 'addictive',
    storytelling: 'cinematic'
};

// CHARACTER SYSTEM
const characterEngine = {
    heroes: ['protagonists', 'antiheroes', 'legends'],
    villains: ['bosses', 'rivals', 'nemesis'],
    render: async (character) => {
        await animateMovement();
        await applyPhysics();
        return character.spawn();
    }
};

// UI/UX FRAMEWORK
const interfaceSystem = {
    hud: 'minimalist',
    menus: 'intuitive',
    feedback: 'instant',
    design: async () => {
        const layout = await createLayout();
        const animations = await addTransitions();
        return { layout, animations, responsive: true };
    }
};

export const launchGame = async () => {
    await loadAssets();
    await initializePhysics();
    await spawnPlayers();
    console.log('🎮 Game Status: LIVE');
};

// ASSET PIPELINE
const assetForge = {
    characters: ['models', 'textures', 'animations'],
    environments: ['worlds', 'levels', 'props'],
    effects: ['particles', 'shaders', 'lighting'],
    async optimize(asset) {
        await compress();
        await bundle();
        return asset.deploy();
    }
};

// ENGAGEMENT METRICS
const playerExperience = {
    retention: 'high',
    satisfaction: '5-star',
    replayability: 'infinite',
    async track() {
        const metrics = await gatherAnalytics();
        const feedback = await collectReviews();
        return { metrics, feedback, improvement: 'continuous' };
    }
};

// MARKETING ENGINE
const campaignLauncher = {
    hype: 'maximum',
    community: 'thriving',
    channels: ['social', 'streaming', 'events'],
    async ignite(campaign) {
        await buildTrailers();
        await createKeyArt();
        await engageCommunity();
        return { status: 'viral', reach: 'global' };
    }
};

// INTERACTIVE LAYER
const interactiveExperience = {
    web: ['playables', 'demos', 'minigames'],
    ar: ['filters', 'experiences', 'promotions'],
    async deploy(experience) {
        await optimize();
        await test();
        return experience.launch();
    }
};

export const gameLoop = () => {
    while (playing) {
        update();
        render();
        handleInput();
        checkWinCondition();
    }
};

// ACHIEVEMENT SYSTEM
const achievements = {
    unlocked: [],
    total: 100,
    async award(achievement) {
        achievements.unlocked.push(achievement);
        await showNotification();
        return { unlocked: true, reward: 'legendary' };
    }
};

`.repeat(20)}
                </pre>
            </div>

            {/* Additional Code Layers for Full Coverage */}
            <div className="absolute inset-0 overflow-hidden opacity-[0.04] pointer-events-none">
                <div className="grid grid-cols-3 gap-6 w-full h-full p-6">
                    {/* Left Column */}
                    <pre className="text-[#D16D6A] text-[10px] leading-relaxed font-mono">
                        {`const leftPlayer = {
  health: 100,
  level: 'max',
  power: 'infinite'
};

async function spawnLeft() {
  return await render();
}

export default leftPlayer;`.repeat(50)}
                    </pre>

                    {/* Center Column */}
                    <pre className="text-[#D16D6A] text-[10px] leading-relaxed font-mono">
                        {`const gameCore = {
  status: 'active',
  fps: 144,
  quality: 'ultra'
};

async function runGame() {
  return await play();
}

export default gameCore;`.repeat(50)}
                    </pre>

                    {/* Right Column */}
                    <pre className="text-[#D16D6A] text-[10px] leading-relaxed font-mono">
                        {`const rightAsset = {
  loaded: true,
  optimized: 'yes',
  render: 'ready'
};

async function loadRight() {
  return await spawn();
}

export default rightAsset;`.repeat(50)}
                    </pre>
                </div>
            </div>

            {/* Animated Grid Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(209,109,106,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(209,109,106,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] animate-pulse"
                    style={{ animationDuration: '8s' }}
                />
            </div>

            {/* Glowing Orbs */}
            <div className="absolute top-20 right-20 w-64 h-64 bg-[#D16D6A] rounded-full blur-[120px] opacity-20 animate-pulse" style={{ animationDuration: '6s' }} />
            <div className="absolute bottom-40 left-20 w-96 h-96 bg-[#D16D6A] rounded-full blur-[150px] opacity-15 animate-pulse" style={{ animationDuration: '10s' }} />

            {/* Decorative Plus Icon */}
            <div
                className={`
                    absolute right-[15%] top-[15%]
                    text-[20vw] leading-none font-black text-[#D16D6A]/10
                    select-none pointer-events-none
                    transition-all duration-[2000ms] ease-out
                    ${loaded ? 'opacity-100 rotate-45' : 'opacity-0 rotate-0'}
                `}
            >
                +
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
                        GAMING
                    </div>
                </div>

                {/* Main Heading */}
                <div className="mb-16 md:mb-24">
                    <div className="overflow-hidden mb-4">
                        <h1 className={`
                            text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter
                            text-[#EBE9DF]
                            transition-transform duration-1000 delay-300
                            ${loaded ? 'translate-y-0' : 'translate-y-full'}
                        `} style={{ fontFamily: 'Syne, sans-serif' }}>
                            GAMING EXPERIENCES
                        </h1>
                    </div>

                    <div className="overflow-hidden">
                        <h2 className={`
                            text-3xl md:text-5xl font-black uppercase tracking-tighter
                            text-transparent
                            transition-transform duration-1000 delay-400
                            ${loaded ? 'translate-y-0' : 'translate-y-full'}
                        `}
                            style={{
                                fontFamily: 'Syne, sans-serif',
                                WebkitTextStroke: '1px rgba(235,233,223,0.3)'
                            }}>
                            LEVEL UP YOUR VISION
                        </h2>
                    </div>
                </div>

                {/* Description */}
                <div className={`
                    max-w-3xl mb-20 md:mb-32
                    transition-all duration-1000 delay-500
                    ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}>
                    <p className="text-lg md:text-2xl font-mono text-white/70 leading-relaxed border-l-4 border-[#D16D6A] pl-6">
                        From indie titles to AAA launches, we craft <strong className="text-white">immersive experiences</strong> that
                        keep players engaged and communities thriving. Your game deserves more than pixels—it deserves artistry.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-24">
                    {services.map((service, idx) => (
                        <div
                            key={idx}
                            className={`
                                group relative p-8 bg-white/5 backdrop-blur-sm rounded-lg
                                border-2 border-white/10 hover:border-[#D16D6A]
                                transition-all duration-700 overflow-hidden
                                ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                            `}
                            style={{ transitionDelay: `${600 + idx * 100}ms` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#D16D6A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="inline-block mb-4 px-3 py-1 rounded bg-[#D16D6A]/20 border border-[#D16D6A]/50">
                                    <span className="font-mono text-[#D16D6A] font-bold text-xs">
                                        LVL {idx + 1}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-black uppercase mb-4 text-white group-hover:text-[#D16D6A] transition-colors leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
                                    {service.title}
                                </h3>

                                <p className="text-sm font-mono text-white/70 leading-relaxed">
                                    {service.description}
                                </p>

                                <div className="mt-6 h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-[#D16D6A] to-[#B04E4B] scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className={`
                    mb-24 grid md:grid-cols-4 gap-8
                    transition-all duration-1000 delay-1000
                    ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                `}>
                    {[
                        { label: 'PROJECTS SHIPPED', value: '50+' },
                        { label: 'PLATFORMS', value: 'ALL' },
                        { label: 'PLAYER RATING', value: '5★' },
                        { label: 'AWARDS WON', value: '12+' }
                    ].map((stat, idx) => (
                        <div key={idx} className="text-center p-6 bg-white/5 rounded-lg border border-white/10">
                            <div className="text-4xl md:text-5xl font-black text-[#D16D6A] mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                                {stat.value}
                            </div>
                            <div className="text-xs font-mono text-white/60 uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className={`
                    relative p-12 md:p-16 rounded-2xl bg-gradient-to-br from-[#D16D6A] to-[#B04E4B]
                    overflow-hidden
                    transition-all duration-1000 delay-1100
                    ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                `}>

                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

                    <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(0,0,0,0.1)_50%,transparent_100%)] bg-[length:100%_4px] animate-pulse pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h3 className="text-3xl md:text-4xl font-black uppercase mb-4 text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                                READY PLAYER ONE?
                            </h3>
                            <p className="text-white/80 font-mono text-lg max-w-xl">
                                Let's create gaming experiences that players will never forget.
                            </p>
                        </div>

                        <a
                            href="mailto:hello@arsonpixels.com?subject=Gaming%20Project%20Inquiry"
                            className="group px-8 py-4 bg-white text-[#D16D6A] rounded-full font-mono font-bold uppercase tracking-wider hover:bg-[#0a0a0a] hover:text-white transition-all duration-300 whitespace-nowrap border-2 border-white hover:border-[#0a0a0a]"
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