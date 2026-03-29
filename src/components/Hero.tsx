import React, { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationContext } from '../App';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ArsonicBg from './assets/arsonic.jpg';
import { RevealText } from './fx/RevealText';
import { MagneticButton } from './fx/MagneticButton';
import { QuantumScroll } from './fx/QuantumScroll';

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

  // Thematic Classes
  const textColor = 'text-white';
  const textMuted = 'text-white/60';
  const textSub = 'text-white/40';

  return (
    <div className="relative h-screen w-full flex flex-col overflow-hidden bg-[#000000]">
      
      {/* ── Background Layer ── */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden bg-[#000000]">
          <motion.img 
            src={ArsonicBg} 
            alt="Arsonic Background" 
            className="absolute inset-0 h-full w-full object-cover origin-center max-w-none grayscale opacity-40 mix-blend-screen" 
            variants={{
                hidden: { scale: 1.1, filter: 'blur(30px) brightness(0)', opacity: 0 },
                visible: { 
                    scale: 1, 
                    filter: 'blur(0px) brightness(1)', 
                    opacity: 0.4,
                    transition: { duration: 2.5, ease: [0.16, 1, 0.3, 1] } 
                }
            }}
            initial="hidden"
            animate={loaded ? "visible" : "hidden"}
          />
          
          {/* Subtle themed overlays */}
          <div className="absolute inset-0 z-0 pointer-events-none">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,62,0,0.15)_0%,transparent_70%)]" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-[#000000]/60" />
             
             {/* Concentric rings */}
             <div className="absolute rounded-full border border-[#FF3E00]/10" style={{ width: '80%', height: '80%', left: '10%', top: '10%', animation: 'ring-spin 30s linear infinite' }} />
             <div className="absolute rounded-full border border-[#FF3E00]/5" style={{ width: '60%', height: '60%', left: '20%', top: '20%', animation: 'ring-spin 20s linear infinite reverse' }} />
             
             {/* Scanline overlay */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-10 pointer-events-none bg-[size:100%_4px,3px_100%]" />
          </div>
      </div>

      {/* ── Content layer ── */}
      <div className="relative z-10 flex-1 flex flex-col">
        
        {/* Vertical left accent */}
        <div className={`absolute left-6 md:left-12 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-1000 delay-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col items-center gap-6">
            <div className="w-[1px] h-24 bg-gradient-to-b from-transparent to-[#FF3E00]/40" />
            <span className={`font-mono text-[9px] font-black tracking-[0.4em] uppercase ${textSub} italic`} style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                CORE_ENGINE // REL_2024
            </span>
            <div className="w-[1px] h-24 bg-gradient-to-t from-transparent to-[#FF3E00]/40" />
          </div>
        </div>

        {/* Main headline */}
        <div className="flex-1 flex flex-col justify-center pt-24 pb-24 px-12 md:px-24">
          <div className={`mb-6 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="inline-flex items-center gap-4">
                <div className="w-8 h-[2px] bg-[#FF3E00] shadow-[0_0_10px_#FF3E00]" />
                <span className={`font-mono text-[10px] font-black tracking-[0.4em] uppercase ${textMuted}`}>
                    Global Industry Standard // Cybernetic Creative
                </span>
            </div>
          </div>

          <div className="flex flex-col leading-[0.85] max-w-full select-none">
            <RevealText
              text="ARCHITECTING"
              tag="h1"
              className="block text-[clamp(3.5rem,10.5vw,13rem)] font-syne font-black uppercase tracking-tighter text-white italic"
              delay={0.2}
              startAnimation={loaded}
            />
            <div className="flex items-baseline flex-wrap gap-x-6 md:gap-x-10 mt-2">
              <RevealText
                text="DIGITAL"
                tag="div"
                className="block text-[clamp(2.5rem,8vw,9rem)] font-syne font-black uppercase tracking-tighter text-white/30 italic"
                delay={0.4}
                startAnimation={loaded}
              />
              <RevealText
                text="MONOLITHS"
                tag="div"
                className="block text-[clamp(2.5rem,8vw,9rem)] font-syne font-black uppercase tracking-tighter text-[#FF3E00] italic"
                delay={0.5}
                startAnimation={loaded}
                style={{ textShadow: '0 0 40px rgba(255,62,0,0.4)' }}
              />
            </div>
            <RevealText
              text="STUDIO"
              tag="div"
              className="block text-[clamp(4.5rem,13vw,16rem)] font-syne font-black uppercase tracking-tighter text-white italic -mt-4 md:-mt-8"
              delay={0.7}
              startAnimation={loaded}
            />
          </div>
        </div>

        {/* Floating HUD Elements */}
        
        {/* HUD Text (Left) */}
        <div className={`absolute bottom-12 left-12 md:left-24 transition-all duration-1000 delay-[1200ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] font-black text-[#FF3E00] tracking-[0.4em] uppercase">Status: Operating</span>
            <p className="font-mono text-[9px] md:text-[10px] text-white/40 leading-relaxed max-w-[240px] tracking-widest uppercase">
                Building the infrastructure for high-velocity brands in the evolving digital theatre.
            </p>
          </div>
        </div>

        {/* Quantum Scroll (Center) */}
        <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-[1400ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <QuantumScroll isDark={true} />
        </div>

        {/* CTA Button (Right) */}
        <div className={`absolute bottom-12 right-12 md:right-24 transition-all duration-1000 delay-[1600ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <MagneticButton onClick={() => {
              if (window.location.pathname === '/') {
                  setTimeout(() => {
                      document.getElementById('work-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
              } else {
                  navigate('/#work-section');
              }
          }}>
            <button className="group relative px-10 py-5 bg-white text-black font-syne font-black uppercase tracking-[0.4em] text-[11px] overflow-hidden transition-all duration-500">
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">Selected Works</span>
                <div className="absolute inset-0 bg-[#FF3E00] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16, 1, 0.3, 1)]" />
            </button>
          </MagneticButton>
        </div>

      </div>

      <style>{`
        @keyframes ring-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
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