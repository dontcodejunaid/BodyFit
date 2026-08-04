import React, { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WhatsAppIcon } from './social-icons';
import FaqChatbot from './faq-chatbot';
import { ShinySheenButton } from './shiny-button-sheen';
import { WhatsAppConfig } from '../../utils/whatsapp';
import { ADMIN_HASH } from '../admin/AdminPortal';

/**
 * Fixed helper stack in the bottom-right corner: the FAQ assistant sitting
 * above a direct WhatsApp line. Hidden while the admin portal is open.
 *
 * The live Open/Closed badge deliberately lives in Hero.jsx, which pins its own
 * `fixed bottom-4 left-4` pill to the viewport. Do not add a second badge here
 * — the two stack on top of each other in the same corner.
 */
export default function FloatingActions() {
  const [chatOpen, setChatOpen] = useState(false);
  const [hidden, setHidden] = useState(() => window.location.hash === ADMIN_HASH);

  useEffect(() => {
    const onHashChange = () => setHidden(window.location.hash === ADMIN_HASH);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Close the chat panel on Escape.
  useEffect(() => {
    if (!chatOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setChatOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [chatOpen]);

  if (hidden) return null;

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${WhatsAppConfig.ActiveNumber}&text=${encodeURIComponent(
    'Hi Body Fit! I have a quick question.'
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 print:hidden">
      {chatOpen && <FaqChatbot onClose={() => setChatOpen(false)} open={chatOpen} />}

      <ShinySheenButton
        aria-expanded={chatOpen}
        aria-label={chatOpen ? 'Close assistant' : 'Open assistant'}
        className="rounded-full border border-slate-700/80 bg-slate-950/85 py-2.5 pl-3.5 pr-4 shadow-xl"
        onClick={() => setChatOpen((open) => !open)}
        type="button"
      >
        <span className="flex items-center gap-2.5">
          {chatOpen ? (
            <X className="h-5 w-5 shrink-0" />
          ) : (
            <MessageCircle className="h-5 w-5 shrink-0" />
          )}
          <span className="font-bold tracking-wider">{chatOpen ? 'Close' : 'Ask us'}</span>
        </span>
      </ShinySheenButton>

      <a
        aria-label="Chat with us on WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/25 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_28px_rgba(37,211,102,0.55)] active:scale-95"
        href={whatsappUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-20" />
        <WhatsAppIcon className="relative h-7 w-7" />
      </a>
    </div>
  );
}
