import React from 'react';
import Link from 'next/link';
import { BUSINESS_CONFIG } from '@/config/business';

export default function SiteFooter() {
  return (
    <footer className="bg-black text-zinc-300 border-t border-zinc-900 pt-12 pb-8 text-xs" data-purpose="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-zinc-800">
          {/* Contact block */}
          <div>
            <h4 className="text-xs font-bold tracking-wider uppercase text-white mb-3">Customer Care</h4>
            <div className="space-y-1.5 text-zinc-400">
              <p>
                Email:{' '}
                <a className="text-zinc-300 hover:text-white underline transition-colors" href={`mailto:${BUSINESS_CONFIG.email}`}>
                  {BUSINESS_CONFIG.email}
                </a>
              </p>
              <p>
                Phone:{' '}
                <a className="text-zinc-300 hover:text-white font-mono transition-colors" href={`tel:${BUSINESS_CONFIG.callPhone}`}>
                  {BUSINESS_CONFIG.displayPhone}
                </a>
              </p>
              <p className="text-[11px] text-zinc-500 pt-1">{BUSINESS_CONFIG.workingHours}</p>
            </div>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="text-xs font-bold tracking-wider uppercase text-white mb-3">HELP</h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <Link className="hover:text-white transition-colors" href="/products">
                  All Collections
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="/checkout">
                  Express Checkout
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="/#faq">
                  FAQs &amp; Help
                </Link>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="/#faq">
                  Payment Options
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#baadmay">
                  BaadMay (Pay Later)
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#shipping">
                  Shipping &amp; Deliveries
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#returns">
                  Exchange &amp; Returns
                </a>
              </li>
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4 className="text-xs font-bold tracking-wider uppercase text-white mb-3">ABOUT Hot</h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <a className="hover:text-white transition-colors" href="#about">
                  About Us
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#contact">
                  Contact Us
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#careers">
                  Work With Us
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#stores">
                  Retail Store Locations
                </a>
              </li>
            </ul>
          </div>

          {/* Payment Badges */}
          <div>
            <h4 className="text-xs font-bold tracking-wider uppercase text-white mb-3">PAYMENT METHOD</h4>
            <p className="text-[11px] text-zinc-400 mb-3">
              100% secure encrypted checkout with flexible local payment options.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {/* VISA Badge */}
              <div className="bg-white text-zinc-900 font-black px-2.5 py-1 rounded-xs text-xs tracking-tighter">
                VISA
              </div>
              {/* Mastercard Badge */}
              <div className="bg-zinc-900 border border-zinc-700 px-2 py-1 rounded-xs flex items-center">
                <span className="w-3.5 h-3.5 rounded-full bg-red-600 inline-block -mr-1"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-amber-500 inline-block opacity-90"></span>
              </div>
              {/* PayFast Badge */}
              <div className="bg-white text-emerald-800 font-bold px-2 py-1 rounded-xs text-[11px]">
                PayFast
              </div>
              {/* Bank Transfer Badge */}
              <div className="bg-zinc-800 text-zinc-200 font-semibold px-2.5 py-1 rounded-xs text-[10px] tracking-wider uppercase">
                Bank Transfer
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-6">
            <Link className="hover:text-zinc-300 transition-colors" href="/#faq">
              FAQ&apos;s
            </Link>
            <a className="hover:text-zinc-300 transition-colors" href="#terms">
              Terms and condition
            </a>
            <a className="hover:text-zinc-300 transition-colors" href="#privacy">
              Privacy policy
            </a>
          </div>
          <div>
            <p>© 2026 HouseofTabani. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
