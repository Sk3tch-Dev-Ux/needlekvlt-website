'use client';

import { useState } from 'react';
import {
  ChevronDown, ChevronUp, MapPin, Globe, Package, Mail, MessageCircle,
} from 'lucide-react';

const DISCORD_INVITE = process.env.NEXT_PUBLIC_DISCORD_INVITE || 'https://discord.gg/jointhekvlt';

const FAQS = [
  { q: 'HOW DO I GET MEMBER PRICING?', a: 'Join our Discord community and get the Verified Artist role. Once verified, you\'ll unlock member-only pricing on all products in the shop.' },
  { q: 'HOW LONG UNTIL MERCH DROPS RESTOCK?', a: 'Merch drops are limited-run. Once sold out, they\'re gone. Follow us on Discord for restock announcements and early access.' },
  { q: 'ARE YOUR NEEDLES AND SUPPLIES MEDICAL GRADE?', a: 'Yes. All needles, jewelry, and piercing tools are medical-grade stainless steel, individually sterilized and packaged.' },
  { q: 'CAN I CANCEL OR MODIFY MY ORDER?', a: 'Orders can be modified within 1 hour of placement. After that, they enter processing. Contact support ASAP if you need changes.' },
  { q: 'DO YOU SHIP INTERNATIONALLY?', a: 'Yes. We ship to most countries. International orders take 7-14 business days. Rates are calculated at checkout. Import duties are buyer\'s responsibility.' },
  { q: 'DO YOU OFFER WHOLESALE PRICING?', a: 'Yes — for verified studios and professionals. Apply through our Discord or email wholesale@needlekvlt.com with your studio details.' },
  { q: 'WHAT PAYMENT METHODS DO YOU ACCEPT?', a: 'We accept all major credit cards, Apple Pay, Google Pay, and Shop Pay through our Stripe-powered checkout.' },
  { q: 'IS THE DISCORD COMMUNITY FREE?', a: 'Yes, joining the Discord is completely free. Some channels and perks require the Verified Artist role.' },
];

const SHIPPING = [
  { Icon: MapPin, title: 'DOMESTIC (US)', desc: 'Standard: 3-5 business days. Express: 1-2 business days. Free shipping on orders over $100. All orders include tracking.' },
  { Icon: Globe, title: 'INTERNATIONAL', desc: '7-14 business days depending on destination. Rates calculated at checkout. Tracking included. Import duties are buyer\'s responsibility.' },
  { Icon: Package, title: 'PROCESSING', desc: 'All orders ship within 24-48 hours. You\'ll receive a tracking email as soon as your order ships. Weekend orders ship the following Monday.' },
];

export default function SupportClient() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section className="max-w-[1400px] mx-auto px-6 py-16">
      <p className="font-body tracking-[4px] text-[13px] text-kvlt-lime mb-3">HELP CENTER</p>
      <h2 className="font-display text-white mb-4 leading-tight" style={{ fontSize: 'clamp(28px, 5vw, 42px)' }}>
        Support
      </h2>

      {/* FAQ */}
      <h3 className="font-body tracking-[2px] text-[22px] text-white font-semibold mb-6 mt-10">
        Frequently Asked Questions
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {FAQS.map((faq, i) => (
          <div key={i}
            className={`bg-kvlt-card border rounded-lg px-5 py-4 cursor-pointer transition-all ${
              openFaq === i ? 'border-zinc-700' : 'border-kvlt-border'
            }`}
            onClick={() => setOpenFaq(openFaq === i ? null : i)}>
            <div className="flex justify-between items-center">
              <span className="font-body tracking-wider text-[13px] text-zinc-300">{faq.q}</span>
              {openFaq === i
                ? <ChevronUp size={16} className="text-kvlt-lime flex-shrink-0" />
                : <ChevronDown size={16} className="text-zinc-600 flex-shrink-0" />}
            </div>
            {openFaq === i && (
              <p className="text-zinc-500 text-sm leading-relaxed mt-3 font-light">{faq.a}</p>
            )}
          </div>
        ))}
      </div>

      {/* Shipping */}
      <p className="font-body tracking-[4px] text-[13px] text-kvlt-lime mb-3 mt-16">DELIVERY</p>
      <h3 className="font-display text-white text-[28px] mb-6">Shipping Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SHIPPING.map((s, i) => (
          <div key={i} className="bg-kvlt-card border border-kvlt-border rounded-lg p-7">
            <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
              style={{ background: 'rgba(200,255,0,0.08)', border: '1px solid rgba(200,255,0,0.15)' }}>
              <s.Icon size={20} className="text-kvlt-lime" strokeWidth={1.5} />
            </div>
            <h4 className="font-body tracking-[2px] text-[15px] text-white font-semibold mb-2">{s.title}</h4>
            <p className="text-zinc-500 text-sm leading-relaxed font-light">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="mt-16 p-10 bg-kvlt-card border border-kvlt-border rounded-xl text-center">
        <h3 className="font-display text-kvlt-lime text-2xl mb-3">Still Need Help?</h3>
        <p className="text-kvlt-muted mb-6">Reach out to our support team and we'll get back to you within 24 hours.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button className="bg-kvlt-lime text-black border-none px-8 py-3.5 font-body tracking-[2px] text-sm font-bold inline-flex items-center gap-2">
            <Mail size={14} /> EMAIL SUPPORT
          </button>
          <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer" className="no-underline">
            <button className="bg-kvlt-discord text-white border-none px-8 py-3.5 font-body tracking-[2px] text-sm font-bold rounded inline-flex items-center gap-2">
              <MessageCircle size={14} /> ASK ON DISCORD
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
