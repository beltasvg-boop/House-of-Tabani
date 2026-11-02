'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  showQuickAdd?: boolean;
}

export default function ProductCard({ product, showQuickAdd = true }: ProductCardProps) {
  const { addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.variants[0]?.size || 'Standard';
    addItem(product, defaultSize, 1, false);
  };

  return (
    <div className="group relative flex flex-col">
      <div className="relative aspect-[3/4.2] overflow-hidden bg-zinc-100">
        <Link href={`/products/${product.id}`} className="absolute inset-0 z-0">
          {/* Product Image with smooth hover scale */}
          <Image
            alt={product.name}
            src={product.images[0]}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>

        {/* Pill Badge */}
        {product.badge && (
          <div className="absolute top-3 right-3 z-10 pointer-events-none">
            <span className="glass-pill px-2.5 py-1 text-zinc-900 badge-subtle shadow-sm">
              {product.badge}
            </span>
          </div>
        )}

        {/* Hover Quick Add Action Bar */}
        {showQuickAdd && (
          <div className="absolute inset-x-2 bottom-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
            <button
              onClick={handleQuickAdd}
              type="button"
              className="w-full bg-white/95 text-zinc-900 text-[11px] font-bold uppercase tracking-wider py-2 px-3 shadow-md hover:bg-black hover:text-white transition-colors rounded-xs flex items-center justify-center gap-1.5 backdrop-blur-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Quick Add</span>
            </button>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="pt-3 pb-1">
        <p className="text-xs text-zinc-500 font-medium">{product.subtitle}</p>
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="text-sm font-semibold text-zinc-900 mt-0.5 line-clamp-1 hover:underline">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-sm font-bold text-zinc-900">
            Rs. {product.price.toLocaleString()}
          </p>
          {product.originalPrice && (
            <p className="text-xs text-zinc-400 line-through">
              Rs. {product.originalPrice.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
