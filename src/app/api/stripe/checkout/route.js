import { NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';
import { getProduct } from '@/lib/products';

// POST /api/stripe/checkout
// Creates a Stripe Checkout Session from cart items
export async function POST(request) {
  try {
    const { items, email } = await request.json();

    if (!items || !items.length) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Validate items against our catalog (prevent price manipulation)
    const validatedItems = items.map(item => {
      const product = getProduct(item.id);
      if (!product) {
        throw new Error(`Product not found: ${item.id}`);
      }
      if (!product.in_stock) {
        throw new Error(`Product out of stock: ${product.name}`);
      }

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price, // Always use server-side price
        quantity: Math.min(Math.max(1, item.quantity), 10), // Cap at 10
        images: product.images,
        category: product.category,
        fulfillment_type: product.fulfillment_type,
        printful_variant_id: product.printful_variant_id,
        printful_sync_variant_id: product.printful_sync_variant_id,
      };
    });

    const session = await createCheckoutSession({
      items: validatedItems,
      customerEmail: email,
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
