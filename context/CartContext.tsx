'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { CartItem, Product } from '@/types';
import { BUSINESS_CONFIG } from '@/config/business';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  deliveryCharges: number;
  discount: number;
  appliedPromo: string | null;
  promoError: string | null;
  finalTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addItem: (product: Product, selectedSize: string, quantity?: number, redirectToCheckout?: boolean) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'hot_cart_items_v1';
const PROMO_STORAGE_KEY = 'hot_cart_promo_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage after initial hydration
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedItems = localStorage.getItem(CART_STORAGE_KEY);
        if (savedItems) {
          setItems(JSON.parse(savedItems));
        }
        const savedPromo = localStorage.getItem(PROMO_STORAGE_KEY);
        if (savedPromo) {
          setAppliedPromo(savedPromo);
        }
      } catch (e) {
        console.warn('Could not read cart from localStorage', e);
      } finally {
        setIsLoaded(true);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Save to localStorage whenever items change after initial load
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [items, isLoaded]);

  // Save applied promo
  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (appliedPromo) {
        localStorage.setItem(PROMO_STORAGE_KEY, appliedPromo);
      } else {
        localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Could not save promo to localStorage', e);
    }
  }, [appliedPromo, isLoaded]);

  const itemCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  // Free shipping if itemCount >= 3 ("BUY 3 ITEMS AND GET FREE DELIVERY")
  // Or if cart is empty, delivery is 0
  const deliveryCharges = useMemo(() => {
    if (items.length === 0) return 0;
    if (itemCount >= BUSINESS_CONFIG.freeShippingItemThreshold) return 0;
    if (appliedPromo === 'FREESHIP') return 0;
    return BUSINESS_CONFIG.standardDeliveryCharge;
  }, [items.length, itemCount, appliedPromo]);

  // Calculate discount based on active promo
  const discount = useMemo(() => {
    if (!appliedPromo) return 0;
    const promo = (BUSINESS_CONFIG.promoCodes as Record<string, any>)[appliedPromo];
    if (!promo) return 0;

    if (promo.type === 'percentage') {
      return Math.round((subtotal * promo.value) / 100);
    }
    if (promo.type === 'fixed') {
      if (promo.minSpend && subtotal < promo.minSpend) {
        return 0;
      }
      return Math.min(promo.value, subtotal);
    }
    return 0;
  }, [appliedPromo, subtotal]);

  const finalTotal = useMemo(() => {
    if (items.length === 0) return 0;
    return Math.max(0, subtotal + deliveryCharges - discount);
  }, [items.length, subtotal, deliveryCharges, discount]);

  const addItem = (
    product: Product,
    selectedSize: string,
    quantity: number = 1,
    redirectToCheckout: boolean = false
  ) => {
    const validQty = Math.max(1, quantity);
    const itemId = `${product.id}-${selectedSize}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((it) => it.id === itemId);
      if (existingIndex > -1) {
        const next = [...prevItems];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + validQty,
        };
        return next;
      } else {
        const newItem: CartItem = {
          id: itemId,
          productId: product.id,
          name: product.name,
          subtitle: product.subtitle,
          price: product.price,
          image: product.images[0] || '',
          selectedSize: selectedSize || 'Standard',
          quantity: validQty,
        };
        return [...prevItems, newItem];
      }
    });

    if (redirectToCheckout) {
      router.push('/checkout');
    } else {
      setIsCartOpen(true);
    }
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (code: string): boolean => {
    const trimmed = code.trim().toUpperCase();
    const config = (BUSINESS_CONFIG.promoCodes as Record<string, any>)[trimmed];

    if (!config) {
      setPromoError('Invalid coupon code. Try WELCOME10 or FREESHIP');
      return false;
    }

    if (config.minSpend && subtotal < config.minSpend) {
      setPromoError(`Requires minimum order of Rs. ${config.minSpend.toLocaleString()}`);
      return false;
    }

    setAppliedPromo(trimmed);
    setPromoError(null);
    return true;
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoError(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        deliveryCharges,
        discount,
        appliedPromo,
        promoError,
        finalTotal,
        isCartOpen,
        setIsCartOpen,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        applyPromoCode,
        removePromoCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
