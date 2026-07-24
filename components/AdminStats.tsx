'use client';

import { ProductType } from '@/lib/products';

export default function AdminStats({ products }: { products: ProductType[] }) {
  const totalProducts = products.length;
  const bestSellersCount = products.filter((p) => p.isBestSeller).length;
  const categoriesCount = new Set(products.map((p) => p.category)).size;
  const totalInventoryValue = products.reduce((acc, p) => acc + p.price * p.stock, 0);

  return (
    <div className="admin-stats-grid">
      <div className="admin-stat-card">
        <div className="admin-stat-icon-blue">
          <span className="material-symbols-outlined">inventory_2</span>
        </div>
        <div>
          <span className="admin-stat-label">Total Toys</span>
          <div className="admin-stat-val-large">{totalProducts}</div>
        </div>
      </div>

      <div className="admin-stat-card">
        <div className="admin-stat-icon-yellow">
          <span className="material-symbols-outlined icon-filled">local_fire_department</span>
        </div>
        <div>
          <span className="admin-stat-label">Best Sellers</span>
          <div className="admin-stat-val-large">{bestSellersCount}</div>
        </div>
      </div>

      <div className="admin-stat-card">
        <div className="admin-stat-icon-red">
          <span className="material-symbols-outlined">category</span>
        </div>
        <div>
          <span className="admin-stat-label">Categories</span>
          <div className="admin-stat-val-large">{categoriesCount}</div>
        </div>
      </div>

      <div className="admin-stat-card">
        <div className="admin-stat-icon-green">
          <span className="material-symbols-outlined">payments</span>
        </div>
        <div>
          <span className="admin-stat-label">Stock Value</span>
          <div className="admin-stat-val-medium">₹{totalInventoryValue.toLocaleString('en-IN')}</div>
        </div>
      </div>
    </div>
  );
}
