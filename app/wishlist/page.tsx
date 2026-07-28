'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import FloatingChat from '@/components/FloatingChat';
import Link from 'next/link';
import { ProductType } from '@/lib/products';
import { getWishlistFromCookies } from '@/lib/wishlistCookie';
import { API_ROUTES, ROUTES } from '@/lib/apiRoutes';
import { Heart, ArrowLeft, Trash2, ShoppingBag } from 'lucide-react';

export default function WishlistPage() {
  const [wishlistProducts, setWishlistProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initWishlist = async () => {
      const wishlistedIds = getWishlistFromCookies();
      if (wishlistedIds.length === 0) {
        if (isMounted) {
          setWishlistProducts([]);
          setLoading(false);
        }
        return;
      }

      try {
        const res = await fetch(API_ROUTES.PRODUCTS);
        const json = await res.json();
        if (isMounted && json.success && Array.isArray(json.data)) {
          const filtered = json.data.filter((p: ProductType) => wishlistedIds.includes(p.id));
          setWishlistProducts(filtered);
        }
      } catch (err) {
        console.error('Failed to load wishlist products:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initWishlist();

    const handleWishlistUpdate = () => {
      const wishlistedIds = getWishlistFromCookies();
      setWishlistProducts((prev) => prev.filter((p) => wishlistedIds.includes(p.id)));
    };

    window.addEventListener('wishlist-updated', handleWishlistUpdate);
    return () => {
      isMounted = false;
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
    <div className="page-container-flex">
      <Navbar />

      <main className="wishlist-page-main">
        <div className="container-max">
          <Link
            href={ROUTES.HOME}
            className="wishlist-back-link"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Storefront</span>
          </Link>

          <div
            className="wishlist-header-row"
          >
            <div>
              <h1
                className="wishlist-title-text"
              >
                <Heart className="wishlist-title-heart" />
                <span>My Wishlist</span>
              </h1>
            </div>

            {wishlistProducts.length > 0 && (
              <button
                onClick={handleClearWishlist}
                className="bouncy-btn wishlist-clear-btn"
              >
                <Trash2 className="wishlist-trash-icon" />
                <span>Clear All Saved Toys</span>
              </button>
            )}
          </div>

          {loading ? (
            <div className="wishlist-loading-box">
              Loading your saved wishlist...
            </div>
          ) : wishlistProducts.length === 0 ? (
            <div
              className="wishlist-empty-card"
            >
              <div
                className="wishlist-empty-icon-wrap"
              >
                <Heart className="wishlist-empty-heart" />
              </div>
              <h2 className="wishlist-empty-title">
                Your Wishlist is Empty
              </h2>
              <p className="wishlist-empty-text">
                You haven&apos;t saved any toys yet. Click the heart icon on any toy card to save it to your wishlist without logging in!
              </p>
              <Link href={ROUTES.PRODUCTS} className="btn-primary-toyjoy wishlist-explore-btn">
                <ShoppingBag className="wishlist-bag-icon" />
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
