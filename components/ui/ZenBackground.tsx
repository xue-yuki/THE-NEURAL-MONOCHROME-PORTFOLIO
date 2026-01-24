"use client";

export function ZenBackground() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-black pointer-events-none">
            {/* Fog Clump 1 - Slow drifting white mist */}
            <div
                className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-white/[0.03] rounded-full blur-[100px] animate-drift"
            />

            {/* Fog Clump 2 - Opposing mist */}
            <div
                className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-white/[0.02] rounded-full blur-[120px] animate-drift-slow"
            />

            {/* Subtle Center Glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-white/[0.01] rounded-full blur-[150px] animate-pulse-slow"
            />

            {/* Cinematic Film Grain Overlay */}
            <div className="absolute inset-0 z-10 opacity-[0.07] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

            <style jsx>{`
                @keyframes drift {
                    0% { transform: translate(0px, 0px); }
                    50% { transform: translate(20px, -20px); }
                    100% { transform: translate(0px, 0px); }
                }
                .animate-drift {
                    animation: drift 20s ease-in-out infinite alternate;
                }
                .animate-drift-slow {
                    animation: drift 30s ease-in-out infinite alternate-reverse;
                }
                .animate-pulse-slow {
                    animation: pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </div>
    );
}
