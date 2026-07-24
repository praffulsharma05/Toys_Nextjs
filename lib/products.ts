import { prisma } from './prisma';

export interface ReviewType {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  imageUrl?: string | null;
  createdAt: Date | string;
}

export interface ProductType {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number | null;
  imageUrl: string;
  images?: string[];
  description: string;
  ageGroup: string;
  isBestSeller: boolean;
  stock: number;
  rating?: number;
  reviewCount?: number;
  reviews?: ReviewType[];
  isDeleted?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export const CATEGORIES = [
  'All',
  'Educational',
  'Board Games',
  'Creative & Crafts',
  'Gift'
];

type DbProductItem = Omit<ProductType, 'images'> & {
  images?: unknown;
  reviews?: ReviewType[];
};

/**
 * Safely parse images JSON string or comma-separated list or fallback to single imageUrl
 */
function parseImages(imagesRaw: unknown, mainUrl: string): string[] {
  let list: string[] = [];
  if (Array.isArray(imagesRaw)) {
    list = imagesRaw.map((s) => String(s).trim()).filter(Boolean);
  } else if (typeof imagesRaw === 'string' && imagesRaw.trim()) {
    try {
      const parsed = JSON.parse(imagesRaw);
      if (Array.isArray(parsed)) {
        list = parsed.map((s) => String(s).trim()).filter(Boolean);
      }
    } catch {
      list = imagesRaw.split(',').map((s) => s.trim()).filter(Boolean);
    }
  }

  if (list.length === 0 && mainUrl) {
    list = [mainUrl];
  } else if (mainUrl && !list.includes(mainUrl)) {
    list.unshift(mainUrl);
  }
  return list;
}

/**
 * Fetch active products from MySQL database (excluding soft-deleted items)
 */
export async function getProducts(category?: string, search?: string, bestSellerOnly?: boolean): Promise<ProductType[]> {
  try {
    const whereClause: Record<string, unknown> = {
      isDeleted: false,
    };

    if (category && category !== 'All') {
      whereClause.category = category;
    } else {
      whereClause.category = { not: 'Gift' };
    }

    if (bestSellerOnly) {
      whereClause.isBestSeller = true;
    }

    if (search && search.trim() !== '') {
      whereClause.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { category: { contains: search } }
      ];
    }

    const dbProducts = await (prisma.product.findMany as any)({
      where: whereClause,
      include: { reviews: true },
      orderBy: { createdAt: 'desc' }
    });

    return (dbProducts as unknown as DbProductItem[]).map((p: DbProductItem) => {
      const imgList = parseImages(p.images, p.imageUrl);
      const revs = p.reviews || [];
      const reviewCount = revs.length;
      const avgRating = reviewCount > 0
        ? Number((revs.reduce((acc: number, r: { rating: number }) => acc + r.rating, 0) / reviewCount).toFixed(1))
        : 5.0;

      return {
        id: p.id,
        name: p.name,
        category: p.category,
        price: p.price,
        originalPrice: p.originalPrice,
        imageUrl: imgList[0] || p.imageUrl,
        images: imgList,
        description: p.description,
        ageGroup: p.ageGroup,
        isBestSeller: p.isBestSeller,
        stock: p.stock,
        rating: avgRating,
        reviewCount: reviewCount,
        reviews: revs,
        isDeleted: p.isDeleted,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt
      };
    });
  } catch (error) {
    console.error('MySQL Database fetch error:', error);
    return [];
  }
}

/**
 * Fetch single active product by ID from MySQL database
 */
export async function getProductById(id: string): Promise<ProductType | null> {
  try {
    const dbProduct = await (prisma.product.findFirst as any)({
      where: { id, isDeleted: false },
      include: { reviews: { orderBy: { createdAt: 'desc' } } }
    });
    if (dbProduct) {
      const typedProduct = dbProduct as unknown as DbProductItem;
      const imgList = parseImages(typedProduct.images, typedProduct.imageUrl);
      const revs = typedProduct.reviews || [];
      const reviewCount = revs.length;
      const avgRating = reviewCount > 0
        ? Number((revs.reduce((acc: number, r: { rating: number }) => acc + r.rating, 0) / reviewCount).toFixed(1))
        : 5.0;

      return {
        id: typedProduct.id,
        name: typedProduct.name,
        category: typedProduct.category,
        price: typedProduct.price,
        originalPrice: typedProduct.originalPrice,
        imageUrl: imgList[0] || typedProduct.imageUrl,
        images: imgList,
        description: typedProduct.description,
        ageGroup: typedProduct.ageGroup,
        isBestSeller: typedProduct.isBestSeller,
        stock: typedProduct.stock,
        rating: avgRating,
        reviewCount: reviewCount,
        reviews: revs,
        isDeleted: typedProduct.isDeleted,
        createdAt: typedProduct.createdAt,
        updatedAt: typedProduct.updatedAt
      };
    }
  } catch (error) {
    console.error('MySQL Database findUnique error:', error);
  }
  return null;
}

/**
 * Create a new product in MySQL database
 */
export async function createProduct(data: Omit<ProductType, 'id'>): Promise<ProductType> {
  const imagesList = data.images && data.images.length > 0 ? data.images.filter(Boolean) : [data.imageUrl].filter(Boolean);
  const mainUrl = imagesList[0] || data.imageUrl || '';

  const created = await prisma.product.create({
    data: {
      name: data.name,
      category: data.category,
      price: Number(data.price),
      originalPrice: data.originalPrice ? Number(data.originalPrice) : null,
      imageUrl: mainUrl,
      images: JSON.stringify(imagesList),
      description: data.description,
      ageGroup: data.ageGroup || '3+ Years',
      isBestSeller: Boolean(data.isBestSeller),
      stock: Number(data.stock || 10),
      isDeleted: false,
    }
  });

  const typedCreated = created as unknown as DbProductItem;
  const parsedImgs = parseImages(typedCreated.images, typedCreated.imageUrl);

  return {
    id: typedCreated.id,
    name: typedCreated.name,
    category: typedCreated.category,
    price: typedCreated.price,
    originalPrice: typedCreated.originalPrice,
    imageUrl: parsedImgs[0] || typedCreated.imageUrl,
    images: parsedImgs,
    description: typedCreated.description,
    ageGroup: typedCreated.ageGroup,
    isBestSeller: typedCreated.isBestSeller,
    stock: typedCreated.stock,
    rating: 5.0,
    reviewCount: 0,
    reviews: [],
    isDeleted: typedCreated.isDeleted,
    createdAt: typedCreated.createdAt,
    updatedAt: typedCreated.updatedAt
  };
}

/**
 * Update an existing product in MySQL database
 */
export async function updateProduct(id: string, data: Partial<ProductType>): Promise<ProductType | null> {
  const updateData: Record<string, unknown> = {
    name: data.name,
    category: data.category,
    price: data.price !== undefined ? Number(data.price) : undefined,
    originalPrice: data.originalPrice !== undefined ? (data.originalPrice ? Number(data.originalPrice) : null) : undefined,
    description: data.description,
    ageGroup: data.ageGroup,
    isBestSeller: data.isBestSeller !== undefined ? Boolean(data.isBestSeller) : undefined,
    stock: data.stock !== undefined ? Number(data.stock) : undefined,
    isDeleted: data.isDeleted !== undefined ? Boolean(data.isDeleted) : undefined
  };

  if (data.images !== undefined || data.imageUrl !== undefined) {
    const imagesList = data.images && data.images.length > 0 ? data.images.filter(Boolean) : (data.imageUrl ? [data.imageUrl] : []);
    const mainUrl = imagesList[0] || data.imageUrl || '';
    if (mainUrl) updateData.imageUrl = mainUrl;
    if (imagesList.length > 0) updateData.images = JSON.stringify(imagesList);
  }

  const updated = await prisma.product.update({
    where: { id },
    data: updateData as never
  });

  const typedUpdated = updated as unknown as DbProductItem;
  const parsedImgs = parseImages(typedUpdated.images, typedUpdated.imageUrl);

  return {
    id: typedUpdated.id,
    name: typedUpdated.name,
    category: typedUpdated.category,
    price: typedUpdated.price,
    originalPrice: typedUpdated.originalPrice,
    imageUrl: parsedImgs[0] || typedUpdated.imageUrl,
    images: parsedImgs,
    description: typedUpdated.description,
    ageGroup: typedUpdated.ageGroup,
    isBestSeller: typedUpdated.isBestSeller,
    stock: typedUpdated.stock,
    isDeleted: typedUpdated.isDeleted,
    createdAt: typedUpdated.createdAt,
    updatedAt: typedUpdated.updatedAt
  };
}

/**
 * SOFT DELETE method: Updates isDeleted flag to true in MySQL database instead of hard deleting
 */
export async function deleteProduct(id: string): Promise<boolean> {
  try {
    await prisma.product.update({
      where: { id },
      data: { isDeleted: true },
    });
    return true;
  } catch (error) {
    console.error('MySQL Soft Delete error:', error);
    return false;
  }
}

/**
 * Create a new review for a product
 */
export async function createReview(productId: string, data: { author: string; rating: number; comment: string; imageUrl?: string }) {
  const newReview = await prisma.review.create({
    data: {
      productId,
      author: data.author || 'Customer',
      rating: Math.min(5, Math.max(1, Number(data.rating) || 5)),
      comment: data.comment,
      imageUrl: data.imageUrl || null,
    }
  });
  return newReview;
}

/**
 * Get all reviews for a product
 */
export async function getReviewsForProduct(productId: string): Promise<ReviewType[]> {
  const reviews = await prisma.review.findMany({
    where: { productId },
    orderBy: { createdAt: 'desc' }
  });
  return reviews as ReviewType[];
}
