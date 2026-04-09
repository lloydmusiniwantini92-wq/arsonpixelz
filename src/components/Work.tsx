/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useIgnition } from './layout/IgnitionRuntime';

import TonyThompsonClean from './assets/TonyThompsonClean.webp';

interface Project {
  id: string;
  type: string;
  location: string;
  year: string;
  title1: string;
  title2: string;
  number: string;
  mainImage: string;
  secondaryImage: string;
  mainImageAlt: string;
  description: string;
  uxProtocol: string;
  metadataLabel: string;
  coordinates: string;
  techStack: string[];
  status: string;
  link: string;
}

const PROJECTS: Project[] = [
  {
    id: "tt-01",
    type: "BRAND / PLATFORM",
    location: "GLOBAL",
    year: "2024",
    title1: "TONY",
    title2: "THOMPSON",
    number: "01",
    mainImage: TonyThompsonClean,
    secondaryImage: "/images/archive1/Screenshot 2026-03-19 014751.webp",
    mainImageAlt: "Tony Thompson digital platform snapshot",
    description: "A comprehensive digital brand execution engineered for a high-velocity creator.",
    uxProtocol: "98%",
    metadataLabel: "SYSTEMS_ARCH",
    coordinates: "51.5074_N_0.1278_W",
    techStack: ["REACT", "MOTION", "TYPESCRIPT"],
    status: "OPERATIONAL",
    link: "/archive/tt-01"
  },
  {
    id: "ea-42",
    type: "RETAIL GOLIATH",
    location: "MILAN_IT",
    year: "2024",
    title1: "EATALY",
    title2: "STRUCTURE",
    number: "02",
    mainImage: "/images/eataly/b1cbbd148768185.62dafea48505f.webp",
    secondaryImage: "/images/eataly/eataly_05.webp",
    mainImageAlt: "Eataly visual direction",
    description: "Synthesizing heritage with the digital frontier.",
    uxProtocol: "100%",
    metadataLabel: "RETAIL_EXPERIENCE",
    coordinates: "45.4654_N_9.1859_E",
    techStack: ["THREE.JS", "GSAP", "WEBGL"],
    status: "ACTIVE_PROTOCOL",
    link: "/archive/ea-42"
  },
  {
    id: "pn-88",
    type: "ARCHITECTURAL AGRONOMY",
    location: "BERLIN_DE",
    year: "2024",
    title1: "PUNO",
    title2: "SYSTEMS",
    number: "03",
    mainImage: "/images/puno/puno_01.webp",
    secondaryImage: "/images/puno/puno_04.webp",
    mainImageAlt: "Puno application UI",
    description: "Bypassing traditional agricultural input methods.",
    uxProtocol: "92%",
    metadataLabel: "AGRONOMY_INTEL",
    coordinates: "52.5200_N_13.4050_E",
    techStack: ["PYTHON", "COORD_MAP", "REACT"],
    status: "SYNC_COMPLETE",
    link: "/archive/pn-88"
  },
  {
    id: "lr-11",
    type: "INDUSTRIAL DESIGN",
    location: "VENICE_IT",
    year: "2025",
    title1: "LA",
    title2: "RADICE",
    number: "04",
    mainImage: "/images/laradice/laradice_01.webp",
    secondaryImage: "/images/laradice/laradice_03.webp",
    mainImageAlt: "LaRadice furniture structure",
    description: "Digitizing structured furniture architecture.",
    uxProtocol: "95%",
    metadataLabel: "MATERIAL_RESON",
    coordinates: "45.4408_N_12.3155_E",
    techStack: ["RUST", "ARSON_PROTO", "TYPESCRIPT"],
    status: "STABILIZED",
    link: "/archive/lr-11"
  }
];

export const Work: React.FC = () => {
  const { lenis } = useIgnition();
  const { hash } = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeProject = PROJECTS[activeIndex];

    // Automatic scroll-tracking disabled per USER request (Selection is now strictly click-driven)


  // New: Robust hash-to-anchor scroll handling with Lenis
  useEffect(() => {
    if (hash === '#work-section' && lenis) {
      // Small timeout to allow the AnimatePresence and layout to settle
      const timeout = setTimeout(() => {
        lenis.scrollTo('#work-section', {
          duration: 1.8,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          offset: -50 // Adjusting to show header clearly
        });
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [hash, lenis]);

  return (
    <section id="work-section" className="relative w-full bg-[#050505] border-y border-white/5 font-sans selection:bg-[#FF3E00] selection:text-white z-[40]">
      {/* ── MOBILE: UNIFIED BRUTALIST SECTOR CARDS (Hidden on LG) ── */}
      <div className="lg:hidden flex flex-col w-full bg-[#050505]">
        <div className="px-6 pt-20 pb-10 border-b border-white/5 text-center bg-[#050505]">
          <h2 className="uppercase text-white leading-[0.8] tracking-tighter inline-block" style={{ fontFamily: 'Anton, sans-serif', fontSize: '18vw' }}>
            Selected<br />Works
          </h2>
        </div>

        {PROJECTS.map((project, index) => (
          <div
            key={`mobile-${project.id}`}
            className="relative w-full border-b border-white/10 overflow-hidden h-screen flex flex-col bg-[#050505]"
          >
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
              <img
                src={project.mainImage}
                alt={project.mainImageAlt}
                className="w-full h-full object-cover filter brightness-50 contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex-1 flex flex-col justify-end p-8 pb-12">
              <div className="mb-6 flex flex-col items-start gap-2">
                <span className="bg-[#FF3E00] text-black font-mono text-[9px] font-black px-2 py-0.5 tracking-wider uppercase">
                  SECTOR_RECORD_{project.number}
                </span>
                <span className="text-white/40 font-mono text-[10px] tracking-[0.3em] uppercase">
                  {project.type} // {project.location}
                </span>
              </div>

              <h3 className="text-white uppercase leading-[0.8] tracking-tighter mb-10" style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(5rem, 15vw, 8rem)' }}>
                {project.title1}<br />{project.title2}
              </h3>

              <p className="font-mono text-[11px] text-white/50 leading-relaxed uppercase tracking-widest mb-12 max-w-[80%] border-l border-[#FF3E00] pl-4">
                {project.description}
              </p>

              <button
                onClick={() => navigate(project.link)}
                className="group relative w-full py-6 flex items-center justify-center bg-white text-black font-black uppercase tracking-[0.4em] text-sm overflow-hidden"
              >
                <span className="relative z-10">Access File_</span>
                <div className="absolute inset-0 bg-[#FF3E00] translate-y-full group-active:translate-y-0 transition-transform duration-300" />
              </button>
            </div>

            {/* Aesthetic Grid Mask */}
            <div className="absolute top-4 right-4 z-20 pointer-events-none opacity-20">
              <div className="flex flex-col items-end gap-1">
                <div className="w-12 h-[1px] bg-white" />
                <div className="w-8 h-[1px] bg-[#FF3E00]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── DESKTOP: SPLIT VIEWPORT ARCHITECTURE (Hidden on Mobile) ── */}
      <div className="hidden lg:flex flex-row items-stretch">
        {/* LEFT COLUMN: THE ROSTER (DARK TERMINAL) */}
        <aside className="relative w-1/2 bg-[#050505] z-30 border-r border-white/5 flex flex-col">
          {/* Header */}
          <div className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-xl border-b border-white/5 px-6 md:px-12 pt-16 md:pt-20 pb-6 md:pb-8 text-center">
            <h2 className="uppercase text-white leading-[0.8] tracking-tighter inline-block mx-auto" style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(4rem, 9vw, 12rem)' }}>
              Selected Works
            </h2>
          </div>

          {/* Scrollable List */}
          <div className="flex flex-col flex-grow">
            {PROJECTS.map((project, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={`desktop-${project.id}`}
                  ref={el => { itemRefs.current[index] = el; }}
                  data-project-id={project.id}
                  onClick={() => setActiveIndex(index)}
                  className={`group relative px-12 py-8 border-b border-white/5 cursor-pointer transition-all duration-500 overflow-hidden ${isActive ? 'bg-white/[0.02]' : 'hover:bg-white/[0.01]'}`}
                >
                  {/* Tracking Line */}
                  <div className={`absolute left-0 top-0 h-full w-1 transition-all duration-500 ${isActive ? 'bg-[#FF3E00]' : 'bg-transparent'}`} />

                  <div className={`transition-transform duration-500 ${isActive ? 'scale-105' : 'scale-100'} flex flex-col items-center text-center`}>
                    <div className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-wider mb-2">
                      <span className={isActive ? 'text-[#FF3E00]' : 'text-white/40'}>{project.number} // {project.type}</span>
                    </div>

                    <h3 className={`uppercase leading-[0.85] tracking-tighter transition-colors duration-500 ${isActive ? 'text-[#FF3E00]' : 'text-white/80 group-hover:text-white'}`} style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(3rem, 5vw, 6rem)' }}>
                      {project.title1} {project.title2}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* RIGHT COLUMN: THE VIEWPORT (STRICT STRUCTURAL GRID) */}
        <div className="relative w-1/2 flex flex-col border-l border-white/5 bg-[#0a0a0a]">
          {/* MAIN VISUAL (STICKY AT TOP) */}
          <div className="sticky top-0 h-[85vh] w-full bg-[#0a0a0a] overflow-hidden group/visual">
            <AnimatePresence mode="wait">
              <motion.div
                key={`main-img-${activeProject.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 h-full w-full"
              >
                <img
                  src={activeProject.mainImage}
                  alt={activeProject.mainImageAlt}
                  className="w-full h-full object-cover filter brightness-90 contrast-110 group-hover/visual:scale-105 transition-transform duration-[2s] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

                {/* Commentary (Description) */}
                <div className="absolute bottom-10 left-10 z-20 max-w-sm">
                  <p className="font-mono text-[11px] text-white/70 leading-relaxed uppercase tracking-widest drop-shadow-lg">
                    {activeProject.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* THE THICKEST CTA IN THE WORLD (MONOLITHIC VERTICAL COLUMN) */}
          <button
            onClick={() => navigate(activeProject.link)}
            className="group relative flex-1 w-full bg-[#FF3E00] text-white hover:bg-white hover:text-[#FF3E00] transition-all duration-700"
          >
            {/* NESTED SECONDARY IMAGE (STICKY & BLENDED) */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={`sec-img-${activeProject.id}`}
                        src={activeProject.secondaryImage}
                        alt="Project detail"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.3, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.8 }}
                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000"
                    />
                </AnimatePresence>
                {/* Dynamic Color Mask */}
                <div className="absolute inset-0 bg-[#FF3E00]/40 mix-blend-multiply group-hover:bg-white/20 group-hover:mix-blend-overlay transition-all duration-[0.8s]" />
            </div>

            {/* STICKY CTA LABEL */}
            <div className="sticky top-[85vh] h-[15vh] w-full flex flex-col items-center justify-center z-10 pointer-events-none px-12 transition-colors duration-700">
              <div className="flex flex-col items-center text-center">
                <span 
                    className="uppercase leading-none tracking-normal" 
                    style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(3rem, 6vw, 10rem)' }}
                >
                    Access
                </span>
                <span 
                    className="uppercase leading-none tracking-normal group-hover:translate-y-1 transition-transform duration-700" 
                    style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(3rem, 6vw, 10rem)' }}
                >
                    File
                </span>
              </div>
            </div>

            {/* Cinematic Arrow Indicator (Horizontal to Angled) */}
            <div className="sticky top-[85vh] h-[15vh] w-full flex items-center justify-end pr-10 md:pr-20 z-10 pointer-events-none">
                <ArrowRightIcon className="w-16 h-16 md:w-24 md:h-24 opacity-40 group-hover:opacity-100 transition-all duration-700 rotate-0 group-hover:-rotate-45" />
            </div>

            {/* Kinetic Border Edge */}
            <div className="absolute bottom-0 left-0 w-full h-2 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left" />
          </button>
        </div>
      </div>
    </section>
  );
};
