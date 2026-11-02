'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import AnnouncementBar from '@/components/AnnouncementBar';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { ArrowUpDown, RefreshCw } from 'lucide-react';

function ProductsCatalog() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const queryParam = searchParams.get('search') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [priceMax, setPriceMax] = useState<number>(10000);

  useEffect(() => {
    let isMounted = true;
    async function loadProducts() {
      try {
        setLoading(true);
        const res = await fetch('/api/products?t=' + Date.now(), { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data.products)) {
            setProducts(data.products);
          }
        }
      } catch (e) {
        console.error('Error fetching catalog products:', e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = [
    { id: 'all', label: 'All Collections' },
    { id: 'women', label: 'Women' },
    { id: 'men', label: 'Men' },
    { id: 'scents', label: 'Scents' },
    { id: 'chinese-button-sets', label: 'Chinese Button Sets' },
    { id: 'the-debut', label: 'The Debut' },
    { id: 'everyday-essentials', label: 'Everyday Essentials' },
    { id: 'chikankari', label: 'Chikankari' },
    { id: 'top-10', label: 'Top 10' },
  ];

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category match: checks main category or assigned category list from Google Sheets
      if (selectedCategory !== 'all') {
        const normSelected = selectedCategory.toLowerCase().replace(/[\s_-]+/g, '');
        const normCat = item.category.toLowerCase().replace(/[\s_-]+/g, '');
        const matchMain = normCat === normSelected;
        const matchCats = item.categories?.some(
          (c) => c.toLowerCase().replace(/[\s_-]+/g, '') === normSelected
        );
        if (!matchMain && !matchCats) {
          return false;
        }
      }
      // Search match
      if (queryParam.trim()) {
        const q = queryParam.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesSubtitle = item.subtitle?.toLowerCase().includes(q);
        const matchesCat = item.category?.toLowerCase().includes(q);
        const matchesId = item.id?.toLowerCase().includes(q);
        if (!matchesName && !matchesSubtitle && !matchesCat && !matchesId) return false;
      }
      // Price limit
      if (item.price > priceMax) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return (a.featuredTop10Rank || 99) - (b.featuredTop10Rank || 99);
    });
  }, [products, selectedCategory, queryParam, priceMax, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <SiteHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-zinc-400 mb-6 uppercase tracking-wider">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <span>/</span>
          <span className="text-zinc-900 font-semibold">
            {categories.find((c) => c.id === selectedCategory)?.label || 'Collections'}
          </span>
          {queryParam && (
            <>
              <span>/</span>
              <span className="text-zinc-600">Search: &ldquo;{queryParam}&rdquo;</span>
            </>
          )}
        </div>

        {/* Page Title & Category Tabs Bar */}
        <div className="border-b border-zinc-200 pb-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
                {categories.find((c) => c.id === selectedCategory)?.label || 'All Collections'}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                Showing {filteredProducts.length} items designed with refined silhouettes and premium fabrics
              </p>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-3">
              <label htmlFor="sort-select" className="text-xs font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>Sort by:</span>
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-bold border border-zinc-300 rounded-xs py-1.5 px-3 bg-white text-zinc-800 focus:outline-none focus:border-black"
              >
                <option value="featured">Featured / Top Sellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-6 text-xs font-bold uppercase tracking-wider">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xs transition-colors whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-black text-white'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 py-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="animate-pulse flex flex-col space-y-3">
                <div className="bg-zinc-100 aspect-[3/4.2] rounded-xs w-full"></div>
                <div className="h-3 bg-zinc-100 rounded w-1/3"></div>
                <div className="h-4 bg-zinc-100 rounded w-3/4"></div>
                <div className="h-3 bg-zinc-100 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-zinc-50 border border-zinc-200 rounded-xs">
            <h3 className="text-base font-bold text-zinc-900">No products found</h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
              We couldn&apos;t find any items matching your current filters. Try resetting the category or search query.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setPriceMax(7000);
              }}
              className="mt-4 px-5 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-zinc-400">Loading catalog...</div>}>
      <ProductsCatalog />
    </Suspense>
  );
}
