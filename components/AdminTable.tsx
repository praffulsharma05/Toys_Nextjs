'use client';

import Link from 'next/link';
import { ProductType } from '@/lib/products';

interface AdminTableProps {
  products: ProductType[];
  loading: boolean;
  onDelete: (id: string, name: string) => void;
  onToggleBestSeller: (product: ProductType) => void;
}

export default function AdminTable({ products, loading, onDelete, onToggleBestSeller }: AdminTableProps) {
  if (loading) return <div style={{ padding: '48px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>Loading products from MySQL database...</div>;

  if (products.length === 0) {
    return (
      <div style={{ padding: '48px', textAlign: 'center', background: '#ffffff', borderRadius: '16px', boxShadow: 'var(--plush-shadow)' }}>
        <p style={{ color: 'var(--color-on-surface-variant)', marginBottom: '20px', fontSize: '16px' }}>
          No products found in MySQL database. Use "Add New Toy" to add products from the admin panel.
        </p>
        <Link href="/admin/add" className="btn-primary-toyjoy">
          <span className="material-symbols-outlined">add</span>
          <span>Add Your First Toy Product</span>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', overflowX: 'auto', borderRadius: '16px', boxShadow: 'var(--plush-shadow)', background: '#ffffff', border: '1px solid var(--color-outline-variant)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ background: 'var(--color-surface-container-low)', borderBottom: '1px solid var(--color-outline-variant)' }}>
            <th style={{ padding: '16px 20px', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-on-surface-variant)' }}>Toy</th>
            <th style={{ padding: '16px 20px', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-on-surface-variant)' }}>Category</th>
            <th style={{ padding: '16px 20px', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-on-surface-variant)' }}>Price</th>
            <th style={{ padding: '16px 20px', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-on-surface-variant)' }}>Best Seller</th>
            <th style={{ padding: '16px 20px', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-on-surface-variant)' }}>Stock</th>
            <th style={{ padding: '16px 20px', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-on-surface-variant)', textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} style={{ borderBottom: '1px solid var(--color-surface-container)' }}>
              <td style={{ padding: '16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img src={p.imageUrl} alt={p.name} style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: '700', color: 'var(--color-on-surface)', fontSize: '15px' }}>{p.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-outline)' }}>Age: {p.ageGroup}</div>
                  </div>
                </div>
              </td>
              <td style={{ padding: '16px 20px' }}>
                <span style={{ background: 'var(--color-surface-container-highest)', padding: '4px 12px', borderRadius: '9999px', fontSize: '13px', fontWeight: '700', color: 'var(--color-primary)' }}>
                  {p.category}
                </span>
              </td>
              <td style={{ padding: '16px 20px' }}><strong style={{ color: 'var(--color-on-surface)', fontSize: '16px' }}>₹{p.price.toLocaleString('en-IN')}</strong></td>
              <td style={{ padding: '16px 20px' }}>
                <button
                  onClick={() => onToggleBestSeller(p)}
                  style={{
                    background: p.isBestSeller ? 'var(--color-secondary-container)' : 'var(--color-surface-container-highest)',
                    color: p.isBestSeller ? 'var(--color-on-secondary-container)' : 'var(--color-outline)',
                    padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '700', border: 'none', cursor: 'pointer'
                  }}
                >
                  {p.isBestSeller ? '★ Best Seller' : 'No'}
                </button>
              </td>
              <td style={{ padding: '16px 20px' }}><span style={{ fontWeight: '700', color: p.stock > 5 ? 'var(--color-on-surface)' : 'var(--color-tertiary)' }}>{p.stock} pcs</span></td>
              <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                <div style={{ display: 'inline-flex', gap: '8px' }}>
                  <Link href={`/admin/edit/${p.id}`} className="btn-primary-toyjoy" style={{ padding: '6px 12px', fontSize: '13px' }} title="Edit Toy Details">
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>edit</span>
                    <span>Edit</span>
                  </Link>

                  <button onClick={() => onDelete(p.id, p.name)} className="bouncy-btn" style={{ padding: '6px 12px', fontSize: '13px', background: 'var(--color-surface-container-high)', color: '#ba1a1a', border: 'none', borderRadius: '9999px', fontWeight: '700', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }} title="Soft Delete Product">
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>delete</span>
                    <span>Delete</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
