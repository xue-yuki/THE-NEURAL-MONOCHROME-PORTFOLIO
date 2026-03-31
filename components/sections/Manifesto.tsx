"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

export function Manifesto() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        // Start animating when the top of the element hits 80% down the viewport
        // Finish animating when the top hits 30% down the viewport
        offset: ["start 80%", "start 30%"],
    });

    // The core manifesto phrase.
    const text = "BUILDING INTELLIGENT SYSTEMS AT THE INTERSECTION OF RAW CODE AND STUNNING AESTHETICS.";
    const words = text.split(" ");

    return (
        <section ref={containerRef} className="relative bg-neutral-950 py-32 md:py-56 flex flex-col justify-center overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-sans font-black tracking-tighter uppercase leading-[1.1] md:leading-[1.1] flex flex-wrap gap-x-3 md:gap-x-6 gap-y-2 md:gap-y-4">
                    {words.map((word, i) => {
                        // Distribute the 0-1 progress evenly across all words
                        const start = i / words.length;
                        const end = start + (1 / words.length);
                        return (
                            <Word key={i} progress={scrollYProgress} range={[start, end]}>
                                {word}
                            </Word>
                        );
                    })}
                </h2>
                
                <motion.div 
                    className="mt-20 md:mt-32 border-t border-neutral-800/80 pt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                >
                    <div className="text-neutral-500 font-mono text-xs md:text-sm max-w-md">
                        <span className="text-neutral-400">// SYS_LOG_</span> <br/>
                        Initiating core protocols... <br/>
                        Executing precision design matrices.
                    </div>
                    <div className="font-mono text-neutral-600 text-[10px] md:text-xs tracking-widest uppercase">
                        NEURAL.SYSTEM.ONLINE
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function Word({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) {
    // Opacity interpolates from 0 to 1 based on the global scroll reaching this word's specific range
    const opacity = useTransform(progress, range, [0, 1]);
    
    return (
        <span className="relative inline-block group">
            {/* The transparent ghost outline */}
            <span className="absolute left-0 top-0 text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.15)] select-none pointer-events-none">
                {children}
            </span>
            
            {/* The actual lighting-up word */}
            <motion.span 
                style={{ opacity }} 
                className="inline-block relative z-10 text-white transition-all duration-300 ease-out drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            >
                {children}
            </motion.span>
        </span>
    );
}
