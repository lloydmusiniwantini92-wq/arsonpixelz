import React, { useState, useEffect } from 'react';
import {
    ArrowRightIcon,
    ArrowUpRightIcon,
    GlobeAltIcon,
    CpuChipIcon
} from '@heroicons/react/24/outline';

// --- Subcomponents for cleaner organization ---

const Marquee: React.FC<{ text: string; reverse?: boolean }> = ({ text, reverse = false }) => {
    const content = (
        <div className={`flex gap-8 items-center whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
            {[...Array(8)].map((_, i) => (
                <React.Fragment key={i}>
                    <span className="text-6xl md:text-8xl font-black tracking-tighter uppercase opacity-10 text-transparent stroke-text">
                        {text}
                    </span>
                    <span className="text-2xl font-black text-arson-accent/50">///</span>
                </React.Fragment>
            ))}
        </div>
    );

    return (
        <div className="overflow-hidden py-4 bg-arson-base border-t-2 border-b-2 border-arson-dark select-none pointer-events-none">
            <style>{`
                .stroke-text {
                    -webkit-text-stroke: 2px #1A1A1A;
                }
            `}</style>
            <div className="flex w-max">
                {content}
                {content}
            </div>
        </div>
    );
};

const LiveClock: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <span className="font-mono tabular-nums">
            {time.toLocaleTimeString('en-US', { hour12: false })} UTC
        </span>
    );
};

export const Footer: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS'>('IDLE');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setStatus('PROCESSING');
        setTimeout(() => {
            setStatus('SUCCESS');
            setEmail('');
            setTimeout(() => setStatus('IDLE'), 3000);
        }, 1500);
    };

    const navLinks = [
        { title: 'Studio', href: '#' },
        { title: 'Capabilities', href: '#' },
        { title: 'Intelligence', href: '#' },
        { title: 'Careers', href: '#' },
    ];

    const socialLinks = [
        { title: 'Instagram', href: '#' },
        { title: 'Twitter / X', href: '#' },
        { title: 'LinkedIn', href: '#' },
    ];

    return (
        <footer className="relative bg-arson-base text-arson-dark border-t-[12px] border-arson-dark flex flex-col noise-bg">

            {/* 1. SCROLLING MARQUEE */}
            <Marquee text="SYSTEMS OF INFLUENCE // DESIGN IS WARFARE //" />

            {/* 2. MAIN GRID CONTENT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px] border-b-2 border-arson-dark">

                {/* Left Col: Brand & Statement */}
                <div className="lg:col-span-7 flex flex-col justify-between p-6 md:p-12 border-r-2 border-arson-dark relative overflow-hidden group">
                    <div className="absolute inset-0 opacity-[0.1] bg-[linear-gradient(#1A1A1A_1px,transparent_1px),linear-gradient(90deg,#1A1A1A_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-3 h-3 bg-arson-accent animate-pulse"></div>
                            <p className="font-mono text-[10px] tracking-[0.3em] uppercase">Autonomous Creative System</p>
                        </div>

                        <h2 className="font-black text-5xl sm:text-7xl xl:text-8xl tracking-tighter leading-[0.85] uppercase mb-8">
                            Don't Just <span className="text-arson-accent italic">Exist.</span><br />
                            Dominate<br />
                            The Feed.
                        </h2>
                    </div>

                    <div className="relative z-10 mt-auto pt-12">
                        <p className="font-medium text-lg md:text-xl leading-relaxed max-w-xl text-arson-dark/80">
                            Attention isn’t passive currency — it is agency, leverage, and revolt. We craft digital systems that cannot be ignored.
                        </p>
                    </div>
                </div>

                {/* Right Col: Interaction Area */}
                <div className="lg:col-span-5 flex flex-col bg-white/40">

                    {/* Subscription Module */}
                    <div className="p-8 md:p-12 flex-grow flex flex-col justify-center border-b-2 border-arson-dark hover:bg-white transition-colors duration-500">
                        <label className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4 block text-arson-dark/60">
                            / Initiate Sequence
                        </label>

                        <form onSubmit={handleSubmit} className="relative group">
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-arson-dark"></div>
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-arson-dark"></div>
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-arson-dark"></div>
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-arson-dark"></div>

                            <input
                                type="email"
                                placeholder={status === 'SUCCESS' ? "TRANSMISSION RECEIVED" : "ENTER_EMAIL_ADDRESS"}
                                disabled={status !== 'IDLE'}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent p-6 font-mono text-sm border-2 border-arson-dark outline-none focus:bg-arson-accent/10 focus:border-arson-accent transition-all placeholder:text-arson-dark/30 uppercase"
                            />

                            <button
                                type="submit"
                                disabled={status !== 'IDLE'}
                                className={`absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center border border-arson-dark transition-all duration-300
${status === 'SUCCESS'
                                        ? 'bg-green-500 text-white border-green-600'
                                        : 'bg-arson-dark text-arson-base hover:bg-arson-accent hover:border-arson-accent'}
`}
                            >
                                {status === 'PROCESSING' ? (
                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                ) : status === 'SUCCESS' ? (
                                    <span className="font-bold">✓</span>
                                ) : (
                                    <ArrowRightIcon className="w-5 h-5" />
                                )}
                            </button>
                        </form>

                        <p className="mt-4 font-mono text-[9px] text-arson-dark/40 uppercase tracking-widest">
                            By connecting, you agree to the data retention protocols.
                        </p>
                    </div>

                    {/* Navigation Grid */}
                    <div className="grid grid-cols-2 h-full">
                        <div className="border-r-2 border-arson-dark p-8">
                            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-arson-accent block mb-6">
                                Directory
                            </span>
                            <ul className="space-y-4">
                                {navLinks.map((link) => (
                                    <li key={link.title}>
                                        <a href={link.href} className="group flex items-center gap-2 text-lg font-bold uppercase tracking-tight hover:text-arson-accent transition-colors">
                                            <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 opacity-0 group-hover:opacity-100 font-mono text-xs">/</span>
                                            {link.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-8">
                            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-arson-accent block mb-6">
                                Network
                            </span>
                            <ul className="space-y-4">
                                {socialLinks.map((link) => (
                                    <li key={link.title}>
                                        <a href={link.href} className="group flex items-center justify-between text-sm font-bold uppercase border-b border-arson-dark/20 pb-2 hover:border-arson-accent hover:text-arson-accent transition-all">
                                            {link.title}
                                            <ArrowUpRightIcon className="w-3 h-3 transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

            {/* 3. SYSTEM FOOTER BAR */}
            <div className="bg-arson-dark text-arson-base py-4 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs font-mono uppercase tracking-widest">

                <div className="flex items-center gap-6">
                    <span className="flex items-center gap-2">
                        <GlobeAltIcon className="w-4 h-4 text-arson-accent" />
                        Sector: Earth
                    </span>
                    <span className="hidden md:flex items-center gap-2">
                        <CpuChipIcon className="w-4 h-4 text-arson-accent" />
                        Sys.Integrity: 100%
                    </span>
                </div>

                <div className="flex items-center gap-2 bg-arson-base/10 px-3 py-1 rounded-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span>Live: <LiveClock /></span>
                </div>

                <div className="text-arson-base/40">
                    © 2025 Arson Pixelz. All Rights Secured.
                </div>

            </div>

        </footer>
    );
};
