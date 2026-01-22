"use client";

import { useRef, useEffect } from "react";

interface AIOrbProps {
    minHeight?: string;
    isActive?: boolean; // Is the AI currently processing/speaking?
    isListening?: boolean; // Is the user speaking?
}

export function AIOrb({ minHeight = "400px", isActive = false, isListening = false }: AIOrbProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let time = 0;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        window.addEventListener("resize", resize);
        resize();

        const draw = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const baseRadius = 80;

            // Pulse logic
            const pulseSpeed = isActive ? 0.1 : (isListening ? 0.05 : 0.02);
            const pulseAmt = isActive ? 20 : (isListening ? 10 : 5);
            time += pulseSpeed;

            const radius = baseRadius + Math.sin(time) * pulseAmt;

            // Draw Core
            const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 2);
            if (isActive) {
                // Formatting/Speaking: Cyan/Blue
                gradient.addColorStop(0, "rgba(0, 255, 255, 0.8)");
                gradient.addColorStop(0.5, "rgba(0, 150, 255, 0.3)");
                gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
            } else if (isListening) {
                // Listening: Red/Orange (Jarvis/Iron Man style) or Green
                gradient.addColorStop(0, "rgba(255, 50, 50, 0.8)");
                gradient.addColorStop(0.5, "rgba(200, 0, 0, 0.3)");
                gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
            } else {
                // Idle: Dim Blue
                gradient.addColorStop(0, "rgba(0, 100, 255, 0.4)");
                gradient.addColorStop(0.5, "rgba(0, 50, 150, 0.1)");
                gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
            }

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Draw Rings (Soundwave simulation)
            ctx.strokeStyle = isActive ? "#00ffff" : (isListening ? "#ff4444" : "#4444ff");
            ctx.lineWidth = 1;

            const rings = 3;
            for (let i = 0; i < rings; i++) {
                ctx.beginPath();
                const ringRadius = radius + (i * 20) + (Math.sin(time + i) * 10);
                ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
                ctx.globalAlpha = 0.3 - (i * 0.1);
                ctx.stroke();
            }
            ctx.globalAlpha = 1;

            animationRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", resize);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [isActive, isListening]);

    return (
        <canvas ref={canvasRef} className="w-full h-full block" style={{ minHeight }} />
    );
}
