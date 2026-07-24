import ProductCard from './ProductCard';
import { ProductType } from '@/lib/products';

interface BestSellersProps {
  products: ProductType[];
}

export default function BestSellers({ products }: BestSellersProps) {
  // Filter products marked as isBestSeller, or fallback to first items if none marked yet
  const bestSellers = products.filter((p) => p.isBestSeller);
  const displayItems = bestSellers.length > 0 ? bestSellers : products.slice(0, 4);

  if (products.length === 0) return null;

  return (
    <section style={{ marginBottom: '48px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'var(--color-secondary-container)', padding: '10px', borderRadius: '12px', color: 'var(--color-on-secondary-container)', display: 'flex' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '28px', fontVariationSettings: "'FILL' 1" }}>
              local_fire_department
            </span>
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: '700', color: 'var(--color-on-surface)' }}>
              Best Seller Toys
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
              Most loved and top-rated toys chosen by parents & kids!
            </p>
          </div>
        </div>

        <span style={{ background: 'var(--color-secondary-container)', color: 'var(--color-on-secondary-container)', padding: '6px 16px', borderRadius: '9999px', fontSize: '13px', fontWeight: '700', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
          ★ Top Picked Items
        </span>
      </div>

      <div className="toy-grid">
        {displayItems.map((product) => (
          <ProductCard key={product.id} product={{ ...product, isBestSeller: true }} />
        ))}
      </div>
    </section>
  );
}
