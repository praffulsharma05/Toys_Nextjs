import Link from 'next/link';
import { ROUTES } from '@/lib/apiRoutes';

export default function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '7878606937';

  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-col-main">
          <div className="footer-brand-row">
            <span className="material-symbols-outlined nav-shield-icon text-primary">
              rocket_launch
            </span>
            <span className="footer-brand-title">
              Toy Joy
            </span>
          </div>
          <p className="footer-brand-text">
            We believe in play that fuels the imagination and builds lasting memories. Quality toys for every stage of growth.
          </p>
          <p className="footer-copy-text">
            © {new Date().getFullYear()} Toy Joy. Play with Purpose.
          </p>
        </div>

        <div className="footer-links-grid">
          <div className="footer-links-col">
            <span className="footer-link-title">Shop</span>
            <Link href={ROUTES.HOME} className="footer-link-item">All Toys</Link>
            <Link href={ROUTES.PRODUCTS_CATEGORY_EDUCATIONAL} className="footer-link-item">Age Groups</Link>
            <Link href={ROUTES.PRODUCTS_BEST_SELLER} className="footer-link-item">Gift Cards</Link>
          </div>

          <div className="footer-links-col">
            <span className="footer-link-title">Support</span>
            <a href={`https://wa.me/91${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="footer-link-item text-primary font-bold">
              WhatsApp: +91 {whatsappNumber}
            </a>
            <span className="footer-link-item">Shipping Info</span>
            <span className="footer-link-item">Returns</span>
          </div>

          <div className="footer-links-col">
            <span className="footer-link-title">Legal</span>
            <span className="footer-link-item">Privacy Policy</span>
            <span className="footer-link-item">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
