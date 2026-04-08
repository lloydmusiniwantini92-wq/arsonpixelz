/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

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
        metadataLabel: "SYSTEMS_MONOLITH",
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
        title2: "MONOLITH",
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
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeProject = PROJECTS[activeIndex];

  // Optimized Intersection Observer for smoother tracking
  useEffect(() => {
    const nodes = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-project-id');
            const index = PROJECTS.findIndex(p => p.id === id);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full bg-[#050505] border-y border-white/5 font-sans selection:bg-[#FF3E00] selection:text-white">
      <div className="flex flex-col lg:flex-row items-stretch">
        
        {/* ========================================== */}
        {/* LEFT COLUMN: THE ROSTER (DARK TERMINAL)    */}
        {/* ========================================== */}
        <aside className="relative w-full lg:w-1/2 bg-[#050505] z-30 lg:border-r border-white/5 flex flex-col">
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
                  key={`index-${project.id}`}
                  ref={el => { itemRefs.current[index] = el; }}
                  data-project-id={project.id}
                  onClick={() => setActiveIndex(index)}
                  className={`group relative px-6 md:px-12 py-6 md:py-8 border-b border-white/5 cursor-pointer transition-all duration-500 overflow-hidden ${isActive ? 'bg-white/[0.02]' : 'hover:bg-white/[0.01]'}`}
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

        {/* ========================================== */}
        {/* RIGHT COLUMN: THE VIEWPORT (STRICT STRUCTURAL GRID) */}
        {/* ========================================== */}
        <div className="relative w-full lg:w-1/2 lg:sticky lg:top-0 h-auto bg-black overflow-hidden z-10 flex flex-col border-l border-white/5">
          
          {/* TOP IMAGE (2/3 HEIGHT) */}
          <div className="relative h-[66.6vh] lg:h-[66.6%] w-full bg-[#0a0a0a] overflow-hidden">
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
                  className="w-full h-full object-cover filter brightness-90 contrast-110"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* BOTTOM IMAGE (STRETCHES TO FILL) */}
          <div className="relative flex-1 w-full min-h-[33.4vh] lg:min-h-0 bg-[#050505] overflow-hidden border-t border-white/10 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={`sec-img-${activeProject.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="absolute inset-0 h-full w-full"
              >
                <img
                  src={activeProject.secondaryImage}
                  alt="Detail view"
                  className="w-full h-full object-cover filter brightness-75 contrast-125 saturate-50 grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-black/40" />
              </motion.div>
            </AnimatePresence>

            {/* Description Overlay */}
            <div className="absolute bottom-10 left-10 z-20 max-w-sm">
               <p className="font-mono text-[10px] text-white/50 leading-relaxed uppercase tracking-wider">
                  {activeProject.description}
               </p>
            </div>
          </div>

          {/* ACCESS FILE BUTTON: CENTERED ON THE DATUM */}
          <div className="absolute top-[66.6%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
            <button 
              onClick={() => navigate(activeProject.link)}
              className="group flex items-center bg-white text-black px-8 py-5 hover:bg-[#FF3E00] hover:text-white transition-all duration-500 border border-black/10 hover:scale-105 active:scale-95 shadow-2xl"
            >
              <span className="font-black uppercase tracking-[0.4em] text-[10px] mr-6">Access File</span>
              <div className="w-10 h-[1.5px] bg-black group-hover:bg-white transition-colors" />
              <ArrowRightIcon className="w-5 h-5 ml-4 transform group-hover:-rotate-45 transition-transform duration-500" />
            </button>
          </div>

          {/* Minimalist Global CRT Grid Overlay */}
          <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>
      </div>
    </section>
  );
};
