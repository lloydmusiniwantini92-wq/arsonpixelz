import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

// Mock Data for Projects (Expanded)
const PROJECTS = [
    { id: 1, title: 'Neonscape', category: 'Gaming', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop', year: '2024', client: "Ubisoft" },
    { id: 2, title: 'Velocity', category: 'Branding', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop', year: '2024', client: "Red Bull" },
    { id: 3, title: 'Cipher', category: 'Dev / AI', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop', year: '2023', client: "OpenAI" },
    { id: 4, title: 'Apex', category: 'Marketing', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop', year: '2023', client: "Nike" },
    { id: 5, title: 'Echo', category: 'Gaming', image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2765&auto=format&fit=crop', year: '2023', client: "Riot Games" },
    { id: 6, title: 'Flux', category: 'Branding', image: 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=2576&auto=format&fit=crop', year: '2022', client: "Sony" },
    { id: 7, title: 'Protocol X', category: 'Dev / AI', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop', year: '2022', client: "Palantir" },
    { id: 8, title: 'Zenith', category: 'Marketing', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop', year: '2022', client: "Adidas" },
    { id: 9, title: 'Hyperion', category: 'Gaming', image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=2670&auto=format&fit=crop', year: '2021', client: "Activision" },
];

const CATEGORIES = ['All', 'Marketing', 'Branding', 'Gaming', 'Dev / AI'];

export const WorkIndexPage = () => {
    const [filter, setFilter] = useState('All');

    const filteredProjects = PROJECTS.filter(p => filter === 'All' || p.category === filter);

    return (
        <div className="min-h-screen bg-[#EBE9DF] pt-32 pb-20 px-6 md:px-12">

            {/* FEATURED HERO */}
            <div className="max-w-[1920px] mx-auto mb-24 lg:mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#D16D6A] block mb-6">
                            Project Spotlight
                        </span>
                        <h1 className="font-syne font-black text-6xl md:text-8xl uppercase text-[#0F0F0F] mb-8 leading-[0.9]">
                            Project <br /> Titan
                        </h1>
                        <p className="text-xl text-[#0F0F0F]/70 mb-8 max-w-md">
                            A complete digital overhaul for the world's leading aerospace defense contractor. We built a 3D tactical interface for their annual summit.
                        </p>
                        <div className="flex gap-4">
                            <div className="px-4 py-2 border border-[#0F0F0F]/20 rounded-full font-mono text-xs uppercase">
                                3D Renders
                            </div>
                            <div className="px-4 py-2 border border-[#0F0F0F]/20 rounded-full font-mono text-xs uppercase">
                                WebGL
                            </div>
                            <div className="px-4 py-2 border border-[#0F0F0F]/20 rounded-full font-mono text-xs uppercase">
                                React
                            </div>
                        </div>
                    </div>
                    <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden bg-black group">
                        <img
                            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop"
                            alt="Project Titan"
                            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <ArrowUpRightIcon className="absolute bottom-8 right-8 w-12 h-12 text-white border border-white/50 rounded-full p-3 group-hover:bg-white group-hover:text-black transition-all duration-300" />
                    </div>
                </div>
            </div>

            {/* Header & Filter */}
            <div className="max-w-[1920px] mx-auto mb-16 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-black/10 pb-8">
                <h2 className="font-syne font-black text-4xl md:text-5xl uppercase text-[#0F0F0F]">
                    Archive Index
                </h2>

                {/* Filter */}
                <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`
                                px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider
                                transition-all duration-300 border
                                ${filter === cat
                                    ? 'bg-[#0F0F0F] text-white border-[#0F0F0F]'
                                    : 'bg-transparent text-[#0F0F0F]/60 border-[#0F0F0F]/10 hover:border-[#0F0F0F]/40'}
                            `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {filteredProjects.map((project) => (
                    <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                        className="group cursor-pointer"
                    >
                        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-black mb-6">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        </div>

                        <div className="flex justify-between items-start border-t border-black/10 pt-4">
                            <div>
                                <h3 className="font-syne font-bold text-2xl text-[#0F0F0F] uppercase group-hover:text-[#D16D6A] transition-colors mb-1">
                                    {project.title}
                                </h3>
                                <div className="flex gap-2">
                                    <span className="font-mono text-[#0F0F0F]/50 text-[10px] tracking-widest uppercase">
                                        Client: {project.client}
                                    </span>
                                </div>
                            </div>
                            <span className="font-mono text-[#0F0F0F]/40 text-xs tracking-widest uppercase pt-1">
                                {project.category}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default WorkIndexPage;
