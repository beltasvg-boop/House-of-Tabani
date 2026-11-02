import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroCampaignBanner() {
  return (
    <section
      className="w-full bg-[#EDE8E1] border-b border-zinc-200 overflow-hidden"
      data-purpose="campaign-banner"
      style={{ backgroundColor: '#e4ddd3' }}
    >
      <Link className="block w-full" href="/products?category=everyday-essentials">
        <div className="relative w-full max-w-[1920px] mx-auto aspect-[2216/710]">
          <Image
            alt="Everyday Basics - House of Tabani"
            className="w-full h-auto block object-cover"
            src="/assets/aistudio/Banner_57c0041a.jpeg"
            fill
            priority
            sizes="100vw"
            style={{ imageRendering: 'crisp-edges' }}
          />
        </div>
      </Link>
    </section>
  );
}
