import { NextResponse } from 'next/server';
import { constructWebhookEvent, stripe } from '@/lib/stripe';
import { createOrder, confirmOrder } from '@/lib/printful';

// ═══════════════════════════════════════════════
// Stripe Webhook Handler
// ═══════════════════════════════════════════════
// This is the bridge between Stripe and Printful.
//
// Flow:
// 1. Customer completes Stripe Checkout
// 2. Stripe sends `checkout.session.completed` webhook
// 3. We parse the order details from the session
// 4. For Printful items → create Printful order
// 5. For manual items → send notification to fulfill manually
// 6. Printful prints, ships, and sends tracking webhook

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  let event;

  try {
    event = constructWebhookEvent(body, signature);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(`Webhook handler error [${event.type}]:`, error);
    // Return 200 to prevent Stripe from retrying
    // Log error for manual investigation
    return NextResponse.json({ received: true, error: error.message });
  }
}

// ═══════════════════════════════════════════════
// Handle Successful Checkout
// ═══════════════════════════════════════════════

async function handleCheckoutCompleted(session) {
  console.log('Processing order:', session.id);

  // Get full session with line items
  const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ['line_items.data.price.product', 'customer_details', 'shipping_details'],
  });

  const customerDetails = fullSession.customer_details;
  const shippingDetails = fullSession.shipping_details;
  const metadata = fullSession.metadata;

  // Parse items from metadata
  let orderItems = [];
  try {
    orderItems = JSON.parse(metadata.items_json || '[]');
  } catch (e) {
    console.error('Failed to parse items_json:', e);
  }

  // Separate Printful vs manual fulfillment items
  const printfulItems = orderItems.filter(i => i.printful_sync_variant_id);
  const manualItems = orderItems.filter(i => !i.printful_sync_variant_id);

  // ── Printful Fulfillment ─────────────────
  if (printfulItems.length > 0 && shippingDetails?.address) {
    try {
      const addr = shippingDetails.address;

      const printfulOrder = await createOrder({
        externalId: `stripe-${session.id}`,
        recipient: {
          name: shippingDetails.name || customerDetails.name,
          address1: addr.line1,
          address2: addr.line2 || '',
          city: addr.city,
          state: addr.state,
          country: addr.country,
          zip: addr.postal_code,
          email: customerDetails.email,
        },
        items: printfulItems.map(item => ({
          printful_sync_variant_id: item.printful_sync_variant_id,
          quantity: item.qty,
          price: item.price,
        })),
        retailCosts: {
          subtotal: (fullSession.amount_subtotal / 100).toFixed(2),
          shipping: (fullSession.total_details?.amount_shipping / 100 || 0).toFixed(2),
          tax: (fullSession.total_details?.amount_tax / 100 || 0).toFixed(2),
          total: (fullSession.amount_total / 100).toFixed(2),
        },
      });

      console.log('Printful order created:', printfulOrder.id);

      // Auto-confirm the order (sends to production)
      // Remove this if you want to manually review orders first
      await confirmOrder(printfulOrder.id);
      console.log('Printful order confirmed:', printfulOrder.id);
    } catch (error) {
      console.error('Printful fulfillment failed:', error);
      // TODO: Send alert to admin (email, Discord, etc.)
      // The payment was still collected — you'll need to
      // manually create the Printful order or refund.
      await sendAdminAlert({
        type: 'printful_fulfillment_failed',
        sessionId: session.id,
        error: error.message,
        items: printfulItems,
      });
    }
  }

  // ── Manual Fulfillment Notification ──────
  if (manualItems.length > 0) {
    await sendAdminAlert({
      type: 'manual_fulfillment_needed',
      sessionId: session.id,
      customerEmail: customerDetails.email,
      shippingAddress: shippingDetails?.address,
      items: manualItems,
    });
  }

  // ── Send Order Confirmation ──────────────
  // TODO: Send confirmation email to customer
  // You can use Resend, SendGrid, or any email service
  console.log(`Order confirmation needed for: ${customerDetails.email}`);
}

// ═══════════════════════════════════════════════
// Handle Payment Failure
// ═══════════════════════════════════════════════

async function handlePaymentFailed(paymentIntent) {
  console.error('Payment failed:', paymentIntent.id);
  // TODO: Send failure notification
}

// ═══════════════════════════════════════════════
// Admin Alert (Discord webhook, email, etc.)
// ═══════════════════════════════════════════════

async function sendAdminAlert(alert) {
  console.log('ADMIN ALERT:', JSON.stringify(alert, null, 2));

  // Send to Discord webhook for real-time alerts
  const webhookUrl = process.env.DISCORD_ADMIN_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    const color = alert.type === 'printful_fulfillment_failed' ? 0xff4444 : 0xc8ff00;
    const title = alert.type === 'printful_fulfillment_failed'
      ? '⚠️ Printful Fulfillment Failed'
      : '📦 Manual Fulfillment Needed';

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title,
          color,
          fields: [
            { name: 'Session', value: alert.sessionId, inline: true },
            { name: 'Customer', value: alert.customerEmail || 'N/A', inline: true },
            { name: 'Items', value: alert.items.map(i => `${i.name || i.id} x${i.qty}`).join('\n') },
            ...(alert.error ? [{ name: 'Error', value: alert.error }] : []),
          ],
          timestamp: new Date().toISOString(),
        }],
      }),
    });
  } catch (e) {
    console.error('Failed to send admin alert:', e);
  }
}
