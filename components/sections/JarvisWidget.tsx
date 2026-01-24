"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import clsx from "clsx";
import { Send, ArrowUp, Loader2, SquareStack, X, Sparkles, MessageSquare } from "lucide-react";
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

// --- MAIN COMPONENT ---
interface Message {
    id: string;
    type: 'user' | 'bot';
    text: string;
    timestamp: string;
}

export function JarvisWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [output, setOutput] = useState<Message[]>([
        {
            id: 'init',
            type: 'bot',
            text: "Neural Interface Online.\nHow can I assist you, Operator?",
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

    // Auto-scroll inside widget
    useEffect(() => {
        if (bottomRef.current && isOpen) {
            bottomRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }, [output.length, isProcessing, isOpen]);

    return (
        <div className="fixed bottom-8 right-8 z-[100] font-sans flex flex-col-reverse items-end gap-4 pointer-events-none">

            {/* ACTIVATION BUTTON (Always Visible) */}
            <div className="pointer-events-auto relative group">
                {/* Pulse Ring */}
                <div className={clsx(
                    "absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20 duration-[2000ms]",
                    isProcessing && "animate-ping duration-[500ms] border-white/50"
                )} />

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={clsx(
                        "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl relative overflow-hidden",
                        isOpen ? "bg-white text-black rotate-90 scale-90" : "bg-black text-white border border-white/20 hover:scale-110 hover:border-white/50"
                    )}
                >
                    {isOpen ? <X size={20} /> : <Sparkles size={18} strokeWidth={1.5} />}

                    {/* Inner Glow when closed */}
                    {!isOpen && <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50" />}
                </button>
            </div>


            {/* CHAT WINDOW (Expandable) */}
            <div
                className={clsx(
                    "pointer-events-auto w-[350px] md:w-[400px] h-[500px] bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden transition-all duration-500 origin-bottom-left",
                    isOpen ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-90 -translate-x-10 pointer-events-none h-0"
                )}
            >
                {/* HEADER */}
                <div className="h-10 border-b border-white/10 flex items-center justify-between px-4 bg-white/[0.03]">
                    <div className="flex items-center gap-2">
                        <div className={clsx("w-1.5 h-1.5 rounded-full", isProcessing ? "bg-white animate-pulse" : "bg-neutral-600")} />
                        <span className="text-[10px] font-mono tracking-widest text-white/60">JARVIS // ASSISTANT</span>
                    </div>
                </div>

                {/* MESSAGES */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 relative">
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                        <RetroGrid />
                    </div>

                    {output.map((msg) => (
                        <div key={msg.id} className={clsx(
                            "flex flex-col max-w-[90%]",
                            msg.type === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                        )}>
                            <div className={clsx(
                                "px-4 py-2 text-xs leading-relaxed border transition-all duration-300",
                                msg.type === 'user'
                                    ? "bg-white text-black border-white rounded-t-lg rounded-bl-lg"
                                    : "bg-white/5 text-white/90 border-white/10 rounded-t-lg rounded-br-lg"
                            )}>
                                {msg.type === 'bot' ? (
                                    <NoirTypewriter text={msg.text.replace(/\[\[SCROLL:.*?\]\]/, "").trim()} />
                                ) : (
                                    msg.text
                                )}
                            </div>
                        </div>
                    ))}

                    {isProcessing && (
                        <div className="mr-auto px-4 py-2 rounded-lg bg-white/5 border border-white/5 flex gap-1 items-center">
                            <Loader2 className="w-3 h-3 animate-spin text-white/50" />
                        </div>
                    )}
                    <div ref={bottomRef} className="h-2" />
                </div>

                {/* INPUT */}
                <div className="p-3 border-t border-white/10 bg-black/50">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleCommand();
                        }}
                        className="flex items-center gap-2"
                    >
                        <input
                            autoFocus={isOpen}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder:text-white/20 text-xs"
                            placeholder="Type command..."
                        />
                        <button
                            type="submit"
                            disabled={!input || isProcessing}
                            className="text-white/40 hover:text-white disabled:opacity-20 transition-colors"
                        >
                            <ArrowUp size={14} />
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
}
