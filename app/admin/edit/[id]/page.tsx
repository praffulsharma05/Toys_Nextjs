'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProductForm, { ProductFormData } from '@/components/ProductForm';
import { ArrowLeft } from 'lucide-react';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState<ProductFormData | null>(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        const json = await res.json();
        if (json.success && json.data) {
          const p = json.data;
          setInitialData({
            name: p.name || '',
            category: p.category || 'Action Figures',
            price: p.price ? String(p.price) : '',
            originalPrice: p.originalPrice ? String(p.originalPrice) : '',
            imageUrl: p.imageUrl || '',
            images: p.images || (p.imageUrl ? [p.imageUrl] : []),
            description: p.description || '',
            ageGroup: p.ageGroup || '3+ Years',
            stock: p.stock ? String(p.stock) : '10',
            isBestSeller: Boolean(p.isBestSeller),
          });
        }
      } catch (err: unknown) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  const handleEditProduct = async (formData: ProductFormData) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
        imageUrl: formData.imageUrl,
        images: formData.images,
        description: formData.description,
        ageGroup: formData.ageGroup,
        stock: Number(formData.stock),
        isBestSeller: Boolean(formData.isBestSeller),
      }),
    });

    const json = await res.json();
    if (json.success) {
      router.push('/admin');
      router.refresh();
    } else {
      throw new Error(json.error || 'Failed to update product');
    }
  };

  if (loading) return <div className="admin-loading-text">Loading product details...</div>;

  return (
    <div>
      <Link href="/admin" className="wishlist-back-link">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Admin Dashboard</span>
      </Link>

      {initialData && (
        <ProductForm
          initialData={initialData}
          title="Edit Toy Details"
          subtitle="Update toy specifications, category, pricing, or best seller status in MySQL"
          submitLabel="Save Changes"
          onSubmit={handleEditProduct}
        />
      )}
    </div>
  );
}
