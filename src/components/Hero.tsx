import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BrutalistButton } from './common/BrutalistButton';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroBg from './assets/USE.webp';

const ease = [0.23, 1, 0.32, 1]; // Premium Cinematic Easing

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: { 
            staggerChildren: 0.25, 
            delayChildren: 0.4,
            ease: ease
        } 
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 80, filter: 'blur(8px)' },
    visible: { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)', 
        transition: { 
            duration: 2.2, 
            ease: ease 
        } 
    },
};

export const HeroContent: React.FC<{ loaded: boolean }> = ({ loaded }) => {
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();
    
    // Parallax values
    const yHeroImg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

    return (
        <div className="relative min-h-screen bg-[#E6E4DD] text-black overflow-hidden flex flex-col justify-end pb-24 md:pb-32 pt-40 pl-[45px] md:pl-[70px] pr-6 md:pr-12 w-full">
            
            {/* Abstract Image Positioning (Using main site HeroBg) */}
            <motion.div 
                style={{ y: yHeroImg }} 
                className="absolute top-0 right-[10%] w-full max-w-[600px] h-[80vh] pointer-events-none"
            >
                <motion.img 
                    src={HeroBg} 
                    alt="ArsonPixelz Main Anchor" 
                    className="w-full h-full object-cover object-top" 
                    initial={{ opacity: 0, filter: 'blur(30px)', scale: 1.1 }}
                    animate={loaded ? { opacity: 1, filter: 'blur(0px)', scale: 1 } : {}}
                    transition={{ duration: 3.5, ease }}
                />
            </motion.div>

            <div className="relative z-10 w-full max-w-[1900px] mx-auto">
                <motion.div 
                    variants={containerVariants} 
                    initial="hidden" 
                    animate={loaded ? "visible" : "hidden"} 
                    className="flex flex-col items-start tracking-tighter uppercase font-black" 
                    style={{ fontFamily: 'Anton, sans-serif' }}
                >
                    
                    <div className="mb-[-2vw]">
                        <motion.div variants={itemVariants}>
                            <h1 className="text-[clamp(60px,16vw,300px)] text-black leading-[0.8]">WE BUILD</h1>
                        </motion.div>
                    </div>
                    
                    <div className="mix-blend-difference ml-[5vw] md:ml-[15vw]">
                        <motion.div variants={itemVariants}>
                            <h1 className="text-[clamp(60px,16vw,300px)] text-[#FF3E00] leading-[0.8]">EMPIRES_<span className="text-white text-[clamp(20px,4vw,60px)] align-top ml-4 leading-none hidden md:inline-block">NOT PAGES.</span></h1>
                        </motion.div>
                    </div>
                    
                    <motion.div variants={itemVariants} className="mt-10 md:mt-20 ml-[10vw]">
                        <div className="flex items-stretch gap-0">
                            {/* Orange accent bar — grows from top on load */}
                            <motion.div
                                initial={{ scaleY: 0, originY: 0 }}
                                animate={loaded ? { scaleY: 1 } : {}}
                                transition={{ duration: 1.5, delay: 1.8, ease }}
                                className="w-[2px] bg-[#FF3E00] mr-5 shrink-0 origin-top"
                            />
                            <div className="flex flex-col gap-2 max-w-[280px] md:max-w-xs">
                                <motion.p
                                    initial={{ opacity: 0, filter: 'blur(6px)' }}
                                    animate={loaded ? { opacity: 1, filter: 'blur(0px)' } : {}}
                                    transition={{ duration: 2.0, delay: 2.2, ease }}
                                    className="text-[13px] text-black/50 leading-[1.85]"
                                    style={{ fontFamily: 'IBM Plex Mono, monospace', maxWidth: '240px' }}
                                >
                                    Full-spectrum creative agency. Engineered for enterprises that measure success not by presence — but by dominance.
                                </motion.p>
                                {/* Attribution + blinking cursor */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={loaded ? { opacity: 1 } : {}}
                                    transition={{ duration: 1.5, delay: 3.2, ease }}
                                    className="flex items-center gap-2 mt-2"
                                >
                                    <div className="w-4 h-[1px] bg-[#FF3E00]" />
                                    <span
                                        className="text-[9px] text-[#FF3E00] uppercase tracking-[0.35em] font-bold"
                                        style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                                    >
                                        ARSON PIXELZ
                                    </span>
                                    <motion.span
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
                                        className="inline-block w-[5px] h-[10px] bg-[#FF3E00] ml-1"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Viewport-Locked Overlay for CTA Button */}
            <div className="absolute top-0 left-0 w-full h-[100svh] pointer-events-none z-[1000]">
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 1.8, delay: 2.6, ease }}
                    className="absolute bottom-10 md:bottom-12 md:right-12 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 flex items-center justify-center w-full md:w-auto pointer-events-auto"
                >
                    <BrutalistButton 
                        label="START PROJECT"
                        to="/contact"
                        variant="orange"
                        size="lg"
                    />
                </motion.div>
            </div>
        </div>
    );
};

export const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Standardized delay for consistent load experience
    const delay = 800; 
    const timer = setTimeout(() => setLoaded(true), delay);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero-section" className="relative w-full overflow-hidden bg-[#E6E4DD]">
      <HeroContent loaded={loaded} />
    </section>
  );
};

export default Hero;
