'use client';

import { useState, useEffect } from 'react';
import { isWishlistedInCookies, toggleWishlistItemInCookies } from '@/lib/wishlistCookie';

export default function WishlistButton({ productId }: { productId: string }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    setIsWishlisted(isWishlistedInCookies(productId));

    const handleWishlistUpdate = () => {
      setIsWishlisted(isWishlistedInCookies(productId));
    };

    window.addEventListener('wishlist-updated', handleWishlistUpdate);
    return () => {
      window.removeEventListener('wishlist-updated', handleWishlistUpdate);
    };
  }, [productId]);

  const handleToggle = () => {
    const res = toggleWishlistItemInCookies(productId);
    setIsWishlisted(res.isWishlisted);
  };

  return (
    <button
      onClick={handleToggle}
      className={`wishlist-btn-detail bouncy-btn ${isWishlisted ? 'wishlist-btn-detail-active' : 'wishlist-btn-detail-inactive'}`}
    >
      <span
        className="material-symbols-outlined"
        style={{
          fontSize: '22px',
          fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0",
        }}
      >
        favorite
      </span>
      <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
    </button>
  );
}
