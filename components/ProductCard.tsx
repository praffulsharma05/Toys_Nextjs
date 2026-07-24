'use client';

import Link from 'next/link';
import { ProductType } from '@/lib/products';

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '7878606937';

  // Calculate discount percentage if original price is given
  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  // Build custom WhatsApp pre-filled order message
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const productUrl = `${origin}/product/${product.id}`;
  const whatsappMsg = `Hello Toy Joy! 👋\nI would like to purchase the following toy:\n\n🧸 *Toy*: ${product.name}\n💰 *Price*: ₹${product.price.toLocaleString('en-IN')}\n🏷️ *Category*: ${product.category}\n🔗 *Product Link*: ${productUrl}\n\nPlease confirm availability and delivery details!`;

  const whatsappLink = `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="toy-card group">
      {/* Image & Badges */}
      <div className="toy-card-img-container" style={{ position: 'relative', width: '100%', height: '230px', overflow: 'hidden', background: '#e0e3e5' }}>
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          className="group-hover:scale-110"
        />
        {product.isBestSeller && (
          <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'var(--tertiary)', color: 'var(--on-tertiary)', fontSize: '11px', fontWeight: '700', padding: '4px 12px', borderRadius: 'var(--radius-full)', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}>
            Best Seller
          </div>
        )}
        {discountPercent && (
          <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--accent-primary, #ba1a1a)', color: '#ffffff', fontSize: '11px', fontWeight: '700', padding: '4px 8px', borderRadius: '8px' }}>
            {discountPercent}% OFF
          </div>
        )}
        <div style={{ position: 'absolute', bottom: '12px', left: '12px' }}>
          <span style={{ background: 'var(--secondary-container)', color: 'var(--on-secondary-container)', fontSize: '11px', fontWeight: '700', padding: '4px 12px', borderRadius: 'var(--radius-full)', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
            {product.ageGroup}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: '700', color: 'var(--on-surface)', lineHeight: '1.25' }}>
            {product.name}
          </h3>
          <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '18px' }}>
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--on-surface-variant)', marginBottom: '12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {product.description}
        </p>

        {/* Ratings */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', color: 'var(--secondary-container)' }}>
            {[...Array(5)].map((_, i) => (
              <span key={i} className="material-symbols-outlined" style={{ fontSize: '18px', color: '#fcd400', fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
            ))}
          </div>
          <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--outline)' }}>(128)</span>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-toyjoy"
            style={{ flex: 1, padding: '10px', fontSize: '13px', borderRadius: 'var(--radius-full)' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              chat
            </span>
            <span>Buy on WhatsApp</span>
          </a>

          <Link
            href={`/product/${product.id}`}
            style={{ padding: '10px 14px', background: 'var(--surface-container-highest)', color: 'var(--primary)', borderRadius: 'var(--radius-full)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            className="bouncy-btn"
            title="View details"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              visibility
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
