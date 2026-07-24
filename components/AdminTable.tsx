'use client';

import Link from 'next/link';
import { ProductType } from '@/lib/products';
import { Edit, Trash2, Flame, Plus } from 'lucide-react';

interface AdminTableProps {
  products: ProductType[];
  loading: boolean;
  onDelete: (id: string, name: string) => void;
  onToggleBestSeller: (product: ProductType) => void;
}

export default function AdminTable({ products, loading, onDelete, onToggleBestSeller }: AdminTableProps) {
  if (loading) {
    return <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading products from MySQL database...</div>;
  }

  if (products.length === 0) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', fontSize: '1.05rem' }}>
          No products found in MySQL database. Use "Add New Toy" to add products from the admin panel.
        </p>
        <Link href="/admin/add" className="btn-primary-toyjoy">
          <Plus className="w-4 h-4" />
          <span>Add Your First Toy Product</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Toy</th>
            <th>Category</th>
            <th>Price</th>
            <th>Original Price</th>
            <th>Best Seller</th>
            <th>Stock</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img src={p.imageUrl} alt={p.name} className="admin-thumb" />
                  <div>
                    <div style={{ fontWeight: '700', color: 'var(--text-main)', fontSize: '0.95rem' }}>{p.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Age: {p.ageGroup} | ID: {p.id.slice(0, 8)}</div>
                  </div>
                </div>
              </td>
              <td>
                <span style={{ background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: 'var(--radius-pill)', fontSize: '0.82rem', fontWeight: '600', color: 'var(--accent-tertiary)' }}>
                  {p.category}
                </span>
              </td>
              <td><strong style={{ color: '#fff', fontSize: '1rem' }}>₹{p.price.toLocaleString('en-IN')}</strong></td>
              <td>
                {p.originalPrice ? (
                  <span style={{ color: 'var(--text-dim)', textDecoration: 'line-through', fontSize: '0.9rem' }}>₹{p.originalPrice.toLocaleString('en-IN')}</span>
                ) : <span style={{ color: 'var(--text-dim)' }}>—</span>}
              </td>
              <td>
                <button
                  onClick={() => onToggleBestSeller(p)}
                  style={{
                    background: p.isBestSeller ? 'rgba(255, 183, 3, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${p.isBestSeller ? 'rgba(255, 183, 3, 0.5)' : 'var(--border-color)'}`,
                    color: p.isBestSeller ? '#ffb703' : 'var(--text-muted)',
                    padding: '4px 10px', borderRadius: 'var(--radius-pill)', fontSize: '0.78rem', fontWeight: '700', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px'
                  }}
                >
                  <Flame style={{ width: '13px', height: '13px', fill: p.isBestSeller ? '#ffb703' : 'none' }} />
                  <span>{p.isBestSeller ? 'YES' : 'NO'}</span>
                </button>
              </td>
              <td><span style={{ fontWeight: '600', color: p.stock > 5 ? 'var(--text-main)' : '#ff5252' }}>{p.stock} pcs</span></td>
              <td style={{ textAlign: 'right' }}>
                <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                  <Link href={`/admin/edit/${p.id}`} className="btn-admin" style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', color: 'var(--accent-tertiary)' }} title="Edit Toy Details">
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Link>

                  <button onClick={() => onDelete(p.id, p.name)} className="btn-admin" style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', color: 'var(--accent-primary)', borderColor: 'rgba(255, 82, 82, 0.3)' }} title="Delete Product (Soft Delete)">
                    <Trash2 className="w-3.5 h-3.5" />
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
