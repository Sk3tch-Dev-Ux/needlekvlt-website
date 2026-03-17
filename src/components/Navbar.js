'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
  ShoppingCart, Menu, X, LogIn, CheckCircle,
} from 'lucide-react';
import { useCartStore } from '@/hooks/useCart';

const NAV_ITEMS = [
  { href: '/', label: 'HOME' },
  { href: '/merch', label: 'MERCH' },
  { href: '/courses', label: 'COURSES' },
  { href: '/support', label: 'SUPPORT' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { count, setIsOpen } = useCartStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-kvlt-border"
      style={{ background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(12px)' }}>
      <div className="flex items-center justify-between px-6 py-3 max-w-[1400px] mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-9 h-9 border border-kvlt-lime rounded flex flex-col items-center justify-center">
            <span className="text-[8px] font-black tracking-wider text-kvlt-lime leading-tight font-body">NEEDLE</span>
            <span className="text-[8px] font-black tracking-wider text-kvlt-lime leading-none font-body">KVLT</span>
          </div>
          <span className="font-display text-[22px] text-white tracking-wider">
            NEEDLE<span className="text-kvlt-lime">KVLT</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          {NAV_ITEMS.map(n => (
            <Link key={n.href} href={n.href}
              className={`px-3.5 py-1.5 font-body tracking-[2px] text-[13px] no-underline border transition-all ${
                isActive(n.href)
                  ? 'text-kvlt-lime border-kvlt-lime'
                  : 'text-kvlt-muted border-transparent hover:text-white'
              }`}>
              {n.label}
            </Link>
          ))}

          <Link href="/merch"
            className="bg-kvlt-lime text-black px-5 py-2 font-body tracking-[2px] text-[13px] font-bold no-underline hover:opacity-90">
            SHOP NOW
          </Link>

          {session ? (
            <button onClick={() => signOut()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-kvlt-lime font-body tracking-[2px] text-[12px] bg-transparent border-none">
              <CheckCircle size={12} />
              {session.user.username?.toUpperCase() || 'ACCOUNT'}
            </button>
          ) : (
            <Link href="/courses"
              className="flex items-center gap-1 px-3.5 py-1.5 font-body tracking-[2px] text-[13px] text-kvlt-muted no-underline border border-transparent hover:text-white">
              <LogIn size={14} /> LOGIN
            </Link>
          )}

          <button onClick={() => setIsOpen(true)}
            className="relative flex items-center bg-transparent border border-zinc-700 text-white rounded px-3 py-2 hover:border-kvlt-lime transition-colors">
            <ShoppingCart size={16} />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-kvlt-lime text-black text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>

        {/* Mobile: cart + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button onClick={() => setIsOpen(true)}
            className="relative flex items-center bg-transparent border border-zinc-700 text-white rounded px-2.5 py-2">
            <ShoppingCart size={16} />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-kvlt-lime text-black text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="bg-transparent border-none text-kvlt-lime">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="flex flex-col px-4 pb-4 gap-1 border-t border-kvlt-border md:hidden">
          {NAV_ITEMS.map(n => (
            <Link key={n.href} href={n.href} onClick={() => setMobileOpen(false)}
              className={`py-2.5 font-body tracking-[2px] text-sm no-underline ${
                isActive(n.href) ? 'text-kvlt-lime' : 'text-kvlt-muted'
              }`}>
              {n.label}
            </Link>
          ))}
          <Link href="/merch" onClick={() => setMobileOpen(false)}
            className="py-2.5 font-body tracking-[2px] text-sm text-kvlt-lime no-underline">
            SHOP NOW
          </Link>
        </div>
      )}

      {/* Glow line */}
      <div className="nav-glow" />
    </nav>
  );
}
