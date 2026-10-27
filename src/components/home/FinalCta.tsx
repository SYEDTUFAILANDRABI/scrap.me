'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, PhoneCall } from 'lucide-react';
import { BRAND_CONFIG } from '@/config/brand';
import { ScrollReveal } from '@/components/common/ScrollReveal';

export function FinalCta() {
  return (
    <section id="contact" className="relative py-20 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal effect="glow-reveal" duration={0.8}>
          <div className="relative glass-panel rounded-3xl p-8 sm:p-14 border border-emerald-500/30 overflow-hidden text-center shadow-2xl">
            {/* Background Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/5 pointer-events-none" />
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Turn E-Waste Into Value</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Give Your Old Phone <br />
                <span className="text-gradient-emerald">One Last Purpose.</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
                Don&apos;t let broken electronics gather dust in dark drawers or pollute water bodies. Get a transparent condition valuation and doorstep collection today.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link
                  href="/sell"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-300 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:from-emerald-300 transition-all transform hover:-translate-y-0.5"
                >
                  <span>Get My Valuation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`tel:${BRAND_CONFIG.contact.phone}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold text-slate-300 glass-card border border-white/10 hover:border-emerald-500/30 hover:text-white transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>Call {BRAND_CONFIG.contact.phone}</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-slate-400 border-t border-white/10">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free doorstep evaluation
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> No selling obligation
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Immediate UPI / Cash payout
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
