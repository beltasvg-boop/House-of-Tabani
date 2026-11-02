'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import { Search, ShoppingBag, Menu, X, User, ChevronDown } from 'lucide-react';

export default function SiteHeader() {
  const router = useRouter();
  const { itemCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [sizeGuideTab, setSizeGuideTab] = useState<'women' | 'men'>('women');
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [productsList, setProductsList] = useState<Product[]>([]);

  useEffect(() => {
    let isMounted = true;
    async function fetchDynamicSearchList() {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data.products)) {
            setProductsList(data.products);
          }
        }
      } catch (e) {
        console.error('Failed to load dynamic search items:', e);
      }
    }
    fetchDynamicSearchList();
    return () => {
      isMounted = false;
    };
  }, []);

  // Derive search results directly
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    const source = productsList.length > 0 ? productsList : PRODUCTS;
    return source.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subCategory?.toLowerCase().includes(q) ||
        p.subtitle?.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [searchQuery, productsList]);

  // Click outside search
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchFocused(false);
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200" data-purpose="site-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Trigger */}
          <button
            aria-label="Open mobile menu"
            className="lg:hidden p-2 text-zinc-700 hover:text-black focus:outline-none"
            type="button"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6 stroke-[1.8]" />
          </button>

          {/* Primary Brand Logo using provided wordmark */}
          <div className="flex-shrink-0 flex items-center">
            <Link aria-label="House of Tabani Home" className="block py-1 focus:outline-none" href="/">
              <Image
                alt="House of Tabani"
                className="h-10 md:h-12 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsp8GWvWrTGQRH1PFBrQbg7yn185_TPFaKLXhW-LqB9GfdpDIOR3_cDM7oVIM4D0lLrRias3PliFgZb1XoeLrmkaH8DOjvz4NzzkS0FZhIZETZyFMtuiozd1cks4GljUblKjtbjA0pjGgXYu8zJ1MbxvkxklMnmYZocmW5v6ipu5-p1Xens7SBzDv3NQIpoFllicCC7T38CBzl9-mZh6zFwe0zsJ7CQCOyvSd99_s3hx4D1e_8wV63"
                width={190}
                height={48}
                priority
                referrerPolicy="no-referrer"
              />
            </Link>
          </div>

          {/* Desktop Navigation Categories */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-bold tracking-widest uppercase text-zinc-800" data-purpose="desktop-nav">
            {/* Home */}
            <Link
              className="hover:text-black py-7 border-b-2 border-transparent hover:border-black transition-all"
              href="/"
            >
              home
            </Link>

            {/* Chinese Button Sets */}
            <Link
              className="hover:text-black py-7 border-b-2 border-transparent hover:border-black transition-all"
              href="/products?category=chinese-button-sets"
            >
              chinese button sets
            </Link>

            {/* The Debut */}
            <Link
              className="hover:text-black py-7 border-b-2 border-transparent hover:border-black transition-all"
              href="/products?category=the-debut"
            >
              the debut
            </Link>

            {/* Everyday Essentials */}
            <Link
              className="hover:text-black py-7 border-b-2 border-transparent hover:border-black transition-all"
              href="/products?category=everyday-essentials"
            >
              everyday essentials
            </Link>

            {/* Size Guide */}
            <button
              type="button"
              onClick={() => setSizeGuideOpen(true)}
              className="hover:text-black py-7 border-b-2 border-transparent hover:border-black transition-all text-zinc-600 hover:text-zinc-900 uppercase cursor-pointer"
            >
              size guide
            </button>
          </nav>

          {/* Right Utilities & Action Icons */}
          <div className="flex items-center space-x-5 sm:space-x-6 text-zinc-800" data-purpose="header-actions">
            {/* Search Input */}
            <div className="relative hidden sm:block" ref={searchContainerRef}>
              <form onSubmit={handleSearchSubmit}>
                <div className="flex items-center border border-zinc-200 rounded-full px-3.5 py-1.5 focus-within:border-black bg-zinc-50/70 transition-colors">
                  <Search className="w-4 h-4 text-zinc-400 mr-2 flex-shrink-0" />
                  <input
                    className="bg-transparent border-0 text-xs focus:ring-0 p-0 text-zinc-800 placeholder-zinc-400 w-36 lg:w-48 outline-none"
                    placeholder="Search kurtas, lawn, polos..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-zinc-400 hover:text-black ml-1 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </form>

              {/* Instant Search Suggestions Dropdown */}
              {searchFocused && searchResults.length > 0 && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-zinc-200 shadow-2xl rounded-sm py-2 z-50">
                  <div className="px-3 py-1.5 border-b border-zinc-100 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    <span>Products ({searchResults.length})</span>
                    <button
                      onClick={() => {
                        setSearchFocused(false);
                        router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
                      }}
                      className="text-black hover:underline"
                    >
                      See all
                    </button>
                  </div>
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      onClick={() => setSearchFocused(false)}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-zinc-50 transition-colors"
                    >
                      <div className="w-10 h-12 relative flex-shrink-0 bg-zinc-100 rounded-sm overflow-hidden">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-zinc-900 truncate">{product.name}</p>
                        <p className="text-[11px] text-zinc-500">{product.subtitle}</p>
                        <p className="text-xs font-bold text-zinc-900">Rs. {product.price.toLocaleString()}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* User Account with Dropdown */}
            <div className="relative group hidden sm:block">
              <button aria-label="Account" className="p-1 hover:text-black focus:outline-none">
                <User className="w-5 h-5 stroke-[1.8]" />
              </button>
              <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-zinc-200 shadow-xl rounded-sm py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all text-xs font-medium z-50">
                <div className="px-4 py-2 border-b border-zinc-100">
                  <p className="font-bold text-zinc-900">Sign in to account</p>
                  <p className="text-[10px] text-zinc-500">Track orders & faster WhatsApp checkout</p>
                </div>
                <Link className="block px-4 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-black" href="/checkout">
                  Express Checkout
                </Link>
                <Link className="block px-4 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-black" href="/products">
                  Explore Collections
                </Link>
                <a className="block px-4 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-black" href="#faqs">
                  Help & FAQs
                </a>
              </div>
            </div>

            {/* Shopping Bag with Counter Badge */}
            <button
              aria-label="Shopping Cart"
              className="relative p-1 hover:text-black focus:outline-none"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
              <span
                suppressHydrationWarning
                className="absolute -top-1 -right-1 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center transition-transform"
              >
                {itemCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col justify-between z-10">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-zinc-200">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <Image
                    alt="House of Tabani"
                    className="h-9 w-auto object-contain"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsp8GWvWrTGQRH1PFBrQbg7yn185_TPFaKLXhW-LqB9GfdpDIOR3_cDM7oVIM4D0lLrRias3PliFgZb1XoeLrmkaH8DOjvz4NzzkS0FZhIZETZyFMtuiozd1cks4GljUblKjtbjA0pjGgXYu8zJ1MbxvkxklMnmYZocmW5v6ipu5-p1Xens7SBzDv3NQIpoFllicCC7T38CBzl9-mZh6zFwe0zsJ7CQCOyvSd99_s3hx4D1e_8wV63"
                    width={160}
                    height={40}
                    referrerPolicy="no-referrer"
                  />
                </Link>
                <button
                  type="button"
                  className="p-1 text-zinc-500 hover:text-black"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="mt-4">
                <div className="flex items-center border border-zinc-200 rounded-full px-3 py-2 bg-zinc-50">
                  <Search className="w-4 h-4 text-zinc-400 mr-2 flex-shrink-0" />
                  <input
                    className="w-full bg-transparent border-0 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none"
                    placeholder="Search kurtas, lawn, polos..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>

              <nav className="mt-6 flex flex-col space-y-4 uppercase text-xs font-bold tracking-widest text-zinc-800">
                <Link
                  className="py-2 border-b border-zinc-100 hover:text-black"
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  className="py-2 border-b border-zinc-100 hover:text-black"
                  href="/products?category=chinese-button-sets"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Chinese Button Sets
                </Link>
                <Link
                  className="py-2 border-b border-zinc-100 hover:text-black"
                  href="/products?category=the-debut"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  The Debut
                </Link>
                <Link
                  className="py-2 border-b border-zinc-100 hover:text-black"
                  href="/products?category=everyday-essentials"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Everyday Essentials
                </Link>
                <button
                  type="button"
                  className="py-2 border-b border-zinc-100 hover:text-black text-left uppercase text-xs font-bold tracking-widest text-zinc-800"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSizeGuideOpen(true);
                  }}
                >
                  Size Guide
                </button>
                <Link
                  className="py-2 border-b border-zinc-100 hover:text-black"
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  All Collections
                </Link>
                <Link
                  className="py-2 border-b border-zinc-100 hover:text-black flex items-center justify-between"
                  href="/checkout"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Checkout</span>
                  <span suppressHydrationWarning className="font-mono text-zinc-500">({itemCount})</span>
                </Link>
              </nav>
            </div>

            <div className="pt-6 border-t border-zinc-200 text-xs text-zinc-500 space-y-2">
              <p className="font-semibold text-zinc-900">Need Assistance?</p>
              <p className="font-mono text-zinc-700">UAN: +92-21-38402072</p>
              <p className="text-[11px]">Mon-Sun 09:00 AM - 01:00 AM PST</p>
            </div>
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSizeGuideOpen(false)}
          />
          <div className="relative bg-white rounded-xs shadow-2xl max-w-2xl w-full p-6 sm:p-8 z-10 border border-zinc-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4 mb-6">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-zinc-900 uppercase">
                  House of Tabani Size Guide
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Standard sizing for Ready-To-Wear Pret, Kurtas &amp; Eastern Suits (all measurements in inches)
                </p>
              </div>
              <button
                type="button"
                className="p-1.5 text-zinc-400 hover:text-black rounded-full hover:bg-zinc-100 transition-colors"
                onClick={() => setSizeGuideOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category tabs */}
            <div className="flex gap-4 border-b border-zinc-200 mb-6 text-xs font-bold uppercase tracking-wider">
              <button
                type="button"
                onClick={() => setSizeGuideTab('women')}
                className={`pb-2.5 transition-colors ${
                  sizeGuideTab === 'women'
                    ? 'border-b-2 border-black text-black font-extrabold'
                    : 'text-zinc-400 hover:text-zinc-700'
                }`}
              >
                Women&apos;s Pret &amp; Kurtas
              </button>
              <button
                type="button"
                onClick={() => setSizeGuideTab('men')}
                className={`pb-2.5 transition-colors ${
                  sizeGuideTab === 'men'
                    ? 'border-b-2 border-black text-black font-extrabold'
                    : 'text-zinc-400 hover:text-zinc-700'
                }`}
              >
                Men&apos;s Eastern Wear
              </button>
            </div>

            {sizeGuideTab === 'women' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-zinc-200">
                  <thead className="bg-zinc-50 text-zinc-700 uppercase tracking-wider border-b border-zinc-200">
                    <tr>
                      <th className="p-3 font-bold border-r border-zinc-200">Size</th>
                      <th className="p-3 font-bold border-r border-zinc-200">Chest</th>
                      <th className="p-3 font-bold border-r border-zinc-200">Waist</th>
                      <th className="p-3 font-bold border-r border-zinc-200">Hip</th>
                      <th className="p-3 font-bold border-r border-zinc-200">Kurta Length</th>
                      <th className="p-3 font-bold">Trouser Length</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 text-zinc-800">
                    <tr className="hover:bg-zinc-50/70">
                      <td className="p-3 font-extrabold border-r border-zinc-200 bg-zinc-50">XS</td>
                      <td className="p-3 border-r border-zinc-200">36&quot;</td>
                      <td className="p-3 border-r border-zinc-200">32&quot;</td>
                      <td className="p-3 border-r border-zinc-200">38&quot;</td>
                      <td className="p-3 border-r border-zinc-200">38&quot;</td>
                      <td className="p-3">36&quot;</td>
                    </tr>
                    <tr className="hover:bg-zinc-50/70">
                      <td className="p-3 font-extrabold border-r border-zinc-200 bg-zinc-50">S</td>
                      <td className="p-3 border-r border-zinc-200">38&quot;</td>
                      <td className="p-3 border-r border-zinc-200">34&quot;</td>
                      <td className="p-3 border-r border-zinc-200">40&quot;</td>
                      <td className="p-3 border-r border-zinc-200">39&quot;</td>
                      <td className="p-3">37&quot;</td>
                    </tr>
                    <tr className="hover:bg-zinc-50/70">
                      <td className="p-3 font-extrabold border-r border-zinc-200 bg-zinc-50">M</td>
                      <td className="p-3 border-r border-zinc-200">40&quot;</td>
                      <td className="p-3 border-r border-zinc-200">36&quot;</td>
                      <td className="p-3 border-r border-zinc-200">42&quot;</td>
                      <td className="p-3 border-r border-zinc-200">40&quot;</td>
                      <td className="p-3">38&quot;</td>
                    </tr>
                    <tr className="hover:bg-zinc-50/70">
                      <td className="p-3 font-extrabold border-r border-zinc-200 bg-zinc-50">L</td>
                      <td className="p-3 border-r border-zinc-200">42&quot;</td>
                      <td className="p-3 border-r border-zinc-200">38&quot;</td>
                      <td className="p-3 border-r border-zinc-200">44&quot;</td>
                      <td className="p-3 border-r border-zinc-200">41&quot;</td>
                      <td className="p-3">39&quot;</td>
                    </tr>
                    <tr className="hover:bg-zinc-50/70">
                      <td className="p-3 font-extrabold border-r border-zinc-200 bg-zinc-50">XL</td>
                      <td className="p-3 border-r border-zinc-200">44&quot;</td>
                      <td className="p-3 border-r border-zinc-200">40&quot;</td>
                      <td className="p-3 border-r border-zinc-200">46&quot;</td>
                      <td className="p-3 border-r border-zinc-200">42&quot;</td>
                      <td className="p-3">40&quot;</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-zinc-200">
                  <thead className="bg-zinc-50 text-zinc-700 uppercase tracking-wider border-b border-zinc-200">
                    <tr>
                      <th className="p-3 font-bold border-r border-zinc-200">Size</th>
                      <th className="p-3 font-bold border-r border-zinc-200">Collar</th>
                      <th className="p-3 font-bold border-r border-zinc-200">Chest</th>
                      <th className="p-3 font-bold border-r border-zinc-200">Kameez Length</th>
                      <th className="p-3 font-bold">Shalwar Length</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 text-zinc-800">
                    <tr className="hover:bg-zinc-50/70">
                      <td className="p-3 font-extrabold border-r border-zinc-200 bg-zinc-50">S</td>
                      <td className="p-3 border-r border-zinc-200">14.5&quot;</td>
                      <td className="p-3 border-r border-zinc-200">40&quot;</td>
                      <td className="p-3 border-r border-zinc-200">40&quot;</td>
                      <td className="p-3">40&quot;</td>
                    </tr>
                    <tr className="hover:bg-zinc-50/70">
                      <td className="p-3 font-extrabold border-r border-zinc-200 bg-zinc-50">M</td>
                      <td className="p-3 border-r border-zinc-200">15.5&quot;</td>
                      <td className="p-3 border-r border-zinc-200">43&quot;</td>
                      <td className="p-3 border-r border-zinc-200">42&quot;</td>
                      <td className="p-3">41&quot;</td>
                    </tr>
                    <tr className="hover:bg-zinc-50/70">
                      <td className="p-3 font-extrabold border-r border-zinc-200 bg-zinc-50">L</td>
                      <td className="p-3 border-r border-zinc-200">16.5&quot;</td>
                      <td className="p-3 border-r border-zinc-200">46&quot;</td>
                      <td className="p-3 border-r border-zinc-200">44&quot;</td>
                      <td className="p-3">42&quot;</td>
                    </tr>
                    <tr className="hover:bg-zinc-50/70">
                      <td className="p-3 font-extrabold border-r border-zinc-200 bg-zinc-50">XL</td>
                      <td className="p-3 border-r border-zinc-200">17.5&quot;</td>
                      <td className="p-3 border-r border-zinc-200">49&quot;</td>
                      <td className="p-3 border-r border-zinc-200">45&quot;</td>
                      <td className="p-3">43&quot;</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-zinc-500">
              <p>Unsure about fit? Our stylists provide live consultation on WhatsApp.</p>
              <button
                type="button"
                onClick={() => setSizeGuideOpen(false)}
                className="bg-black text-white px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-zinc-800 transition-colors self-end sm:self-auto"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
