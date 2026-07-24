import ProductCard from './ProductCard';
import { ProductType } from '@/lib/products';

interface BestSellersProps {
  products: ProductType[];
}

export default function BestSellers({ products }: BestSellersProps) {
  // Filter products marked as isBestSeller (only show items with isBestSeller badge)
  const bestSellers = products.filter((p) => p.isBestSeller);

  if (bestSellers.length === 0) return null;

  return (
    <section className="bestsellers-section">
      <div className="bestsellers-header-row">
        <div className="bestsellers-title-group">
          <div className="bestsellers-icon-box">
            <span className="material-symbols-outlined bestsellers-fire-icon">
              local_fire_department
            </span>
          </div>
          <div>
            <h2 className="bestsellers-title">
              Best Seller Toys
            </h2>
            <p className="bestsellers-subtitle">
              Most loved and top-rated toys chosen by parents & kids!
            </p>
          </div>
        </div>

        <span className="top-picked-badge bouncy-btn">
          ★ Top Picked Items
        </span>
      </div>

      <div className="toy-grid">
        {bestSellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
