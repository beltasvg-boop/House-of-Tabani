import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import AnnouncementBar from '@/components/AnnouncementBar';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { Lock, ShieldCheck, ArrowLeft, EyeOff, UserCheck } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';

export const metadata: Metadata = {
  title: 'Privacy Policy | House of Tabani',
  description: 'How House of Tabani collects, uses, and safeguards your personal data and privacy.',
};

export default function PrivacyPolicyPage() {
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
              Privacy &amp; Data Protection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-zinc-900 tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-zinc-600 max-w-xl mx-auto">
              We respect your privacy and are committed to protecting the personal information you share with us.
            </p>
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="border border-zinc-200 rounded-sm p-5 bg-zinc-50/50">
              <ShieldCheck className="w-6 h-6 text-zinc-800 mb-3" />
              <h2 className="font-semibold text-sm text-zinc-900 mb-1">Data Confidentiality</h2>
              <p className="text-xs text-zinc-600">Your details are never rented, sold, or shared with third-party advertisers.</p>
            </div>
            <div className="border border-zinc-200 rounded-sm p-5 bg-zinc-50/50">
              <Lock className="w-6 h-6 text-zinc-800 mb-3" />
              <h2 className="font-semibold text-sm text-zinc-900 mb-1">Secure Transactions</h2>
              <p className="text-xs text-zinc-600">We do not store financial credentials or private banking PINs.</p>
            </div>
            <div className="border border-zinc-200 rounded-sm p-5 bg-zinc-50/50">
              <UserCheck className="w-6 h-6 text-zinc-800 mb-3" />
              <h2 className="font-semibold text-sm text-zinc-900 mb-1">Direct Communication</h2>
              <p className="text-xs text-zinc-600">Personal information is only used for order dispatch and customer support.</p>
            </div>
          </div>

          {/* Privacy Detailed Policy */}
          <div className="space-y-10 text-sm leading-relaxed text-zinc-700">
            <section>
              <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 mb-3">
                1. Information We Collect
              </h2>
              <p className="mb-3">
                When you browse our catalog, communicate with us, or place an order, we collect essential information required to fulfill your order, including:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Contact Information:</strong> Full name, telephone/mobile number, and email address.
                </li>
                <li>
                  <strong>Delivery Details:</strong> Complete shipping address, postal code, city, and nearest landmarks.
                </li>
                <li>
                  <strong>Order Correspondence:</strong> Communications over WhatsApp, Instagram Direct Message, email, and payment receipt screenshots.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 mb-3">
                2. How We Use Your Information
              </h2>
              <p className="mb-3">
                The information collected is strictly utilized for the following purposes:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Processing, packing, and dispatching your orders.</li>
                <li>Communicating shipping updates, tracking numbers, and delivery confirmation.</li>
                <li>Answering customer inquiries and sizing guidance.</li>
                <li>Improving our website usability, product offerings, and overall shopping experience.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 mb-3">
                3. Financial Security &amp; Payment Data
              </h2>
              <p>
                Because House of Tabani accepts payments via direct bank transfers, <strong>we do not capture, record, or store any sensitive banking credentials, passwords, or credit card numbers</strong> on our servers. Your banking credentials remain entirely between you and your financial institution.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 mb-3">
                4. Third-Party Sharing
              </h2>
              <p>
                We only disclose your delivery address and contact number to reputable domestic courier logistics companies (such as TCS, Leopards, or Call Courier) strictly for the purpose of doorstep delivery. We do not sell or trade your data to marketing agencies or unauthorized third parties.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 mb-3">
                5. Cookies &amp; Local Storage
              </h2>
              <p>
                Our store uses essential browser cookies and local storage solely to remember your shopping cart items, selected preferences, and ensure a seamless browsing session.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 mb-3">
                6. Contacting Us
              </h2>
              <p className="mb-3">
                If you have questions about our privacy practices, wish to update your contact details, or request deletion of your order records, please contact our team:
              </p>
              <div className="bg-zinc-50 border border-zinc-200 rounded-sm p-6 text-xs font-medium space-y-2">
                <p>
                  Email:{' '}
                  <a href={`mailto:${BUSINESS_CONFIG.email}`} className="text-black hover:underline">
                    {BUSINESS_CONFIG.email}
                  </a>
                </p>
                <p>
                  Phone / WhatsApp:{' '}
                  <a href={`tel:${BUSINESS_CONFIG.callPhone}`} className="text-black hover:underline font-mono">
                    {BUSINESS_CONFIG.displayPhone}
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
