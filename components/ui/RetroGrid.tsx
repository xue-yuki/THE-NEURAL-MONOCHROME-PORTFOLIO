export function RetroGrid() {
    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden [perspective:200px]">
            {/* Grid container */}
            <div className="absolute inset-0 [transform:rotateX(35deg)]">
                <div
                    className={
                        "animate-grid-flow absolute inset-0 -top-[100%] h-[300%] w-[300%] -left-[100%] " +
                        "bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_0)] " +
                        "bg-[size:60px_60px]"
                    }
                />
            </div>

            {/* Horizon Fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />

            {/* Top vignette to hide the horizon line sharpness */}
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black to-transparent" />

            <style jsx global>{`
        @keyframes grid-flow {
          0% { transform: translateY(0); }
          100% { transform: translateY(30px); }
        }
        .animate-grid-flow {
          animation: grid-flow 0.5s linear infinite;
        }
      `}</style>
        </div>
    );
}
