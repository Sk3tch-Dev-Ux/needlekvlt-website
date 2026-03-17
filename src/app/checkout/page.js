'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, ShoppingCart, Lock, Package, CreditCard, CheckCircle,
} from 'lucide-react';
import { useCartStore } from '@/hooks/useCart';
import ProductIcon from '@/components/ProductIcon';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CheckoutPage() {
  const { items, checkout } = useCartStore();
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await checkout(email);
      // checkout() redirects to Stripe — execution stops here on success
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <section className="max-w-[1400px] mx-auto px-6 py-16 text-center">
          <ShoppingCart size={56} className="mx-auto mb-4 text-zinc-700" />
          <h2 className="font-display text-white text-[32px] mb-4">Cart is Empty</h2>
          <p className="text-kvlt-muted mb-6">Add some items before checking out.</p>
          <Link href="/merch"
            className="bg-kvlt-lime text-black px-8 py-3.5 font-body tracking-[2px] text-sm font-bold no-underline inline-flex items-center">
            BROWSE SHOP
          </Link>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="max-w-[1400px] mx-auto px-6 py-16">
        <Link href="/merch"
          className="inline-flex items-center gap-1.5 text-kvlt-muted font-body tracking-[2px] text-[13px] no-underline hover:text-white mb-6">
          <ArrowLeft size={14} /> BACK TO SHOP
        </Link>
        <h2 className="font-display text-white mb-8 leading-tight" style={{ fontSize: 'clamp(28px, 5vw, 42px)' }}>
          Checkout
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Left: Email + Stripe CTA */}
          <div className="lg:col-span-3">
            <h3 className="font-body tracking-[2px] text-[15px] text-white font-semibold mb-5">
              Contact Information
            </h3>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-kvlt-card border border-kvlt-border text-white px-4 py-3.5 font-body text-sm tracking-wider rounded-md mb-6"
            />

            <div className="bg-kvlt-card border border-zinc-700 rounded-lg p-8 text-center">
              <CreditCard size={36} className="text-kvlt-lime mx-auto mb-3" strokeWidth={1.5} />
              <p className="font-body tracking-[2px] text-kvlt-muted mb-2">SECURE STRIPE CHECKOUT</p>
              <p className="text-zinc-600 text-[13px] leading-relaxed mb-6">
                You'll be redirected to Stripe's secure payment page. All major cards, Apple Pay, Google Pay, and Shop Pay accepted.
              </p>

              {error && (
                <p className="text-red-500 text-sm mb-4 font-body">{error}</p>
              )}

              <button onClick={handleCheckout} disabled={loading}
                className={`w-full py-4 font-body tracking-[2px] text-[15px] font-bold flex items-center justify-center gap-2 ${
                  loading
                    ? 'bg-zinc-600 text-zinc-400 cursor-wait'
                    : 'bg-kvlt-lime text-black'
                }`}>
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
                    REDIRECTING TO STRIPE...
                  </>
                ) : (
                  <>
                    <Lock size={14} />
                    PAY ${total.toFixed(2)} — CHECKOUT
                  </>
                )}
              </button>
            </div>

            <p className="text-zinc-600 text-[11px] mt-4 text-center font-body tracking-wider flex items-center justify-center gap-2">
              <Lock size={10} /> SECURED BY STRIPE
              <span className="text-zinc-800">•</span>
              <Package size={10} /> PRINTFUL FULFILLMENT
            </p>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-2 bg-kvlt-card border border-kvlt-border rounded-xl p-7 lg:sticky lg:top-20">
            <h3 className="font-body tracking-[2px] text-[15px] text-white font-semibold mb-5">ORDER SUMMARY</h3>
            {items.map(item => (
              <div key={item.id} className="flex justify-between mb-3 pb-3 border-b border-kvlt-border">
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 bg-kvlt-border rounded flex items-center justify-center">
                    <ProductIcon category={item.category} size={16} />
                  </div>
                  <div>
                    <p className="text-zinc-300 text-[13px] font-body tracking-wider">{item.name}</p>
                    <p className="text-zinc-600 text-[12px]">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="text-kvlt-lime font-body">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <div className="border-t border-zinc-700 pt-4 mt-2 space-y-2">
              <div className="flex justify-between text-kvlt-muted font-body tracking-wider text-sm">
                <span>SUBTOTAL</span><span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-kvlt-muted font-body tracking-wider text-sm">
                <span>SHIPPING</span><span>{total >= 100 ? 'FREE' : 'TBD'}</span>
              </div>
              <div className="flex justify-between text-white font-body tracking-wider text-lg pt-4 border-t border-zinc-700">
                <span>TOTAL</span><span className="text-kvlt-lime">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
