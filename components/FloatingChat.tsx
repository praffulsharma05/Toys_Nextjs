'use client';

import WhatsAppIcon from './WhatsAppIcon';

export default function FloatingChat() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '7878606937';

  return (
    <a
      href={`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent('Hello Toy Joy! I have a question about your toys.')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-chat-btn bouncy-btn"
      title="Chat with Toy Joy Support on WhatsApp"
    >
      <WhatsAppIcon size={32} color="#ffffff" />
    </a>
  );
}
