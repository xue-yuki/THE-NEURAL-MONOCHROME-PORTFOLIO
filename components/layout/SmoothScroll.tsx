"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useRecruiterMode } from "../providers/RecruiterProvider";
import 'lenis/dist/lenis.css'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const { isRecruiterMode } = useRecruiterMode();
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        if (isRecruiterMode) {
            // Disable Smooth Scroll in Recruiter Mode for native feel/speed
            lenisRef.current?.destroy();
            lenisRef.current = null;
            document.documentElement.style.scrollBehavior = "auto";
            return;
        }

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, [isRecruiterMode]);

    return <>{children}</>;
}
