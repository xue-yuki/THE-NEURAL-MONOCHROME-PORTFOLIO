"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* --- Placeholder achievement data --- */
const achievements = [
    {
        title: "OSN Informatika — School Selection",
        category: "Competition",
        year: "2025",
        description: "Represented school in the National Science Olympiad for Informatics, advancing through rigorous algorithmic problem-solving rounds.",
    },
    {
        title: "Best Project — Web Development Showcase",
        category: "Project",
        year: "2024",
        description: "Awarded best project for a fullstack AI-powered analytics dashboard built with Next.js and Python.",
    },
    {
        title: "Google Developer Student Club Lead",
        category: "Leadership",
        year: "2024",
        description: "Led a team of 20+ developers in organizing workshops, hackathons, and community tech events.",
    },
    {
        title: "Top 10 — National Hackathon",
        category: "Competition",
        year: "2023",
        description: "Built a real-time collaborative whiteboard with AI suggestions, placing top 10 out of 200+ teams.",
    },
    {
        title: "Dean's List — Academic Excellence",
        category: "Academic",
        year: "2023",
        description: "Consistently maintained top academic performance in Software Engineering coursework.",
    },
];

/* --- Single achievement row component --- */
function AchievementRow({
    item,
    index,
    delay,
}: {
    item: (typeof achievements)[0];
    index: number;
    delay: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
        >
            {/* Each row morphs into a glass card on hover with glow-border */}
            <div className="group relative py-6 px-4 md:px-6 rounded-xl border border-transparent hover:glass hover:glow-border transition-all duration-300 cursor-default">
                <div className="flex items-center gap-6 md:gap-10">

                    {/* Left: oversized ghost index number */}
                    <span className="hidden md:block text-5xl lg:text-7xl font-bold text-white/[0.06] font-mono select-none shrink-0 w-20 text-right leading-none">
                        {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Center: title + category badge + description on hover */}
                    <div className="flex-1 min-w-0">
                        {/* Title shifts right on hover for subtle interactivity */}
                        <h4 className="text-xl md:text-2xl lg:text-3xl font-bold text-white/90 group-hover:text-white group-hover:translate-x-2 transition-all duration-300 tracking-tight truncate">
                            {item.title}
                        </h4>

                        {/* Category badge — small uppercase with high letter-spacing */}
                        <span className="inline-block mt-2 px-3 py-0.5 rounded-full border border-white/10 text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-mono group-hover:border-white/20 group-hover:text-neutral-300 transition-all">
                            {item.category}
                        </span>

                        {/* Description — fades in only on hover */}
                        <p className="mt-2 text-sm text-neutral-500 max-w-xl leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-300 overflow-hidden">
                            {item.description}
                        </p>
                    </div>

                    {/* Right: year + arrow on hover */}
                    <div className="flex items-center gap-4 shrink-0">
                        <span className="font-mono text-sm text-neutral-600 group-hover:text-neutral-400 transition-colors">
                            {item.year}
                        </span>
                        {/* Arrow icon appears on hover */}
                        <ArrowRight
                            size={18}
                            className="text-neutral-700 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                        />
                    </div>
                </div>

                {/* Bottom separator line */}
                <div className="absolute bottom-0 left-4 right-4 h-px bg-white/[0.06] group-hover:bg-transparent transition-colors" />
            </div>
        </motion.div>
    );
}

/* --- Main Achievements section --- */
export function Achievements() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section ref={sectionRef} className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-5xl">

                {/* Section header — consistent with other sections */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="mb-14"
                >
                    <h3 className="font-sans text-3xl md:text-5xl font-bold tracking-tighter mb-2 text-gradient">
                        Achievements
                    </h3>
                    <p className="font-mono text-sm text-neutral-500">
                        Milestones & recognitions along the way
                    </p>
                </motion.div>

                {/* Achievement rows — staggered fade-up */}
                <div className="flex flex-col">
                    {achievements.map((item, i) => (
                        <AchievementRow
                            key={item.title}
                            item={item}
                            index={i}
                            delay={i * 0.08}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
