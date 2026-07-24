'use client';

import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { CATEGORIES } from '@/lib/products';
import WhatsAppIcon from './WhatsAppIcon';
import { getWishlistFromCookies } from '@/lib/wishlistCookie';

function NavbarContent({ onSearch }: { onSearch?: (query: string) => void }) {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [wishlistCount, setWishlistCount] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setWishlistCount(getWishlistFromCookies().length);

    const handleWishlistUpdate = () => {
      setWishlistCount(getWishlistFromCookies().length);
    };

    window.addEventListener('wishlist-updated', handleWishlistUpdate);
    return () => {
      window.removeEventListener('wishlist-updated', handleWishlistUpdate);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
    else router.push(`/products?search=${encodeURIComponent(query)}`);
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '7878606937';

  const isBestSeller = searchParams.get('bestSeller') === 'true';
  const categoryParam = searchParams.get('category') || '';
  const searchParam = searchParams.get('search') || '';

  const isHomeActive = pathname === '/';
  const isProductsActive = pathname === '/products' && !isBestSeller && !categoryParam && !searchParam;
  const isBestSellerActive = pathname === '/products' && isBestSeller;
  const isWishlistActive = pathname === '/wishlist';

  return (
    <header className="header-nav">
      <nav className="header-container">
        {/* Brand Logo */}
        <Link href="/" className="brand-logo-toyjoy">
          <span className="material-symbols-outlined" style={{ fontSize: '40px', color: 'var(--color-primary)' }}>
            rocket_launch
          </span>
          <span className="brand-title">Toy Joy</span>
        </Link>

        {/* Navigation Links with Active Yellow Line Indicator */}
        <div className="nav-links">
          <Link href="/" className={isHomeActive ? 'nav-link-active' : 'nav-link'}>
            Home
          </Link>

          <Link href="/products" className={isProductsActive ? 'nav-link-active' : 'nav-link'}>
            Product List
          </Link>

          {/* Category Dropdown */}
          <div className="filter-group" style={{ margin: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'transparent' }}>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    router.push(e.target.value === 'All' ? '/products' : `/products?category=${encodeURIComponent(e.target.value)}`);
                  }
                }}
                className={categoryParam ? 'nav-link-active' : 'nav-link'}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', outline: 'none', fontWeight: '700', paddingRight: '16px' }}
                value={categoryParam}
              >
                <option value="" disabled hidden>Category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} style={{ color: 'var(--color-on-surface)' }}>
                    {cat === 'All' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Link href="/products?bestSeller=true" className={isBestSellerActive ? 'nav-link-active' : 'nav-link'}>
            Best Sellers
          </Link>

          {/* Wishlist Link with Live Badge */}
          <Link href="/wishlist" className={isWishlistActive ? 'nav-link-active' : 'nav-link'} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <span className="material-symbols-outlined" style={{ color: '#e63946', fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>
              favorite
            </span>
            <span>Wishlist</span>
            {wishlistCount > 0 && (
              <span style={{ background: '#e63946', color: '#ffffff', fontSize: '11px', fontWeight: '800', borderRadius: '9999px', padding: '2px 7px', marginLeft: '2px' }}>
                {wishlistCount}
              </span>
            )}
          </Link>
        </div>

        {/* Actions */}
        <div className="nav-actions">
          {showSearch ? (
            <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                className="admin-input"
                placeholder="Search toys..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (onSearch) onSearch(e.target.value);
                }}
                style={{ padding: '6px 12px', fontSize: '13px', borderRadius: '9999px', width: '160px' }}
                autoFocus
              />
            </form>
          ) : (
            <button onClick={() => setShowSearch(true)} className="material-symbols-outlined bouncy-btn" style={{ color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
              search
            </button>
          )}

          <a
            href={`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent('Hello Toy Joy! I want to order some toys.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-toyjoy bouncy-btn"
            style={{ padding: '8px 16px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <WhatsAppIcon size={18} color="#ffffff" />
            <span>+91 {whatsappNumber}</span>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default function Navbar(props: { onSearch?: (query: string) => void }) {
  return (
    <Suspense
      fallback={
        <header className="header-nav">
          <nav className="header-container">
            <Link href="/" className="brand-logo-toyjoy">
              <span className="material-symbols-outlined" style={{ fontSize: '40px', color: 'var(--color-primary)' }}>
                rocket_launch
              </span>
              <span className="brand-title">Toy Joy</span>
            </Link>
          </nav>
        </header>
      }
    >
      <NavbarContent {...props} />
    </Suspense>
  );
}
