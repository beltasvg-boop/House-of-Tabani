import React from 'react';
import { RefreshCw, ShieldCheck, Truck, Banknote } from 'lucide-react';

export default function TrustMetricsSection() {
  return (
    <section className="relative py-20 bg-[#F4EFEA] border-b border-zinc-200" data-purpose="trust-metrics-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header Pill Badge */}
        <div className="inline-block bg-black text-white px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 shadow-xs">
          TRUSTED BY PAKISTAN
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 tracking-tight">
          Style that <span className="font-serif-italic font-normal">moves</span> with you.
        </h2>

        <p className="text-zinc-600 text-sm sm:text-base max-w-xl mx-auto mt-3 font-normal">
          Over 3 million Pakistanis shop HouseofTabani for quality they can feel — at prices that make sense.
        </p>

        {/* Metrics Grid Container (3 Cards on Paper Style Background) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 bg-white/80 backdrop-blur-xs border border-zinc-200 p-8 rounded-xs shadow-sm">
          <div className="border-b sm:border-b-0 sm:border-r border-zinc-200 pb-6 sm:pb-0 sm:px-4">
            <p className="text-3xl lg:text-4xl font-black text-zinc-950 tracking-tight">3.2M+</p>
            <p className="text-xs font-semibold text-zinc-800 uppercase tracking-wider mt-2">customers served</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">across Pakistan &amp; beyond</p>
          </div>

          <div className="border-b sm:border-b-0 sm:border-r border-zinc-200 pb-6 sm:pb-0 sm:px-4">
            <p className="text-3xl lg:text-4xl font-black text-zinc-950 tracking-tight">94%</p>
            <p className="text-xs font-semibold text-zinc-800 uppercase tracking-wider mt-2">satisfaction rate</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">based on post-purchase reviews</p>
          </div>

          <div className="sm:px-4">
            <p className="text-3xl lg:text-4xl font-black text-zinc-950 tracking-tight">200+</p>
            <p className="text-xs font-semibold text-zinc-800 uppercase tracking-wider mt-2">new styles weekly</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">from basics to designers</p>
          </div>
        </div>

        {/* Trust Features Strip */}
        <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs font-semibold text-zinc-700 mt-10">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-zinc-800" />
            <span>100% Quality inspected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-zinc-800" />
            <span>Delivery in 8-9 working days</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Banknote className="w-4 h-4 text-zinc-800" />
            <span>Direct bank transfer</span>
          </div>
        </div>

        <p className="text-[11px] font-semibold tracking-wider uppercase text-zinc-600 mt-4">
          Buy 3 items and get free delivery
        </p>
      </div>
    </section>
  );
}
