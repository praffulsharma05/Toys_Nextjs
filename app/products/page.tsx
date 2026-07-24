import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import FloatingChat from '@/components/FloatingChat';
import { getProducts } from '@/lib/products';

export const revalidate = 0;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const params = await searchParams;
  const products = await getProducts(params?.category, params?.search);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, paddingTop: '32px' }} className="container-max">
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: '700', color: 'var(--color-on-surface)' }}>
            All Toy Products
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--color-on-surface-variant)' }}>
            Explore our complete catalog of high quality toys, action figures, STEM games & plushies.
          </p>
        </div>

        <ProductGrid
          products={products}
          initialCategory={params?.category || 'All'}
          initialSearch={params?.search || ''}
        />
      </main>
      <Footer />
      <FloatingChat />
    </div>
  );
}
