'use client';

import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import FilterBar from './FilterBar';
import { ProductType } from '@/lib/products';

interface ProductGridProps {
  products: ProductType[];
  initialCategory?: string;
  initialSearch?: string;
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [selectedAge, setSelectedAge] = useState('All Ages');
  const [selectedPrice, setSelectedPrice] = useState('Any Price');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedAge && selectedAge !== 'All Ages') {
      result = result.filter((p) =>
        p.ageGroup.toLowerCase().includes(selectedAge.toLowerCase()) ||
        p.ageGroup.toLowerCase().includes(selectedAge.split(' ')[0])
      );
    }

    if (selectedPrice === 'Under ₹500') result = result.filter((p) => p.price < 500);
    else if (selectedPrice === '₹500 - ₹1500') result = result.filter((p) => p.price >= 500 && p.price <= 1500);

    return result;
  }, [products, selectedAge, selectedPrice]);

  const handleClear = () => {
    setSelectedAge('All Ages');
    setSelectedPrice('Any Price');
  };

  return (
    <div>
      <FilterBar
        selectedAge={selectedAge}
        onAgeChange={setSelectedAge}
        selectedPrice={selectedPrice}
        onPriceChange={setSelectedPrice}
        onClear={handleClear}
      />

      {filteredProducts.length > 0 ? (
        <>
          <div className="toy-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="grid-pagination-wrap">
            <button className="bouncy-btn grid-page-btn-icon">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <div className="grid-pages-row">
              <button className="bouncy-btn grid-page-btn-active">1</button>
              <button className="bouncy-btn grid-page-btn-inactive">2</button>
            </div>
            <button className="bouncy-btn grid-page-btn-icon">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </>
      ) : (
        <div className="grid-empty-card">
          <div className="lottie-container-wrap">
            {/* @ts-expect-error - dotlottie-player is a third-party custom element loaded via CDN */}
            <dotlottie-player src="https://assets-v2.lottiefiles.com/a/e92c8698-1151-11ee-ab0a-f7211d47ac6f/f9et4o6xEv.lottie" background="transparent" speed="1" className="empty-lottie-player" loop autoplay></dotlottie-player>
          </div>
          <h3 className="grid-empty-title">
            No Toys Found
          </h3>
          <button onClick={handleClear} className="btn-clear-empty-state bouncy-btn">
            <span className="material-symbols-outlined">restart_alt</span>
            <span>Clear Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
