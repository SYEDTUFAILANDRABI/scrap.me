'use client';

import React from 'react';
import { Star, MessageSquareQuote, ShieldAlert } from 'lucide-react';

const sampleReviews = [
  {
    name: 'Tariq A.',
    location: 'Srinagar, J&K',
    device: 'iPhone 11 (Dead Board)',
    text: 'Local shops told me my dead iPhone was worth zero rupees because the board was shorted. Reboot Scrap tested the screen and frame and offered a reasonable payout. Great doorstep pickup.',
    payout: '₹1,500',
  },
  {
    name: 'Sobia K.',
    location: 'Baramulla',
    device: 'Galaxy S21 (Cracked Screen)',
    text: 'Repair cost quoted by service center was higher than the whole phone value. Sold it here instead. The estimate on the site was very close to the final bench test offer.',
    payout: '₹4,800',
  },
  {
    name: 'Umar M.',
    location: 'Budgam',
    device: 'OnePlus 9 (Water Damage)',
    text: 'Straightforward process without the hassle of haggling with random buyers on Olx who keep ghosting you. Clear condition breakdown.',
    payout: '₹1,900',
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-6">
          <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400">
            Customer Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            What Sellers Say
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Real experiences from smartphone owners who recycled their dead and damaged devices.
          </p>
        </div>

        {/* Transparent Sample/Preview Notice */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="px-4 py-2 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-center gap-2 text-xs text-slate-400 text-center">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              <strong>Sample Preview State:</strong> Representative customer feedback examples shown during beta release.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleReviews.map((rev, idx) => (
            <div
              key={idx}
              className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <MessageSquareQuote className="w-5 h-5 text-slate-600" />
                </div>

                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed mb-6">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                  <p className="text-[11px] text-slate-400">{rev.location}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">Sold Device</span>
                  <span className="text-xs font-semibold text-emerald-400">{rev.device}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
