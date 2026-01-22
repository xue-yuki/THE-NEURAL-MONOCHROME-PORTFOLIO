"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRecruiterMode } from "@/components/providers/RecruiterProvider";
import { ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS = [
    {
        id: "01",
        title: "NEURAL_SYNC",
        category: "AI / ARCHITECTURE",
        desc: "Autonomous agent orchestration platform built with Rust & Python.",
        tags: ["Rust", "PyTorch", "gRPC"],
    },
    {
        id: "02",
        title: "VOID_MERCHANT",
        category: "E-COMMERCE",
        desc: "Headless Shopify storefront with WebGL product customizer.",
        tags: ["Next.js", "Three.js", "Shopify"],
    },
    {
        id: "03",
        title: "ECHO_CHAMBER",
        category: "SOCIAL",
        desc: "Decentralized social graph visualization using D3.js.",
        tags: ["React", "D3.js", "GunDB"],
    },
    {
        id: "04",
        title: "SYNTH_WAVE",
        category: "AUDIO",
        desc: "Browser-based synthesizer using WebAudio API and WASM.",
        tags: ["WASM", "WebAudio", "Svelte"],
    },
];

export function ProjectGallery() {
    const { isRecruiterMode } = useRecruiterMode();
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isRecruiterMode) return;

        const ctx = gsap.context(() => {
            const projects = gsap.utils.toArray(".project-card");

            gsap.to(projects, {
                xPercent: -100 * (projects.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (projects.length - 1),
                    end: () => "+=" + (containerRef.current?.offsetWidth || 0),
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [isRecruiterMode]);

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative min-h-screen bg-neutral-950 overflow-hidden flex items-center"
        >
            {/* Background Decor */}
            <div className="absolute top-10 left-10 font-mono text-neutral-800 text-9xl font-bold opacity-20 select-none">
                WORK
            </div>

            <div
                ref={containerRef}
                className={`${isRecruiterMode ? "w-full max-w-6xl mx-auto px-6 py-20" : "flex px-20 gap-20 w-[400%] will-change-transform"}`}
            >
                {isRecruiterMode ? (
                    // Recruiter Mode: Grid Layout
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {PROJECTS.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                ) : (
                    // Immersive Mode: Horizontal Strip
                    PROJECTS.map((project) => (
                        <div key={project.id} className="project-card w-screen h-screen flex items-center justify-center shrink-0">
                            <ProjectCard project={project} large />
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

function ProjectCard({ project, large = false }: { project: typeof PROJECTS[0], large?: boolean }) {
    return (
        <SpotlightCard
            className={`
                group p-8 
                ${large ? "w-[800px] h-[500px]" : "w-full h-auto"} 
                flex flex-col justify-between transition-colors hover:border-neutral-600
            `}
            spotlightColor="rgba(255, 255, 255, 0.15)"
        >
            {/* Header */}
            <div className="flex justify-between items-start">
                <div className="font-mono text-neutral-500 text-sm tracking-widest">
                    {project.id} // {project.category}
                </div>
                <ArrowUpRight className="text-neutral-500 group-hover:text-white transition-colors" />
            </div>

            {/* Content */}
            <div>
                <h3 className={`font-bold font-sans mb-4 group-hover:text-white transition-colors ${large ? "text-6xl" : "text-3xl"}`}>
                    {project.title}
                </h3>
                <p className="text-neutral-400 font-mono max-w-md">
                    {project.desc}
                </p>
            </div>

            {/* Footer / Tags */}
            <div className="flex gap-4 mt-8">
                {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono border border-neutral-800 px-3 py-1 rounded-full text-neutral-500">
                        {tag}
                    </span>
                ))}
            </div>
        </SpotlightCard>
    )
}
