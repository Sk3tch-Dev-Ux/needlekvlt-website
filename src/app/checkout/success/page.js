'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCartStore } from '@/hooks/useCart';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCartStore();
  const [cleared, setCleared] = useState(false);

  // Clear cart on successful payment
  useEffect(() => {
    if (sessionId && !cleared) {
      clearCart();
      setCleared(true);
    }
  }, [sessionId, cleared, clearCart]);

  return (
    <>
      <Navbar />
      <section className="max-w-[1400px] mx-auto px-6 py-24 text-center">
        <CheckCircle size={64} className="text-kvlt-lime mx-auto mb-6" strokeWidth={1.5} />
        <h1 className="font-display text-white text-[42px] mb-4">Order Confirmed!</h1>
        <p className="text-kvlt-muted text-lg mb-2 max-w-lg mx-auto leading-relaxed">
          Thank you for your order. You'll receive a confirmation email with tracking information once your order ships.
        </p>

        {sessionId && (
          <p className="text-zinc-600 text-sm font-body tracking-wider mb-8">
            SESSION: {sessionId.slice(0, 20)}...
          </p>
        )}

        <div className="max-w-md mx-auto bg-kvlt-card border border-kvlt-border rounded-xl p-8 mb-8">
          <Package size={32} className="text-kvlt-lime mx-auto mb-4" strokeWidth={1.5} />
          <h3 className="font-body tracking-[2px] text-white text-sm font-semibold mb-3">WHAT HAPPENS NEXT</h3>
          <div className="text-left space-y-3">
            {[
              'You\'ll receive an email confirmation within minutes.',
              'Printful items are sent to production immediately.',
              'Manual fulfillment items ship within 24-48 hours.',
              'You\'ll get a tracking email once your package ships.',
            ].map((step, i) => (
              <p key={i} className="text-zinc-500 text-sm flex items-start gap-2">
                <span className="text-kvlt-lime font-body font-bold mt-0.5">{i + 1}.</span>
                {step}
              </p>
            ))}
          </div>
        </div>

        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/"
            className="border border-zinc-500 text-white px-8 py-3.5 font-body tracking-[2px] text-sm no-underline inline-flex items-center hover:border-kvlt-lime transition-colors">
            BACK TO HOME
          </Link>
          <Link href="/merch"
            className="bg-kvlt-lime text-black px-8 py-3.5 font-body tracking-[2px] text-sm font-bold no-underline inline-flex items-center gap-1.5">
            CONTINUE SHOPPING <ArrowRight size={14} />
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
