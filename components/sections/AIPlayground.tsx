"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import clsx from "clsx";
import { Send, ArrowUp, Loader2, SquareStack } from "lucide-react";
import { ZenBackground } from "@/components/ui/ZenBackground";
import { RetroGrid } from "@/components/ui/RetroGrid";

// --- AUDIO HOOK (Monochrome Synth) ---
function useTypingSound() {
    const audioContextRef = useRef<AudioContext | null>(null);

    const playClick = useCallback(() => {
        if (typeof window === "undefined") return;

        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }

        const ctx = audioContextRef.current;
        if (ctx.state === "suspended") ctx.resume();

        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        // Crisp, dry click
        oscillator.type = "triangle";
        oscillator.frequency.setValueAtTime(2000, ctx.currentTime);

        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.005);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);

        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.04);
    }, []);

    return { playClick };
}

// --- NOIR TYPEWRITER ---
function NoirTypewriter({ text, onComplete }: { text: string; onComplete?: () => void }) {
    const [displayedText, setDisplayedText] = useState("");
    const { playClick } = useTypingSound();
    const indexRef = useRef(0);

    useEffect(() => {
        indexRef.current = 0;
        setDisplayedText("");

        const interval = setInterval(() => {
            if (indexRef.current < text.length) {
                setDisplayedText((prev) => prev + text.charAt(indexRef.current));
                if (Math.random() > 0.4) playClick();
                indexRef.current++;
            } else {
                clearInterval(interval);
                onComplete?.();
            }
        }, 20);

        return () => clearInterval(interval);
    }, [text, playClick, onComplete]);

    return (
        <span className="whitespace-pre-wrap">{displayedText}</span>
    );
}

// --- BOOT SEQUENCE (Monochrome) ---
function BootLoader({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                const next = prev + Math.random() * 10;
                if (next >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return next;
            });
        }, 150);
        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center pointer-events-none">
            <div className="w-64 h-1 bg-neutral-900 rounded-full overflow-hidden">
                <div
                    className="h-full bg-white transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="mt-4 font-mono text-[10px] text-neutral-500 tracking-widest uppercase">
                Neural_Link // {Math.floor(progress)}%
            </div>
        </div>
    );
}

// --- MAIN COMPONENT ---
interface Message {
    id: string;
    type: 'user' | 'bot';
    text: string;
    timestamp: string;
}

export function AIPlayground() {
    const [isBooted, setIsBooted] = useState(false);
    const [input, setInput] = useState("");
    const [output, setOutput] = useState<Message[]>([
        {
            id: 'init',
            type: 'bot',
            text: "Neural Interface Online.\nAwaiting Input.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [isProcessing, setIsProcessing] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    // COMMAND PARSER
    useEffect(() => {
        const lastMsg = output[output.length - 1];
        if (lastMsg && lastMsg.type === 'bot') {
            const commandRegex = /\[\[SCROLL:(.*?)\]\]/;
            const match = lastMsg.text.match(commandRegex);

            if (match) {
                const targetId = match[1];
                setTimeout(() => {
                    const element = document.getElementById(targetId);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 300);
            }
        }
    }, [output]);

    const handleCommand = async () => {
        const cmd = input.trim();
        if (!cmd || isProcessing) return;

        const newUserMsg: Message = {
            id: Date.now().toString(),
            type: 'user',
            text: cmd,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setOutput(prev => [...prev, newUserMsg]);
        setInput("");
        setIsProcessing(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: cmd })
            });

            const data = await res.json();
            const botText = data.text || "Connection terminated.";

            const newBotMsg: Message = {
                id: (Date.now() + 1).toString(),
                type: 'bot',
                text: botText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            setOutput(prev => [...prev, newBotMsg]);
        } catch (error) {
            setOutput(prev => [...prev, {
                id: Date.now().toString(),
                type: 'bot',
                text: "Signal lost.",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        } finally {
            setIsProcessing(false);
        }
    };

    // Auto-scroll
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }, [output.length, isProcessing]);

    return (
        <section className="min-h-screen py-20 relative bg-[#050505] flex items-center justify-center overflow-hidden font-sans">

            {/* NOIR BACKGROUND */}
            <ZenBackground />

            {/* GRID OVERLAY (Subtle) */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <RetroGrid />
            </div>

            {/* MAIN HUD */}
            <div className="relative z-10 w-full max-w-3xl mx-auto h-[65vh] flex flex-col p-4">

                {/* FLOATING BLACK GLASS PANEL */}
                <div className="relative flex-1 flex flex-col border border-white/10 rounded-sm bg-black/80 backdrop-blur-xl shadow-2xl overflow-hidden ring-1 ring-white/5 transition-all">

                    {/* BOOTLOADER */}
                    {!isBooted && <BootLoader onComplete={() => setIsBooted(true)} />}

                    {/* HEADER */}
                    <div className="h-12 border-b border-white/10 flex items-center justify-between px-6 bg-white/[0.02]">
                        <div className="flex items-center gap-3">
                            <SquareStack size={14} className="text-white/60" />
                            <span className="text-white/90 font-mono text-[10px] tracking-[0.2em] uppercase">
                                JARVIS // V2.0 // NOIR
                            </span>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-mono text-white/40">
                            <div className={clsx("w-1.5 h-1.5 rounded-full", isProcessing ? "bg-white animate-pulse" : "bg-neutral-800")} />
                            {isProcessing ? "PROCESSING_DATA" : "STANDBY"}
                        </div>
                    </div>

                    {/* OUTPUT AREA */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                        {output.map((msg) => (
                            <div key={msg.id} className={clsx(
                                "flex flex-col max-w-[90%] anim-fade-in",
                                msg.type === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                            )}>
                                {/* MSG CARD */}
                                <div className={clsx(
                                    "px-5 py-3 text-sm leading-relaxed border transition-all duration-300",
                                    msg.type === 'user'
                                        ? "bg-white text-black border-white rounded-t-lg rounded-bl-lg"
                                        : "bg-black text-white/90 border-white/20 rounded-t-lg rounded-br-lg hover:border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.02)]"
                                )}>
                                    {msg.type === 'bot' ? (
                                        <NoirTypewriter text={msg.text.replace(/\[\[SCROLL:.*?\]\]/, "").trim()} />
                                    ) : (
                                        msg.text
                                    )}
                                </div>
                                <span className="text-[9px] text-white/10 mt-2 font-mono uppercase tracking-wider">
                                    {msg.timestamp}
                                </span>
                            </div>
                        ))}

                        {isProcessing && (
                            <div className="flex items-center gap-2 text-white/30 text-xs font-mono animate-pulse ml-2">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                <span>COMPUTING...</span>
                            </div>
                        )}
                        <div ref={bottomRef} className="h-2" />
                    </div>

                    {/* INPUT AREA */}
                    <div className="p-4 bg-black/50 border-t border-white/5">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleCommand();
                            }}
                            className="flex items-center gap-4 bg-white/[0.03] border border-white/10 rounded-sm px-4 py-3 focus-within:border-white/30 focus-within:bg-white/[0.05] transition-all"
                        >
                            <span className="text-white/30 font-mono">{'>'}</span>
                            <input
                                autoFocus
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder:text-white/20 text-sm caret-white"
                                placeholder="ENTER_COMMAND..."
                            />
                            <button
                                type="submit"
                                disabled={!input || isProcessing}
                                className="text-white/40 hover:text-white disabled:opacity-20 transition-colors"
                            >
                                <ArrowUp size={16} />
                            </button>
                        </form>
                    </div>

                </div>

                {/* FOOTER */}
                <div className="flex justify-between items-center px-4 py-2 mt-2 font-mono text-[9px] text-white/10 uppercase tracking-widest">
                    <span>Secure Connection</span>
                    <span>System v2.4.0</span>
                </div>
            </div>
        </section>
    );
}
