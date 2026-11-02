'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { PRODUCTS } from '@/data/products';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Top10Collections() {
  const [products, setProducts] = useState<Product[]>(() => {
    return PRODUCTS.filter((p) => p.featuredTop10Rank || p.categories?.includes('top-10')).slice(0, 4);
  });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadDynamicTop10() {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data.products)) {
            const topList = (data.products as Product[])
              .filter((p) => p.featuredTop10Rank || p.categories?.includes('top-10'))
              .sort((a, b) => (a.featuredTop10Rank || 99) - (b.featuredTop10Rank || 99));
            if (topList.length > 0) {
              setProducts(topList);
            }
          }
        }
      } catch (err) {
        console.error('Failed to load dynamic top 10:', err);
      }
    }
    loadDynamicTop10();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-20 bg-white border-b border-zinc-100 relative" data-purpose="top-10-collections" id="top-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with navigation arrows */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
              Top 10 Collections Nationwide
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              aria-label="Previous collection"
              onClick={() => handleScroll('left')}
              className="w-9 h-9 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-600 hover:border-black hover:text-black transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              aria-label="Next collection"
              onClick={() => handleScroll('right')}
              className="w-9 h-9 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-600 hover:border-black hover:text-black transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Grid of Top Collections with Numbers behind cards */}
        <div
          ref={scrollContainerRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 relative overflow-x-auto no-scrollbar scroll-smooth"
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group relative flex flex-col focus:outline-none"
            >
              {/* Large Artistic Number Outline in Background */}
              <div className="absolute -bottom-6 left-2 text-outline-number z-0 select-none">
                {product.featuredTop10Rank}
              </div>

              <div className="relative z-10 aspect-[3/4] overflow-hidden rounded-md bg-zinc-100 shadow-sm">
                <Image
                  alt={product.name}
                  src={product.images[0]}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* Card Bottom Pill Overlay */}
                <div className="absolute inset-x-3 bottom-3 text-center">
                  <div className="glass-pill-dark text-white py-2 px-3 rounded shadow-md">
                    <p className="text-[10px] tracking-wider uppercase font-semibold text-zinc-300">
                      {product.top10Subtitle || product.subtitle}
                    </p>
                    <p className="text-xs font-bold uppercase tracking-wider">
                      {product.top10Title || 'Essential Pret'}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
