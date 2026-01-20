import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface SplitTextProps {
    children: string;
    className?: string;
    delay?: number;
}

export function SplitText({ children, className = '', delay = 0 }: SplitTextProps) {
    const containerRef = React.useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        const chars = containerRef.current?.querySelectorAll('.split-char');
        if (chars) {
            gsap.fromTo(
                chars,
                {
                    opacity: 0,
                    y: 50,
                    filter: 'blur(10px)',
                },
                {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 0.8,
                    stagger: 0.05,
                    ease: 'power4.out',
                    delay: delay,
                }
            );
        }
    }, { scope: containerRef });

    return (
        <span ref={containerRef} className={`inline-block overflow-hidden ${className}`}>
            {children.split('').map((char, i) => (
                <span
                    key={i}
                    className="split-char inline-block"
                    style={{ willChange: 'transform, opacity, filter' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </span>
    );
}
