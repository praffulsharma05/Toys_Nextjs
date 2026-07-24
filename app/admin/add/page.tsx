'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProductForm from '@/components/ProductForm';
import { ArrowLeft } from 'lucide-react';

export default function AddProductPage() {
  const router = useRouter();

  const handleAddProduct = async (formData: any) => {
    const res = await fetch('/api/products', {
      method: 'POST',
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
        stock: Number(formData.stock || 10),
        isBestSeller: Boolean(formData.isBestSeller),
      }),
    });

    const json = await res.json();
    if (json.success) {
      router.push('/admin');
      router.refresh();
    } else {
      throw new Error(json.error || 'Failed to add product');
    }
  };

  return (
    <div>
      <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Admin Dashboard</span>
      </Link>

      <ProductForm
        title="Add New Toy Product"
        subtitle="Fill details to add a new toy to your store catalog in MySQL"
        submitLabel="Save & Publish Product"
        onSubmit={handleAddProduct}
      />
    </div>
  );
}
