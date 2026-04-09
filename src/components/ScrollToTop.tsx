import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useIgnition } from './layout/IgnitionRuntime';

// A persistent map of pathname -> scroll position, lives for the whole session
const scrollMemory = new Map<string, number>();

export const ScrollToTop = () => {
    const { pathname, hash } = useLocation();
    const { lenis } = useIgnition();
    const isPopNavigation = useRef(false);

    useEffect(() => {
        const onPopState = () => {
            isPopNavigation.current = true;
        };
        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, []);

    useEffect(() => {
        if (isPopNavigation.current) {
            isPopNavigation.current = false;
            // Home page scroll position is managed by HorizontalScrollSection via sessionStorage.
            // Don't fight it with raw scroll restoration here.
            if (pathname === '/') return;

            const saved = scrollMemory.get(pathname) ?? 0;
            requestAnimationFrame(() => {
                window.scrollTo({ top: saved, behavior: 'instant' as ScrollBehavior });
            });
        } else {
            if (window.location.hash) {
                const id = window.location.hash.replace('#', '');
                setTimeout(() => {
                    const element = document.getElementById(id);
                    if (element && lenis) {
                        lenis.scrollTo(`#${id}`, { 
                            duration: 1.2, 
                            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
                        });
                    } else if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 500);
            } else {
                window.scrollTo(0, 0);
            }
        }
    }, [pathname, hash, lenis]);

    // Continuously save the current scroll position for the current route
    useEffect(() => {
        if (pathname === '/') return; // home page uses sessionStorage, not scrollMemory
        const saveScroll = () => {
            scrollMemory.set(pathname, window.scrollY);
        };
        window.addEventListener('scroll', saveScroll, { passive: true });
        return () => window.removeEventListener('scroll', saveScroll);
    }, [pathname]);

    return null;
};
