import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Landmark } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';

export default function SiteFooter() {
  return (
    <footer className="bg-white text-black border-t border-zinc-200 pt-12 pb-8 text-xs" data-purpose="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-zinc-200">
          {/* Contact block */}
          <div>
            <h4 className="text-xs font-bold tracking-wider uppercase text-black mb-3">Customer Care</h4>
            <div className="space-y-1.5 text-black">
              <p>
                Email:{' '}
                <a className="text-black hover:underline transition-colors font-medium" href={`mailto:${BUSINESS_CONFIG.email}`}>
                  {BUSINESS_CONFIG.email}
                </a>
              </p>
              <p>
                Phone:{' '}
                <a className="text-black hover:underline font-mono transition-colors font-medium" href={`tel:${BUSINESS_CONFIG.callPhone}`}>
                  {BUSINESS_CONFIG.displayPhone}
                </a>
              </p>
              <div className="pt-2 flex items-center gap-3">
                <a
                  href="https://www.facebook.com/HouseOfTabani/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all shadow-xs"
                  aria-label="House of Tabani Facebook"
                >
                  <Facebook className="w-4 h-4 fill-white" />
                </a>
                <a
                  href="https://www.instagram.com/houseoftabani/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all shadow-xs"
                  aria-label="House of Tabani Instagram"
                >
                  <Instagram className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Shop Collections */}
          <div>
            <h4 className="text-xs font-bold tracking-wider uppercase text-black mb-3">SHOP</h4>
            <ul className="space-y-2 text-black">
              <li>
                <Link className="hover:underline transition-colors" href="/products">
                  All collections
                </Link>
              </li>
              <li>
                <Link className="hover:underline transition-colors" href="/products?category=chinese-button-sets">
                  Chinese Button Sets
                </Link>
              </li>
              <li>
                <Link className="hover:underline transition-colors" href="/products?category=the-debut">
                  The Debut
                </Link>
              </li>
              <li>
                <Link className="hover:underline transition-colors" href="/products?category=everyday-essentials">
                  Everyday Basics
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold tracking-wider uppercase text-black mb-3">QUICK LINKS</h4>
            <ul className="space-y-2 text-black">
              <li>
                <Link className="hover:underline transition-colors" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:underline transition-colors" href="/size-chart">
                  Size Chart
                </Link>
              </li>
              <li>
                <Link className="hover:underline transition-colors" href="/delivery-policy">
                  Delivery Policy
                </Link>
              </li>
              <li>
                <Link className="hover:underline transition-colors" href="/return-and-exchange-policy">
                  Return &amp; Exchange Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment Badges */}
          <div>
            <h4 className="text-xs font-bold tracking-wider uppercase text-black mb-3">PAYMENT METHOD</h4>
            <p className="text-[11px] text-black mb-3">
              Direct bank transfer available for secure order payments.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {/* Bank Transfer Badge */}
              <div className="bg-zinc-50 border border-zinc-300 text-black font-semibold px-3 py-1.5 rounded-xs text-[11px] tracking-wider uppercase inline-flex items-center gap-2">
                <Landmark className="w-3.5 h-3.5 text-zinc-900" />
                <span>Bank Transfer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-black space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-6">
            <Link className="hover:underline transition-colors" href="/#faq">
              FAQ&apos;s
            </Link>
            <Link className="hover:underline transition-colors" href="/terms-and-conditions">
              Terms and condition
            </Link>
            <Link className="hover:underline transition-colors" href="/privacy-policy">
              Privacy policy
            </Link>
          </div>
          <div>
            <p>© 2026 HouseofTabani. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
