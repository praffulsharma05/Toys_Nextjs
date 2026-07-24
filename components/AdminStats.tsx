'use client';

import { ProductType } from '@/lib/products';

export default function AdminStats({ products }: { products: ProductType[] }) {
  const totalProducts = products.length;
  const bestSellersCount = products.filter((p) => p.isBestSeller).length;
  const categoriesCount = new Set(products.map((p) => p.category)).size;
  const totalInventoryValue = products.reduce((acc, p) => acc + p.price * p.stock, 0);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '16px', boxShadow: 'var(--plush-shadow)', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ background: 'rgba(0, 88, 190, 0.1)', padding: '12px', borderRadius: '12px', color: 'var(--color-primary)', display: 'flex' }}>
          <span className="material-symbols-outlined">inventory_2</span>
        </div>
        <div>
          <span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', fontWeight: '700', textTransform: 'uppercase' }}>Total Toys</span>
          <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-on-surface)' }}>{totalProducts}</div>
        </div>
      </div>

      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '16px', boxShadow: 'var(--plush-shadow)', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ background: 'rgba(252, 212, 0, 0.25)', padding: '12px', borderRadius: '12px', color: 'var(--color-on-secondary-container)', display: 'flex' }}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
        </div>
        <div>
          <span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', fontWeight: '700', textTransform: 'uppercase' }}>Best Sellers</span>
          <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-on-surface)' }}>{bestSellersCount}</div>
        </div>
      </div>

      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '16px', boxShadow: 'var(--plush-shadow)', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ background: 'rgba(161, 58, 15, 0.1)', padding: '12px', borderRadius: '12px', color: 'var(--color-tertiary)', display: 'flex' }}>
          <span className="material-symbols-outlined">category</span>
        </div>
        <div>
          <span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', fontWeight: '700', textTransform: 'uppercase' }}>Categories</span>
          <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-on-surface)' }}>{categoriesCount}</div>
        </div>
      </div>

      <div style={{ background: '#ffffff', padding: '20px', borderRadius: '16px', boxShadow: 'var(--plush-shadow)', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ background: 'rgba(37, 211, 102, 0.15)', padding: '12px', borderRadius: '12px', color: 'var(--color-whatsapp)', display: 'flex' }}>
          <span className="material-symbols-outlined">payments</span>
        </div>
        <div>
          <span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', fontWeight: '700', textTransform: 'uppercase' }}>Stock Value</span>
          <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--color-on-surface)' }}>₹{totalInventoryValue.toLocaleString('en-IN')}</div>
        </div>
      </div>
    </div>
  );
}
