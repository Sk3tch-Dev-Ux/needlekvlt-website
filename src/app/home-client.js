'use client';

import Link from 'next/link';
import {
  ArrowRight, Syringe, Palette, Zap, MessageCircle,
  Shield, Users, CheckCircle,
} from 'lucide-react';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

const DISCORD_INVITE = process.env.NEXT_PUBLIC_DISCORD_INVITE || 'https://discord.gg/jointhekvlt';

const FEATURES = [
  { Icon: Syringe, title: 'PRO-GRADE SUPPLIES', desc: 'Needles, ink, machines, and piercing jewelry sourced from the best manufacturers. No cheap knockoffs — ever.' },
  { Icon: Palette, title: 'BRUTAL MERCH', desc: 'Limited-run apparel, accessories, and gear designed with the same intensity you bring to your craft.' },
  { Icon: Zap, title: 'FAST SHIPPING', desc: 'Orders ship within 24-48 hours. Tracked, insured, and delivered fast because downtime costs you money.' },
  { Icon: MessageCircle, title: 'DISCORD COMMUNITY', desc: 'Join thousands of artists sharing techniques, flash designs, and industry knowledge.' },
  { Icon: Shield, title: 'QUALITY GUARANTEED', desc: 'Every product is tested and approved by working professionals. If it doesn\'t meet our standard, it doesn\'t ship.' },
  { Icon: Users, title: 'ARTIST COLLABS', desc: 'Regular collaborations with top tattoo and piercing artists. Limited editions, exclusive designs.' },
];

const DISCORD_PERKS = [
  'Early access to new product drops',
  'Member-exclusive discounts',
  'Artist showcase channels',
  'Flash design sharing',
  'Industry news and events',
];

export default function HomeClient() {
  const featured = products.filter(p => p.badge === 'HOT' || p.badge === 'BESTSELLER').slice(0, 4);

  return (
    <main>
      {/* ── Hero ──────────────────────────── */}
      <section className="text-center py-32 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(200,255,0,0.08) 0%, transparent 70%)' }} />
        <div className="relative z-10">
          <p className="font-body tracking-[6px] text-[13px] text-zinc-600 mb-6">TATTOO & PIERCING COMMUNITY</p>
          <h1 className="font-display text-kvlt-lime mb-6 leading-none"
            style={{ fontSize: 'clamp(56px, 10vw, 96px)', textShadow: '0 0 60px rgba(200,255,0,0.3), 0 0 120px rgba(200,255,0,0.1)' }}>
            NEEDLE<span className="text-kvlt-lime">KVLT</span>
          </h1>
          <p className="text-kvlt-muted text-base max-w-[500px] mx-auto mb-10 leading-relaxed font-light">
            Premium supplies, brutal merch, and a community built by artists, for artists. No compromises.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/merch"
              className="bg-kvlt-lime text-black px-8 py-3.5 font-body tracking-[2px] text-sm font-bold no-underline inline-flex items-center">
              SHOP NOW
            </Link>
            <a href="#why"
              className="border border-zinc-500 text-white px-8 py-3.5 font-body tracking-[2px] text-sm no-underline inline-flex items-center">
              LEARN MORE
            </a>
          </div>
        </div>
      </section>

      {/* ── Featured Products ─────────────── */}
      <section className="max-w-[1400px] mx-auto px-6 py-16">
        <p className="font-body tracking-[4px] text-[13px] text-kvlt-lime mb-3">TRENDING NOW</p>
        <h2 className="font-display text-white mb-4 leading-tight" style={{ fontSize: 'clamp(28px, 5vw, 42px)' }}>
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="text-center mt-8">
          <Link href="/merch"
            className="border border-zinc-500 text-white px-8 py-3.5 font-body tracking-[2px] text-sm no-underline inline-flex items-center gap-1.5 hover:border-kvlt-lime transition-colors">
            VIEW ALL PRODUCTS <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── Why NeedleKVLT ────────────────── */}
      <section id="why" className="max-w-[1400px] mx-auto px-6 py-16">
        <p className="font-body tracking-[4px] text-[13px] text-kvlt-lime mb-3">WHY NEEDLEKVLT</p>
        <h2 className="font-display text-white mb-4 leading-tight" style={{ fontSize: 'clamp(28px, 5vw, 42px)' }}>
          Built For Artists.{'\n'}By Artists.
        </h2>
        <p className="text-kvlt-muted max-w-[500px] mb-10 leading-relaxed">
          We're not a corporate supply company. We're a community of tattoo and piercing professionals who demand better.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <div key={i} className="bg-kvlt-card border border-kvlt-border rounded-lg p-7">
              <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                style={{ background: 'rgba(200,255,0,0.08)', border: '1px solid rgba(200,255,0,0.15)' }}>
                <f.Icon size={20} color="#c8ff00" strokeWidth={1.5} />
              </div>
              <h3 className="font-body tracking-[2px] text-[15px] text-white font-semibold mb-2">{f.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-light">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Community + CTAs ──────────────── */}
      <section className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Discord */}
          <div className="bg-kvlt-card border border-kvlt-border rounded-xl p-8"
            style={{ background: 'linear-gradient(135deg, #111 0%, #0d0d0d 100%)' }}>
            <h3 className="font-display text-kvlt-lime text-[28px] mb-3">Join The KVLT</h3>
            <p className="text-zinc-300 leading-relaxed mb-6">
              Our Discord is where the community lives. Get early access to drops, share your work, connect with other artists, and unlock member-only pricing.
            </p>
            {DISCORD_PERKS.map((item, i) => (
              <p key={i} className="text-zinc-300 text-sm mb-2.5 flex items-center gap-2">
                <CheckCircle size={14} className="text-kvlt-lime flex-shrink-0" />
                {item}
              </p>
            ))}
            <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer" className="block mt-6">
              <button className="w-full bg-kvlt-discord text-white border-none py-3.5 font-body tracking-[2px] text-sm font-bold rounded flex items-center justify-center gap-2">
                <MessageCircle size={16} /> JOIN DISCORD
              </button>
            </a>
          </div>

          {/* Category CTAs */}
          <div className="flex flex-col gap-4">
            {[
              { title: 'FOR TATTOO ARTISTS', desc: 'Professional needles, premium ink, machines, grips, and everything you need to create your best work.', btn: 'BROWSE SUPPLIES' },
              { title: 'FOR PIERCERS', desc: 'Surgical-grade jewelry, tools, and aftercare products. Everything sourced from trusted manufacturers.', btn: 'BROWSE SUPPLIES' },
              { title: 'MERCH DROPS', desc: 'Limited-run apparel, bags, hats, and accessories. Designed dark. Made tough. Rep the KVLT.', btn: 'SHOP MERCH' },
            ].map((c, i) => (
              <div key={i} className="bg-kvlt-card border border-kvlt-border rounded-xl p-6">
                <h4 className="font-body tracking-[2px] text-base text-kvlt-lime font-semibold mb-2">{c.title}</h4>
                <p className="text-kvlt-muted text-sm mb-4 leading-relaxed">{c.desc}</p>
                <Link href="/merch"
                  className="w-full border border-zinc-700 text-white py-3 font-body tracking-[2px] text-[12px] flex items-center justify-center gap-1.5 no-underline hover:border-kvlt-lime transition-colors">
                  {c.btn} <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────── */}
      <section className="mx-6 rounded-xl"
        style={{ background: 'linear-gradient(135deg, rgba(200,255,0,0.06), rgba(200,255,0,0.02))', border: '1px solid rgba(200,255,0,0.15)' }}>
        <div className="max-w-[1400px] mx-auto px-10 py-12 flex flex-wrap justify-between items-center gap-6">
          <div>
            <h2 className="font-display text-white text-[32px] mb-1">Ready To Join?</h2>
            <p className="text-kvlt-muted">The KVLT is growing. Don't get left behind.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/merch"
              className="border border-zinc-500 text-white px-8 py-3.5 font-body tracking-[2px] text-sm no-underline inline-flex items-center">
              BROWSE SHOP
            </Link>
            <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer" className="no-underline">
              <button className="bg-kvlt-discord text-white border-none px-8 py-3.5 font-body tracking-[2px] text-sm font-bold rounded inline-flex items-center gap-1.5">
                <MessageCircle size={14} /> JOIN DISCORD
              </button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
