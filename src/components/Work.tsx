/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// --- IMPORT ASSETS ---
import EatalyImg from './assets/Eataly.jpg';
import PunoImg from './assets/Puno.png';
import LevisImg from './assets/Levis22.jpg';
import AboutImg from './assets/ArsonPixelzAbout.jpg';
import FullSvg from './assets/full.svg';
import LogoImg from './assets/p.png';

import { StackedCards } from './fx/StackedCards';

gsap.registerPlugin(ScrollTrigger);

export const Work: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    const projects = [
        {
            id: "TT-01",
            title: "TONY THOMPSON",
            category: "BRAND + DIGITAL PLATFORM",
            image: AboutImg,
            link: "/archive/tt-01",
        },
        {
            id: "EA-42",
            title: "EATALY",
            category: "E-COMMERCE REBRAND",
            image: EatalyImg,
        },
        {
            id: "LV-22",
            title: "ORIGINAL",
            category: "CAMPAIGN STRATEGY",
            image: LevisImg,
        },
        {
            id: "PN-88",
            title: "PUNO",
            category: "FINTECH PLATFORM",
            image: PunoImg,
        },
        {
            id: "OR-07",
            title: "ORBIT",
            category: "AI INTERFACE",
            image: FullSvg as any,
        },
        {
            id: "NX-99",
            title: "NEXUS",
            category: "IDENTITY SYSTEM",
            image: LogoImg,
        }
    ];

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Cinematic Reveal for the header
            gsap.from(headerRef.current, {
                opacity: 0,
                y: 100,
                filter: 'blur(20px)',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "top 20%",
                    scrub: 1
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="work-section" className="min-h-screen w-full bg-[#020202] text-[#EBE9DF] relative z-20 flex flex-col items-center justify-start -mt-[1px] scroll-mt-20">
            {/* EXACT BACKGROUND FROM HORIZONTAL SCROLL SECTION */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {/* Layer 1: Static Technical Grid */}
                <div 
                    className="absolute inset-x-[-20%] inset-y-0 opacity-40 mix-blend-screen bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/background/kinetic_bg.png')" }}
                />
                
                {/* Layer 2: Parallax Energy Streams */}
                <div 
                    className="absolute inset-x-[-40%] inset-y-0 opacity-60 mix-blend-color-dodge bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/background/energy_field.png')" }}
                />

                {/* Layer 3: Dynamic Brand Glow Singularity */}
                <div 
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] rounded-full bg-[#D16D6A]/20 blur-[150px] mix-blend-screen"
                />
            </div>

            {/* HI-FIDELITY HUD HEADER (PRO-LEVEL TYPOGRAPHY) */}
            <div 
                ref={headerRef}
                className="relative z-30 w-full max-w-7xl px-8 mb-4 mt-32 flex flex-col items-center pointer-events-none"
            >
                {/* Sector Decoder */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-[1px] bg-[#D16D6A]" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[#D16D6A] font-bold">
                        ARCHIVE_01 // SELECTED_WORKS
                    </span>
                    <div className="w-12 h-[1px] bg-[#D16D6A]" />
                </div>

                {/* The Main Title (High-End Aesthetic) */}
                <h2 className="text-[12vw] md:text-[8rem] font-black uppercase leading-none tracking-tighter italic text-center drop-shadow-2xl" style={{ fontFamily: 'Syne, sans-serif' }}>
                    SELECTED <span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>WORKS</span>
                </h2>

                {/* Technical Metadata */}
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-12 font-mono text-[8px] uppercase tracking-widest text-white/30 border-t border-white/5 pt-8 w-full">
                    <div>[PROTOCOL_v4.2]</div>
                    <div>[NODE_STABLE]</div>
                    <div>[ENCRYPTION_MAX]</div>
                    <div className="text-right">[ACCESS_GRANTED]</div>
                </div>
            </div>

            {/* STACKED PARALLAX CAROUSEL */}
            <div className="relative w-full z-20">
                <StackedCards projects={projects} />
            </div>

            {/* Foreground Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none z-30 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
        </section>
    );
};

