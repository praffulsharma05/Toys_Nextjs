'use client';

import { ProductType } from '@/lib/products';
import { Package, Flame, Layers, DollarSign } from 'lucide-react';

export default function AdminStats({ products }: { products: ProductType[] }) {
  const totalProducts = products.length;
  const bestSellersCount = products.filter((p) => p.isBestSeller).length;
  const categoriesCount = new Set(products.map((p) => p.category)).size;
  const totalInventoryValue = products.reduce((acc, p) => acc + p.price * p.stock, 0);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
      <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ background: 'rgba(255, 82, 82, 0.15)', padding: '0.75rem', borderRadius: '12px', color: 'var(--accent-primary)' }}>
          <Package className="w-6 h-6" />
        </div>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Total Toys</span>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-main)' }}>{totalProducts}</div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ background: 'rgba(255, 183, 3, 0.15)', padding: '0.75rem', borderRadius: '12px', color: 'var(--accent-secondary)' }}>
          <Flame className="w-6 h-6 fill-current" />
        </div>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Best Sellers</span>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-main)' }}>{bestSellersCount}</div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ background: 'rgba(0, 180, 216, 0.15)', padding: '0.75rem', borderRadius: '12px', color: 'var(--accent-tertiary)' }}>
          <Layers className="w-6 h-6" />
        </div>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Categories</span>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-main)' }}>{categoriesCount}</div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ background: 'rgba(37, 211, 102, 0.15)', padding: '0.75rem', borderRadius: '12px', color: 'var(--accent-whatsapp)' }}>
          <DollarSign className="w-6 h-6" />
        </div>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Stock Value</span>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-main)' }}>₹{totalInventoryValue.toLocaleString('en-IN')}</div>
        </div>
      </div>
    </div>
  );
}
