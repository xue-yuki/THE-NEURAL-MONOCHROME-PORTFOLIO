"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useRecruiterMode } from "../providers/RecruiterProvider";
import 'lenis/dist/lenis.css'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const { isRecruiterMode } = useRecruiterMode();
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // FORCE scroll to top IMMEDIATELY before Lenis init
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }

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
            prevent: (node) => node.classList.contains('no-smooth'),
            autoResize: true,
        });

        // Force Lenis to start at 0
        lenis.scrollTo(0, { immediate: true, force: true, lock: true });

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
