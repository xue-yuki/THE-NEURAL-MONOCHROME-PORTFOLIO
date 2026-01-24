import OpenAI from "openai";
import { NextResponse } from "next/server";

import { JARVIS_CONTEXT } from "@/lib/jarvis-context";

// Initialize OpenAI Client for OpenRouter (since user provided an OpenRouter key)
// Base URL: https://openrouter.ai/api/v1
const openai = new OpenAI({
    apiKey: process.env.QWEN_API_KEY || "",
    baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        if (!process.env.QWEN_API_KEY) {
            return NextResponse.json({ text: "Error: QWEN_API_KEY not found. Please add it to .env.local" });
        }

        const completion = await openai.chat.completions.create({
            model: "qwen/qwen-2.5-coder-32b-instruct", // model qwen    
            messages: [
                { role: "system", content: JARVIS_CONTEXT },
                { role: "user", content: message }
            ],
            max_tokens: 200,
            temperature: 0.7,
        });

        const text = completion.choices[0]?.message?.content || "System Malfunction: No response received.";

        return NextResponse.json({ text });
    } catch (error: any) {
        console.error("Qwen API Error:", error);
        return NextResponse.json({
            text: "Neural Link Unstable. Connection failed."
        }, { status: 500 });
    }
}
