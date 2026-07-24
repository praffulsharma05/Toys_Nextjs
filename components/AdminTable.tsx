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
  if (loading) return <div className="admin-loading-text">Loading products from MySQL database...</div>;

  if (products.length === 0) {
    return (
      <div className="admin-empty-card">
        <p className="admin-empty-text">
          No products found in MySQL database. Use &quot;Add New Toy&quot; to add products from the admin panel.
        </p>
        <Link href="/admin/add" className="btn-primary-toyjoy">
          <span className="material-symbols-outlined">add</span>
          <span>Add Your First Toy Product</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr className="admin-table-header-row">
            <th className="admin-table-th">Toy</th>
            <th className="admin-table-th">Category</th>
            <th className="admin-table-th">Price</th>
            <th className="admin-table-th">Best Seller</th>
            <th className="admin-table-th">Stock</th>
            <th className="admin-table-th-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="admin-table-row">
              <td className="admin-table-td">
                <div className="admin-toy-flex">
                  <img src={p.imageUrl} alt={p.name} className="admin-toy-img" />
                  <div>
                    <div className="admin-toy-title">{p.name}</div>
                    <div className="admin-toy-age">Age: {p.ageGroup}</div>
                  </div>
                </div>
              </td>
              <td className="admin-table-td">
                <span className="admin-badge-category">
                  {p.category}
                </span>
              </td>
              <td className="admin-table-td">
                <strong className="admin-toy-price">₹{p.price.toLocaleString('en-IN')}</strong>
              </td>
              <td className="admin-table-td">
                <button
                  onClick={() => onToggleBestSeller(p)}
                  className={p.isBestSeller ? 'admin-bestseller-toggle-active' : 'admin-bestseller-toggle-inactive'}
                >
                  {p.isBestSeller ? '★ Best Seller' : 'No'}
                </button>
              </td>
              <td className="admin-table-td">
                <span className={p.stock > 5 ? 'admin-stock-text-normal' : 'admin-stock-text-low'}>
                  {p.stock} pcs
                </span>
              </td>
              <td className="admin-table-td-right">
                <div className="admin-actions-flex">
                  <Link href={`/admin/edit/${p.id}`} className="btn-primary-toyjoy admin-btn-edit" title="Edit Toy Details">
                    <span className="material-symbols-outlined admin-action-icon">edit</span>
                  </Link>

                  <button onClick={() => onDelete(p.id, p.name)} className="bouncy-btn admin-btn-delete" title="Soft Delete Product">
                    <span className="material-symbols-outlined admin-action-icon">delete</span>
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
