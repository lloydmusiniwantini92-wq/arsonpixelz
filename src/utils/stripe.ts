import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with the public key from environment variables
// This loads the Stripe script asynchronously
export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

/**
 * Validates if the Stripe configuration is present.
 * Returns false if the key is missing.
 */
export const isStripeConfigured = (): boolean => {
    return !!import.meta.env.VITE_STRIPE_PUBLIC_KEY;
};

/**
 * Redirects the user to the Stripe Checkout page.
 * @param lineItems Array of items to purchase { price: string, quantity: number }
 * @param successUrl URL to redirect on success
 * @param cancelUrl URL to redirect on cancel
 */
export const redirectToCheckout = async (
    lineItems: { price: string; quantity: number }[]
) => {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to initialize');

    const { error } = await stripe.redirectToCheckout({
        mode: 'payment',
        lineItems,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/shop`,
    });

    if (error) {
        throw error;
    }
};
