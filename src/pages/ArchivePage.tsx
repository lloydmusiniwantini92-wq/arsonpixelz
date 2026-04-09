import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

// --- IMPORT ASSETS ---
import EatalyImg from '../components/assets/Eataly.webp';
import PunoImg from '../components/assets/Puno.webp';
import TonyThompsonClean from '../components/assets/TonyThompsonClean.webp';
import ScreenImg from '../assets/screen.webp';
import FullSvg from '../components/assets/full.webp';
import LogoImg from '../components/assets/p.webp';

// ── Archive Data ──────────────────────────────────────────────────────────────
const archiveData: Record<string, ProjectRecord> = {
    'tt-01': {
        id: 'tt-01',
        title: 'TONY THOMPSON',
        subtitle: 'INDUSTRIAL LEADERSHIP AT SCALE',
        category: 'CONSULTANCY / STRATEGIC ARCHITECTURE',
        year: '2024',
        location: 'GLOBAL',
        accent: '#FF3E00',
        heroImage: '/images/archive1/Screenshot 2026-03-19 014514.webp',
        referenceImage: '/images/archive1/Screenshot 2026-03-19 014606.webp',
        sideImage: '/images/archive1/Screenshot 2026-03-19 014652.webp',
        galleryImages: [
            '/images/archive1/Screenshot 2026-03-19 014726.webp',
            '/images/archive1/Screenshot 2026-03-19 014751.webp',
            '/images/archive1/Screenshot 2026-03-19 014815.webp',
            '/images/archive1/Screenshot 2026-03-19 014840.webp',
            '/images/archive1/Screenshot 2026-03-19 014901.webp',
            '/images/archive1/Screenshot 2026-03-19 014940.webp'
        ],
        manifesto: 'NOT A WEBSITE — A DIGITAL LEGACY ARCHIVE.',
        manifestoAuthor: 'T. THOMPSON',
        manifestoTitle: 'CORE_DIRECTOR',
        bio: 'Strategic brand execution for high-velocity creators.',
        heroSlogan: 'ARCHIVE PROTOCOL.',
    },
    'ea-42': {
        id: 'ea-42',
        title: 'EATALY',
        subtitle: 'RETAIL GOLIATH',
        category: 'RETAIL / DIGITAL EXPERIENCE',
        year: '2024',
        location: 'MILAN_IT',
        accent: '#FF3E00',
        heroImage: '/images/eataly/eataly_02.webp',
        referenceImage: '/images/eataly/eataly_01.webp',
        sideImage: '/images/eataly/eataly_03.webp',
        galleryImages: [
            '/images/eataly/eataly_04.webp',
            '/images/eataly/eataly_05.webp',
            '/images/eataly/eataly_06.webp',
            '/images/eataly/eataly_07.webp'
        ],
        manifesto: 'WE DO NOT SELL FOOD. WE SELL THE SOUL OF A NATION.',
        manifestoAuthor: 'EATALY CORE',
        manifestoTitle: 'BRAND_DIRECTOR',
        bio: 'Reconstructing heritage retail via tactile interface.',
        heroSlogan: 'SYNTHESIZING HERITAGE.',
    },
    'pn-88': {
        id: 'pn-88',
        title: 'PUNO',
        subtitle: 'ARCHITECTURAL_AGRONOMY',
        category: 'AGRICULTURE / SYSTEMS DESIGN',
        year: '2024',
        location: 'BERLIN_DE',
        accent: '#FF3E00',
        heroImage: '/images/puno/puno_01.webp',
        referenceImage: '/images/puno/puno_02.webp',
        sideImage: '/images/puno/puno_03.webp',
        galleryImages: [
            '/images/puno/puno_04.webp',
            '/images/puno/puno_05.webp',
            '/images/puno/puno_06.webp',
            '/images/puno/puno_07.webp',
            '/images/puno/puno_08.webp',
            '/images/puno/puno_09.webp',
            '/images/puno/puno_10.webp'
        ],
        manifesto: 'THE EARTH IS PREDICTABLE. THE DATA IS THE SEED.',
        manifestoAuthor: 'PUNO SYSTEMS',
        manifestoTitle: 'CHIEF_AGRONOMIST',
        bio: 'Bypassing traditional agricultural input methods.',
        heroSlogan: 'BIOLOGICAL PROTOCOL.',
    },
    'lr-11': {
        id: 'lr-11',
        title: 'LA RADICE',
        subtitle: 'STRUCTURAL_SOUL',
        category: 'FURNITURE / INDUSTRIAL DESIGN',
        year: '2025',
        location: 'VENICE_IT',
        accent: '#FF3E00',
        heroImage: '/images/laradice/laradice_01.webp',
        referenceImage: '/images/laradice/laradice_02.webp',
        sideImage: '/images/laradice/laradice_03.webp',
        galleryImages: [
            '/images/laradice/laradice_04.webp'
        ],
        manifesto: 'WOOD IS NOT A MATERIAL. IT IS A GEOMETRIC LEGACY.',
        manifestoAuthor: 'M. RADICE',
        manifestoTitle: 'MASTER_CRAFTSMAN',
        bio: 'Digitizing structured furniture architecture.',
        heroSlogan: 'STRUCTURAL SOUL.',
    },
};

interface ProjectRecord {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    year: string;
    location: string;
    accent: string;
    heroImage: string;
    referenceImage: string;
    sideImage: string;
    galleryImages?: string[];
    manifesto: string;
    manifestoAuthor: string;
    manifestoTitle: string;
    bio: string;
    voidText: string;
    chaosText: string;
    dissolveText: string;
    stats: { value: string; label: string }[];
    deliverables: string[];
    coordinates: string;
    heroSlogan: string;
}

// ── Stagger animation variants ────────────────────────────────────────────────
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

// ── GlitchImage Component ─────────────────────────────────────────────────────
const GlitchImage: React.FC<{ src: string; alt: string; className?: string; style?: React.CSSProperties; priority?: boolean }> = ({
    src, alt, className = '', style, priority = false
}) => (
    <div className={`relative overflow-hidden ${className}`} style={style}>
        <img 
            src={src} 
            alt={alt} 
            loading={priority ? "eager" : "lazy"}
            className="w-full h-full object-cover" 
        />
        {/* Scanlines */}
        <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 62, 0, 0.04) 3px)',
            }}
        />
        {/* Orange left border accent */}
        <div className="absolute inset-y-0 left-0 w-2 bg-[#FF3E00]" />
    </div>
);
const MemoizedGlitchImage = React.memo(GlitchImage);

// ── Manifesto Block ───────────────────────────────────────────────────────────
const ManifestoBlock = React.memo(({ quote, author, title }: { quote: string; author: string; title: string }) => (
    <motion.div
        variants={itemVariants}
        className="relative py-32 px-8 overflow-hidden"
        style={{ background: 'transparent', contentVisibility: 'auto', containIntrinsicHeight: '600px' }}
    >
        {/* Large faded word watermark */}
        <div
            className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none"
            aria-hidden="true"
        >
            <span
                className="uppercase whitespace-nowrap font-black leading-none"
                style={{
                    fontFamily: 'Anton, sans-serif',
                    fontSize: 'clamp(80px, 18vw, 260px)',
                    color: 'rgba(255,62,0,0.12)',
                    letterSpacing: '-0.02em',
                }}
            >
                MANIFESTO
            </span>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
            <span
                className="block text-[10px] font-bold tracking-[1.5em] uppercase mb-12 opacity-40"
                style={{ fontFamily: 'IBM Plex Mono, monospace', color: '#FF3E00' }}
            >
                PROJECT_NARRATIVE
            </span>
            <blockquote
                className="text-white uppercase leading-[0.9] -rotate-1"
                style={{
                    fontFamily: 'Anton, sans-serif',
                    fontSize: 'clamp(32px, 6vw, 100px)',
                    letterSpacing: '-0.01em',
                }}
            >
                "{quote.includes(' ') ? (
                    <>
                        {quote.split(' ').map((word, i) =>
                            word === 'WEBSITE' || word === 'LEGACY' ? (
                                <span key={i} style={{ color: '#FF3E00' }}> {word}</span>
                            ) : ` ${word}`
                        )}
                    </>
                ) : quote}"
            </blockquote>
            <div className="mt-12 flex items-baseline gap-4">
                <div className="w-12 h-1 bg-[#FF3E00] flex-shrink-0" />
                <cite className="not-italic">
                    <span
                        className="block text-white uppercase font-black text-2xl"
                        style={{ fontFamily: 'Anton, sans-serif' }}
                    >{author}</span>
                    <span
                        className="block text-[10px] tracking-widest text-[#FF3E00] uppercase opacity-60 mt-1"
                        style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                    >{title}</span>
                </cite>
            </div>
        </div>
    </motion.div>
));

// ── Main Archive Page ─────────────────────────────────────────────────────────
const ArchivePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const project = id ? archiveData[id] : null;

    const [isGlitching, setIsGlitching] = useState(false);
    const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

    // Lock body scroll and set global modal state
    useEffect(() => {
        if (activeModalIndex !== null) {
            document.body.style.overflow = 'hidden';
            document.body.setAttribute('data-archive-modal-active', 'true');
        } else {
            document.body.style.overflow = '';
            document.body.removeAttribute('data-archive-modal-active');
        }
        return () => {
            document.body.style.overflow = '';
            document.body.removeAttribute('data-archive-modal-active');
        };
    }, [activeModalIndex]);

    // Aggregate all images for the modal
    const allProjectImages = project
        ? [project.heroImage, project.referenceImage, project.sideImage, ...(project.galleryImages || [])]
        : [];

    // Glitch effect trigger
    useEffect(() => {
        const interval = setInterval(() => {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), 200);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    if (!project) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white font-mono">
                <div className="text-[#FF3E00] text-[10px] tracking-[0.5em] uppercase mb-4">RECORD_NOT_FOUND</div>
                <div
                    className="text-white uppercase mb-12"
                    style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(48px, 8vw, 120px)' }}
                >
                    NULL_ARCHIVE
                </div>
                <Link
                    to="/#work-section"
                    className="border border-white/20 px-8 py-4 text-[10px] tracking-[0.4em] uppercase hover:bg-[#FF3E00] hover:border-[#FF3E00] transition-colors"
                >
                    RETURN_TO_WORKS
                </Link>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(20px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-screen bg-transparent text-white overflow-x-hidden"
        >
            {/* === GRAIN OVERLAY === */}
            <div
                className="pointer-events-none fixed inset-0 z-[99] opacity-[0.12] mix-blend-overlay"
                aria-hidden="true"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '256px 256px',
                }}
            />

            {/* === GLOBAL SCANLINES REMOVED AS PER USER REQUEST === */}


            {/* === HERO SECTION === */}
            <section className="relative min-h-screen pt-36 pb-24 px-6 md:px-10 overflow-hidden bg-[#E6E4DD]">

                {/* Navigation Header */}
                <div className="relative z-50 flex items-center justify-between mb-12">
                    <Link 
                        to="/#work-section"
                        className="group flex items-center gap-0 hover:gap-4 bg-black px-6 py-3 border border-black/10 hover:bg-[#FF3E00] hover:border-[#FF3E00] transition-all duration-500"
                    >
                        <div className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                             <ArrowLeftIcon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-[10px] tracking-[0.4em] uppercase text-white group-hover:text-black transition-colors font-bold">BACK TO SELECTED WORKS</span>
                    </Link>
                </div>

                {/* Massive Centralized Project Watermark (Fluid / Custom Stack Logic) */}
                <div className="absolute inset-0 flex items-start justify-center opacity-[0.08] pointer-events-none select-none z-0 overflow-hidden pt-[20vh] px-4">
                    <span 
                        className={`font-space font-bold leading-[0.8] uppercase text-black text-center tracking-tighter ${project.id === 'tt-01' ? 'flex flex-col items-center' : 'whitespace-nowrap'}`}
                        style={{ fontSize: project.id === 'tt-01' ? 'clamp(140px, 19vw, 450px)' : `clamp(100px, ${Math.min(28, 190 / Math.max(project.title.length, 6))}vw, 400px)` }}
                    >
                        {project.id === 'tt-01' ? (
                            <>
                                <span>TONY</span>
                                <span>THOMPSON</span>
                            </>
                        ) : project.title}
                    </span>
                </div>

                {/* Monolithic Typography Stack */}
                <div className="relative z-10 flex flex-col items-start gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 60, filter: 'blur(20px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1
                            className="uppercase leading-[0.8] tracking-tighter text-black -rotate-1"
                            style={{
                                fontFamily: 'Anton, sans-serif',
                                fontSize: 'clamp(80px, 15vw, 240px)',
                            }}
                        >
                            {project.title}
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-4xl"
                    >
                        <h2 
                            className="font-anton text-black uppercase leading-[0.8] tracking-tighter -rotate-1"
                            style={{ fontSize: 'clamp(32px, 6vw, 110px)' }}
                        >
                            "{project.heroSlogan.replace(' // ', ' ')}"
                        </h2>
                    </motion.div>
                </div>

                {/* Subtitle rotated card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                    className="relative z-10 inline-block mb-16 mt-12"
                    style={{ transform: 'rotate(2deg)' }}
                >
                    <div
                        className="bg-[#FF3E00] px-6 py-4 text-black font-bold uppercase leading-tight"
                        style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 'clamp(11px, 1.5vw, 15px)' }}
                    >
                        DECONSTRUCTING THE VISION.<br />
                        {project.subtitle}
                    </div>
                </motion.div>

                {/* Hero Image — full-bleed, glitched */}
                <motion.div
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setActiveModalIndex(0)}
                    transition={{ delay: 0.2, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 h-[55vw] max-h-[680px] min-h-[320px] cursor-pointer group"
                    style={{ transform: 'translateX(-0.5%)' }}
                >
                    <MemoizedGlitchImage
                        src={project.heroImage}
                        alt={project.title}
                        priority={true}
                        className="w-full h-full transition-all duration-700 group-hover:brightness-110"
                        style={{
                            filter: isGlitching ? 'brightness(1.4) contrast(1.2) hue-rotate(10deg)' : 'brightness(0.85) contrast(1.1)',
                            transition: 'filter 0.1s ease',
                        }}
                    />
                    {/* View overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                         <div className="bg-[#FF3E00] px-10 py-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-[0_20px_50px_rgba(255,62,0,0.3)]">
                            <span className="text-black text-2xl tracking-[0.1em] font-anton leading-none uppercase">VIEW IN GALLERY</span>
                         </div>
                    </div>
                </motion.div>
            </section>

            {/* === THE VOID SECTION === */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
                className="py-40 px-6 md:px-10 relative overflow-hidden bg-[#0a0a0a]"
            >
                {/* Avant-Garde Beige Slab (Subtle Background Anchor) */}
                <div 
                    className="absolute -top-20 -left-40 w-[60%] h-[120%] bg-[#E6E4DD] opacity-[0.02] -rotate-12 pointer-events-none"
                    aria-hidden="true"
                />

                <div className="mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 max-w-7xl relative z-10">
                    {/* Left: The Void text block (Inverted to Beige) */}
                    <motion.div variants={itemVariants} className="md:col-span-5 space-y-10 relative z-20">
                        <div
                            className="p-10 bg-[#E6E4DD] text-black shadow-[20px_20px_0px_rgba(255,62,0,1)]"
                            style={{ transform: 'rotate(-1.5deg)' }}
                        >
                            <h2
                                className="uppercase mb-8 leading-[0.85] tracking-tighter"
                                style={{
                                    fontFamily: 'Anton, sans-serif',
                                    fontSize: 'clamp(48px, 6vw, 90px)',
                                }}
                            >
                                THE<br />PROBLEM
                            </h2>
                            <p
                                className="text-black leading-relaxed font-bold uppercase text-xs opacity-80"
                                style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                            >
                                {project.voidText}
                            </p>
                        </div>
                    </motion.div>


                    {/* Right: Chaos text, offset + rotated */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-7 md:pt-32 relative z-10"
                    >
                        {/* Decorative rotating square */}
                        <div
                            className="absolute -top-20 -left-20 w-64 h-64 border border-white/5 pointer-events-none"
                            style={{ transform: 'rotate(45deg)' }}
                        />
                        <div
                            className="p-10 bg-[#FF3E00] text-black relative z-10"
                            style={{ transform: 'rotate(1deg)' }}
                        >
                            <h2
                                className="uppercase mb-6 leading-none"
                                style={{
                                    fontFamily: 'Anton, sans-serif',
                                    fontSize: 'clamp(36px, 5vw, 72px)',
                                }}
                            >
                                THE<br />EXECUTION
                            </h2>
                            <p
                                className="text-sm leading-relaxed font-bold uppercase opacity-80"
                                style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                            >
                                {project.chaosText}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* === FRACTURED GALLERY SECTION === */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={containerVariants}
                className="py-24 px-4 md:px-10 bg-[#131313] relative overflow-hidden"
            >
                <div className="grid grid-cols-12 gap-6 md:gap-4 items-end">
                    {/* Large hero image, hovers right */}
                    <motion.div
                        variants={itemVariants}
                        className="col-span-12 md:col-span-7 relative group cursor-pointer"
                        style={{ transition: 'transform 0.5s ease' }}
                        whileHover={{ x: 16 }}
                        onClick={() => setActiveModalIndex(1)}
                    >
                        <div
                            className="absolute inset-0 -m-4 pointer-events-none"
                            style={{ background: 'rgba(255,62,0,0.06)' }}
                        />
                        <MemoizedGlitchImage
                            src={project.referenceImage}
                            alt="structural reference"
                            className="w-full h-[500px] grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                             <div className="bg-[#FF3E00] px-8 py-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <span className="text-black text-xl tracking-[0.1em] font-anton leading-none uppercase">VIEW IN GALLERY</span>
                             </div>
                        </div>
                        <div
                            className="absolute bottom-4 left-4 bg-[#131313] px-4 py-2 border border-white/10"
                            style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px' }}
                        >
                            VISUAL_INDEX_{project.id.toUpperCase()}
                        </div>
                    </motion.div>

                    {/* Right column: info + small image */}
                    <motion.div variants={itemVariants} className="col-span-12 md:col-span-5 relative z-20 mt-10 md:mt-0">
                        <div
                            className="bg-[#1f1f1f] p-8 mb-4 border-r-8 border-[#FF3E00]"
                            style={{ transform: 'rotate(-2deg)' }}
                        >
                            <h3
                                className="text-white uppercase mb-4"
                                style={{
                                    fontFamily: 'Anton, sans-serif',
                                    fontSize: 'clamp(28px, 4vw, 52px)',
                                }}
                            >
                                INDUSTRIAL_MANIFESTO
                            </h3>
                            <p
                                className="text-white/50 text-xs"
                                style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                            >
                                ARCHITECTURAL SCALE EXECUTED AT HUMAN INTENSITY. THE VISION IS LIVE.
                            </p>
                        </div>
                        <div 
                            className="relative overflow-hidden h-[420px] cursor-pointer group"
                            onClick={() => setActiveModalIndex(2)}
                        >
                            <img
                                src={project.sideImage}
                                alt="side detail"
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                style={{ filter: 'brightness(0.7) contrast(1.1)', contentVisibility: 'auto' }}
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                <div className="bg-[#FF3E00] px-6 py-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <span className="text-black text-lg tracking-[0.1em] font-anton leading-none uppercase">VIEW IN GALLERY</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* NEW: Expanded Gallery Section */}
                    {project.galleryImages && project.galleryImages.length > 0 && (
                        <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
                            {project.galleryImages.map((img, i) => (
                                <motion.div
                                    key={i}
                                    variants={itemVariants}
                                    whileHover={{ y: -10 }}
                                    onClick={() => setActiveModalIndex(i + 3)}
                                    className={`relative overflow-hidden group cursor-pointer ${i % 3 === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-video'}`}
                                    style={{ contentVisibility: 'auto' }}
                                >
                                    <img
                                        src={img}
                                        alt={`Gallery image ${i}`}
                                        loading="lazy"
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                        <div className="bg-[#FF3E00] px-6 py-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <span className="text-black text-lg tracking-[0.1em] font-anton leading-none uppercase">VIEW IN GALLERY</span>
                                        </div>
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 pointer-events-none group-hover:opacity-0 transition-opacity">
                                        <div className="flex flex-col gap-2">
                                            <span className="font-mono text-[10px] tracking-widest text-[#FF3E00]">
                                                VISUAL_RECORD_{String(i + 1).padStart(2, '0')}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Full-width dissolve text block */}
                    <motion.div
                        variants={itemVariants}
                        className="col-span-12 md:col-span-8 p-12 bg-[#1a1a1a] border border-white/5 flex flex-col justify-end relative mt-6"
                    >
                        <h3
                            className="uppercase text-white/5 leading-none absolute -top-8 left-0 pointer-events-none select-none"
                            style={{
                                fontFamily: 'Anton, sans-serif',
                                fontSize: 'clamp(48px, 10vw, 140px)',
                            }}
                        >
                            DISSOLUTION
                        </h3>
                        <p
                            className="text-white/70 text-xl max-w-lg relative z-10"
                            style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                        >
                            {project.dissolveText}
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            {/* === STATS SECTION === */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
                className="bg-[#0e0e0e]/40 py-32 px-8 border-y border-white/5 relative"
            >
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
                    {project.stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            variants={itemVariants}
                            className="relative group flex flex-col items-center text-center"
                        >
                            {/* Hover aura */}
                            <div className="absolute -inset-8 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"
                                style={{ background: 'rgba(255,62,0,0.05)' }} />
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <span
                                    className="leading-none"
                                    style={{
                                        fontFamily: 'Anton, sans-serif',
                                        fontSize: 'clamp(64px, 10vw, 120px)',
                                        color: i === 0 ? '#FF3E00' : '#ffffff',
                                    }}
                                >
                                    {stat.value}
                                </span>
                                <span
                                    className="text-xs tracking-[0.5em] text-white/40 uppercase mt-4"
                                    style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                                >
                                    {stat.label}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* === MANIFESTO QUOTE === */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
                className="relative bg-[#131313]"
            >
                {/* Skewed accent panel */}
                <div
                    className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
                    style={{
                        background: '#0e0e0e',
                        transform: 'skewX(12deg) translateX(24px)',
                    }}
                />
                <ManifestoBlock
                    quote={project.manifesto}
                    author={project.manifestoAuthor}
                    title={project.manifestoTitle}
                />
            </motion.div>

            {/* === TACTICAL CANVAS PROJECT SPEC (REDESIGN) === */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={containerVariants}
                className="relative bg-[#E6E4DD] py-32 md:py-48 px-6 md:px-12 border-t-[24px] border-[#FF3E00] overflow-hidden"
            >
                {/* Background Watermark Displacement (Now in Dark) */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-0">
                    <span
                        className="uppercase whitespace-nowrap font-black leading-none opacity-[0.12]"
                        style={{
                            fontFamily: 'Anton, sans-serif',
                            fontSize: 'clamp(100px, 20vw, 300px)',
                            color: 'black',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        {project.id.toUpperCase()}
                    </span>
                </div>

                <div className="max-w-[1700px] mx-auto relative z-10">
                    <div className="flex flex-col xl:flex-row gap-20 items-start">
                        
                        {/* LEFT: THE STATEMENT (NOW THE PRIMARY HEADER) */}
                        <div className="flex-1">
                            <motion.div variants={itemVariants} className="relative">
                                <h2 
                                    className="text-black uppercase leading-[0.9] -rotate-1 max-w-4xl"
                                    style={{ 
                                        fontFamily: 'Anton, sans-serif',
                                        fontSize: 'clamp(40px, 7vw, 110px)',
                                        letterSpacing: '-0.02em'
                                    }}
                                >
                                    {project.id === 'pn-88' ? "Bypassing traditional agricultural input methods" : project.bio}
                                </h2>
                            </motion.div>
                        </div>

                        {/* RIGHT: THE DELIVERABLES COLUMN (INVERTED MONOLITH) */}
                        <motion.div 
                            variants={itemVariants} 
                            className="w-full xl:w-[450px] bg-black text-white p-8 md:p-10 flex flex-col justify-between -rotate-1 shadow-[15px_15px_0px_rgba(255,62,0,1)] self-start"
                        >
                            <div>
                                <h3 
                                    className="font-anton uppercase tracking-tighter leading-[0.8] mb-10 text-[#FF3E00]"
                                    style={{ fontSize: '3rem', letterSpacing: '-0.02em' }}
                                >
                                    DELIVERABLES_
                                </h3>
                                <div className="space-y-4">
                                    {project.deliverables.map((d, i) => (
                                        <div key={d} className="flex items-start gap-4 border-b border-white/10 pb-4 last:border-0">
                                            <span className="font-anton text-xl leading-none pt-0.5 text-white/40">
                                                0{i+1}
                                            </span>
                                            <span 
                                                className="font-anton uppercase leading-[0.9] tracking-tighter text-base"
                                            >
                                                {d}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-12 pt-6 border-t-2 border-white/10 text-white flex justify-between items-end">
                                <span className="font-anton text-4xl leading-none opacity-20">{project.id.toUpperCase()}</span>
                                <div className="w-8 h-8 bg-[#FF3E00] flex items-center justify-center">
                                   <div className="w-2 h-2 bg-black" />
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </motion.section>

            {/* === PROJECT CTA SECTION === */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
                className="relative bg-[#FF3E00] py-40 px-8 overflow-hidden group"
            >
                {/* Massive background watermark text */}
                <div className="absolute inset-0 opacity-10 flex items-center justify-center overflow-hidden pointer-events-none select-none">
                    <span
                        className="whitespace-nowrap uppercase font-black text-black"
                        style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(80px, 25vw, 400px)' }}
                    >
                        INITIATE_PROJECT
                    </span>
                </div>
                <motion.div variants={itemVariants} className="relative z-10 flex flex-col items-center text-center">
                    <h2
                        className="text-black uppercase tracking-tighter leading-none mb-16"
                        style={{
                            fontFamily: 'Anton, sans-serif',
                            fontSize: 'clamp(48px, 10vw, 160px)',
                        }}
                    >
                        COLLAPSE THE<br />FUTURE_
                    </h2>
                    <Link
                        to="/contact"
                        className="bg-black text-white px-20 py-8 font-black text-2xl uppercase tracking-[0.3em] hover:scale-105 hover:-rotate-1 transition-all active:scale-95 border-4 border-transparent hover:border-white block"
                        style={{ fontFamily: 'Anton, sans-serif' }}
                    >
                        START_PROCESS
                    </Link>
                </motion.div>
            </motion.section>

            {/* === IMAGE MODAL CAROUSEL === */}
            <AnimatePresence>
                {activeModalIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/100 backdrop-blur-3xl"
                        onClick={() => setActiveModalIndex(null)}
                    >
                        {/* Minimalist Backdrop */}
                        <div className="absolute inset-0 bg-black/100 z-0" />

                        {/* Navigation Arrows - Scaled Down */}
                        <div className="absolute inset-y-0 inset-x-4 md:inset-x-8 flex justify-between items-center z-[110] pointer-events-none">
                            <motion.button
                                whileHover={{ scale: 1.1, x: -5 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveModalIndex(prev => (prev! === 0 ? allProjectImages.length - 1 : prev! - 1));
                                }}
                                className="pointer-events-auto bg-white/5 hover:bg-[#FF3E00]/20 p-6 group transition-colors border border-white/5"
                            >
                                <ArrowLeftIcon className="w-6 h-6 text-white group-hover:text-[#FF3E00] transition-colors" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1, x: 5 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveModalIndex(prev => (prev! === allProjectImages.length - 1 ? 0 : prev! + 1));
                                }}
                                className="pointer-events-auto bg-white/5 hover:bg-[#FF3E00]/20 p-6 group transition-colors border border-white/5"
                            >
                                <ArrowRightIcon className="w-6 h-6 text-white group-hover:text-[#FF3E00] transition-colors" />
                            </motion.button>
                        </div>

                        {/* Main Image Container */}
                        <div className="relative w-full h-full max-w-7xl max-h-[80vh] flex items-center justify-center px-6 md:px-20 overflow-visible z-10" onClick={(e) => e.stopPropagation()}>
                            
                            {/* Close Button: Pure Orange 'X' */}
                            <motion.button
                                whileHover={{ scale: 1.2, rotate: 90 }}
                                onClick={(e) => { e.stopPropagation(); setActiveModalIndex(null); }}
                                className="absolute -top-10 -right-6 md:-right-10 z-[1100] p-4 group cursor-pointer"
                            >
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF3E00" strokeWidth="2.5" strokeLinecap="square">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </motion.button>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeModalIndex}
                                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
                                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, scale: 1.05, filter: 'blur(20px)' }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative w-full h-full flex items-center justify-center"
                                >
                                    <img
                                        src={allProjectImages[activeModalIndex]}
                                        alt="Blueprint view"
                                        className="max-w-full max-h-full object-contain border-4 border-white/5"
                                    />
                                    
                                    {/* HUD - Purged in favor of Monolithic Simplicity */}

                                    {/* Index Indicator */}
                                    <div className="absolute bottom-[-60px] md:bottom-[-80px] left-1/2 -translate-x-1/2 flex items-baseline gap-4">
                                        <span className="text-[#FF3E00] font-anton text-6xl leading-none">
                                            {String(activeModalIndex + 1).padStart(2, '0')}
                                        </span>
                                        <div className="w-16 h-[2px] bg-white/10" />
                                        <span className="text-white/20 font-black text-2xl leading-none">
                                            {String(allProjectImages.length).padStart(2, '0')}
                                        </span>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    );
};

export default ArchivePage;
