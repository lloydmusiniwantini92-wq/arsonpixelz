import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { IntelligenceProvider, useIntelligence, IntelTarget } from '../context/IntelligenceContext';

const mockTarget: IntelTarget = {
    id: 'test-1',
    type: 'project',
    name: 'Test Project',
    description: 'A test project for testing',
    level: 'high',
};

describe('IntelligenceContext', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('initial target is null and timeOnPage starts at 0', () => {
        const { result } = renderHook(() => useIntelligence(), { wrapper: IntelligenceProvider });
        
        expect(result.current.currentTarget).toBeNull();
        expect(result.current.timeOnPage).toBe(0);
    });

    it('setHoverTarget sets the current target', () => {
        const { result } = renderHook(() => useIntelligence(), { wrapper: IntelligenceProvider });
        
        act(() => {
            result.current.setHoverTarget(mockTarget);
        });

        expect(result.current.currentTarget).toEqual(mockTarget);
    });

    it('setHoverTarget(null) clears the target', () => {
        const { result } = renderHook(() => useIntelligence(), { wrapper: IntelligenceProvider });
        
        act(() => {
            result.current.setHoverTarget(mockTarget);
        });
        
        expect(result.current.currentTarget).toEqual(mockTarget);

        act(() => {
            result.current.setHoverTarget(null);
        });

        expect(result.current.currentTarget).toBeNull();
    });

    it('timeOnPage increments over time', () => {
        const { result } = renderHook(() => useIntelligence(), { wrapper: IntelligenceProvider });
        
        expect(result.current.timeOnPage).toBe(0);

        act(() => {
            vi.advanceTimersByTime(3000); // 3 seconds
        });

        expect(result.current.timeOnPage).toBe(3);
        
        act(() => {
            vi.advanceTimersByTime(2500); // 2.5 more seconds
        });
        
        expect(result.current.timeOnPage).toBe(5);
    });

    it('throws error when used outside provider', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        
        expect(() => {
            renderHook(() => useIntelligence());
        }).toThrow('useIntelligence must be used within an IntelligenceProvider');
        
        consoleSpy.mockRestore();
    });
});
