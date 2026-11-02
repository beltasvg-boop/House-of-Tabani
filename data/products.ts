import { Product } from '@/types';
import { fetchAllDynamicProducts, getLocalDynamicProducts } from '@/lib/googleSheets';

/**
 * Fallback static product snapshot from dynamic repository
 */
export const PRODUCTS: Product[] = getLocalDynamicProducts().products;

/**
 * Get all active products from the master Shop All sheet
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const data = await fetchAllDynamicProducts();
    return data.products;
  } catch (err) {
    console.error('Error in getAllProducts:', err);
    return getLocalDynamicProducts().products;
  }
}

/**
 * Get product by unique Product ID
 */
export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getAllProducts();
  const cleanId = id.trim().toLowerCase();
  return products.find((p) => p.id.toLowerCase() === cleanId);
}

/**
 * Get products that belong to a category.
 * A product belongs to a category if:
 * 1. Its primary category in Shop All equals categorySlug, OR
 * 2. Its Product ID was added to that Category Tab in Google Sheets (p.categories includes categorySlug)
 */
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const products = await getAllProducts();
  if (!categorySlug || categorySlug === 'all') {
    return products;
  }

  const cleanSlug = categorySlug.trim().toLowerCase();
  return products.filter((p) => {
    if (p.category.toLowerCase() === cleanSlug) return true;
    if (p.categories && p.categories.some((c) => c.toLowerCase() === cleanSlug)) return true;
    return false;
  });
}

/**
 * Get Top 10 collections (items listed in "Top 10" tab or with featuredTop10Rank)
 */
export async function getTop10Products(): Promise<Product[]> {
  const products = await getAllProducts();
  const top10 = products.filter(
    (p) =>
      p.featuredTop10Rank !== undefined ||
      (p.categories && p.categories.includes('top-10'))
  );

  return top10.sort((a, b) => (a.featuredTop10Rank || 99) - (b.featuredTop10Rank || 99));
}
