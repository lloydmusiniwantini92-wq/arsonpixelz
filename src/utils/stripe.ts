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
 * Redirects the user to the Stripe Checkout page using Client-Only integration.
 * Note: Requires products/prices to exist in your Stripe Dashboard and 
 * "Enable client-only integration" to be turned on in Stripe Checkout settings.
 * 
 * @param lineItems Array of items containing price (Price ID) and quantity.
 * @param successUrl The URL to redirect to upon successful payment.
 * @param cancelUrl The URL to redirect to if the user cancels.
 */
export const redirectToCheckoutLineItems = async (
    lineItems: { price: string; quantity: number }[],
    successUrl: string = `${window.location.origin}/success`,
    cancelUrl: string = `${window.location.origin}/cancel`
) => {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to initialize');

    const { error } = await stripe.redirectToCheckout({
        mode: 'payment',
        lineItems,
        successUrl,
        cancelUrl
    });

    if (error) {
        throw error;
    }
};
