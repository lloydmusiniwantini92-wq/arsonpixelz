import React, { useMemo, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PremiumArchiveGallery } from '../components/archive/PremiumArchiveGallery';
import gsap from 'gsap';

// ── Archive Data ──────────────────────────────────────────────────────────────
const archiveData = {
    'tt-01': {
        title: 'TONY THOMPSON',
        headline: 'KEYNOTE SPEAKER\n& COACH',
        category: 'BRAND & DIGITAL PLATFORM',
        accent: '#FF3E00',
        image: '/images/archive1/Screenshot 2026-03-19 014514.png',
        bio: 'Tony Thompson is a globally recognized keynote speaker, leadership coach, and author who has transformed thousands of professionals across multiple industries. Known for his electrifying "Missing Piece" framework, Tony bridges the gap between ambition and execution, equipping leaders with the clarity and firepower needed to dominate their respective fields.',
        testimonial: {
            quote: 'ArsonPixelz didn\'t build us a website — they built us an empire. The platform they engineered captures exactly who we are and converts like nothing we\'ve ever seen. It\'s not just a brand, it\'s a statement.',
            name: 'TONY THOMPSON',
            title: 'Keynote Speaker, The Missing Piece',
        },
        deliverables: ['Brand Identity System', 'Digital Platform Architecture', 'Conversion-Flow Engineering', 'Content Ecosystem Strategy'],
    },
    'evo-1': {
        title: 'STRATEGY ARCHIVE',
        headline: 'STRATEGY\n& ARCHITECTURE',
        category: 'SYSTEMIC GROWTH',
        accent: '#FF3E00',
        image: '/images/archive_static.png',
        bio: 'A deep-dive into the strategic foundations that power enterprise-level systems. We deconstructed noise from systemic value, building blueprints for long-term scalability.',
        testimonial: null,
        deliverables: ['Systemic Growth Audit', 'UX Logic Mapping', 'Performance Strategy', 'Tech-Stack Alignment'],
    },
    'evo-2': {
        title: 'IDENTITY ARCHIVE',
        headline: 'CINEMATIC\nDISRUPTION',
        category: 'BRANDING / IDENTITY',
        accent: '#00E5C3',
        image: '/images/archive_social.png',
        bio: 'High-fidelity creative that cuts through the void. We engineer visual voices that are as visceral as they are precise.',
        testimonial: null,
        deliverables: ['Visual DNA Architecture', 'Cinematic Asset Design', 'Motion Brand Systems', 'Interactive Aesthetics'],
    },
    'evo-3': {
        title: 'ENGINEERING ARCHIVE',
        headline: 'INDUSTRIAL\nPERFORMANCE',
        category: 'FULL-STACK ENGINEERING',
        accent: '#B794F4',
        image: '/images/web_3.png',
        bio: 'We don\'t just write code; we engineer ecosystems. Full-stack industrial-grade development designed for extreme scale and frictionless user interaction.',
        testimonial: null,
        deliverables: ['Full-Stack Ecosystems', 'Scalable API Fabric', 'Cloud Infrastructure', 'Performance Optimization'],
    },
    'evo-4': {
        title: 'INTELLIGENCE ARCHIVE',
        headline: 'AUTONOMOUS\nLOGIC',
        category: 'AI & MACHINE LEARNING',
        accent: '#FF3E00',
        image: '/images/sentient_archive.png',
        bio: 'The future is self-evolving. We integrate advanced AI and machine learning logic to create interfaces that anticipate user needs and adapt in real-time.',
        testimonial: null,
        deliverables: ['AI Integration Layer', 'LLM Orchestration', 'Predictive UI Systems', 'Neural Feedback Loops'],
    },
};

// ── Other Projects for the bottom list ───────────────────────────────────────
const otherProjects = [
    { id: 'tt-01', label: 'TONY THOMPSON', service: 'BRAND / DIGITAL PLATFORM', year: '2024' },
    { id: 'evo-2', label: 'IDENTITY ARCHIVE', service: 'BRANDING / IDENTITY', year: '2024' },
    { id: 'evo-3', label: 'ENGINEERING ARCHIVE', service: 'FULL-STACK ENGINEERING', year: '2024' },
    { id: 'evo-4', label: 'INTELLIGENCE ARCHIVE', service: 'AI / MACHINE LEARNING', year: '2025' },
    { id: 'evo-1', label: 'STRATEGY ARCHIVE', service: 'STRATEGY / ARCHITECTURE', year: '2024' },
];

// ── Component ─────────────────────────────────────────────────────────────────
const ArchivePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const data = useMemo(() => archiveData[id as keyof typeof archiveData] || archiveData['tt-01'], [id]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo({ top: 0 });
        const ctx = gsap.context(() => {
            if (containerRef.current) {
                gsap.from(containerRef.current, {
                    opacity: 0,
                    filter: 'blur(12px)',
                    scale: 1.02,
                    duration: 1.2,
                    ease: 'power3.out',
                    clearProps: 'filter,scale',
                });
            }
        });
        return () => ctx.revert();
    }, [id]);

    const filteredProjects = otherProjects.filter(p => p.id !== id);

    return (
        <div
            ref={containerRef}
            className="min-h-screen bg-[#000000] text-[#FFFFFF] selection:bg-[#FF3E00] selection:text-black overflow-x-hidden"
            style={{ fontFamily: 'Syne, sans-serif' }}
        >
            {/* ── Fixed Background ─────────────────────────────────────────── */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.img
                    key={`${id}-bg`}
                    initial={{ scale: 1.08, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.08 }}
                    transition={{ duration: 2.5, ease: 'easeOut' }}
                    src={data.image}
                    alt=""
                    className="w-full h-full object-cover grayscale mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent" />

                {/* Hovered project BG reveal */}
                <AnimatePresence>
                    {hoveredProject && hoveredProject !== id && (
                        <motion.div
                            key={hoveredProject}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.12 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            className="absolute inset-0"
                        >
                            <img
                                src={archiveData[hoveredProject as keyof typeof archiveData]?.image}
                                alt=""
                                className="w-full h-full object-cover grayscale mix-blend-overlay"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Grain overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

            {/* Scanline */}
            <motion.div
                className="fixed inset-0 pointer-events-none z-10 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)]"
                animate={{ y: ['-100%', '100%'] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />

            <div className="fixed inset-0 pointer-events-none border-[12px] md:border-[20px] border-[#000000] z-50 overflow-hidden">
                <div className="absolute top-8 right-8 flex gap-1 items-end opacity-10">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-[2px] bg-white" style={{ height: `${(i + i) * 3 + 4}px` }} />
                    ))}
                </div>
                <div className="absolute bottom-8 right-8 font-mono text-[9px] uppercase tracking-[0.5em] text-white/20">
                    ARSON_PROTOCOL_v4.0
                </div>
            </div>

            {/* ── Content ───────────────────────────────────────────────────── */}
            <div className="relative z-20 w-full">

                {/* TOP NAV BAR */}
                <div className="w-full max-w-[1400px] mx-auto px-6 pt-12 pb-8 flex justify-between items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center gap-3"
                    >
                        <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-white/20">
                            {id?.toUpperCase()} // ARCHIVE
                        </span>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div
                            className="group cursor-pointer font-mono text-[10px] uppercase tracking-[0.4em] text-white/30 hover:text-[#FF3E00] transition-all duration-300 flex items-center gap-4 bg-white/5 px-6 py-3 rounded-none border border-white/5 backdrop-blur-md"
                            onClick={() => navigate('/#work-section')}
                        >
                            <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
                            <span>Back to SELECTED WORKS</span>
                        </div>
                    </motion.div>
                </div>

                {/* ── HERO HEADLINE ─────────────────────────────────────────── */}
                <div className="w-full max-w-[1400px] mx-auto px-6 pt-12 pb-8 border-b border-white/5">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: data.accent }} />
                            <span className="font-mono text-[9px] uppercase tracking-[0.5em]" style={{ color: data.accent }}>
                                {data.category}
                            </span>
                        </div>
                        <h1
                            className="text-[14vw] md:text-[10vw] font-black uppercase leading-none tracking-tighter"
                            style={{ fontFamily: 'Syne, sans-serif' }}
                        >
                            {data.headline.split('\n').map((line, i) => (
                                <span key={i} className={`block ${i === 1 ? 'text-transparent' : ''}`}
                                    style={i === 1 ? { WebkitTextStroke: `1.5px ${data.accent}` } : {}}>
                                    {line}
                                </span>
                            ))}
                        </h1>
                    </motion.div>
                </div>

                {/* ── BIO + IMAGE (tt-01 specific) ─────────────────────────── */}
                {id === 'tt-01' && (
                    <div className="w-full max-w-[1400px] mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16 border-b border-white/5">
                        {/* Left: Bio copy */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9 }}
                            className="lg:col-span-6 flex flex-col justify-center gap-8"
                        >
                            <p className="text-2xl md:text-3xl font-light text-white/70 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                                {data.bio}
                            </p>
                            <div className="flex flex-wrap gap-3 mt-4">
                                {data.deliverables.map((d, i) => (
                                    <span
                                        key={i}
                                        className="font-mono text-[9px] uppercase tracking-[0.4em] px-4 py-2 border border-white/10 text-white/40 hover:border-[#FF3E00]/40 hover:text-[#FF3E00] transition-all duration-500"
                                    >
                                        {d}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right: Tony Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 1.04 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="lg:col-span-6 relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.9)]"
                        >
                            <img
                                src="/images/archive1/Screenshot 2026-03-19 014514.png"
                                alt="Tony Thompson"
                                className="w-full h-full object-cover object-center opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent" />
                            {/* Corner decoration */}
                            <div className="absolute top-6 left-6 w-10 h-10 border-t border-l border-white/20" />
                            <div className="absolute bottom-6 right-6 w-10 h-10 border-b border-r border-white/20" />
                        </motion.div>
                    </div>
                )}

                {/* ── GALLERY ───────────────────────────────────────────────── */}
                <div className="w-full px-6 pt-24 pb-40 flex justify-center">
                    <PremiumArchiveGallery accentColor={data.accent} />
                </div>

                {/* ── TESTIMONIAL (tt-01 specific) ────────────────────────── */}
                {id === 'tt-01' && data.testimonial && (
                    <div className="w-full py-0 mt-12 mb-4">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-full bg-[#0d0d0d] border-y border-white/5 overflow-hidden"
                        >
                            {/* Cinematic BG layer */}
                            <div className="absolute inset-0 pointer-events-none">
                                <img
                                    src="/images/archive1/Screenshot 2026-03-19 014514.png"
                                    alt=""
                                    className="absolute right-0 top-0 h-full w-1/2 object-cover object-left opacity-10 grayscale"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/90 to-transparent" />
                                {/* Accent glow */}
                                <div
                                    className="absolute -bottom-20 left-20 w-[600px] h-[400px] rounded-full blur-[120px] opacity-20 pointer-events-none"
                                    style={{ backgroundColor: data.accent }}
                                />
                            </div>

                            {/* Quote content */}
                            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16 py-24 md:py-32 flex flex-col gap-12">
                                {/* Opening mark */}
                                <div className="flex items-start gap-8">
                                    <div
                                        className="text-[140px] leading-none font-black select-none -mt-6 opacity-20"
                                        style={{ color: data.accent, fontFamily: 'Georgia, serif', lineHeight: 1 }}
                                    >
                                        "
                                    </div>
                                    <div className="flex flex-col gap-10 pt-2 flex-1">
                                        <p
                                            className="text-2xl md:text-3xl lg:text-4xl text-white/90 leading-[1.5] font-light max-w-4xl"
                                            style={{ fontFamily: 'Inter, ui-sans-serif, sans-serif' }}
                                        >
                                            {data.testimonial.quote}
                                        </p>

                                        {/* Attribution */}
                                        <div className="flex items-center gap-6 pt-4 border-t border-white/10 max-w-4xl">
                                            {/* Avatar accent */}
                                            <div
                                                className="w-14 h-14 rounded-full flex-shrink-0 border-2 overflow-hidden"
                                                style={{ borderColor: data.accent }}
                                            >
                                                <img
                                                    src="/images/archive1/Screenshot 2026-03-19 014514.png"
                                                    alt="Tony Thompson"
                                                    className="w-full h-full object-cover object-top scale-150"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span
                                                    className="text-sm font-black uppercase tracking-[0.3em]"
                                                    style={{ color: data.accent, fontFamily: 'Inter, sans-serif' }}
                                                >
                                                    {data.testimonial.name}
                                                </span>
                                                <span
                                                    className="text-xs text-white/40 uppercase tracking-[0.25em] font-normal"
                                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                                >
                                                    {data.testimonial.title}
                                                </span>
                                            </div>
                                            <div className="ml-auto hidden md:flex items-center gap-3 opacity-40">
                                                {[1, 2, 3, 4, 5].map(s => (
                                                    <svg key={s} className="w-4 h-4" viewBox="0 0 20 20" fill={data.accent}>
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}


                {/* ── PROJECT INSIGHTS ─────────────────────────────────────── */}
                {id === 'tt-01' && (
                    <div className="w-full max-w-[1400px] mx-auto px-6 py-24 border-t border-white/5">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                            <div className="lg:col-span-5 flex flex-col gap-8">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: data.accent }} />
                                    <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">PROJECT_INSIGHTS</span>
                                </motion.div>
                                <h2 className="text-4xl md:text-6xl font-black uppercase leading-none tracking-tighter">
                                    Bridging the{' '}
                                    <span className="text-transparent" style={{ WebkitTextStroke: `1px ${data.accent}` }}>
                                        Missing Piece
                                    </span>
                                </h2>
                                <p className="text-lg font-light text-white/60 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                                    Tony Thompson required more than just a website; he needed a{' '}
                                    <span className="text-white font-medium">Digital Growth Ecosystem</span>. We engineered a platform that
                                    captures the raw intensity of his high-performance coaching while providing the technical stability
                                    for global business scalability.
                                </p>
                            </div>
                            <div className="lg:col-span-1" />
                            <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-10 pt-8">
                                {[
                                    { num: '01', title: 'BRANDING AUTHORITY', desc: 'Defining the visual DNA that resonates with world-class leaders. High-fidelity creative combined with systemic brand logic.' },
                                    { num: '02', title: 'DIGITAL ARCHITECTURE', desc: 'A conversion-centric platform designed for frictionless interaction across programs, podcasts, and community systems.' },
                                    { num: '03', title: 'GROWTH LOGIC', desc: 'Integrating complex user flows that transition cold traffic into lifelong community members through strategic data points.' },
                                    { num: '04', title: 'ECOSYSTEM SYNC', desc: 'Unifying various sub-brands into a single, cohesive digital voice that maintains authority across all touchpoints.' },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex flex-col gap-4 border-l-2 border-white/5 pl-8 hover:border-[#D16D6A] transition-colors duration-500"
                                    >
                                        <span className="font-mono text-[9px] uppercase tracking-[0.3em] font-bold" style={{ color: data.accent }}>
                                            {item.num} // {item.title}
                                        </span>
                                        <p className="text-xs text-white/40 font-mono tracking-wider leading-relaxed uppercase">{item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ── OTHER SELECTED WORKS (Reference-style list) ──────────── */}
                <div className="w-full border-t border-white/10 relative">
                    {/* Section label */}
                    <div className="w-full max-w-[1400px] mx-auto px-6 pt-20 pb-12">
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-white/20" />
                            <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-white/30">
                                MORE SELECTED WORKS
                            </span>
                        </div>
                    </div>

                    {/* Project rows */}
                    <div className="flex flex-col">
                        {filteredProjects.map((project, index) => (
                            <Link
                                key={project.id}
                                to={`/archive/${project.id}`}
                                className="group relative border-b border-white/10 cursor-pointer overflow-hidden block"
                                onMouseEnter={() => setHoveredProject(project.id)}
                                onMouseLeave={() => setHoveredProject(null)}
                            >
                                {/* Hover fill */}
                                <div
                                    className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"
                                    style={{ backgroundColor: project.id === 'evo-2' ? '#00E5C3' : (project.id === 'evo-3' ? '#B794F4' : '#FF3E00') }}
                                />

                                <div className="px-6 py-10 md:py-14 max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                                    {/* Index + Title */}
                                    <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-10 w-full md:w-2/3">
                                        <span
                                            className="font-mono font-bold text-xl md:text-2xl transition-colors duration-500 group-hover:text-black/50"
                                            style={{ color: project.id === 'evo-2' ? '#00E5C3' : (project.id === 'evo-3' ? '#B794F4' : '#FF3E00') }}
                                        >
                                            {String(index + 1).padStart(2, '0')}/
                                        </span>
                                        <h2
                                            className="font-black text-4xl md:text-6xl lg:text-7xl leading-none tracking-tighter uppercase transition-all duration-500 text-transparent group-hover:text-black"
                                            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}
                                        >
                                            {project.label}
                                        </h2>
                                    </div>

                                    {/* Metadata + Arrow */}
                                    <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-1/3">
                                        <div className="flex flex-col gap-1 md:opacity-0 md:-translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">
                                            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40 group-hover:text-black/60">
                                                {project.year}
                                            </p>
                                            <p className="font-mono text-xs text-white/70 group-hover:text-black font-medium uppercase tracking-wider">
                                                {project.service}
                                            </p>
                                        </div>

                                        <div className="w-12 h-12 rounded-full border border-white/20 group-hover:border-black flex items-center justify-center transition-all duration-500 shrink-0 group-hover:bg-black/10">
                                            <svg
                                                className="w-5 h-5 text-white group-hover:text-black transition-all duration-500 -rotate-45 group-hover:rotate-0"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="w-full max-w-[1400px] mx-auto px-6 py-20 flex justify-between items-center border-t border-white/5">
                        <div
                            className="group cursor-pointer font-mono text-[10px] uppercase tracking-[0.4em] text-white/30 hover:text-[#FF3E00] transition-all duration-300 flex items-center gap-4 bg-white/5 px-6 py-3 rounded-none border border-white/5 backdrop-blur-md"
                            onClick={() => navigate('/#work-section')}
                        >
                            <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
                            <span>Back to SELECTED WORKS</span>
                        </div>
                        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/20">
                            ARSON_PROTOCOL_WORKS
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArchivePage;
