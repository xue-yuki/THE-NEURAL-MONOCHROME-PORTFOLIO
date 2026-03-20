"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

/**
 * ScrollReveal — Wraps any section with a scroll-driven entrance animation.
 * Uses Framer Motion's useInView to trigger once when entering the viewport.
 * 
 * Variants:
 *   - "fade-up"     : fade in + slide up (default)
 *   - "fade-scale"  : fade in + scale from 0.95
 *   - "clip-up"     : clip-path reveal from bottom
 *   - "blur-in"     : fade in from blurred state
 */

type Variant = "fade-up" | "fade-scale" | "clip-up" | "blur-in";

interface ScrollRevealProps {
    children: ReactNode;
    variant?: Variant;
    delay?: number;
    className?: string;
}

/* Animation configs mapped by variant name */
const variants: Record<Variant, { initial: Record<string, any>; animate: Record<string, any> }> = {
    "fade-up": {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
    },
    "fade-scale": {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
    },
    "clip-up": {
        initial: { opacity: 0, clipPath: "inset(20% 0% 0% 0%)" },
        animate: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
    },
    "blur-in": {
        initial: { opacity: 0, filter: "blur(12px)" },
        animate: { opacity: 1, filter: "blur(0px)" },
    },
};

export function ScrollReveal({
    children,
    variant = "fade-up",
    delay = 0,
    className = "",
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    const v = variants[variant];

    return (
        <motion.div
            ref={ref}
            initial={v.initial}
            animate={isInView ? v.animate : v.initial}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94], // smooth ease-out-quad
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
