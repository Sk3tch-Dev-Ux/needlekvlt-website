import Stripe from 'stripe';

// ═══════════════════════════════════════════════
// Stripe Client
// ═══════════════════════════════════════════════

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

// ═══════════════════════════════════════════════
// Create Checkout Session
// ═══════════════════════════════════════════════
// Creates a Stripe Checkout session from cart items.
// For Printful products, the variant_id is stored in metadata
// so the webhook can trigger fulfillment.

export async function createCheckoutSession({ items, customerEmail, shippingAddress }) {
  const lineItems = items.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
        description: item.description || '',
        images: item.images?.length ? [item.images[0]] : [],
        metadata: {
          product_id: String(item.id),
          printful_variant_id: String(item.printful_variant_id || ''),
          printful_sync_variant_id: String(item.printful_sync_variant_id || ''),
          category: item.category || '',
        },
      },
      unit_amount: Math.round(item.price * 100), // cents
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: lineItems,
    customer_email: customerEmail || undefined,

    // Collect shipping for physical goods
    shipping_address_collection: {
      allowed_countries: [
        'US', 'CA', 'GB', 'AU', 'DE', 'FR', 'NL', 'SE', 'NO',
        'DK', 'FI', 'IE', 'NZ', 'AT', 'BE', 'CH', 'ES', 'IT',
        'PT', 'JP', 'KR', 'MX', 'BR', 'PL', 'CZ',
      ],
    },

    // Shipping options
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 0, currency: 'usd' },
          display_name: 'Standard Shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 3 },
            maximum: { unit: 'business_day', value: 5 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 1499, currency: 'usd' },
          display_name: 'Express Shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 1 },
            maximum: { unit: 'business_day', value: 2 },
          },
        },
      },
    ],

    // Store full cart data in metadata for webhook
    metadata: {
      order_source: 'needlekvlt_web',
      item_count: String(items.length),
      items_json: JSON.stringify(
        items.map(i => ({
          id: i.id,
          name: i.name,
          qty: i.quantity,
          printful_variant_id: i.printful_variant_id || null,
          printful_sync_variant_id: i.printful_sync_variant_id || null,
        }))
      ),
    },

    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
  });

  return session;
}

// ═══════════════════════════════════════════════
// Retrieve Session (for success page)
// ═══════════════════════════════════════════════

export async function getCheckoutSession(sessionId) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'shipping_details'],
  });
  return session;
}

// ═══════════════════════════════════════════════
// Construct Webhook Event
// ═══════════════════════════════════════════════

export function constructWebhookEvent(body, signature) {
  return stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  );
}
