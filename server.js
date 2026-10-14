import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors({
    origin: process.env.VITE_FRONTEND_URL || 'http://localhost:3000'
}));

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
        const { messages, context, thread_id } = req.body;
        
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
        dailyUsage += isHighIntent ? 5 : 1;

        // Proxy to Python FastAPI Microservice (Forced IPv4)
        const response = await fetch('http://127.0.0.1:8000/chat/stream', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                messages, 
                context, 
                thread_id: thread_id || 'default_thread' 
            })
        });

        if (!response.ok) {
            throw new Error(`Python service error: ${response.status} ${response.statusText}`);
        }

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        // ReadableStream consumption for Node 18+ fetch
        if (response.body) {
            for await (const chunk of response.body) {
                res.write(chunk);
            }
        }
        
        res.end();
    } catch (e) {
        console.error("Proxy Error:", e.message);
        if (!res.headersSent) {
            res.status(500).json({ error: "Communication severed with Cognitive Engine." });
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
