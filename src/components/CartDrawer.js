'use client';

import Link from 'next/link';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/hooks/useCart';
import ProductIcon from './ProductIcon';

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, isOpen, setIsOpen } = useCartStore();
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/70 z-[200] backdrop-blur-sm"
        onClick={() => setIsOpen(false)} />

      {/* Drawer */}
      <div className="fixed top-0 right-0 bottom-0 w-[420px] max-w-full bg-[#0d0d0d] border-l border-kvlt-border z-[201] flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-kvlt-border">
          <h3 className="font-body tracking-[3px] text-base text-white">YOUR CART</h3>
          <button onClick={() => setIsOpen(false)}
            className="bg-transparent border-none text-kvlt-muted flex items-center">
            <X size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="p-10 text-center text-zinc-600">
            <ShoppingCart size={48} className="mx-auto mb-4 text-zinc-700" />
            <p className="font-body tracking-[2px]">YOUR CART IS EMPTY</p>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-auto px-6 py-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 pb-4 mb-4 border-b border-kvlt-border">
                  <div className="w-14 h-14 bg-kvlt-border rounded-lg flex items-center justify-center">
                    <ProductIcon category={item.category} size={22} />
                  </div>
                  <div className="flex-1">
                    <p className="font-body tracking-wider text-sm text-white mb-1">{item.name}</p>
                    <p className="text-kvlt-lime font-body text-[15px] mb-2">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 bg-kvlt-border border border-zinc-700 text-white rounded flex items-center justify-center">
                        <Minus size={12} />
                      </button>
                      <span className="font-body text-sm text-white min-w-[20px] text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 bg-kvlt-border border border-zinc-700 text-white rounded flex items-center justify-center">
                        <Plus size={12} />
                      </button>
                      <button onClick={() => removeItem(item.id)}
                        className="ml-auto bg-transparent border-none text-zinc-600 text-[10px] font-body tracking-wider flex items-center gap-1">
                        <Trash2 size={11} /> REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-kvlt-border">
              <div className="flex justify-between font-body tracking-[2px] text-base text-white mb-4">
                <span>SUBTOTAL</span>
                <span className="text-kvlt-lime">${total.toFixed(2)}</span>
              </div>
              <Link href="/checkout" onClick={() => setIsOpen(false)}
                className="block w-full bg-kvlt-lime text-black text-center py-4 font-body tracking-[2px] text-[15px] font-bold no-underline hover:opacity-90">
                PROCEED TO CHECKOUT
              </Link>
              <p className="text-[11px] text-zinc-600 text-center mt-2 font-body tracking-wider">
                SHIPPING CALCULATED AT CHECKOUT
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
