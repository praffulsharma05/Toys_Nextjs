'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProductType } from '@/lib/products';
import WhatsAppIcon from './WhatsAppIcon';
import { isWishlistedInCookies, toggleWishlistItemInCookies } from '@/lib/wishlistCookie';

interface ProductCardProps {
  product: ProductType;
  onWishlistToggle?: (productId: string, isWishlisted: boolean) => void;
}

export default function ProductCard({ product, onWishlistToggle }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(() => typeof window !== 'undefined' ? isWishlistedInCookies(product.id) : false);
  const router = useRouter();

  useEffect(() => {
    const handleWishlistUpdate = () => {
      setIsWishlisted(isWishlistedInCookies(product.id));
    };

    window.addEventListener('wishlist-updated', handleWishlistUpdate);
    return () => {
      window.removeEventListener('wishlist-updated', handleWishlistUpdate);
    };
  }, [product.id]);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const res = toggleWishlistItemInCookies(product.id);
    setIsWishlisted(res.isWishlisted);
    if (onWishlistToggle) {
      onWishlistToggle(product.id, res.isWishlisted);
    }
  };

  const handleCardClick = () => {
    router.push(`/product/${product.id}`);
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '7878606937';
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const productUrl = `${origin}/product/${product.id}`;
  const whatsappMsg = `Hello Toy Joy! 👋\nI would like to purchase:\n🧸 *Toy*: ${product.name}\n💰 *Price*: ₹${product.price.toLocaleString('en-IN')}\n🏷️ *Category*: ${product.category}\n🔗 *Link*: ${productUrl}`;
  const whatsappLink = `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div onClick={handleCardClick} className="toy-card group">
      {/* Image & Badges Container */}
      <div className="toy-card-img-container">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="toy-card-img"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80';
          }}
        />

        {/* Wishlist Heart Button */}
        <button
          onClick={handleHeartClick}
          className={`toy-card-heart-btn bouncy-btn ${isWishlisted ? 'toy-card-heart-btn-active' : 'toy-card-heart-btn-inactive'}`}
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <span
            className={`material-symbols-outlined ${isWishlisted ? 'toy-card-heart-icon-active icon-filled' : 'toy-card-heart-icon-inactive icon-outlined'}`}
          >
            favorite
          </span>
        </button>

        {product.isBestSeller && (
          <div className="toy-card-badge-bestseller">
            Best Seller
          </div>
        )}

        {/* Low Stock Alert Badge (Only shown if stock <= 5 and > 0) */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className={`toy-card-badge-lowstock ${product.isBestSeller ? 'toy-card-badge-lowstock-left' : 'toy-card-badge-lowstock-default'}`}>
            <span>🔥 Only {product.stock} Left in Stock</span>
          </div>
        )}

        {product.stock === 0 && (
          <div className={`toy-card-badge-outofstock ${product.isBestSeller ? 'toy-card-badge-outofstock-left' : 'toy-card-badge-outofstock-default'}`}>
            Out of Stock
          </div>
        )}

        {product.images && product.images.length > 1 && (
          <div className="toy-card-badge-photos">
            <span className="material-symbols-outlined card-photos-icon">photo_library</span>
            <span>{product.images.length} Photos</span>
          </div>
        )}

        <div className="toy-card-badge-age">
          {product.ageGroup}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="toy-card-content">
        <div className="toy-card-header">
          <h3 className="toy-card-title">{product.name}</h3>
          <span className="toy-card-price">₹{product.price.toLocaleString('en-IN')}</span>
        </div>

        <div className="toy-card-actions">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="btn-whatsapp-toyjoy btn-whatsapp-card bouncy-btn"
          >
            <WhatsAppIcon size={18} color="#ffffff" />
            <span>Buy via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
