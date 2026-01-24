"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";

interface GlitchTextProps {
    text: string;
    className?: string;
}

export function GlitchText({ text, className }: GlitchTextProps) {
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        const triggerGlitch = () => {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), 200);
        };

        const interval = setInterval(triggerGlitch, 3000 + Math.random() * 5000); // Random interval between 3-8s
        return () => clearInterval(interval);
    }, []);

    return (
        <span
            className={clsx(
                "relative inline-block",
                isGlitching && "animate-glitch",
                className
            )}
            data-text={text}
            onMouseEnter={() => setIsGlitching(true)}
            onMouseLeave={() => setIsGlitching(false)}
        >
            {text}
            <style jsx>{`
                .animate-glitch::before,
                .animate-glitch::after {
                    content: attr(data-text);
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: black;
                }
                .animate-glitch::before {
                    left: 2px;
                    text-shadow: -1px 0 #ffffff;
                    clip-path: inset(44% 0 61% 0);
                    animation: glitch-anim-1 0.4s infinite linear alternate-reverse;
                }
                .animate-glitch::after {
                    left: -2px;
                    text-shadow: 2px 0 #a3a3a3;
                    clip-path: inset(54% 0 20% 0);
                    animation: glitch-anim-2 0.4s infinite linear alternate-reverse;
                }
                @keyframes glitch-anim-1 {
                    0% { clip-path: inset(20% 0 80% 0); }
                    20% { clip-path: inset(60% 0 10% 0); }
                    40% { clip-path: inset(40% 0 50% 0); }
                    60% { clip-path: inset(80% 0 5% 0); }
                    80% { clip-path: inset(10% 0 70% 0); }
                    100% { clip-path: inset(30% 0 20% 0); }
                }
                @keyframes glitch-anim-2 {
                    0% { clip-path: inset(10% 0 60% 0); }
                    20% { clip-path: inset(80% 0 5% 0); }
                    40% { clip-path: inset(30% 0 10% 0); }
                    60% { clip-path: inset(50% 0 80% 0); }
                    80% { clip-path: inset(20% 0 40% 0); }
                    100% { clip-path: inset(70% 0 10% 0); }
                }
            `}</style>
        </span>
    );
}
