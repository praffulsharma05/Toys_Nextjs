/**
 * Centralized route constants.
 * All navigation links, router.push calls, and fetch URLs
 * should import from this file instead of hardcoding paths.
 */

// ─── Page / Navigation Routes ────────────────────────────────────────
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCTS_BEST_SELLER: '/products?bestSeller=true',
  PRODUCTS_BY_CATEGORY: (cat: string) =>
    cat === 'All' ? '/products' : `/products?category=${encodeURIComponent(cat)}`,
  PRODUCTS_BY_SEARCH: (query: string) =>
    `/products?search=${encodeURIComponent(query)}`,
  PRODUCTS_CATEGORY_EDUCATIONAL: '/products?category=Educational',
  PRODUCT_DETAIL: (id: string) => `/product/${id}`,
  GIFT: '/gift',
  WISHLIST: '/wishlist',
  ADMIN: '/admin',
  ADMIN_ADD: '/admin/add',
  ADMIN_EDIT: (id: string) => `/admin/edit/${id}`,
} as const;

// ─── API Routes ──────────────────────────────────────────────────────
export const API_ROUTES = {
  /** GET all products / POST create new product */
  PRODUCTS: '/api/products',

  /** GET / PUT / DELETE a single product by ID */
  PRODUCT_BY_ID: (id: string) => `/api/products/${id}`,

  /** GET / POST reviews for a product */
  PRODUCT_REVIEWS: (productId: string) => `/api/products/${productId}/reviews`,

  /** POST upload a file */
  UPLOAD: '/api/upload',
} as const;
