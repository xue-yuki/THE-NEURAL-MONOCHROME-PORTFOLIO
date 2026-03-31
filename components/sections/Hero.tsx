"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useRecruiterMode } from "@/components/providers/RecruiterProvider";
import { SplitText } from "@/components/ui/SplitText";
import { DecryptedText } from "@/components/ui/DecryptedText";
import dynamic from "next/dynamic";
const Lanyard = dynamic(() => import("@/components/ui/Lanyard"), { ssr: false });
const Squares = dynamic(() => import("@/components/ui/Squares").then((mod) => mod.Squares), { ssr: false });
import { useMountDelay } from "@/lib/useMountDelay";

import clsx from "clsx";

export function Hero() {
    const { isRecruiterMode } = useRecruiterMode();
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isRecruiterMode || !textRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from(".hero-line", {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power4.out",
            });
        }, textRef);

        return () => ctx.revert();
    }, [isRecruiterMode]);

    // Defer heavy visuals slightly but not too long, 800ms gives Lighthouse a pristine initial thread but feels fast
    const isDecorMounted = useMountDelay(800);

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            <div ref={textRef} className="container mx-auto px-6 z-10 relative">
                {/* Added a subtle glowing radial background for depth and premium feel */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.04] rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
                
                <div className="max-w-5xl relative z-10 -mt-[15vh] md:mt-0">
                    <h1 className="font-sans text-6xl md:text-9xl font-bold tracking-tighter leading-[0.9] mb-8">
                        <div className="overflow-hidden">
                            {isRecruiterMode ? (
                                <span className="hero-line block opacity-100 translate-y-0">
                                    Hello There 
                                </span>
                            ) : (
                                <SplitText
                                    className="hero-line block"
                                    delay={0.2}
                                >
                                    Hello There 
                                </SplitText>
                            )}
                        </div>
                        <div className="overflow-hidden">
                            {isRecruiterMode ? (
                                <span className="hero-line block text-neutral-500 opacity-100 translate-y-0">
                                    I'm Erlangga 
                                </span>
                            ) : (
                                <SplitText
                                    className="hero-line block text-neutral-400"
                                    delay={0.4}
                                >
                                    I'm Erlangga 
                                </SplitText>
                            )}
                        </div>
                    </h1>

                    <div className="overflow-hidden max-w-2xl">
                        {isRecruiterMode ? (
                            <p className="hero-line text-xl md:text-2xl font-mono text-neutral-400 opacity-100 translate-y-0">
                                Fullstack Developer & AI Engineer. <br />
                                Building intelligent, high-performance web experiences.
                            </p>
                        ) : (
                            <div className="hero-line text-xl md:text-2xl font-mono text-neutral-400">
                                <DecryptedText
                                    text="Fullstack Developer & AI Engineer."
                                    className="block mb-2 text-white"
                                    speed={30}
                                    maxIterations={20}
                                />
                                <DecryptedText
                                    text="Building intelligent, high-performance web experiences."
                                    speed={20}
                                    revealDirection="center"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Animated Decor (Squares & Lanyard) - Deferred for Performance */}
            {!isRecruiterMode && isDecorMounted && (
                <>
                    <div className="absolute inset-0 z-0 pointer-events-none animate-in fade-in duration-1000">
                        <Squares
                            direction="diagonal"
                            speed={0.5}
                            squareSize={40}
                            borderColor="#333"
                            hoverFillColor="#222"
                        />
                    </div>
                    
                    {/* Lanyard Overlay */}
                    <div className="absolute top-[45vh] md:top-0 left-0 md:left-64 lg:left-128 w-full h-[55vh] md:h-screen z-20 pointer-events-none opacity-100 animate-in fade-in duration-1000">
                        <div className="w-full h-full relative pointer-events-auto">
                            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}
