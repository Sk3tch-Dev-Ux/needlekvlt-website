// ═══════════════════════════════════════════════
// Printful API Client
// ═══════════════════════════════════════════════
// Handles all communication with Printful's REST API.
// Used for:
//   - Syncing products from Printful → local catalog
//   - Creating fulfillment orders after Stripe payment
//   - Estimating shipping costs
//   - Checking product availability

const PRINTFUL_API_BASE = 'https://api.printful.com';

async function printfulRequest(endpoint, options = {}) {
  const { method = 'GET', body } = options;

  const res = await fetch(`${PRINTFUL_API_BASE}${endpoint}`, {
    method,
    headers: {
      'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
      'Content-Type': 'application/json',
      'X-PF-Store-Id': process.env.PRINTFUL_STORE_ID || '',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(
      `Printful API error [${res.status}]: ${error.result || error.message || res.statusText}`
    );
  }

  const data = await res.json();
  return data.result;
}

// ═══════════════════════════════════════════════
// Sync Products
// ═══════════════════════════════════════════════
// Fetches all synced products from your Printful store.
// These are the products you've designed in Printful's dashboard.

export async function getSyncProducts() {
  const products = await printfulRequest('/store/products');
  return products;
}

export async function getSyncProduct(id) {
  const product = await printfulRequest(`/store/products/${id}`);
  return product;
}

// Get detailed variant info (pricing, availability)
export async function getSyncVariant(variantId) {
  const variant = await printfulRequest(`/store/variants/${variantId}`);
  return variant;
}

// ═══════════════════════════════════════════════
// Create Fulfillment Order
// ═══════════════════════════════════════════════
// Called by the Stripe webhook after successful payment.
// Sends order to Printful for printing + shipping.
//
// Flow: Customer pays → Stripe webhook fires →
//       We create Printful order → Printful prints & ships
//
// Printful handles:
//   - Printing the product
//   - Quality check
//   - Packaging
//   - Shipping to customer
//   - Tracking number (sent via webhook)

export async function createOrder({ recipient, items, externalId, retailCosts }) {
  const order = await printfulRequest('/orders', {
    method: 'POST',
    body: {
      external_id: externalId,
      recipient: {
        name: recipient.name,
        address1: recipient.address1,
        address2: recipient.address2 || '',
        city: recipient.city,
        state_code: recipient.state,
        country_code: recipient.country,
        zip: recipient.zip,
        email: recipient.email,
        phone: recipient.phone || '',
      },
      items: items.map(item => ({
        sync_variant_id: item.printful_sync_variant_id,
        quantity: item.quantity,
        retail_price: item.price,
      })),
      retail_costs: retailCosts ? {
        subtotal: retailCosts.subtotal,
        shipping: retailCosts.shipping,
        tax: retailCosts.tax,
        total: retailCosts.total,
      } : undefined,
    },
  });

  return order;
}

// ═══════════════════════════════════════════════
// Confirm Order (moves from draft to production)
// ═══════════════════════════════════════════════

export async function confirmOrder(orderId) {
  const order = await printfulRequest(`/orders/${orderId}/confirm`, {
    method: 'POST',
  });
  return order;
}

// ═══════════════════════════════════════════════
// Estimate Shipping
// ═══════════════════════════════════════════════
// Get shipping rates before checkout.

export async function estimateShipping({ recipient, items }) {
  const rates = await printfulRequest('/shipping/rates', {
    method: 'POST',
    body: {
      recipient: {
        address1: recipient.address1,
        city: recipient.city,
        country_code: recipient.country,
        state_code: recipient.state,
        zip: recipient.zip,
      },
      items: items.map(item => ({
        variant_id: item.printful_variant_id,
        quantity: item.quantity,
      })),
    },
  });

  return rates;
}

// ═══════════════════════════════════════════════
// Get Order Status
// ═══════════════════════════════════════════════

export async function getOrder(orderId) {
  const order = await printfulRequest(`/orders/${orderId}`);
  return order;
}

export async function getOrderByExternalId(externalId) {
  const order = await printfulRequest(`/orders/@${externalId}`);
  return order;
}

// ═══════════════════════════════════════════════
// Product Catalog Helpers
// ═══════════════════════════════════════════════
// Get Printful's base product catalog (for adding new products)

export async function getCatalogProduct(productId) {
  const product = await printfulRequest(`/products/${productId}`);
  return product;
}

export async function getCatalogProductVariants(productId) {
  const product = await printfulRequest(`/products/${productId}`);
  return product.variants;
}

// ═══════════════════════════════════════════════
// Webhook Verification
// ═══════════════════════════════════════════════
// Printful can also send webhooks for:
//   - package_shipped (tracking number available)
//   - package_returned
//   - order_failed
//   - order_canceled

export function verifyPrintfulWebhook(body, signature) {
  // Printful doesn't sign webhooks with HMAC by default.
  // For security, whitelist Printful's IP ranges or use
  // a secret token in the webhook URL.
  // e.g., /api/printful/webhook?secret=YOUR_SECRET
  return true;
}
