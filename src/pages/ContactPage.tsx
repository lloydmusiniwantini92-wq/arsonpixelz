import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ContactBg from '../assets/images/contact_brutalist_bg.webp';

import { useIgnition } from '../components/layout/IgnitionRuntime';

const ContactPage: React.FC = () => {
    const { lenis } = useIgnition();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectType: '',
        budget: '',
        details: ''
    });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
        window.scrollTo(0, 0);
        const ctx = gsap.context(() => {
            if (containerRef.current) {
                gsap.from(containerRef.current, {
                    opacity: 0,
                    filter: 'blur(12px)',
                    scale: 1.04,
                    duration: 1.4,
                    ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
                    clearProps: 'filter,scale'
                });
            }
        });
        return () => ctx.revert();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        alert("Inquiry Logged. Our strategists will review and respond.");
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-[#000000] relative overflow-hidden flex flex-col items-center justify-center py-24 md:py-32 px-6 md:px-12">
            
            {/* Brutalist Background Layer */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={ContactBg} 
                    alt="" 
                    className="w-full h-full object-cover opacity-40 grayscale mix-blend-luminosity scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-transparent to-[#000000]" />
                <div className="absolute inset-0 bg-[#000000]/70" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-4xl w-full relative z-10"
            >
                <div className="text-center mb-16 md:mb-20">
                    <h1 className="font-black uppercase tracking-tighter text-white mb-8 leading-[0.85]" style={{ fontFamily: 'Syne, sans-serif' }}>
                        <span className="text-6xl md:text-8xl lg:text-9xl relative md:-left-[0.15em]">START YOUR</span><br />
                        <span className="text-5xl md:text-8xl lg:text-9xl text-[#FF3E00] relative -left-[0.33em] md:-left-[0.55em]">PROJECT</span>
                    </h1>
                    <p className="font-mono text-white/50 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed uppercase tracking-[0.2em] italic font-bold">
                        Define the scope. We architect high-performance digital systems that incinerate mediocrity and dominate market sectors.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-8 md:p-16 rounded-none shadow-[0_0_100px_rgba(0,0,0,1)] border-4 border-black relative">
                    {/* Industrial Accent Lines */}

                    <div className="absolute bottom-0 left-0 w-24 h-24 border-l-4 border-b-4 border-black translate-y-4 -translate-x-4 pointer-events-none" />
                    
                    <div className="grid md:grid-cols-2 gap-10 mb-10">
                        {/* Name */}
                        <div className="flex flex-col gap-3 group">
                            <label htmlFor="name" className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-black/40 group-focus-within:text-[#FF3E00] transition-colors">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-black/[0.02] border-b-2 border-black/20 px-0 py-4 font-syne font-black text-xl md:text-2xl text-black focus:outline-none focus:border-[#FF3E00] transition-all placeholder-black/10 uppercase tracking-tighter"
                                placeholder="YOUR NAME"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-3 group">
                            <label htmlFor="email" className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-black/40 group-focus-within:text-[#FF3E00] transition-colors">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-black/[0.02] border-b-2 border-black/20 px-0 py-4 font-syne font-black text-xl md:text-2xl text-black focus:outline-none focus:border-[#FF3E00] transition-all placeholder-black/10 uppercase tracking-tighter"
                                placeholder="YOUR EMAIL"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10 mb-10">
                        {/* Project Type */}
                        <div className="flex flex-col gap-3 group">
                            <label htmlFor="projectType" className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-black/40 group-focus-within:text-[#FF3E00] transition-colors">Project Type</label>
                            <div className="relative">
                                <select
                                    id="projectType"
                                    name="projectType"
                                    value={formData.projectType}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b-2 border-black/20 px-0 py-4 font-syne font-black text-[14px] md:text-[16px] text-black focus:outline-none focus:border-[#FF3E00] transition-all appearance-none cursor-pointer uppercase tracking-normal"
                                >
                                    <option value="" disabled className="bg-white">SELECT TYPE</option>
                                    <option value="branding" className="bg-white">Brand Ignition</option>
                                    <option value="website" className="bg-white">Digital Architecture</option>
                                    <option value="app" className="bg-white">System Application</option>
                                    <option value="marketing" className="bg-white">Market Acceleration</option>
                                    <option value="other" className="bg-white">Custom Execution</option>
                                </select>
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#FF3E00] font-mono text-[10px] pr-2">▼</div>
                            </div>
                        </div>

                        {/* Budget */}
                        <div className="flex flex-col gap-3 group">
                            <label htmlFor="budget" className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-black/40 group-focus-within:text-[#FF3E00] transition-colors">Budget</label>
                            <div className="relative">
                                <select
                                    id="budget"
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b-2 border-black/20 px-0 py-4 font-syne font-black text-[14px] md:text-[16px] text-black focus:outline-none focus:border-[#FF3E00] transition-all appearance-none cursor-pointer uppercase tracking-normal"
                                >
                                    <option value="" disabled className="bg-white">SELECT BUDGET</option>
                                    <option value="1k-5k" className="bg-white">1K - 5K USD</option>
                                    <option value="5k-10k" className="bg-white">5K - 10K USD</option>
                                    <option value="10k-25k" className="bg-white">10K - 25K USD</option>
                                    <option value="25k-50k" className="bg-white">25K - 50K USD</option>
                                    <option value="50k+" className="bg-white">50K+ USD</option>
                                </select>
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#FF3E00] font-mono text-[10px] pr-2">▼</div>
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col gap-3 mb-16 group">
                        <label htmlFor="details" className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-black/40 group-focus-within:text-[#FF3E00] transition-colors">Message</label>
                        <textarea
                            id="details"
                            name="details"
                            value={formData.details}
                            onChange={handleChange}
                            rows={4}
                            className="w-full bg-black/[0.02] border-b-2 border-black/20 px-4 py-6 font-syne font-bold text-lg text-black focus:outline-none focus:border-[#FF3E00] transition-all placeholder-black/20 uppercase tracking-wide resize-none leading-relaxed"
                            placeholder="TELL US ABOUT THE MISSION..."
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center md:justify-end">
                        <button
                            type="submit"
                            style={{ fontFamily: 'Anton, sans-serif' }}
                            className="group relative w-full md:w-auto px-10 md:px-16 py-7 bg-black text-white uppercase text-[20px] tracking-[0.1em] md:tracking-[0.25em] overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                        >
                            <span className="relative z-10 transition-colors duration-500 group-hover:text-black">SUBMIT INQUIRY</span>
                            <div className="absolute inset-0 bg-[#FF3E00] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                        </button>
                    </div>

                </form>
            </motion.div>
        </div>
    );
};

export default ContactPage;
