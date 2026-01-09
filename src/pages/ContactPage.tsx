import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectType: '',
        budget: '',
        details: ''
    });

    useEffect(() => {
        window.scrollTo(0, 0);
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
        <div className="min-h-screen bg-[#EBE9DF] pt-32 pb-20 px-6 md:px-12 flex flex-col items-center">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl w-full"
            >
                <div className="text-center mb-16">
                    <span className="font-mono text-[#D16D6A] text-xs tracking-[0.3em] uppercase mb-4 block">
                        /// Initiate Protocol
                    </span>
                    <h1 className="font-syne text-5xl md:text-7xl font-black text-[#0a0a0a] tracking-tighter uppercase mb-6">
                        Start Your<br />Project
                    </h1>
                    <p className="font-mono text-[#0a0a0a]/60 text-sm max-w-xl mx-auto leading-relaxed">
                        Tell us about your vision. We engineer high-fidelity digital experiences that incinerate boundaries.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-sm shadow-xl border border-[#0a0a0a]/5">
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {/* Name */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="font-mono text-xs font-bold uppercase tracking-widest text-[#0a0a0a]/50">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-[#EBE9DF]/50 border-b-2 border-[#0a0a0a]/10 px-4 py-3 font-syne font-bold text-[#0a0a0a] focus:outline-none focus:border-[#D16D6A] transition-colors placeholder-[#0a0a0a]/20"
                                placeholder="ENTER NAME"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="font-mono text-xs font-bold uppercase tracking-widest text-[#0a0a0a]/50">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-[#EBE9DF]/50 border-b-2 border-[#0a0a0a]/10 px-4 py-3 font-syne font-bold text-[#0a0a0a] focus:outline-none focus:border-[#D16D6A] transition-colors placeholder-[#0a0a0a]/20"
                                placeholder="ENTER EMAIL"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {/* Project Type */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="projectType" className="font-mono text-xs font-bold uppercase tracking-widest text-[#0a0a0a]/50">Project Type</label>
                            <select
                                id="projectType"
                                name="projectType"
                                value={formData.projectType}
                                onChange={handleChange}
                                className="w-full bg-[#EBE9DF]/50 border-b-2 border-[#0a0a0a]/10 px-4 py-3 font-syne font-bold text-[#0a0a0a] focus:outline-none focus:border-[#D16D6A] transition-colors appearance-none cursor-pointer"
                            >
                                <option value="" disabled>SELECT TYPE</option>
                                <option value="branding">Branding</option>
                                <option value="website">Web Development</option>
                                <option value="app">Application</option>
                                <option value="marketing">Marketing</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Budget */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="budget" className="font-mono text-xs font-bold uppercase tracking-widest text-[#0a0a0a]/50">Budget Range</label>
                            <select
                                id="budget"
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                className="w-full bg-[#EBE9DF]/50 border-b-2 border-[#0a0a0a]/10 px-4 py-3 font-syne font-bold text-[#0a0a0a] focus:outline-none focus:border-[#D16D6A] transition-colors appearance-none cursor-pointer"
                            >
                                <option value="" disabled>SELECT RANGE</option>
                                <option value="5k-10k">$5k - $10k</option>
                                <option value="10k-25k">$10k - $25k</option>
                                <option value="25k-50k">$25k - $50k</option>
                                <option value="50k+">$50k+</option>
                            </select>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col gap-2 mb-12">
                        <label htmlFor="details" className="font-mono text-xs font-bold uppercase tracking-widest text-[#0a0a0a]/50">Project Details</label>
                        <textarea
                            id="details"
                            name="details"
                            value={formData.details}
                            onChange={handleChange}
                            rows={4}
                            className="w-full bg-[#EBE9DF]/50 border-b-2 border-[#0a0a0a]/10 px-4 py-3 font-syne font-bold text-[#0a0a0a] focus:outline-none focus:border-[#D16D6A] transition-colors placeholder-[#0a0a0a]/20 resize-none"
                            placeholder="TELL US ABOUT YOUR GOALS..."
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="group relative px-8 py-4 bg-[#0a0a0a] text-white font-mono text-xs font-bold uppercase tracking-widest overflow-hidden"
                        >
                            <span className="relative z-10 group-hover:text-[#0a0a0a] transition-colors duration-300">Transmit Request</span>
                            <div className="absolute inset-0 bg-[#D16D6A] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        </button>
                    </div>

                </form>
            </motion.div>
        </div>
    );
};

export default ContactPage;
