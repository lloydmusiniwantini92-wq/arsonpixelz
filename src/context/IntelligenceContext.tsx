import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type IntelLevel = 'low' | 'medium' | 'high' | 'critical';

export interface IntelTarget {
    id: string;
    type: 'project' | 'service' | 'product' | 'general';
    name: string;
    description: string;
    level: IntelLevel;
    price?: number;
}

interface IntelligenceContextType {
    currentTarget: IntelTarget | null;
    setHoverTarget: (target: IntelTarget | null) => void;
    timeOnPage: number;
}

const IntelligenceContext = createContext<IntelligenceContextType | undefined>(undefined);

export const IntelligenceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentTarget, setCurrentTarget] = useState<IntelTarget | null>(null);
    const [timeOnPage, setTimeOnPage] = useState(0);

    // Track time spent on the site
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeOnPage(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const setHoverTarget = (target: IntelTarget | null) => {
        setCurrentTarget(target);
    };

    return (
        <IntelligenceContext.Provider value={{ currentTarget, setHoverTarget, timeOnPage }}>
            {children}
        </IntelligenceContext.Provider>
    );
};

export const useIntelligence = () => {
    const context = useContext(IntelligenceContext);
    if (context === undefined) {
        throw new Error('useIntelligence must be used within an IntelligenceProvider');
    }
    return context;
};
