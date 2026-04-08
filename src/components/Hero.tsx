import React, { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationContext } from '../App';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroBg from './assets/USE.webp';
import { RevealText } from './fx/RevealText';
import { MagneticButton } from './fx/MagneticButton';
import { QuantumScroll } from './fx/QuantumScroll';

// Character scramble helper for the wow factor
const SCRAMBLE_CHARS = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
const ScrambleText: React.FC<{ text: string; active: boolean }> = ({ text, active }) => {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    if (!active) { setDisplay(text); return; }
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplay(text.split("").map((letter, i) => {
        if (i < iterations) return text[i];
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }).join(""));
      iterations += 0.5;
      if (iterations >= text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [active, text]);
  return <>{display}</>;
};

gsap.registerPlugin(ScrollTrigger);

interface HeroContentProps {
  theme: 'light' | 'dark';
  loaded: boolean;
}

/**
 * HeroContent renders the visual structure of the hero, themed for light/dark mode.
 */
export const HeroContent: React.FC<{ loaded: boolean }> = ({ loaded }) => {
  const navigate = useNavigate();
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const handleStart = () => {
      setBooting(true);
      setTimeout(() => setBooting(false), 2500);
    };
    window.addEventListener('sessionInitiated', handleStart);
    // Initial fallback if preloader is skipped or fast-loaded
    const timer = setTimeout(() => setBooting(false), 3000);
    return () => {
      window.removeEventListener('sessionInitiated', handleStart);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (loaded) {
        gsap.fromTo("#shatter-displace", 
            { attr: { scale: 0 } }, 
            { attr: { scale: 12 }, duration: 2.0, delay: 2.0, ease: "power2.inOut" }
        );
    } else {
        gsap.set("#shatter-displace", { attr: { scale: 0 } });
    }
  }, [loaded]);

  // Thematic Classes
  const textColor = 'text-white';
  const textMuted = 'text-white/60';
  const textSub = 'text-white/40';

  return (
    <>
    {/* SVG Noise Filter for Micro-Shatter */}
    <svg className="hidden">
      <filter id="spiky-strobes" x="-50%" y="-50%" width="200%" height="200%">
        {/* Small internal displacement for the letters themselves (adds to internal shatter effect) */}
        <feTurbulence type="fractalNoise" baseFrequency="0.05 0.5" numOctaves="1" result="shatterNoise" />
        <feDisplacementMap id="shatter-displace" in="SourceGraphic" in2="shatterNoise" scale="0" xChannelSelector="R" yChannelSelector="G" result="shatteredText" />
      </filter>
    </svg>


    <div className="relative h-screen w-full flex flex-col overflow-hidden bg-[#000000]">
      
      {/* ── Background Layer ── */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden bg-[#000000]">
          <motion.img 
            src={HeroBg} 
            alt="Arsonic Background" 
            className="absolute inset-0 h-full w-full object-cover object-[40%_15%] origin-center max-w-none" 
            variants={{
                hidden: { scale: 1.1, filter: 'blur(30px) brightness(0)', opacity: 0 },
                visible: { 
                    scale: 1, 
                    filter: 'blur(0px) brightness(1.5)', 
                    opacity: 1,
                    transition: { duration: 2.5, ease: [0.16, 1, 0.3, 1] } 
                }
            }}
            initial="hidden"
            animate={loaded ? "visible" : "hidden"}
          />
      </div>

      {/* ── Content layer ── */}
      <div className="relative z-10 flex-1 flex flex-col">
        
        {/* New Branding Container - Redesigned for Wild Fly-Ins */}
        <div 
            className="absolute top-[25%] z-20 flex flex-col items-start select-none pointer-events-none -translate-y-1/2 w-full max-w-[1920px] mx-auto left-0 right-0 px-2 md:px-6"
            style={{ marginLeft: '0.5cm', marginTop: '6cm' }}
        >
            <div className="inline-block branding-group font-sans font-black leading-[0.7]">
                
                {/* 'Digital' with Character-Staged Wild Fly-In */}
                <div 
                    className="relative mb-[-10px] md:mb-[-15px] flex overflow-visible"
                >
                    {[
                        { char: 'D', z: 20 },
                        { char: 'i', z: 19 },
                        { char: 'g', z: 10 },
                        { char: 'i', z: 19 },
                        { char: 't', z: 20 },
                        { char: 'a', z: 21 },
                        { char: 'l', z: 22 }
                    ].map((item, index) => (
                        <motion.span 
                            key={index}
                            initial={{ opacity: 0, y: 120, x: -50, scale: 0.2, rotateX: 90, filter: 'blur(30px) brightness(2)' }}
                            animate={loaded ? { 
                                opacity: [0, 1, 1, 1], // Fade and stay opaque
                                y: 0, x: 0, scale: 1, rotateX: 0, 
                                filter: [
                                    'blur(30px) brightness(2)',
                                    'blur(0px) brightness(1)', // Fly-in finish (clean)
                                    'blur(0px) brightness(1)', // Hold clean
                                    'url(#spiky-strobes) blur(0px) brightness(1)' // Ultimate solidification
                                ]
                            } : {}}
                            transition={{ 
                                duration: 25, // Recalibrated for 2x slower session
                                times: [0, 0.14, 0.9, 1], // Fly-in (3.6s), Solid (18.9s), Glassify (2.5s)
                                delay: 0.1 + (index * 0.08), // Accelerated staggered timing
                                ease: [0.16, 1, 0.3, 1] 
                            }}
                            className="text-white text-[clamp(6.5rem,14.5vw,16.5rem)] font-black block leading-[0.8] relative pointer-events-none"
                            style={{ 
                                zIndex: item.z,
                                marginLeft: index === 0 ? '0' : '-0.08em'
                            }}
                        >
                            {item.char}
                        </motion.span>
                    ))}
                </div>

                {/* 'CREATIVE STUDIO' - Unified Rubbery Fly-In (2x Slower) */}
                <motion.div 
                    initial={{ opacity: 0, y: 120, x: -50, scale: 0.2, rotateX: 90, filter: 'blur(30px) brightness(2)' }}
                    animate={loaded ? { 
                        opacity: 1, y: 0, x: 0, scale: 1, rotateX: 0, filter: 'blur(0px) brightness(1)' 
                    } : {}}
                    transition={{ duration: 7.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="w-[97.75%] ml-1.5 flex justify-between text-[#FF6A00] text-[clamp(2.25rem,4.5vw,5rem)] mt-6 md:mt-8 tracking-normal uppercase relative" 
                    style={{ fontFamily: '"Erica One", cursive', zIndex: 15, WebkitTextStroke: '1px #000000' }}
                >
                    {"CREATIVE STUDIO".split('').map((char, index) => (
                        <span key={index}>{char === ' ' ? '\u00A0' : char}</span>
                    ))}
                </motion.div>

                {/* Avant-Garde Slogan Fragmentation */}
                <div className="mt-14 ml-2 flex flex-col items-start gap-4 relative z-30">
                    <motion.div
                        initial={{ opacity: 0, x: -20, filter: 'blur(20px)' }}
                        animate={loaded ? { 
                            opacity: [0, 1, 0.8, 1],
                            x: 0,
                            filter: ['blur(20px)', 'blur(0px)', 'url(#spiky-strobes) blur(0px)', 'blur(0px)']
                        } : {}}
                        transition={{ duration: 4.4, delay: 1.2, times: [0, 0.2, 0.8, 1] }}
                        className="text-white font-['Space_Grotesk'] text-[clamp(1rem,1.8vw,1.8rem)] font-bold tracking-[0.3em] uppercase"
                    >
                        YOUR DIGITAL EMPIRE.
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={loaded ? { 
                            opacity: [0, 1, 0.4, 1, 0.7, 1] 
                        } : {}}
                        transition={{ duration: 3.6, delay: 1.8, times: [0, 0.1, 0.3, 0.5, 0.8, 1] }}
                        className="ml-12 md:ml-24 text-white/60 font-['Space_Grotesk'] text-[clamp(0.8rem,1.4vw,1.4rem)] font-medium tracking-[0.5em] uppercase italic"
                    >
                        A WALK IN THE PARK.
                    </motion.div>
                </div>
            </div>
        </div>

        {/* Start Project CTA (Right) — Unified Rubbery Fly-In (2x Slower) */}
        <div className="absolute bottom-8 md:bottom-12 right-6 md:right-12 z-[1000] pointer-events-auto overflow-visible flex items-end justify-end">
          <motion.div 
              initial={{ opacity: 0, y: 120, x: -50, scale: 0.2, rotateX: 90, filter: 'blur(30px) brightness(2)' }}
              animate={loaded ? { opacity: 1, y: 0, x: 0, scale: 1, rotateX: 0, filter: 'blur(0px) brightness(1)' } : {}}
              transition={{ 
                duration: 3.6,
                delay: 0.6,
                ease: [0.16, 1, 0.3, 1]
              }}
          >
              <MagneticButton onClick={() => navigate('/contact')}>
              <button className="group relative px-8 py-3 md:px-12 md:py-4 bg-white text-[#FF3E00] font-sans font-extrabold uppercase tracking-[0.15em] text-[clamp(0.9rem,1.2vw,1.1rem)] rounded-full hover:bg-[#FF3E00] transition-all duration-300 shadow-[0_10px_30px_rgba(255,255,255,0.1)] overflow-hidden">
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">START PROJECT</span>
              </button>
              </MagneticButton>
          </motion.div>
        </div>

      </div>




      <style>{`
        @keyframes ring-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes scanline { 
            0% { transform: translateY(0); opacity: 0.1; }
            50% { opacity: 0.4; }
            100% { transform: translateY(100%); opacity: 0.1; }
        }
        @keyframes terminal-strobe {
          0%, 10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90% { opacity: 0; }
          5%, 15%, 25%, 35%, 45%, 55%, 65%, 75%, 85%, 95% { opacity: 1; }
          100% { opacity: 1; }
        }
        .animate-terminal-strobe {
          animation: terminal-strobe 2.2s steps(1) forwards;
        }
        .glitch-text-hero {
          position: relative;
          display: inline-block;
        }
        .glitch-text-hero::before,
        .glitch-text-hero::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          pointer-events: none;
        }
        .glitch-text-hero::before {
          left: 4px;
          text-shadow: -3px 0 rgba(0,255,255,0.8);
          clip-path: polygon(0 0, 100% 0, 100% 30%, 0 30%);
          animation: glitch-anim-1 3s infinite linear alternate-reverse;
        }
        .glitch-text-hero::after {
          left: -4px;
          text-shadow: -3px 0 rgba(255,0,0,0.8);
          clip-path: polygon(0 70%, 100% 70%, 100% 100%, 0 100%);
          animation: glitch-anim-2 2.5s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim-1 {
          0% { clip-path: polygon(0 20%, 100% 20%, 100% 28%, 0 28%); transform: translate(-3px, 1px); }
          50% { clip-path: polygon(0 45%, 100% 45%, 100% 52%, 0 52%); transform: translate(3px, 0); }
          100% { clip-path: polygon(0 75%, 100% 75%, 100% 82%, 0 82%); transform: translate(-2px, 2px); }
        }
        @keyframes glitch-anim-2 {
          0% { clip-path: polygon(0 15%, 100% 15%, 100% 22%, 0 22%); transform: translate(3px, -1px); }
          50% { clip-path: polygon(0 65%, 100% 65%, 100% 72%, 0 72%); transform: translate(-3px, 1px); }
          100% { clip-path: polygon(0 85%, 100% 85%, 100% 92%, 0 92%); transform: translate(2px, -2px); }
        }
        @keyframes branding-strobe {
          0%, 100% { opacity: 1; filter: brightness(1); }
          50% { opacity: 0.85; filter: brightness(1.4) contrast(1.2); }
          51% { opacity: 1; filter: brightness(1); }
          52% { opacity: 0.6; filter: brightness(1.6); }
          53% { opacity: 1; filter: brightness(1); }
          80% { opacity: 0.9; }
          81% { opacity: 1; }
        }

        /* Ripped Static & Shard Effects (Static) */
        .branding-container {
            width: fit-content;
        }
        .branding-group {
            width: max-content;
            max-width: 100vw;
        }
      `}</style>
    </div>
    </>
  );
};

export const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const { isInitialLoad } = useContext(NavigationContext);

  useEffect(() => {
    const delay = isInitialLoad ? 3500 : 800;
    const timer = setTimeout(() => setLoaded(true), delay);
    return () => clearTimeout(timer);
  }, [isInitialLoad]);

  return (
    <section id="hero-section" className="relative h-screen w-full overflow-hidden bg-[#000000]">
      <HeroContent loaded={loaded} />
    </section>
  );
};
