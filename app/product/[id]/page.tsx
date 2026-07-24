import { getProductById, getProducts } from '@/lib/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductGallery from '@/components/ProductGallery';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ShieldCheck, Truck, RefreshCw, Flame } from 'lucide-react';
import WishlistButton from '@/components/WishlistButton';
import WhatsAppIcon from '@/components/WhatsAppIcon';

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

  const whatsappMsg = `Hello Toy Joy! 👋\nI want to purchase:\n🧸 *Toy*: ${product.name}\n💰 *Price*: ₹${product.price.toLocaleString('en-IN')}\n🏷️ *Category*: ${product.category}\n📌 *ID*: ${product.id}`;
  const whatsappLink = `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

  const allProducts = await getProducts(product.category);
  const relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="page-wrapper">
      <Navbar />

      <main className="main-content">
        <div className="container-max">
          <Link href="/" className="detail-back-link">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Toys</span>
          </Link>

          <div className="detail-grid-box">
            <ProductGallery
              images={product.images && product.images.length > 0 ? product.images : [product.imageUrl]}
              name={product.name}
              isBestSeller={product.isBestSeller}
              discountPercent={discountPercent}
            />

            <div className="detail-info-col">
              <div className="detail-category-row">
                <span className="detail-badge-category">
                  {product.category}
                </span>
                <span className="detail-age-text">
                  Age: <strong>{product.ageGroup}</strong>
                </span>
              </div>

              <h1 className="detail-title">
                {product.name}
              </h1>

              <div className="detail-price-row">
                <span className="detail-price-current">₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="detail-price-original">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                )}
              </div>

              {/* Low Stock Alert Banner (Only shown if stock <= 5 and > 0) */}
              {product.stock <= 5 && product.stock > 0 && (
                <div className="detail-alert-lowstock">
                  <Flame className="flame-icon-urgent" />
                  <span>Hurry! Only {product.stock} items remaining in stock - order soon!</span>
                </div>
              )}

              {product.stock === 0 && (
                <div className="detail-alert-outofstock">
                  Out of Stock - Back in stock soon!
                </div>
              )}

              <div className="detail-desc-box">
                <h3 className="detail-desc-title">Product Description</h3>
                <p className="detail-desc-text">{product.description}</p>
              </div>

              {/* Action Buttons Row */}
              <div className="detail-btn-row">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp-toyjoy btn-whatsapp-detail bouncy-btn"
                >
                  <WhatsAppIcon size={22} color="#ffffff" />
                  <span>Buy Now on WhatsApp</span>
                </a>

                <div className="wishlist-btn-wrap">
                  <WishlistButton productId={product.id} />
                </div>
              </div>

              {/* Trust Badges */}
              <div className="detail-features-grid">
                <div className="detail-feature-item">
                  <div className="detail-feature-icon-wrapper icon-wrapper-primary">
                    <ShieldCheck className="detail-feature-icon feature-icon-primary" />
                  </div>
                  <span className="detail-feature-text">Child Safe</span>
                </div>
                <div className="detail-feature-item">
                  <div className="detail-feature-icon-wrapper icon-wrapper-secondary">
                    <Truck className="detail-feature-icon feature-icon-secondary" />
                  </div>
                  <span className="detail-feature-text">Fast Delivery</span>
                </div>
                <div className="detail-feature-item">
                  <div className="detail-feature-icon-wrapper icon-wrapper-tertiary">
                    <RefreshCw className="detail-feature-icon feature-icon-tertiary" />
                  </div>
                  <span className="detail-feature-text">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <section className="detail-related-section">
              <h2 className="detail-related-title">
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
