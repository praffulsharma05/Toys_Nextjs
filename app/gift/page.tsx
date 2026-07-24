import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingChat from '@/components/FloatingChat';
import Link from 'next/link';

export const metadata = {
  title: 'Gift Joy | Toy Joy Gift Cards & Packs',
};

export default function GiftPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '7878606937';

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

          <div className="toy-grid">
            {/* Birthday Box */}
            <div className="toy-card">
              <div className="toy-card-img-container">
                <img
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&q=80"
                  alt="Birthday Gift Box"
                  className="toy-card-img"
                />
                <span className="toy-card-badge-bestseller">Popular</span>
              </div>
              <div className="card-info-wrap">
                <h3 className="card-title-toy">The Ultimate Birthday Box</h3>
                <p className="card-desc-toy">A selection of creative board games and action-packed educational kits tailored for the birthday child.</p>
                <div className="card-price-row">
                  <span className="card-price-now">₹1,499</span>
                </div>
              </div>
            </div>

            {/* STEM Kit Box */}
            <div className="toy-card">
              <div className="toy-card-img-container">
                <img
                  src="https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?w=500&q=80"
                  alt="STEM Discovery Box"
                  className="toy-card-img"
                />
                <span className="toy-card-badge-bestseller">Educational</span>
              </div>
              <div className="card-info-wrap">
                <h3 className="card-title-toy">STEM Discovery Gift Pack</h3>
                <p className="card-desc-toy">Unleash curiosity with science kits, building tasks, and logic puzzles that make learning fun.</p>
                <div className="card-price-row">
                  <span className="card-price-now">₹1,299</span>
                </div>
              </div>
            </div>

            {/* Toddler Box */}
            <div className="toy-card">
              <div className="toy-card-img-container">
                <img
                  src="https://images.unsplash.com/photo-1515488042361-404e9250afef?w=500&q=80"
                  alt="Toddler Play Box"
                  className="toy-card-img"
                />
                <span className="toy-card-badge-bestseller">Toddlers</span>
              </div>
              <div className="card-info-wrap">
                <h3 className="card-title-toy">Toddler Joy Starter Pack</h3>
                <p className="card-desc-toy">Brightly-colored, safe, and sensory-friendly toys designed to assist fine motor skill development.</p>
                <div className="card-price-row">
                  <span className="card-price-now">₹999</span>
                </div>
              </div>
            </div>

            {/* Custom Box */}
            <div className="toy-card">
              <div className="toy-card-img-container">
                <img
                  src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=500&q=80"
                  alt="Build Your Own Gift Box"
                  className="toy-card-img"
                />
                <span className="toy-card-badge-bestseller">Custom</span>
              </div>
              <div className="card-info-wrap">
                <h3 className="card-title-toy">Build Your Own Box</h3>
                <p className="card-desc-toy">Select any combination of toys from our catalog, and we will package them in a premium gift container.</p>
                <div className="card-price-row">
                  <span className="card-price-now">Tailored Pricing</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingChat />
    </div>
  );
}
