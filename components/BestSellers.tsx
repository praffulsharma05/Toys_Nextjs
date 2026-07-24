import ProductCard from './ProductCard';
import { ProductType } from '@/lib/products';
import { Flame, Sparkles } from 'lucide-react';

interface BestSellersProps {
  products: ProductType[];
}

export default function BestSellers({ products }: BestSellersProps) {
  const bestSellers = products.filter((p) => p.isBestSeller);

  if (bestSellers.length === 0) return null;

  return (
    <section style={{ margin: '3rem 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'rgba(255, 183, 3, 0.15)', padding: '0.6rem', borderRadius: '12px', color: '#ffb703', display: 'flex' }}>
            <Flame className="w-6 h-6 fill-current text-yellow-500" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
              Best Seller Toys
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Most loved and highly recommended toys by kids and parents!
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 82, 82, 0.1)', padding: '0.4rem 0.9rem', borderRadius: 'var(--radius-pill)', border: '1px solid rgba(255, 82, 82, 0.25)', color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: '700' }}>
          <Sparkles className="w-4 h-4" />
          <span>{bestSellers.length} Top Picked Items</span>
        </div>
      </div>

      <div className="product-grid">
        {bestSellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
