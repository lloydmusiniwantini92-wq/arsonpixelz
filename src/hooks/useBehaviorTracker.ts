import { useEffect, useRef } from 'react';

export type TelemetryEvent = {
    type: 'hover' | 'click' | 'pageview';
    target: string;
    duration?: number;
    timestamp: number;
};

export const useBehaviorTracker = (onTelemetry: (event: TelemetryEvent) => void) => {
    const hoverTimeouts = useRef<Record<string, number>>({});
    const lastHoverTarget = useRef<string | null>(null);

    useEffect(() => {
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const trackElement = target.closest('[data-track]') as HTMLElement;
            
            if (trackElement) {
                const trackId = trackElement.getAttribute('data-track');
                if (trackId && trackId !== lastHoverTarget.current) {
                    lastHoverTarget.current = trackId;
                    hoverTimeouts.current[trackId] = Date.now();
                }
            } else {
                // If we moved off a tracked element
                if (lastHoverTarget.current) {
                    const duration = Date.now() - (hoverTimeouts.current[lastHoverTarget.current] || Date.now());
                    if (duration > 1000) { // Only report significant hovers > 1s
                        onTelemetry({
                            type: 'hover',
                            target: lastHoverTarget.current,
                            duration,
                            timestamp: Date.now()
                        });
                    }
                    delete hoverTimeouts.current[lastHoverTarget.current];
                    lastHoverTarget.current = null;
                }
            }
        };

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const trackElement = target.closest('[data-track]') as HTMLElement;
            if (trackElement) {
                const trackId = trackElement.getAttribute('data-track');
                if (trackId) {
                    onTelemetry({
                        type: 'click',
                        target: trackId,
                        timestamp: Date.now()
                    });
                }
            }
        };

        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('click', handleClick);
        };
    }, [onTelemetry]);
};
