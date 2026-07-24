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

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

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
          onClick={() => setIsLightboxOpen(true)}
          title="Click to view full image"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
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
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="lightbox-backdrop" onClick={() => setIsLightboxOpen(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close-btn bouncy-btn"
              onClick={() => setIsLightboxOpen(false)}
              title="Close modal"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {imageList.length > 1 && (
              <>
                <button
                  className="lightbox-arrow-btn lightbox-arrow-prev bouncy-btn"
                  onClick={handlePrev}
                  title="Previous photo"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  className="lightbox-arrow-btn lightbox-arrow-next bouncy-btn"
                  onClick={handleNext}
                  title="Next photo"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            <img
              src={currentImage}
              alt={`${name} full view`}
              className="lightbox-img"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
            
            <p className="lightbox-caption">
              {name} {imageList.length > 1 && `(${selectedIndex + 1} of ${imageList.length})`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
