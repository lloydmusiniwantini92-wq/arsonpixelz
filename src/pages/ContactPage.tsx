import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectType: '',
        budget: '',
        details: ''
    });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
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
        // Here you would typically send the data to a backend
        console.log("Form Submitted:", formData);
        alert("Transmission Sent. We will contact you shortly.");
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-[#000000] pt-32 pb-20 px-6 md:px-12 flex flex-col items-center">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl w-full"
            >
                <div className="text-center mb-16">
                    <span className="font-mono text-[#FF3E00] text-xs tracking-[0.3em] uppercase mb-4 block font-black">
                        /// Initiate Protocol
                    </span>
                    <h1 className="font-syne text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-6">
                        Start Your<br />Project
                    </h1>
                    <p className="font-mono text-white/60 text-sm max-w-xl mx-auto leading-relaxed uppercase tracking-widest">
                        Tell us about your vision. We engineer high-fidelity digital experiences that incinerate boundaries.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-[#0a0a0a] p-8 md:p-12 rounded-none shadow-2xl border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF3E00]/50 to-transparent" />
                    
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {/* Name */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="font-mono text-[10px] font-black uppercase tracking-widest text-white/30">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/[0.03] border-b border-white/10 px-4 py-4 font-syne font-bold text-white focus:outline-none focus:border-[#FF3E00] transition-colors placeholder-white/10 uppercase tracking-tighter"
                                placeholder="ENTER_NAME"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="font-mono text-[10px] font-black uppercase tracking-widest text-white/30">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-white/[0.03] border-b border-white/10 px-4 py-4 font-syne font-bold text-white focus:outline-none focus:border-[#FF3E00] transition-colors placeholder-white/10 uppercase tracking-tighter"
                                placeholder="ENTER_EMAIL"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {/* Project Type */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="projectType" className="font-mono text-[10px] font-black uppercase tracking-widest text-white/30">Project Type</label>
                            <div className="relative">
                                <select
                                    id="projectType"
                                    name="projectType"
                                    value={formData.projectType}
                                    onChange={handleChange}
                                    className="w-full bg-white/[0.03] border-b border-white/10 px-4 py-4 font-syne font-bold text-white focus:outline-none focus:border-[#FF3E00] transition-colors appearance-none cursor-pointer uppercase tracking-tighter"
                                >
                                    <option value="" disabled className="bg-[#0a0a0a]">SELECT_TYPE</option>
                                    <option value="branding" className="bg-[#0a0a0a]">Branding</option>
                                    <option value="website" className="bg-[#0a0a0a]">Web Development</option>
                                    <option value="app" className="bg-[#0a0a0a]">Application</option>
                                    <option value="marketing" className="bg-[#0a0a0a]">Marketing</option>
                                    <option value="other" className="bg-[#0a0a0a]">Other</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#FF3E00] font-mono text-[10px]">▼</div>
                            </div>
                        </div>

                        {/* Budget */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="budget" className="font-mono text-[10px] font-black uppercase tracking-widest text-white/30">Budget Range</label>
                            <div className="relative">
                                <select
                                    id="budget"
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    className="w-full bg-white/[0.03] border-b border-white/10 px-4 py-4 font-syne font-bold text-white focus:outline-none focus:border-[#FF3E00] transition-colors appearance-none cursor-pointer uppercase tracking-tighter"
                                >
                                    <option value="" disabled className="bg-[#0a0a0a]">SELECT_RANGE</option>
                                    <option value="5k-10k" className="bg-[#0a0a0a]">$5k - $10k</option>
                                    <option value="10k-25k" className="bg-[#0a0a0a]">$10k - $25k</option>
                                    <option value="25k-50k" className="bg-[#0a0a0a]">$25k - $50k</option>
                                    <option value="50k+" className="bg-[#0a0a0a]">$50k+</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#FF3E00] font-mono text-[10px]">▼</div>
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col gap-2 mb-12">
                        <label htmlFor="details" className="font-mono text-[10px] font-black uppercase tracking-widest text-white/30">Project Details</label>
                        <textarea
                            id="details"
                            name="details"
                            value={formData.details}
                            onChange={handleChange}
                            rows={4}
                            className="w-full bg-white/[0.03] border-b border-white/10 px-4 py-4 font-syne font-bold text-white focus:outline-none focus:border-[#FF3E00] transition-colors placeholder-white/10 uppercase tracking-tighter resize-none"
                            placeholder="TELL_US_ABOUT_YOUR_GOALS..."
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="group relative px-10 py-5 bg-[#FF3E00] text-black font-syne font-black uppercase text-[11px] tracking-[0.4em] overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                            <span className="relative z-10 transition-colors duration-300">Transmit Request</span>
                            <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        </button>
                    </div>

                </form>
            </motion.div>
        </div>
    );
};

export default ContactPage;
