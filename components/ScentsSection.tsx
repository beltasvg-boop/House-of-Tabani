'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from './ProductCard';
import { Product } from '@/types';
import { PRODUCTS } from '@/data/products';

export default function ScentsSection() {
  const [activeTab, setActiveTab] = useState<'For Her' | 'For Him'>('For Her');
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
        console.error('Failed to load dynamic products in ScentsSection:', e);
      }
    }
    loadDynamic();
    return () => {
      isMounted = false;
    };
  }, []);

  // Primary 3 showcase products for Scents from dynamic catalog
  const scentsCandidates = allProducts.filter(
    (p) =>
      p.category.toLowerCase() === 'scents' ||
      p.categories?.some((c) => c.toLowerCase() === 'scents')
  );

  const tabFiltered = scentsCandidates.filter(
    (p) => p.subCategory?.toLowerCase() === activeTab.toLowerCase()
  );

  const scentsProducts = (tabFiltered.length > 0 ? tabFiltered : scentsCandidates).slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-white" data-purpose="scents-showcase" id="scents">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Subtitle & Tab Navigation */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Scents</h2>
          <p className="text-zinc-500 text-sm mt-1">Too pretty to hide in a drawer</p>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-center gap-6 mt-6 uppercase text-xs font-bold tracking-wider">
            <button
              onClick={() => setActiveTab('For Her')}
              className={`pb-1 transition-all ${
                activeTab === 'For Her'
                  ? 'text-black border-b-2 border-black font-extrabold'
                  : 'text-zinc-400 hover:text-zinc-700'
              }`}
            >
              For Her
            </button>
            <button
              onClick={() => setActiveTab('For Him')}
              className={`pb-1 transition-all ${
                activeTab === 'For Him'
                  ? 'text-black border-b-2 border-black font-extrabold'
                  : 'text-zinc-400 hover:text-zinc-700'
              }`}
            >
              For Him
            </button>
          </div>
        </div>

        {/* 4-Column Scents Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {/* 3 Merchandised Scent Cards */}
          {scentsProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {/* Discovery Card 4 */}
          <div className="relative aspect-[3/4.2] overflow-hidden group">
            <Image
              alt="Discover More Fragrances"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAX2W1CkP7elImaC8-NF0Zommi-9I79v8S02ZPSq3u7ddmgEiipvqm84voOhQmMEF8BUapLoANruqhYn8Rji0FLzKW8OjE4F4bGoyRsIcOYioOTVcoA97dG8TFTfRBb4ZstQ7woJZVgTWv3Nru8T82ypEtmtBCZklPaObkOJkkA488qTM0NC_nKC43WTmxtAPoQRCkgwq_1cPEFJ1bSDXBy9AXIzT7fIsADIp8-mUqQI34X2q_TlxV"
              fill
              className="object-cover filter blur-xs scale-105"
              referrerPolicy="no-referrer"
              sizes="(max-width: 640px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-center text-white">
              <p className="text-sm font-semibold tracking-wide flex items-center gap-1.5 mb-3">
                <span>Discover 10 More</span>
                <span className="text-base font-normal">↗</span>
              </p>
              <Link
                className="bg-white text-zinc-900 px-6 py-2 rounded-xs text-xs font-bold uppercase tracking-wider hover:bg-zinc-100 transition-all shadow-md"
                href="/products?category=scents"
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
