/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const BrandingPage: React.FC = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const timer = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const services = [
        {
            title: "LOGO & IDENTITY SYSTEMS",
            description:
                "Iconic marks that become cultural symbols. We design identities that command attention and live in memory forever.",
        },
        {
            title: "BRAND VOICE & STRATEGY",
            description:
                "Your story, amplified. We architect brand narratives that resonate deeply and differentiate ruthlessly.",
        },
        {
            title: "UI/UX DESIGN",
            description:
                "Interfaces so intuitive, they feel inevitable. We craft digital experiences that users can't help but love.",
        },
    ];

    return (
        <section className="relative min-h-screen w-full px-6 md:px-12 pt-32 md:pt-40 pb-24 overflow-hidden bg-[#EBE9DF]">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] z-0 pointer-events-none"></div>

            {/* Decorative Frame */}
            <div
                className={`
                    absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2
                    w-[200px] h-[200px] md:w-[400px] md:h-[400px]
                    border-4 border-[#D16D6A]/20
                    transition-all duration-[2000ms] ease-out
                    ${loaded ? "opacity-100 rotate-12" : "opacity-0 rotate-0"}
                `}
            >
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#D16D6A]" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#D16D6A]" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#D16D6A]" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#D16D6A]" />

                <div className="absolute inset-0 flex items-center justify-center">
                    <span
                        className="text-8xl md:text-[12rem] font-black text-[#0a0a0a]/5 select-none"
                        style={{ fontFamily: "Syne, sans-serif" }}
                    >
                        BRAND
                    </span>
                </div>
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
                        OUR SERVICES
                    </div>
                </div>

                {/* Title */}
                <div className="mb-16 md:mb-24">
                    <div className="overflow-hidden mb-4">
                        <h1
                            className={`
                                text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-[#0a0a0a]
                                transition-transform duration-1000 delay-300
                                ${loaded ? "translate-y-0" : "translate-y-full"}
                            `}
                            style={{ fontFamily: "Syne, sans-serif" }}
                        >
                            4. BRAND IGNITION
                        </h1>
                    </div>

                    <div className="overflow-hidden">
                        <h2
                            className={`
                                text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#0a0a0a]/40
                                transition-transform duration-1000 delay-400
                                ${loaded ? "translate-y-0" : "translate-y-full"}
                            `}
                            style={{ fontFamily: "Syne, sans-serif" }}
                        >
                            (BRANDING & DESIGN)
                        </h2>
                    </div>
                </div>

                {/* Main Description */}
                <div
                    className={`
                        max-w-3xl mb-20 md:mb-32
                        transition-all duration-1000 delay-500
                        ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                    `}
                >
                    <p className="text-lg md:text-2xl font-mono text-[#0a0a0a]/70 leading-relaxed border-l-4 border-[#D16D6A] pl-6">
                        Your brand is the smoke that signals the fire.
                        We forge <strong className="text-[#0a0a0a]">identities that burn into the memory</strong> of your audience—impossible to ignore, impossible to forget.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-24">
                    {services.map((service, idx) => (
                        <div
                            key={idx}
                            className={`
                                group relative p-8 bg-white/50 backdrop-blur-sm rounded-lg
                                border-2 border-[#0a0a0a]/10 hover:border-[#D16D6A]
                                transition-all duration-700
                                ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
                            `}
                            style={{ transitionDelay: `${600 + idx * 120}ms` }}
                        >
                            <div className="w-16 h-16 mb-6 rounded-full bg-[#D16D6A]/10 flex items-center justify-center group-hover:bg-[#D16D6A] transition-colors">
                                <svg
                                    className="w-8 h-8 text-[#D16D6A] group-hover:text-white transition-colors"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    {/* icon variations */}
                                    {idx === 0 && (
                                        <path
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4..." />
                                    )}
                                    {idx === 1 && (
                                        <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24..." />
                                    )}
                                    {idx === 2 && (
                                        <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20..." />
                                    )}
                                </svg>
                            </div>

                            <h3 className="text-xl font-black uppercase mb-4 text-[#0a0a0a] group-hover:text-[#D16D6A] transition-colors" style={{ fontFamily: "Syne, sans-serif" }}>
                                {service.title}
                            </h3>

                            <p className="text-sm font-mono text-[#0a0a0a]/70 leading-relaxed">
                                {service.description}
                            </p>

                            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#D16D6A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div
                    className={`
                        relative p-12 md:p-16 rounded-2xl bg-gradient-to-br from-[#D16D6A] to-[#B04E4B]
                        overflow-hidden
                        transition-all duration-1000 delay-1000
                        ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                    `}
                >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h3
                                className="text-3xl md:text-4xl font-black uppercase mb-4 text-white"
                                style={{ fontFamily: "Syne, sans-serif" }}
                            >
                                READY TO IGNITE YOUR BRAND?
                            </h3>

                            <p className="text-white/80 font-mono text-lg max-w-xl">
                                Let's create an identity that burns bright in a crowded market.
                            </p>
                        </div>

                        <a
                            href="mailto:hello@arsonpixels.com?subject=Brand%20Ignition%20Inquiry"
                            className="group px-8 py-4 bg-white text-[#D16D6A] rounded-full font-mono font-bold uppercase tracking-wider
                                       hover:bg-[#0a0a0a] hover:text-white transition-all duration-300 whitespace-nowrap"
                        >
                            <span className="inline-flex items-center gap-2">
                                LEARN MORE
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

export default BrandingPage;