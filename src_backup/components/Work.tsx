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
const ProjectCard = ({ title, id, category, image, link, className, delay }: any) => {
    const [hovered, setHovered] = useState(false);
    const Wrapper: any = link ? 'a' : 'div';

    return (
        <Wrapper
            href={link}
            target={link ? "_blank" : undefined}
            rel={link ? "noopener noreferrer" : undefined}
            className={`group relative overflow-hidden bg-[#0A0A0A] border border-white/10 ${className}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {/* IMAGE LAYER — SUBTLE SCALE */}
            <div
                className={`
                    absolute inset-0 flex items-center justify-center
                    transition-all duration-700 ease-out
                    ${hovered
                        ? 'opacity-100 scale-[1.02]'
                        : 'opacity-70 scale-100 grayscale'}
                `}
            >
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-contain"
                    />
                ) : (
                    <div className="w-full h-full bg-[#222]" />
                )}

                {/* Noise overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay" />
            </div>

            {/* REDACTED COVER */}
            <div className="
                absolute inset-0 bg-[#0A0A0A] z-20
                transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]
                origin-bottom group-hover:translate-y-full
                opacity-85
            ">
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-[#D16D6A]/50 text-xs tracking-[0.5em] uppercase border border-[#D16D6A]/30 px-4 py-1">
                        Restricted Access
                    </span>
                </div>
            </div>

            {/* CONTENT */}
            <div className="absolute inset-0 z-30 p-6 md:p-8 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div>
                        <span className="font-mono text-[10px] text-[#D16D6A]">
                            CASE ID: {id}
                        </span>
                        <span className="block font-mono text-xs text-white/60">
                            {category}
                        </span>
                    </div>
                    {link && (
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                            <ArrowUpRightIcon className="w-4 h-4 text-white" />
                        </div>
                    )}
                </div>

                <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
                    <ScrambleTitle text={title} active={hovered} />
                </h3>
            </div>

            {/* HOVER BORDER */}
            <div className="
                absolute inset-0 border border-[#D16D6A]
                opacity-0 group-hover:opacity-100
                transition-all duration-500 z-40
                pointer-events-none
            " />
        </Wrapper>
    );
};

// --- MAIN COMPONENT ---
export const Work: React.FC = () => {
    const [ref, isVisible] = useInView({ threshold: 0.1 });

    const projects = [
        {
            id: "TT-01",
            title: "TONY THOMPSON",
            category: "BRAND + DIGITAL PLATFORM",
            image: AboutImg,
            link: "https://www.meettonythompson.com",
            className: "col-span-1 md:col-span-12 lg:col-span-8 h-[420px]"
        },
        {
            id: "88-A",
            title: "EATALY",
            category: "E-COMMERCE REBRAND",
            image: EatalyImg,
            className: "col-span-1 md:col-span-6 lg:col-span-4 h-[400px]"
        },
        {
            id: "42-X",
            title: "ORIGINAL",
            category: "CAMPAIGN STRATEGY",
            image: LevisImg,
            className: "col-span-1 md:col-span-6 lg:col-span-4 h-[400px]"
        },
        {
            id: "19-Z",
            title: "PUNO",
            category: "FINTECH PLATFORM",
            image: PunoImg,
            className: "col-span-1 md:col-span-12 lg:col-span-4 h-[400px]"
        },
        {
            id: "07-B",
            title: "ORBIT",
            category: "AI INTERFACE",
            image: FullSvg,
            className: "col-span-1 md:col-span-12 lg:col-span-8 h-[400px]"
        },
        {
            id: "99-Ω",
            title: "NEXUS",
            category: "IDENTITY SYSTEM",
            image: LogoImg,
            className: "col-span-1 md:col-span-6 lg:col-span-4 h-[400px]"
        }
    ];

    return (
        <section className="py-24 md:py-32 bg-[#050505] text-[#EBE9DF] relative overflow-hidden border-t border-white/5">
            <div className="max-w-[90rem] mx-auto px-6 md:px-12">
                <div
                    ref={ref}
                    className={`mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-12'}`}
                >
                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white">
                        Project <span className="text-[#D16D6A]">Archive</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {projects.map((project, i) => (
                        <ProjectCard key={i} {...project} delay={i * 100} />
                    ))}
                </div>
            </div>
        </section>
    );
};
