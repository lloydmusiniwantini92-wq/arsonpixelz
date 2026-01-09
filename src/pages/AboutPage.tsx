import React from 'react';
import { motion } from 'framer-motion';

export const AboutPage = () => {
    return (
        <div className="min-h-screen bg-[#EBE9DF] pt-32 pb-20 px-6 md:px-12">
            <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                {/* Left Col - Header */}
                <div className="lg:col-span-8">
                    <h1 className="font-syne font-black text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] uppercase text-[#0F0F0F] mb-12">
                        We Build <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D16D6A] to-[#8B3A38]"> empires </span> <br />
                        not pages.
                    </h1>

                    <div className="text-xl md:text-3xl font-medium leading-relaxed text-[#0F0F0F]/80 max-w-4xl space-y-8">
                        <p>
                            Arson Pixelz wasn't founded to make "pretty websites." We exist to burn down the boring, the safe, and the templated.
                        </p>
                        <p>
                            We are a collective of rogue architects, aesthetic hardliners, and growth engineers. We believe that in a saturated digital ocean, the only way to survive is to be a tsunami.
                        </p>
                    </div>
                </div>

                {/* Right Col - Stats / details */}
                <div className="lg:col-span-4 flex flex-col justify-end space-y-12">
                    <div className="border-t border-[#0F0F0F]/20 pt-8">
                        <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#D16D6A] block mb-4">
                            Directive 01
                        </span>
                        <h3 className="font-syne font-bold text-2xl uppercase text-[#0F0F0F]">
                            Scorched Earth Policy
                        </h3>
                        <p className="mt-4 text-[#0F0F0F]/60 font-mono text-sm leading-relaxed">
                            We don't iterate on your competitors. We erase them. Our designs are built to dominate attention spans and monopolize market share.
                        </p>
                    </div>

                    <div className="border-t border-[#0F0F0F]/20 pt-8">
                        <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#D16D6A] block mb-4">
                            Directive 02
                        </span>
                        <h3 className="font-syne font-bold text-2xl uppercase text-[#0F0F0F]">
                            Speed is Safety
                        </h3>
                        <p className="mt-4 text-[#0F0F0F]/60 font-mono text-sm leading-relaxed">
                            Slow is dead. We build on hyper-optimized stacks (Vite, React, Rust-based tooling) to ensure your empire loads before they can blink.
                        </p>
                    </div>
                </div>
            </div>

            {/* Team / Image Section */}
            <div className="mt-32 max-w-[1920px] mx-auto">
                <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden relative group">
                    <img
                        src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop"
                        alt="The Lab"
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 scale-105 group-hover:scale-100 transition-transform ease-out"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-syne font-black text-white/50 text-[10vw] uppercase select-none tracking-widest z-10">
                            The Construct
                        </span>
                    </div>
                </div>
            </div>

            {/* EXPANDED CONTENT: METHODOLOGY */}
            <div className="mt-40 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 max-w-[1920px] mx-auto">
                <div>
                    <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#D16D6A] block mb-6">
                        Operational Doctrine
                    </span>
                    <h2 className="font-syne font-black text-5xl md:text-7xl uppercase text-[#0F0F0F] leading-none mb-8">
                        Burn <br /> the <br /> Handbook.
                    </h2>
                </div>
                <div className="space-y-12">
                    <p className="text-xl md:text-2xl font-medium leading-relaxed text-[#0F0F0F]/80">
                        Traditional agencies play it safe. They iterate. They A/B test until the soul is sanded off.
                        We don't do that. We deploy "scorched earth" creativity—stripping away the noise until only the raw, undeniable signal remains.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-syne font-bold text-xl uppercase mb-2">01. Injection</h4>
                            <p className="font-mono text-xs leading-relaxed text-[#0F0F0F]/60">
                                We infiltrate your brand's core. We audit every pixel, every line of copy, every user interaction. We find the weak points.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-syne font-bold text-xl uppercase mb-2">02. Ignition</h4>
                            <p className="font-mono text-xs leading-relaxed text-[#0F0F0F]/60">
                                We light the match. Visual overhaul, architectural restructuring, and aggressive positioning updates.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-syne font-bold text-xl uppercase mb-2">03. Accelerant</h4>
                            <p className="font-mono text-xs leading-relaxed text-[#0F0F0F]/60">
                                Launch is just the start. We pour gasoline on what works using high-velocity feedback loops and AI-driven analytics.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-syne font-bold text-xl uppercase mb-2">04. Dominion</h4>
                            <p className="font-mono text-xs leading-relaxed text-[#0F0F0F]/60">
                                Your brand becomes the standard. Competitors are forced to adapt or die.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* EXPANDED CONTENT: SECTOR LOG (HISTORY) */}
            <div className="mt-40 border-t border-black/10 pt-24 max-w-[1920px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20">
                    <h2 className="font-syne font-black text-5xl md:text-7xl uppercase text-[#0F0F0F]">
                        Sector Log
                    </h2>
                    <p className="font-mono text-sm tracking-widest uppercase text-[#0F0F0F]/50 mt-4 md:mt-0">
                        Archive: 2020 - Present
                    </p>
                </div>

                <div className="space-y-0">
                    {[
                        { year: "2024", event: "The Singularity", desc: "Arson Pixelz fully integrates Generative AI into all workflows. Production speed increases by 400%." },
                        { year: "2023", event: "Global Expansion", desc: "Remote command nodes established in Tokyo, London, and Berlin. Client base exceeds 50 enterprise accounts." },
                        { year: "2022", event: "Protocol: Breach", desc: "First major award win for 'Cyber-Brutalism' utility site. The industry takes notice." },
                        { year: "2020", event: "Genesis", desc: "Founded in a basement server room. Two laptops, too much caffeine, and a refusal to compromise." }
                    ].map((item, idx) => (
                        <div key={idx} className="group border-b border-black/10 py-12 flex flex-col md:flex-row gap-8 md:gap-24 items-start hover:bg-white transition-colors duration-500 -mx-6 px-6 md:-mx-12 md:px-12">
                            <span className="font-mono text-3xl md:text-5xl font-bold text-[#D16D6A]/40 group-hover:text-[#D16D6A] transition-colors">
                                {item.year}
                            </span>
                            <div className="flex-1">
                                <h3 className="font-syne font-bold text-3xl uppercase text-[#0F0F0F] mb-2">{item.event}</h3>
                                <p className="font-mono text-sm text-[#0F0F0F]/60 max-w-lg">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
