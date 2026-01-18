"use client";

import { useEffect, useRef, useState } from "react";
import { useRecruiterMode } from "@/components/providers/RecruiterProvider";
import { Volume2, VolumeX } from "lucide-react";

export function useAudio() {
    const audioContextRef = useRef<AudioContext | null>(null);

    const playClick = () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }

        const ctx = audioContextRef.current;
        if (ctx.state === "suspended") ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        // High frequency "tick"
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.05, ctx.currentTime); // Low volume
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

        osc.start();
        osc.stop(ctx.currentTime + 0.05);
    };

    return { playClick };
}

export function AudioBackground() {
    const { isRecruiterMode } = useRecruiterMode();
    const [muted, setMuted] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const toggleMute = () => {
        setMuted(!muted);
        if (audioRef.current) {
            audioRef.current.muted = !muted;
            if (!muted) audioRef.current.play().catch(() => { });
        }
    }

    // Effect to attach click sounds to buttons
    const { playClick } = useAudio();
    useEffect(() => {
        if (isRecruiterMode) return;

        const handleInteraction = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('button') || target.closest('a')) {
                playClick();
            }
        };

        window.addEventListener('mouseenter', handleInteraction, true);
        return () => window.removeEventListener('mouseenter', handleInteraction, true);
    }, [isRecruiterMode]);

    if (isRecruiterMode) return null;

    return (
        <button
            onClick={toggleMute}
            className="fixed bottom-6 left-6 z-50 text-neutral-500 hover:text-white transition-colors"
            title="Toggle Ambient Sound"
        >
            {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            {/* Placeholder for actual audio file - normally would source a file here */}
            <audio ref={audioRef} loop hidden>
                {/* <source src="/audio/drone.mp3" type="audio/mpeg" /> */}
            </audio>
        </button>
    );
}
