'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import FloatingChat from '@/components/FloatingChat';
import Link from 'next/link';
import { ProductType } from '@/lib/products';
import { getWishlistFromCookies } from '@/lib/wishlistCookie';
import { Heart, ArrowLeft, Trash2, ShoppingBag } from 'lucide-react';

export default function WishlistPage() {
  const [wishlistProducts, setWishlistProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  const loadWishlistItems = async () => {
    setLoading(true);
    const wishlistedIds = getWishlistFromCookies();

    if (wishlistedIds.length === 0) {
      setWishlistProducts([]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/products');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const filtered = json.data.filter((p: ProductType) => wishlistedIds.includes(p.id));
        setWishlistProducts(filtered);
      }
    } catch (err) {
      console.error('Failed to load wishlist products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlistItems();

    const handleWishlistUpdate = () => {
      const wishlistedIds = getWishlistFromCookies();
      setWishlistProducts((prev) => prev.filter((p) => wishlistedIds.includes(p.id)));
    };

    window.addEventListener('wishlist-updated', handleWishlistUpdate);
    return () => {
      window.removeEventListener('wishlist-updated', handleWishlistUpdate);
    };
  }, []);

  const handleClearWishlist = () => {
    if (typeof document !== 'undefined') {
      document.cookie = 'toyjoy_wishlist=; path=/; max-age=0';
      window.dispatchEvent(
        new CustomEvent('wishlist-updated', {
          detail: { items: [], count: 0 },
        })
      );
      setWishlistProducts([]);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '2.5rem 0' }}>
        <div className="container-max">
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-on-surface-variant)',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Storefront</span>
          </Link>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  fontWeight: '800',
                  color: 'var(--color-on-surface)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <Heart style={{ color: '#e63946', fill: '#e63946', width: '28px', height: '28px' }} />
                <span>My Wishlist</span>
              </h1>
            </div>

            {wishlistProducts.length > 0 && (
              <button
                onClick={handleClearWishlist}
                className="bouncy-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  background: 'rgba(186, 26, 26, 0.1)',
                  color: '#ba1a1a',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                <Trash2 style={{ width: '16px', height: '16px' }} />
                <span>Clear All Saved Toys</span>
              </button>
            )}
          </div>

          {loading ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
              Loading your saved wishlist...
            </div>
          ) : wishlistProducts.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                background: '#ffffff',
                borderRadius: '24px',
                border: '1px solid var(--color-outline-variant)',
                boxShadow: 'var(--plush-shadow)',
                maxWidth: '600px',
                margin: '2rem auto',
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'rgba(230, 57, 70, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto',
                }}
              >
                <Heart style={{ width: '40px', height: '40px', color: '#e63946' }} />
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem' }}>
                Your Wishlist is Empty
              </h2>
              <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.5' }}>
                You haven't saved any toys yet. Click the heart icon on any toy card to save it to your wishlist without logging in!
              </p>
              <Link href="/products" className="btn-primary-toyjoy" style={{ display: 'inline-flex', padding: '12px 28px' }}>
                <ShoppingBag style={{ width: '18px', height: '18px' }} />
                <span>Explore All Toys</span>
              </Link>
            </div>
          ) : (
            <div className="toy-grid">
              {wishlistProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onWishlistToggle={(id, isWishlisted) => {
                    if (!isWishlisted) {
                      setWishlistProducts((prev) => prev.filter((p) => p.id !== id));
                    }
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <FloatingChat />
    </div>
  );
}
