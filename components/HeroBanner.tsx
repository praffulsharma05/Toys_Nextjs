'use client';

export default function HeroBanner() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '7878606937';

  return (
    <div
      style={{
        height: '50vh',
        minHeight: '380px',
        maxHeight: '520px',
        width: '100%',
        borderRadius: '24px',
        margin: '24px 0 48px 0',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: "linear-gradient(90deg, rgba(0, 26, 66, 0.85) 0%, rgba(0, 88, 190, 0.45) 60%, transparent 100%), url('https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        padding: '0 48px',
        boxShadow: 'var(--plush-shadow)',
      }}
    >
      <div style={{ maxWidth: '600px', color: '#ffffff', zIndex: 2 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(252, 212, 0, 0.25)', border: '1px solid #fcd400', borderRadius: '9999px', color: '#fcd400', fontSize: '13px', fontWeight: '700', marginBottom: '16px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>stars</span>
          <span>Special Discount • Instant WhatsApp Order</span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '42px', fontWeight: '700', lineHeight: '1.15', marginBottom: '12px', color: '#ffffff' }}>
          Discover Magic & Pure Joy!
        </h1>

        <p style={{ fontSize: '16px', color: '#e0e3e5', lineHeight: '1.6', marginBottom: '24px' }}>
          From wooden wonders to high-tech gadgets, find the perfect companion for your child's next adventure.
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <a
            href={`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent('Hello Toy Joy! I want to inquire about your top best-seller toys.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-toyjoy bouncy-btn"
          >
            <span className="material-symbols-outlined">forum</span>
            <span>Order via WhatsApp (+91 {whatsappNumber})</span>
          </a>
          <a href="/products" className="btn-primary-toyjoy bouncy-btn">
            <span>View All Products</span>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  );
}
