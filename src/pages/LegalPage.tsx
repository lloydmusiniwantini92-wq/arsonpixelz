import React from 'react';

export const LegalPage = () => {
    return (
        <div className="min-h-screen bg-[#EBE9DF] pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative z-10">

                {/* Header Section */}
                <div className="lg:col-span-12 border-b border-black/10 pb-12 mb-12">
                    <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#D16D6A] block mb-6">
                        Sector 7G // Compliance Link
                    </span>
                    <h1 className="font-syne font-black text-6xl md:text-9xl uppercase text-[#0F0F0F] leading-none">
                        Legal <br /> Protocols
                    </h1>
                </div>

                {/* Left Column: Navigation / Meta */}
                <div className="lg:col-span-4 space-y-8 sticky top-32 self-start hidden lg:block">
                    <div className="p-6 bg-[#0F0F0F]/5 rounded border border-[#0F0F0F]/10 font-mono text-xs text-[#0F0F0F]/60">
                        <p className="mb-4"><strong className="text-[#0F0F0F]">STATUS:</strong> ENFORCED</p>
                        <p className="mb-4"><strong className="text-[#0F0F0F]">JURISDICTION:</strong> GLOBAL / CYBERSPACE</p>
                        <p className="mb-4"><strong className="text-[#0F0F0F]">VERSION:</strong> 7.2.1</p>
                        <p><strong className="text-[#0F0F0F]">LAST UPDATED:</strong> {new Date().toLocaleDateString()}</p>
                    </div>
                    <nav className="space-y-2 font-mono text-xs uppercase tracking-wider text-[#0F0F0F]/60">
                        <a href="#terms" className="block hover:text-[#D16D6A] transition-colors">01. Terms of Service</a>
                        <a href="#privacy" className="block hover:text-[#D16D6A] transition-colors">02. Privacy Policy</a>
                        <a href="#data" className="block hover:text-[#D16D6A] transition-colors">03. Data Governance</a>
                        <a href="#cookies" className="block hover:text-[#D16D6A] transition-colors">04. Local Storage</a>
                    </nav>
                </div>

                {/* Right Column: Content */}
                <div className="lg:col-span-8 space-y-24">

                    {/* SECTION 01: TERMS */}
                    <section id="terms" className="group">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="font-mono text-[#D16D6A] text-lg">01</span>
                            <div className="h-[1px] w-12 bg-[#D16D6A]" />
                            <h2 className="font-syne font-bold text-3xl uppercase text-[#0F0F0F]">Terms of Service</h2>
                        </div>
                        <div className="prose prose-lg prose-neutral max-w-none font-sans text-[#0F0F0F]/80">
                            <p>
                                <strong>1.1 Acceptance of Protocols.</strong> By accessing, browsing, or utilizing the Arson Pixelz digital interface ("The Construct"), you unequivocally agree to be bound by these Terms of Service. If you do not agree to these terms, you must immediately cease all interaction with this sector.
                            </p>
                            <p>
                                <strong>1.2 Intellectual Property Rights.</strong> All assets, codebases, visual architectures, and "burning" algorithms contained within this domain are the exclusive intellectual property of Arson Pixelz.
                            </p>
                            <ul className="text-sm font-mono text-[#0F0F0F]/60 bg-[#0F0F0F]/5 p-6 rounded-lg my-6 list-none space-y-2">
                                <li>[A] Unauthorized scraping, data mining, or extraction is prohibited.</li>
                                <li>[B] Reverse engineering of WebGL shaders constitutes a breach of contract.</li>
                                <li>[C] Reproduction of "The Armory" assets without license is actionable.</li>
                            </ul>
                            <p>
                                <strong>1.3 Limitation of Liability.</strong> Arson Pixelz shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our digital products, including but not limited to: loss of data, profit, or sanity due to excessive exposure to high-fidelity graphics.
                            </p>
                        </div>
                    </section>

                    {/* SECTION 02: PRIVACY */}
                    <section id="privacy" className="group">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="font-mono text-[#D16D6A] text-lg">02</span>
                            <div className="h-[1px] w-12 bg-[#D16D6A]" />
                            <h2 className="font-syne font-bold text-3xl uppercase text-[#0F0F0F]">Privacy Policy</h2>
                        </div>
                        <div className="prose prose-lg prose-neutral max-w-none font-sans text-[#0F0F0F]/80">
                            <p>
                                <strong>2.1 Data Collection Inception.</strong> We collect information necessary to facilitate your navigation through The Construct and to render our services ("The Burn"). This includes:
                            </p>
                            <ul className="list-disc pl-5 my-4 space-y-2">
                                <li><strong>Telemetry Data:</strong> Device specifications, browser rendering capabilities (GPU tier), and viewport dimensions to optimize WebGL performance.</li>
                                <li><strong>Identity Signatures:</strong> Name, email address, and entity affiliation provided voluntarily via the "Initiate Protocol" (Contact) form.</li>
                                <li><strong>Transactional Metadata:</strong> Purchase history and license keys generated via "The Armory."</li>
                            </ul>

                            <p className="mt-8">
                                <strong>2.2 Use of Information.</strong> Your data is utilized strictly for:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                                <div className="border border-black/10 p-4 rounded">
                                    <h4 className="font-bold uppercase text-xs mb-2 text-[#D16D6A]">Primary</h4>
                                    <p className="text-sm">Executing contractual obligations and delivering digital assets.</p>
                                </div>
                                <div className="border border-black/10 p-4 rounded">
                                    <h4 className="font-bold uppercase text-xs mb-2 text-[#D16D6A]">Secondary</h4>
                                    <p className="text-sm">Optimizing system performance and preventing unauthorized access.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 03: DATA GOVERNANCE */}
                    <section id="data" className="group">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="font-mono text-[#D16D6A] text-lg">03</span>
                            <div className="h-[1px] w-12 bg-[#D16D6A]" />
                            <h2 className="font-syne font-bold text-3xl uppercase text-[#0F0F0F]">Data Governance</h2>
                        </div>
                        <div className="prose prose-lg prose-neutral max-w-none font-sans text-[#0F0F0F]/80">
                            <p>
                                <strong>3.1 Encryption Standards.</strong> All transmissions between your terminal and our servers are encrypted via TLS 1.3. Data at rest is secured using AES-256 encryption. We operate on a "Trust No One" (Zero Trust) architecture.
                            </p>
                            <p>
                                <strong>3.2 Third-Party Disclosure.</strong> We do not sell, trade, or otherwise transfer your Personally Identifiable Information (PII) to outside parties, except as required to provide the Service (e.g., Stripe for payment processing).
                            </p>
                        </div>
                    </section>

                    {/* SECTION 04: COOKIES (LOCAL STORAGE) */}
                    <section id="cookies" className="group">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="font-mono text-[#D16D6A] text-lg">04</span>
                            <div className="h-[1px] w-12 bg-[#D16D6A]" />
                            <h2 className="font-syne font-bold text-3xl uppercase text-[#0F0F0F]">Local Storage</h2>
                        </div>
                        <div className="prose prose-lg prose-neutral max-w-none font-sans text-[#0F0F0F]/80">
                            <p>
                                <strong>4.1 Mechanism.</strong> We utilize LocalStorage and SessionStorage rather than tracking cookies to maintain your session state (e.g., Cart contents, Theme preferences).
                            </p>
                            <p>
                                <strong>4.2 Consent.</strong> By continuing to navigate this interface, you implicitly consent to the storage of these functional data packets on your local device.
                            </p>
                        </div>
                    </section>

                    <div className="border-t border-black/10 pt-12 pb-24 text-center">
                        <p className="font-mono text-xs text-[#0F0F0F]/40 uppercase tracking-widest">
                            End of Protocol // Arson Pixelz Legal Division
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};
