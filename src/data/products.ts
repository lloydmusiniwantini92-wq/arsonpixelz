import NexusImg from '../assets/nexus.png';
import ThanoicImg from '../assets/thanoic.png';
import VantaImg from '../assets/vanta.png';

export interface Product {
    id: string;
    title: string;
    description: string;
    price: string;
    priceValue: number; // Added for calculations
    category: 'template' | 'font' | 'agent' | 'workflow';
    image: string;
    tags: string[];
    featured?: boolean;
    stripePriceId?: string; // Added for Stripe integration
}

export const products: Product[] = [
    {
        id: 'tmpl-001',
        title: 'NEXUS // PORTFOLIO',
        description: 'A high-impact, grid-breaking portfolio template for creative directors. Features WebGL distortion effects and kinetic typography.',
        price: '$149',
        priceValue: 149,
        category: 'template',
        image: NexusImg,
        tags: ['React', 'Framer Motion', 'WebGL'],
        featured: true,
        stripePriceId: 'price_mock_nexus' // REPLACE WITH REAL PRICE ID
    },
    {
        id: 'font-001',
        title: 'THANOIC // ULTRA',
        description: 'A brutalist display typeface engineered for maximum illegibility and aesthetic dominance. 4 weights + variable axis.',
        price: '$89',
        priceValue: 89,
        category: 'font',
        image: ThanoicImg,
        tags: ['Display', 'Variable', 'Cyrillic'],
        stripePriceId: 'price_mock_thanoic' // REPLACE WITH REAL PRICE ID
    },
    {
        id: 'agent-001',
        title: 'VANTABLACKS // OPS',
        description: 'Autonomous AI agent swarm for scraping market intelligence and generating semantic SEO clusters in real-time.',
        price: '$499/mo',
        priceValue: 499,
        category: 'agent',
        image: VantaImg,
        tags: ['Python', 'LLM', 'Automation'],
        featured: true,
        stripePriceId: 'price_mock_vanta' // REPLACE WITH REAL PRICE ID
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
        stripePriceId: 'price_mock_void' // REPLACE WITH REAL PRICE ID
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
        stripePriceId: 'price_mock_ghost' // REPLACE WITH REAL PRICE ID
    }
];
