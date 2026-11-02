'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AnnouncementBar from '@/components/AnnouncementBar';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { useCart } from '@/context/CartContext';
import { BUSINESS_CONFIG } from '@/config/business';
import { CustomerInfo } from '@/types';
import {
  buildWhatsAppOrderMessage,
  generateOrderReference,
  getWhatsAppClickToChatUrl,
} from '@/lib/whatsapp';
import {
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Tag,
} from 'lucide-react';

export default function CheckoutPage() {
  const {
    items,
    itemCount,
    subtotal,
    deliveryCharges,
    discount,
    appliedPromo,
    promoError,
    finalTotal,
    updateQuantity,
    removeItem,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  // Form State
  const [formData, setFormData] = useState<CustomerInfo>({
    fullName: '',
    mobile: '',
    whatsapp: '',
    email: '',
    address: '',
    city: 'Karachi',
    postalCode: '',
    orderNotes: '',
    sameAsMobile: true,
  });

  const [customCity, setCustomCity] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Status Modal after WhatsApp click
  const [submissionModal, setSubmissionModal] = useState<{
    open: boolean;
    orderReference: string;
    waUrl: string;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // If sameAsMobile is checked and mobile changes, mirror it
      ...(name === 'mobile' && prev.sameAsMobile ? { whatsapp: value } : {}),
    }));

    if (fieldErrors[name as keyof CustomerInfo]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      sameAsMobile: checked,
      whatsapp: checked ? prev.mobile : '',
    }));
  };

  // Form validation
  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof CustomerInfo, string>> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = 'Please enter a valid full name.';
    }

    const cleanMobile = formData.mobile.replace(/[^0-9]/g, '');
    if (!formData.mobile.trim()) {
      errors.mobile = 'Mobile Number is required.';
    } else if (cleanMobile.length < 10) {
      errors.mobile = 'Enter a valid 10-11 digit mobile number.';
    }

    if (!formData.sameAsMobile) {
      const cleanWA = formData.whatsapp.replace(/[^0-9]/g, '');
      if (!formData.whatsapp.trim()) {
        errors.whatsapp = 'WhatsApp Number is required if different from Mobile.';
      } else if (cleanWA.length < 10) {
        errors.whatsapp = 'Enter a valid 10-11 digit WhatsApp number.';
      }
    }

    if (!formData.address.trim()) {
      errors.address = 'Complete delivery street address is required.';
    }

    const effectiveCity = formData.city === 'Other City' ? customCity : formData.city;
    if (!effectiveCity.trim()) {
      errors.city = 'Please specify your delivery city.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle WhatsApp Checkout
  const handlePlaceOrderOnWhatsApp = () => {
    if (items.length === 0) {
      alert('Your cart is empty. Please add items before checking out.');
      return;
    }

    if (!validateForm()) {
      // Scroll to first error
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    try {
      const orderRef = generateOrderReference();
      const effectiveCity = formData.city === 'Other City' ? customCity : formData.city;

      const customerPayload: CustomerInfo = {
        ...formData,
        city: effectiveCity,
        whatsapp: formData.sameAsMobile ? formData.mobile : formData.whatsapp,
      };

      const message = buildWhatsAppOrderMessage({
        orderReference: orderRef,
        customer: customerPayload,
        items,
        subtotal,
        deliveryCharge: deliveryCharges,
        discount,
        total: finalTotal,
        promoCode: appliedPromo,
      });

      const waUrl = getWhatsAppClickToChatUrl(message);

      // Open WhatsApp in new tab / application
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      // Present the state guidance modal
      setSubmissionModal({
        open: true,
        orderReference: orderRef,
        waUrl,
      });
    } catch (err) {
      console.error('Error generating WhatsApp checkout URL', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyPromoCode(couponInput);
      setCouponInput('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <SiteHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-xs text-zinc-400 mb-6 uppercase tracking-wider">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-black">
            Catalog
          </Link>
          <span>/</span>
          <span className="text-zinc-900 font-semibold">WhatsApp Checkout</span>
        </div>

        <div className="border-b border-zinc-200 pb-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
              Express WhatsApp Checkout
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Provide your delivery address below. Your order will be securely compiled into WhatsApp for 1-click submission.
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs font-bold text-zinc-700 hover:text-black flex items-center gap-1.5 uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24 bg-zinc-50 border border-zinc-200 rounded-xs max-w-2xl mx-auto p-8">
            <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 stroke-1" />
            </div>
            <h2 className="text-xl font-bold text-zinc-900">Your shopping bag is currently empty</h2>
            <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto">
              Please select your favorite pret kurtas, eastern shalwar kameez, or luxury body mists to proceed with checkout.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-block bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors rounded-xs shadow-sm"
            >
              Explore Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* AREA A: CUSTOMER INFORMATION FORM */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-zinc-200 rounded-xs p-6 sm:p-8 shadow-xs">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-4 mb-6">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-black text-white text-[11px] font-bold flex items-center justify-center">
                      1
                    </span>
                    <span>Customer &amp; Delivery Information</span>
                  </h2>
                  <span className="text-[11px] text-zinc-400 font-medium">* Required fields</span>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Ayesha Khan"
                      className={`w-full text-xs sm:text-sm border rounded-xs px-3.5 py-2.5 focus:outline-none focus:ring-0 ${
                        fieldErrors.fullName
                          ? 'border-red-500 bg-red-50/30'
                          : 'border-zinc-300 focus:border-black'
                      }`}
                    />
                    {fieldErrors.fullName && (
                      <p className="text-[11px] text-red-600 font-medium mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{fieldErrors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Contact Numbers Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Mobile Number */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        placeholder="e.g. 0300 1234567"
                        className={`w-full text-xs sm:text-sm border rounded-xs px-3.5 py-2.5 focus:outline-none focus:ring-0 ${
                          fieldErrors.mobile
                            ? 'border-red-500 bg-red-50/30'
                            : 'border-zinc-300 focus:border-black'
                        }`}
                      />
                      {fieldErrors.mobile && (
                        <p className="text-[11px] text-red-600 font-medium mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{fieldErrors.mobile}</span>
                        </p>
                      )}
                    </div>

                    {/* WhatsApp Number */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={formData.sameAsMobile ? formData.mobile : formData.whatsapp}
                        onChange={handleInputChange}
                        disabled={formData.sameAsMobile}
                        placeholder="e.g. 0300 1234567"
                        className={`w-full text-xs sm:text-sm border rounded-xs px-3.5 py-2.5 focus:outline-none focus:ring-0 ${
                          formData.sameAsMobile
                            ? 'bg-zinc-50 border-zinc-200 text-zinc-500 cursor-not-allowed'
                            : fieldErrors.whatsapp
                            ? 'border-red-500 bg-red-50/30'
                            : 'border-zinc-300 focus:border-black'
                        }`}
                      />
                      {fieldErrors.whatsapp && (
                        <p className="text-[11px] text-red-600 font-medium mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{fieldErrors.whatsapp}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Same as mobile checkbox */}
                  <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-zinc-700">
                    <input
                      type="checkbox"
                      checked={formData.sameAsMobile}
                      onChange={handleCheckboxToggle}
                      className="rounded-xs border-zinc-300 text-black focus:ring-0 cursor-pointer"
                    />
                    <span>WhatsApp number is the same as Mobile Number</span>
                  </label>

                  {/* Email (Optional) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5">
                      Email Address <span className="text-zinc-400 font-normal">(Optional, for receipt copy)</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. ayesha@example.com"
                      className="w-full text-xs sm:text-sm border border-zinc-300 rounded-xs px-3.5 py-2.5 focus:outline-none focus:border-black"
                    />
                  </div>

                  {/* Complete Delivery Address */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5">
                      Complete Delivery Address *
                    </label>
                    <textarea
                      name="address"
                      rows={2}
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="House/Apartment #, Street, Sector / Area, Landmark..."
                      className={`w-full text-xs sm:text-sm border rounded-xs px-3.5 py-2.5 focus:outline-none focus:ring-0 resize-none ${
                        fieldErrors.address
                          ? 'border-red-500 bg-red-50/30'
                          : 'border-zinc-300 focus:border-black'
                      }`}
                    />
                    {fieldErrors.address && (
                      <p className="text-[11px] text-red-600 font-medium mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{fieldErrors.address}</span>
                      </p>
                    )}
                  </div>

                  {/* City and Postal Code */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5">
                        City *
                      </label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full text-xs sm:text-sm border border-zinc-300 rounded-xs px-3.5 py-2.5 bg-white text-zinc-900 focus:outline-none focus:border-black"
                      >
                        {BUSINESS_CONFIG.popularCities.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      {formData.city === 'Other City' && (
                        <input
                          type="text"
                          placeholder="Type your city name"
                          value={customCity}
                          onChange={(e) => setCustomCity(e.target.value)}
                          className="mt-2 w-full text-xs sm:text-sm border border-zinc-300 rounded-xs px-3.5 py-2 focus:outline-none focus:border-black"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5">
                        Postal Code <span className="text-zinc-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="e.g. 75500"
                        className="w-full text-xs sm:text-sm border border-zinc-300 rounded-xs px-3.5 py-2.5 focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  {/* Order Notes */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 mb-1.5">
                      Order Notes <span className="text-zinc-400 font-normal">(Special delivery instructions)</span>
                    </label>
                    <textarea
                      name="orderNotes"
                      rows={2}
                      value={formData.orderNotes}
                      onChange={handleInputChange}
                      placeholder="e.g. Please deliver between 2 PM - 6 PM or call before arrival"
                      className="w-full text-xs sm:text-sm border border-zinc-300 rounded-xs px-3.5 py-2.5 focus:outline-none focus:border-black resize-none"
                    />
                  </div>
                </form>
              </div>

              {/* Security & Cash on Delivery reassurance */}
              <div className="mt-4 p-4 bg-zinc-50 border border-zinc-200 rounded-xs flex items-center gap-3 text-xs text-zinc-600">
                <ShieldCheck className="w-5 h-5 text-zinc-800 flex-shrink-0" />
                <div>
                  <p className="font-bold text-zinc-900">Cash on Delivery &amp; WhatsApp Verification</p>
                  <p className="text-[11px] text-zinc-500">
                    Pay safely upon receiving your parcel. Our support desk confirms every shipment on WhatsApp before dispatch.
                  </p>
                </div>
              </div>
            </div>

            {/* AREA B: ORDER SUMMARY & WHATSAPP ACTION BUTTON */}
            <div className="lg:col-span-5">
              <div className="bg-zinc-50 border border-zinc-200 rounded-xs p-6 sm:p-7 sticky top-28 shadow-xs">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-3 mb-4">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-black text-white text-[11px] font-bold flex items-center justify-center">
                      2
                    </span>
                    <span>Order Summary ({itemCount} item{itemCount > 1 ? 's' : ''})</span>
                  </h2>
                </div>

                {/* Line Items List */}
                <div className="space-y-4 max-h-72 overflow-y-auto pr-1 divide-y divide-zinc-200/70">
                  {items.map((item) => (
                    <div key={item.id} className="pt-3 first:pt-0 flex gap-3.5 items-start">
                      <div className="w-16 h-20 relative flex-shrink-0 bg-zinc-200 rounded-xs overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover object-top"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xs font-bold text-zinc-900 leading-tight line-clamp-1">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-zinc-400 hover:text-red-600 transition-colors ml-2"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-zinc-500">{item.subtitle}</p>
                        <p className="text-[11px] font-semibold text-zinc-800 mt-1">
                          Size: {item.selectedSize}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          {/* Inline Quantity adjuster */}
                          <div className="flex items-center border border-zinc-300 rounded-xs bg-white">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-1.5 py-0.5 text-zinc-600 hover:bg-zinc-100"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="px-2 text-[11px] font-bold text-zinc-900">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-1.5 py-0.5 text-zinc-600 hover:bg-zinc-100"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>
                          <span className="text-xs font-bold text-zinc-950">
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Voucher Form */}
                <div className="mt-5 pt-4 border-t border-zinc-200">
                  {appliedPromo ? (
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xs text-xs text-emerald-800">
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Code <strong>{appliedPromo}</strong> applied</span>
                      </div>
                      <button
                        type="button"
                        onClick={removePromoCode}
                        className="text-[11px] text-emerald-900 underline hover:text-black font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Discount code (e.g. WELCOME10)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 text-xs border border-zinc-300 rounded-xs px-3 py-2 uppercase placeholder:normal-case focus:outline-none focus:border-black bg-white"
                      />
                      <button
                        type="submit"
                        className="bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-2 hover:bg-black rounded-xs"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-red-600 mt-1 font-medium">{promoError}</p>
                  )}
                </div>

                {/* Price Calculations Breakdown */}
                <div className="mt-5 pt-4 border-t border-zinc-200 space-y-2 text-xs">
                  <div className="flex justify-between text-zinc-600">
                    <span>Order Subtotal</span>
                    <span className="font-semibold text-zinc-900">
                      Rs. {subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-zinc-600">
                    <span className="flex items-center gap-1">
                      <span>Delivery Charges</span>
                      {itemCount >= BUSINESS_CONFIG.freeShippingItemThreshold && (
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1 rounded-xs">
                          3+ items
                        </span>
                      )}
                    </span>
                    <span className="font-semibold">
                      {deliveryCharges === 0 ? (
                        <span className="text-emerald-700 font-bold uppercase tracking-wider">
                          FREE
                        </span>
                      ) : (
                        `Rs. ${deliveryCharges.toLocaleString()}`
                      )}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Promo Discount</span>
                      <span>-Rs. {discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="border-t border-zinc-300 pt-3 flex justify-between items-baseline text-base font-black text-zinc-950">
                    <span>TOTAL ORDER AMOUNT</span>
                    <span className="text-lg">Rs. {finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* CUSTOM WHATSAPP ORDER SUBMISSION BUTTON */}
                <div className="mt-6 pt-4 border-t border-zinc-200">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handlePlaceOrderOnWhatsApp}
                    className="w-full bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa51] text-white py-4 px-6 rounded-xs text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed group"
                  >
                    {/* Official WhatsApp Brand Icon */}
                    <svg
                      className="w-5 h-5 fill-current flex-shrink-0 group-hover:scale-110 transition-transform"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.27 7.42C9.09 7.42 8.8 7.49 8.55 7.76C8.3 8.03 7.6 8.68 7.6 10.01C7.6 11.34 8.57 12.62 8.71 12.8C8.85 12.98 10.59 15.68 13.28 16.84C13.92 17.11 14.42 17.28 14.81 17.4C15.45 17.61 16.03 17.58 16.49 17.51C17.01 17.43 18.08 16.86 18.3 16.23C18.52 15.6 18.52 15.06 18.46 14.95C18.4 14.84 18.22 14.78 17.95 14.64C17.68 14.5 16.36 13.85 16.12 13.76C15.87 13.67 15.69 13.63 15.51 13.9C15.33 14.17 14.82 14.78 14.66 14.95C14.51 15.13 14.36 15.15 14.09 15.02C13.82 14.88 12.95 14.6 11.92 13.68C11.11 12.96 10.57 12.07 10.41 11.8C10.25 11.53 10.39 11.38 10.53 11.25C10.65 11.13 10.8 10.94 10.94 10.78C11.08 10.62 11.12 10.5 11.21 10.32C11.3 10.14 11.26 9.99 11.19 9.85C11.12 9.72 10.6 8.44 10.38 7.92C10.17 7.42 9.95 7.49 9.79 7.48C9.64 7.47 9.46 7.42 9.27 7.42Z" />
                    </svg>
                    <span>Place Order on WhatsApp</span>
                  </button>

                  <div className="mt-3 bg-amber-50 border border-amber-200/80 rounded-xs p-3 text-amber-900 text-[11px] leading-relaxed flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                    <span>
                      WhatsApp will open with your order details pre-filled. <strong>Please press Send in WhatsApp</strong> to submit your order to our desk.
                    </span>
                  </div>

                  <p className="text-[10px] text-zinc-400 text-center mt-3">
                    Business WhatsApp: {BUSINESS_CONFIG.displayWhatsapp} • UAN: {BUSINESS_CONFIG.displayUAN}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* SUBMISSION GUIDANCE MODAL (Distinguishing WhatsApp Opened vs Sent vs Confirmed) */}
      {submissionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setSubmissionModal(null)}
          />
          <div className="relative bg-white rounded-xs shadow-2xl max-w-lg w-full p-6 sm:p-8 z-10 border border-zinc-200">
            <div className="flex items-center gap-3 border-b border-zinc-100 pb-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900">
                  WhatsApp Order Form Prepared
                </h3>
                <p className="text-xs font-mono text-zinc-500">
                  Reference: #{submissionModal.orderReference}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-zinc-600 leading-relaxed">
              <p>
                We have compiled your delivery address, selected garments, and calculated total (
                <strong>Rs. {finalTotal.toLocaleString()}</strong>) into a pre-filled message addressed to House of Tabani.
              </p>

              {/* Status progression indicator */}
              <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-xs space-y-2 text-[11px]">
                <div className="flex items-center gap-2 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>1. Checkout details validated</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>2. WhatsApp opened with pre-filled message</span>
                </div>
                <div className="flex items-center gap-2 text-amber-700 font-semibold pl-5 border-l-2 border-amber-400 ml-1.5 py-0.5">
                  <span>3. Action needed: <strong>Tap &quot;Send&quot;</strong> in WhatsApp chat</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400 pl-5 ml-1.5">
                  <span>4. Order confirmed &amp; dispatched with tracking</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xs text-xs">
                <p className="font-semibold">Didn&apos;t open automatically?</p>
                <p className="mt-0.5">
                  If WhatsApp did not launch in your browser, tap the button below:
                </p>
                <a
                  href={submissionModal.waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-950 underline hover:text-black"
                >
                  <span>Re-open WhatsApp Chat Now</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-[11px] text-zinc-500">
                Note: Your shopping bag is kept safe. If you need any alterations or additions, you can return at any time.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSubmissionModal(null)}
                className="px-5 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 rounded-xs transition-colors"
              >
                Done / Keep Shopping
              </button>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
