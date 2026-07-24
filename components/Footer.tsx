import Link from 'next/link';

export default function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '7878606937';

  return (
    <footer style={{ background: 'var(--surface-container-highest)', marginTop: '48px', borderTopLeftRadius: 'var(--radius-lg)', borderTopRightRadius: 'var(--radius-lg)' }}>
      <div className="container-max" style={{ padding: '48px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px', marginBottom: '32px' }}>
          
          {/* Brand Col */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '360px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--primary)' }}>
                rocket_launch
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '700', color: 'var(--on-surface)' }}>
                Toy Joy
              </span>
            </div>
            <p style={{ fontSize: '15px', color: 'var(--on-surface-variant)', lineHeight: '1.6' }}>
              We believe in play that fuels the imagination and builds lasting memories. Quality toys for every stage of growth.
            </p>
            <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary)', marginTop: '8px' }}>
              © {new Date().getFullYear()} Toy Joy. Play with Purpose.
            </p>
          </div>

          {/* Shop */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontWeight: '700', color: 'var(--on-surface)', fontSize: '15px', marginBottom: '8px' }}>Shop</span>
            <Link href="/" style={{ fontSize: '14px', color: 'var(--on-surface-variant)' }}>All Toys</Link>
            <Link href="/?category=Educational" style={{ fontSize: '14px', color: 'var(--on-surface-variant)' }}>Age Groups</Link>
            <Link href="/?bestSeller=true" style={{ fontSize: '14px', color: 'var(--on-surface-variant)' }}>Best Sellers</Link>
          </div>

          {/* Support & WhatsApp */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontWeight: '700', color: 'var(--on-surface)', fontSize: '15px', marginBottom: '8px' }}>Support & Order</span>
            <a
              href={`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent('Hello Toy Joy! I have an order inquiry.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-toyjoy"
              style={{ width: 'fit-content', padding: '8px 16px', fontSize: '13px' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chat</span>
              <span>WhatsApp: +91 {whatsappNumber}</span>
            </a>
            <span style={{ fontSize: '14px', color: 'var(--on-surface-variant)' }}>Shipping Info</span>
            <span style={{ fontSize: '14px', color: 'var(--on-surface-variant)' }}>Returns & Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
