import Link from 'next/link';

export default function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '7878606937';

  return (
    <footer className="footer-section">
      <div className="container-max" style={{ padding: '48px 40px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '360px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined text-primary" style={{ fontSize: '32px', color: 'var(--color-primary)' }}>
              rocket_launch
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '700', color: 'var(--color-on-surface)' }}>
              Toy Joy
            </span>
          </div>
          <p style={{ fontSize: '15px', color: 'var(--color-on-surface-variant)', lineHeight: '1.6' }}>
            We believe in play that fuels the imagination and builds lasting memories. Quality toys for every stage of growth.
          </p>
          <p style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-primary)', marginTop: '8px' }}>
            © {new Date().getFullYear()} Toy Joy. Play with Purpose.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontWeight: '700', color: 'var(--color-on-surface)', fontSize: '14px', marginBottom: '8px' }}>Shop</span>
            <Link href="/" style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>All Toys</Link>
            <Link href="/?category=Educational" style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>Age Groups</Link>
            <Link href="/?bestSeller=true" style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>Gift Cards</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontWeight: '700', color: 'var(--color-on-surface)', fontSize: '14px', marginBottom: '8px' }}>Support</span>
            <a href={`https://wa.me/91${whatsappNumber}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: 'var(--color-primary)', fontWeight: '700' }}>
              WhatsApp: +91 {whatsappNumber}
            </a>
            <span style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>Shipping Info</span>
            <span style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>Returns</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontWeight: '700', color: 'var(--color-on-surface)', fontSize: '14px', marginBottom: '8px' }}>Legal</span>
            <span style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>Privacy Policy</span>
            <span style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
