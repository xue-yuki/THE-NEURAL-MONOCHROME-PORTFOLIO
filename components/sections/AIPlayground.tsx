"use client";

import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

const INITIAL_OUTPUT = [
    "Initialize neural interface...",
    "Loading user profile...",
    "System ready.",
    "Type 'help' for available commands.",
];

export function AIPlayground() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState<string[]>(INITIAL_OUTPUT);
    const [isProcessing, setIsProcessing] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    const handleCommand = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isProcessing) return;

        const cmd = input.trim().toLowerCase();
        const newOutput = [...output, `> ${input}`];
        setOutput(newOutput);
        setInput("");
        setIsProcessing(true);

        // Simulate AI processing delay
        await new Promise(r => setTimeout(r, 600));

        let response = "";
        switch (cmd) {
            case "help":
                response = "Available commands: skills, contact, summary, clear, whoami";
                break;
            case "skills":
                response = "CORE: Next.js, React, Tailwind, TypeScript.\nAI: PyTorch, TensorFlow, OpenAI API.\nBACKEND: Node.js, PostgreSQL, Redis.";
                break;
            case "contact":
                response = "Email: dev@example.com\nGitHub: github.com/dev";
                break;
            case "summary":
                response = "Fullstack Developer with a focus on AI integrations and high-performance web applications.";
                break;
            case "clear":
                setOutput([]);
                setIsProcessing(false);
                return;
            case "whoami":
                response = "Level 1 Guest User. Access granted.";
                break;
            default:
                response = `Command '${cmd}' not found. Type 'help' for assistance.`;
        }

        // Typing effect for response
        setOutput(prev => [...prev, response]);
        setIsProcessing(false);
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [output]);

    return (
        <section className="min-h-[80vh] flex items-center justify-center py-20 relative">
            <div className="w-full max-w-4xl mx-auto px-6">
                <div className="font-mono text-sm text-neutral-500 mb-4">
                    AI_PLAYGROUND // INTERACTIVE_TERMINAL
                </div>

                <div className="w-full h-[500px] bg-black border border-neutral-800 rounded-lg p-6 font-mono text-sm flex flex-col shadow-2xl overflow-hidden relative">

                    {/* Scanlines Effect */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none" />

                    <div className="flex-1 overflow-y-auto space-y-2 relative z-20 scrollbar-hide">
                        {output.map((line, i) => (
                            <div key={i} className={clsx(
                                "whitespace-pre-wrap",
                                line.startsWith(">") ? "text-neutral-500" : "text-green-500"
                            )}>
                                {line}
                            </div>
                        ))}
                        {isProcessing && (
                            <div className="text-green-500 animate-pulse">Processing...</div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    <form onSubmit={handleCommand} className="mt-4 flex gap-2 relative z-20 border-t border-neutral-800 pt-4">
                        <span className="text-green-500">{">"}</span>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 bg-transparent focus:outline-none text-white placeholder-neutral-700"
                            placeholder="Enter command..."
                            autoFocus
                        />
                    </form>
                </div>
            </div>
        </section>
    );
}
