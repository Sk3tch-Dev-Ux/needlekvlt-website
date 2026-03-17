'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/hooks/useCart';
import ProductIcon from './ProductIcon';

export default function ProductCard({ product }) {
  const { addItem } = useCartStore();
  const [hovered, setHovered] = useState(false);

  const badgeColor = product.badge === 'HOT' ? 'bg-orange-500 text-white'
    : 'bg-kvlt-lime text-black';

  return (
    <div
      className={`bg-kvlt-card border rounded-lg overflow-hidden transition-all duration-300 relative ${
        hovered ? 'border-kvlt-lime -translate-y-1' : 'border-kvlt-border'
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {product.badge && (
        <span className={`absolute top-3 left-3 z-10 px-2.5 py-1 text-[10px] font-body tracking-[2px] font-bold rounded ${badgeColor}`}>
          {product.badge}
        </span>
      )}

      <Link href={`/product/${product.id}`} className="no-underline">
        <div className="h-[220px] flex items-center justify-center bg-kvlt-border transition-colors">
          <ProductIcon category={product.category} size={40} color={hovered ? '#c8ff00' : '#555'} />
        </div>
      </Link>

      <div className="p-4">
        <span className="font-body tracking-[3px] text-[10px] text-zinc-600">
          {product.category.toUpperCase()}
        </span>
        <Link href={`/product/${product.id}`} className="no-underline">
          <h3 className="font-display text-lg text-white my-1.5 hover:text-kvlt-lime transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-kvlt-lime font-body text-lg font-semibold mb-3">
          ${product.price.toFixed(2)}
        </p>
        <button
          onClick={() => addItem(product)}
          className="w-full bg-kvlt-lime text-black border-none py-2.5 font-body tracking-[2px] text-[12px] font-bold flex items-center justify-center gap-1.5"
        >
          <ShoppingCart size={13} /> ADD TO CART
        </button>
      </div>
    </div>
  );
}
