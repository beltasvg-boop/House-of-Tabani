import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import AnnouncementBar from '@/components/AnnouncementBar';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { Truck, Clock, ShieldCheck, HelpCircle, ArrowLeft } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';

export const metadata: Metadata = {
  title: 'Delivery Policy | House of Tabani',
  description: 'Learn about House of Tabani delivery timelines, shipping rates across Pakistan, order tracking, and delivery procedures.',
};

export default function DeliveryPolicyPage() {
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
              Delivery Policy
            </h1>
            <p className="mt-3 text-sm text-zinc-600 max-w-xl mx-auto">
              We strive to deliver your handcrafted luxury pret and everyday basics safely and reliably across Pakistan.
            </p>
          </div>

          {/* Quick Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="border border-zinc-200 rounded-sm p-5 bg-zinc-50/50">
              <Clock className="w-6 h-6 text-zinc-800 mb-3" />
              <h2 className="font-semibold text-sm text-zinc-900 mb-1">8 - 9 Working Days</h2>
              <p className="text-xs text-zinc-600">Standard delivery timeline nationwide for unstitched &amp; pret outfits.</p>
            </div>
            <div className="border border-zinc-200 rounded-sm p-5 bg-zinc-50/50">
              <Truck className="w-6 h-6 text-zinc-800 mb-3" />
              <h2 className="font-semibold text-sm text-zinc-900 mb-1">Free Delivery (3+ Items)</h2>
              <p className="text-xs text-zinc-600">Automatic complimentary shipping when you purchase 3 or more articles.</p>
            </div>
            <div className="border border-zinc-200 rounded-sm p-5 bg-zinc-50/50">
              <ShieldCheck className="w-6 h-6 text-zinc-800 mb-3" />
              <h2 className="font-semibold text-sm text-zinc-900 mb-1">Tracked Couriers</h2>
              <p className="text-xs text-zinc-600">Dispatched via premium partner couriers with real-time tracking.</p>
            </div>
          </div>

          {/* Policy Detailed Sections */}
          <div className="space-y-10 text-sm leading-relaxed text-zinc-700">
            <section>
              <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 mb-3">
                1. Order Processing &amp; Dispatch Timelines
              </h2>
              <p className="mb-3">
                Orders are usually delivered within <strong>8-9 working days</strong> from order confirmation. Delivery timelines may vary depending on your location, product availability, order volume, and festive peak seasons.
              </p>
              <p>
                Each piece at House of Tabani is subjected to rigorous quality audits before dispatch. Once your bank transfer payment receipt has been verified via WhatsApp or Instagram DM, our tailoring and logistics teams immediately prepare your shipment.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 mb-3">
                2. Shipping Rates &amp; Free Shipping Policy
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Standard Nationwide Delivery:</strong> Flat rate of Rs. 250 across all major cities and remote zones of Pakistan.
                </li>
                <li>
                  <strong>Promotional Free Delivery:</strong> Place an order of 3 or more articles in a single checkout to automatically unlock Free Delivery across Pakistan.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 mb-3">
                3. Cash on Delivery (COD) Notice
              </h2>
              <p>
                Please note that <strong>we do not offer Cash on Delivery (COD) at the moment</strong>. All orders require full prepayment via bank transfer. Kindly share a screenshot of your transaction receipt with your Order ID to our official WhatsApp or Instagram DM for immediate confirmation.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 mb-3">
                4. Customised Lengths &amp; Tailoring
              </h2>
              <p>
                Orders with customized length requests may require an additional 1-2 working days for bespoke adjustment before handover to courier partners.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 mb-3">
                5. Tracking Your Shipment
              </h2>
              <p>
                As soon as your parcel is handed over to our courier partners (TCS, Leopards, or Call Courier), a tracking number will be shared with you via SMS/WhatsApp so you can monitor transit milestones in real-time.
              </p>
            </section>

            <section className="bg-zinc-50 border border-zinc-200 rounded-sm p-6">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-zinc-900 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-zinc-900 mb-1">Need help with your delivery status?</h3>
                  <p className="text-xs text-zinc-600 mb-3">
                    Our customer care team is available to assist you Monday through Saturday.
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs font-medium">
                    <a href={`mailto:${BUSINESS_CONFIG.email}`} className="text-black hover:underline">
                      Email: {BUSINESS_CONFIG.email}
                    </a>
                    <a href={`tel:${BUSINESS_CONFIG.callPhone}`} className="text-black hover:underline font-mono">
                      Phone: {BUSINESS_CONFIG.displayPhone}
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
