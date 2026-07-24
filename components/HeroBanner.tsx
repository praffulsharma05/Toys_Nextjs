'use client';

import Link from 'next/link';

export default function HeroBanner() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '7878606937';

  return (
    <header style={{ marginBottom: '48px', paddingTop: '16px' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: '700', lineHeight: '1.15', color: 'var(--on-surface)', marginBottom: '12px' }}>
        Discover Magic
      </h1>
      <p style={{ fontSize: '18px', color: 'var(--on-surface-variant)', maxWidth: '640px', lineHeight: '1.6', marginBottom: '24px' }}>
        From wooden wonders to high-tech gadgets, find the perfect companion for your child's next adventure. Instant WhatsApp ordering with delivery!
      </p>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <a
          href={`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent('Hello Toy Joy! I am looking for recommendations for my child.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp-toyjoy"
        >
          <span className="material-symbols-outlined">forum</span>
          <span>Order via WhatsApp (+91 {whatsappNumber})</span>
        </a>
        <a href="#all-products" className="btn-primary-toyjoy">
          <span>Explore All Toys</span>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
        </a>
      </div>
    </header>
  );
}
