import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import rateLimit from 'express-rate-limit';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors({
    origin: process.env.VITE_FRONTEND_URL || 'http://localhost:3000'
}));

// AI Configuration
const genAI = new GoogleGenAI({ 
    apiKey: process.env.VITE_GEMINI_API_KEY 
});
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // Limit each IP to 10 requests per minute
    message: { error: 'Arson Intelligence recalibrating. Please wait a moment.' }
});

// Daily Limit Tracker (In-memory for now)
let today = new Date().toDateString();
let dailyUsage = 0;
const DAILY_MAX_WEIGHT = 1000; // Arbitrary units for cost management

app.post('/api/arson-intel', limiter, async (req, res) => {
    try {
        const { messages, context } = req.body;
        
        // Reset daily limit if new day
        const now = new Date().toDateString();
        if (now !== today) {
            today = now;
            dailyUsage = 0;
        }

        if (dailyUsage >= DAILY_MAX_WEIGHT) {
            return res.status(429).json({ error: 'System overload. Daily strategic energy exhausted.' });
        }

        const isHighIntent = context?.type === 'service' || context?.type === 'product';
        const modelName = isHighIntent ? 'gemini-2.5-pro' : 'gemini-2.5-flash';

        // Update usage weight
        dailyUsage += isHighIntent ? 5 : 1;

        const ARSON_MANIFESTO = `You are ARSON_INTERFACE, the elite autonomous AI agent for ArsonPixelz (a brutalist digital architecture and growth systems agency).
Your goal is to guide visitors, provide deep insights, and convert them. You MUST suggest, subtly or directly, that they purchase something from the shop or book a service.
Respond in a concise, authoritative, "Silicon Valley tech-elite", avant-garde, and brutalist tone. No fluff, no "how can I help you today", just raw value and strategic direction.
Never break character.`;

        const intelContext = context 
            ? `\n[INTELLIGENCE SIGNAL]: The user is currently analyzing: ${context.name} (${context.type}). Assume high intent. Pitch them this item or a cohesive service.`
            : '';

        const chatHistory = messages.slice(1, -1).map(m => `[${m.from.toUpperCase()}]: ${m.text}`).join('\n');
        const trimmed = messages[messages.length - 1].text.trim();

        const fullPrompt = `${ARSON_MANIFESTO}${intelContext}\n\nHISTORY:\n${chatHistory}\n[USER]: ${trimmed}\n[ARSONBOT]:`;

        // Silicon Valley Streaming (SSE)
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const responseStream = await genAI.models.generateContentStream({
            model: modelName,
            contents: fullPrompt,
            config: {
                maxOutputTokens: 1000,
            }
        });

        for await (const chunk of responseStream) {
            res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
        }
        
        res.end();
    } catch (e) {
        console.error("AI Error:", e.message);
        if (!res.headersSent) {
            res.status(500).json({ error: "Communication severed. Identity lost." });
        } else {
            res.write(`data: ${JSON.stringify({ error: "SIGNAL_INTERRUPTED" })}\n\n`);
            res.end();
        }
    }
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
});

app.post('/api/create-checkout-session', async (req, res) => {
    try {
        const { lineItems } = req.body;

        if (!lineItems || !lineItems.length) {
            return res.status(400).json({ error: 'No items provided' });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.VITE_FRONTEND_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.VITE_FRONTEND_URL || 'http://localhost:3000'}/cancel`,
        });

        res.json({ url: session.url });
    } catch (e) {
        console.error("Stripe error:", e.message);
        res.status(500).json({ error: e.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Node server listening on port ${PORT}`);
});
