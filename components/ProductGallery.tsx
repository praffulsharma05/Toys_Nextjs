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
    <div className="gallery-container">
      {/* Main Image View */}
      <div className="gallery-main-frame group">
        <img
          key={currentImage}
          src={currentImage}
          alt={`${name} view ${selectedIndex + 1}`}
          className="gallery-main-img"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80';
          }}
        />

        {/* Badges Overlay */}
        <div className="gallery-badges-overlay">
          {isBestSeller && (
            <div className="gallery-badge-bestseller">
              ★ BEST SELLER
            </div>
          )}
          {discountPercent && (
            <div className="gallery-badge-discount">
              SAVE {discountPercent}%
            </div>
          )}
        </div>

        {/* Image Counter Badge */}
        {imageList.length > 1 && (
          <div className="gallery-badge-count">
            <ImageIcon className="gallery-counter-icon" />
            <span>
              {selectedIndex + 1} / {imageList.length}
            </span>
          </div>
        )}

        {/* Prev / Next Controls */}
        {imageList.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              title="Previous photo"
              className="gallery-arrow-btn gallery-arrow-prev bouncy-btn"
            >
              <ChevronLeft className="gallery-arrow-icon" />
            </button>

            <button
              onClick={handleNext}
              title="Next photo"
              className="gallery-arrow-btn gallery-arrow-next bouncy-btn"
            >
              <ChevronRight className="gallery-arrow-icon" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Gallery Strip */}
      {imageList.length > 1 && (
        <div className="gallery-thumb-strip">
          {imageList.map((imgUrl, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`gallery-thumb-btn ${isSelected ? 'gallery-thumb-btn-active' : 'gallery-thumb-btn-inactive'}`}
              >
                <img
                  src={imgUrl}
                  alt={`${name} thumbnail ${idx + 1}`}
                  className="gallery-thumb-img"
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
