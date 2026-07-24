import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import BestSellers from '@/components/BestSellers';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import { getProducts } from '@/lib/products';

export const revalidate = 0; // Fresh dynamic rendering

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const params = await searchParams;
  const category = params?.category;
  const search = params?.search;

  // Fetch all products from MySQL database
  const products = await getProducts(category, search);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <div className="container">
          {!search && <HeroBanner />}
          {!search && <BestSellers products={products} />}
          <ProductGrid
            products={products}
            initialCategory={category || 'All'}
            initialSearch={search || ''}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
