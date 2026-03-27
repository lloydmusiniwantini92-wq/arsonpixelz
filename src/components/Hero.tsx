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
export const HeroContent: React.FC<HeroContentProps> = ({ theme, loaded }) => {
  const navigate = useNavigate();
  const isDark = theme === 'dark';

  // Thematic Classes - Forced to LIGHT for visibility against cinematic background
  const textColor = 'text-[#EBE9DF]';
  const textMuted = 'text-[#EBE9DF]/70';
  const textSub = 'text-[#EBE9DF]/50';
  const accentColor = '#D16D6A';
  const strokeColor = 'rgba(235,233,223,0.4)';

  return (
    <div className={`relative h-screen w-full flex flex-col overflow-hidden ${isDark ? 'bg-[#080808]' : 'bg-[#EBE9DF]'}`}>
      
      {/* ── Background Layer (Persistent & Unmasked) ── */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden bg-[#080808]">
          <motion.img 
            src={ArsonicBg} 
            alt="Arsonic Background" 
            className="absolute inset-0 h-full w-full object-cover origin-center max-w-none" 
            variants={{
                hidden: { scale: 1, filter: 'blur(20px) brightness(1.5)', opacity: 0 },
                visible: { 
                    scale: 1, 
                    filter: 'blur(0px) brightness(1)', 
                    opacity: 1,
                    transition: { duration: 2.2, ease: 'easeOut' } 
                }
            }}
            initial="hidden"
            animate={loaded ? "visible" : "hidden"}
            style={{ 
              animation: (isDark && loaded) ? 'void-drift 20s ease-in-out infinite alternate' : 'none'
            }} 
          />
          
          {/* Subtle themed overlays only for the Dark layer to aid contrast for the Singularity */}
          {isDark && (
            <div className="absolute inset-0 z-0 pointer-events-none">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(209,109,106,0.3)_0%,rgba(209,109,106,0.1)_40%,transparent_75%)]" />
               <div
                 className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(180,60,50,0.15)_0%,transparent_60%)]"
                 style={{ animation: 'orb-breathe 4s ease-in-out infinite' }}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/40 via-transparent to-[#080808]/20" />
               
               {/* Concentric rings */}
               <div className="absolute rounded-full border border-[#D16D6A]/20" style={{ width: '75%', height: '75%', left: '12.5%', top: '12.5%', animation: 'ring-spin 18s linear infinite' }} />
               <div className="absolute rounded-full border border-[#D16D6A]/14" style={{ width: '55%', height: '55%', left: '22.5%', top: '22.5%', animation: 'ring-spin 10s linear infinite reverse' }} />
               <div className="absolute rounded-full border border-[#D16D6A]/10" style={{ width: '90%', height: '90%', left: '5%', top: '5%', animation: 'ring-spin 30s linear infinite' }} />
            </div>
          )}
      </div>

      {/* ── Content layer ── */}
      <div className="relative z-10 flex-1 flex flex-col">
        
        {/* Vertical left accent */}
        <div className={`absolute left-4 md:left-6 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-1000 delay-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col items-center gap-3">
            <div className={`w-px h-16 bg-gradient-to-b from-transparent to-[${accentColor}]/60`} />
            <span className={`font-mono text-[8px] tracking-[0.4em] uppercase ${textSub}`} style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              ARSONPIXELZ © 2024
            </span>
            <div className={`w-px h-16 bg-gradient-to-t from-transparent to-[${accentColor}]/60`} />
          </div>
        </div>

        {/* Main headline */}
        <div className="flex-1 flex flex-col justify-center pt-20 md:pt-24 pb-24 px-8 md:px-16">
          <div className={`mb-4 transition-all duration-700 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <span className={`font-mono text-xs tracking-[0.35em] uppercase ${textMuted}`}>
              Silicon Valley Standard ↗ Cape Town
            </span>
          </div>

          <div className="flex flex-col font-black uppercase tracking-tighter leading-[0.82] max-w-[72%]" style={{ fontFamily: 'Montserrat, sans-serif', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}>
            <RevealText
              text="NEXT-GEN"
              tag="h1"
              className={`block text-[14vw] md:text-[9vw] ${textColor}`}
              delay={0.15}
              startAnimation={loaded}
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
            />
            <div className="flex items-baseline flex-wrap gap-x-4">
              <RevealText
                text="DIGITAL"
                tag="div"
                className={`block text-[9vw] md:text-[6vw] text-[#EBE9DF]/80`}
                delay={0.3}
                startAnimation={loaded}
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
              />
              <RevealText
                text="CREATIVE"
                tag="div"
                className={`block text-[9vw] md:text-[6vw] ${textColor} font-black`}
                delay={0.38}
                startAnimation={loaded}
                style={{ 
                  textShadow: '0 0 20px rgba(209,109,106,0.8), 0 0 10px rgba(209,109,106,0.4), 0 2px 12px rgba(0,0,0,0.3)',
                  filter: 'drop-shadow(0 0 8px rgba(209,109,106,0.5))'
                }}
              />
            </div>
            <RevealText
              text="STUDIO"
              tag="div"
              className={`block text-[18vw] md:text-[12vw] text-[#D16D6A] leading-[0.78]`}
              delay={0.5}
              startAnimation={loaded}
              style={{ textShadow: '0 4px 20px rgba(209,109,106,0.3)' }}
            />
          </div>
        </div>

        {/* Floating HUD Elements */}
        
        {/* HUD Text (Left) */}
        <div className={`absolute bottom-8 left-8 md:left-16 transition-all duration-1000 delay-[800ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="font-mono text-[10px] md:text-xs text-[#EBE9DF]/60 leading-relaxed max-w-xs hidden sm:block">
            Constructing <strong className="text-[#EBE9DF]">high-fidelity</strong> experiences<br className="hidden md:block" /> for the next internet.
          </p>
        </div>

        {/* Quantum Scroll (Center) */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-[900ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <QuantumScroll isDark={true} />
        </div>

        {/* CTA Button (Right) */}
        <div className={`absolute bottom-8 right-8 md:right-16 transition-all duration-1000 delay-[1000ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <MagneticButton onClick={() => {
              if (window.location.pathname === '/') {
                  setTimeout(() => {
                      document.getElementById('work-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
              } else {
                  navigate('/#work-section');
              }
          }}>
            <button className={`group flex items-center gap-3 bg-[#EBE9DF] text-[#0a0a0a] hover:bg-[#D16D6A] px-6 py-3 font-mono text-xs uppercase tracking-widest transition-colors duration-300 shadow-xl`}>
              <span>Explore Work</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </MagneticButton>
        </div>

      </div>

      <style>{`
        @keyframes void-drift { from { opacity: 0.8; } to { opacity: 1; } }
        @keyframes ring-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orb-breathe { 0%, 100% { opacity: 0.7; } 50% { opacity: 1; } }
      `}</style>
    </div>
  );
};

export const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const { isInitialLoad } = useContext(NavigationContext);

  useEffect(() => {
    const delay = isInitialLoad ? 3100 : 500;
    const timer = setTimeout(() => setLoaded(true), delay);
    return () => clearTimeout(timer);
  }, [isInitialLoad]);

  return (
    <section id="hero-section" className="relative h-screen w-full overflow-hidden bg-[#EBE9DF]">
      <HeroContent theme="light" loaded={loaded} />
    </section>
  );
};