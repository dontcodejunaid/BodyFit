import React from 'react';
import { Quote, Star } from 'lucide-react';

// PLACEHOLDER — dummy reviews so the navbar link has somewhere to scroll.
// Replace with real member testimonials before going live.
const reviews = [
  {
    name: 'Member Name',
    detail: 'Lost 12 kg in 6 months',
    quote: 'Placeholder testimonial text. Replace this with a real member review.',
  },
  {
    name: 'Member Name',
    detail: 'Training since 2021',
    quote: 'Placeholder testimonial text. Replace this with a real member review.',
  },
  {
    name: 'Member Name',
    detail: 'Strength programme',
    quote: 'Placeholder testimonial text. Replace this with a real member review.',
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-20 relative py-20 bg-slate-950 text-slate-100 border-t border-slate-800/60 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-orange-400">
            Member Stories
          </span>
          <h2 className="font-teko mt-2 text-4xl sm:text-5xl uppercase tracking-wide text-white">
            Testimonials
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">
            Placeholder reviews — swap in real member feedback later.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition-all hover:border-orange-500/40 hover:bg-slate-900/70"
            >
              <Quote className="h-7 w-7 text-orange-500/70" />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-300 italic">
                "{review.quote}"
              </p>
              <div className="mt-5 flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="mt-3 border-t border-slate-800/80 pt-3">
                <div className="text-sm font-bold text-white">{review.name}</div>
                <div className="text-xs text-slate-500">{review.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
