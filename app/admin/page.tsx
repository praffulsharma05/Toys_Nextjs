'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProductType, CATEGORIES } from '@/lib/products';
import AdminStats from '@/components/AdminStats';
import AdminTable from '@/components/AdminTable';

export default function AdminDashboard() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const json = await res.json();
      if (json.success) setProducts(json.data);
    } catch (err) {
      showStatus('error', 'Failed to load products from MySQL database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to soft delete "${name}" from MySQL?`)) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        showStatus('success', `Product "${name}" soft deleted successfully!`);
      } else {
        showStatus('error', json.error || 'Delete failed');
      }
    } catch (err) {
      showStatus('error', 'Network error deleting product');
    }
  };

  const handleToggleBestSeller = async (product: ProductType) => {
    try {
      const res = await fetch(`/api/products/${product.id}`, {
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
    } catch (err) {
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
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '24px', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: '700', color: 'var(--color-on-surface)', marginBottom: '8px' }}>
            Product Inventory Management
          </h1>
          <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '15px' }}>
            Add, update pricing, set categories, toggle best sellers, and manage toy stock directly in MySQL.
          </p>
        </div>

        <div>
          <Link href="/admin/add" className="btn-primary-toyjoy">
            <span className="material-symbols-outlined">add</span>
            <span>Add New Toy</span>
          </Link>
        </div>
      </div>

      {statusMsg && (
        <div style={{ padding: '16px 20px', borderRadius: '16px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', background: statusMsg.type === 'success' ? 'rgba(37, 211, 102, 0.15)' : 'rgba(186, 26, 26, 0.15)', color: statusMsg.type === 'success' ? '#20ba59' : '#ba1a1a', fontWeight: '700' }}>
          <span className="material-symbols-outlined">{statusMsg.type === 'success' ? 'check_circle' : 'error'}</span>
          <span>{statusMsg.text}</span>
        </div>
      )}

      <AdminStats products={products} />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ position: 'relative', width: '320px' }}>
          <span className="material-symbols-outlined" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-primary)', fontSize: '20px' }}>search</span>
          <input type="text" className="admin-input" placeholder="Search toy by name..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: '44px', borderRadius: '9999px' }} />
        </div>

        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className="bouncy-btn" style={{ padding: '8px 16px', borderRadius: '9999px', border: 'none', background: selectedCategory === cat ? 'var(--color-primary)' : 'var(--color-surface-container-highest)', color: selectedCategory === cat ? '#ffffff' : 'var(--color-on-surface-variant)', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <AdminTable products={filteredProducts} loading={loading} onDelete={handleDelete} onToggleBestSeller={handleToggleBestSeller} />
    </div>
  );
}
