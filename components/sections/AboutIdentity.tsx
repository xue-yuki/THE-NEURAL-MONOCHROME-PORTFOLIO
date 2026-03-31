"use client";

"use client";

import { useRef } from "react";
import Tilt from "react-parallax-tilt";
import { useRecruiterMode } from "@/components/providers/RecruiterProvider";
import { Cpu, Globe, Zap, Code, Terminal, Database, Layout } from "lucide-react";

export function AboutIdentity() {
    const { isRecruiterMode } = useRecruiterMode();

    return (
        <section id="about" className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl relative z-10">

                {/* Section Header */}
                <div className="mb-12">
                    <h2 className="text-4xl md:text-6xl font-bold font-sans tracking-tighter mb-4">
                        ABOUT <span className="text-neutral-600">//</span> ME
                    </h2>
                    <p className="font-mono text-neutral-400 max-w-xl">
                        Fullstack Developer & AI Enthusiast based in Indonesia.
                        Turning caffeine into code and chaos into logic.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[160px]">

                    {/* 1. Large Bio Card (2x2) */}
                    <div className="hidden md:block md:col-span-2 md:row-span-2">
                        <BentoCard className="h-full flex flex-col justify-between p-8">
                            <div>
                                <div className="text-neutral-500 font-mono text-xs mb-2">IDENTITY_MATRIX</div>
                                <h3 className="text-3xl font-bold text-white mb-2">Erlangga</h3>
                                <p className="text-neutral-400 leading-relaxed">
                                    Student at SMK Telkom Purwokerto specializing in Software Engineering.
                                    Passionate about building scalable web applications and exploring the frontiers of Artificial Intelligence.
                                </p>
                            </div>
                            <div className="flex gap-4 mt-6">
                                <div className="px-4 py-2 border border-neutral-800 rounded-lg bg-neutral-900/50">
                                    <div className="text-xs text-neutral-500 font-mono">STATUS</div>
                                    <div className="text-green-500 font-bold flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                        ONLINE
                                    </div>
                                </div>
                                <div className="px-4 py-2 border border-neutral-800 rounded-lg bg-neutral-900/50">
                                    <div className="text-xs text-neutral-500 font-mono">LOCATION</div>
                                    <div className="text-white font-bold">Indonesia</div>
                                </div>
                            </div>
                        </BentoCard>
                    </div>
                    {/* Mobile Bio version */}
                    <div className="md:hidden col-span-1 row-span-2">
                        <BentoCard className="h-full flex flex-col justify-between p-6">
                            <div>
                                <div className="text-neutral-500 font-mono text-xs mb-2">IDENTITY_MATRIX</div>
                                <h3 className="text-2xl font-bold text-white mb-2">Erlangga</h3>
                                <p className="text-neutral-400 text-sm">
                                    Student & Fullstack Dev. Passionate about AI and Web technologies.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 mt-4">
                                <div className="text-green-500 font-bold flex items-center gap-2 text-sm">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    ONLINE
                                </div>
                            </div>
                        </BentoCard>
                    </div>

                    {/* 2. Tech Stack (2x1) */}
                    <div className="col-span-1 md:col-span-2 row-span-1">
                        <BentoCard className="h-full p-6 flex flex-col justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-800/20 to-transparent translate-x-[-100%] group-hover:animate-shimmer transition-all" />
                            <div className="text-neutral-500 font-mono text-xs mb-4">CORE_STACK</div>
                            <div className="flex justify-between items-center text-neutral-300">
                                <Code size={24} />
                                <Layout size={24} />
                                <Database size={24} />
                                <Terminal size={24} />
                                <Globe size={24} />
                            </div>
                            <div className="flex justify-between items-center text-xs font-mono text-neutral-600 mt-2">
                                <span>TS</span>
                                <span>React</span>
                                <span>SQL</span>
                                <span>Rust</span>
                                <span>Web3</span>
                            </div>
                        </BentoCard>
                    </div>

                    {/* 3. Focus/Current Learning (1x1) */}
                    <div className="col-span-1 row-span-1">
                        <BentoCard className="h-full p-6 flex flex-col justify-between">
                            <div className="text-neutral-500 font-mono text-xs">FOCUS</div>
                            <div className="flex items-end justify-between">
                                <span className="text-2xl font-bold text-white">AI Eng</span>
                                <Cpu className="text-neutral-600" />
                            </div>
                        </BentoCard>
                    </div>

                    {/* 4. Experience/Stats (1x1) */}
                    <div className="col-span-1 row-span-1">
                        <BentoCard className="h-full p-6 flex flex-col justify-between">
                            <div className="text-neutral-500 font-mono text-xs">YEARS</div>
                            <div className="flex items-end justify-between">
                                <span className="text-4xl font-bold text-white">03</span>
                                <span className="text-neutral-600 font-mono text-xs mb-1">exp</span>
                            </div>
                        </BentoCard>
                    </div>

                    {/* 5. Wide Statement (2x1) — bright accent card, overrides glass bg */}
                    <div className="col-span-1 md:col-span-2 row-span-1">
                        <BentoCard className="h-full p-6 flex items-center justify-center !bg-white/10 !border-white/20 hover:!bg-white/15 transition-colors">
                            <p className="font-mono font-bold text-lg md:text-xl text-center text-white">
                                &quot;Obsessed with details.&quot;
                            </p>
                        </BentoCard>
                    </div>

                    {/* 6. Hobbies (2x1) */}
                    <div className="col-span-1 md:col-span-2 row-span-1">
                        <BentoCard className="h-full p-6 relative overflow-hidden flex flex-col justify-center">
                            <div className="absolute right-0 top-0 p-3 opacity-10">
                                <Zap size={100} />
                            </div>
                            <div className="text-neutral-500 font-mono text-xs mb-2">INTERESTS</div>
                            <div className="flex flex-wrap gap-2">
                                {["Photography", "UI Design", "Sci-Fi", "Mechanical Keyboards"].map(tag => (
                                    <span key={tag} className="px-3 py-1 rounded-full border border-neutral-800 text-xs font-mono text-neutral-400 bg-neutral-900/50">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </BentoCard>
                    </div>

                </div>
            </div>
        </section>
    );
}

function BentoCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    return (
        <Tilt
            tiltMaxAngleX={2.5}
            tiltMaxAngleY={2.5}
            perspective={1000}
            transitionSpeed={1500}
            scale={1.02}
            className={`h-full w-full`}
        >
            {/* Updated flat card to use glassmorphism and glow-border for interactive modern UI */}
            <div className={`h-full w-full glass glow-border rounded-xl overflow-hidden ${className}`}>
                {children}
            </div>
        </Tilt>
    );
}
    