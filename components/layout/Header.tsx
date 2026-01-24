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

        // Scroll Effect
        useEffect(() => {
            const handleScroll = () => {
                setScrolled(window.scrollY > 50);
            };
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }, []);

        // Stagger Animation Variants
        const menuVars = {
            initial: {
                scaleY: 0,
            },
            animate: {
                scaleY: 1,
                transition: {
                    duration: 0.5,
                    ease: [0.12, 0, 0.39, 0],
                },
            },
            exit: {
                scaleY: 0,
                transition: {
                    delay: 0.5,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                },
            },
        };

        const containerVars = {
            initial: {
                transition: {
                    staggerChildren: 0.09,
                    staggerDirection: -1,
                },
            },
            open: {
                transition: {
                    delayChildren: 0.3,
                    staggerChildren: 0.09,
                    staggerDirection: 1,
                },
            },
        };

        const mobileLinkVars = {
            initial: {
                y: "30vh",
                transition: {
                    duration: 0.5,
                    ease: [0.37, 0, 0.63, 1],
                },
            },
            open: {
                y: 0,
                transition: {
                    ease: [0, 0.55, 0.45, 1],
                    duration: 0.7,
                },
            },
        };

        return (
            <header className="fixed top-0 left-0 w-full z-50">
                <div className={clsx(
                    "w-full transition-all duration-300 border-b border-transparent",
                    scrolled ? "bg-black/80 backdrop-blur-md border-neutral-900/50" : "bg-transparent",
                    isOpen && "!bg-transparent !border-transparent delay-500" // Hide bg when menu opens
                )}>
                    <div className="container mx-auto px-6 h-20 flex items-center justify-between">

                        {/* LOGO */}
                        <div className="font-mono text-xl font-bold tracking-tighter flex gap-2 z-[60] mix-blend-difference text-white">
                            <DecryptedText text="N/M" />
                            <span className="opacity-50">// V2.0</span>
                        </div>

                        {/* HAMBURGER BUTTON */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="z-[60] flex items-center gap-2 text-white mix-blend-difference group cursor-pointer"
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

                {/* FULLSCREEN MENU OVERLAY */}
                <AnimatePresence mode="wait">
                    {isOpen && (
                        <motion.div
                            key="menu-overlay"
                            variants={menuVars}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="fixed top-0 left-0 w-full h-[100dvh] bg-black origin-top flex flex-col items-center justify-center overflow-hidden z-[55]"
                        >
                            {/* BACKGROUND NOISE */}
                            <div className="absolute inset-0 opacity-[0.05] bg-[url('/noise.png')] pointer-events-none" />
                            <div className="absolute inset-0 bg-neutral-900/10 pointer-events-none" />

                            <div className="flex flex-col h-full w-full max-w-7xl mx-auto px-6 pt-24 pb-10">

                                {/* LINKS CONTAINER */}
                                <motion.div
                                    variants={containerVars}
                                    initial="initial"
                                    animate="open"
                                    exit="initial"
                                    className="flex flex-col gap-4 items-start justify-center flex-1"
                                >
                                    {menuItems.map((item, index) => (
                                        <div key={index} className="overflow-hidden">
                                            <motion.div variants={mobileLinkVars} className="relative group">
                                                <a
                                                    href={item.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className="block font-sans text-5xl md:text-7xl font-bold text-transparent hover:text-white transition-colors uppercase tracking-tight"
                                                    style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}
                                                >
                                                    {item.title}
                                                </a>
                                                {/* Hover underline / accent */}
                                                <div className="h-[2px] w-0 group-hover:w-full bg-white transition-all duration-300 mt-2" />
                                            </motion.div>
                                        </div>
                                    ))}
                                </motion.div>

                                {/* FOOTER INFO */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                    className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 font-mono text-xs text-neutral-500"
                                >
                                    <div className="max-w-xs">
                                        <p className="mb-2 text-white">CONTACT INFO</p>
                                        <p>Erlangga (Xue-Yuki)</p>
                                        <p>Fullstack AI Engineer</p>
                                        <p>Indonesia</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                                            LINKEDIN <ArrowRight size={10} />
                                        </a>
                                        <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                                            GITHUB <ArrowRight size={10} />
                                        </a>
                                        <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                                            INSTAGRAM <ArrowRight size={10} />
                                        </a>
                                    </div>
                                </motion.div>

                            </div>

                            {/* CLOSE DECORATION */}
                            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/5 font-black text-[10rem] md:text-[20rem] leading-none pointer-events-none select-none z-[-1]">
                                MENU
                            </div>

                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        );
    }
