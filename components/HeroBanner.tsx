'use client';

import WhatsAppIcon from './WhatsAppIcon';

export default function HeroBanner() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '7878606937';

  return (
    <div className="hero-banner-container">
      <div className="hero-content">
        <div className="hero-tag-badge">
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>stars</span>
          <span>Special Discount • Instant WhatsApp Order</span>
        </div>

        <h1 className="hero-title-text">
          Discover Magic & Pure Joy!
        </h1>

        <p className="hero-subtitle-text">
          From wooden wonders to high-tech gadgets, find the perfect companion for your child's next adventure.
        </p>

        <div className="hero-btn-row">
          <a
            href={`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent('Hello Toy Joy! I want to inquire about your top best-seller toys.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-hero bouncy-btn"
          >
            <WhatsAppIcon size={20} color="#ffffff" />
            <span>Order via WhatsApp</span>
          </a>
          <a href="/products" className="btn-hero-glass bouncy-btn">
            <span>View All Products</span>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  );
}
