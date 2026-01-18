"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useRecruiterMode } from "@/components/providers/RecruiterProvider";

export function SpotifyPulse() {
    const { isRecruiterMode } = useRecruiterMode();
    const barsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isRecruiterMode) return;

        const ctx = gsap.context(() => {
            // Randomize bar heights to simulate equalizer
            gsap.to(".audio-bar", {
                scaleY: "random(0.1, 1)",
                duration: 0.2,
                ease: "power1.inOut",
                stagger: {
                    each: 0.05,
                    from: "center",
                    repeat: -1,
                    yoyo: true,
                },
            });
        }, barsRef);

        return () => ctx.revert();
    }, [isRecruiterMode]);

    return (
        <section className="py-20 border-t border-neutral-900 overflow-hidden">
            <div className="container mx-auto px-6 flex flex-col items-center justify-center">
                <div className="flex items-center gap-6 w-full max-w-2xl border border-neutral-800 p-6 rounded-full bg-neutral-950 relative overflow-hidden">
                    {/* Visualizer Background */}
                    <div ref={barsRef} className="absolute inset-0 flex items-center justify-between opacity-10 px-20 pointer-events-none">
                        {Array.from({ length: 40 }).map((_, i) => (
                            <div key={i} className="audio-bar w-1 bg-white h-full origin-bottom" />
                        ))}
                    </div>

                    {/* Content */}
                    <div className="relative z-10 w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center animate-spin-slow">
                        {/* Pretend Album Art */}
                        <div className="w-6 h-6 bg-white rounded-full" />
                    </div>

                    <div className="relative z-10 flex-1 min-w-0">
                        <div className="text-xs font-mono text-green-500 mb-1 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            SPOTIFY_PULSE // NOW_PLAYING
                        </div>
                        <div className="font-bold text-lg truncate">Deep Focus // Neural Mix</div>
                        <div className="text-neutral-500 text-sm truncate">Binary Beats • 2026</div>
                    </div>

                    <div className="relative z-10 font-mono text-xs text-neutral-600">
                        02:43 / 04:20
                    </div>
                </div>
            </div>
        </section>
    );
}
