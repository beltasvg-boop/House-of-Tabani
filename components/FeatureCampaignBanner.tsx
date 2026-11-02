'use client';

import React, { useState } from 'react';
import { ChevronDown, MessageCircle, Mail } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: 'Do you offer Cash on Delivery (COD)?',
    a: 'We do not offer COD at the moment.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Orders are usually delivered within 8-9 working days. Delivery timelines may vary depending on your location, product availability, and order volume.',
  },
  {
    q: 'Do you offer customisations?',
    a: 'Yes! Length customisations are available upon request. If you would like to adjust the length of your outfit, kindly mention it in the notes section at the time of placing your order.',
  },
  {
    q: 'Do you offer returns or exchanges?',
    a: 'All orders placed with the House of Tabani are final. We follow a strict No Return, No Exchange Policy. We kindly request you to review your order details, size, and product specifications carefully before placing your order.',
  },
  {
    q: 'What if I receive a damaged or incorrect item?',
    a: 'We want every House of Tabani experience to meet your expectations. If you receive a damaged or incorrect item, please contact us promptly with your order details and clear photographs so our team can assist you.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We currently accept bank transfers only. Please transfer the payment to the account number provided and share a screenshot of your payment receipt with us via WhatsApp or Instagram DM for order confirmation.',
  },
];

export default function FeatureCampaignBanner() {
  // Allow toggling open state; first two open by default for immediate discoverability
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1]);

  const toggleFAQ = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section
      className="border-y border-zinc-200 bg-zinc-50/70 py-16 sm:py-20"
      data-purpose="faq-section"
      id="chikankari"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" id="faq">
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-14">
          <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-2 block">
            Customer Help Center
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium tracking-tight text-zinc-900">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed">
            Everything you need to know about ordering, customizations, delivery timelines, and payment at House of Tabani.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndices.includes(index);
            return (
              <div
                key={index}
                className="bg-white border border-zinc-200/90 rounded-sm shadow-xs transition-all duration-200 hover:border-zinc-300 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-medium text-zinc-900 tracking-tight">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-black' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-zinc-100 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Help Banner */}
        <div className="mt-12 p-6 sm:p-8 bg-white border border-zinc-200 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-semibold text-zinc-900">Have questions that aren&apos;t answered here?</h4>
            <p className="text-xs text-zinc-500 mt-1">
              Our customer care team is available daily from {BUSINESS_CONFIG.workingHours}.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Hello House of Tabani, I have an inquiry regarding your collections.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp Us
            </a>
            <a
              href={`mailto:${BUSINESS_CONFIG.email}`}
              className="inline-flex items-center gap-2 border border-zinc-300 hover:border-black text-zinc-800 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              Email Care
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
