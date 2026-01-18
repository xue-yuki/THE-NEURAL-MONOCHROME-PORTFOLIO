"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface RecruiterContextType {
    isRecruiterMode: boolean;
    toggleRecruiterMode: () => void;
}

const RecruiterContext = createContext<RecruiterContextType | undefined>(undefined);

export function RecruiterProvider({ children }: { children: React.ReactNode }) {
    const [isRecruiterMode, setIsRecruiterMode] = useState(false);

    // Persist preference (optional, implementing basic state for now)
    // useEffect(() => {
    //   const saved = localStorage.getItem("recruiter-mode");
    //   if (saved) setIsRecruiterMode(saved === "true");
    // }, []);

    const toggleRecruiterMode = () => {
        setIsRecruiterMode((prev) => {
            const newState = !prev;
            // localStorage.setItem("recruiter-mode", String(newState));
            return newState;
        });
    };

    return (
        <RecruiterContext.Provider value={{ isRecruiterMode, toggleRecruiterMode }}>
            {children}
        </RecruiterContext.Provider>
    );
}

export function useRecruiterMode() {
    const context = useContext(RecruiterContext);
    if (context === undefined) {
        throw new Error("useRecruiterMode must be used within a RecruiterProvider");
    }
    return context;
}
