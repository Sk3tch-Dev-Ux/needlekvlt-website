'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { products, PRODUCT_CATEGORIES } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function MerchClient() {
  const [filter, setFilter] = useState('All Products');

  const filtered = filter === 'All Products' ? products
    : filter === 'Merch' ? products.filter(p => ['Apparel', 'Accessories'].includes(p.category))
    : products.filter(p => p.category === filter);

  return (
    <section className="max-w-[1400px] mx-auto px-6 pt-8 pb-16">
      <div className="flex flex-wrap gap-2 mb-6">
        {PRODUCT_CATEGORIES.map(c => (
          <button key={c} onClick={() => setFilter(c)}
            className={`px-4 py-2 font-body tracking-[2px] text-[12px] rounded transition-all ${
              filter === c
                ? 'bg-kvlt-lime text-black border-kvlt-lime font-bold'
                : 'bg-transparent text-kvlt-muted border border-zinc-700 hover:border-zinc-500'
            }`}>
            {c.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-zinc-600">
          <Search size={40} className="mx-auto mb-3 text-zinc-700" />
          <p className="font-body tracking-[2px] text-lg">NO PRODUCTS IN THIS CATEGORY YET</p>
        </div>
      )}
    </section>
  );
}
