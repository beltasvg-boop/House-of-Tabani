'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import AnnouncementBar from '@/components/AnnouncementBar';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import ProductCard from '@/components/ProductCard';
import ProductImageCarousel from '@/components/ProductImageCarousel';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { BUSINESS_CONFIG } from '@/config/business';
import { getWhatsAppClickToChatUrl } from '@/lib/whatsapp';
import {
  Check,
  Truck,
  RefreshCw,
  ShieldCheck,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('Standard');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'description' | 'fabric' | 'shipping'>('description');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadProduct() {
      try {
        setLoading(true);
        const res = await fetch(`/api/products`);
        if (!res.ok) throw new Error('Failed to load products');
        const json = await res.json();
        const all: Product[] = json.products || [];
        const found = all.find((p) => p.id.toLowerCase() === id.toLowerCase());

        if (isMounted) {
          if (found) {
            setProduct(found);
            const inStockVariant = found.variants.find((v) => v.inStock);
            setSelectedSize(inStockVariant?.size || found.variants[0]?.size || 'Standard');

            // Related products
            const related = all
              .filter((p) => p.id !== found.id && (p.category === found.category || p.categories?.includes(found.category)))
              .slice(0, 4);
            setRelatedProducts(related);
          } else {
            setProduct(null);
          }
          setLoading(false);
        }
      } catch (err) {
        console.error('Error loading product:', err);
        if (isMounted) setLoading(false);
      }
    }

    loadProduct();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <AnnouncementBar />
        <SiteHeader />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-24 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Loading product details...</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const handleAddToCartAndCheckout = () => {
    setIsAdding(true);
    addItem(product, selectedSize, quantity, true);
  };

  const handleAddToCartOnly = () => {
    addItem(product, selectedSize, quantity, false);
  };

  const stylistQueryUrl = getWhatsAppClickToChatUrl(
    `Hello House of Tabani, I'm inquiring about "${product.name}" (SKU: ${product.id}). Is size ${selectedSize} available for immediate dispatch?`
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <SiteHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-xs text-zinc-400 mb-8 uppercase tracking-wider">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <span>/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-black">
            {product.category.replace(/-/g, ' ')}
          </Link>
          <span>/</span>
          <span className="text-zinc-900 font-semibold truncate max-w-xs">{product.name}</span>
        </div>

        {/* 2-Column Product Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Image Presentation with Multi-Image Carousel */}
          <div className="lg:col-span-7">
            <ProductImageCarousel
              images={product.images}
              productName={product.name}
              badge={product.badge}
            />
          </div>

          {/* Right Column: Merchandising Details & Purchasing Flow */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div className="border-b border-zinc-200 pb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 block mb-1">
                {product.subtitle}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight leading-snug">
                {product.name}
              </h1>

              {/* Price Display */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-2xl font-black text-zinc-950">
                  Rs. {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-zinc-400 line-through font-medium">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
                  Inclusive of all taxes
                </span>
              </div>
            </div>

            {/* Size / Variant Selector */}
            <div className="py-6 border-b border-zinc-200">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                  Select Size / Edition: <span className="text-black font-extrabold">{selectedSize}</span>
                </label>
                <span className="text-[11px] text-zinc-500 font-medium cursor-pointer hover:text-black underline">
                  Size Guide
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {product.variants.map((v) => {
                  const isSelected = selectedSize === v.size;
                  const isAvailable = v.inStock;

                  return (
                    <button
                      key={v.size}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => isAvailable && setSelectedSize(v.size)}
                      className={`min-w-12 h-11 px-3 text-xs font-bold rounded-xs transition-all border flex items-center justify-center ${
                        isSelected
                          ? 'border-black bg-black text-white shadow-xs'
                          : isAvailable
                          ? 'border-zinc-300 bg-white text-zinc-800 hover:border-black'
                          : 'border-zinc-200 bg-zinc-100 text-zinc-400 cursor-not-allowed line-through'
                      }`}
                    >
                      {v.size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="py-6 border-b border-zinc-200 flex items-center gap-6">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                Quantity:
              </label>
              <div className="flex items-center border border-zinc-300 rounded-xs bg-zinc-50">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center text-zinc-600 hover:bg-zinc-200 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-xs font-bold text-zinc-900">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-9 flex items-center justify-center text-zinc-600 hover:bg-zinc-200 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Action Buttons: Primary Add & Checkout Flow */}
            <div className="pt-6 space-y-3">
              {/* Primary Add to Cart button (Takes directly to Checkout as per brief flow) */}
              <button
                type="button"
                onClick={handleAddToCartAndCheckout}
                disabled={isAdding}
                className="w-full bg-black text-white py-4 px-6 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all rounded-xs shadow-md flex items-center justify-center gap-2 group"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart &amp; Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary Add & Keep Shopping */}
              <button
                type="button"
                onClick={handleAddToCartOnly}
                className="w-full bg-white text-zinc-900 border border-zinc-300 py-3 px-6 text-xs font-bold uppercase tracking-widest hover:border-black transition-colors rounded-xs"
              >
                Add to Bag &amp; Keep Browsing
              </button>

              {/* Instant WhatsApp Stylist Chat Inquiry */}
              <a
                href={stylistQueryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-50 text-emerald-800 border border-emerald-200 py-2.5 px-4 text-xs font-semibold rounded-xs hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>Questions about sizing? Inquire on WhatsApp</span>
              </a>
            </div>

            {/* Shipping & Trust Value Badges */}
            <div className="mt-8 pt-6 border-t border-zinc-200 space-y-3 text-xs text-zinc-600">
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-zinc-900 flex-shrink-0" />
                <span>
                  <strong>Buy 3 items and get Free Delivery</strong> across Pakistan
                </span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="w-4 h-4 text-zinc-900 flex-shrink-0" />
                <span>Easy 30-day exchange nationwide</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-zinc-900 flex-shrink-0" />
                <span>Cash on delivery &amp; official WhatsApp checkout support</span>
              </div>
            </div>

            {/* Information Accordion Tabs */}
            <div className="mt-8 border-t border-zinc-200 pt-6">
              <div className="flex border-b border-zinc-200 gap-6 text-xs font-bold uppercase tracking-wider">
                <button
                  type="button"
                  onClick={() => setActiveTab('description')}
                  className={`pb-2 transition-colors ${
                    activeTab === 'description'
                      ? 'border-b-2 border-black text-black'
                      : 'text-zinc-400 hover:text-black'
                  }`}
                >
                  Description
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('fabric')}
                  className={`pb-2 transition-colors ${
                    activeTab === 'fabric'
                      ? 'border-b-2 border-black text-black'
                      : 'text-zinc-400 hover:text-black'
                  }`}
                >
                  Fabric &amp; Care
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-2 transition-colors ${
                    activeTab === 'shipping'
                      ? 'border-b-2 border-black text-black'
                      : 'text-zinc-400 hover:text-black'
                  }`}
                >
                  Deliveries
                </button>
              </div>

              <div className="pt-4 text-xs leading-relaxed text-zinc-600">
                {activeTab === 'description' && (
                  <p>{product.description}</p>
                )}
                {activeTab === 'fabric' && (
                  <div className="space-y-2">
                    <p>
                      <strong>Material:</strong> {product.fabricDetails || 'Fine woven breathable textile blend.'}
                    </p>
                    <p>
                      <strong>Care Instructions:</strong> {product.careGuide || 'Wash with mild detergent. Iron on reverse.'}
                    </p>
                  </div>
                )}
                {activeTab === 'shipping' && (
                  <div className="space-y-1.5">
                    <p>Standard delivery arrives in 3-5 working days within major cities (Karachi, Lahore, Islamabad).</p>
                    <p>Remote destinations dispatched within 5-7 working days.</p>
                    <p className="font-semibold text-zinc-900">UAN Support: {BUSINESS_CONFIG.displayUAN}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Showcase */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-zinc-200">
            <h2 className="text-xl font-bold uppercase tracking-wider text-zinc-900 mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
