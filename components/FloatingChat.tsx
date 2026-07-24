'use client';

import WhatsAppIcon from './WhatsAppIcon';

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
        backgroundColor: '#25D366',
        color: '#ffffff',
        borderRadius: '9999px',
        boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        textDecoration: 'none',
      }}
      className="bouncy-btn"
      title="Chat with Toy Joy Support on WhatsApp"
    >
      <WhatsAppIcon size={32} color="#ffffff" />
    </a>
  );
}
