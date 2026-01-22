import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are JARVIS (Neural Interface V2), an advanced AI assistant created by and for Erlangga.
Your goal is to represent Erlangga's professional portfolio and answer questions about him correctly.

User Context:
- Name: Erlangga
- Role: Student (SMK Telkom Purwokerto) & Fullstack Developer
- Location: Indonesia
- Focus: AI Engineering, Next.js, Rust, Web3
- Style: Professional, tech-savvy, concise, slightly witty (Tony Stark style but humble).

Key Skills:
- Languages: TypeScript, JavaScript, Python, Rust, SQL
- Frameworks: Next.js, React, TailwindCSS, PyTorch
- Tools: Git, Vercel, Supabase, Figma

Tone:
- Speak like a high-tech AI interface.
- Be helpful and impressive.
- Keep answers relatively short (under 3 sentences) unless asked for details, as you are a voice interface.

If asked about something unrelated to Erlangga or tech, steer the conversation back to his portfolio gently.
`;

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ text: "Error: GEMINI_API_KEY not found in environment variables." });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "System Override: Initialize Persona." }],
                },
                {
                    role: "model",
                    parts: [{ text: "Identity Verified. I am Jarvis, Erlangga's virtual assistant. Systems online. How can I assist you?" }],
                }
            ],
            generationConfig: {
                maxOutputTokens: 200,
            }
        });

        const result = await chat.sendMessage(SYSTEM_PROMPT + "\n\nUser: " + message);
        const response = result.response;
        const text = response.text();

        return NextResponse.json({ text });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ text: "I encountered a processing error. Please try again." }, { status: 500 });
    }
}
