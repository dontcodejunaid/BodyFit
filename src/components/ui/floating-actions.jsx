import React, { useEffect, useState } from 'react';
import { MessageCircle, X, QrCode } from 'lucide-react';
import FaqChatbot from './faq-chatbot';
import { ShinySheenButton } from './shiny-button-sheen';
import { ADMIN_HASH } from '../admin/AdminPortal';

/**
 * Fixed helper stack in the bottom-right corner:
 * 1. My Digital Pass (when active pass exists)
 * 2. FAQ Assistant ("Ask Us")
 */
export default function FloatingActions({ activeMemberPass, onOpenPass }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [hidden, setHidden] = useState(() => window.location.hash === ADMIN_HASH);
  const [savedPass, setSavedPass] = useState(activeMemberPass);

  useEffect(() => {
    const onHashChange = () => setHidden(window.location.hash === ADMIN_HASH);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (activeMemberPass) {
      setSavedPass(activeMemberPass);
    } else {
      try {
        const stored = localStorage.getItem('bodyfit_member_pass');
        if (stored) setSavedPass(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, [activeMemberPass]);

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

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 print:hidden">
      {chatOpen && <FaqChatbot onClose={() => setChatOpen(false)} open={chatOpen} />}

      {/* Top: My Digital Pass Button (When active pass exists) */}
      {savedPass && (
        <button
          onClick={onOpenPass}
          className="px-4 py-2.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-xs shadow-2xl flex items-center gap-2 border border-orange-400/40 animate-pulse transition-all hover:scale-105 cursor-pointer"
          title="View Digital Gym Entry Pass"
        >
          <QrCode className="w-4 h-4 text-white" />
          <span className="tracking-wider uppercase">My Digital Pass</span>
        </button>
      )}

      {/* Ask Us Button */}
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
    </div>
  );
}
