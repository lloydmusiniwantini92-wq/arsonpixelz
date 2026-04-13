import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntelligence } from '../context/IntelligenceContext';
import PLogo from './assets/p.webp';

const DEFAULT_PROMPTS = [
    "READY TO IGNITE?",
    "CLAIM YOUR SECTOR.",
    "DEFINE THE TIMELINE.",
    "UNLEASH YOUR VISION.",
    "STAY FEARLESS.",
    "BECOME UNFORGETTABLE.",
    "AWAITING YOUR MOVE.",
];

interface ChatMessage {
    id: number;
    from: 'bot' | 'user';
    text: string;
}

interface BotInterfaceProps {
    loaded: boolean;
    isMenuOpen: boolean;
}

const IDLE_THRESHOLD = 10_000;
const DISSOLVE_MS = 300;

export const ArsBot: React.FC<BotInterfaceProps> = ({ loaded, isMenuOpen }) => {
    const { currentTarget, timeOnPage } = useIntelligence();
    const [promptIndex, setPromptIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [inputVal, setInputVal] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: 0, from: 'bot', text: "ARSON_INTERFACE live. Creative engines active. Awaiting your move." }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [initialDelayComplete, setInitialDelayComplete] = useState(false);

    const [hasScrolled, setHasScrolled] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isIdle, setIsIdle] = useState(false);
    const [isFixed, setIsFixed] = useState(false);

    type ApparitionPhase = 'visible' | 'dissolving' | 'ghost' | 'appearing';
    const [phase, setPhase] = useState<ApparitionPhase>('visible');
    const [renderedFixed, setRenderedFixed] = useState(false);

    const apparitionTimerA = useRef<ReturnType<typeof setTimeout> | null>(null);
    const apparitionTimerB = useRef<ReturnType<typeof setTimeout> | null>(null);
    const apparitionTimerC = useRef<ReturnType<typeof setTimeout> | null>(null);

    const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const initialDelayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Dynamic Prompts based on Intelligence
    const currentPrompts = useMemo(() => {
        if (!currentTarget) return DEFAULT_PROMPTS;
        if (currentTarget.type === 'service') {
            return [
                `INTERESTED IN ${currentTarget.name.toUpperCase()}?`,
                `SECURE THE SYSTEM.`,
                `WE BUILD ARCHITECTURE.`,
            ];
        }
        if (currentTarget.type === 'product') {
            return [
                `ACQUIRE ${currentTarget.name.toUpperCase()}?`,
                `DOWNLOAD THE FRAMEWORK.`,
                `BUY ONCE. USE FOREVER.`,
            ];
        }
        if (currentTarget.type === 'project') {
            return [
                `ANALYZING ${currentTarget.name.toUpperCase()}.`,
                `ARCHIVE SECURED.`,
                `SEE THE EXECUTION.`,
            ];
        }
        return DEFAULT_PROMPTS;
    }, [currentTarget]);

    useEffect(() => {
        if (loaded) {
            initialDelayTimerRef.current = setTimeout(() => {
                setInitialDelayComplete(true);
            }, 3000);
        }
        return () => {
            if (initialDelayTimerRef.current) clearTimeout(initialDelayTimerRef.current);
        };
    }, [loaded]);

    useEffect(() => {
        if (renderedFixed === isFixed) return;

        [apparitionTimerA, apparitionTimerB, apparitionTimerC].forEach(r => {
            if (r.current) clearTimeout(r.current);
        });

        setPhase('dissolving');

        apparitionTimerA.current = setTimeout(() => {
            setPhase('ghost');
            setRenderedFixed(isFixed);

            apparitionTimerB.current = setTimeout(() => {
                setPhase('appearing');
                apparitionTimerC.current = setTimeout(() => {
                    setPhase('visible');
                }, 450);
            }, 40);
        }, DISSOLVE_MS);
    }, [isFixed, renderedFixed]);

    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY;
        setIsFixed(scrollY > 0);
        setHasScrolled(scrollY > 0);
        setIsScrolling(true);
        setIsIdle(false);

        if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

        scrollTimerRef.current = setTimeout(() => {
            setIsScrolling(false);
            idleTimerRef.current = setTimeout(() => setIsIdle(true), IDLE_THRESHOLD);
        }, 200);
    }, []);

    useEffect(() => {
        const scrollY = window.scrollY;
        const fixed = scrollY > 0;
        setIsFixed(fixed);
        setRenderedFixed(fixed);
        setHasScrolled(fixed);

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        };
    }, [handleScroll]);

    const finalArmVisible = !isScrolling && (isHovered || (hasScrolled && isIdle));

    useEffect(() => {
        if (isOpen) return;
        const timer = setInterval(() => {
            setPromptIndex(i => (i + 1) % currentPrompts.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [isOpen, currentPrompts]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        const trimmed = inputVal.trim();
        if (!trimmed) return;

        const userMsg: ChatMessage = { id: Date.now(), from: 'user', text: trimmed };
        setMessages(prev => [...prev, userMsg]);
        setInputVal('');
        setIsTyping(true);

        // Provision a blank bot message for streaming
        const botMsgId = Date.now() + 1;
        setMessages(prev => [...prev, { id: botMsgId, from: 'bot', text: '' }]);

        try {
            const response = await fetch('/api/arson-intel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: messages.concat(userMsg),
                    context: currentTarget
                })
            });

            if (!response.ok) {
                const contentType = response.headers.get('content-type');
                let errMessage = 'OFFLINE_PROTOCOL_ENGAGED';
                
                if (contentType && contentType.includes('application/json')) {
                    const errData = await response.json();
                    errMessage = errData.error || errMessage;
                } else {
                    errMessage = await response.text() || errMessage;
                }
                throw new Error(errMessage);
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let accumulatedText = '';
            let buffer = '';

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });
                    const lines = buffer.split('\n');
                    
                    // Keep the last partial line in the buffer
                    buffer = lines.pop() || '';
                    
                    for (const line of lines) {
                        const trimmedLine = line.trim();
                        if (trimmedLine.startsWith('data: ')) {
                            try {
                                const data = JSON.parse(trimmedLine.slice(6));
                                if (data.text) {
                                    accumulatedText += data.text;
                                    setMessages(prev => prev.map(m => 
                                        m.id === botMsgId ? { ...m, text: accumulatedText } : m
                                    ));
                                } else if (data.error) {
                                    throw new Error(data.error);
                                }
                            } catch (e) {
                                console.error("Stream parse error:", e, trimmedLine);
                            }
                        }
                    }
                }
            }

            setIsTyping(false);

        } catch (error: any) {
            console.error("AI Error:", error);
            setIsTyping(false);
            setMessages(prev => prev.map(m => 
                m.id === botMsgId 
                    ? { ...m, text: error.message || 'SYSTEM OVERLOAD. CONNECTION SEVERED.' } 
                    : m
            ));
        }
    };

    const positionClasses = renderedFixed
        ? "fixed bottom-6 right-4 md:bottom-12 md:right-12 z-[10001] flex-row-reverse"
        : "fixed bottom-6 left-4 md:bottom-12 md:left-12 z-[10001] flex-row";

    const getApparitionStyle = (): React.CSSProperties => {
        switch (phase) {
            case 'dissolving':
                return {
                    opacity: 0,
                    transform: 'scale(0.4)',
                    filter: 'blur(10px)',
                    transition: `opacity ${DISSOLVE_MS}ms ease, transform ${DISSOLVE_MS}ms ease, filter ${DISSOLVE_MS}ms ease`,
                };
            case 'ghost':
                return {
                    opacity: 0,
                    transform: 'scale(0.4)',
                    filter: 'blur(10px)',
                    transition: 'none',
                };
            case 'appearing':
                return {
                    opacity: 1,
                    transform: 'scale(1.12)',
                    filter: 'blur(0px)',
                    transition: 'opacity 0.25s ease, transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.25s ease',
                };
            case 'visible':
            default:
                return {
                    opacity: loaded ? 1 : 0,
                    transform: 'scale(1)',
                    filter: 'blur(0px)',
                    transition: 'opacity 0.4s ease, transform 0.4s ease, filter 0.3s ease',
                };
        }
    };

    if (isMenuOpen) return null;

    return (
        <div
            className={`flex items-end gap-0 pointer-events-auto ars-bot-ui ${positionClasses}`}
            style={getApparitionStyle()}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 16, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.95 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className={`absolute bottom-full mb-4 ${renderedFixed ? 'right-0' : 'left-0'} w-[280px] md:w-[380px] bg-[#000000] border-2 border-[#FF3E00]/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-[10001] flex flex-col overflow-hidden`}
                        style={{ borderRadius: 2 }}
                    >
                        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#FF3E00]/20 bg-[#0A0A0A]">
                            <div className="w-12 h-12 rounded-full bg-[#FF3E00] flex items-center justify-center overflow-hidden shrink-0 px-2">
                                <img src={PLogo} alt="Bot" className="h-8 w-auto invert object-contain" />
                            </div>
                            <div>
                                <p className="font-syne text-[10px] font-black uppercase tracking-[0.2em] text-white">ARSON_INTERFACE</p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF3E00] animate-pulse" />
                                    <span className="font-mono text-[8px] uppercase tracking-widest text-[#FF3E00]">Active Intelligence</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="ml-auto text-white/30 hover:text-white transition-colors text-lg leading-none"
                            >×</button>
                        </div>

                        <div className="flex-1 overflow-y-auto max-h-[300px] min-h-[220px] px-4 py-3 space-y-3 no-scrollbar" style={{ scrollbarWidth: 'none' }}>
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] px-3 py-2 font-mono text-[11px] leading-relaxed whitespace-pre-wrap ${
                                        msg.from === 'bot'
                                            ? 'bg-white/5 text-white/80 border-l-2 border-[#FF3E00]'
                                            : 'bg-[#FF3E00] text-black font-bold'
                                    }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="px-4 py-2 bg-white/5 border-l-2 border-[#FF3E00] flex gap-1 items-center">
                                        <span className="w-1 h-1 rounded-full bg-[#FF3E00] animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-1 h-1 rounded-full bg-[#FF3E00] animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-1 h-1 rounded-full bg-[#FF3E00] animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="border-t border-white/5 flex items-center px-3 py-2 gap-2 bg-[#050505]">
                            <input
                                type="text"
                                value={inputVal}
                                onChange={e => setInputVal(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSend()}
                                placeholder="TYPE YOUR MESSAGE..."
                                className="flex-1 bg-transparent font-mono text-[11px] text-white placeholder:text-white/20 outline-none uppercase tracking-wider h-8"
                            />
                            <button
                                onClick={handleSend}
                                className="w-8 h-8 rounded-full bg-[#FF3E00] flex items-center justify-center hover:scale-110 transition-transform shrink-0"
                            >
                                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-black">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div
                className="relative flex items-center cursor-pointer"
                onClick={() => setIsOpen(v => !v)}
            >
                <div className="relative" style={{ overflow: 'visible' }}>
                    <svg
                        className={`absolute top-1/2 -translate-y-1/2 pointer-events-none ${renderedFixed ? 'right-full' : 'left-full'}`}
                        style={{
                            width: finalArmVisible ? '90px' : '0px',
                            height: '28px',
                            transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                            overflow: 'visible',
                        }}
                        viewBox="0 0 90 28"
                        fill="none"
                    >
                        <motion.path
                            d={renderedFixed ? "M90 14 Q70 6 45 14 Q25 20 8 10" : "M0 14 Q20 6 45 14 Q65 20 82 10"}
                            stroke="#FF3E00"
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{
                                pathLength: finalArmVisible ? 1 : 0,
                                opacity: finalArmVisible ? 1 : 0
                            }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        />
                        <motion.circle
                            cx={renderedFixed ? "8" : "82"} cy="10" r="3"
                            fill="#FF3E00"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: finalArmVisible ? 1 : 0,
                                opacity: finalArmVisible ? 1 : 0
                            }}
                            transition={{ duration: 0.3, delay: finalArmVisible ? 0.3 : 0 }}
                        />
                    </svg>

                    <div className={`
                        relative w-10 h-10 md:w-14 md:h-14 rounded-full
                        bg-[#FF3E00] border-2
                        flex items-center justify-center
                        transition-all duration-500 shadow-[0_0_24px_rgba(255,62,0,0.4)]
                        ${isHovered ? 'border-white scale-110' : 'border-[#FF3E00]/50 scale-100'}
                        ${isOpen ? 'ring-2 ring-white/30' : ''}
                        ${isIdle && !isHovered ? 'animate-[bot-idle-pulse_2s_ease-in-out_infinite]' : ''}
                    `}>
                        <img src={PLogo} alt="ArsonBot" className="h-8 md:h-12 w-auto invert object-contain px-2" />
                        {isIdle && !isScrolling && (
                            <span className="absolute inset-0 rounded-full border-2 border-[#FF3E00] animate-ping opacity-40 pointer-events-none" />
                        )}
                    </div>
                </div>

                <AnimatePresence>
                    {(!isScrolling && (isHovered || (hasScrolled && isIdle))) && (
                        <motion.div
                            initial={{ opacity: 0, x: renderedFixed ? 8 : -8, width: 0 }}
                            animate={{ opacity: 1, x: 0, width: 'auto' }}
                            exit={{ opacity: 0, x: renderedFixed ? 8 : -8, width: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className={`
                                flex items-center gap-2
                                bg-white/95 backdrop-blur-sm
                                px-4 py-2.5 rounded-full
                                shadow-[0_4px_20px_rgba(0,0,0,0.4)]
                                overflow-hidden whitespace-nowrap
                                ${renderedFixed ? 'mr-3' : 'ml-3'}
                                ${isHovered ? 'shadow-[0_4px_30px_rgba(255,62,0,0.3)]' : ''}
                            `}
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-[#FF3E00] animate-pulse shrink-0" />
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={promptIndex}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                    className="font-sans font-bold text-[11px] md:text-[12px] uppercase tracking-wide text-black/80"
                                >
                                    {currentTarget ? (
                                        <span className="text-[#FF3E00]">{currentPrompts[promptIndex]}</span>
                                    ) : (
                                        currentPrompts[promptIndex]
                                    )}
                                </motion.span>
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                @keyframes bot-idle-pulse {
                    0%, 100% { box-shadow: 0 0 24px rgba(255,62,0,0.4); }
                    50% { box-shadow: 0 0 40px rgba(255,62,0,0.8), 0 0 60px rgba(255,62,0,0.2); }
                }
                @keyframes scanline {
                    0% { top: -2px; }
                    100% { top: 100%; }
                }
            `}</style>
        </div>
    );
};

export default ArsBot;
