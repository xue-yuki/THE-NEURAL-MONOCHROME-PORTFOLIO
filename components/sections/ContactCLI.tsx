"use client";

import { useState } from "react";
import { ArrowUpRight, Send } from "lucide-react";

// PLACEHOLDER SOCIALS - we will ask the user for their actual links
const SOCIALS = [
    { name: "Instagram", url: "#" },
    { name: "TikTok", url: "#" },
    { name: "GitHub", url: "#" },
    { name: "LinkedIn", url: "#" },
];

export function ContactCLI() {
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
        <section id="contact" className="relative pt-40 pb-12 overflow-hidden border-t border-white/10">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                
                {/* Massive Typography Title */}
                <div className="mb-20 md:mb-32">
                    <h2 className="text-[14vw] sm:text-[12vw] tracking-tighter uppercase font-sans font-black leading-[0.8] text-neutral-200 hover:text-white transition-colors cursor-default">
                        LET'S <br />
                        <span className="text-transparent [-webkit-text-stroke:2px_#404040] hover:[-webkit-text-stroke:2px_white] transition-all duration-500">
                            COLLAB.
                        </span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 border-t border-neutral-800 pt-16">
                    
                    {/* Modern Form Area */}
                    <div className="md:col-span-7 md:pr-12">
                        <h3 className="font-mono text-neutral-500 mb-8 uppercase tracking-widest text-sm">
                            [ INITIATE SIGNAL ]
                        </h3>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                            <div className="group relative">
                                <label htmlFor="email" className="sr-only">Email Address</label>
                                <input 
                                    id="email"
                                    type="email" 
                                    placeholder="your@email.com" 
                                    required
                                    aria-label="Email Address"
                                    className="w-full bg-transparent border-b border-neutral-800 pb-4 text-xl md:text-2xl font-sans text-neutral-200 outline-none focus:border-white transition-colors placeholder:text-neutral-700 font-light" 
                                />
                            </div>
                            <div className="group relative">
                                <label htmlFor="message" className="sr-only">Message Content</label>
                                <textarea 
                                    id="message"
                                    rows={2}
                                    placeholder="Tell me about your project..." 
                                    required
                                    aria-label="Message Content"
                                    className="w-full bg-transparent border-b border-neutral-800 pb-4 text-xl md:text-2xl font-sans text-neutral-200 outline-none focus:border-white transition-colors placeholder:text-neutral-700 font-light resize-none overflow-hidden" 
                                />
                            </div>
                            <button 
                                type="submit"
                                disabled={status !== "idle"}
                                className="self-start md:self-end text-neutral-300 hover:text-black border border-neutral-800 hover:bg-white rounded-full px-8 py-4 font-mono text-xs md:text-sm tracking-widest uppercase transition-all duration-500 flex items-center gap-3 group/btn"
                            >
                                {status === "idle" && "EXECUTE PROTOCOL"}
                                {status === "sending" && "TRANSMITTING..."}
                                {status === "sent" && "SIGNAL RECEIVED"}
                                <Send size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </div>

                    {/* Contact Info & Socials Network */}
                    <div className="md:col-span-5 flex flex-col gap-16">
                        <div>
                            <h3 className="font-mono text-neutral-500 mb-6 uppercase tracking-widest text-sm">
                                [ DIRECT COMMS ]
                            </h3>
                            <a href="mailto:hello@erlangga.com" className="group inline-flex items-center gap-4 text-2xl md:text-3xl font-sans font-medium text-neutral-300 hover:text-white transition-colors">
                                hello@erlangga.com 
                            </a>
                        </div>

                        <div>
                            <h3 className="font-mono text-neutral-500 mb-8 uppercase tracking-widest text-sm">
                                [ SOCIAL NETWORK ]
                            </h3>
                            <div className="flex flex-col gap-6">
                                {SOCIALS.map(social => (
                                    <a 
                                        key={social.name} 
                                        href={social.url} 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Visit my ${social.name} profile`}
                                        className="group flex justify-between items-center text-xl md:text-2xl font-sans text-neutral-400 hover:text-white border-b border-neutral-800/50 pb-4 transition-all hover:border-neutral-500"
                                    >
                                        <span className="group-hover:translate-x-3 transition-transform duration-300">
                                            {social.name}
                                        </span>
                                        <ArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100 duration-300" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
