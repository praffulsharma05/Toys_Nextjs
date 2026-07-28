'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/products';
import { API_ROUTES, ROUTES } from '@/lib/apiRoutes';
import { Plus, Trash2, Image as ImageIcon, Upload } from 'lucide-react';

export interface ProductFormData {
  name: string;
  category: string;
  price: string;
  originalPrice: string;
  imageUrl: string;
  images: string[];
  description: string;
  ageGroup: string;
  stock: string;
  isBestSeller: boolean;
}

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
  onSubmit: (data: ProductFormData) => Promise<void>;
}

export default function ProductForm({ initialData, title, subtitle, submitLabel, onSubmit }: ProductFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const fileInputRefs = useRef<Map<number, HTMLInputElement>>(new Map());

  const initialImagesList = initialData?.images && initialData.images.length > 0
    ? initialData.images
    : (initialData?.imageUrl ? [initialData.imageUrl] : ['']);

  const [images, setImages] = useState<string[]>(initialImagesList);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || 'Educational',
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

  const handleFileUpload = async (index: number, file: File) => {
    setUploadingIdx(index);
    setErrorMsg('');
    try {
      const body = new FormData();
      body.append('file', file);
      const res = await fetch(API_ROUTES.UPLOAD, { method: 'POST', body });
      const json = await res.json();
      if (json.success && json.url) {
        handleImageChange(index, json.url);
      } else {
        setErrorMsg(json.error || 'Upload failed');
      }
    } catch {
      setErrorMsg('Image upload failed. Please try again.');
    } finally {
      setUploadingIdx(null);
    }
  };

  const triggerFileInput = (index: number) => {
    const input = fileInputRefs.current.get(index);
    if (input) input.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    const cleanImages = images.map((s) => s.trim()).filter(Boolean);
    if (cleanImages.length === 0) {
      setErrorMsg('Please upload at least one product image.');
      setSubmitting(false);
      return;
    }

    try {
      await onSubmit({
        ...formData,
        imageUrl: cleanImages[0],
        images: cleanImages,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Action failed');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-card">
      <div className="form-header-box">
        <h1 className="form-title-text">{title}</h1>
        <p className="form-subtitle-text">{subtitle}</p>
      </div>

      {errorMsg && (
        <div className="form-alert-error">
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group-mb">
          <label className="form-label-block">Toy Title / Name *</label>
          <input type="text" name="name" className="admin-input" placeholder="e.g. CyberBot DX Action Figure" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-grid-2col">
          <div>
            <label className="form-label-block">Category *</label>
            <select name="category" className="admin-select" value={formData.category} onChange={handleChange} required>
              {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label-block">Age Group</label>
            <input type="text" name="ageGroup" className="admin-input" placeholder="e.g. 3-8 Years" value={formData.ageGroup} onChange={handleChange} />
          </div>
        </div>

        <div className="form-grid-2col">
          <div>
            <label className="form-label-block">Price (₹) *</label>
            <input type="number" name="price" className="admin-input" placeholder="1499" value={formData.price} onChange={handleChange} min="0" required />
          </div>
          <div>
            <label className="form-label-block">Original Price (MSRP ₹)</label>
            <input type="number" name="originalPrice" className="admin-input" placeholder="1999" value={formData.originalPrice} onChange={handleChange} min="0" />
          </div>
        </div>

        <div className="form-grid-2col">
          <div>
            <label className="form-label-block">Stock Quantity</label>
            <input type="number" name="stock" className="admin-input" value={formData.stock} onChange={handleChange} min="0" />
          </div>
          <div className="flex-col justify-center">
            <label className="form-label-block">Highlight</label>
            <label className="form-checkbox-label">
              <input type="checkbox" name="isBestSeller" checked={formData.isBestSeller} onChange={handleChange} className="form-checkbox-input" />
              <span>Mark as Best Seller</span>
            </label>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="form-multiimg-box">
          <div className="form-multiimg-header">
            <div>
              <label className="form-multiimg-label">
                <ImageIcon className="form-multiimg-icon" />
                <span>Product Images (Upload Photos) *</span>
              </label>
              <p className="form-multiimg-sub">
                Upload images from your device. Image 1 is the primary featured thumbnail. Max 5MB per image.
              </p>
            </div>
          </div>

          <div className="form-img-list">
            {images.map((url, idx) => (
              <div key={idx} className="form-upload-card">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                  className="form-file-hidden"
                  ref={(el) => { if (el) fileInputRefs.current.set(idx, el); }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(idx, file);
                    e.target.value = '';
                  }}
                />

                <div className="form-upload-card-top">
                  <div className="form-img-title-row">
                    <span className={idx === 0 ? 'form-img-title-primary' : 'form-img-title-sub'}>
                      {idx === 0 ? 'Primary Cover Photo' : `Photo #${idx + 1}`}
                    </span>
                    {idx === 0 && (
                      <span className="form-badge-featured">FEATURED</span>
                    )}
                  </div>

                  {url ? (
                    <div className="form-upload-preview-wrap">
                      <img src={url} alt={`Preview ${idx + 1}`} className="form-upload-preview-img" onError={(e) => (e.currentTarget.style.display = 'none')} />
                      <div className="form-upload-preview-actions">
                        <button
                          type="button"
                          onClick={() => triggerFileInput(idx)}
                          disabled={uploadingIdx === idx}
                          className="form-upload-replace-btn bouncy-btn"
                        >
                          <Upload className="form-upload-icon" />
                          <span>{uploadingIdx === idx ? 'Uploading...' : 'Replace Image'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => removeImageInput(idx)}
                          disabled={images.length === 1 && idx === 0}
                          title="Remove image"
                          className={images.length === 1 && idx === 0 ? 'form-remove-btn-disabled' : 'form-remove-btn-active'}
                        >
                          <Trash2 className="form-trash-icon" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => triggerFileInput(idx)}
                      disabled={uploadingIdx === idx}
                      className="form-upload-dropzone"
                    >
                      {uploadingIdx === idx ? (
                        <span className="form-upload-spinner-large">⏳</span>
                      ) : (
                        <Upload className="form-dropzone-icon" />
                      )}
                      <span className="form-dropzone-text">
                        {uploadingIdx === idx ? 'Uploading image...' : 'Click to upload image'}
                      </span>
                      <span className="form-dropzone-hint">JPEG, PNG, WebP, GIF — Max 5MB</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addImageInput}
            className="form-add-photo-btn bouncy-btn"
          >
            <Plus className="form-plus-icon" />
            <span>Add Another Photo</span>
          </button>
        </div>

        <div className="form-group-mb">
          <label className="form-label-block">Description *</label>
          <textarea name="description" className="admin-textarea" rows={3} value={formData.description} onChange={handleChange} required />
        </div>

        <div className="display-flex gap-16">
          <button type="submit" disabled={submitting} className="btn-primary-toyjoy form-btn-submit">
            {submitting ? 'Saving to Database...' : submitLabel}
          </button>
          <Link href={ROUTES.ADMIN} className="btn-whatsapp-toyjoy form-btn-cancel">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
