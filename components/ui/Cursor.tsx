"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useRecruiterMode } from "@/components/providers/RecruiterProvider";
import clsx from "clsx";

export function Cursor() {
    const { isRecruiterMode } = useRecruiterMode();
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isRecruiterMode) return;

        const cursor = cursorRef.current;
        if (!cursor) return;

        const onMouseMove = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out",
            });
        };

        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, [isRecruiterMode]);

    if (isRecruiterMode) return null;

    return (
        <div
            ref={cursorRef}
            className={clsx(
                "fixed top-0 left-0 w-8 h-8 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 custom-cursor",
                "mix-blend-difference"
            )}
        />
    );
}
