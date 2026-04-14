import Stripe from 'stripe';

export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        const { lineItems } = await request.json();

        if (!env.STRIPE_SECRET_KEY) {
            return new Response(JSON.stringify({ error: "Financial layer offline. (SECRET_KEY_NOT_FOUND)" }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const stripe = new Stripe(env.STRIPE_SECRET_KEY);

        // Standard Cloudflare Pages doesn't have a fixed URL until deployed, 
        // so we derive the base URL from the request.
        const origin = new URL(request.url).origin;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/cancel`,
        });

        return new Response(JSON.stringify({ url: session.url }), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (e) {
        console.error("Stripe Checkout Error:", e.message);
        return new Response(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
