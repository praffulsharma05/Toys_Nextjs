'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar({ onSearch }: { onSearch?: (query: string) => void }) {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
    else router.push(`/?search=${encodeURIComponent(query)}`);
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '7878606937';

  return (
    <header className="header-nav">
      <nav className="header-container">
        {/* Brand */}
        <Link href="/" className="brand-logo-toyjoy">
          <span className="material-symbols-outlined" style={{ fontSize: '40px', color: 'var(--color-primary)' }}>
            rocket_launch
          </span>
          <span className="brand-title">Toy Joy</span>
        </Link>

        {/* Links */}
        <div className="nav-links">
          <Link href="/" className="nav-link-active">Shop All</Link>
          <Link href="/?category=Educational" className="nav-link">New Arrivals</Link>
          <Link href="/?bestSeller=true" className="nav-link">Best Sellers</Link>
          <Link href="/" className="nav-link">Sale</Link>
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
            style={{ padding: '8px 16px', fontSize: '13px' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chat</span>
            <span>+91 {whatsappNumber}</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
