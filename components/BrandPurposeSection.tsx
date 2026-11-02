import React from 'react';

export default function BrandPurposeSection() {
  return (
    <section className="py-16 bg-[#dcbbc4] text-black" data-purpose="brand-purpose-statement">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xl sm:text-2xl font-serif font-medium tracking-tight text-black mb-4">
          House of Tabani
        </h2>
        <p className="text-sm sm:text-base text-black leading-relaxed font-normal">
          Born from years of dreams, creativity, and a passion for fashion, House of Tabani is a vision brought to life. Rooted in thoughtful design and refined craftsmanship, we create timeless pieces that celebrate individuality and elegance.
          <span className="block mt-4 italic text-black font-serif text-sm sm:text-base">
            &ldquo;Thoughtfully designed. Made to be cherished.&rdquo;
          </span>
        </p>
      </div>
    </section>
  );
}
