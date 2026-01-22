
"use client";

import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { Mic, MicOff, Send, Volume2, VolumeX } from "lucide-react";
import { AIOrb } from "@/components/ui/AIOrb";

export function AIPlayground() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState<{ type: 'user' | 'bot', text: string }[]>([
        { type: 'bot', text: "Systems verified. Neural Interface V2 ready. Click the microphone or type to communicate." }
    ]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(true);

    const bottomRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);

    // Initialize Speech Recognition
    useEffect(() => {
        if (typeof window !== "undefined") {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (SpeechRecognition) {
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.continuous = false;
                recognitionRef.current.interimResults = false;
                recognitionRef.current.lang = "en-US"; // Jarvis speaks English

                recognitionRef.current.onresult = (event: any) => {
                    const transcript = event.results[0][0].transcript;
                    setInput(transcript);
                    handleCommand(transcript); // Auto-submit on voice end
                };

                recognitionRef.current.onend = () => {
                    setIsListening(false);
                };
            }
        }
    }, []);

    const speak = (text: string) => {
        if (!voiceEnabled || typeof window === "undefined") return;

        // Cancel any current speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        // Try to find a "technological" voice
        const voices = window.speechSynthesis.getVoices();
        const techVoice = voices.find(v => v.name.includes("Google US English")) || voices.find(v => v.name.includes("Zira")) || voices[0];
        if (techVoice) utterance.voice = techVoice;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    };

    const toggleListening = () => {
        if (!recognitionRef.current) {
            alert("Speech recognition not supported in this browser.");
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const handleCommand = async (textOverride?: string) => {
        const cmd = (textOverride || input).trim();
        if (!cmd || isProcessing) return;

        // Add user message
        setOutput(prev => [...prev, { type: 'user', text: cmd }]);
        setInput("");
        setIsProcessing(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: cmd })
            });

            const data = await res.json();
            const botResponse = data.text || "I'm having trouble accessing my neural network.";

            setOutput(prev => [...prev, { type: 'bot', text: botResponse }]);
            speak(botResponse);

        } catch (error) {
            setOutput(prev => [...prev, { type: 'bot', text: "Connection error. Please check your network." }]);
        } finally {
            setIsProcessing(false);
        }
    };

    // Auto-scroll output
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [output]);

    return (
        <section className="min-h-screen flex items-center justify-center py-20 relative bg-black/50">
            <div className="w-full max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 h-[600px]">

                {/* Visualizer Column */}
                <div className="relative border border-neutral-800 rounded-2xl bg-black/80 overflow-hidden flex flex-col items-center justify-center shadow-[0_0_50px_rgba(0,255,255,0.05)]">
                    <div className="absolute top-4 left-4 font-mono text-xs text-neutral-500 flex items-center gap-2">
                        <span className={clsx("w-2 h-2 rounded-full", isProcessing ? "bg-cyan-500 animate-pulse" : "bg-neutral-800")} />
                        JARVIS_V2 // CORE
                    </div>

                    <AIOrb isActive={isSpeaking || isProcessing} isListening={isListening} />

                    <div className="absolute bottom-8 flex gap-4">
                        <button
                            onClick={toggleListening}
                            className={clsx(
                                "p-4 rounded-full transition-all duration-300 border",
                                isListening
                                    ? "bg-red-500/20 border-red-500 text-red-500 shadow-[0_0_20px_rgba(255,0,0,0.3)] scale-110"
                                    : "bg-neutral-900 border-neutral-700 text-neutral-400 hover:text-white hover:border-white"
                            )}
                        >
                            {isListening ? <MicOff size={24} /> : <Mic size={24} />}
                        </button>
                        <button
                            onClick={() => {
                                setVoiceEnabled(!voiceEnabled);
                                window.speechSynthesis.cancel();
                            }}
                            className={clsx(
                                "p-4 rounded-full transition-all duration-300 border bg-neutral-900 border-neutral-700",
                                voiceEnabled ? "text-cyan-500 border-cyan-500/50" : "text-neutral-600"
                            )}
                        >
                            {voiceEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
                        </button>
                    </div>
                </div>

                {/* Chat Log Column */}
                <div className="flex flex-col border border-neutral-800 rounded-2xl bg-neutral-950/50 backdrop-blur-sm overflow-hidden">
                    <div className="p-4 border-b border-neutral-800 font-mono text-xs text-neutral-500">
                        COMM_LOG
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-neutral-800">
                        {output.map((msg, i) => (
                            <div key={i} className={clsx(
                                "flex flex-col max-w-[85%]",
                                msg.type === 'user' ? "ml-auto items-end" : "items-start"
                            )}>
                                <div className={clsx(
                                    "px-4 py-2 rounded-lg text-sm font-mono",
                                    msg.type === 'user'
                                        ? "bg-neutral-800 text-neutral-200 rounded-tr-none"
                                        : "bg-cyan-950/30 text-cyan-400 border border-cyan-900/50 rounded-tl-none"
                                )}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isProcessing && (
                            <div className="text-cyan-500 text-xs font-mono animate-pulse pl-2">
                                Analyzing...
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    <div className="p-4 border-t border-neutral-800">
                        <form
                            onSubmit={(e) => { e.preventDefault(); handleCommand(); }}
                            className="flex gap-2"
                        >
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask Jarvis..."
                                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors placeholder:text-neutral-600 font-mono"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isProcessing}
                                className="p-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors disabled:opacity-50"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </section>
    );
}
