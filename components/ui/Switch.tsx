"use client";

import * as React from "react";
import clsx from "clsx";

interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    className?: string;
}

export function Switch({ checked, onChange, label, className }: SwitchProps) {
    return (
        <div className={clsx("flex items-center gap-3", className)}>
            <button
                role="switch"
                aria-checked={checked}
                onClick={() => onChange(!checked)}
                className={clsx(
                    "relative h-6 w-11 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black",
                    checked ? "bg-white" : "bg-neutral-800"
                )}
            >
                <span
                    className={clsx(
                        "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-black shadow ring-0 transition duration-200 ease-in-out",
                        checked ? "translate-x-6 bg-black" : "translate-x-1 bg-neutral-400"
                    )}
                />
            </button>
            {label && (
                <span className="text-sm font-mono text-neutral-400 uppercase tracking-widest">
                    {label}
                </span>
            )}
        </div>
    );
}
