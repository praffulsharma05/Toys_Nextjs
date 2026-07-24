import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingChat from '@/components/FloatingChat';
import Link from 'next/link';

export const metadata = {
  title: 'Gift Joy | Toy Joy Gift Cards & Packs',
};

export default function GiftPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '7878606937';

  // Customized WhatsApp messages for each Gift Box
  const getGiftLink = (name: string, price: string) => {
    const text = `Hello Toy Joy! 👋\nI am interested in buying the *${name}* curated Gift Pack for *${price}*. Please let me know how to proceed!`;
    return `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

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
              <div className="toy-card-content">
                <div className="toy-card-header">
                  <h3 className="toy-card-title">The Ultimate Birthday Box</h3>
                  <span className="toy-card-price">₹1,499</span>
                </div>
                <p className="toy-card-desc">
                  A selection of creative board games and action-packed educational kits tailored for the birthday child.
                </p>
                <div className="toy-card-actions">
                  <a
                    href={getGiftLink('The Ultimate Birthday Box', '₹1,499')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp-toyjoy btn-whatsapp-card bouncy-btn"
                  >
                    <span className="material-symbols-outlined">chat</span>
                    <span>Order via WhatsApp</span>
                  </a>
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
              <div className="toy-card-content">
                <div className="toy-card-header">
                  <h3 className="toy-card-title">STEM Discovery Gift Pack</h3>
                  <span className="toy-card-price">₹1,299</span>
                </div>
                <p className="toy-card-desc">
                  Unleash curiosity with science kits, building tasks, and logic puzzles that make learning fun.
                </p>
                <div className="toy-card-actions">
                  <a
                    href={getGiftLink('STEM Discovery Gift Pack', '₹1,299')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp-toyjoy btn-whatsapp-card bouncy-btn"
                  >
                    <span className="material-symbols-outlined">chat</span>
                    <span>Order via WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Toddler Joy Box */}
            <div className="toy-card">
              <div className="toy-card-img-container">
                <img
                  src="https://images.unsplash.com/photo-1515488042361-404e9250afef?w=500&q=80"
                  alt="Toddler Play Box"
                  className="toy-card-img"
                />
                <span className="toy-card-badge-bestseller">Toddlers</span>
              </div>
              <div className="toy-card-content">
                <div className="toy-card-header">
                  <h3 className="toy-card-title">Toddler Joy Starter Pack</h3>
                  <span className="toy-card-price">₹999</span>
                </div>
                <p className="toy-card-desc">
                  Brightly-colored, safe, and sensory-friendly toys designed to assist fine motor skill development.
                </p>
                <div className="toy-card-actions">
                  <a
                    href={getGiftLink('Toddler Joy Starter Pack', '₹999')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp-toyjoy btn-whatsapp-card bouncy-btn"
                  >
                    <span className="material-symbols-outlined">chat</span>
                    <span>Order via WhatsApp</span>
                  </a>
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
              <div className="toy-card-content">
                <div className="toy-card-header">
                  <h3 className="toy-card-title">Build Your Own Box</h3>
                  <span className="toy-card-price">Tailored</span>
                </div>
                <p className="toy-card-desc">
                  Select any combination of toys from our catalog, and we will package them in a premium gift container.
                </p>
                <div className="toy-card-actions">
                  <a
                    href={`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent('Hello Toy Joy! I want to build my own customized Gift Box. Please assist me.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp-toyjoy btn-whatsapp-card bouncy-btn"
                  >
                    <span className="material-symbols-outlined">chat</span>
                    <span>Customize Now</span>
                  </a>
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
