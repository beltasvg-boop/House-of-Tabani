'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { BUSINESS_CONFIG } from '@/config/business';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartDrawer() {
  const router = useRouter();
  const {
    items,
    itemCount,
    subtotal,
    deliveryCharges,
    discount,
    finalTotal,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
  } = useCart();

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = BUSINESS_CONFIG.freeShippingItemThreshold;
  const itemsNeededForFreeShipping = Math.max(0, freeDeliveryThreshold - itemCount);
  const progressPercent = Math.min(100, (itemCount / freeDeliveryThreshold) * 100);

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-zinc-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-zinc-900" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
                Your Shopping Bag ({itemCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-black rounded-full hover:bg-zinc-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Strip */}
          <div className="bg-[#EDE8E1] px-5 py-3 border-b border-zinc-200 text-xs">
            {itemsNeededForFreeShipping === 0 ? (
              <p className="font-semibold text-emerald-800 flex items-center gap-1.5">
                <span>🎉</span>
                <span>You unlocked <strong>FREE Delivery</strong> across Pakistan!</span>
              </p>
            ) : (
              <p className="text-zinc-700">
                Add <strong>{itemsNeededForFreeShipping}</strong> more item{itemsNeededForFreeShipping > 1 ? 's' : ''} to qualify for <strong>FREE Delivery</strong>!
              </p>
            )}
            <div className="w-full bg-zinc-300 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-black h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-zinc-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 mb-4">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <h3 className="text-base font-bold text-zinc-900">Your bag is empty</h3>
                <p className="text-xs text-zinc-500 max-w-xs mt-1">
                  Discover Pakistan&apos;s favorite Pret, unstitched lawn, and signature fragrances.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-6 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors rounded-sm"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                  <div className="w-20 h-26 relative flex-shrink-0 bg-zinc-100 rounded-sm overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-zinc-900 leading-snug line-clamp-1">{item.name}</h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-zinc-400 hover:text-red-600 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-zinc-500 mt-0.5">{item.subtitle}</p>
                      <p className="text-[11px] font-medium text-zinc-700 mt-1">
                        Size / Variant: <span className="font-semibold text-black">{item.selectedSize}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-zinc-200 rounded-sm bg-zinc-50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-zinc-200 text-zinc-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-bold text-zinc-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-zinc-200 text-zinc-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line subtotal */}
                      <p className="text-xs font-bold text-zinc-900">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-5 border-t border-zinc-200 bg-zinc-50 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-zinc-900">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Delivery Charges</span>
                  <span className="font-semibold text-zinc-900">
                    {deliveryCharges === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase tracking-wider text-[11px]">Free</span>
                    ) : (
                      `Rs. ${deliveryCharges.toLocaleString()}`
                    )}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount</span>
                    <span>-Rs. {discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-zinc-200 pt-2 flex justify-between text-sm font-extrabold text-zinc-950">
                  <span>Total Amount</span>
                  <span>Rs. {finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleProceedCheckout}
                className="w-full bg-black text-white py-3.5 px-4 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 rounded-sm shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-zinc-500 text-center">
                Fast WhatsApp &amp; Cash On Delivery Checkout available
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
