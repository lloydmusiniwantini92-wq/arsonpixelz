/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShoppingCart, User } from 'lucide-react';

export default function App() {
  return (
    <div className="font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen bg-black text-[#E2E2E2]">
      {/* TopNavBar Shell */}
      <nav className="bg-black flex justify-between items-center w-full px-6 py-4 max-full fixed top-0 z-50 border-b-2 border-[#FF3E00] font-headline font-bold tracking-tighter uppercase">
        <div className="text-2xl font-black tracking-tighter text-[#FF3E00]">
          MONOLITH_STORE
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <a className="text-[#FF3E00] border-b-2 border-[#FF3E00] pb-1 hover:bg-[#1F1F1F] transition-all duration-75" href="#">TEMPLATES</a>
          <a className="text-[#E2E2E2] hover:text-[#FF3E00] hover:bg-[#1F1F1F] transition-all duration-75" href="#">FONTS</a>
          <a className="text-[#E2E2E2] hover:text-[#FF3E00] hover:bg-[#1F1F1F] transition-all duration-75" href="#">AGENTS</a>
          <a className="text-[#E2E2E2] hover:text-[#FF3E00] hover:bg-[#1F1F1F] transition-all duration-75" href="#">WORKFLOWS</a>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative hidden sm:block">
            <input 
              className="bg-transparent border-0 border-b border-outline-variant focus:border-[#FF3E00] focus:ring-0 text-xs font-mono w-48 py-1 uppercase outline-none" 
              placeholder="SEARCH_SYSTEM..." 
              type="text"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="text-[#E2E2E2] hover:text-[#FF3E00] transition-colors flex items-center">
              <ShoppingCart size={24} strokeWidth={1.5} />
            </button>
            <button className="text-[#E2E2E2] hover:text-[#FF3E00] transition-colors flex items-center">
              <User size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-24 min-h-screen">
        {/* Hero Section */}
        <section className="px-6 mb-20">
          <div className="monolith-grid">
            <div className="col-span-12 md:col-start-2 md:col-span-10 border-l border-primary-container pl-8 py-20 relative">
              <div className="absolute -left-1 top-0 w-2 h-2 bg-primary-container"></div>
              <span className="font-label text-primary-container tracking-[0.4em] text-sm mb-4 block">CORE_DIRECTORY_v4.0</span>
              <h1 className="font-headline font-black text-7xl md:text-[10rem] leading-[0.85] tracking-tighter uppercase text-on-surface">
                ALL_<br/>ASSETS
              </h1>
              <p className="mt-8 font-body text-on-surface-variant max-w-xl text-lg leading-relaxed">
                HIGH-FIDELITY ARCHITECTURAL FOUNDATIONS FOR THE NEXT GENERATION OF DIGITAL INFRASTRUCTURE. DATA-DRIVEN DESIGN FOR ABSOLUTE PERFORMANCE.
              </p>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="px-6 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-outline-variant/20 border-y border-outline-variant/20">
            
            {/* Product Card 1 */}
            <article className="group relative bg-black aspect-[4/5] overflow-hidden flex flex-col p-6 hover:bg-surface-container transition-all duration-300">
              <div className="flex justify-between items-start mb-4 z-10">
                <span className="font-label text-[10px] tracking-widest text-[#FF3E00]">/ASSET_001</span>
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 border border-outline-variant text-[10px] font-mono text-on-surface-variant">/REACT</span>
                  <span className="px-2 py-0.5 border border-outline-variant text-[10px] font-mono text-on-surface-variant">/LLM</span>
                </div>
              </div>
              <div className="flex-grow overflow-hidden relative mb-6 absolute inset-0 z-0">
                <img 
                  alt="NEXUS // PORTFOLIO" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXQCtHqoSy3ZuVsOce7zJ_yAxH-T1JmY21ohuOrpmRupHA9lTGOq37S3B0RDqCk2CAtRGeBizPnhb8kr6eAyWlatbJjHdam0XTw9N4fJDU7nSgtN_-1KMnEBQEfQDklLwe9gR-U5CWmxKNWArO1gGrQ3ooKNULu1i15BPRtesmTUYlVGWJV0A-ObmMJ5IjLGRyuwMlhysWTprHhmxj6aXo0lwimMX1sinAr0WMVmPTcbXdnm_YgZcadJnhAEkUijh438g4u7K4Sw"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              </div>
              <div className="mt-auto z-10">
                <h3 className="font-headline font-bold text-3xl tracking-tighter uppercase mb-2">NEXUS // PORTFOLIO</h3>
                <div className="flex justify-between items-end">
                  <span className="font-mono text-2xl text-on-surface">$149.00</span>
                  <button className="bg-[#FF3E00] text-on-primary-container px-6 py-2 font-label font-bold text-sm tracking-tight active:scale-95 transition-transform">
                    ACQUIRE
                  </button>
                </div>
              </div>
            </article>

            {/* Product Card 2 */}
            <article className="group relative bg-black aspect-[4/5] overflow-hidden flex flex-col p-6 hover:bg-surface-container transition-all duration-300">
              <div className="flex justify-between items-start mb-4 z-10">
                <span className="font-label text-[10px] tracking-widest text-[#FF3E00]">/ASSET_002</span>
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 border border-outline-variant text-[10px] font-mono text-on-surface-variant">/AUTOMATION</span>
                </div>
              </div>
              <div className="flex-grow overflow-hidden relative mb-6 absolute inset-0 z-0">
                <img 
                  alt="THANOIC // ULTRA" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXGUpfEpoSYWL4eHktcKRWBkckMPB0xp1kd2z8c6REFrwBk0qGtqN9UhCh5Lawt9gC8bCPUjXjdrttkex4GGLC3wAaeThhIySC_7BqXeJ-Vf6GDndkhzVihEJ7Iv733Lxyy9FcWjWOT2-5b0O-ahYx2L_84DeWbHSWY0aJ2oA4Vwcu5XAxjpRS_aVL-oqVHAUX_l2Vt2qgLeU8JOGL9cCOyk0_K6zgpSzeZPXz3JRdZm_NcmU3UlmWTqbnS33sIbo-FNd7A2SXJw"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              </div>
              <div className="mt-auto z-10">
                <h3 className="font-headline font-bold text-3xl tracking-tighter uppercase mb-2">THANOIC // ULTRA</h3>
                <div className="flex justify-between items-end">
                  <span className="font-mono text-2xl text-on-surface">$89.00</span>
                  <button className="bg-[#FF3E00] text-on-primary-container px-6 py-2 font-label font-bold text-sm tracking-tight active:scale-95 transition-transform">
                    ACQUIRE
                  </button>
                </div>
              </div>
            </article>

            {/* Product Card 3 */}
            <article className="group relative bg-black aspect-[4/5] overflow-hidden flex flex-col p-6 hover:bg-surface-container transition-all duration-300">
              <div className="flex justify-between items-start mb-4 z-10">
                <span className="font-label text-[10px] tracking-widest text-[#FF3E00]">/ASSET_003</span>
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 border border-outline-variant text-[10px] font-mono text-on-surface-variant">/ENTERPRISE</span>
                </div>
              </div>
              <div className="flex-grow overflow-hidden relative mb-6 absolute inset-0 z-0">
                <img 
                  alt="VANTABLACKS // OPS" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnCA2CjwQYvUwcTJrQv1r1XUvjtUKQoFXbNHWP10XmKBqlViWCGV59f0oF9b4lGHEd9sDruxuI874NiDyPUUw8s-kh-GG8tYQ2IH--qIpyeMnJZ2RWLqz96I6GP4wTZKx9Y7tt1nirGSKxy9OkfG000E5oIh6yqznN19pAWCCZkGQ9996pVuNFBq_T-_1gTq3tchRqqF8JYTglNcrqvXr1VsHSJF97l7tH5VJNdUOw-Uwpps50LHV0ykKnYWTlvNJWXOTvuyuasw"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              </div>
              <div className="mt-auto z-10">
                <h3 className="font-headline font-bold text-3xl tracking-tighter uppercase mb-2">VANTABLACKS // OPS</h3>
                <div className="flex justify-between items-end">
                  <span className="font-mono text-2xl text-on-surface">$499/MO</span>
                  <button className="bg-[#FF3E00] text-on-primary-container px-6 py-2 font-label font-bold text-sm tracking-tight active:scale-95 transition-transform">
                    ACQUIRE
                  </button>
                </div>
              </div>
            </article>

            {/* Product Card 4 (Asymmetric Large) */}
            <article className="group relative bg-black aspect-[16/9] md:col-span-2 overflow-hidden flex flex-col p-8 hover:bg-surface-container transition-all duration-300 border-t border-outline-variant/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full z-10">
                <div className="flex flex-col">
                  <span className="font-label text-[10px] tracking-widest text-[#FF3E00] mb-4">/SPECIAL_RELEASE_v2</span>
                  <h3 className="font-headline font-black text-5xl md:text-7xl tracking-tighter uppercase mb-6 leading-none">MONOLITH // CORE_AGENT</h3>
                  <p className="font-body text-on-surface-variant text-sm max-w-sm mb-8">
                    AN AUTONOMOUS INTELLIGENCE LAYER DESIGNED FOR ARCHITECTURAL DATA ANALYSIS AND SYSTEM OPTIMIZATION.
                  </p>
                  <div className="mt-auto flex items-center gap-6">
                    <span className="font-mono text-3xl text-on-surface">$2,499.00</span>
                    <button className="bg-white text-black px-10 py-3 font-label font-black text-sm tracking-widest uppercase hover:bg-[#FF3E00] hover:text-white transition-colors">
                      INITIALIZE_DEPLOΥ
                    </button>
                  </div>
                </div>
                <div className="hidden md:block overflow-hidden relative absolute inset-0 z-0">
                  <img 
                    alt="CORE_AGENT" 
                    className="w-full h-full object-cover grayscale brightness-50 group-hover:brightness-100 transition-all duration-1000" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmDgd4sFtBEQe5yrGwKPCN3UQjUpAPf7bpFFWNdNq6O38qTE2RFQNk9Bfd3x7vt6kHisz0WOFzak0yKa2vcleJUfisSkEZsMeHcKCQjcUjZJB31uxJSnfAIcm5ftYPQ4NHEp0mIctf_U8c_bkI-tidbldzvGyPoOgHsehXYyd-IkLit3p0tOqcF7yWBivD8C8cOCGrvckHPHmIw7cEH6IznwFzwH8oFXzfpKXppuDqhFu9nIlZZ77r2cM9W2adXqQm8kgkTJAeAA"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </article>

            {/* Product Card 5 */}
            <article className="group relative bg-black aspect-[4/5] overflow-hidden flex flex-col p-6 hover:bg-surface-container transition-all duration-300 border-t border-outline-variant/20">
              <div className="flex justify-between items-start mb-4 z-10">
                <span className="font-label text-[10px] tracking-widest text-[#FF3E00]">/ASSET_005</span>
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 border border-outline-variant text-[10px] font-mono text-on-surface-variant">/FONTS</span>
                </div>
              </div>
              <div className="flex-grow flex items-center justify-center mb-6 border border-outline-variant/30 z-10">
                <span className="font-headline font-black text-8xl text-on-surface/10 group-hover:text-[#FF3E00]/20 transition-colors">Aa</span>
              </div>
              <div className="mt-auto z-10">
                <h3 className="font-headline font-bold text-3xl tracking-tighter uppercase mb-2">GROTESK // EXTENDED</h3>
                <div className="flex justify-between items-end">
                  <span className="font-mono text-2xl text-on-surface">$59.00</span>
                  <button className="bg-[#FF3E00] text-on-primary-container px-6 py-2 font-label font-bold text-sm tracking-tight active:scale-95 transition-transform">
                    ACQUIRE
                  </button>
                </div>
              </div>
            </article>

          </div>
        </section>

        {/* Technical Specs / Data Gauge Section */}
        <section className="px-6 py-20 bg-surface-container-lowest">
          <div className="monolith-grid gap-y-12">
            <div className="col-span-12 md:col-start-2 md:col-span-3">
              <h4 className="font-label text-xs tracking-[0.3em] text-[#FF3E00] mb-6">SYSTEM_METRICS</h4>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between font-mono text-[10px] mb-2">
                    <span>CACHE_LOAD</span>
                    <span>82%</span>
                  </div>
                  <div className="h-1 w-full bg-surface-container-highest">
                    <div className="h-full bg-tertiary w-[82%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-mono text-[10px] mb-2">
                    <span>NET_LATENCY</span>
                    <span>12MS</span>
                  </div>
                  <div className="h-1 w-full bg-surface-container-highest">
                    <div className="h-full bg-primary-container w-[12%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-mono text-[10px] mb-2">
                    <span>UPTIME_SIGNAL</span>
                    <span>STABLE</span>
                  </div>
                  <div className="h-1 w-full bg-surface-container-highest">
                    <div className="h-full bg-tertiary w-full opacity-50"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-span-12 md:col-start-6 md:col-span-6 flex flex-col justify-center">
              <p className="font-headline font-light text-3xl md:text-5xl tracking-tight leading-tight text-on-surface/80 italic">
                "THE ARCHITECTURE OF THE DIGITAL REALM IS NO LONGER A FACADE. IT IS THE BONE, THE MARROW, AND THE CIRCUIT."
              </p>
              <span className="mt-6 font-mono text-xs tracking-widest text-[#FF3E00]">— MANIFESTO_PROTOCOL_0.1</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-[#FF3E00] flex flex-col md:flex-row justify-between items-center w-full px-6 py-8 gap-4 border-t-2 border-[#1F1F1F] font-mono text-[10px] tracking-widest uppercase">
        <div className="flex items-center gap-4">
          <span className="font-bold text-[#FF3E00]">MONOLITH_STORE</span>
          <span className="text-[#353535]">|</span>
          <span className="text-[#353535]">©2024 MONOLITH_STORE [SYSTEM_STABLE]</span>
        </div>
        <div className="flex gap-8">
          <a className="text-[#353535] hover:text-[#E2E2E2] transition-colors" href="#">LEGAL</a>
          <a className="text-[#353535] hover:text-[#E2E2E2] transition-colors" href="#">TERMS</a>
          <a className="text-[#353535] hover:text-[#E2E2E2] transition-colors" href="#">PRIVACY</a>
          <a className="text-[#FF3E00]" href="#">STATUS_v1.0.2</a>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
          <span className="text-tertiary">SYSTEM_ONLINE</span>
        </div>
      </footer>
    </div>
  );
}
