'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface ProductImageCarouselProps {
  images: string[];
  productName: string;
  badge?: string;
}

export default function ProductImageCarousel({
  images,
  productName,
  badge,
}: ProductImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Fallback to placeholder if empty
  const validImages = images && images.length > 0 ? images : ['/products/placeholder.svg'];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Display Box */}
      <div className="relative aspect-[3/4.2] w-full overflow-hidden rounded-xs bg-zinc-100 shadow-xs group">
        {badge && (
          <div className="absolute top-4 right-4 z-20 pointer-events-none">
            <span className="glass-pill px-3 py-1 text-zinc-900 badge-subtle shadow-md">
              {badge}
            </span>
          </div>
        )}

        <Image
          src={validImages[activeIndex]}
          alt={`${productName} - View ${activeIndex + 1}`}
          fill
          priority={activeIndex === 0}
          className="object-cover object-top transition-all duration-300 select-none"
          referrerPolicy="no-referrer"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />

        {/* Carousel Navigation Arrows (shown if multiple images) */}
        {validImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-zinc-900 flex items-center justify-center shadow-md transition-all opacity-80 hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 z-10 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-zinc-900 flex items-center justify-center shadow-md transition-all opacity-80 hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 z-10 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image Counter Pill */}
        {validImages.length > 1 && (
          <div className="absolute bottom-3 right-3 z-10">
            <span className="glass-pill-dark text-white text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-xs">
              {activeIndex + 1} / {validImages.length}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      {validImages.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
          {validImages.map((img, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={`${img}-${idx}`}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative w-16 h-20 sm:w-20 sm:h-24 flex-shrink-0 rounded-xs overflow-hidden border-2 transition-all cursor-pointer ${
                  isSelected ? 'border-black ring-1 ring-black' : 'border-zinc-200 opacity-70 hover:opacity-100'
                }`}
                aria-label={`View image ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover object-top"
                  referrerPolicy="no-referrer"
                  sizes="80px"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
