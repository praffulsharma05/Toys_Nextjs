'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProductType, CATEGORIES } from '@/lib/products';
import AdminStats from '@/components/AdminStats';
import AdminTable from '@/components/AdminTable';
import { Plus, Search, CheckCircle, AlertCircle } from 'lucide-react';

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
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
            Product Inventory Management
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Add, update pricing, set categories, toggle best sellers, and manage toy stock directly in MySQL.
          </p>
        </div>

        <div>
          <Link href="/admin/add" className="btn-primary-toyjoy">
            <Plus className="w-4 h-4" />
            <span>Add New Toy</span>
          </Link>
        </div>
      </div>

      {statusMsg && (
        <div style={{ padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', background: statusMsg.type === 'success' ? 'rgba(37, 211, 102, 0.15)' : 'rgba(255, 82, 82, 0.15)', border: `1px solid ${statusMsg.type === 'success' ? 'rgba(37, 211, 102, 0.4)' : 'rgba(255, 82, 82, 0.4)'}`, color: statusMsg.type === 'success' ? '#25d366' : '#ff5252', fontWeight: '600' }}>
          {statusMsg.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      <AdminStats products={products} />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div className="search-box" style={{ maxWidth: '360px' }}>
          <Search className="search-icon w-4 h-4" />
          <input type="text" className="search-input" placeholder="Search toy..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`category-chip ${selectedCategory === cat ? 'active' : ''}`} style={{ fontSize: '0.82rem', padding: '0.4rem 1rem' }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <AdminTable products={filteredProducts} loading={loading} onDelete={handleDelete} onToggleBestSeller={handleToggleBestSeller} />
    </div>
  );
}
