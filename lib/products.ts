import { prisma } from './prisma';

export interface ProductType {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number | null;
  imageUrl: string;
  description: string;
  ageGroup: string;
  isBestSeller: boolean;
  stock: number;
  isDeleted?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export const CATEGORIES = [
  'All',
  'Action Figures',
  'Plush Toys',
  'Educational',
  'RC & Vehicles',
  'Board Games',
  'Creative & Crafts'
];

/**
 * Fetch active products from MySQL database (excluding soft-deleted items)
 */
export async function getProducts(category?: string, search?: string, bestSellerOnly?: boolean): Promise<ProductType[]> {
  try {
    const whereClause: any = {
      isDeleted: false, // Soft delete filter
    };

    if (category && category !== 'All') {
      whereClause.category = category;
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

    const dbProducts = await prisma.product.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    });

    return dbProducts.map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice,
      imageUrl: p.imageUrl,
      description: p.description,
      ageGroup: p.ageGroup,
      isBestSeller: p.isBestSeller,
      stock: p.stock,
      isDeleted: p.isDeleted,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt
    }));
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
    const dbProduct = await prisma.product.findFirst({
      where: { id, isDeleted: false }
    });
    if (dbProduct) {
      return {
        id: dbProduct.id,
        name: dbProduct.name,
        category: dbProduct.category,
        price: dbProduct.price,
        originalPrice: dbProduct.originalPrice,
        imageUrl: dbProduct.imageUrl,
        description: dbProduct.description,
        ageGroup: dbProduct.ageGroup,
        isBestSeller: dbProduct.isBestSeller,
        stock: dbProduct.stock,
        isDeleted: dbProduct.isDeleted,
        createdAt: dbProduct.createdAt,
        updatedAt: dbProduct.updatedAt
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
  const created = await prisma.product.create({
    data: {
      name: data.name,
      category: data.category,
      price: Number(data.price),
      originalPrice: data.originalPrice ? Number(data.originalPrice) : null,
      imageUrl: data.imageUrl,
      description: data.description,
      ageGroup: data.ageGroup || '3+ Years',
      isBestSeller: Boolean(data.isBestSeller),
      stock: Number(data.stock || 10),
      isDeleted: false,
    }
  });

  return {
    id: created.id,
    name: created.name,
    category: created.category,
    price: created.price,
    originalPrice: created.originalPrice,
    imageUrl: created.imageUrl,
    description: created.description,
    ageGroup: created.ageGroup,
    isBestSeller: created.isBestSeller,
    stock: created.stock,
    isDeleted: created.isDeleted,
    createdAt: created.createdAt,
    updatedAt: created.updatedAt
  };
}

/**
 * Update an existing product in MySQL database
 */
export async function updateProduct(id: string, data: Partial<ProductType>): Promise<ProductType | null> {
  const updated = await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      category: data.category,
      price: data.price !== undefined ? Number(data.price) : undefined,
      originalPrice: data.originalPrice !== undefined ? (data.originalPrice ? Number(data.originalPrice) : null) : undefined,
      imageUrl: data.imageUrl,
      description: data.description,
      ageGroup: data.ageGroup,
      isBestSeller: data.isBestSeller !== undefined ? Boolean(data.isBestSeller) : undefined,
      stock: data.stock !== undefined ? Number(data.stock) : undefined,
      isDeleted: data.isDeleted !== undefined ? Boolean(data.isDeleted) : undefined
    }
  });

  return {
    id: updated.id,
    name: updated.name,
    category: updated.category,
    price: updated.price,
    originalPrice: updated.originalPrice,
    imageUrl: updated.imageUrl,
    description: updated.description,
    ageGroup: updated.ageGroup,
    isBestSeller: updated.isBestSeller,
    stock: updated.stock,
    isDeleted: updated.isDeleted,
    createdAt: updated.createdAt,
    updatedAt: updated.updatedAt
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
