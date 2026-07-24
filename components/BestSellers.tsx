import ProductCard from './ProductCard';
import { ProductType } from '@/lib/products';

interface BestSellersProps {
  products: ProductType[];
}

export default function BestSellers({ products }: BestSellersProps) {
  const bestSellers = products.filter((p) => p.isBestSeller);

  if (bestSellers.length === 0) return null;

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

        <span style={{ background: 'var(--color-tertiary-container)', color: 'var(--color-on-tertiary-container)', padding: '6px 14px', borderRadius: '9999px', fontSize: '13px', fontWeight: '700' }}>
          🔥 Top Picked
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
