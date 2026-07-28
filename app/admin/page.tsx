'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ProductType, CATEGORIES } from '@/lib/products';
import { API_ROUTES, ROUTES } from '@/lib/apiRoutes';
import AdminStats from '@/components/AdminStats';
import AdminTable from '@/components/AdminTable';

export default function AdminDashboard() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showStatus = useCallback((type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(API_ROUTES.PRODUCTS);
        const json = await res.json();
        if (isMounted && json.success) setProducts(json.data);
      } catch {
        if (isMounted) showStatus('error', 'Failed to load products from MySQL database');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [showStatus]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to soft delete "${name}" from MySQL?`)) return;

    try {
      const res = await fetch(API_ROUTES.PRODUCT_BY_ID(id), { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        showStatus('success', `Product "${name}" soft deleted successfully!`);
      } else {
        showStatus('error', json.error || 'Delete failed');
      }
    } catch {
      showStatus('error', 'Network error deleting product');
    }
  };

  const handleToggleBestSeller = async (product: ProductType) => {
    try {
      const res = await fetch(API_ROUTES.PRODUCT_BY_ID(product.id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isBestSeller: !product.isBestSeller }),
      });
      const json = await res.json();
      if (json.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, isBestSeller: !p.isBestSeller } : p))
        );
        showStatus('success', `Updated Best Seller status for "${product.name}"`);
      }
    } catch {
      showStatus('error', 'Failed to update Best Seller status');
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <div className="admin-header-row">
        <div>
          <h1 className="admin-title-main">
            Product Inventory Management
          </h1>
        </div>

        <div>
          <Link href={ROUTES.ADMIN_ADD} className="btn-primary-toyjoy btn-admin-add">
            <span className="material-symbols-outlined">add</span>
            <span>Add New Toy</span>
          </Link>
        </div>
      </div>

      {statusMsg && (
        <div className={statusMsg.type === 'success' ? 'admin-status-success' : 'admin-status-error'}>
          <span className="material-symbols-outlined">{statusMsg.type === 'success' ? 'check_circle' : 'error'}</span>
          <span>{statusMsg.text}</span>
        </div>
      )}

      <AdminStats products={products} />

      <div className="admin-header-row">
        <div className="admin-search-wrap">
          <span className="material-symbols-outlined admin-search-icon">search</span>
          <input type="text" className="admin-input admin-search-field" placeholder="Search toy by name..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="admin-cats-row">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`bouncy-btn ${selectedCategory === cat ? 'admin-cat-btn-active' : 'admin-cat-btn-inactive'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <AdminTable products={filteredProducts} loading={loading} onDelete={handleDelete} onToggleBestSeller={handleToggleBestSeller} />
    </div>
  );
}
