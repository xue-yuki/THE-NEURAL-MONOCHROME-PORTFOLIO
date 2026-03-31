"use client";

import { motion } from "framer-motion";
import { useRecruiterMode } from "@/components/providers/RecruiterProvider";

const TECH_ROWS = [
    { label: "FRONTEND", items: ["NEXT.JS", "REACT", "GSAP", "FRAMER MOTION", "THREE.JS", "TAILWIND", "TYPESCRIPT"] },
    { label: "BACKEND", items: ["NODE.JS", "RUST", "PYTHON", "POSTGRESQL", "MONGODB", "GRAPHQL", "REDIS", "DOCKER"] },
    { label: "AI & ML", items: ["PYTORCH", "TENSORFLOW", "LANGCHAIN", "HUGGING FACE", "OPENAI", "TENSORRT", "CUDA", "LLAMA"] },
];

function MarqueeRow({ items, direction = 1, speed = 20 }: { items: string[], direction?: number, speed?: number }) {
    // We duplicate the items enough times to ensure a seamless infinite scroll across ultra-wide monitors
    const repeatedItems = [...items, ...items, ...items, ...items, ...items];
    
    return (
        <div className="flex overflow-hidden relative w-full group py-2 md:py-4">
            <motion.div
                className="flex whitespace-nowrap items-center will-change-transform"
                initial={{ x: direction > 0 ? 0 : "-50%" }}
                animate={{ x: direction > 0 ? "-50%" : 0 }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: speed,
                }}
            >
                {repeatedItems.map((item, idx) => (
                    <span 
                        key={idx} 
                        className="text-6xl md:text-8xl lg:text-9xl font-sans font-black tracking-tighter uppercase px-6
                                   text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.15)]
                                   hover:text-neutral-200 hover:[-webkit-text-stroke:0px_transparent] 
                                   hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]
                                   transition-all duration-300 cursor-crosshair select-none"
                    >
                        {item} 
                        <span className="text-neutral-800 [-webkit-text-stroke:0px] text-4xl md:text-6xl align-middle mx-10 font-normal">
                            ✦
                        </span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

export function TechStack() {
    const { isRecruiterMode } = useRecruiterMode();

    if (isRecruiterMode) {
        // Fallback for recruiter mode: clean minimalist grid list instead of overwhelming marquee
        return (
            <section className="py-32 border-t border-neutral-900">
                <div className="container mx-auto px-6 max-w-6xl">
                    <h2 className="text-3xl font-sans font-bold text-white mb-12">Core Competencies</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {TECH_ROWS.map((row, i) => (
                            <div key={i}>
                                <h3 className="font-mono text-neutral-400 mb-4 tracking-widest text-sm border-b border-neutral-800 pb-2">
                                    // {row.label}
                                </h3>
                                <ul className="flex flex-col gap-2">
                                    {row.items.slice(0, 5).map(item => (
                                        <li key={item} className="font-sans text-lg text-neutral-300">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative min-h-screen py-32 flex flex-col justify-center overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl mb-16 relative z-10">
                {/* Architectural Aligning Header */}
                <div className="flex justify-between items-end pb-6 border-b border-neutral-800/80">
                    <h2 className="text-4xl md:text-5xl font-sans font-light tracking-tighter text-neutral-200">
                        Tech Arsenal
                    </h2>
                    <span className="font-mono text-neutral-500 text-sm mb-2">
                        [04]
                    </span>
                </div>
            </div>

            <div className="w-full flex flex-col gap-4 md:gap-8 relative z-0">
                {/* Fade masks so the text disappears smoothly at edges */}
                <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />

                {/* Staggered speeds and alternating directions for the true immersive orbit feel */}
                <MarqueeRow items={TECH_ROWS[0].items} direction={1} speed={60} />
                <MarqueeRow items={TECH_ROWS[1].items} direction={-1} speed={75} />
                <MarqueeRow items={TECH_ROWS[2].items} direction={1} speed={55} />
            </div>
        </section>
    );
}
