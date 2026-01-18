"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRecruiterMode } from "@/components/providers/RecruiterProvider";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const MILESTONES = [
    { year: "2022", label: "SMK Telkom", desc: "Started at SMK Telkom Purwokerto" },
    { year: "2023", label: "Exploration", desc: "Discovered Web Development" },
    { year: "2024", label: "Certification", desc: "Dicoding & Google Courses" },
    { year: "2025", label: "Projects", desc: "Building Real-world Apps" },
    { year: "2026", label: "Future", desc: "AI & System Engineering" },
];

export function GrowthGraph() {
    const { isRecruiterMode } = useRecruiterMode();
    const sectionRef = useRef<HTMLElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (isRecruiterMode || !svgRef.current) return;

        const ctx = gsap.context(() => {
            // Animate line path
            const path = svgRef.current?.querySelector(".growth-path");
            if (!path) return;

            const length = (path as SVGPathElement).getTotalLength() || 0;

            // Reset
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

            gsap.to(path, {
                strokeDashoffset: 0,
                duration: 2,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                    end: "bottom 80%",
                    scrub: 1,
                },
            });

            // Animate dots
            gsap.from(".growth-dot", {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, [isRecruiterMode]);

    return (
        <section ref={sectionRef} id="about" className="min-h-screen py-20 relative flex flex-col items-center justify-center">
            <h2 className="text-4xl font-mono mb-20">GROWTH_LOG</h2>

            <div className="w-full max-w-5xl relative aspect-[16/9] border border-neutral-900 bg-neutral-950/30 p-8 rounded-lg">
                {/* Graph Visual */}
                <svg ref={svgRef} className="w-full h-full overflow-visible" viewBox="0 0 1000 500">
                    {/* Grid Lines */}
                    {[100, 200, 300, 400].map(y => (
                        <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="#333" strokeOpacity="0.2" />
                    ))}

                    {/* Key Path */}
                    <path
                        d="M 50 450 L 250 350 L 450 380 L 650 150 L 950 50"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        className="growth-path"
                    />

                    {/* Nodes */}
                    {[
                        { x: 50, y: 450, idx: 0 },
                        { x: 250, y: 350, idx: 1 },
                        { x: 450, y: 380, idx: 2 },
                        { x: 650, y: 150, idx: 3 },
                        { x: 950, y: 50, idx: 4 },
                    ].map((node, i) => (
                        <g key={i} className="growth-dot group">
                            <circle cx={node.x} cy={node.y} r="6" fill="black" stroke="white" strokeWidth="2" className="cursor-pointer hover:scale-150 transition-transform duration-300" />
                            {/* Tooltip style content */}
                            <foreignObject x={node.x - 100} y={node.y - 100} width="200" height="80" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <div className="bg-black border border-neutral-800 p-2 text-center text-sm">
                                    <div className="font-bold">{MILESTONES[i].year}</div>
                                    <div className="text-neutral-400 text-xs">{MILESTONES[i].label}</div>
                                    <div className="text-neutral-500 text-[10px]">{MILESTONES[i].desc}</div>
                                </div>
                            </foreignObject>
                        </g>
                    ))}
                </svg>

                {/* Fallback for Recruiter Mode (static list) */}
                {isRecruiterMode && (
                    <div className="absolute inset-0 bg-black flex flex-col justify-center items-center z-20">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
                            {MILESTONES.map((m, i) => (
                                <div key={i} className="border border-neutral-800 p-4">
                                    <div className="font-bold">{m.year}</div>
                                    <div>{m.label}</div>
                                </div>
                            ))}
                        </div>
                        {/* Courses List Fallback */}
                        <div className="mt-8 text-neutral-500 font-mono text-xs">
                            [COURSES_LOADED]: DICODING_ACADEMY, FREECODECAMP, GOOGLE_AI_ESSENTIALS
                        </div>
                    </div>
                )}
            </div>

            {/* Additional Info / Courses Panel */}
            <div className="mt-20 flex gap-8 text-xs font-mono text-neutral-500">
                <div>
                    <span className="text-white block mb-2">CURRENT_STATUS</span>
                    Student @ SMK Telkom Purwokerto
                </div>
                <div>
                    <span className="text-white block mb-2">HOBBIES</span>
                    Exploration, Coding, Reading
                </div>
                <div>
                    <span className="text-white block mb-2">CERTIFIED_COURSES</span>
                    Dicoding, FreeCodeCamp
                </div>
            </div>
        </section>
    );
}
