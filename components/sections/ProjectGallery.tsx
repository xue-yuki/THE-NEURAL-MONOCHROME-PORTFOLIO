"use client";

import { useState } from "react";
import { motion, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRecruiterMode } from "@/components/providers/RecruiterProvider";

const PROJECTS = [
    {
        id: "01",
        title: "NEURAL_SYNC",
        category: "AI / ARCHITECTURE",
        desc: "Autonomous agent orchestration platform built with Rust & Python.",
        tags: ["Rust", "PyTorch", "gRPC"],
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&h=450&auto=format&fit=crop",
    },
    {
        id: "02",
        title: "VOID_MERCHANT",
        category: "E-COMMERCE",
        desc: "Headless Shopify storefront with WebGL product customizer.",
        tags: ["Next.js", "Three.js", "Shopify"],
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&h=450&auto=format&fit=crop",
    },
    {
        id: "03",
        title: "ECHO_CHAMBER",
        category: "SOCIAL",
        desc: "Decentralized social graph visualization using D3.js.",
        tags: ["React", "D3.js", "GunDB"],
        image: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=600&h=450&auto=format&fit=crop",
    },
    {
        id: "04",
        title: "SYNTH_WAVE",
        category: "AUDIO",
        desc: "Browser-based synthesizer using WebAudio API and WASM.",
        tags: ["WASM", "WebAudio", "Svelte"],
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&h=450&auto=format&fit=crop",
    },
];

export function ProjectGallery() {
    const { isRecruiterMode } = useRecruiterMode();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Spring animations for cursor follower - premium physical smoothing
    const springConfig = { damping: 25, stiffness: 180, mass: 0.5 };
    const cursorX = useSpring(0, springConfig);
    const cursorY = useSpring(0, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        // Adjust offsets to perfectly center the 400x300 image on cursor
        cursorX.set(e.clientX - 200);
        cursorY.set(e.clientY - 150);
    };

    return (
        <section 
            onMouseMove={handleMouseMove}
            id="projects" 
            className="relative min-h-screen bg-neutral-950 pt-24 pb-32 overflow-hidden"
        >
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                
                {/* Clean, Architectural Header */}
                <div className="flex justify-between items-end mb-16 pb-6 border-b border-neutral-800/80">
                    <h2 className="text-4xl md:text-5xl font-sans font-light tracking-tighter text-neutral-200">
                        Selected Works
                    </h2>
                    <span className="font-mono text-neutral-500 text-sm mb-2">
                        [03]
                    </span>
                </div>

                {/* Refined Typography List */}
                <div className="flex flex-col group/list w-full">
                    {PROJECTS.map((project, index) => (
                        <div
                            key={project.id}
                            className="group relative border-b border-neutral-800/60 hover:border-neutral-600 transition-colors duration-500"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="py-10 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer relative z-10 w-full">
                                
                                {/* 1. Number & Title */}
                                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 w-full md:w-3/5">
                                    <span className="font-mono text-neutral-600 text-sm md:text-base transition-colors group-hover:text-neutral-400">
                                        {project.id}
                                    </span>
                                    <h3 
                                        className="text-5xl md:text-6xl lg:text-7xl font-sans font-semibold tracking-tighter uppercase text-neutral-400 transition-all duration-500 
                                        group-hover:text-white md:group-hover:translate-x-4"
                                    >
                                        {project.title}
                                    </h3>
                                </div>

                                {/* 2. Category, Desc & Tags (Right Side Alignment) */}
                                <div className="flex flex-col md:items-end gap-3 w-full md:w-2/5 mt-4 md:mt-0">
                                    <div className="flex items-center gap-3">
                                        {/* Minimalist pill for category */}
                                        <span className="font-mono text-neutral-300 text-xs tracking-widest uppercase bg-neutral-900 px-4 py-1.5 rounded-full border border-neutral-800 group-hover:border-neutral-500 transition-colors duration-500">
                                            {project.category}
                                        </span>
                                        <ArrowUpRight className="w-6 h-6 text-neutral-600 group-hover:text-white group-hover:rotate-45 transition-all duration-500" />
                                    </div>
                                    
                                    {/* Description properly aligned */}
                                    <p className="text-neutral-500 font-sans text-sm md:text-base md:text-right max-w-sm mt-3 transition-colors duration-500 group-hover:text-neutral-300">
                                        {project.desc}
                                    </p>
                                    
                                    {/* Ultra-clean tags (hashtag style instead of heavy pills) */}
                                    {!isRecruiterMode && (
                                        <div className="flex flex-wrap md:justify-end gap-3 mt-2 w-full opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="text-xs font-mono text-neutral-500 group-hover:text-neutral-400 transition-colors">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Image Cursor using Framer Motion (Perfectly Proportioned) */}
            {!isRecruiterMode && (
                <motion.div
                    className="fixed top-0 left-0 w-[400px] h-[300px] pointer-events-none z-0 overflow-hidden hidden md:block rounded-xl drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-white/5" 
                    style={{
                        x: cursorX,
                        y: cursorY,
                        opacity: hoveredIndex !== null ? 1 : 0,
                        scale: hoveredIndex !== null ? 1 : 0.85,
                        transformOrigin: '50% 50%'
                    }}
                    transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } }}
                >
                    <div 
                        className="w-full h-full flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform bg-neutral-950"
                        style={{ transform: `translateY(-${(hoveredIndex ?? 0) * 100}%)` }}
                    >
                        {PROJECTS.map((project, idx) => (
                            <div key={idx} className="w-full h-full shrink-0 relative overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover opacity-90 will-change-transform grayscale group-hover/list:grayscale-0 transition-all duration-700"
                                    style={{
                                        // Slick zoom-out parallax effect when active
                                        transform: hoveredIndex === idx ? 'scale(1)' : 'scale(1.15)',
                                        transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
                                    }}
                                />
                                {/* subtle inner shadow over the image */}
                                <div className="absolute inset-0 bg-black/10 ring-1 ring-inset ring-white/10" /> 
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </section>
    );
}
