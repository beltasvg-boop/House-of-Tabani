import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import AnnouncementBar from '@/components/AnnouncementBar';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { ShieldAlert, AlertCircle, ArrowLeft, RefreshCw, CheckCircle2, PhoneCall } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';

export const metadata: Metadata = {
  title: 'Return & Exchange Policy | House of Tabani',
  description: 'Understand the House of Tabani return and exchange policies, strict no return guidelines, and resolution procedures for damaged items.',
};

export default function ReturnAndExchangePolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900">
      <AnnouncementBar />
      <SiteHeader />

      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-xs text-zinc-500 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Home
            </Link>
          </div>

          {/* Page Header */}
          <div className="border-b border-zinc-200 pb-8 mb-10 text-center">
            <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-500 block mb-2">
              House of Tabani Customer Care
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-zinc-900 tracking-tight">
              Return &amp; Exchange Policy
            </h1>
            <p className="mt-3 text-sm text-zinc-600 max-w-xl mx-auto">
              Please review our policy carefully before placing your order.
            </p>
          </div>

          {/* Core Notice Banner */}
          <div className="bg-zinc-50 border-l-4 border-zinc-900 p-6 mb-12">
            <div className="flex items-start gap-4">
              <ShieldAlert className="w-6 h-6 text-zinc-900 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 mb-1">
                  Strict No Return, No Exchange Policy
                </h2>
                <p className="text-xs text-zinc-700 leading-relaxed">
                  All orders placed with House of Tabani are final. We follow a strict <strong>No Return, No Exchange Policy</strong>. We kindly request you to review your order details, size measurements, and product specifications carefully before completing payment.
                </p>
              </div>
            </div>
          </div>

          {/* Policy Details */}
          <div className="space-y-10 text-sm leading-relaxed text-zinc-700">
            <section>
              <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 mb-3">
                1. Order Finality
              </h2>
              <p className="mb-3">
                Every House of Tabani creation represents meticulous craftsmanship, thoughtful cutlines, and premium finishing. Due to the delicate nature of luxury fabrics, hand embellishments, and bespoke adjustments, we do not accept returns or exchanges for change of mind, incorrect size selection, or subjective preferences.
              </p>
              <p>
                We provide comprehensive size charts with chest, waist, hip, and length measurements to assist you in making informed choices prior to checkout.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 mb-3">
                2. Customised Lengths &amp; Bespoke Outfits
              </h2>
              <p>
                Pieces where length or tailoring customisations have been requested by the customer are personalized specifically for that order and are <strong>strictly non-returnable and non-exchangeable</strong> under any circumstances.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 mb-3">
                3. Damaged or Incorrect Items
              </h2>
              <p className="mb-3">
                We want every House of Tabani experience to meet your highest expectations. If, in rare circumstances, you receive a damaged, defective, or incorrect item:
              </p>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>
                  Notify our support team within <strong>48 hours</strong> of receiving the package.
                </li>
                <li>
                  Share clear, well-lit photographs or an unboxing video of the affected garment, along with the shipping bag and receipt.
                </li>
                <li>
                  Provide your official Order Number and contact details via WhatsApp (+92 325 2267688) or email (info@houseoftabani.com).
                </li>
              </ol>
              <p>
                Our quality assurance team will inspect the claim. If verified as an error on our part, we will promptly arrange a replacement or rectified garment at no additional expense to you.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 mb-3">
                4. Colour Disclaimer
              </h2>
              <p>
                Please note that product color may vary slightly due to photographic lighting sources or your monitor/mobile display calibration. Such slight variations do not qualify as defects or grounds for replacement.
              </p>
            </section>

            <section className="border border-zinc-200 rounded-sm p-6 bg-zinc-50/70">
              <div className="flex items-start gap-3">
                <PhoneCall className="w-5 h-5 text-zinc-900 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-zinc-900 mb-1">Contact Customer Support</h3>
                  <p className="text-xs text-zinc-600 mb-3">
                    Have any questions regarding sizing or policies? Reach out before placing your order.
                  </p>
                  <div className="flex flex-wrap gap-5 text-xs font-medium">
                    <a href={`mailto:${BUSINESS_CONFIG.email}`} className="text-black hover:underline">
                      Email: {BUSINESS_CONFIG.email}
                    </a>
                    <a href={`tel:${BUSINESS_CONFIG.callPhone}`} className="text-black hover:underline font-mono">
                      WhatsApp / Phone: {BUSINESS_CONFIG.displayPhone}
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
