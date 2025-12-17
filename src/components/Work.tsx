/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRightIcon } from '@heroicons/react/24/solid';

// --- IMPORT YOUR ASSETS ---
import EatalyImg from './assets/Eataly.jpg';
import PunoImg from './assets/Puno.png';
import LevisImg from './assets/Levis22.jpg';
import AboutImg from './assets/ArsonPixelzAbout.jpg';
import FullSvg from './assets/full.svg';
import LogoImg from './assets/p.png';

// --- INTERNAL HOOK: INTERSECTION OBSERVER ---
const useInView = (options = { threshold: 0.1 }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.disconnect();
            }
        }, options);

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [options]);

    return [ref, isInView] as const;
};

// --- UTILITY: SCRAMBLE TEXT ---
const ScrambleTitle = ({ text, active }: { text: string; active: boolean }) => {
    const [display, setDisplay] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

    useEffect(() => {
        if (!active) {
            setDisplay(text);
            return;
        }
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplay(() =>
                text.split("").map((letter, index) =>
                    index < iterations ? text[index] : chars[Math.floor(Math.random() * chars.length)]
                ).join("")
            );
            if (iterations >= text.length) clearInterval(interval);
            iterations += 1 / 3;
        }, 30);
        return () => clearInterval(interval);
    }, [active, text]);

    return <span>{display}</span>;
};

// --- COMPONENT: PROJECT CARD ---
const ProjectCard = ({ title, id, category, year, image, className, delay }: any) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className={`group relative overflow-hidden bg-[#0A0A0A] border border-white/10 ${className}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {/* 1. BACKGROUND IMAGE */}
            <div className={`absolute inset-0 transition-all duration-700 ease-out 
                ${hovered ? 'scale-105 opacity-100' : 'scale-100 opacity-40 grayscale'}`}
            >
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-[#222]" />
                )}

                {/* Noise overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay" />
            </div>

            {/* Security Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] 
                z-10 bg-[size:100%_4px,6px_100%] pointer-events-none opacity-50 
                group-hover:opacity-10 transition-opacity duration-500"
            />

            {/* Redacted Cover */}
            <div className="absolute inset-0 bg-[#0A0A0A] z-20 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] 
                origin-bottom group-hover:translate-y-full opacity-90">
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-[#D16D6A]/50 text-xs tracking-[0.5em] uppercase border border-[#D16D6A]/30 px-4 py-1">
                        Restricted Access
                    </span>
                </div>
            </div>

            {/* CONTENT */}
            <div className="absolute inset-0 z-30 p-6 md:p-8 flex flex-col justify-between pointer-events-none">
                {/* Header */}
                <div className="flex justify-between items-start translate-y-[-10px] opacity-0 
                    group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100"
                >
                    <div className="flex flex-col">
                        <span className="font-mono text-[10px] text-[#D16D6A] mb-1">CASE ID: {id}</span>
                        <span className="font-mono text-xs text-white/60">{category}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                        <ArrowUpRightIcon className="w-4 h-4 text-white" />
                    </div>
                </div>

                {/* Title */}
                <div className="overflow-hidden">
                    <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter 
                        translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100 leading-none">
                        <ScrambleTitle text={title} active={hovered} />
                    </h3>
                </div>
            </div>

            {/* Hover Border Glow */}
            <div className="absolute inset-0 border border-[#D16D6A] opacity-0 scale-95 
                group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 pointer-events-none z-40"
            />
        </div>
    );
};

// --- FILTER BAR ---
const FilterBar = () => (
    <div className="flex flex-wrap gap-4 mb-16 justify-center md:justify-start">
        {['ALL SYSTEMS', 'WEB_DEV', 'IDENTITY', 'CAMPAIGNS'].map((filter, i) => (
            <button
                key={i}
                className={`
                    relative px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest border transition-all duration-300
                    ${i === 0
                        ? 'bg-[#D16D6A] text-black border-[#D16D6A] shadow-[4px_4px_0px_#1A1A1A]'
                        : 'bg-transparent text-white/40 border-white/20 hover:text-white hover:border-white'
                    }
                `}
            >
                {filter}
            </button>
        ))}
    </div>
);

// --- MAIN COMPONENT ---
export const Work: React.FC = () => {
    const [ref, isVisible] = useInView({ threshold: 0.1 });

    const projects = [
        {
            id: "88-A",
            title: "EATALY",
            category: "E-COMMERCE REBRAND",
            year: "2024",
            image: EatalyImg,
            className: "col-span-1 md:col-span-6 lg:col-span-4 h-[400px]"
        },
        {
            id: "42-X",
            title: "ORIGINAL",
            category: "CAMPAIGN STRATEGY",
            year: "2023",
            image: LevisImg,
            className: "col-span-1 md:col-span-6 lg:col-span-4 h-[400px]"
        },
        {
            id: "19-Z",
            title: "PUNO",
            category: "FINTECH PLATFORM",
            year: "2024",
            image: PunoImg,
            className: "col-span-1 md:col-span-12 lg:col-span-4 h-[400px]"
        },
        {
            id: "07-B",
            title: "ORBIT",
            category: "AI INTERFACE",
            year: "2025",
            image: FullSvg,
            className: "col-span-1 md:col-span-12 lg:col-span-8 h-[400px]"
        },
        {
            id: "99-Ω",
            title: "NEXUS",
            category: "IDENTITY SYSTEM",
            year: "2024",
            image: LogoImg,
            className: "col-span-1 md:col-span-6 lg:col-span-4 h-[400px]"
        }
    ];

    return (
        <section className="py-24 md:py-32 bg-[#050505] text-[#EBE9DF] relative overflow-hidden border-t border-white/5">

            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-white/5" />
            <div className="absolute top-[200px] left-0 w-full h-[1px] bg-white/5" />

            <div className="max-w-[90rem] mx-auto px-6 md:px-12 relative z-10">

                {/* HEADER */}
                <div
                    ref={ref}
                    className={`flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 transition-all duration-1000 
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                >
                    <div>
                        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-2">
                            Project <span className="text-[#D16D6A]">Archive</span>
                        </h2>
                        <p className="font-mono text-white/50 text-sm md:text-base max-w-md">
                            // DECLASSIFIED CASE FILES <br />
                            // EXPLORE OUR PROVEN TRACK RECORD
                        </p>
                    </div>

                    <div className="hidden md:block text-right">
                        <div className="font-mono text-3xl font-bold text-[#D16D6A]">24</div>
                        <div className="font-mono text-xs text-white/30 tracking-widest uppercase">Active Operations</div>
                    </div>
                </div>

                {/* FILTER BAR */}
                <FilterBar />

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {projects.map((project, i) => (
                        <ProjectCard key={i} {...project} delay={i * 100} />
                    ))}
                </div>

                {/* BUTTON */}
                <div className="mt-20 flex justify-center">
                    <button className="group relative px-8 py-4 bg-transparent border border-[#D16D6A] text-[#D16D6A] font-mono text-xs font-bold uppercase tracking-[0.2em] overflow-hidden hover:text-[#050505] transition-colors">
                        <div className="absolute inset-0 bg-[#D16D6A] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                        <span className="relative z-10">Access Full Database</span>
                    </button>
                </div>

            </div>
        </section>
    );
};
