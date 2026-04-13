/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useIgnition } from './layout/IgnitionRuntime';
import { BrutalistButton } from './common/BrutalistButton';
import { useIntelligence } from '../context/IntelligenceContext';

import TonyThompsonClean from '../assets/t1.jpg';

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
  const { setHoverTarget } = useIntelligence();
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
            SELECTED<br />WORKS
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

              <BrutalistButton 
                label="Access File_"
                onClick={() => navigate(project.link)}
                variant="white"
                className="w-full"
                size="md"
              />
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
          <div className="sticky top-0 z-40 bg-gradient-to-b from-[#050505] via-[#050505]/90 to-transparent px-6 md:px-12 pt-16 md:pt-20 pb-12 text-center pointer-events-none">
            <motion.h2 
                initial={{ opacity: 0, y: -100, rotate: -5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, type: 'spring', bounce: 0.3 }}
                className="uppercase text-white leading-[0.8] tracking-tighter inline-block mx-auto pointer-events-auto" 
                style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(60px, 13vw, 300px)' }}
            >
              SELECTED
            </motion.h2>
          </div>

          {/* Scrollable List */}
          <div className="flex flex-col flex-grow">
            {PROJECTS.map((project, index) => {
              const isActive = activeIndex === index;
              return (
                <motion.div
                  key={`desktop-${project.id}`}
                  ref={el => { itemRefs.current[index] = el; }}
                  data-project-id={project.id}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setHoverTarget({
                      id: project.id,
                      type: 'project',
                      name: `${project.title1} ${project.title2}`,
                      description: project.description,
                      level: 'high'
                  })}
                  onMouseLeave={() => setHoverTarget(null)}
                  initial={{ opacity: 0, x: -100, rotateX: -90 }}
                  whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                  transition={{ duration: 0.8, delay: index * 0.15, type: 'spring', bounce: 0.4 }}
                  className={`group relative px-12 py-10 border-b border-white/5 cursor-pointer transition-all duration-500 overflow-hidden ${isActive ? 'bg-white/[0.02]' : 'hover:bg-white/[0.01]'}`}
                  style={{ transformOrigin: 'top' }}
                >
                  {/* Tracking Line */}
                  <div className={`absolute left-0 top-0 h-full w-1 transition-all duration-500 ${isActive ? 'bg-[#FF3E00]' : 'bg-transparent'}`} />

                  <div className={`transition-transform duration-500 ${isActive ? 'scale-105' : 'scale-100'}`}>
                    <div className="flex justify-between items-center w-full mb-3">
                        <span className={`font-mono text-[10px] uppercase tracking-[0.3em] font-bold ${isActive ? 'text-[#FF3E00]' : 'text-white/40'}`}>
                            {project.number} // {project.type}
                        </span>
                    </div>

                    <h3 className={`uppercase leading-[0.85] tracking-tighter transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`} style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(3rem, 5vw, 6rem)' }}>
                      {project.title1} {project.title2}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </aside>

        {/* RIGHT COLUMN: THE VIEWPORT (STRICT STRUCTURAL GRID) */}
        <div className="relative w-1/2 flex flex-col border-l border-white/5 bg-[#0a0a0a] group/visual">
          
          {/* MAIN VISUAL (FULL SECTION HEIGHT STRETCH) */}
          <motion.div 
            initial={{ opacity: 0, filter: 'blur(30px)', scale: 1.3 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -200px 0px" }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full bg-[#0a0a0a] overflow-hidden"
          >
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
                  className="w-full h-full object-cover filter brightness-75 contrast-110 group-hover/visual:scale-105 transition-transform duration-[20s] ease-out origin-center"
                />
                <div className="absolute inset-0 bg-[#FF3E00]/10 mix-blend-multiply group-hover/visual:bg-black/20 transition-all duration-700 pointer-events-none" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-10" />
          </motion.div>

          {/* VIEWPORT PERSISTENT UI OVERLAY (STICKY TO SCREEN) */}
          <div className="sticky top-0 h-screen w-full pointer-events-none z-50">
            
            {/* WORKS Header inside the image section */}
            <div className="absolute top-16 md:top-20 left-0 w-full flex justify-center mix-blend-overlay">
              <motion.h2 
                initial={{ opacity: 0, y: 150, rotate: 8, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.3, type: 'spring', bounce: 0.35 }}
                className="uppercase text-white/80 leading-[0.8] tracking-tighter text-center" 
                style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(60px, 13vw, 300px)' }}
              >
                WORKS
              </motion.h2>
            </div>
            
            {/* Aesthetic Grid Mask */}
            <div className="absolute top-4 right-4 opacity-20">
              <div className="flex flex-col items-end gap-1">
                <div className="w-12 h-[1px] bg-white" />
                <div className="w-8 h-[1px] bg-[#FF3E00]" />
              </div>
            </div>

            {/* Commentary (Description) */}
            <motion.div 
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.6, type: 'spring', bounce: 0.3 }}
                className="absolute bottom-12 left-12 max-w-sm pointer-events-auto"
            >
              <p className="font-mono text-[12px] font-bold text-white/70 leading-relaxed uppercase tracking-[0.2em] border-l border-[#FF3E00] pl-4 drop-shadow-xl">
                {activeProject.description}
              </p>
            </motion.div>

          </div>

          {/* BRUTALIST CTA ANCHOR (CENTERED BOTTOM) */}
          <motion.div 
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8, type: 'spring', bounce: 0.6 }}
              className="absolute bottom-32 left-1/2 -translate-x-1/2 z-[60] pointer-events-auto"
          >
             <BrutalistButton 
                 label="OPEN GALLERY"
                 onClick={() => navigate(activeProject.link)}
                 variant="orange"
                 size="lg"
             />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
