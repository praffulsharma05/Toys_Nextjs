'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/products';
import { Plus, Trash2, Image as ImageIcon, Star } from 'lucide-react';

interface ProductFormProps {
  initialData?: {
    name: string;
    category: string;
    price: string;
    originalPrice: string;
    imageUrl: string;
    images?: string[];
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

  const initialImagesList = initialData?.images && initialData.images.length > 0
    ? initialData.images
    : (initialData?.imageUrl ? [initialData.imageUrl] : ['']);

  const [images, setImages] = useState<string[]>(initialImagesList);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || 'Action Figures',
    price: initialData?.price || '',
    originalPrice: initialData?.originalPrice || '',
    description: initialData?.description || '',
    ageGroup: initialData?.ageGroup || '3+ Years',
    stock: initialData?.stock || '15',
    isBestSeller: initialData?.isBestSeller || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleImageChange = (index: number, value: string) => {
    const updated = [...images];
    updated[index] = value;
    setImages(updated);
  };

  const addImageInput = () => {
    setImages([...images, '']);
  };

  const removeImageInput = (index: number) => {
    if (images.length === 1) {
      setImages(['']);
    } else {
      setImages(images.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    const cleanImages = images.map((s) => s.trim()).filter(Boolean);
    if (cleanImages.length === 0) {
      setErrorMsg('Please provide at least one valid Image URL.');
      setSubmitting(false);
      return;
    }

    try {
      await onSubmit({
        ...formData,
        imageUrl: cleanImages[0],
        images: cleanImages,
      });
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

        {/* Multi-Image URL Management */}
        <div style={{ marginBottom: '24px', background: 'var(--color-surface-container-low)', padding: '20px', borderRadius: '16px', border: '1px solid var(--color-outline-variant)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <label style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-on-surface)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ImageIcon style={{ width: '18px', height: '18px', color: 'var(--color-primary)' }} />
                <span>Product Images (Add Multiple Photos) *</span>
              </label>
              <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '2px' }}>
                Image 1 will be used as the primary featured thumbnail. Add extra URLs for additional toy views.
              </p>
            </div>
            <button
              type="button"
              onClick={addImageInput}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                fontSize: '13px',
                fontWeight: '700',
                background: 'var(--color-primary)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '9999px',
                cursor: 'pointer',
              }}
              className="bouncy-btn"
            >
              <Plus style={{ width: '16px', height: '16px' }} />
              <span>Add Image URL</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {images.map((url, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '12px', overflow: 'hidden', background: '#e0e3e5', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: idx === 0 ? '2px solid var(--color-primary)' : '1px solid var(--color-outline-variant)' }}>
                  {url ? (
                    <img src={url} alt={`Preview ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => (e.currentTarget.style.display = 'none')} />
                  ) : (
                    <span style={{ fontSize: '11px', color: 'var(--color-outline)', fontWeight: '700' }}>#{idx + 1}</span>
                  )}
                </div>

                <div style={{ flex: 1, position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: idx === 0 ? 'var(--color-primary)' : 'var(--color-on-surface-variant)' }}>
                      {idx === 0 ? 'Primary Cover Photo' : `Photo #${idx + 1}`}
                    </span>
                    {idx === 0 && (
                      <span style={{ background: 'var(--color-primary-container)', color: 'var(--color-primary)', fontSize: '10px', padding: '2px 8px', borderRadius: '9999px', fontWeight: '800' }}>
                        FEATURED
                      </span>
                    )}
                  </div>
                  <input
                    type="url"
                    className="admin-input"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={url}
                    onChange={(e) => handleImageChange(idx, e.target.value)}
                    required={idx === 0}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeImageInput(idx)}
                  disabled={images.length === 1 && idx === 0}
                  title="Remove image"
                  style={{
                    padding: '8px',
                    borderRadius: '50%',
                    background: 'var(--color-surface-container-high)',
                    border: 'none',
                    color: images.length === 1 && idx === 0 ? 'var(--color-outline)' : '#ba1a1a',
                    cursor: images.length === 1 && idx === 0 ? 'not-allowed' : 'pointer',
                    marginTop: '20px',
                  }}
                >
                  <Trash2 style={{ width: '18px', height: '18px' }} />
                </button>
              </div>
            ))}
          </div>
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
