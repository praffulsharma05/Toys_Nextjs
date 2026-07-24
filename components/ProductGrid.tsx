'use client';

import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { ProductType, CATEGORIES } from '@/lib/products';

interface ProductGridProps {
  products: ProductType[];
  initialCategory?: string;
  initialSearch?: string;
}

export default function ProductGrid({
  products,
  initialCategory = 'All',
  initialSearch = '',
}: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedAge, setSelectedAge] = useState<string>('All Ages');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('Any Price');
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'name'>('default');

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by Age
    if (selectedAge && selectedAge !== 'All Ages') {
      result = result.filter((p) =>
        p.ageGroup.toLowerCase().includes(selectedAge.toLowerCase()) ||
        p.ageGroup.toLowerCase().includes(selectedAge.split(' ')[0])
      );
    }

    // Filter by Price Range
    if (selectedPriceRange === 'Under ₹500') {
      result = result.filter((p) => p.price < 500);
    } else if (selectedPriceRange === '₹500 - ₹1500') {
      result = result.filter((p) => p.price >= 500 && p.price <= 1500);
    } else if (selectedPriceRange === '₹1500+') {
      result = result.filter((p) => p.price > 1500);
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, selectedCategory, selectedAge, selectedPriceRange, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedAge('All Ages');
    setSelectedPriceRange('Any Price');
    setSortBy('default');
  };

  return (
    <section id="all-products" style={{ marginBottom: '48px' }}>
      {/* Sticky Filter Bar */}
      <div className="filter-bar" style={{ position: 'sticky', top: '100px', zIndex: 40 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
          {/* Age Filter */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--on-surface-variant)', marginLeft: '12px', marginBottom: '4px' }}>
              Filter by Age
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--surface-container-highest)', padding: '8px 16px', borderRadius: 'var(--radius-full)', position: 'relative' }} className="pressed-in">
              <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '18px' }}>
                child_care
              </span>
              <select
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value)}
                style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: '14px', fontWeight: '700', paddingRight: '20px', cursor: 'pointer' }}
              >
                <option value="All Ages">All Ages</option>
                <option value="0-2 Years">0-2 Years</option>
                <option value="3-5 Years">3-5 Years</option>
                <option value="6-9 Years">6-9 Years</option>
                <option value="10+ Years">10+ Years</option>
              </select>
            </div>
          </div>

          {/* Price Filter */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--on-surface-variant)', marginLeft: '12px', marginBottom: '4px' }}>
              Filter by Price
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--surface-container-highest)', padding: '8px 16px', borderRadius: 'var(--radius-full)', position: 'relative' }} className="pressed-in">
              <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '18px' }}>
                payments
              </span>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: '14px', fontWeight: '700', paddingRight: '20px', cursor: 'pointer' }}
              >
                <option value="Any Price">Any Price</option>
                <option value="Under ₹500">Under ₹500</option>
                <option value="₹500 - ₹1500">₹500 - ₹1500</option>
                <option value="₹1500+">₹1500+</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Chips & Clear Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ background: 'var(--surface-container-highest)', border: 'none', padding: '10px 16px', borderRadius: 'var(--radius-full)', fontWeight: '700', fontSize: '14px', outline: 'none', cursor: 'pointer' }}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                Category: {cat}
              </option>
            ))}
          </select>

          <button
            onClick={clearAllFilters}
            style={{ color: 'var(--on-surface-variant)', fontSize: '14px', fontWeight: '700', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: '0 8px' }}
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Showing count */}
      <div style={{ fontSize: '14px', color: 'var(--on-surface-variant)', marginBottom: '20px', fontWeight: '600' }}>
        Showing {filteredAndSortedProducts.length} toy{filteredAndSortedProducts.length === 1 ? '' : 's'}
      </div>

      {/* Product Grid */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className="toy-grid">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: '48px 24px',
            background: 'var(--surface-container-lowest)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--plush-shadow)',
            margin: '32px 0',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--primary)', marginBottom: '16px' }}>
            sentiment_dissatisfied
          </span>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: '700', color: 'var(--on-surface)', marginBottom: '8px' }}>
            No Toys Found
          </h3>
          <p style={{ color: 'var(--on-surface-variant)', fontSize: '15px', marginBottom: '24px' }}>
            Add toys from your Admin Panel to populate your MySQL database catalog!
          </p>
          <button onClick={clearAllFilters} className="btn-primary-toyjoy">
            Clear Filters
          </button>
        </div>
      )}
    </section>
  );
}
