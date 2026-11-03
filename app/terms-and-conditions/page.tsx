import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import AnnouncementBar from '@/components/AnnouncementBar';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { FileText, Shield, ArrowLeft, HelpCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';

export const metadata: Metadata = {
  title: 'Terms and Conditions | House of Tabani',
  description: 'Terms and conditions for browsing, purchasing, and placing orders on House of Tabani.',
};

export default function TermsAndConditionsPage() {
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
              Legal &amp; Policy
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-zinc-900 tracking-tight">
              Terms &amp; Conditions
            </h1>
            <p className="mt-3 text-sm text-zinc-600 max-w-xl mx-auto">
              Please read these terms and conditions carefully prior to making a purchase or using our services.
            </p>
          </div>

          {/* Quick Notice Banner */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-sm p-5 mb-10 flex items-start gap-3 text-xs text-zinc-700">
            <FileText className="w-5 h-5 text-zinc-900 flex-shrink-0 mt-0.5" />
            <p>
              By accessing our website, placing an order, or transferring payment, you acknowledge and agree to abide by these Terms and Conditions along with our Delivery Policy and Return &amp; Exchange Policy.
            </p>
          </div>

          {/* Terms Content Sections */}
          <div className="space-y-10 text-sm leading-relaxed text-zinc-700">
            <section>
              <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 mb-3">
                1. General Overview
              </h2>
              <p>
                House of Tabani operates this website to provide an online platform for purchasing premium pret, eastern wear, and curated fashion collections. Throughout the site, the terms &ldquo;we&rdquo;, &ldquo;us&rdquo;, and &ldquo;our&rdquo; refer to House of Tabani.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 mb-3">
                2. Products, Pricing &amp; Sizing
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  All product prices are quoted in Pakistani Rupees (PKR) and are inclusive of standard local taxes where applicable.
                </li>
                <li>
                  Prices are subject to change without prior notice; however, completed and confirmed orders will not be affected by subsequent price alterations.
                </li>
                <li>
                  We make every effort to display garment colors, embroidery nuances, and fabric textures accurately. Slight color variations may occur due to photographic lighting or individual screen calibrations.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 mb-3">
                3. Order Placement &amp; Payment Verification
              </h2>
              <p className="mb-3">
                We currently accept <strong>bank transfers only</strong>. Cash on Delivery (COD) is not offered at this time.
              </p>
              <p>
                To confirm your order, customers must transfer the designated amount to the official bank account provided at checkout and share a screenshot of the payment receipt via WhatsApp (+92 325 2267688) or Instagram DM (@houseoftabani). Orders will only proceed to processing and tailoring once payment is verified.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 mb-3">
                4. Strict No Return, No Exchange Policy
              </h2>
              <p>
                All sales at House of Tabani are final. As stated in our Return &amp; Exchange Policy, we follow a strict No Return, No Exchange policy. Please consult our detailed Size Chart and product descriptions before finalizing your order. In the unlikely event of receiving a damaged or incorrect piece, please contact us within 48 hours of delivery.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 mb-3">
                5. Customisations
              </h2>
              <p>
                Length adjustments are available upon request. Customers must specify their custom length in the order notes during checkout or immediately inform our customer care team via WhatsApp. Customised items cannot be cancelled, returned, or exchanged.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 mb-3">
                6. Delivery Timelines
              </h2>
              <p>
                Standard delivery timeline is <strong>8-9 working days</strong> across Pakistan. Delivery times may vary during public holidays, strikes, adverse weather conditions, or peak festive launches. House of Tabani is not liable for unforeseen transit delays incurred by third-party courier services.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 mb-3">
                7. Intellectual Property
              </h2>
              <p>
                All imagery, designs, graphics, branding, text, and materials featured on this site are the proprietary intellectual property of House of Tabani. Any unauthorized reproduction, redistribution, or commercial use is strictly prohibited.
              </p>
            </section>

            <section className="bg-zinc-50 border border-zinc-200 rounded-sm p-6">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-zinc-900 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-zinc-900 mb-1">Questions regarding our terms?</h3>
                  <p className="text-xs text-zinc-600 mb-3">
                    If you require clarification on any of our terms, please feel free to reach out to us:
                  </p>
                  <div className="flex flex-wrap gap-5 text-xs font-medium">
                    <a href={`mailto:${BUSINESS_CONFIG.email}`} className="text-black hover:underline">
                      Email: {BUSINESS_CONFIG.email}
                    </a>
                    <a href={`tel:${BUSINESS_CONFIG.callPhone}`} className="text-black hover:underline font-mono">
                      Phone / WhatsApp: {BUSINESS_CONFIG.displayPhone}
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
