import React from 'react';
import Link from 'next/link';
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
            <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <a className="hover:text-black transition-colors font-mono tracking-tight" href={`tel:${BUSINESS_CONFIG.callPhone}`}>
              Phone: {BUSINESS_CONFIG.displayPhone}
            </a>
          </span>
          <span className="hidden md:inline text-zinc-300">|</span>
          <span className="hidden md:inline uppercase text-[10px] tracking-wider text-zinc-500">
            {BUSINESS_CONFIG.workingHours}
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-4 text-[10px] tracking-wider uppercase text-zinc-500">
          <Link href="/products" className="hover:text-black transition-colors">
            Order Tracking
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
