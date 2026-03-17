// ═══════════════════════════════════════════════
// Product Catalog
// ═══════════════════════════════════════════════
// Central product definitions. Products that come from
// Printful have printful_sync_variant_id set. Non-Printful
// products (tools, needles, etc.) are fulfilled manually.
//
// In production, you'd likely move this to a database
// and sync Printful products via the /api/printful/sync endpoint.

export const PRODUCT_CATEGORIES = [
  'All Products',
  'Merch',
  'Apparel',
  'Tools',
  'Needles',
  'Ink',
  'Jewelry',
  'Aftercare',
];

// fulfillment_type:
//   'printful' — Printful prints & ships (merch, apparel)
//   'manual'   — You ship from your own inventory (tools, supplies)

export const products = [
  {
    id: 'master-key-v2',
    name: 'Master Key V2 — Titanium',
    category: 'Tools',
    price: 160.00,
    badge: 'RESTOCK',
    description: 'Professional-grade titanium tattoo machine key. Precision-machined for perfect grip and durability. Compatible with all standard coil and rotary machines.',
    fulfillment_type: 'manual',
    printful_sync_variant_id: null,
    printful_variant_id: null,
    images: [],
    in_stock: true,
  },
  {
    id: 'kvlt-logo-tee',
    name: 'KVLT Logo Tee',
    category: 'Apparel',
    price: 35.00,
    badge: 'HOT',
    description: 'Heavy cotton, oversized fit. Screen-printed KVLT logo. Designed dark, built to last. Printed and shipped by Printful.',
    fulfillment_type: 'printful',
    // Replace these with real IDs from your Printful dashboard
    printful_sync_variant_id: null, // e.g., 123456789
    printful_variant_id: null,      // e.g., 4012
    images: [],
    in_stock: true,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
  },
  {
    id: 'kvlt-snapback',
    name: 'KVLT Snapback',
    category: 'Apparel',
    price: 25.00,
    badge: null,
    description: 'Structured 6-panel snapback with embroidered KVLT logo. One size fits most.',
    fulfillment_type: 'printful',
    printful_sync_variant_id: null,
    printful_variant_id: null,
    images: [],
    in_stock: true,
  },
  {
    id: 'glizzy-bag',
    name: 'Glizzy Bag',
    category: 'Accessories',
    price: 75.00,
    badge: 'NEW',
    description: 'Compact artist carry bag. Water-resistant exterior, padded interior compartments for machines and supplies.',
    fulfillment_type: 'printful',
    printful_sync_variant_id: null,
    printful_variant_id: null,
    images: [],
    in_stock: true,
  },
  {
    id: 'black-ritual-ink',
    name: 'Black Ritual Ink — 4oz',
    category: 'Ink',
    price: 22.00,
    badge: 'BESTSELLER',
    description: 'Ultra-black tattoo ink. Vegan, sterilized, and made for bold lines and solid fills.',
    fulfillment_type: 'manual',
    printful_sync_variant_id: null,
    printful_variant_id: null,
    images: [],
    in_stock: true,
  },
  {
    id: 'precision-liner-needles',
    name: 'Precision Liner Needles (50pk)',
    category: 'Needles',
    price: 18.00,
    badge: null,
    description: 'Medical-grade stainless steel liner needles. Pre-sterilized, individually packaged. 50 per box.',
    fulfillment_type: 'manual',
    printful_sync_variant_id: null,
    printful_variant_id: null,
    images: [],
    in_stock: true,
  },
  {
    id: 'septum-clicker',
    name: 'Septum Clicker — Surgical Steel',
    category: 'Jewelry',
    price: 14.00,
    badge: null,
    description: '16G surgical steel septum clicker. Hypoallergenic, mirror polish finish.',
    fulfillment_type: 'manual',
    printful_sync_variant_id: null,
    printful_variant_id: null,
    images: [],
    in_stock: true,
  },
  {
    id: 'aftercare-balm',
    name: 'Aftercare Balm — 2oz',
    category: 'Aftercare',
    price: 12.00,
    badge: null,
    description: 'All-natural tattoo aftercare balm. Unscented, vegan, promotes fast healing.',
    fulfillment_type: 'manual',
    printful_sync_variant_id: null,
    printful_variant_id: null,
    images: [],
    in_stock: true,
  },
  {
    id: 'kvlt-hoodie-blackout',
    name: 'KVLT Hoodie — Blackout',
    category: 'Apparel',
    price: 65.00,
    badge: 'HOT',
    description: 'Heavyweight 400gsm hoodie. Puff-print KVLT logo. Oversized fit, ribbed cuffs. Printed and shipped by Printful.',
    fulfillment_type: 'printful',
    printful_sync_variant_id: null,
    printful_variant_id: null,
    images: [],
    in_stock: true,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
  },
  {
    id: 'rotary-pen-machine',
    name: 'Rotary Pen Machine — Matte Black',
    category: 'Tools',
    price: 245.00,
    badge: 'NEW',
    description: 'Swiss motor, adjustable stroke length. Lightweight aluminum body. Ships with RCA cord.',
    fulfillment_type: 'manual',
    printful_sync_variant_id: null,
    printful_variant_id: null,
    images: [],
    in_stock: true,
  },
  {
    id: 'practice-skin-sheets',
    name: 'Practice Skin Sheets (10pk)',
    category: 'Tools',
    price: 15.00,
    badge: null,
    description: 'Premium synthetic practice skin. Realistic texture for lining and shading practice.',
    fulfillment_type: 'manual',
    printful_sync_variant_id: null,
    printful_variant_id: null,
    images: [],
    in_stock: true,
  },
  {
    id: 'stencil-transfer-gel',
    name: 'Stencil Transfer Gel — 8oz',
    category: 'Aftercare',
    price: 16.00,
    badge: null,
    description: 'Professional-grade stencil application gel. Clean transfer, easy wipe, no residue.',
    fulfillment_type: 'manual',
    printful_sync_variant_id: null,
    printful_variant_id: null,
    images: [],
    in_stock: true,
  },
];

// Helpers
export function getProduct(id) {
  return products.find(p => p.id === id) || null;
}

export function getProductsByCategory(category) {
  if (category === 'All Products') return products;
  if (category === 'Merch') return products.filter(p => ['Apparel', 'Accessories'].includes(p.category));
  return products.filter(p => p.category === category);
}

export function getPrintfulProducts() {
  return products.filter(p => p.fulfillment_type === 'printful');
}

export function getManualProducts() {
  return products.filter(p => p.fulfillment_type === 'manual');
}
