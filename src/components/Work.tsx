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
        <section ref={sectionRef} id="work-section" className="min-h-screen w-full bg-[#000000] text-[#FFFFFF] relative z-20 flex flex-col items-center justify-start -mt-[1px] scroll-mt-20">
            {/* CINEMATIC STATIC BACKGROUND (leyi.jpg) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <img 
                    src="/images/background/kinet.png" 
                    alt="Background" 
                    className="w-full h-full object-cover opacity-15 filter grayscale-[0.8] blur-[1px] mix-blend-overlay"
                />
                
                {/* Subtle Brand Glow Singularity (maintained for brand atmosphere) */}
                <div 
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] rounded-full bg-[#FF3E00]/10 blur-[150px] mix-blend-screen"
                />
            </div>

            {/* STACKED PARALLAX CAROUSEL */}
            <div className="relative w-full z-20">
                <StackedCards projects={projects}>
                    {/* HI-FIDELITY HUD HEADER (PRO-LEVEL TYPOGRAPHY) moved inside */}
                    <div 
                        ref={headerRef}
                        className="relative z-30 w-full max-w-7xl mx-auto px-8 mb-4 mt-12 flex flex-col items-center pointer-events-none"
                    >
                        {/* The Main Title */}
                        <h2 className="text-[12vw] md:text-[8rem] font-black uppercase leading-none tracking-tighter italic text-center drop-shadow-2xl" style={{ fontFamily: 'Syne, sans-serif' }}>
                            SELECTED <span className="text-[#FF3E00]">WORKS</span>
                        </h2>
                    </div>
                </StackedCards>
            </div>

            {/* Foreground Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none z-30 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,62,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
        </section>
    );
};

