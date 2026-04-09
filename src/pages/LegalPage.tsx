import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

import { useIgnition } from '../components/layout/IgnitionRuntime';

export const LegalPage = () => {
    const { lenis } = useIgnition();
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

    return (
        <div ref={containerRef} className="min-h-screen bg-[#000000] pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative z-10">

                {/* Header Section */}
                <div className="lg:col-span-12 border-b border-white/10 pb-12 mb-12">
                    <span className="font-mono text-xs font-black tracking-[0.25em] uppercase text-[#FF3E00] block mb-6">
                        Sector 7G // Compliance Link
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white italic leading-none" style={{ fontFamily: 'Syne, sans-serif' }}>
                        Legal <br /> Protocols
                    </h1>
                </div>

                {/* Left Column: Navigation / Meta */}
                <div className="lg:col-span-4 space-y-12 sticky top-32 self-start hidden lg:block">
                    <div className="p-8 bg-white/[0.03] border border-white/10 font-mono text-[10px] text-white/40 uppercase tracking-widest leading-loose">
                        <p className="mb-4"><strong className="text-[#FF3E00]">STATUS:</strong> ENFORCED</p>
                        <p className="mb-4"><strong className="text-[#FF3E00]">JURISDICTION:</strong> GLOBAL / CYBERSPACE</p>
                        <p className="mb-4"><strong className="text-[#FF3E00]">VERSION:</strong> 7.2.1</p>
                        <p><strong className="text-[#FF3E00]">LAST UPDATED:</strong> {new Date().toLocaleDateString()}</p>
                    </div>
                    <nav className="space-y-4 font-mono text-[11px] uppercase tracking-[0.3em] text-white/30">
                        <a href="#terms" className="block hover:text-[#FF3E00] transition-colors flex items-center gap-3 group">
                            <span className="text-[#FF3E00]/20 group-hover:text-[#FF3E00]">01.</span> Terms of Service
                        </a>
                        <a href="#privacy" className="block hover:text-[#FF3E00] transition-colors flex items-center gap-3 group">
                            <span className="text-[#FF3E00]/20 group-hover:text-[#FF3E00]">02.</span> Privacy Policy
                        </a>
                        <a href="#data" className="block hover:text-[#FF3E00] transition-colors flex items-center gap-3 group">
                            <span className="text-[#FF3E00]/20 group-hover:text-[#FF3E00]">03.</span> Data Governance
                        </a>
                        <a href="#cookies" className="block hover:text-[#FF3E00] transition-colors flex items-center gap-3 group">
                            <span className="text-[#FF3E00]/20 group-hover:text-[#FF3E00]">04.</span> Local Storage
                        </a>
                    </nav>
                </div>

                {/* Right Column: Content */}
                <div className="lg:col-span-8 space-y-32">

                    {/* SECTION 01: TERMS */}
                    <section id="terms" className="group">
                        <div className="flex items-center gap-6 mb-12">
                            <span className="font-mono text-[#FF3E00] text-2xl font-black">01</span>
                            <div className="h-[1px] w-16 bg-[#FF3E00]/30" />
                            <h2 className="font-syne font-black text-4xl uppercase text-white tracking-tighter italic">Terms of Service</h2>
                        </div>
                        <div className="prose prose-invert prose-neutral max-w-none font-sans text-white/60 leading-relaxed uppercase tracking-wide text-xs">
                            <p className="mb-6">
                                <strong className="text-white">1.1 Acceptance of Protocols.</strong> By accessing, browsing, or utilizing the Arson Pixelz digital interface ("The Construct"), you unequivocally agree to be bound by these Terms of Service. If you do not agree to these terms, you must immediately cease all interaction with this sector.
                            </p>
                            <p className="mb-6">
                                <strong className="text-white">1.2 Intellectual Property Rights.</strong> All assets, codebases, visual architectures, and "burning" algorithms contained within this domain are the exclusive intellectual property of Arson Pixelz.
                            </p>
                            <ul className="text-[10px] font-mono text-white/40 bg-white/[0.03] p-8 border border-white/5 my-10 list-none space-y-4 tracking-[0.2em]">
                                <li>[A] Unauthorized scraping, data mining, or extraction is prohibited.</li>
                                <li>[B] Reverse engineering of WebGL shaders constitutes a breach of contract.</li>
                                <li>[C] Reproduction of "The Armory" assets without license is actionable.</li>
                            </ul>
                            <p>
                                <strong className="text-white">1.3 Limitation of Liability.</strong> Arson Pixelz shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our digital products, including but not limited to: loss of data, profit, or sanity due to excessive exposure to high-fidelity graphics.
                            </p>
                        </div>
                    </section>

                    {/* SECTION 02: PRIVACY */}
                    <section id="privacy" className="group">
                        <div className="flex items-center gap-6 mb-12">
                            <span className="font-mono text-[#FF3E00] text-2xl font-black">02</span>
                            <div className="h-[1px] w-16 bg-[#FF3E00]/30" />
                            <h2 className="font-syne font-black text-4xl uppercase text-white tracking-tighter italic">Privacy Policy</h2>
                        </div>
                        <div className="prose prose-invert prose-neutral max-w-none font-sans text-white/60 leading-relaxed uppercase tracking-wide text-xs">
                            <p className="mb-6">
                                <strong className="text-white">2.1 Data Collection Inception.</strong> We collect information necessary to facilitate your navigation through The Construct and to render our services ("The Burn"). This includes:
                            </p>
                            <ul className="list-disc pl-5 my-8 space-y-4 text-white/50">
                                <li><strong className="text-white">Telemetry Data:</strong> Device specifications, browser rendering capabilities (GPU tier), and viewport dimensions to optimize WebGL performance.</li>
                                <li><strong className="text-white">Identity Signatures:</strong> Name, email address, and entity affiliation provided voluntarily via the "Initiate Protocol" (Contact) form.</li>
                                <li><strong className="text-white">Transactional Metadata:</strong> Purchase history and license keys generated via "The Armory."</li>
                            </ul>

                            <p className="mt-12 mb-6">
                                <strong className="text-white">2.2 Use of Information.</strong> Your data is utilized strictly for:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10 uppercase tracking-widest text-[10px]">
                                <div className="border border-white/10 p-6 bg-white/[0.02]">
                                    <h4 className="font-black text-[#FF3E00] mb-3">Primary</h4>
                                    <p>Executing contractual obligations and delivering digital assets.</p>
                                </div>
                                <div className="border border-white/10 p-6 bg-white/[0.02]">
                                    <h4 className="font-black text-[#FF3E00] mb-3">Secondary</h4>
                                    <p>Optimizing system performance and preventing unauthorized access.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 03: DATA GOVERNANCE */}
                    <section id="data" className="group">
                        <div className="flex items-center gap-6 mb-12">
                            <span className="font-mono text-[#FF3E00] text-2xl font-black">03</span>
                            <div className="h-[1px] w-16 bg-[#FF3E00]/30" />
                            <h2 className="font-syne font-black text-4xl uppercase text-white tracking-tighter italic">Data Governance</h2>
                        </div>
                        <div className="prose prose-invert prose-neutral max-w-none font-sans text-white/60 leading-relaxed uppercase tracking-wide text-xs">
                            <p className="mb-6">
                                <strong className="text-white">3.1 Encryption Standards.</strong> All transmissions between your terminal and our servers are encrypted via TLS 1.3. Data at rest is secured using AES-256 encryption. We operate on a "Trust No One" (Zero Trust) architecture.
                            </p>
                            <p>
                                <strong className="text-white">3.2 Third-Party Disclosure.</strong> We do not sell, trade, or otherwise transfer your Personally Identifiable Information (PII) to outside parties, except as required to provide the Service (e.g., Stripe for payment processing).
                            </p>
                        </div>
                    </section>

                    {/* SECTION 04: COOKIES (LOCAL STORAGE) */}
                    <section id="cookies" className="group">
                        <div className="flex items-center gap-6 mb-12">
                            <span className="font-mono text-[#FF3E00] text-2xl font-black">04</span>
                            <div className="h-[1px] w-16 bg-[#FF3E00]/30" />
                            <h2 className="font-syne font-black text-4xl uppercase text-white tracking-tighter italic">Local Storage</h2>
                        </div>
                        <div className="prose prose-invert prose-neutral max-w-none font-sans text-white/60 leading-relaxed uppercase tracking-wide text-xs">
                            <p className="mb-6">
                                <strong className="text-white">4.1 Mechanism.</strong> We utilize LocalStorage and SessionStorage rather than tracking cookies to maintain your session state (e.g., Cart contents, Theme preferences).
                            </p>
                            <p>
                                <strong className="text-white">4.2 Consent.</strong> By continuing to navigate this interface, you implicitly consent to the storage of these functional data packets on your local device.
                            </p>
                        </div>
                    </section>

                    <div className="border-t border-white/10 pt-16 pb-32 text-center">
                        <p className="font-mono text-[10px] text-white/20 uppercase tracking-[0.5em] font-black">
                            End of Protocol // Arson_Protocol_Legal_Division
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};
