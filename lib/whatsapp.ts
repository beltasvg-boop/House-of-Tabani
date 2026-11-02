import { BUSINESS_CONFIG } from '@/config/business';
import { CartItem, CustomerInfo } from '@/types';

/**
 * Generate human-readable unique order reference
 * Format: HOT-YYMM-XXXX (e.g. HOT-2610-8492)
 */
export function generateOrderReference(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(1000 + Math.random() * 9000);
  return `HOT-${year}${month}-${random}`;
}

/**
 * Construct the standardized, formatted WhatsApp message for order placement
 */
export function buildWhatsAppOrderMessage(params: {
  orderReference: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  total: number;
  promoCode?: string | null;
}): string {
  const { orderReference, customer, items, subtotal, deliveryCharge, discount, total, promoCode } = params;

  let msg = `🛍️ NEW ORDER REQUEST [Ref: #${orderReference}]\n\n`;

  msg += `Customer Details:\n`;
  msg += `Name: ${customer.fullName.trim()}\n`;
  msg += `Mobile: ${customer.mobile.trim()}\n`;
  msg += `WhatsApp: ${(customer.sameAsMobile ? customer.mobile : customer.whatsapp).trim()}\n`;
  if (customer.email && customer.email.trim()) {
    msg += `Email: ${customer.email.trim()}\n`;
  }
  msg += `\n`;

  msg += `Delivery Address:\n`;
  msg += `${customer.address.trim()}\n`;
  msg += `City: ${customer.city.trim()}\n`;
  if (customer.postalCode && customer.postalCode.trim()) {
    msg += `Postal Code: ${customer.postalCode.trim()}\n`;
  }
  msg += `\n`;

  msg += `Order Details:\n\n`;
  items.forEach((item, index) => {
    const itemSubtotal = item.price * item.quantity;
    msg += `Product ${index + 1}:\n`;
    msg += `Product Name: ${item.name} (${item.subtitle})\n`;
    msg += `Variant: ${item.selectedSize}\n`;
    msg += `Quantity: ${item.quantity}\n`;
    msg += `Unit Price: Rs. ${item.price.toLocaleString()}\n`;
    msg += `Subtotal: Rs. ${itemSubtotal.toLocaleString()}\n\n`;
  });

  msg += `Order Subtotal: Rs. ${subtotal.toLocaleString()}\n`;
  msg += `Delivery Charges: ${deliveryCharge === 0 ? 'FREE (Special Offer)' : `Rs. ${deliveryCharge.toLocaleString()}`}\n`;
  if (discount > 0) {
    msg += `Discount (${promoCode || 'PROMO'}): -Rs. ${discount.toLocaleString()}\n`;
  }
  msg += `TOTAL ORDER AMOUNT: Rs. ${total.toLocaleString()}\n\n`;

  if (customer.orderNotes && customer.orderNotes.trim()) {
    msg += `Customer Notes:\n${customer.orderNotes.trim()}\n\n`;
  }

  msg += `Please confirm the availability and delivery details for this order.`;

  return msg;
}

/**
 * Build the full WhatsApp URL with international phone number and encoded message
 */
export function getWhatsAppClickToChatUrl(message: string, customPhone?: string): string {
  const phone = (customPhone || BUSINESS_CONFIG.whatsappNumber).replace(/[^0-9]/g, '');
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}
