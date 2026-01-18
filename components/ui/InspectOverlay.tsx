"use client";

import { useEffect, useState } from "react";
import { Activity, Cpu, Database, Server, X } from "lucide-react";
import { useRecruiterMode } from "@/components/providers/RecruiterProvider";
import clsx from "clsx";
import gsap from "gsap";

export function InspectOverlay() {
    const { isRecruiterMode } = useRecruiterMode();
    const [isOpen, setIsOpen] = useState(false);
    const [fps, setFps] = useState(60);
    const [memory, setMemory] = useState(0);

    // FPS Counter
    useEffect(() => {
        if (!isOpen) return;
        let frame = 0;
        let lastTime = performance.now();
        let animId: number;

        const loop = (time: number) => {
            frame++;
            if (time - lastTime >= 1000) {
                setFps(frame);
                frame = 0;
                lastTime = time;
                // Simulate fluctuating memory usage
                setMemory(Math.floor(Math.random() * (120 - 80) + 80));
            }
            animId = requestAnimationFrame(loop);
        };
        animId = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(animId);
    }, [isOpen]);

    if (isRecruiterMode) return null;

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 p-3 bg-black border border-neutral-800 rounded-full hover:bg-neutral-900 transition-colors group"
                title="Inspect Mode"
            >
                <Activity size={20} className={clsx("transition-colors", isOpen ? "text-green-500" : "text-neutral-500 group-hover:text-white")} />
            </button>

            {/* Overlay */}
            <div className={clsx(
                "fixed inset-0 z-40 pointer-events-none transition-opacity duration-300 flex items-center justify-center",
                isOpen ? "opacity-100" : "opacity-0"
            )}>
                {/* Grid Lines Overlay */}
                <div className="absolute inset-0 grid grid-cols-[repeat(10,1fr)] opacity-10">
                    {Array.from({ length: 11 }).map((_, i) => (
                        <div key={i} className="border-r border-green-500 h-full" />
                    ))}
                </div>
                <div className="absolute inset-0 grid grid-rows-[repeat(10,1fr)] opacity-10">
                    {Array.from({ length: 11 }).map((_, i) => (
                        <div key={i} className="border-b border-green-500 w-full" />
                    ))}
                </div>

                {/* Data Panel */}
                {isOpen && (
                    <div className="absolute top-20 right-20 w-64 bg-black/90 border border-green-900/50 p-4 font-mono text-xs text-green-500 shadow-[0_0_20px_rgba(0,255,0,0.1)] backdrop-blur-sm pointer-events-auto">
                        <div className="flex justify-between items-center mb-4 border-b border-green-900/50 pb-2">
                            <span className="font-bold">SYSTEM_VITALS</span>
                            <button onClick={() => setIsOpen(false)}><X size={14} /></button>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="flex items-center gap-2"><Activity size={12} /> FPS</span>
                                <span>{fps}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="flex items-center gap-2"><Database size={12} /> MEMORY_HEAP</span>
                                <span>{memory} MB</span>
                            </div>
                            <div className="border-t border-green-900/50 pt-2 mt-2">
                                <div className="mb-2 font-bold text-neutral-500">ACTIVE_STACK</div>
                                <div className="grid grid-cols-2 gap-2 text-neutral-400">
                                    <span className="flex items-center gap-1"><Cpu size={10} /> NEXT.JS 14</span>
                                    <span className="flex items-center gap-1"><Server size={10} /> VERCEL</span>
                                    <span className="flex items-center gap-1"><Activity size={10} /> GSAP 3</span>
                                    <span className="flex items-center gap-1"><Database size={10} /> TAILWIND</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
