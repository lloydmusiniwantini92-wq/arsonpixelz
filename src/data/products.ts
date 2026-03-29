export interface Product {
    id: string;
    title: string;
    description: string;
    price: string;
    priceValue: number;
    category: 'template' | 'font' | 'agent' | 'workflow';
    image: string;
    tags: string[];
    featured?: boolean;
    stripePriceId?: string;
}

export const products: Product[] = [
    {
        id: 'tmpl-001',
        title: 'NEXUS // PORTFOLIO',
        description: 'A high-impact, grid-breaking portfolio template for creative directors. Features WebGL distortion effects and kinetic typography.',
        price: '$149',
        priceValue: 149,
        category: 'template',
        image: '/images/shop/nexus.png',
        tags: ['React', 'Framer Motion', 'WebGL'],
        featured: true,
        stripePriceId: 'price_1TB9od2NRAQRhNmZwg3Uq5O4',
    },
    {
        id: 'font-001',
        title: 'THANOIC // ULTRA',
        description: 'A brutalist display typeface engineered for maximum illegibility and aesthetic dominance. 4 weights + variable axis.',
        price: '$89',
        priceValue: 89,
        category: 'font',
        image: '/images/shop/thanoic.png',
        tags: ['Display', 'Variable', 'Cyrillic'],
        stripePriceId: 'price_1TB9of2NRAQRhNmZc2OZIirU',
    },
    {
        id: 'agent-001',
        title: 'VANTABLACKS // OPS',
        description: 'Autonomous AI agent swarm for scraping market intelligence and generating semantic SEO clusters in real-time.',
        price: '$499/mo',
        priceValue: 499,
        category: 'agent',
        image: '/images/shop/vanta.png',
        tags: ['Python', 'LLM', 'Automation'],
        featured: true,
        stripePriceId: 'price_1TB9og2NRAQRhNmZPthpOe2z',
    },
    {
        id: 'tmpl-002',
        title: 'VOID // E-COMMERCE',
        description: 'Dark-mode first e-commerce experiential layer. Shopify headless integration ready. Zero-load transitions.',
        price: '$299',
        priceValue: 299,
        category: 'template',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
        tags: ['Shopify', 'Next.js 14', 'Stripe'],
        stripePriceId: 'price_1TB9oi2NRAQRhNmZxPHtkPpK',
    },
    {
        id: 'wkfl-001',
        title: 'GHOST // WRITER',
        description: 'Complete content operations system. From ideation to multi-platform publishing using fine-tuned Claude 3.5 Sonnet instances.',
        price: '$199',
        priceValue: 199,
        category: 'workflow',
        image: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80&w=1000',
        tags: ['Make.com', 'Notion', 'Anthropic'],
        stripePriceId: 'price_1TB9oj2NRAQRhNmZO0gMRkPS',
    },
];
