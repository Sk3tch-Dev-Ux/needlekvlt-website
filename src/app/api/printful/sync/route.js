import { NextResponse } from 'next/server';
import { getSyncProducts, getSyncProduct } from '@/lib/printful';

// GET /api/printful/sync
// Fetches all synced products from Printful store.
// Use this to keep your local catalog in sync with Printful.
//
// In production, you'd call this on a cron schedule or
// after making changes in the Printful dashboard.

export async function GET(request) {
  // Simple auth check — protect this endpoint
  const authHeader = request.headers.get('authorization');
  const expectedToken = process.env.PRINTFUL_SYNC_SECRET || process.env.PRINTFUL_API_KEY;

  if (authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const syncProducts = await getSyncProducts();

    // Fetch full details for each product
    const detailed = await Promise.all(
      syncProducts.map(async (product) => {
        try {
          const full = await getSyncProduct(product.id);
          return {
            printful_id: product.id,
            name: product.name,
            thumbnail: product.thumbnail_url,
            variants: full.sync_variants?.map(v => ({
              sync_variant_id: v.id,
              variant_id: v.variant_id,
              name: v.name,
              sku: v.sku,
              retail_price: v.retail_price,
              currency: v.currency,
              product: v.product,
              files: v.files?.map(f => ({
                type: f.type,
                url: f.preview_url || f.url,
              })),
            })) || [],
          };
        } catch (e) {
          console.error(`Failed to fetch product ${product.id}:`, e);
          return null;
        }
      })
    );

    const validProducts = detailed.filter(Boolean);

    return NextResponse.json({
      count: validProducts.length,
      products: validProducts,
      synced_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Printful sync error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to sync products' },
      { status: 500 }
    );
  }
}

// POST /api/printful/sync
// Receives Printful webhooks (order shipped, etc.)
export async function POST(request) {
  try {
    const body = await request.json();
    const { type, data } = body;

    console.log('Printful webhook:', type);

    switch (type) {
      case 'package_shipped':
        // Tracking number is now available
        console.log('Package shipped:', {
          orderId: data.order?.id,
          trackingNumber: data.shipment?.tracking_number,
          trackingUrl: data.shipment?.tracking_url,
          carrier: data.shipment?.carrier,
        });
        // TODO: Email tracking info to customer
        break;

      case 'order_failed':
        console.error('Printful order failed:', data.order?.id);
        // TODO: Alert admin, potentially refund customer
        break;

      case 'product_synced':
        console.log('Product synced in Printful:', data.sync_product?.id);
        break;

      default:
        console.log('Unhandled Printful webhook:', type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Printful webhook error:', error);
    return NextResponse.json({ received: true });
  }
}
