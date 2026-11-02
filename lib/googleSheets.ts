import { Product } from '@/types';
import {
  parseCSV,
  parseShopAllSheet,
  parseCategorySheet,
  normalizeCategorySlug,
} from './sheetParser';
import fallbackSheetsData from '@/data/sheets-products.json';

export const KNOWN_CATEGORY_TABS = [
  'Women',
  'Men',
  'Scents',
  'Chinese Button Sets',
  'The Debut',
  'Everyday Essentials',
  'Chikankari',
  'Top 10',
];

/**
 * Fetch a published tab from Google Sheets by sheet name or gid
 */
export async function fetchGoogleSheetTabCsv(
  spreadsheetId: string,
  tabNameOrGid: string
): Promise<string> {
  // Google Sheets allows exporting individual tabs by name via tqx or sheet name
  // Standard format 1: https://docs.google.com/spreadsheets/d/{ID}/gviz/tq?tqx=out:csv&sheet={sheet_name}
  const encodedTab = encodeURIComponent(tabNameOrGid);
  const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodedTab}`;

  const res = await fetch(url, {
    next: { revalidate: 60 }, // revalidate every 60 seconds
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; NextJsGoogleSheetsSync/1.0)',
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch tab "${tabNameOrGid}": HTTP ${res.status}`);
  }

  return await res.text();
}

/**
 * Read the dynamic products dataset if Google Sheets is not configured or as fallback
 */
export function getLocalDynamicProducts(): {
  products: Product[];
  categoryMap: Record<string, string[]>;
} {
  return {
    products: (fallbackSheetsData.products || []) as Product[],
    categoryMap: (fallbackSheetsData.categoryMap || {}) as Record<string, string[]>,
  };
}

/**
 * Save dynamically synchronized products to local disk for instant cache (server-side only)
 */
export async function saveLocalDynamicProducts(
  products: Product[],
  categoryMap: Record<string, string[]>
) {
  if (typeof window === 'undefined') {
    try {
      const fs = await import('fs');
      const path = await import('path');
      const dataPath = path.join(process.cwd(), 'data', 'sheets-products.json');
      fs.writeFileSync(
        dataPath,
        JSON.stringify({ products, categoryMap, updatedAt: new Date().toISOString() }, null, 2),
        'utf-8'
      );
    } catch (err) {
      console.warn('Could not cache sheets products to disk:', err);
    }
  }
}

/**
 * Master Product Fetcher:
 * 1. Fetches "Shop All" tab as master catalog.
 * 2. Fetches individual category tabs (e.g. "Women", "Men", "Scents", etc.) which list Product IDs.
 * 3. Associates each product from "Shop All" with the categories it was included in.
 */
export async function fetchAllDynamicProducts(): Promise<{
  products: Product[];
  categoryMap: Record<string, string[]>;
  source: 'google-sheets' | 'local-sync';
}> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim();

  if (spreadsheetId) {
    try {
      // 1. Fetch master "Shop All" tab
      const shopAllCsv = await fetchGoogleSheetTabCsv(spreadsheetId, 'Shop All');
      const rows = parseCSV(shopAllCsv);
      const masterProducts = parseShopAllSheet(rows);

      if (masterProducts.length > 0) {
        // Map of product ID -> Product
        const productMap = new Map<string, Product>();
        masterProducts.forEach((p) => {
          productMap.set(p.id, { ...p, categories: [p.category] });
        });

        // 2. Fetch category tabs in parallel
        const categoryMap: Record<string, string[]> = {};

        await Promise.allSettled(
          KNOWN_CATEGORY_TABS.map(async (tabName) => {
            try {
              const catCsv = await fetchGoogleSheetTabCsv(spreadsheetId, tabName);
              const catRows = parseCSV(catCsv);
              const ids = parseCategorySheet(catRows);
              const slug = normalizeCategorySlug(tabName);
              categoryMap[slug] = ids;

              // Assign category to master product
              ids.forEach((id) => {
                const prod = productMap.get(id);
                if (prod) {
                  if (!prod.categories) prod.categories = [];
                  if (!prod.categories.includes(slug)) {
                    prod.categories.push(slug);
                  }
                  // If Top 10 tab, assign rank
                  if (slug === 'top-10') {
                    const rankIdx = ids.indexOf(id) + 1;
                    prod.featuredTop10Rank = rankIdx;
                  }
                }
              });
            } catch {
              // Tab might not exist yet in spreadsheet, silently proceed
            }
          })
        );

        const enrichedProducts = Array.from(productMap.values());
        saveLocalDynamicProducts(enrichedProducts, categoryMap);

        return {
          products: enrichedProducts,
          categoryMap,
          source: 'google-sheets',
        };
      }
    } catch (err) {
      console.error('Failed to sync from Google Sheets:', err);
    }
  }

  // Fallback to local synced products
  const local = getLocalDynamicProducts();
  return {
    products: local.products,
    categoryMap: local.categoryMap,
    source: 'local-sync',
  };
}
