export interface PricingTier {
    title: string;
    price: string;
    description: string;
    vibe: string;
    included: string[];
    turnaround: string;
    stripePriceId?: string;
}

export interface ServiceCategory {
    id: string;
    name: string;
    description: string;
    tiers: PricingTier[];
}

export const services: ServiceCategory[] = [
    {
        id: 'ai-bots',
        name: 'AI Bots & Automations',
        description: 'Artificial Intelligence & Workflow Optimization',
        tiers: [
            {
                title: 'The Frontline Agent',
                price: '$1,500 – $3,500',
                description: 'Lead Gen & Support for E-commerce, real estate, and local services.',
                vibe: 'Helpful, immediate, and conversational.',
                included: ['Custom chatbot (Voiceflow/Botpress)', 'Instagram/WhatsApp integration', 'Automated lead capture', 'Basic human-handoff routing'],
                turnaround: '1–2 weeks',
                stripePriceId: 'price_ai_frontline'
            },
            {
                title: 'The Operations Brain',
                price: '$5,000 – $10,000',
                description: 'Internal Workflows for Agencies, law firms, and mid-sized teams.',
                vibe: 'Invisible, efficient, and hyper-connected.',
                included: ['Private internal AI assistant (RAG)', 'API automations (Make.com/Zapier)', 'Automated content generation engine'],
                turnaround: '3–5 weeks',
                stripePriceId: 'price_ai_brain'
            },
            {
                title: 'The Autonomous Enterprise',
                price: '$20,000 – $50,000+',
                description: 'Agentic Swarms for Enterprise corporations and data-heavy institutions.',
                vibe: 'Futuristic, deeply integrated, and self-executing.',
                included: ['Multi-agent swarms', 'Local/Private LLM deployment', 'Action-taking API bots', 'Voice AI for phone calls'],
                turnaround: '2–3+ months',
                stripePriceId: 'price_ai_enterprise'
            }
        ]
    },
    {
        id: 'seo',
        name: 'Search Engine Optimization',
        description: 'Organic Growth & Search Visibility',
        tiers: [
            {
                title: 'The Baseline Index',
                price: '$750 – $1,500 / mo',
                description: 'Fixing technical foundations for local businesses and startups.',
                vibe: 'Foundational, clean, and structurally sound.',
                included: ['Technical audit', 'On-page optimization (15 pages)', 'Google Business Profile opt', 'Looker Studio reporting'],
                turnaround: '2 weeks setup',
                stripePriceId: 'price_seo_baseline'
            },
            {
                title: 'The Organic Engine',
                price: '$3,000 – $7,000 / mo',
                description: 'Aggressive growth for scaling SaaS and e-commerce brands.',
                vibe: 'Aggressive, content-heavy, and growth-obsessed.',
                included: ['4 long-form blog posts/month', 'Proactive link building (3-5/mo)', 'Competitor gap analysis', 'Schema markup implementation'],
                turnaround: 'Ongoing',
                stripePriceId: 'price_seo_engine'
            },
            {
                title: 'The Market Authority',
                price: '$12,000 – $25,000+ / mo',
                description: 'Dominating high-volume keywords for enterprise brands.',
                vibe: 'Omnipresent, data-driven, and authoritative.',
                included: ['High-tier Digital PR', 'Programmatic SEO', 'A/B testing organic landing pages', 'Fractional Head of SEO'],
                turnaround: 'Ongoing',
                stripePriceId: 'price_seo_authority'
            }
        ]
    },
    {
        id: 'web-dev',
        name: 'Website Development',
        description: 'Digital Real Estate & Web Architecture',
        tiers: [
            {
                title: 'The Digital Footprint',
                price: '$500 – $999',
                description: 'Professional presence fast for solopreneurs.',
                vibe: 'Fast, clean, and reliable.',
                included: ['High-end template customization', '1 to 3 pages', 'Mobile responsiveness', 'Basic SEO tags'],
                turnaround: '1–2 weeks',
                stripePriceId: 'price_web_footprint'
            },
            {
                title: 'The Growth Accelerator',
                price: '$4,500 – $8,000',
                description: 'Strategic lead/sales driving for established businesses.',
                vibe: 'Strategic, conversion-focused, and bespoke.',
                included: ['Custom UI/UX design (Figma)', 'Up to 10 custom pages', 'E-commerce/CRM integrations', 'GA4 and Pixel setup'],
                turnaround: '4–6 weeks',
                stripePriceId: 'price_web_accelerator'
            },
            {
                title: 'The Enterprise Powerhouse',
                price: '$15,000 – $20,000+',
                description: 'Bleeding-edge platforms for large corporations.',
                vibe: 'Bleeding-edge, highly interactive, and structurally bulletproof.',
                included: ['Full custom architecture (React/Next.js)', 'Advanced 3D interactions', 'Custom API & User portal', '99.9% uptime architecture'],
                turnaround: '8–12+ weeks',
                stripePriceId: 'price_web_powerhouse'
            }
        ]
    },
    {
        id: 'app-dev',
        name: 'App Development',
        description: 'Software Engineering & Mobile Experiences',
        tiers: [
            {
                title: 'The Launchpad MVP',
                price: '$1,500 – $3,500',
                description: 'Concept validation for bootstrapped founders.',
                vibe: 'Lean, fast, and purely functional.',
                included: ['FlutterFlow/Bubble or PWA build', 'Firebase database', 'Up to 5 core screens', 'Customized UI'],
                turnaround: '2–4 weeks',
                stripePriceId: 'price_app_launchpad'
            },
            {
                title: 'The Velocity App',
                price: '$8,000 – $15,000',
                description: 'Cross-platform presence for funded startups.',
                vibe: 'Scalable, professional, and ready for masses.',
                included: ['React Native/Flutter codebase', 'Push notifications', 'Stripe integrations', 'App Store deployment'],
                turnaround: '2–3 months',
                stripePriceId: 'price_app_velocity'
            },
            {
                title: 'The Antigravity App',
                price: '$25,000+',
                description: 'Heavy-duty performance for enterprise disruptors.',
                vibe: 'Limitless, highly secure, and bleeding-edge.',
                included: ['Fully custom AWS/Node backend', 'Complex logic (GPS/Video)', 'Custom haptics & offline modes', 'End-to-end encryption'],
                turnaround: '4–6+ months',
                stripePriceId: 'price_app_antigravity'
            }
        ]
    },
    {
        id: 'design',
        name: 'Design & Creative',
        description: 'Visual Identity & Graphic Output',
        tiers: [
            {
                title: 'The Asset Drop',
                price: '$1,000 – $2,000 / mo',
                description: 'Day-to-day graphic assets for solo founders.',
                vibe: 'Fast, sharp, and flawlessly on-brand.',
                included: ['Print & Digital marketing assets', 'Social carousels', '1 active request at a time'],
                turnaround: '48 hours / req',
                stripePriceId: 'price_design_drop'
            },
            {
                title: 'The Digital Canvas',
                price: '$3,500 – $6,000 / mo',
                description: 'Conversion-driven UI/UX and ad creatives.',
                vibe: 'Conversion-driven, pixel-perfect, and iterative.',
                included: ['Custom vector illustrations', 'UI mockups', 'Pitch decks & Brand guidelines', '2 active requests'],
                turnaround: '24–48 hours / req',
                stripePriceId: 'price_design_canvas'
            },
            {
                title: 'The Immersive Aesthetic',
                price: '$9,000 – $15,000+ / mo',
                description: 'Boundary-pushing visual design for enterprise.',
                vibe: 'Limitless, kinetic, and industry-leading.',
                included: ['Lottie animations & 3D models', 'Packaging dielines', 'Multiple concurrent requests', 'Dedicated Art Director'],
                turnaround: 'Priority queueing',
                stripePriceId: 'price_design_immersive'
            }
        ]
    },
    {
        id: 'podcast',
        name: 'Podcast Production',
        description: 'Media & Content Syndication',
        tiers: [
            {
                title: 'The Clean Signal',
                price: '$500 – $1,200 / mo',
                description: 'Crisp audio-only production for creators.',
                vibe: 'Crisp, clear, and zero friction.',
                included: ['Noise reduction & Mastering', 'Stutter removal', 'Intros/Outros', 'AI show notes'],
                turnaround: '48 hours / ep',
                stripePriceId: 'price_podcast_signal'
            },
            {
                title: 'The Omnichannel',
                price: '$2,500 – $5,000 / mo',
                description: 'Viral-ready video podcasts for social algorithms.',
                vibe: 'High-visibility, dynamic, and viral-ready.',
                included: ['Full video syncing & multicam', '3-5 vertical micro-clips', 'YouTube thumbnails & SEO'],
                turnaround: '3–4 days / ep',
                stripePriceId: 'price_podcast_omni'
            },
            {
                title: 'The Network Anchor',
                price: '$8,000 – $15,000+ / mo',
                description: 'Hands-off, CHART-TOPPING enterprise production.',
                vibe: 'Broadcast-quality, immersive, fully managed.',
                included: ['Bespoke scoring & SFX', 'Motion graphics integration', 'Distribution management', 'Dedicated producer'],
                turnaround: 'Weekly pipeline',
                stripePriceId: 'price_podcast_anchor'
            }
        ]
    },
    {
        id: 'paid-media',
        name: 'Paid Media',
        description: 'Customer Acquisition & Advertising',
        tiers: [
            {
                title: 'The Ignition Package',
                price: '$1,500 / mo',
                description: 'Validating first campaigns for local businesses.',
                vibe: 'Targeted, lean, and measurable.',
                included: ['1 ad platform (Meta or Google)', 'Pixel/Conversion tracking', '2 basic ad creatives/mo', 'Weekly dashboard'],
                turnaround: 'Ongoing',
                stripePriceId: 'price_media_ignition'
            },
            {
                title: 'The Scale Package',
                price: '$3,500 – $6,000 / mo',
                description: 'Optimizing ROAS for SaaS and e-commerce.',
                vibe: 'Omnichannel, aggressive, and data-driven.',
                included: ['2 platforms (Meta + Google)', 'Advanced retargeting funnels', '5-8 custom creatives/mo', 'A/B testing'],
                turnaround: 'Ongoing',
                stripePriceId: 'price_media_scale'
            },
            {
                title: 'The Domination Package',
                price: '$8,000+ / mo',
                description: 'Full-funnel market saturation for high-budget brands.',
                vibe: 'Relentless, segmented, and omnipresent.',
                included: ['Omnichannel (Meta, Google, TikTok, LI)', 'Multi-touch attribution', 'Unlimited creative testing', 'Daily optimization'],
                turnaround: 'Ongoing',
                stripePriceId: 'price_media_dominate'
            }
        ]
    },
    {
        id: 'email-marketing',
        name: 'Email & Retention',
        description: 'Customer Lifetime Value & Automation',
        tiers: [
            {
                title: 'The Welcome Sequence',
                price: '$1,500 – $2,500',
                description: 'Backend capture system for traffic stores.',
                vibe: 'Automated, welcoming, and high-ROI.',
                included: ['Klaviyo/Mailchimp setup', '3 core flows: Welcome, Abandoned, Thank You'],
                turnaround: '2 weeks setup',
                stripePriceId: 'price_email_welcome'
            },
            {
                title: 'The Retention Engine',
                price: '$2,500 – $4,000 / mo',
                description: 'Consistent monetization for existing lists.',
                vibe: 'Engaging, consistent, and conversion-heavy.',
                included: ['Management of core flows', '4 targeted broadcasts/mo', 'List segmentation', 'A/B subject testing'],
                turnaround: 'Ongoing',
                stripePriceId: 'price_email_engine'
            },
            {
                title: 'The Lifecycle Mastery',
                price: '$5,000+ / mo',
                description: 'Maximizing Lifetime Value for high-volume stores.',
                vibe: 'Hyper-personalized, multi-channel, predictive.',
                included: ['8+ segmented broadcasts/mo', 'Win-back & VIP tiers', 'SMS marketing integration', 'Predictive analytics'],
                turnaround: 'Ongoing',
                stripePriceId: 'price_email_mastery'
            }
        ]
    },
    {
        id: 'copywriting',
        name: 'Copywriting',
        description: 'Conversion Optimization & Voice',
        tiers: [
            {
                title: 'The Brand Voice',
                price: '$1,500 – $3,000',
                description: 'Professional website sound for startups.',
                vibe: 'Clear, punchy, and jargon-free.',
                included: ['Core website copy', '1 landing page script', 'Tone of voice guidelines'],
                turnaround: '2 weeks',
                stripePriceId: 'price_copy_voice'
            },
            {
                title: 'The Conversion Copy',
                price: '$3,500 – $6,000',
                description: 'Psychological design to drive sales/ads.',
                vibe: 'Persuasive, psychological, and action-oriented.',
                included: ['Long-form sales pages', '5 variations of ad copy', '1 full launch sequence (5-7 emails)'],
                turnaround: '3–4 weeks',
                stripePriceId: 'price_copy_conversion'
            },
            {
                title: 'The Thought Leader',
                price: '$7,000+ / mo',
                description: 'Authority dominance for CEOs and enterprise.',
                vibe: 'Intellectual, authoritative, industry-shaping.',
                included: ['Ghostwriting (LinkedIn/X)', 'Deep-dive whitepapers', 'VSL scripts', 'Complete messaging architecture'],
                turnaround: 'Ongoing',
                stripePriceId: 'price_copy_authority'
            }
        ]
    }
];
