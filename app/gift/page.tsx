import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingChat from '@/components/FloatingChat';
import Link from 'next/link';
import { getProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export const metadata = {
  title: 'Gift Joy | Toy Joy Gift Cards & Packs',
};

// Make page dynamic to fetch latest products from database
export const revalidate = 0;

export default async function GiftPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '7878606937';

  // Fetch products with category "Gift" from MySQL
  const dbGifts = await getProducts('Gift');

  return (
    <div className="page-container-flex bg-surface">
      <Navbar />
      <main className="flex-1 container-max page-main-padded">
        <div className="hero-banner-container gift-hero-bg">
          <div className="hero-content">
            <span className="hero-tag-badge">
              <span className="material-symbols-outlined">card_giftcard</span>
              <span>Gifts & Gift Cards</span>
            </span>
            <h1 className="hero-title-text">
              Share the Joy of Endless Play
            </h1>
            <p className="hero-subtitle-text">
              Looking for the perfect gift for birthdays, holidays, or milestones? Choose from our curated Gift Packs or customize a Digital Gift Card!
            </p>
            <div className="hero-btn-row">
              <a
                href={`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent('Hi Toy Joy! I want to order a customized Gift Pack or Gift Card.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-hero bouncy-btn"
              >
                <span className="material-symbols-outlined">chat</span>
                <span>Order Gift on WhatsApp</span>
              </a>
              <Link href="/products" className="btn-hero-glass bouncy-btn">
                <span>Explore Catalog</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Gift Packs Section */}
        <section className="gift-section-padding">
          <div className="page-header-box">
            <h2 className="page-title-display">Curated Gift Packs</h2>
            <p className="page-subtitle-text">
              Hand-picked selections of our best-selling toys arranged in custom gift wrapping.
            </p>
          </div>

          {dbGifts.length === 0 ? (
            <div className="grid-empty-card">
              <div className="lottie-container-wrap">
                {/* @ts-expect-error - dotlottie-player is a third-party custom element loaded via CDN */}
                <dotlottie-player src="https://assets-v2.lottiefiles.com/a/e92c8698-1151-11ee-ab0a-f7211d47ac6f/f9et4o6xEv.lottie" background="transparent" speed="1" className="empty-lottie-player" loop autoplay></dotlottie-player>
              </div>
              <h2 className="grid-empty-title">No Gifts Found</h2>
              <p className="grid-empty-subtitle">
                Add toys with category &apos;Gift&apos; from your Admin Panel to populate your gift catalog!
              </p>
              <Link href="/admin" className="btn-primary-toyjoy btn-clear-empty-state bouncy-btn">
                <span>Go to Admin Panel</span>
              </Link>
            </div>
          ) : (
            <div className="toy-grid">
              {/* Dynamic Gift Products from MySQL database */}
              {dbGifts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
      <FloatingChat />
    </div>
  );
}
