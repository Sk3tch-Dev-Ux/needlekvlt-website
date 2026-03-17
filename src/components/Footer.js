'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const DISCORD_INVITE = process.env.NEXT_PUBLIC_DISCORD_INVITE || 'https://discord.gg/jointhekvlt';

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-kvlt-border mt-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-[1400px] mx-auto px-6 py-12">
        <div>
          <h3 className="font-display text-2xl text-kvlt-lime mb-3">NEEDLEKVLT</h3>
          <p className="text-zinc-600 text-[13px] leading-relaxed max-w-[280px]">
            Premium tattoo & piercing supplies, brutal merch, and a community built by artists, for artists.
          </p>
        </div>
        <div>
          <h4 className="font-body tracking-[3px] text-[13px] text-kvlt-lime mb-4">SHOP</h4>
          {['All Products', 'Apparel', 'Tools', 'Needles', 'Ink', 'Jewelry'].map(l => (
            <Link key={l} href="/merch"
              className="block text-zinc-600 text-[13px] mb-2 no-underline hover:text-white transition-colors font-light">
              {l}
            </Link>
          ))}
        </div>
        <div>
          <h4 className="font-body tracking-[3px] text-[13px] text-kvlt-lime mb-4">COMPANY</h4>
          {['About', 'Support', 'Shipping', 'Returns', 'Wholesale'].map(l => (
            <Link key={l} href="/support"
              className="block text-zinc-600 text-[13px] mb-2 no-underline hover:text-white transition-colors font-light">
              {l}
            </Link>
          ))}
        </div>
        <div>
          <h4 className="font-body tracking-[3px] text-[13px] text-kvlt-lime mb-4">COMMUNITY</h4>
          <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-zinc-600 text-[13px] mb-2 no-underline hover:text-white transition-colors font-light">
            Discord <ExternalLink size={10} />
          </a>
          {['Instagram', 'TikTok', 'YouTube'].map(l => (
            <p key={l} className="text-zinc-600 text-[13px] mb-2 cursor-pointer hover:text-white transition-colors font-light">
              {l}
            </p>
          ))}
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 py-5 border-t border-zinc-900 flex flex-wrap justify-between items-center gap-4">
        <p className="text-zinc-700 text-[12px] font-body tracking-wider">
          © {new Date().getFullYear()} NEEDLEKVLT. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-4">
          {['Privacy', 'Terms', 'Cookies'].map(l => (
            <span key={l} className="text-zinc-700 text-[12px] font-body tracking-wider cursor-pointer hover:text-zinc-500">
              {l}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
