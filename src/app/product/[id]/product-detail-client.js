'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, ShoppingCart, Plus, Minus, Truck, Clock, Shield,
} from 'lucide-react';
import { useCartStore } from '@/hooks/useCart';
import ProductIcon from '@/components/ProductIcon';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailClient({ product, related }) {
  const { addItem } = useCartStore();
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product);
  };

  return (
    <section className="max-w-[1400px] mx-auto px-6 py-16">
      <Link href="/merch"
        className="inline-flex items-center gap-1.5 text-kvlt-muted font-body tracking-[2px] text-[13px] no-underline hover:text-white mb-6">
        <ArrowLeft size={14} /> BACK TO SHOP
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Image */}
        <div className="bg-kvlt-card border border-kvlt-border rounded-xl h-[400px] flex items-center justify-center relative">
          <ProductIcon category={product.category} size={80} color="#c8ff00" />
          {product.badge && (
            <span className="absolute top-4 left-4 bg-kvlt-lime text-black px-2.5 py-1 text-[10px] font-body tracking-[2px] font-bold rounded">
              {product.badge}
            </span>
          )}
        </div>

        {/* Info */}
        <div>
          <span className="font-body tracking-[3px] text-[13px] text-zinc-600">
            {product.category.toUpperCase()}
          </span>
          <h1 className="font-display text-white text-[32px] leading-tight mt-1 mb-2">{product.name}</h1>
          <p className="text-kvlt-lime text-[28px] font-body mb-6">${product.price.toFixed(2)}</p>
          <p className="text-kvlt-muted leading-relaxed mb-8">{product.description}</p>

          {/* Qty + Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <button onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-7 h-7 bg-kvlt-border border border-zinc-700 text-white rounded flex items-center justify-center">
                <Minus size={12} />
              </button>
              <span className="font-body text-sm text-white min-w-[20px] text-center">{qty}</span>
              <button onClick={() => setQty(Math.min(10, qty + 1))}
                className="w-7 h-7 bg-kvlt-border border border-zinc-700 text-white rounded flex items-center justify-center">
                <Plus size={12} />
              </button>
            </div>
            <button onClick={handleAdd}
              className="flex-1 bg-kvlt-lime text-black border-none py-3.5 font-body tracking-[2px] text-sm font-bold flex items-center justify-center gap-2">
              <ShoppingCart size={14} />
              ADD TO CART — ${(product.price * qty).toFixed(2)}
            </button>
          </div>

          {/* Guarantees */}
          <div className="border-t border-kvlt-border pt-5">
            {[
              { Icon: Truck, text: 'Free shipping on orders over $100' },
              { Icon: Clock, text: 'Ships within 24-48 hours' },
              { Icon: Shield, text: 'Quality guaranteed or your money back' },
            ].map((f, i) => (
              <p key={i} className="text-zinc-500 text-[13px] font-body tracking-wider mb-2.5 flex items-center gap-2">
                <f.Icon size={14} className="text-zinc-600" />
                {f.text.toUpperCase()}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <>
          <h3 className="font-display text-white text-[22px] mt-16 mb-2">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </>
      )}
    </section>
  );
}
