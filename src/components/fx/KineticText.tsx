import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface KineticTextProps {
    children: string;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
    scrambleSpeed?: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?";

export const KineticText: React.FC<KineticTextProps> = ({
    children,
    className = "",
    as: Tag = "span",
    scrambleSpeed = 50
}) => {
    const elRef = useRef<HTMLElement>(null);
    const originalText = children;

    useEffect(() => {
        const el = elRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: el,
                start: "top 90%",
                onEnter: () => {
                    let iteration = 0;
                    const maxIterations = originalText.length;

                    const interval = setInterval(() => {
                        el.innerText = originalText
                            .split("")
                            .map((char, index) => {
                                if (index < iteration) return originalText[index];
                                return CHARS[Math.floor(Math.random() * CHARS.length)];
                            })
                            .join("");

                        if (iteration >= maxIterations) {
                            clearInterval(interval);
                            el.innerText = originalText; // Ensure purity at end
                        }

                        iteration += 1 / 2; // Decrypt speed
                    }, 30);
                }
            });
        }, elRef);

        return () => ctx.revert();
    }, [originalText]);

    return (
        <Tag ref={elRef} className={`${className} font-mono uppercase`}>
            {originalText}
        </Tag>
    );
};
