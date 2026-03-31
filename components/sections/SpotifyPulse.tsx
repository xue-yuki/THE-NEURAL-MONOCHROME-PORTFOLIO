"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

/* Track data shape from /api/spotify/now-playing */
interface SpotifyTrack {
    title: string;
    artist: string;
    album: string;
    albumArt: string;
    isPlaying: boolean;
    currentTime: number; // ms
    totalTime: number;   // ms
    songUrl: string;
}

/* Fallback mock data when no Spotify connection */
const fallbackTrack: SpotifyTrack = {
    title: "Not Connected",
    artist: "Connect Spotify to see what's playing",
    album: "",
    albumArt: "",
    isPlaying: false,
    currentTime: 0,
    totalTime: 0,
    songUrl: "",
};

/* Helper: format milliseconds to mm:ss */
function formatTime(ms: number): string {
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
}

export function SpotifyPulse() {
    const [track, setTrack] = useState<SpotifyTrack | null>(null);
    const [progress, setProgress] = useState(0);

    /* Fetch current track from our API route */
    const fetchNowPlaying = useCallback(async () => {
        try {
            const res = await fetch("/api/spotify/now-playing");
            const data = await res.json();
            if (data.title) {
                setTrack(data);
                setProgress(data.currentTime);
            } else {
                setTrack(null);
            }
        } catch {
            setTrack(null);
        }
    }, []);

    /* Poll every 30 seconds for track updates */
    useEffect(() => {
        fetchNowPlaying();
        const interval = setInterval(fetchNowPlaying, 30000);
        return () => clearInterval(interval);
    }, [fetchNowPlaying]);

    /* Simulate progress ticking forward when playing */
    useEffect(() => {
        if (!track?.isPlaying) return;
        const interval = setInterval(() => {
            setProgress((p) => {
                if (p >= (track?.totalTime || 0)) return p;
                return p + 1000;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [track?.isPlaying, track?.totalTime]);

    /* Use real track or fallback */
    const display = track || fallbackTrack;
    const progressPercent = display.totalTime > 0 ? (progress / display.totalTime) * 100 : 0;

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-5xl">

                {/* Section header */}
                <div className="mb-10">
                    <h3 className="font-sans text-3xl md:text-5xl font-bold tracking-tighter mb-2 text-gradient">
                        Now Playing
                    </h3>
                    <p className="font-mono text-sm text-neutral-500">
                        Live from Spotify
                    </p>
                </div>

                {/* Main widget — glass card with ambient glow */}
                <a
                    href={display.songUrl || "#"}
                    target={display.songUrl ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={`Listen to ${display.title} by ${display.artist} on Spotify`}
                    className="group relative max-w-2xl mx-auto cursor-pointer transition-transform duration-300 hover:scale-[1.02] block"
                >
                    {/* Ambient glow backdrop — Spotify green radial */}
                    <div
                        className="absolute -inset-8 rounded-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 blur-3xl pointer-events-none"
                        style={{ background: "radial-gradient(circle, #1DB954 0%, transparent 70%)" }}
                    />

                    {/* Glass card container */}
                    <div className="relative glass glow-border rounded-2xl p-6 md:p-8 overflow-hidden">

                        {/* NOW PLAYING label with blinking dot */}
                        <div className="flex items-center gap-2 mb-6">
                            <span className="relative flex h-2 w-2">
                                {display.isPlaying && (
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1DB954] opacity-75" />
                                )}
                                <span className={`relative inline-flex rounded-full h-2 w-2 ${display.isPlaying ? "bg-[#1DB954]" : "bg-neutral-600"}`} />
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1DB954]">
                                {display.isPlaying ? "Now Playing" : "Recently Played"}
                            </span>
                        </div>

                        {/* Content row: album art left, info right */}
                        <div className="flex gap-6 md:gap-8 items-center">

                            {/* Album art container with color-bleeding backdrop */}
                            <div className="relative shrink-0">
                                {display.albumArt ? (
                                    <>
                                        {/* Blurred duplicate — color bleed effect */}
                                        <div className="absolute inset-0 scale-125 blur-2xl opacity-40 pointer-events-none rounded-xl overflow-hidden">
                                            <Image src={display.albumArt} fill sizes="(max-width: 768px) 48px, 64px" alt="Album art" className="object-cover" />
                                        </div>
                                        {/* Main album art — vinyl tilt, snaps to 0 on hover */}
                                        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shadow-2xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                            <Image src={display.albumArt} fill sizes="(max-width: 768px) 48px, 64px" alt={display.album} className="object-cover" />
                                        </div>
                                    </>
                                ) : (
                                    /* Placeholder when no album art */
                                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl bg-neutral-800 flex items-center justify-center transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                        <span className="text-3xl">🎵</span>
                                    </div>
                                )}
                            </div>

                            {/* Track info + equalizer */}
                            <div className="flex-1 min-w-0">
                                <h4 className="text-xl md:text-3xl font-bold text-white truncate tracking-tight mb-1">
                                    {display.title}
                                </h4>
                                <p className="text-sm md:text-base text-neutral-400 truncate mb-0.5">
                                    {display.artist}
                                </p>
                                {display.album && (
                                    <p className="text-xs text-neutral-600 truncate mb-4">
                                        {display.album}
                                    </p>
                                )}

                                {/* Animated equalizer bars — only animate when playing */}
                                <div className="flex items-end gap-[3px] h-5">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="w-[3px] rounded-full bg-[#1DB954] origin-bottom"
                                            style={{
                                                animation: display.isPlaying
                                                    ? `eq-bar 0.${4 + i}s ease-in-out infinite alternate`
                                                    : "none",
                                                animationDelay: `${i * 0.1}s`,
                                                height: "100%",
                                                transform: display.isPlaying ? undefined : "scaleY(0.2)",
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Progress bar — only show when we have duration */}
                        {display.totalTime > 0 && (
                            <div className="mt-6">
                                <div className="relative w-full h-[3px] bg-white/10 rounded-full overflow-visible">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-[#1DB954] rounded-full transition-all duration-1000 ease-linear"
                                        style={{ width: `${Math.min(progressPercent, 100)}%` }}
                                    >
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#1DB954] rounded-full shadow-[0_0_8px_2px_rgba(29,185,84,0.6)]" />
                                    </div>
                                </div>
                                <div className="flex justify-between mt-2 font-mono text-[10px] text-neutral-600">
                                    <span>{formatTime(progress)}</span>
                                    <span>{formatTime(display.totalTime)}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </a>
            </div>
        </section>
    );
}
