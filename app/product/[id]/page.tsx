import { getProductById, getProducts } from '@/lib/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductGallery from '@/components/ProductGallery';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MessageCircle, ShieldCheck, Truck, RefreshCw, Star } from 'lucide-react';

export const revalidate = 0;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '7878606937';
  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : null;
  const savings = product.originalPrice && product.originalPrice > product.price ? product.originalPrice - product.price : 0;

  const whatsappMsg = `Hello Toy Joy! 👋\nI want to purchase:\n🧸 *Toy*: ${product.name}\n💰 *Price*: ₹${product.price.toLocaleString('en-IN')}\n🏷️ *Category*: ${product.category}\n📌 *ID*: ${product.id}`;
  const whatsappLink = `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

  const allProducts = await getProducts(product.category);
  const relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '2rem 0' }}>
        <div className="container-max">
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--on-surface-variant)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '2rem' }}>
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Toys</span>
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', background: '#ffffff', border: '1px solid var(--outline-variant)', borderRadius: '24px', padding: '2.5rem', boxShadow: 'var(--plush-shadow)', marginBottom: '4rem' }}>
            <ProductGallery
              images={product.images && product.images.length > 0 ? product.images : [product.imageUrl]}
              name={product.name}
              isBestSeller={product.isBestSeller}
              discountPercent={discountPercent}
            />

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
                <span style={{ background: 'var(--primary-container)', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: '800', padding: '4px 12px', borderRadius: 'var(--radius-full)' }}>
                  {product.category}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--on-surface-variant)', fontWeight: '600' }}>
                  Age: <strong>{product.ageGroup}</strong>
                </span>
              </div>

              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: '800', color: 'var(--on-surface)', marginBottom: '0.75rem' }}>
                {product.name}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', color: '#fcd400' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} style={{ width: '18px', height: '18px', fill: '#fcd400' }} />
                  ))}
                </div>
                <span style={{ color: 'var(--outline)', fontSize: '0.9rem', fontWeight: '600' }}>(128 reviews)</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '2.4rem', fontWeight: '800', color: 'var(--primary)' }}>₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span style={{ fontSize: '1.25rem', color: 'var(--outline)', textDecoration: 'line-through' }}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
                )}
              </div>

              <div style={{ background: 'var(--surface-container-low)', padding: '1.25rem', borderRadius: '16px', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--on-surface)', marginBottom: '0.4rem' }}>Product Description</h3>
                <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.95rem', lineHeight: '1.6' }}>{product.description}</p>
              </div>

              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp-toyjoy" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                <MessageCircle style={{ width: '22px', height: '22px' }} />
                <span>Buy Now on WhatsApp (+91 {whatsappNumber})</span>
              </a>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--outline-variant)' }}>
                <div style={{ textAlign: 'center' }}>
                  <ShieldCheck style={{ width: '22px', height: '22px', color: 'var(--primary)', margin: '0 auto 0.3rem auto' }} />
                  <span style={{ fontSize: '0.78rem', color: 'var(--on-surface-variant)', fontWeight: '600' }}>Child Safe</span>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Truck style={{ width: '22px', height: '22px', color: 'var(--secondary)', margin: '0 auto 0.3rem auto' }} />
                  <span style={{ fontSize: '0.78rem', color: 'var(--on-surface-variant)', fontWeight: '600' }}>Fast Delivery</span>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <RefreshCw style={{ width: '22px', height: '22px', color: 'var(--tertiary)', margin: '0 auto 0.3rem auto' }} />
                  <span style={{ fontSize: '0.78rem', color: 'var(--on-surface-variant)', fontWeight: '600' }}>Easy Returns</span>
                </div>
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <section>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: '800', color: 'var(--on-surface)', marginBottom: '1.5rem' }}>
                More Toys in {product.category}
              </h2>
              <div className="toy-grid">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
