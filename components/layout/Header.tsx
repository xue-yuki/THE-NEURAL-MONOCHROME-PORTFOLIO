"use client";

import { useRecruiterMode } from "@/components/providers/RecruiterProvider";
import { Switch } from "@/components/ui/Switch";
import clsx from "clsx";
import { useEffect, useState } from "react";

export function Header() {
    const { isRecruiterMode, toggleRecruiterMode } = useRecruiterMode();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={clsx(
                "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent",
                scrolled ? "bg-black/80 backdrop-blur-md border-neutral-900" : "bg-transparent py-4"
            )}
        >
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <div className="font-mono text-xl font-bold tracking-tighter">
                    N/M <span className="text-neutral-600">// V2.0</span>
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    <a href="#about" className="text-sm font-mono hover:text-neutral-400 transition-colors">
                        01. ABOUT
                    </a>
                    <a href="#projects" className="text-sm font-mono hover:text-neutral-400 transition-colors">
                        02. WORK
                    </a>
                    <a href="#contact" className="text-sm font-mono hover:text-neutral-400 transition-colors">
                        03. CONTACT
                    </a>
                </nav>

                <div className="flex items-center gap-4">
                    <Switch
                        checked={isRecruiterMode}
                        onChange={toggleRecruiterMode}
                        label={isRecruiterMode ? "RECRUITER ON" : "RECRUITER OFF"}
                    />
                </div>
            </div>
        </header>
    );
}
