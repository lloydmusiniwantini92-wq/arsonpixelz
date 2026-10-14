import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

// Mock IntersectionObserver
class IntersectionObserver {
    observe = vi.fn();
    disconnect = vi.fn();
    unobserve = vi.fn();
}
Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserver,
});

// Mock ResizeObserver
class ResizeObserver {
    observe = vi.fn();
    disconnect = vi.fn();
    unobserve = vi.fn();
}
Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    configurable: true,
    value: ResizeObserver,
});

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: vi.fn((key: string) => store[key] || null),
        setItem: vi.fn((key: string, value: string) => {
            store[key] = value.toString();
        }),
        removeItem: vi.fn((key: string) => {
            delete store[key];
        }),
        clear: vi.fn(() => {
            store = {};
        }),
    };
})();
Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true });

// Mock framer-motion
vi.mock('framer-motion', async () => {
    const actual = await vi.importActual('framer-motion') as any;
    return {
        ...actual,
        motion: {
            div: require('react').forwardRef(({ children, ...props }: any, ref: any) => {
                const { initial, animate, exit, transition, whileHover, whileTap, variants, custom, ...rest } = props;
                return require('react').createElement('div', { ref, ...rest }, children);
            }),
            span: require('react').forwardRef(({ children, ...props }: any, ref: any) => {
                const { initial, animate, exit, transition, whileHover, whileTap, variants, custom, ...rest } = props;
                return require('react').createElement('span', { ref, ...rest }, children);
            }),
            p: require('react').forwardRef(({ children, ...props }: any, ref: any) => {
                const { initial, animate, exit, transition, whileHover, whileTap, variants, custom, ...rest } = props;
                return require('react').createElement('p', { ref, ...rest }, children);
            }),
            h1: require('react').forwardRef(({ children, ...props }: any, ref: any) => {
                const { initial, animate, exit, transition, whileHover, whileTap, variants, custom, ...rest } = props;
                return require('react').createElement('h1', { ref, ...rest }, children);
            }),
            h2: require('react').forwardRef(({ children, ...props }: any, ref: any) => {
                const { initial, animate, exit, transition, whileHover, whileTap, variants, custom, ...rest } = props;
                return require('react').createElement('h2', { ref, ...rest }, children);
            }),
            h3: require('react').forwardRef(({ children, ...props }: any, ref: any) => {
                const { initial, animate, exit, transition, whileHover, whileTap, variants, custom, ...rest } = props;
                return require('react').createElement('h3', { ref, ...rest }, children);
            }),
        },
        AnimatePresence: ({ children }: any) => children,
    };
});

// Mock GSAP
vi.mock('gsap', () => {
    return {
        default: {
            registerPlugin: vi.fn(),
            to: vi.fn(),
            from: vi.fn(),
            fromTo: vi.fn(),
            set: vi.fn(),
            timeline: vi.fn(() => ({
                to: vi.fn().mockReturnThis(),
                from: vi.fn().mockReturnThis(),
                fromTo: vi.fn().mockReturnThis(),
                set: vi.fn().mockReturnThis(),
                add: vi.fn().mockReturnThis(),
                play: vi.fn().mockReturnThis(),
                pause: vi.fn().mockReturnThis(),
                kill: vi.fn().mockReturnThis(),
            })),
            killTweensOf: vi.fn(),
            matchMedia: vi.fn(() => ({
                add: vi.fn(),
                revert: vi.fn(),
            })),
        }
    };
});

vi.mock('gsap/ScrollTrigger', () => {
    return {
        ScrollTrigger: {
            create: vi.fn(),
            refresh: vi.fn(),
            getAll: vi.fn(() => []),
            clearScrollMemory: vi.fn(),
            sort: vi.fn(),
            killAll: vi.fn(),
        }
    };
});
