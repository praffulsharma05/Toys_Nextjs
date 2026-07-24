'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { CATEGORIES } from '@/lib/products';
import WhatsAppIcon from './WhatsAppIcon';
import { getWishlistFromCookies } from '@/lib/wishlistCookie';
import { ChevronDown, Check, LayoutGrid } from 'lucide-react';

function NavbarContent({ onSearch }: { onSearch?: (query: string) => void }) {
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [wishlistCount, setWishlistCount] = useState(() => typeof window !== 'undefined' ? getWishlistFromCookies().length : 0);

  const categoryRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleWishlistUpdate = () => {
      setWishlistCount(getWishlistFromCookies().length);
    };

    window.addEventListener('wishlist-updated', handleWishlistUpdate);
    return () => {
      window.removeEventListener('wishlist-updated', handleWishlistUpdate);
    };
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
        setCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
    else router.push(`/products?search=${encodeURIComponent(query)}`);
    setShowSearch(false);
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
          <span className="material-symbols-outlined brand-logo-icon">
            rocket_launch
          </span>
          <span className="brand-title">Toy Joy</span>
        </Link>

        {/* Desktop Navigation Links with Active Yellow Line Indicator */}
        <div className="nav-links">
          <Link href="/" className={isHomeActive ? 'nav-link-active' : 'nav-link'}>
            Home
          </Link>

          <Link href="/products" className={isProductsActive ? 'nav-link-active' : 'nav-link'}>
            Product List
          </Link>

          {/* Custom Stylish Floating Category Dropdown */}
          <div className="nav-category-dropdown-wrap" ref={categoryRef}>
            <button
              type="button"
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              className={`nav-category-trigger ${categoryDropdownOpen ? 'nav-category-trigger-active' : ''} ${categoryParam ? 'nav-category-trigger-has-selected' : ''}`}
            >
              <LayoutGrid className="nav-category-icon" />
              <span>{categoryParam || 'Category'}</span>
              <ChevronDown className={categoryDropdownOpen ? 'nav-arrow-open' : 'nav-arrow-closed'} />
            </button>

            {categoryDropdownOpen && (
              <div className="nav-category-popover">
                {CATEGORIES.map((cat) => {
                  const catVal = cat === 'All' ? '' : cat;
                  const isSelected = categoryParam === catVal || (!categoryParam && cat === 'All');
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        router.push(cat === 'All' ? '/products' : `/products?category=${encodeURIComponent(cat)}`);
                        setCategoryDropdownOpen(false);
                      }}
                      className={`nav-category-option ${isSelected ? 'nav-category-option-selected' : ''}`}
                    >
                      <span>{cat === 'All' ? 'All Categories' : cat}</span>
                      {isSelected && <Check className="nav-check-icon" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <Link href="/products?bestSeller=true" className={isBestSellerActive ? 'nav-link-active' : 'nav-link'}>
            Best Sellers
          </Link>

          {/* Wishlist Link with Live Badge */}
          <Link href="/wishlist" className={isWishlistActive ? 'nav-link-active inline-flex items-center gap-4' : 'nav-link inline-flex items-center gap-4'}>
            <span className="material-symbols-outlined nav-wishlist-icon">
              favorite
            </span>
            <span>Wishlist</span>
            {wishlistCount > 0 && (
              <span className="nav-badge-count">
                {wishlistCount}
              </span>
            )}
          </Link>
        </div>

        {/* Header Actions */}
        <div className="nav-actions">
          {showSearch ? (
            <form onSubmit={handleSearch} className="nav-form-inline">
              <input
                type="text"
                className="admin-input nav-search-input"
                placeholder="Search toys..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (onSearch) onSearch(e.target.value);
                }}
                autoFocus
              />
            </form>
          ) : (
            <button onClick={() => setShowSearch(true)} className="material-symbols-outlined nav-search-btn bouncy-btn">
              search
            </button>
          )}

          <a
            href={`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent('Hello Toy Joy! I want to order some toys.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-toyjoy bouncy-btn hide-on-mobile"
          >
            <WhatsAppIcon size={18} color="#ffffff" />
            <span>Chat on WhatsApp</span>
          </a>

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-toggle bouncy-btn"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined nav-menu-icon">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className={isHomeActive ? 'nav-link-active' : 'nav-link'}>
            Home
          </Link>

          <Link href="/products" onClick={() => setMobileMenuOpen(false)} className={isProductsActive ? 'nav-link-active' : 'nav-link'}>
            Product List
          </Link>

          <div className="nav-category-col">
            <label className="mobile-menu-label">Filter Category</label>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  router.push(e.target.value === 'All' ? '/products' : `/products?category=${encodeURIComponent(e.target.value)}`);
                  setMobileMenuOpen(false);
                }
              }}
              className="admin-select"
              value={categoryParam}
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          <Link href="/products?bestSeller=true" onClick={() => setMobileMenuOpen(false)} className={isBestSellerActive ? 'nav-link-active' : 'nav-link'}>
            Best Sellers
          </Link>

          <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} className={isWishlistActive ? 'nav-link-active inline-flex items-center gap-6' : 'nav-link inline-flex items-center gap-6'}>
            <span className="material-symbols-outlined nav-wishlist-mobile-icon">
              favorite
            </span>
            <span>Wishlist ({wishlistCount})</span>
          </Link>

          <a
            href={`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent('Hello Toy Joy! I want to order some toys.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-toyjoy bouncy-btn w-full rounded-full"
          >
            <WhatsAppIcon size={20} color="#ffffff" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      )}
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
              <span className="material-symbols-outlined brand-logo-icon">
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
