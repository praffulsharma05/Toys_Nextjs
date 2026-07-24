'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar({ onSearch }: { onSearch?: (query: string) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '7878606937';

  return (
    <header className="header-nav">
      <nav className="header-container">
        {/* Logo */}
        <Link href="/" className="brand-logo-toyjoy">
          <span className="material-symbols-outlined text-primary text-display-lg" style={{ fontSize: '42px', color: 'var(--primary)' }}>
            rocket_launch
          </span>
          <span className="brand-title">Toy Joy</span>
        </Link>

        {/* Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link href="/" style={{ color: 'var(--primary)', fontWeight: '700', borderBottom: '2px solid var(--secondary-container)', padding: '4px 8px', fontSize: '14px' }}>
            Shop All
          </Link>
          <Link href="/?category=Educational" style={{ color: 'var(--on-surface-variant)', fontWeight: '700', padding: '4px 8px', fontSize: '14px' }} className="bouncy-btn">
            Educational
          </Link>
          <Link href="/?bestSeller=true" style={{ color: 'var(--on-surface-variant)', fontWeight: '700', padding: '4px 8px', fontSize: '14px' }} className="bouncy-btn">
            Best Sellers
          </Link>
        </div>

        {/* Search & WhatsApp Support */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <form onSubmit={handleSearchSubmit} style={{ position: 'relative', width: '220px' }}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)', fontSize: '20px' }}>
              search
            </span>
            <input
              type="text"
              className="nav-search-input"
              placeholder="Search toys..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (onSearch) onSearch(e.target.value);
              }}
            />
          </form>

          <a
            href={`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent('Hello Toy Joy! I have an inquiry about your toys.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-toyjoy"
            style={{ padding: '8px 16px', fontSize: '13px' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              chat
            </span>
            <span>WhatsApp: {whatsappNumber}</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
