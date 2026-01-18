"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useRecruiterMode } from "@/components/providers/RecruiterProvider";
import clsx from "clsx";

export function Hero() {
    const { isRecruiterMode } = useRecruiterMode();
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isRecruiterMode || !textRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from(".hero-line", {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power4.out",
            });
        }, textRef);

        return () => ctx.revert();
    }, [isRecruiterMode]);

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            <div ref={textRef} className="container mx-auto px-6 z-10">
                <div className="max-w-4xl">
                    <h1 className="font-sans text-6xl md:text-9xl font-bold tracking-tighter leading-[0.9] mb-8">
                        <div className="overflow-hidden">
                            <span className={clsx("hero-line block", isRecruiterMode && "opacity-100 translate-y-0")}>
                                NEURAL
                            </span>
                        </div>
                        <div className="overflow-hidden">
                            <span className={clsx("hero-line block text-neutral-500", isRecruiterMode && "opacity-100 translate-y-0")}>
                                MONOCHROME
                            </span>
                        </div>
                    </h1>

                    <div className="overflow-hidden max-w-2xl">
                        <p className={clsx(
                            "hero-line text-xl md:text-2xl font-mono text-neutral-400",
                            isRecruiterMode && "opacity-100 translate-y-0"
                        )}>
                            Hello, I'm Erlangga. <br />
                            A student at SMK Telkom Purwokerto. <br />
                            Exploring new tech, one line of code at a time.
                        </p>
                    </div>
                </div>
            </div>

            {/* Simplified Background */}
            {!isRecruiterMode && (
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] mix-blend-overlay" />
                </div>
            )}
        </section>
    );
}
