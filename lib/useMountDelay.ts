import { useState, useEffect } from 'react';

export function useMountDelay(delayMs: number = 3500) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Only run on client
        const timer = setTimeout(() => {
            setMounted(true);
        }, delayMs);
        return () => clearTimeout(timer);
    }, [delayMs]);

    return mounted;
}
