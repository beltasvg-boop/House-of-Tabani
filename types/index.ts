export interface ProductVariant {
  size: string;
  inStock: boolean;
  sku?: string;
}

export type ProductCategory =
  | 'women'
  | 'men'
  | 'scents'
  | 'chinese-button-sets'
  | 'the-debut'
  | 'everyday-essentials'
  | 'chikankari'
  | string;

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categories?: string[]; // Multiple categories assigned from individual category sheets
  subCategory: string; // e.g. "Ready To Wear", "Unstitched", "West", "Polo Shirts", "For Her", etc.
  subtitle: string; // e.g. "Summer Essential 3 Pc", "Eastern Wear", "For Her"
  price: number;
  originalPrice?: number;
  badge?: 'Best Seller' | 'Limited' | 'Selling Fast' | 'Most Wanted' | 'Low Stock' | 'Day To Night' | 'Last Batch' | 'New' | string;
  images: string[];
  description: string;
  fabricDetails?: string;
  careGuide?: string;
  variants: ProductVariant[];
  rating?: number;
  reviewCount?: number;
  featuredTop10Rank?: number;
  top10Subtitle?: string;
  top10Title?: string;
  inStock?: boolean;
}

export interface CartItem {
  id: string; // unique item id: productId + variantSize
  productId: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  selectedSize: string;
  quantity: number;
}

export interface CustomerInfo {
  fullName: string;
  mobile: string;
  whatsapp: string;
  email?: string;
  address: string;
  city: string;
  postalCode?: string;
  orderNotes?: string;
  sameAsMobile: boolean;
}

export interface OrderSummaryData {
  orderReference: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  total: number;
  discountCode?: string;
  createdAt: string;
}

export interface SheetCategoryMap {
  [categoryTabName: string]: string[]; // array of Product IDs listed in that tab
}

export interface GoogleSheetsConfig {
  spreadsheetId: string;
  apiKey?: string;
}
