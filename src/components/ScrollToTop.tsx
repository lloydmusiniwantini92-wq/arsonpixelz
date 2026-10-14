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
                if (lenis) {
                    lenis.scrollTo(saved, { immediate: true });
                } else {
                    window.scrollTo({ top: saved, behavior: 'instant' as ScrollBehavior });
                }
            });
        } else {
            const targetHash = hash || window.location.hash;
            if (targetHash) {
                const id = targetHash.replace('#', '');
                let attempts = 0;
                const maxAttempts = 35; // 35 * 40ms = 1400ms window
                const interval = setInterval(() => {
                    attempts++;
                    const element = document.getElementById(id);
                    if (element) {
                        clearInterval(interval);
                        if (lenis) {
                            lenis.scrollTo(element, { 
                                offset: id === 'bottom' ? -90 : -50,
                                duration: 1.2, 
                                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
                            });
                        } else {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    } else if (id === 'bottom' && attempts >= 15) {
                        const fallbackEl = document.getElementById('details') || document.getElementById('bottom');
                        if (fallbackEl) {
                            clearInterval(interval);
                            if (lenis) {
                                lenis.scrollTo(fallbackEl, { offset: -90, duration: 1.2 });
                            } else {
                                fallbackEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        }
                    } else if (attempts >= maxAttempts) {
                        clearInterval(interval);
                    }
                }, 40);
                return () => clearInterval(interval);
            } else {
                if (lenis) {
                    lenis.scrollTo(0, { immediate: true });
                } else {
                    window.scrollTo(0, 0);
                }
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
