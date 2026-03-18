import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors({
    origin: process.env.VITE_FRONTEND_URL || 'http://localhost:3000'
}));

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
            mode: 'payment', // Since we have some recurring we could check if any are recurring and switch to 'subscription' mode, but for now we assume they are either all single or mixed payment isn't supported yet. Let's keep it 'payment' for the ones retrieved earlier or dynamic. Note: if mix of one-time and recurring, it might need to be sorted.
            success_url: `${process.env.VITE_FRONTEND_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.VITE_FRONTEND_URL || 'http://localhost:3000'}/cancel`,
        });

        res.json({ url: session.url });
    } catch (e) {
        console.error("Stripe error:", e.message);
        res.status(500).json({ error: e.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Node server listening on port ${PORT}`);
});
