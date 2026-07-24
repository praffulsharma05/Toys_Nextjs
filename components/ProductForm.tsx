'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/products';

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
    <div className="admin-card">
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: '700', color: 'var(--color-on-surface)' }}>{title}</h1>
        <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>{subtitle}</p>
      </div>

      {errorMsg && (
        <div style={{ padding: '12px 16px', borderRadius: '12px', background: 'rgba(186, 26, 26, 0.1)', color: '#ba1a1a', marginBottom: '24px', fontSize: '14px', fontWeight: '700' }}>
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '6px', color: 'var(--color-on-surface)' }}>Toy Title / Name *</label>
          <input type="text" name="name" className="admin-input" placeholder="e.g. CyberBot DX Action Figure" value={formData.name} onChange={handleChange} required />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '6px', color: 'var(--color-on-surface)' }}>Category *</label>
            <select name="category" className="admin-select" value={formData.category} onChange={handleChange} required>
              {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '6px', color: 'var(--color-on-surface)' }}>Age Group</label>
            <input type="text" name="ageGroup" className="admin-input" placeholder="e.g. 3-8 Years" value={formData.ageGroup} onChange={handleChange} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '6px', color: 'var(--color-on-surface)' }}>Price (₹) *</label>
            <input type="number" name="price" className="admin-input" placeholder="1499" value={formData.price} onChange={handleChange} min="0" required />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '6px', color: 'var(--color-on-surface)' }}>Original Price (MSRP ₹)</label>
            <input type="number" name="originalPrice" className="admin-input" placeholder="1999" value={formData.originalPrice} onChange={handleChange} min="0" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '6px', color: 'var(--color-on-surface)' }}>Stock Quantity</label>
            <input type="number" name="stock" className="admin-input" value={formData.stock} onChange={handleChange} min="0" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '6px', color: 'var(--color-on-surface)' }}>Highlight</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '700', color: 'var(--color-secondary)' }}>
              <input type="checkbox" name="isBestSeller" checked={formData.isBestSeller} onChange={handleChange} style={{ width: '18px', height: '18px' }} />
              <span>Mark as Best Seller</span>
            </label>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '6px', color: 'var(--color-on-surface)' }}>Image URL *</label>
          <input type="url" name="imageUrl" className="admin-input" placeholder="https://..." value={formData.imageUrl} onChange={handleChange} required />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '6px', color: 'var(--color-on-surface)' }}>Description *</label>
          <textarea name="description" className="admin-textarea" rows={3} value={formData.description} onChange={handleChange} required />
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <button type="submit" disabled={submitting} className="btn-primary-toyjoy" style={{ flex: 1, padding: '12px' }}>
            {submitting ? 'Saving to Database...' : submitLabel}
          </button>
          <Link href="/admin" className="btn-whatsapp-toyjoy" style={{ padding: '12px 24px', background: 'var(--color-surface-container-high)', color: 'var(--color-on-surface)' }}>Cancel</Link>
        </div>
      </form>
    </div>
  );
}
