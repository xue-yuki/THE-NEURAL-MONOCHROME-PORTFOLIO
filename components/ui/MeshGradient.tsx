"use client";
export function MeshGradient() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {/* Base dark layer to prevent full transparency */}
            <div className="absolute inset-0 bg-black" />

            {/* Blob 1 — Deep purple, top-left, slow drift rightward */}
            <div
                className="absolute w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[120px] animate-mesh-blob-1"
                style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)", top: "-10%", left: "-5%" }}
            />

            {/* Blob 2 — Emerald green, center-right, slow drift downward */}
            <div
                className="absolute w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[100px] animate-mesh-blob-2"
                style={{ background: "radial-gradient(circle, #10b981, transparent 70%)", top: "30%", right: "-5%" }}
            />

            {/* Blob 3 — Deep blue, bottom-center, slow orbit */}
            <div
                className="absolute w-[700px] h-[700px] rounded-full opacity-[0.05] blur-[140px] animate-mesh-blob-3"
                style={{ background: "radial-gradient(circle, #2563eb, transparent 70%)", bottom: "-15%", left: "30%" }}
            />

            {/* Blob 4 — Warm accent, subtle and small, adds color variety */}
            <div
                className="absolute w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[100px] animate-mesh-blob-4"
                style={{ background: "radial-gradient(circle, #f59e0b, transparent 70%)", top: "60%", left: "10%" }}
            />

            {/* Subtle film grain noise overlay for texture */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')", backgroundRepeat: "repeat", backgroundSize: "128px 128px" }} />
        </div>
    );
}
