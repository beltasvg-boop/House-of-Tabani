import { NextRequest, NextResponse } from 'next/server';
import { fetchAllDynamicProducts, getLocalDynamicProducts } from '@/lib/googleSheets';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const refresh = searchParams.get('refresh') === 'true';

    const data = await fetchAllDynamicProducts();
    let products = data.products;

    if (category && category !== 'all') {
      const cleanCat = category.trim().toLowerCase();
      products = products.filter((p) => {
        if (p.category.toLowerCase() === cleanCat) return true;
        if (p.categories && p.categories.some((c) => c.toLowerCase() === cleanCat)) return true;
        return false;
      });
    }

    return NextResponse.json({
      success: true,
      count: products.length,
      source: data.source,
      categoryMap: data.categoryMap,
      products,
    });
  } catch (err: any) {
    console.error('API /api/products error:', err);
    const local = getLocalDynamicProducts();
    return NextResponse.json(
      {
        success: false,
        error: err?.message || 'Failed to sync with Google Sheets',
        products: local.products,
        categoryMap: local.categoryMap,
        source: 'local-sync',
      },
      { status: 500 }
    );
  }
}
