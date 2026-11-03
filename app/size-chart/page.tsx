import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import AnnouncementBar from '@/components/AnnouncementBar';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { Ruler, ArrowLeft, Scissors, HelpCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';

export const metadata: Metadata = {
  title: 'Size Chart & Measurement Guide | House of Tabani',
  description: 'Detailed measurement charts and sizing guide for House of Tabani pret, luxury formals, everyday basics, and eastern wear.',
};

export default function SizeChartPage() {
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
              House of Tabani Sizing Guide
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-zinc-900 tracking-tight">
              Size Chart &amp; Fit Guide
            </h1>
            <p className="mt-3 text-sm text-zinc-600 max-w-xl mx-auto">
              Find your ideal fit. All measurements are provided in inches. Custom length adjustments are available on request.
            </p>
          </div>

          {/* Women's Standard Size Chart */}
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-4">
              <Ruler className="w-5 h-5 text-zinc-900" />
              <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900">
                Women&apos;s Pret &amp; Kurta Size Chart (Inches)
              </h2>
            </div>
            <div className="overflow-x-auto border border-zinc-200 rounded-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50 text-zinc-900 font-bold border-b border-zinc-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Chest</th>
                    <th className="py-3 px-4">Shoulder</th>
                    <th className="py-3 px-4">Waist</th>
                    <th className="py-3 px-4">Hip</th>
                    <th className="py-3 px-4">Standard Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 text-zinc-700">
                  <tr className="hover:bg-zinc-50/50">
                    <td className="py-3 px-4 font-bold text-zinc-900">Extra Small (XS)</td>
                    <td className="py-3 px-4">36&quot;</td>
                    <td className="py-3 px-4">13.5&quot;</td>
                    <td className="py-3 px-4">32&quot;</td>
                    <td className="py-3 px-4">38&quot;</td>
                    <td className="py-3 px-4">42&quot;</td>
                  </tr>
                  <tr className="hover:bg-zinc-50/50">
                    <td className="py-3 px-4 font-bold text-zinc-900">Small (S)</td>
                    <td className="py-3 px-4">38&quot;</td>
                    <td className="py-3 px-4">14&quot;</td>
                    <td className="py-3 px-4">34&quot;</td>
                    <td className="py-3 px-4">40&quot;</td>
                    <td className="py-3 px-4">43&quot;</td>
                  </tr>
                  <tr className="hover:bg-zinc-50/50">
                    <td className="py-3 px-4 font-bold text-zinc-900">Medium (M)</td>
                    <td className="py-3 px-4">41&quot;</td>
                    <td className="py-3 px-4">14.5&quot;</td>
                    <td className="py-3 px-4">37&quot;</td>
                    <td className="py-3 px-4">43&quot;</td>
                    <td className="py-3 px-4">44&quot;</td>
                  </tr>
                  <tr className="hover:bg-zinc-50/50">
                    <td className="py-3 px-4 font-bold text-zinc-900">Large (L)</td>
                    <td className="py-3 px-4">44&quot;</td>
                    <td className="py-3 px-4">15&quot;</td>
                    <td className="py-3 px-4">40&quot;</td>
                    <td className="py-3 px-4">46&quot;</td>
                    <td className="py-3 px-4">45&quot;</td>
                  </tr>
                  <tr className="hover:bg-zinc-50/50">
                    <td className="py-3 px-4 font-bold text-zinc-900">Extra Large (XL)</td>
                    <td className="py-3 px-4">47&quot;</td>
                    <td className="py-3 px-4">16&quot;</td>
                    <td className="py-3 px-4">43&quot;</td>
                    <td className="py-3 px-4">49&quot;</td>
                    <td className="py-3 px-4">46&quot;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Men's Size Chart */}
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-4">
              <Ruler className="w-5 h-5 text-zinc-900" />
              <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900">
                Men&apos;s Kurta &amp; Polos Size Chart (Inches)
              </h2>
            </div>
            <div className="overflow-x-auto border border-zinc-200 rounded-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50 text-zinc-900 font-bold border-b border-zinc-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Chest</th>
                    <th className="py-3 px-4">Shoulder</th>
                    <th className="py-3 px-4">Collar</th>
                    <th className="py-3 px-4">Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 text-zinc-700">
                  <tr className="hover:bg-zinc-50/50">
                    <td className="py-3 px-4 font-bold text-zinc-900">Small (S)</td>
                    <td className="py-3 px-4">40&quot;</td>
                    <td className="py-3 px-4">17.5&quot;</td>
                    <td className="py-3 px-4">15&quot;</td>
                    <td className="py-3 px-4">40&quot;</td>
                  </tr>
                  <tr className="hover:bg-zinc-50/50">
                    <td className="py-3 px-4 font-bold text-zinc-900">Medium (M)</td>
                    <td className="py-3 px-4">43&quot;</td>
                    <td className="py-3 px-4">18.5&quot;</td>
                    <td className="py-3 px-4">15.5&quot;</td>
                    <td className="py-3 px-4">42&quot;</td>
                  </tr>
                  <tr className="hover:bg-zinc-50/50">
                    <td className="py-3 px-4 font-bold text-zinc-900">Large (L)</td>
                    <td className="py-3 px-4">46&quot;</td>
                    <td className="py-3 px-4">19.5&quot;</td>
                    <td className="py-3 px-4">16.5&quot;</td>
                    <td className="py-3 px-4">44&quot;</td>
                  </tr>
                  <tr className="hover:bg-zinc-50/50">
                    <td className="py-3 px-4 font-bold text-zinc-900">Extra Large (XL)</td>
                    <td className="py-3 px-4">49&quot;</td>
                    <td className="py-3 px-4">20.5&quot;</td>
                    <td className="py-3 px-4">17.5&quot;</td>
                    <td className="py-3 px-4">45&quot;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Customisation Callout */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-sm p-6 mb-10 flex items-start gap-4">
            <Scissors className="w-5 h-5 text-zinc-900 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 mb-1">
                Custom Length Adjustments
              </h3>
              <p className="text-xs text-zinc-700 leading-relaxed">
                Looking for a specific shirt length? Length customisations are gladly accommodated upon request. Simply state your desired length in the order notes during checkout, or message us directly on WhatsApp with your Order ID.
              </p>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
