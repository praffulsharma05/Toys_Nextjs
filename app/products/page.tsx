import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import FloatingChat from '@/components/FloatingChat';
import { getProducts } from '@/lib/products';

export const revalidate = 0;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string; bestSeller?: string }>;
}) {
  const params = await searchParams;
  const isBestSeller = params?.bestSeller === 'true';

  let products = await getProducts(params?.category, params?.search, isBestSeller);

  if (isBestSeller) {
    products = products.filter((p) => p.isBestSeller);
  }

  return (
    <div className="page-container-flex">
      <Navbar />
      <main className="page-main-padded container-max">
        <div className="page-header-box">
          <h1 className="page-title-display">
            {isBestSeller ? 'Best Seller Toys ⭐' : 'All Toy Products'}
          </h1>
          <p className="page-subtitle-text">
            {isBestSeller
              ? 'Browse our top-rated and most popular best seller toys chosen by kids & parents.'
              : 'Explore our complete catalog of high quality toys, action figures, STEM games & plushies.'}
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
