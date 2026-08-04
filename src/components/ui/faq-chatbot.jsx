import React, { useEffect, useRef, useState } from 'react';
import { Send, X, Bot } from 'lucide-react';
import { WhatsAppIcon } from './social-icons';
import { WhatsAppConfig } from '../../utils/whatsapp';
import { getOpenStatus, hoursSummary } from '../../utils/gymHours';

// Rule-based FAQ bot — keyword matching, no AI service, nothing leaves the page.
// Add an entry here and the bot answers it; `keywords` are matched as substrings.
const FAQS = [
  {
    id: 'pricing',
    keywords: ['price', 'pricing', 'cost', 'fee', 'fees', 'charge', 'rate', 'plan', 'membership', 'how much'],
    question: 'What are the membership prices?',
    answer:
      'Our plans start at ₹1,500/month (gym only). Standard is ₹3,500 for 3 months including all group classes, and Premium is ₹6,000 for 3 months with a personal trainer and diet plan. Walk in for a free facility tour anytime.',
  },
  {
    id: 'timing',
    keywords: ['time', 'timing', 'timings', 'hour', 'hours', 'open', 'close', 'closed', 'shift', 'when'],
    question: 'What are your timings?',
    answer: `We run two shifts, seven days a week — ${hoursSummary}.`,
  },
  {
    id: 'trial',
    keywords: ['trial', 'free', 'demo', 'try', 'first', 'sample', 'test'],
    question: 'Do you offer a free trial?',
    answer:
      'Yes. Your first session is free, including a facility tour and a body composition assessment. Book a "Facility Tour & Consult" slot and just walk in.',
  },
  {
    id: 'trainers',
    keywords: ['trainer', 'coach', 'personal', 'pt', 'instructor'],
    question: 'Can I get a personal trainer?',
    answer:
      'We have 8 certified coaches covering strength, yoga, fat loss and functional training. Personal training is included in the Premium plan, or you can book a single 1-on-1 trial session.',
  },
  {
    id: 'location',
    keywords: ['where', 'location', 'address', 'reach', 'direction', 'parking', 'located'],
    question: 'Where are you located?',
    answer:
      'D-20, Amrit Nagar, Block D, New Delhi, Delhi 110049 — in South Delhi. Free covered parking for two and four wheelers with 24/7 camera surveillance.',
  },
  {
    id: 'classes',
    keywords: ['class', 'classes', 'yoga', 'zumba', 'crossfit', 'hiit', 'cardio', 'group', 'schedule'],
    question: 'What classes do you run?',
    answer:
      'Yoga, Zumba, CrossFit, HIIT, strength and cardio classes run through both shifts. Check the Class Schedule section for the full weekly timetable.',
  },
  {
    id: 'booking',
    keywords: ['book', 'booking', 'appointment', 'slot', 'reserve', 'register', 'join'],
    question: 'How do I book a session?',
    answer:
      'Use the Book Now button at the top, or the booking form at the bottom of this page. Pick a service, date and slot — you get an instant booking reference and a WhatsApp confirmation.',
  },
];

const GREETING = {
  from: 'bot',
  text: "Hi! I'm the Body Fit assistant. Ask me about pricing, timings, trials, classes or trainers — or tap a question below.",
};

const FALLBACK =
  "I don't have an answer for that one. Tap the WhatsApp button below and the team will reply personally.";

function findAnswer(input) {
  const text = input.toLowerCase();
  // Score each FAQ by how many of its keywords appear, best match wins.
  let best = null;
  let bestScore = 0;

  FAQS.forEach((faq) => {
    const score = faq.keywords.filter((keyword) => text.includes(keyword)).length;
    if (score > bestScore) {
      best = faq;
      bestScore = score;
    }
  });

  return best ? best.answer : FALLBACK;
}

export default function FaqChatbot({ open, onClose }) {
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);
  const status = getOpenStatus();

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${WhatsAppConfig.ActiveNumber}&text=${encodeURIComponent(
    'Hi Body Fit! I have a question.'
  )}`;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const ask = (text) => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { from: 'user', text },
      { from: 'bot', text: findAnswer(text) },
    ]);
    setInput('');
  };

  if (!open) return null;

  return (
    <div className="flex h-[30rem] max-h-[70vh] w-[21rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/60 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 p-1.5 text-white">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Body Fit Assistant</div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
              <span
                className={`h-1.5 w-1.5 rounded-full ${status.isOpen ? 'bg-emerald-400' : 'bg-slate-500'}`}
              />
              {status.isOpen ? 'Gym is open now' : status.detail}
            </div>
          </div>
        </div>
        <button
          aria-label="Close chat"
          className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-800 hover:text-white"
          onClick={onClose}
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" ref={scrollRef}>
        {messages.map((message, index) => (
          <div
            className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                message.from === 'user'
                  ? 'rounded-br-sm bg-gradient-to-br from-orange-500 to-amber-500 text-white'
                  : 'rounded-bl-sm border border-slate-800 bg-slate-900 text-slate-300'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}

        {/* Quick replies stay available under the conversation */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {FAQS.slice(0, 4).map((faq) => (
            <button
              className="rounded-full border border-slate-800 bg-slate-900/60 px-2.5 py-1 text-[10px] font-semibold text-slate-400 transition-colors hover:border-orange-500/40 hover:text-white"
              key={faq.id}
              onClick={() => ask(faq.question)}
              type="button"
            >
              {faq.question}
            </button>
          ))}
        </div>
      </div>

      {/* Composer */}
      <form
        className="border-t border-slate-800 bg-slate-900/60 p-3"
        onSubmit={(event) => {
          event.preventDefault();
          ask(input);
        }}
      >
        <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-3 focus-within:border-orange-500/60">
          <label className="sr-only" htmlFor="faq-input">
            Ask a question
          </label>
          <input
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent py-2.5 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none"
            id="faq-input"
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about pricing, timings…"
            value={input}
          />
          <button
            aria-label="Send"
            className="shrink-0 text-orange-500 transition-colors hover:text-orange-400"
            type="submit"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>

        <a
          className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-[#25D366]/10 py-2 text-[11px] font-bold text-[#25D366] transition-colors hover:bg-[#25D366]/20"
          href={whatsappUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <WhatsAppIcon className="h-3.5 w-3.5" />
          Talk to a human on WhatsApp
        </a>
      </form>
    </div>
  );
}
