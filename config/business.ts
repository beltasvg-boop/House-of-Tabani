/**
 * Central Business Configuration for House of Tabani
 * Easy to update business WhatsApp, UAN, and pricing rules
 */

export const BUSINESS_CONFIG = {
  storeName: 'House of Tabani',
  tagline: 'Style that moves with you.',
  // Official WhatsApp number in international format without +, spaces, or dashes
  // Default Pakistani business WhatsApp line for instant click-to-chat
  whatsappNumber: '923213840207', 
  displayWhatsapp: '+92 321 3840207',
  displayUAN: '+92-21-38402072',
  callUAN: '+922138402072',
  email: 'customer.care@houseoftabani.com',
  workingHours: 'MON-SUN 09:00 AM - 01:00 AM PST',
  
  // Shipping Rules
  freeShippingItemThreshold: 3, // "BUY 3 ITEMS AND GET FREE DELIVERY"
  standardDeliveryCharge: 200, // PKR
  currencySymbol: 'Rs.',
  
  // Available discount promo codes
  promoCodes: {
    'WELCOME10': { type: 'percentage', value: 10, description: '10% off your entire first order' },
    'FREESHIP': { type: 'free_shipping', value: 200, description: 'Free delivery voucher' },
    'TABANI500': { type: 'fixed', value: 500, description: 'Rs. 500 off order over Rs. 3,000', minSpend: 3000 },
  },

  popularCities: [
    'Karachi',
    'Lahore',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta',
    'Sialkot',
    'Gujranwala',
    'Hyderabad',
    'Abbottabad',
    'Bahawalpur',
    'Sargodha',
    'Other City',
  ],
};
