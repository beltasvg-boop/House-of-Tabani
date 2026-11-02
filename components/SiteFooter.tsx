import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';
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
              <div className="pt-2 flex items-center gap-3 text-black">
                <a
                  href="https://www.facebook.com/HouseOfTabani/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 rounded-sm hover:opacity-70 transition-opacity text-black inline-flex items-center justify-center"
                  aria-label="House of Tabani Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/houseoftabani/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 rounded-sm hover:opacity-70 transition-opacity text-black inline-flex items-center justify-center"
                  aria-label="House of Tabani Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="text-xs font-bold tracking-wider uppercase text-black mb-3">HELP</h4>
            <ul className="space-y-2 text-black">
              <li>
                <Link className="hover:underline transition-colors" href="/products">
                  All Collections
                </Link>
              </li>
              <li>
                <Link className="hover:underline transition-colors" href="/checkout">
                  Express Checkout
                </Link>
              </li>
              <li>
                <Link className="hover:underline transition-colors" href="/#faq">
                  FAQs &amp; Help
                </Link>
              </li>
              <li>
                <a className="hover:underline transition-colors" href="/#faq">
                  Payment Options
                </a>
              </li>
              <li>
                <a className="hover:underline transition-colors" href="#baadmay">
                  BaadMay (Pay Later)
                </a>
              </li>
              <li>
                <a className="hover:underline transition-colors" href="#shipping">
                  Shipping &amp; Deliveries
                </a>
              </li>
              <li>
                <a className="hover:underline transition-colors" href="#returns">
                  Exchange &amp; Returns
                </a>
              </li>
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4 className="text-xs font-bold tracking-wider uppercase text-black mb-3">ABOUT Hot</h4>
            <ul className="space-y-2 text-black">
              <li>
                <a className="hover:underline transition-colors" href="#about">
                  About Us
                </a>
              </li>
              <li>
                <a className="hover:underline transition-colors" href="#contact">
                  Contact Us
                </a>
              </li>
              <li>
                <a className="hover:underline transition-colors" href="#careers">
                  Work With Us
                </a>
              </li>
              <li>
                <a className="hover:underline transition-colors" href="#stores">
                  Retail Store Locations
                </a>
              </li>
            </ul>
          </div>

          {/* Payment Badges */}
          <div>
            <h4 className="text-xs font-bold tracking-wider uppercase text-black mb-3">PAYMENT METHOD</h4>
            <p className="text-[11px] text-black mb-3">
              100% secure encrypted checkout with flexible local payment options.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {/* VISA Badge */}
              <div className="bg-zinc-50 border border-zinc-300 text-zinc-900 font-black px-2.5 py-1 rounded-xs text-xs tracking-tighter">
                VISA
              </div>
              {/* Mastercard Badge */}
              <div className="bg-zinc-50 border border-zinc-300 px-2 py-1 rounded-xs flex items-center">
                <span className="w-3.5 h-3.5 rounded-full bg-red-600 inline-block -mr-1"></span>
                <span className="w-3.5 h-3.5 rounded-full bg-amber-500 inline-block opacity-90"></span>
              </div>
              {/* PayFast Badge */}
              <div className="bg-zinc-50 border border-zinc-300 text-emerald-800 font-bold px-2 py-1 rounded-xs text-[11px]">
                PayFast
              </div>
              {/* Bank Transfer Badge */}
              <div className="bg-zinc-50 border border-zinc-300 text-black font-semibold px-2.5 py-1 rounded-xs text-[10px] tracking-wider uppercase">
                Bank Transfer
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
            <a className="hover:underline transition-colors" href="#terms">
              Terms and condition
            </a>
            <a className="hover:underline transition-colors" href="#privacy">
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
