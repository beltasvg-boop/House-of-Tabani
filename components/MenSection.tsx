'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from './ProductCard';
import { Product } from '@/types';
import { PRODUCTS } from '@/data/products';

export default function MenSection() {
  const [activeTab, setActiveTab] = useState<'Ready To Wear' | 'Polo Shirts' | 'T-Shirts' | 'Unstitched'>('Ready To Wear');
  const [allProducts, setAllProducts] = useState<Product[]>(PRODUCTS);

  useEffect(() => {
    let isMounted = true;
    async function loadDynamic() {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data.products) && data.products.length > 0) {
            setAllProducts(data.products);
          }
        }
      } catch (e) {
        console.error('Failed to load dynamic products in MenSection:', e);
      }
    }
    loadDynamic();
    return () => {
      isMounted = false;
    };
  }, []);

  const tabs: Array<'Ready To Wear' | 'Polo Shirts' | 'T-Shirts' | 'Unstitched'> = [
    'Ready To Wear',
    'Polo Shirts',
    'T-Shirts',
    'Unstitched',
  ];

  // Primary 3 showcase products for Men from dynamic catalog
  const menCandidates = allProducts.filter(
    (p) =>
      p.category.toLowerCase() === 'men' ||
      p.categories?.some((c) => c.toLowerCase() === 'men')
  );

  const tabFiltered = menCandidates.filter(
    (p) => p.subCategory?.toLowerCase() === activeTab.toLowerCase()
  );

  const menProducts = (tabFiltered.length > 0 ? tabFiltered : menCandidates).slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-zinc-50/70 border-t border-zinc-200/60" data-purpose="men-showcase" id="men">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Subtitle & Tab Navigation */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Men</h2>
          <p className="text-zinc-500 text-sm mt-1">Colour-fast threads — no bleeding guaranteed</p>

          {/* Category Shortcut Filter Tabs */}
          <div className="flex items-center justify-center gap-6 mt-6 uppercase text-xs font-bold tracking-wider">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-1 transition-all ${
                  activeTab === tab
                    ? 'text-black border-b-2 border-black font-extrabold'
                    : 'text-zinc-400 hover:text-zinc-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {/* 3 Merchandised Product Cards */}
          {menProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {/* Discovery Card 4 */}
          <div className="relative aspect-[3/4.2] overflow-hidden group">
            <Image
              alt="Discover More Men Collection"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBw8wAhNsBxMQyofRToePCBgMHZZBVIvy-Me9Pf9TQD6nMWuuXZnNNKMokYs8guiMW7sVQWmGA3Jk2BJF1LvwodH1RvyjeyOPErT1ndjJ7x0gDzTWZngdVAXbS6murcUSAL0mgh_tDVebleBqPmyexfXvLOdbPqZ1wbPmmUjaJ8kJSpbP7XcAFMICUQKcTkDSa82RHwc28o8VtzuQqtv_lUXsds7YKehbXXG1ZD82r12ArRzwiGQlwpzIlwaVe5HiI2Rg"
              fill
              className="object-cover filter blur-xs scale-105"
              referrerPolicy="no-referrer"
              sizes="(max-width: 640px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-center text-white">
              <p className="text-sm font-semibold tracking-wide flex items-center gap-1.5 mb-3">
                <span>Discover 250 More</span>
                <span className="text-base font-normal">↗</span>
              </p>
              <Link
                className="bg-white text-zinc-900 px-6 py-2 rounded-xs text-xs font-bold uppercase tracking-wider hover:bg-zinc-100 transition-all shadow-md"
                href="/products?category=men"
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
