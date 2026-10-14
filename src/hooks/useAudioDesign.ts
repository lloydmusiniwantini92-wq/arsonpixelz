import { useEffect, useRef, useCallback } from 'react';

export const useAudioDesign = () => {
    const audioCtxRef = useRef<AudioContext | null>(null);

    const initAudio = useCallback(() => {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume();
        }
    }, []);

    // A low, subtle "tick" for hovering over elements
    const playHoverTick = useCallback(() => {
        if (!audioCtxRef.current) return;
        const ctx = audioCtxRef.current;
        
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.05);
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
    }, []);

    // A sharp, aggressive "thud" for clicks
    const playClickThud = useCallback(() => {
        if (!audioCtxRef.current) return;
        const ctx = audioCtxRef.current;
        
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.type = 'square';
        osc.frequency.setValueAtTime(100, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    }, []);

    // Setup global listeners
    useEffect(() => {
        const handleInteraction = () => {
            initAudio();
            // Remove listener after first interaction to unlock audio context
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
        };
        
        window.addEventListener('click', handleInteraction);
        window.addEventListener('keydown', handleInteraction);

        // Add event delegation for global hover/click sounds
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, [data-magnetic]')) {
                playHoverTick();
            }
        };

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, [data-magnetic]')) {
                playClickThud();
            }
        };

        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mousedown', handleClick);

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousedown', handleClick);
        };
    }, [initAudio, playHoverTick, playClickThud]);

    return { initAudio, playHoverTick, playClickThud };
};
