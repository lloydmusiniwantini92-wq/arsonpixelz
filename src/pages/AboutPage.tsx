import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIgnition } from '../components/layout/IgnitionRuntime';
import { BrutalistButton } from '../components/common/BrutalistButton';

// ── Shared Animation Config ──────────────────────────────────────────────────
const ease = [0.16, 1, 0.3, 1];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease } },
};

// ── Grain Overlay ─────────────────────────────────────────────────────────────
const GrainOverlay = () => (
    <div
        className="pointer-events-none fixed inset-0 z-[99] opacity-[0.14] mix-blend-overlay"
        aria-hidden="true"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '256px 256px',
        }}
    />
);

export const AboutPage = () => {
    const { lenis } = useIgnition();
    const { scrollYProgress } = useScroll();
    
    // Parallax values
    const yHeroImg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const ySection2 = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

    useEffect(() => {
        if (lenis) lenis.scrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
    }, [lenis]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(20px)' }}
            transition={{ duration: 0.8, ease }}
            className="relative bg-[#0a0a0a] text-white overflow-hidden selection:bg-[#FF3E00] selection:text-black"
        >
            <GrainOverlay />

            {/* ═══════════════════════════════════════════════════════════════
                HERO — AVANT-GARDE TYPOGRAPHY
            ═══════════════════════════════════════════════════════════════ */}
            <section className="relative min-h-[110vh] bg-[#E6E4DD] text-black overflow-hidden flex flex-col justify-end pb-32 pt-40 px-6 md:px-12">
                
                {/* Abstract Image Positioning */}
                <motion.div 
                    style={{ y: yHeroImg }} 
                    className="absolute top-0 right-[10%] w-full max-w-[600px] h-[80vh] opacity-20 md:opacity-40 pointer-events-none mix-blend-multiply grayscale"
                >
                    <img src="/images/arsonic.webp" alt="Arsonic" className="w-full h-full object-cover object-top" />
                </motion.div>

                {/* Vertical Decorative Label */}
                <div 
                    className="absolute top-40 left-6 md:left-12 origin-top-left -rotate-90 text-[10px] uppercase font-bold tracking-[0.4em] opacity-40 text-black border-l border-black/30 pl-4"
                    style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                >
                    AGENCY_ORIGIN_FILE // CLASSIFIED
                </div>

                <div className="relative z-10 w-full max-w-[1900px] mx-auto">
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-start leading-[0.8] tracking-tighter uppercase font-black" style={{ fontFamily: 'Anton, sans-serif' }}>
                        
                        <motion.div variants={itemVariants} className="overflow-hidden">
                            <h1 className="text-[clamp(60px,16vw,300px)] text-black mb-0">WE BUILD</h1>
                        </motion.div>
                        
                        <motion.div variants={itemVariants} className="overflow-hidden mix-blend-difference ml-[5vw] md:ml-[15vw]">
                            <h1 className="text-[clamp(60px,16vw,300px)] text-[#FF3E00] mb-0">EMPIRES_<span className="text-white text-[clamp(20px,4vw,60px)] align-top ml-4 leading-none hidden md:inline-block">NOT PAGES.</span></h1>
                        </motion.div>
                        
                        <motion.div variants={itemVariants} className="mt-10 md:mt-20 ml-[10vw]">
                            <div className="flex items-stretch gap-0">
                                {/* Orange accent bar */}
                                <div className="w-[2px] bg-[#FF3E00] mr-5 shrink-0" />
                                <div className="flex flex-col gap-2 max-w-[280px] md:max-w-xs">
                                    <p
                                        className="text-[13px] text-black/50 leading-[1.85]"
                                        style={{ fontFamily: 'IBM Plex Mono, monospace', maxWidth: '240px' }}
                                    >
                                        Full-spectrum creative agency. Engineered for enterprises that measure success not by presence — but by dominance.
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
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
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                MANIFESTO BLOCK — THE VOID
            ═══════════════════════════════════════════════════════════════ */}
            <motion.section 
                style={{ y: ySection2 }}
                className="relative z-20 -mt-20 bg-[#0a0a0a] pt-40 pb-32 px-6 md:px-12"
            >
                <div className="max-w-[1900px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                    
                    {/* Left: The Doctrine */}
                    <div className="lg:col-span-5 lg:col-start-2 relative">
                        <motion.div 
                            initial="hidden" 
                            whileInView="visible" 
                            viewport={{ once: true, amount: 0.3 }} 
                            variants={containerVariants}
                        >
                            <motion.span 
                                variants={itemVariants}
                                className="block text-[10px] font-bold tracking-[1.5em] uppercase mb-12 text-[#FF3E00]"
                                style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                            >
                                THE_DOCTRINE
                            </motion.span>
                            
                            <motion.h2 
                                variants={itemVariants}
                                className="uppercase leading-[0.85] tracking-tighter text-white mb-12"
                                style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(48px, 8vw, 120px)' }}
                            >
                                SCORCHED<br/>
                                <span className="text-white/20">EARTH</span><br/>
                                POLICY.
                            </motion.h2>
                            
                            <motion.p 
                                variants={itemVariants}
                                className="text-white/60 font-mono text-sm tracking-widest uppercase leading-loose border-l border-[#FF3E00] pl-6"
                            >
                                We don't iterate on your competitors. We erase them. Traditional agencies play it safe, they A/B test until the soul is sanded off. We deploy high-contrast, hyper-optimized frameworks built to dominate attention spans and monopolize your market share.
                            </motion.p>
                        </motion.div>
                    </div>

                    {/* Right: The Visage */}
                    <div className="lg:col-span-5 relative mt-20 lg:mt-0">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease }}
                            className="aspect-[3/4] relative overflow-hidden bg-[#111]"
                        >
                            <img src="/images/web_1.webp" alt="Studio Core" className="w-full h-full object-cover grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-700" />
                            <div className="absolute inset-0 border-[12px] border-[#0a0a0a] pointer-events-none" />
                            
                            <div className="absolute top-4 left-4 right-4 flex justify-between uppercase font-mono text-[10px] tracking-[0.4em] text-white/50">
                                <span>REC</span>
                                <span>10:04:22</span>
                            </div>
                        </motion.div>
                        
                        {/* Overlapping Text Label */}
                        <div 
                            className="absolute -bottom-10 -left-10 lg:-left-32 uppercase font-black tracking-tighter text-[#FF3E00] mix-blend-screen pointer-events-none"
                            style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(60px, 12vw, 180px)', lineHeight: 0.8 }}
                        >
                            STUDIO
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* ═══════════════════════════════════════════════════════════════
                METHODOLOGY — INDUSTRIAL DATA TABLE
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-32 px-6 md:px-12 bg-[#FF3E00] text-black">
                <div className="max-w-[1900px] mx-auto">
                    <motion.div 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true, amount: 0.2 }} 
                        variants={containerVariants}
                        className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10"
                    >
                        <motion.h2 
                            variants={itemVariants}
                            className="uppercase leading-[0.8] tracking-tighter text-black w-full md:w-auto"
                            style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(60px, 10vw, 150px)' }}
                        >
                            PROCESS_<br/>
                            <span className="text-white">ARCHITECTURE</span>
                        </motion.h2>
                        <motion.p 
                            variants={itemVariants}
                            className="text-black font-bold text-sm tracking-[0.3em] uppercase w-full md:w-1/3 leading-loose"
                            style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                        >
                            OUR METHODOLOGY IS NOT A GUIDELINE. IT IS A RIGID FRAMEWORK ENGINEERED FOR ABSOLUTE DIGITAL EXCELLENCE.
                        </motion.p>
                    </motion.div>

                    <div className="grid grid-cols-1 border-t-8 border-black">
                        {[
                            { step: '01', title: 'INJECTION', desc: 'Infiltrating the brand core. Auditing functionality, finding weaknesses, planning the override.' },
                            { step: '02', title: 'IGNITION', desc: 'Visual overhaul and architectural restructuring. Speed, performance, and aesthetic dominance.' },
                            { step: '03', title: 'ACCELERANT', desc: 'High-velocity feedback loops and AI-driven workflows to scale the framework aggressively.' },
                            { step: '04', title: 'DOMINION', desc: 'Deploying the final build. The new standard is set. Competitors are rendered obsolete.' },
                        ].map((phase, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.8, delay: idx * 0.1, ease }}
                                className="group relative border-b-2 border-black/20 flex flex-col lg:flex-row items-start lg:items-center py-12 lg:py-16 hover:bg-black transition-colors duration-500 overflow-hidden"
                            >
                                <div className="absolute inset-x-0 bottom-0 h-0 bg-white group-hover:h-full transition-all duration-700 ease-out z-0" />
                                
                                <div className="relative z-10 w-full lg:w-[15%] px-6">
                                    <span className="font-anton text-4xl lg:text-6xl text-black group-hover:text-[#FF3E00] transition-colors">{phase.step}</span>
                                </div>
                                <div className="relative z-10 w-full lg:w-[40%] px-6 mt-4 lg:mt-0">
                                    <h3 
                                        className="text-black group-hover:text-black uppercase text-3xl lg:text-5xl tracking-tighter"
                                        style={{ fontFamily: 'Anton, sans-serif' }}
                                    >
                                        {phase.title}
                                    </h3>
                                </div>
                                <div className="relative z-10 w-full lg:w-[45%] px-6 mt-4 lg:mt-0">
                                    <p 
                                        className="text-black/70 group-hover:text-black text-xs lg:text-sm font-bold tracking-[0.3em] uppercase leading-loose"
                                        style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                                    >
                                        {phase.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                SECTOR LOG — OMINOUS ARCHIVE
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-40 bg-[#0a0a0a] text-white px-6 md:px-12 border-t border-white/10">
                <div className="max-w-[1900px] mx-auto">
                    <div className="mb-20 flex justify-between items-end">
                        <h2 
                            className="uppercase leading-[0.8] tracking-tighter text-white"
                            style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(50px, 8vw, 120px)' }}
                        >
                            SECTOR LOG
                        </h2>
                        <span className="font-mono text-[10px] tracking-[0.5em] text-[#FF3E00] uppercase hidden md:block">
                            [ ARCHIVE_2020-PRESENT ]
                        </span>
                    </div>

                    <div className="space-y-6">
                        {[
                            { year: "2024", event: "THE SINGULARITY", desc: "Arson Pixelz fully integrates Generative AI. Production velocity scales by 400%." },
                            { year: "2023", event: "GLOBAL EXPANSION", desc: "Remote command nodes established. Client base exceeds 50 enterprise sectors." },
                            { year: "2022", event: "PROTOCOL: BREACH", desc: "Industry recognition achieved. The cyber-brutalism aesthetic becomes our signature." },
                            { year: "2020", event: "GENESIS", desc: "Founded in the void. Two laptops, infinite caffeine, refusal to conform." }
                        ].map((log, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.8, delay: i * 0.1, ease }}
                                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline border-t border-white/5 pt-8 hover:px-6 transition-all duration-500 cursor-default"
                            >
                                <div className="md:col-span-2">
                                    <span 
                                        className="text-[#FF3E00] text-3xl font-black"
                                        style={{ fontFamily: 'Anton, sans-serif' }}
                                    >
                                        {log.year}
                                    </span>
                                </div>
                                <div className="md:col-span-4">
                                    <h3 
                                        className="text-white uppercase text-2xl tracking-tight"
                                        style={{ fontFamily: 'Anton, sans-serif' }}
                                    >
                                        {log.event}
                                    </h3>
                                </div>
                                <div className="md:col-span-6">
                                    <p className="font-mono text-xs text-white/40 tracking-[0.2em] uppercase leading-relaxed">
                                        {log.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                FINAL CALL — BRUTALIST
            ═══════════════════════════════════════════════════════════════ */}
            <section className="min-h-[70vh] bg-[#E6E4DD] text-black flex items-center justify-center relative overflow-hidden px-6">
                {/* Massive watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                    <span 
                        className="font-anton uppercase tracking-tighter text-black whitespace-nowrap"
                        style={{ fontSize: '150vh', lineHeight: 0.8 }}
                    >
                        END
                    </span>
                </div>

                <div className="relative z-10 text-center flex flex-col items-center">
                    <span 
                        className="block text-[10px] font-bold tracking-[1.5em] uppercase mb-12 text-[#FF3E00]"
                        style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                    >
                        INITIATE SEQUENCE
                    </span>
                    <h2 
                        className="uppercase leading-[0.85] tracking-tighter text-black mb-16 -rotate-1"
                        style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(50px, 10vw, 150px)' }}
                    >
                        PREPARE FOR<br/>
                        <span className="text-[#FF3E00]">IGNITION.</span>
                    </h2>
                    
                    <BrutalistButton 
                        label="START PROJECT"
                        to="/contact"
                        variant="black"
                        size="xl"
                    />
                </div>
            </section>

        </motion.div>
    );
};

export default AboutPage;
