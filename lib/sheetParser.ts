import { Product, ProductVariant } from '@/types';

/**
 * Robust CSV parser that handles quoted cells, commas inside text, and newlines.
 */
export function parseCSV(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentCell += '"';
        i++; // skip escaped quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++; // skip \r\n
      }
      currentRow.push(currentCell.trim());
      if (currentRow.some((c) => c.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
    } else {
      currentCell += char;
    }
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    if (currentRow.some((c) => c.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Standardize category keys to slug format (e.g. "Women" -> "women", "Chinese Button Sets" -> "chinese-button-sets")
 */
export function normalizeCategorySlug(cat: string): string {
  if (!cat) return 'all';
  return cat
    .trim()
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Resolve an image reference:
 * Supports:
 * 1. Absolute URLs (http:// or https://)
 * 2. Relative paths (/products/... or /assets/...)
 * 3. Just filename: "top10-1-1.jpg" -> "/products/top10-1-1.jpg"
 */
export function resolveProductImage(imgRef: string, productId?: string): string {
  const trimmed = imgRef.trim();
  if (!trimmed) return '/products/placeholder.svg';

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  if (trimmed.startsWith('/')) {
    return trimmed;
  }

  // If user only provided a filename like "kurta-1.jpg"
  return `/products/${trimmed}`;
}

/**
 * Parse sizes string (e.g. "XS, S, M, L, XL" or "S:yes, M:yes, L:no") into ProductVariant[]
 */
export function parseSizes(sizeString: string): ProductVariant[] {
  if (!sizeString || !sizeString.trim()) {
    return [{ size: 'Standard', inStock: true }];
  }

  // Split by comma, pipe, or semicolon
  const parts = sizeString.split(/[,|;]/).map((s) => s.trim()).filter(Boolean);

  if (parts.length === 0) {
    return [{ size: 'Standard', inStock: true }];
  }

  return parts.map((part) => {
    // Check if format is "Size:no" or "Size:out" or "Size(out of stock)"
    if (part.includes(':')) {
      const [sz, stock] = part.split(':').map((p) => p.trim());
      const isOut = ['no', 'false', '0', 'out', 'out of stock'].includes(stock.toLowerCase());
      return { size: sz, inStock: !isOut };
    }

    if (part.toLowerCase().includes('(out of stock)') || part.toLowerCase().includes('(sold out)')) {
      const cleanSize = part.replace(/\(out of stock\)|\(sold out\)/gi, '').trim();
      return { size: cleanSize, inStock: false };
    }

    return { size: part, inStock: true };
  });
}

/**
 * Parse images string (comma, pipe, or newline separated) into string[]
 */
export function parseImages(imagesString: string, productId: string): string[] {
  if (!imagesString || !imagesString.trim()) {
    return [resolveProductImage('', productId)];
  }

  const list = imagesString
    .split(/[\n,|;]/)
    .map((img) => img.trim())
    .filter(Boolean)
    .map((img) => resolveProductImage(img, productId));

  return list.length > 0 ? list : [resolveProductImage('', productId)];
}

/**
 * Transform rows from "Shop All" Google Sheet into Product objects
 */
export function parseShopAllSheet(rows: string[][]): Product[] {
  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.toLowerCase().trim().replace(/[^a-z0-9]/g, ''));

  // Find column indexes with flexible header variations
  const idIdx = headers.findIndex((h) => ['id', 'productid', 'serial', 'serialnumber', 'sku', 'code'].includes(h));
  const titleIdx = headers.findIndex((h) => ['title', 'name', 'producttitle', 'productname'].includes(h));
  const descIdx = headers.findIndex((h) => ['description', 'desc', 'details', 'about'].includes(h));
  const catIdx = headers.findIndex((h) => ['category', 'categoryname', 'primarycategory', 'collection'].includes(h));
  const subCatIdx = headers.findIndex((h) => ['subcategory', 'type', 'silhouette'].includes(h));
  const subtitleIdx = headers.findIndex((h) => ['subtitle', 'tagline', 'subheading'].includes(h));
  const priceIdx = headers.findIndex((h) => ['price', 'productprice', 'retailprice', 'pkr', 'rs'].includes(h));
  const origPriceIdx = headers.findIndex((h) => ['originalprice', 'compareprice', 'wasprice', 'discountprice'].includes(h));
  const sizesIdx = headers.findIndex((h) => ['sizes', 'availablesizes', 'size', 'variants'].includes(h));
  const imagesIdx = headers.findIndex((h) => ['images', 'image', 'productimages', 'photos', 'picture'].includes(h));
  const badgeIdx = headers.findIndex((h) => ['badge', 'tag', 'label', 'status'].includes(h));
  const rankIdx = headers.findIndex((h) => ['top10rank', 'rank', 'top10', 'featured'].includes(h));
  const fabricIdx = headers.findIndex((h) => ['fabric', 'fabricdetails', 'material'].includes(h));
  const careIdx = headers.findIndex((h) => ['care', 'careguide', 'washcare'].includes(h));
  const ratingIdx = headers.findIndex((h) => ['rating', 'stars', 'reviewscore'].includes(h));
  const reviewsIdx = headers.findIndex((h) => ['reviews', 'reviewcount', 'numreviews'].includes(h));

  const products: Product[] = [];

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const id = idIdx !== -1 && row[idIdx] ? row[idIdx].trim() : `prod-${r}`;
    const name = titleIdx !== -1 && row[titleIdx] ? row[titleIdx].trim() : `Product ${id}`;

    // Skip empty rows
    if (!id && !name) continue;

    const rawCategory = catIdx !== -1 && row[catIdx] ? row[catIdx].trim() : 'everyday-essentials';
    const normalizedCategory = normalizeCategorySlug(rawCategory);

    const priceRaw = priceIdx !== -1 && row[priceIdx] ? row[priceIdx].replace(/[^0-9.]/g, '') : '0';
    const price = parseFloat(priceRaw) || 0;

    const origPriceRaw = origPriceIdx !== -1 && row[origPriceIdx] ? row[origPriceIdx].replace(/[^0-9.]/g, '') : '';
    const originalPrice = origPriceRaw ? parseFloat(origPriceRaw) : undefined;

    const sizesStr = sizesIdx !== -1 && row[sizesIdx] ? row[sizesIdx] : 'S, M, L';
    const variants = parseSizes(sizesStr);

    const imagesStr = imagesIdx !== -1 && row[imagesIdx] ? row[imagesIdx] : '';
    const images = parseImages(imagesStr, id);

    const desc = descIdx !== -1 && row[descIdx] ? row[descIdx].trim() : 'Premium crafted design made with high-grade breathable fabric.';
    const subCat = subCatIdx !== -1 && row[subCatIdx] ? row[subCatIdx].trim() : 'Ready To Wear';
    const subtitle = subtitleIdx !== -1 && row[subtitleIdx] ? row[subtitleIdx].trim() : rawCategory;

    const badge = badgeIdx !== -1 && row[badgeIdx] ? (row[badgeIdx].trim() as any) : undefined;

    let featuredTop10Rank: number | undefined = undefined;
    if (rankIdx !== -1 && row[rankIdx]) {
      const num = parseInt(row[rankIdx].replace(/[^0-9]/g, ''), 10);
      if (!isNaN(num)) featuredTop10Rank = num;
    }

    const fabric = fabricIdx !== -1 && row[fabricIdx] ? row[fabricIdx].trim() : undefined;
    const care = careIdx !== -1 && row[careIdx] ? row[careIdx].trim() : undefined;
    const rating = ratingIdx !== -1 && row[ratingIdx] ? parseFloat(row[ratingIdx]) || 4.9 : 4.9;
    const reviewCount = reviewsIdx !== -1 && row[reviewsIdx] ? parseInt(row[reviewsIdx], 10) || 50 : 50;

    products.push({
      id,
      name,
      category: normalizedCategory,
      categories: [normalizedCategory],
      subCategory: subCat,
      subtitle,
      price,
      originalPrice,
      badge,
      images,
      description: desc,
      fabricDetails: fabric,
      careGuide: care,
      variants,
      rating,
      reviewCount,
      featuredTop10Rank,
      top10Subtitle: subtitle,
      top10Title: subCat,
      inStock: variants.some((v) => v.inStock),
    });
  }

  return products;
}

/**
 * Parse Category Sheet containing list of Product IDs
 */
export function parseCategorySheet(rows: string[][]): string[] {
  if (rows.length === 0) return [];

  const productIds: string[] = [];
  const startRow = rows[0]?.some((c) => ['id', 'productid', 'serial'].includes(c.toLowerCase().trim())) ? 1 : 0;

  for (let r = startRow; r < rows.length; r++) {
    const row = rows[r];
    if (row && row[0]) {
      const cleanId = row[0].trim();
      if (cleanId && !productIds.includes(cleanId)) {
        productIds.push(cleanId);
      }
    }
  }

  return productIds;
}
