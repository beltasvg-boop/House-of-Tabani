'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from './ProductCard';
import { Product } from '@/types';
import { PRODUCTS } from '@/data/products';

export default function WomenSection() {
  const [activeTab, setActiveTab] = useState<'Ready To Wear' | 'Unstitched' | 'West' | 'Dresses'>('Ready To Wear');
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
        console.error('Failed to load dynamic products in WomenSection:', e);
      }
    }
    loadDynamic();
    return () => {
      isMounted = false;
    };
  }, []);

  const tabs: Array<'Ready To Wear' | 'Unstitched' | 'West' | 'Dresses'> = [
    'Ready To Wear',
    'Unstitched',
    'West',
    'Dresses',
  ];

  // Primary 3 showcase products for Women from dynamic catalog
  const womenCandidates = allProducts.filter(
    (p) =>
      p.category.toLowerCase() === 'women' ||
      p.categories?.some((c) => c.toLowerCase() === 'women')
  );

  const tabFiltered = womenCandidates.filter(
    (p) => p.subCategory?.toLowerCase() === activeTab.toLowerCase()
  );

  const womenProducts = (tabFiltered.length > 0 ? tabFiltered : womenCandidates).slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-white" data-purpose="women-showcase" id="women">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Subtitle & Tab Navigation */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Women</h2>
          <p className="text-zinc-500 text-sm mt-1">Design you won&apos;t find anywhere else</p>

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
          {womenProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {/* Discovery Card 4 (Faithful to Screenshot Discover 1140 More Card) */}
          <div className="relative aspect-[3/4.2] overflow-hidden group">
            <Image
              alt="Discover More Women Collection"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSt89tVB7_HdpELpn482Og54RQYDb-DTvSlpgDFGi6pWUeYLDf8PzvKoJk0vXGOysKfBBUyTMH82uhhJA_2Wp9wSFbexlCILMnhc_Hzo7fUGEqvuEQK4UObGHiDBxia4aQ0ViQCrtqGiPYMjGNrflfLMghI8HMfXX4alDQA2cQZ8vsAEpAAqHtUD7JGW6xMZm8SFIGv753ijqg4rsOWdlXaPTae63aE1VTfnYXIgI4cATTjCSH_-4d8Qcs03x8sWCu0w"
              fill
              className="object-cover filter blur-xs scale-105"
              referrerPolicy="no-referrer"
              sizes="(max-width: 640px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-center text-white">
              <p className="text-sm font-semibold tracking-wide flex items-center gap-1.5 mb-3">
                <span>Discover 1140 More</span>
                <span className="text-base font-normal">↗</span>
              </p>
              <Link
                className="bg-white text-zinc-900 px-6 py-2 rounded-xs text-xs font-bold uppercase tracking-wider hover:bg-zinc-100 transition-all shadow-md"
                href="/products?category=women"
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
