const COOKIE_NAME = 'toyjoy_wishlist';
const ONE_YEAR_SECONDS = 365 * 24 * 60 * 60;

/**
 * Helper to parse cookies on the client side
 */
function getCookieValue(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) {
    try {
      return decodeURIComponent(match[2]);
    } catch {
      return match[2];
    }
  }
  return null;
}

/**
 * Helper to set cookies on the client side
 */
function setCookieValue(name: string, value: string, maxAgeSeconds: number = ONE_YEAR_SECONDS) {
  if (typeof document === 'undefined') return;
  const encoded = encodeURIComponent(value);
  document.cookie = `${name}=${encoded}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

/**
 * Get list of wishlisted product IDs from cookie
 */
export function getWishlistFromCookies(): string[] {
  const val = getCookieValue(COOKIE_NAME);
  if (!val) return [];
  try {
    const parsed = JSON.parse(val);
    if (Array.isArray(parsed)) {
      return parsed.filter(Boolean).map(String);
    }
  } catch {
    if (val.includes(',')) {
      return val.split(',').map((s) => s.trim()).filter(Boolean);
    }
  }
  return [];
}

/**
 * Check if a product ID is wishlisted
 */
export function isWishlistedInCookies(productId: string): boolean {
  if (!productId) return false;
  const current = getWishlistFromCookies();
  return current.includes(productId);
}

/**
 * Toggle a product ID in wishlist cookies
 */
export function toggleWishlistItemInCookies(productId: string): {
  isWishlisted: boolean;
  items: string[];
} {
  if (!productId) return { isWishlisted: false, items: getWishlistFromCookies() };
  const current = getWishlistFromCookies();
  const exists = current.includes(productId);

  let updated: string[];
  if (exists) {
    updated = current.filter((id) => id !== productId);
  } else {
    updated = [...current, productId];
  }

  setCookieValue(COOKIE_NAME, JSON.stringify(updated));

  // Dispatch custom window event so Navbar and other components update immediately
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('wishlist-updated', {
        detail: { items: updated, count: updated.length, toggledId: productId, isWishlisted: !exists },
      })
    );
  }

  return { isWishlisted: !exists, items: updated };
}
