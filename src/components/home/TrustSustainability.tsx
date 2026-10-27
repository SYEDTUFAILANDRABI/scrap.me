'use client';

import React from 'react';
import { ShieldCheck, HardDrive, Cpu, Recycle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { BRAND_CONFIG } from '@/config/brand';
import { ScrollReveal } from '@/components/common/ScrollReveal';

export function TrustSustainability() {
  return (
    <section className="relative py-24 z-10 overflow-hidden">
      {/* Section glow divider */}
      <div className="section-glow-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden">
          {/* Subtle background ambient pattern */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <ScrollReveal effect="fade-right" className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <Recycle className="w-3.5 h-3.5" />
                <span>Circular Tech &amp; Data Ethics</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Data Security First. <br />
                <span className="text-gradient-emerald">Responsible E-Waste Always.</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Phones contain both sensitive personal history and valuable physical elements. We treat both with uncompromising care.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Customer Data Protection Protocol
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed mt-0.5">
                      Whenever a phone still powers on, we instruct and assist sellers to sign out of iCloud/Google accounts and perform a factory reset. We never attempt unauthorized access to stored files.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 text-cyan-400">
                    <HardDrive className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      What If The Phone Is Totally Dead?
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed mt-0.5">
                      If the motherboard cannot boot, our technicians discuss whether chip-level parts extraction or physical NAND flash demagnetization/destruction is appropriate for your peace of mind before handover.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 text-teal-400">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Component-Level Circular Reuse
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed mt-0.5">
                      Working cameras, flex sensors, speaker modules, and aluminum chassis are cleaned and repurposed for repairs, preventing unnecessary mining of virgin raw materials.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/privacy"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  <span>Read our full device data policy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Right Card: Practical Guidance Box */}
            <ScrollReveal effect="tilt-in" delay={0.2} className="lg:col-span-5">
              <div className="glass-card p-6 sm:p-7 rounded-2xl border border-white/10 space-y-4">
                <h3 className="text-base font-bold text-white border-b border-white/10 pb-3">
                  Pre-Handover Checklist
                </h3>

                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 text-[10px] font-bold">
                      1
                    </span>
                    <span>Remove your physical SIM card and any micro-SD cards.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 text-[10px] font-bold">
                      2
                    </span>
                    <span>Sign out of Apple ID / Google / Samsung accounts if display responds.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 text-[10px] font-bold">
                      3
                    </span>
                    <span>Back up precious photos and contacts to cloud storage.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 text-[10px] font-bold">
                      4
                    </span>
                    <span>For dead units, request hardware chip inspection during evaluation.</span>
                  </li>
                </ul>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 text-[11px] text-slate-400 leading-normal">
                  <strong className="text-slate-300">Local Commitment:</strong> Our Kashmiri collection hub strictly avoids illegal dumping, incinerating, or informal acid-washing of circuit boards.
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
