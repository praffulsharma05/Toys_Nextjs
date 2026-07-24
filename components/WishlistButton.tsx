'use client';

import { useState, useEffect } from 'react';
import { isWishlistedInCookies, toggleWishlistItemInCookies } from '@/lib/wishlistCookie';

export default function WishlistButton({ productId }: { productId: string }) {
  const [isWishlisted, setIsWishlisted] = useState(() => typeof window !== 'undefined' ? isWishlistedInCookies(productId) : false);

  useEffect(() => {
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
        className={`material-symbols-outlined wishlist-heart-icon ${isWishlisted ? 'icon-filled' : 'icon-outlined'}`}
      >
        favorite
      </span>
      <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
    </button>
  );
}
