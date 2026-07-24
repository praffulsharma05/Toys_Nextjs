'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  name: string;
  isBestSeller?: boolean;
  discountPercent?: number | null;
}

export default function ProductGallery({
  images,
  name,
  isBestSeller,
  discountPercent,
}: ProductGalleryProps) {
  const imageList = images && images.length > 0 ? images : ['/placeholder.png'];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const currentImage = imageList[selectedIndex] || imageList[0];

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Main Image View */}
      <div
        style={{
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
          background: '#f3f4f6',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
          border: '1px solid var(--color-outline-variant)',
        }}
        className="group"
      >
        <img
          key={currentImage}
          src={currentImage}
          alt={`${name} view ${selectedIndex + 1}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80';
          }}
        />

        {/* Badges */}
        <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 10 }}>
          {isBestSeller && (
            <div
              style={{
                background: 'var(--color-tertiary, #e63946)',
                color: '#fff',
                fontSize: '12px',
                fontWeight: '800',
                padding: '4px 12px',
                borderRadius: '9999px',
                letterSpacing: '0.5px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
            >
              ★ BEST SELLER
            </div>
          )}
          {discountPercent && (
            <div
              style={{
                background: 'var(--color-primary)',
                color: '#fff',
                fontSize: '12px',
                fontWeight: '800',
                padding: '4px 10px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
            >
              SAVE {discountPercent}%
            </div>
          )}
        </div>

        {/* Image Counter Badge */}
        {imageList.length > 1 && (
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              right: '16px',
              background: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(4px)',
              color: '#fff',
              fontSize: '12px',
              fontWeight: '700',
              padding: '4px 10px',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              zIndex: 10,
            }}
          >
            <ImageIcon style={{ width: '14px', height: '14px' }} />
            <span>
              {selectedIndex + 1} / {imageList.length}
            </span>
          </div>
        )}

        {/* Prev / Next Controls if multiple images */}
        {imageList.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              title="Previous photo"
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(4px)',
                border: 'none',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                color: 'var(--color-on-surface)',
                zIndex: 10,
                transition: 'all 0.2s ease',
              }}
              className="bouncy-btn"
            >
              <ChevronLeft style={{ width: '22px', height: '22px' }} />
            </button>

            <button
              onClick={handleNext}
              title="Next photo"
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(4px)',
                border: 'none',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                color: 'var(--color-on-surface)',
                zIndex: 10,
                transition: 'all 0.2s ease',
              }}
              className="bouncy-btn"
            >
              <ChevronRight style={{ width: '22px', height: '22px' }} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Gallery Strip */}
      {imageList.length > 1 && (
        <div
          style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            paddingBottom: '6px',
            scrollbarWidth: 'thin',
          }}
        >
          {imageList.map((imgUrl, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                style={{
                  border: isSelected ? '3px solid var(--color-primary)' : '2px solid transparent',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  width: '74px',
                  height: '74px',
                  flexShrink: 0,
                  cursor: 'pointer',
                  padding: 0,
                  background: '#f0f0f0',
                  boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                  transform: isSelected ? 'scale(1.04)' : 'scale(1)',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
              >
                <img
                  src={imgUrl}
                  alt={`${name} thumbnail ${idx + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=200&q=80';
                  }}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
