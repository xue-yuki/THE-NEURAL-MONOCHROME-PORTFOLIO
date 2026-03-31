"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { DecryptedText } from "@/components/ui/DecryptedText";
import clsx from "clsx";

// --- MENU DATA ---
const menuItems = [
    { title: "HOME", href: "#top" },
    { title: "ABOUT", href: "#about" },
    { title: "PROJECTS", href: "#projects" },
    { title: "CONTACT", href: "#contact" }
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Scroll detection for glass pill opacity change
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when drawer is open to prevent background scrolling
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    return (
        <>
            {/* Floating glass pill navbar — stays visible even when drawer is open */}
            <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-[60]">
                <div className={clsx(
                    "w-full transition-all duration-500 rounded-2xl glass",
                    scrolled ? "bg-black/60 shadow-[0_10px_40px_rgba(0,0,0,0.8)]" : "bg-white/5",
                )}>
                    <div className="px-6 h-16 flex items-center justify-between">

                        {/* LOGO — text-gradient for modern sheen */}
                        <div className="font-mono text-xl font-bold tracking-tighter flex gap-2 text-white">
                            <DecryptedText text="N/M" />
                            <span className="opacity-50">// V2.0</span>
                        </div>

                        {/* HAMBURGER BUTTON — toggles the side drawer */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                            className="flex items-center gap-2 text-white group cursor-pointer"
                        >
                            <span className="hidden md:block font-mono text-xs tracking-widest group-hover:tracking-[0.2em] transition-all">
                                {isOpen ? "CLOSE" : "MENU"}
                            </span>
                            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-black/50 backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-all">
                                {isOpen ? <X size={18} /> : <Menu size={18} />}
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* SIDE DRAWER + DIM BACKDROP */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Dim backdrop overlay — click to close drawer */}
                        <motion.div
                            key="drawer-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55]"
                        />

                        {/* Drawer panel — slides in from the right with translateX */}
                        <motion.aside
                            key="drawer-panel"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 h-[100dvh] w-full max-w-sm glass bg-black/70 z-[56] flex flex-col overflow-y-auto"
                        >
                            {/* Close button inside the drawer */}
                            <div className="flex items-center justify-between px-6 pt-8 pb-4 border-b border-white/10">
                                <span className="font-mono text-xs text-neutral-500 tracking-widest">NAVIGATION</span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    aria-label="Close navigation menu"
                                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Navigation links with staggered fade-in */}
                            <nav className="flex flex-col gap-2 px-6 pt-8 flex-1">
                                {menuItems.map((item, index) => (
                                    <motion.a
                                        key={item.title}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        initial={{ opacity: 0, x: 40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 40 }}
                                        transition={{ delay: 0.1 + index * 0.07, duration: 0.4, ease: "easeOut" }}
                                        className="group flex items-center justify-between py-4 border-b border-white/5 hover:border-white/20 transition-all"
                                    >
                                        <span className="font-sans text-2xl font-bold text-white/80 group-hover:text-white transition-colors tracking-tight">
                                            {item.title}
                                        </span>
                                        {/* Arrow slides in on hover for interactivity */}
                                        <ArrowRight size={16} className="text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                    </motion.a>
                                ))}
                            </nav>

                            {/* Footer info inside drawer */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                                className="px-6 pb-8 pt-6 border-t border-white/10 font-mono text-xs text-neutral-500"
                            >
                                <p className="mb-3 text-white text-sm">CONTACT</p>
                                <p>Erlangga (Xue-Yuki)</p>
                                <p>Fullstack AI Engineer</p>
                                <p className="mb-4">Indonesia</p>
                                <div className="flex gap-4">
                                    <a href="#" aria-label="Visit my LinkedIn profile" className="hover:text-white transition-colors flex items-center gap-1">
                                        LINKEDIN <ArrowRight size={10} />
                                    </a>
                                    <a href="#" aria-label="Visit my GitHub profile" className="hover:text-white transition-colors flex items-center gap-1">
                                        GITHUB <ArrowRight size={10} />
                                    </a>
                                </div>
                            </motion.div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
