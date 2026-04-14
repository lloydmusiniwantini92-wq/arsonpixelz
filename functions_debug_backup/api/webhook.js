import Stripe from 'stripe';

export async function onRequestPost(context) {
    const { request, env } = context;

    const stripe = new Stripe(env.STRIPE_SECRET_KEY);
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
        return new Response('No signature detected.', { status: 400 });
    }

    let event;

    try {
        // Stripe webhook verification requires the raw body
        const rawBody = await request.text();
        event = stripe.webhooks.constructEvent(
            rawBody,
            signature,
            env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error(`Webhook Signature Verification Failed: ${err.message}`);
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log(`[PAYMENT_SUCCESS]: Session ID ${session.id} confirmed for ${session.customer_details.email}`);
            
            // FUTURE_FULFILLMENT: Trigger email or database update here
            // Example: await sendSuccessEmail(session.customer_details.email);
            
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}
