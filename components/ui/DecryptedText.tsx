import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface DecryptedTextProps {
    text: string;
    speed?: number;
    maxIterations?: number;
    className?: string;
    revealDirection?: "start" | "end" | "center";
    useOriginalCharsOnly?: boolean;
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

export function DecryptedText({
    text,
    speed = 50,
    maxIterations = 10,
    className = "",
    revealDirection = "start",
    useOriginalCharsOnly = false,
}: DecryptedTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isHovered, setIsHovered] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const scramble = () => {
        let iteration = 0;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText(prev =>
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }

            iteration += 1 / 3;
        }, speed);
    };

    useEffect(() => {
        scramble();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [text]);

    return (
        <span
            className={className}
            onMouseEnter={scramble}
        >
            {displayText}
        </span>
    );
}
