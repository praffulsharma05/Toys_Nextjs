import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import BestSellers from '@/components/BestSellers';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import FloatingChat from '@/components/FloatingChat';
import { getProducts } from '@/lib/products';

export const revalidate = 0;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const params = await searchParams;
  const products = await getProducts(params?.category, params?.search);

  return (
    <div className="page-container-flex">
      <Navbar />
      <main className="flex-1 container-max">
        {!params?.search && <HeroBanner />}
        {!params?.search && <BestSellers products={products} />}
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
