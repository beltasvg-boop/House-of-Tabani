import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function FeatureCampaignBanner() {
  return (
    <section className="border-y border-zinc-200 bg-white" data-purpose="chikankari-feature-banner" id="chikankari">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        {/* Left Photography Container */}
        <div className="relative h-[420px] md:h-[620px] overflow-hidden bg-zinc-100">
          <Image
            alt="Pakistan Favorite Chikankari Collection"
            className="w-full h-full object-cover object-center"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhfFacQYDrAk1CSWxY5L-W0_jjOnwCNOTydv0SynNXXZxqFqLEiB-777L9o6scYivHCRV0cowSPmcJWK488CVzKJI5zCgRlqzlDonCH_4zaeBhMD3bKUO0AqPWYXfDG8trfb-illmUAvMfwdjNm_t4QmiiWpzHRehGDr7SBUXesY1AWtxAkNMfkA1rrcjK-41_k30hFkYKmiUkFsZkOLwtx3N6X8sUzPJuLzVU2cjy2e4zRF86F89bJmSF1x996hHfjw"
            fill
            referrerPolicy="no-referrer"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Right Text Block (Crisp Editorial Spacing) */}
        <div className="p-8 sm:p-14 lg:p-20 flex flex-col justify-center">
          <div className="max-w-md">
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-2 block">
              Instant classics
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 leading-snug">
              Pakistan&apos;s Favorite Chikankari, Almost Gone
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base font-normal mt-4 leading-relaxed">
              Thousands have already shopped this season&apos;s chikankari edit. Limited pieces left — don&apos;t miss your size.
            </p>
            <div className="mt-8">
              <Link
                className="inline-block bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors rounded-xs shadow-sm"
                href="/products/chikankari-1"
              >
                Shop now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
