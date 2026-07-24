'use client';

import Link from 'next/link';
import { ProductType } from '@/lib/products';

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '7878606937';
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const productUrl = `${origin}/product/${product.id}`;
  const whatsappMsg = `Hello Toy Joy! 👋\nI would like to purchase:\n🧸 *Toy*: ${product.name}\n💰 *Price*: ₹${product.price.toLocaleString('en-IN')}\n🏷️ *Category*: ${product.category}\n🔗 *Link*: ${productUrl}`;
  const whatsappLink = `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="toy-card group">
      {/* Image & Badges */}
      <div className="toy-card-img-container">
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
        />
        <button
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '9999px', padding: '8px', cursor: 'pointer', display: 'flex' }}
          className="bouncy-btn"
          title="Add to wishlist"
        >
          <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontSize: '20px' }}>
            favorite
          </span>
        </button>

        {product.isBestSeller && (
          <div className="toy-card-badge-bestseller">
            Best Seller
          </div>
        )}

        <div className="toy-card-badge-age">
          {product.ageGroup}
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: '600', color: 'var(--color-on-surface)' }}>
            {product.name}
          </h3>
          <span style={{ color: 'var(--color-primary)', fontWeight: '700', fontSize: '20px' }}>
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', color: 'var(--color-secondary-container)' }}>
            {[...Array(5)].map((_, i) => (
              <span key={i} className="material-symbols-outlined" style={{ fontSize: '18px', color: '#fcd400', fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
            ))}
          </div>
          <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-outline)' }}>(128)</span>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-toyjoy bouncy-btn"
            style={{ flex: 1, padding: '10px', fontSize: '14px', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chat</span>
            <span>Buy via WhatsApp</span>
          </a>

          <Link
            href={`/product/${product.id}`}
            style={{ background: 'var(--color-surface-container-highest)', color: 'var(--color-primary)', borderRadius: '9999px', padding: '10px 14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            className="bouncy-btn"
            title="View Details"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>visibility</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
