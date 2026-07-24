import { NextRequest, NextResponse } from 'next/server';
import { getProducts, createProduct } from '@/lib/products';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;
    const bestSeller = searchParams.get('bestSeller') === 'true';

    const products = await getProducts(category, search, bestSeller);
    return NextResponse.json(
      { success: true, count: products.length, data: products },
      { headers: corsHeaders }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch products' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const images = Array.isArray(body.images) && body.images.length > 0 ? body.images : (body.imageUrl ? [body.imageUrl] : []);
    const mainImageUrl = images[0] || body.imageUrl;

    if (!body.name || !body.category || body.price === undefined || !mainImageUrl || !body.description) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, category, price, imageUrl/images, description' },
        { status: 400, headers: corsHeaders }
      );
    }

    const newProduct = await createProduct({
      name: body.name,
      category: body.category,
      price: Number(body.price),
      originalPrice: body.originalPrice ? Number(body.originalPrice) : null,
      imageUrl: mainImageUrl,
      images: images,
      description: body.description,
      ageGroup: body.ageGroup || '3+ Years',
      isBestSeller: Boolean(body.isBestSeller),
      stock: Number(body.stock || 10)
    });

    return NextResponse.json(
      { success: true, data: newProduct },
      { status: 201, headers: corsHeaders }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create product' },
      { status: 500, headers: corsHeaders }
    );
  }
}
