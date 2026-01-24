"use client";

import { useEffect, useState } from "react";

export function CRTScreen({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full h-full overflow-hidden">
            {/* Screen Content */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>

            {/* Scanlines */}
            <div
                className="absolute inset-0 z-20 pointer-events-none opacity-10"
                style={{
                    background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
                    backgroundSize: "100% 2px, 3px 100%"
                }}
            />

            {/* CRT Flicker Animation */}
            <div className="absolute inset-0 z-30 pointer-events-none bg-white opacity-[0.02] animate-flicker" />

            {/* Vignette & Curvature Illusion */}
            <div className="absolute inset-0 z-40 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" />

            <style jsx global>{`
                @keyframes flicker {
                    0% { opacity: 0.02; }
                    5% { opacity: 0.05; }
                    10% { opacity: 0.02; }
                    15% { opacity: 0.06; }
                    20% { opacity: 0.02; }
                    50% { opacity: 0.02; }
                    55% { opacity: 0.05; }
                    60% { opacity: 0.02; }
                    100% { opacity: 0.02; }
                }
                .animate-flicker {
                    animation: flicker 0.15s infinite;
                }
            `}</style>
        </div>
    );
}
