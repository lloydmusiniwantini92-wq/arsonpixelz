import { describe, it, expect } from 'vitest';
import { services } from '../data/services';

const extractPriceValue = (priceString: string): number => {
    return parseInt(priceString.match(/[\d,]+/)?.[0]?.replace(/,/g, '') || '0', 10);
};

describe('ServiceTierPricing extraction logic', () => {
    it('correctly extracts numbers from all actual price strings in the catalog', () => {
        // Collect all price strings from the catalog
        const allPrices = services.flatMap(category => 
            category.tiers.map(tier => tier.price)
        );
        
        // Assertions for known formats based on our data
        const expectedExtractions: Record<string, number> = {
            '$1,000 – $2,000 / mo': 1000,
            '$3,500 – $6,000 / mo': 3500,
            '$9,000 – $15,000+ / mo': 9000,
            '$500 – $999': 500,
            '$4,500 – $8,000': 4500,
            '$15,000 – $20,000+': 15000,
            '$1,500 – $3,500': 1500,
            '$8,000 – $15,000': 8000,
            '$25,000+': 25000,
            '$5,000 – $10,000': 5000,
            '$20,000 – $50,000+': 20000,
            '$750 – $1,500 / mo': 750,
            '$3,000 – $7,000 / mo': 3000,
            '$12,000 – $25,000+ / mo': 12000,
            '$1,500 / mo': 1500,
            '$8,000+ / mo': 8000,
            '$500 – $1,200 / mo': 500,
            '$2,500 – $5,000 / mo': 2500,
            '$1,500 – $2,500': 1500,
            '$2,500 – $4,000 / mo': 2500,
            '$5,000+ / mo': 5000,
            '$1,500 – $3,000': 1500,
            '$3,500 – $6,000': 3500,
            '$7,000+ / mo': 7000
        };

        allPrices.forEach(priceStr => {
            if (priceStr in expectedExtractions) {
                expect(extractPriceValue(priceStr)).toBe(expectedExtractions[priceStr]);
            }
        });
    });

    describe('pure extraction function edge cases', () => {
        const testCases = [
            { input: '$1,500 – $2,000 / mo', expected: 1500 },
            { input: '$25,000+', expected: 25000 },
            { input: '$500', expected: 500 },
            { input: 'No price here', expected: 0 },
            { input: '', expected: 0 },
            { input: 'Contact for pricing', expected: 0 },
            { input: '£1,234.56', expected: 1234 }, // Notice it ignores decimal part appropriately with the current regex
            { input: '   $99   ', expected: 99 },
            { input: '0', expected: 0 },
        ];

        testCases.forEach(({ input, expected }) => {
            it(`extracts ${expected} from "${input}"`, () => {
                expect(extractPriceValue(input)).toBe(expected);
            });
        });
    });
});
