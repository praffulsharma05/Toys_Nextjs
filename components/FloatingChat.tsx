'use client';

export default function FloatingChat() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '7878606937';

  return (
    <a
      href={`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent('Hello Toy Joy! I have a question about your toys.')}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        width: '64px',
        height: '64px',
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-on-primary)',
        borderRadius: '9999px',
        boxShadow: '0 10px 25px rgba(0, 88, 190, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        textDecoration: 'none',
      }}
      className="bouncy-btn"
      title="Chat with Toy Joy Support on WhatsApp"
    >
      <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
        forum
      </span>
    </a>
  );
}
