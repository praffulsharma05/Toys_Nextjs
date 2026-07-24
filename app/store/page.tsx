import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import FloatingChat from '@/components/FloatingChat';
import { getProducts } from '@/lib/products';

export const revalidate = 0;

export default async function StorePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const params = await searchParams;
  const products = await getProducts(params?.category, params?.search);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }} className="container-max">
        {!params?.search && <HeroBanner />}
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
