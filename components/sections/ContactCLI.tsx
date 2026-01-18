"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function ContactCLI() {
    const [command, setCommand] = useState("send --message \"\"");
    const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        // Simulate network request
        setTimeout(() => {
            setStatus("sent");
            setTimeout(() => setStatus("idle"), 3000);
        }, 1500);
    };

    return (
        <section id="contact" className="py-32 border-t border-neutral-900">
            <div className="container mx-auto px-6 max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-8">INITIALIZE_COLLAB</h2>
                <p className="text-neutral-400 font-mono mb-12">
                    Looking to build something high-performance? Send a signal.
                </p>

                <div className="bg-black border border-neutral-800 rounded-lg p-6 font-mono text-sm md:text-base relative group focus-within:border-white transition-colors">
                    <div className="absolute top-0 left-0 px-3 py-1 bg-neutral-900 border-r border-b border-neutral-800 text-xs text-neutral-400">
                        zsh
                    </div>

                    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                        <div className="flex gap-2 text-neutral-500">
                            <span>$</span>
                            <span className="text-white">contact-cli</span>
                            <span>--email</span>
                        </div>

                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="bg-transparent border-b border-neutral-800 focus:border-white outline-none py-2 w-full text-white placeholder-neutral-700"
                            required
                        />

                        <div className="flex gap-2 text-neutral-500 mt-4">
                            <span>$</span>
                            <span className="text-white">contact-cli</span>
                            <span>--message</span>
                        </div>

                        <div className="relative">
                            <textarea
                                rows={3}
                                className="w-full bg-neutral-950/50 p-4 border border-neutral-800 focus:border-white outline-none text-white resize-none"
                                placeholder="Enter your message protocol..."
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status !== "idle"}
                            className="mt-4 bg-white text-black font-bold py-3 px-6 hover:bg-neutral-200 transition-colors flex items-center justify-between group/btn"
                        >
                            <span>
                                {status === "idle" && "EXECUTE_SEND()"}
                                {status === "sending" && "UPLOADING_PACKETS..."}
                                {status === "sent" && "SIGNAL_RECEIVED"}
                            </span>
                            <Send className="group-hover/btn:translate-x-1 transition-transform" size={16} />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
