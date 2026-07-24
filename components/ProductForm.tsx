'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/products';
import { Flame, AlertCircle } from 'lucide-react';

interface ProductFormProps {
  initialData?: {
    name: string;
    category: string;
    price: string;
    originalPrice: string;
    imageUrl: string;
    description: string;
    ageGroup: string;
    stock: string;
    isBestSeller: boolean;
  };
  title: string;
  subtitle: string;
  submitLabel: string;
  onSubmit: (data: any) => Promise<void>;
}

export default function ProductForm({ initialData, title, subtitle, submitLabel, onSubmit }: ProductFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState(
    initialData || {
      name: '',
      category: 'Action Figures',
      price: '',
      originalPrice: '',
      imageUrl: '',
      description: '',
      ageGroup: '3+ Years',
      stock: '15',
      isBestSeller: false,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    try {
      await onSubmit(formData);
    } catch (err: any) {
      setErrorMsg(err.message || 'Action failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-card">
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-main)' }}>{title}</h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{subtitle}</p>
      </div>

      {errorMsg && (
        <div style={{ padding: '0.9rem', borderRadius: '12px', background: 'rgba(255,82,82,0.15)', border: '1px solid rgba(255,82,82,0.4)', color: '#ff5252', marginBottom: '1.5rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle className="w-5 h-5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Toy Title / Name *</label>
          <input type="text" name="name" className="form-input" placeholder="e.g. CyberBot DX Action Figure" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">Category *</label>
            <select name="category" className="form-select" value={formData.category} onChange={handleChange} required>
              {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Recommended Age Group</label>
            <input type="text" name="ageGroup" className="form-input" placeholder="e.g. 3-8 Years" value={formData.ageGroup} onChange={handleChange} />
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">Selling Price (₹) *</label>
            <input type="number" name="price" className="form-input" placeholder="1499" value={formData.price} onChange={handleChange} min="0" required />
          </div>
          <div className="form-group">
            <label className="form-label">Original Price / MSRP (₹)</label>
            <input type="number" name="originalPrice" className="form-input" placeholder="1999" value={formData.originalPrice} onChange={handleChange} min="0" />
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">Stock Quantity</label>
            <input type="number" name="stock" className="form-input" value={formData.stock} onChange={handleChange} min="0" />
          </div>
          <div className="form-group" style={{ justifyContent: 'center' }}>
            <label className="form-label">Best Seller</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
              <input type="checkbox" name="isBestSeller" checked={formData.isBestSeller} onChange={handleChange} style={{ width: '18px', height: '18px' }} />
              <span style={{ color: '#ffb703', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Flame className="w-4 h-4 fill-current" /> Best Seller
              </span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Image URL *</label>
          <input type="url" name="imageUrl" className="form-input" placeholder="https://..." value={formData.imageUrl} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label className="form-label">Product Description *</label>
          <textarea name="description" className="form-textarea" rows={3} value={formData.description} onChange={handleChange} required />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button type="submit" disabled={submitting} className="btn-primary-toyjoy" style={{ flex: 1, padding: '0.75rem' }}>
            {submitting ? 'Saving...' : submitLabel}
          </button>
          <Link href="/admin" className="btn-admin" style={{ padding: '0.75rem 1.5rem' }}>Cancel</Link>
        </div>
      </form>
    </div>
  );
}
