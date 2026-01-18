"use client";

import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { useRecruiterMode } from "@/components/providers/RecruiterProvider";
import { Cpu, History, User } from "lucide-react";

const DATA = {
    BIO: {
        title: "SUBJECT_PROFILE",
        content: [
            { label: "NAME", value: "Erlangga" },
            { label: "AFFILIATION", value: "SMK Telkom Purwokerto" },
            { label: "ROLE", value: "Student / Fullstack Dev" },
            { label: "STATUS", value: "Online / Learning" },
            { label: "HOBBIES", value: "Exploration, Coding, Reading" },
        ]
    },
    TIMELINE: {
        title: "CHRONOLOGY_LOG",
        content: [
            { label: "2022", value: "Entered SMK Telkom Purwokerto" },
            { label: "2023", value: "Discovered Web Development (HTML/CSS)" },
            { label: "2024", value: "Certified: Dicoding & Google AI" },
            { label: "2025", value: "Building Complex Systems (Next.js)" },
            { label: "2026", value: "Target: AI Engineering Mastery" },
        ]
    },
    SKILLS: {
        title: "ABILITY_MATRIX",
        content: [
            { label: "CORE", value: "HTML, CSS, JavaScript, TypeScript" },
            { label: "FRAMEWORKS", value: "React, Next.js, Tailwind, Vue" },
            { label: "BACKEND", value: "Node.js, PostgreSQL, Supabase" },
            { label: "TOOLS", value: "Git, Figma, Vercel, VS Code" },
        ]
    }
};

type TabKey = keyof typeof DATA;

export function AboutIdentity() {
    const { isRecruiterMode } = useRecruiterMode();
    const [activeTab, setActiveTab] = useState<TabKey>("BIO");
    const [isScrambling, setIsScrambling] = useState(false);

    // Scramble effect trigger
    useEffect(() => {
        setIsScrambling(true);
        const timer = setTimeout(() => setIsScrambling(false), 500);
        return () => clearTimeout(timer);
    }, [activeTab]);

    return (
        <section id="about" className="min-h-screen flex items-center justify-center py-20 relative">
            {/* Container */}
            <div className="w-full max-w-4xl mx-auto px-6">
                <div className="relative border border-neutral-800 bg-black/80 backdrop-blur-sm p-1">

                    {/* Decorative Corners */}
                    <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-white" />
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-white" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white" />

                    {/* Header / Tabs */}
                    <div className="flex border-b border-neutral-800">
                        <TabButton
                            active={activeTab === "BIO"}
                            onClick={() => setActiveTab("BIO")}
                            icon={<User size={14} />}
                            label="BIO"
                        />
                        <TabButton
                            active={activeTab === "TIMELINE"}
                            onClick={() => setActiveTab("TIMELINE")}
                            icon={<History size={14} />}
                            label="TIMELINE"
                        />
                        <TabButton
                            active={activeTab === "SKILLS"}
                            onClick={() => setActiveTab("SKILLS")}
                            icon={<Cpu size={14} />}
                            label="SKILLS"
                        />
                    </div>

                    {/* Content Area */}
                    <div className="p-8 min-h-[400px] relative overflow-hidden">
                        {/* Scanner Line */}
                        {!isRecruiterMode && (
                            <div className="absolute top-0 left-0 w-full h-1 bg-green-500/20 shadow-[0_0_15px_rgba(0,255,0,0.5)] animate-scan-y pointer-events-none" />
                        )}

                        <h3 className="font-mono text-xs text-neutral-500 mb-8 tracking-widest">
                   //{DATA[activeTab].title}
                        </h3>

                        <div className="space-y-6">
                            {DATA[activeTab].content.map((item, i) => (
                                <div key={i} className="group">
                                    <div className="font-mono text-[10px] text-neutral-600 mb-1 group-hover:text-green-500 transition-colors">
                                        {item.label}
                                    </div>
                                    <div className={clsx(
                                        "font-mono text-lg md:text-xl",
                                        isScrambling ? "bg-neutral-900 text-transparent" : "text-white"
                                    )}>
                                        <ScrambleText text={item.value} trigger={activeTab} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Decorative Side Element */}
                        <div className="absolute top-0 right-0 h-full w-12 border-l border-neutral-900 flex flex-col items-center justify-end pb-4 gap-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="w-1 h-1 bg-neutral-800 rounded-full" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "flex-1 flex items-center justify-center gap-2 py-4 font-mono text-xs hover:bg-neutral-900 transition-colors relative",
                active ? "text-white bg-neutral-900" : "text-neutral-500"
            )}
        >
            {icon}
            {label}
            {active && <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white" />}
        </button>
    )
}

function ScrambleText({ text, trigger }: { text: string, trigger: string }) {
    const [display, setDisplay] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";

    useEffect(() => {
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplay(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iterations) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iterations >= text.length) {
                clearInterval(interval);
            }
            iterations += 1 / 2; // Speed
        }, 30);

        return () => clearInterval(interval);
    }, [text, trigger]);

    return <span>{display}</span>;
}
