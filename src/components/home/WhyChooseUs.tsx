'use client';

import React from 'react';
import {
  FileText,
  Zap,
  Sparkles,
  Recycle,
  CheckCircle2,
  Headphones,
  Smartphone,
  Layers,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { ScrollReveal, StaggerReveal } from '@/components/common/ScrollReveal';
import { AnimatedCounter } from '@/components/common/AnimatedCounter';

const verifiedStats = [
  {
    icon: Smartphone,
    value: 9,
    suffix: '',
    label: 'OEM Brands Supported',
    sub: 'Apple, Samsung, OnePlus & more',
  },
  {
    icon: Layers,
    value: 26,
    suffix: '+',
    label: 'Calibrated Device Models',
    sub: 'From legacy models to flagships',
  },
  {
    icon: ShieldCheck,
    value: 9,
    suffix: '-Point',
    label: 'Condition Diagnostic Check',
    sub: 'Rigorous hardware inspection',
  },
  {
    icon: Check,
    value: 0,
    prefix: '₹',
    suffix: '',
    label: 'Evaluation & Pickup Fee',
    sub: '100% free doorstep check',
  },
];

const features = [
  {
    icon: FileText,
    title: 'Transparent Valuation',
    desc: 'Every deduction is grounded in actual parts salvageability — whether front glass, display panel, battery health, or motherboard integrity.',
  },
  {
    icon: Zap,
    title: 'Dead Phone Friendly',
    desc: 'Unlike conventional buyback sites that reject non-powering units, we actively purchase dead, water-damaged, and broken devices for scrap and parts.',
  },
  {
    icon: Sparkles,
    title: 'Simple Selling Process',
    desc: 'No confusing classified ads, no bargaining with strangers, and no hidden commission fees. Direct evaluation and clear communication.',
  },
  {
    icon: Recycle,
    title: 'Responsible E-Waste Handling',
    desc: 'Reusable micro-components are harvested; unusable plastics, heavy metals, and lithium cells are segregated responsibly to minimize landfill harm.',
  },
  {
    icon: CheckCircle2,
    title: 'No False Promises',
    desc: 'We never advertise inflated fake quotes only to slash them at your doorstep. Our estimates clearly identify condition-based realities.',
  },
  {
    icon: Headphones,
    title: 'Direct Human Support',
    desc: 'Speak directly with local technicians based in Kashmir who understand smartphones and treat your hardware inquiries with prompt respect.',
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="relative py-24 z-10">
      <div className="section-glow-divider mb-24" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Verified Stats Bar */}
        <ScrollReveal effect="fade-up" className="mb-20">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
              {verifiedStats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className={`flex flex-col items-center text-center ${
                      idx > 0 && idx % 2 === 0 ? 'pt-6 lg:pt-0' : ''
                    } ${idx === 1 ? 'border-none' : ''}`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-baseline justify-center">
                      <AnimatedCounter
                        to={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        className="text-gradient-emerald"
                      />
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-200 mt-1">
                      {stat.label}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {stat.sub}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal effect="fade-up" className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400">
            Why Reboot Scrap?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built for Honest Phone Recovery
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            A customer-first buyback service designed specifically to eliminate friction when parting with broken and obsolete tech.
          </p>
        </ScrollReveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.08}>
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card-interactive p-6 rounded-2xl border border-white/10 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 text-emerald-400">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
}
