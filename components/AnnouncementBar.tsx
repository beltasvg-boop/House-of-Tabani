import React from 'react';
import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';

export default function AnnouncementBar() {
  return (
    <div className="border-b border-zinc-200 text-[11px] font-medium tracking-wider bg-zinc-50" data-purpose="top-utility-bar">
      {/* Top shipping message strip */}
      <div className="bg-[#DCBBC4] text-black text-center py-2 px-4 uppercase text-[10px] md:text-[11px] tracking-widest font-semibold flex items-center justify-center gap-3">
        <span>BUY 3 ITEMS AND GET FREE DELIVERY</span>
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-800"></span>
        <span className="hidden sm:inline">EASY 30-DAY EXCHANGE ACROSS PAKISTAN</span>
      </div>

      {/* Secondary info & care line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap justify-between items-center text-zinc-600">
        <div className="flex items-center space-x-6 text-[11px]">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-zinc-500" />
            <a className="hover:text-black transition-colors font-mono tracking-tight" href={`tel:${BUSINESS_CONFIG.callPhone}`}>
              Phone: {BUSINESS_CONFIG.displayPhone}
            </a>
          </span>
          <span className="hidden md:inline text-zinc-300">|</span>
          <span className="hidden md:inline-flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-zinc-500" />
            <a className="hover:text-black transition-colors tracking-tight" href={`mailto:${BUSINESS_CONFIG.email}`}>
              Email: {BUSINESS_CONFIG.email}
            </a>
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-4 text-[10px] tracking-wider uppercase text-zinc-500">
          <Link href="/products" className="hover:text-black transition-colors">
            SHOP ALL
          </Link>
          <span className="text-zinc-300">|</span>
          <Link href="/checkout" className="hover:text-black transition-colors">
            Express Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
