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
    else if (selectedPrice === '₹1500+') result = result.filter((p) => p.price > 1500);

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
          <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
            <button className="bouncy-btn" style={{ width: '48px', height: '48px', borderRadius: '9999px', background: 'var(--color-surface-container-high)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button className="bouncy-btn" style={{ width: '48px', height: '48px', borderRadius: '9999px', background: 'var(--color-primary)', color: '#ffffff', fontWeight: '700', border: 'none', cursor: 'pointer' }}>1</button>
              <button className="bouncy-btn" style={{ width: '48px', height: '48px', borderRadius: '9999px', background: 'var(--color-surface-container-highest)', fontWeight: '700', border: 'none', cursor: 'pointer' }}>2</button>
            </div>
            <button className="bouncy-btn" style={{ width: '48px', height: '48px', borderRadius: '9999px', background: 'var(--color-surface-container-high)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '48px', background: 'var(--color-surface-container-lowest)', borderRadius: '16px', boxShadow: 'var(--plush-shadow)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--color-primary)', marginBottom: '16px' }}>
            sentiment_dissatisfied
          </span>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>
            No Toys Found
          </h3>
          <p style={{ color: 'var(--color-on-surface-variant)', marginBottom: '24px' }}>
            Add toys from your Admin Panel to populate your catalog in MySQL!
          </p>
          <button onClick={handleClear} className="btn-primary-toyjoy">Clear Filters</button>
        </div>
      )}
    </div>
  );
}
