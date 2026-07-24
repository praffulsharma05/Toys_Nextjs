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
      className="bouncy-btn"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        width: '100%',
        padding: '12px',
        borderRadius: '9999px',
        border: '2px solid #e63946',
        background: isWishlisted ? 'rgba(230, 57, 70, 0.1)' : '#ffffff',
        color: '#e63946',
        fontWeight: '700',
        fontSize: '1rem',
        cursor: 'pointer',
        marginBottom: '1.5rem',
        transition: 'all 0.2s ease',
      }}
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
