'use client';

import React from 'react';
import { Smartphone, CheckSquare, Coins, Send, ArrowRight } from 'lucide-react';
import { ScrollReveal, StaggerReveal } from '@/components/common/ScrollReveal';

const steps = [
  {
    step: '01',
    icon: Smartphone,
    title: 'Select Your Phone',
    desc: 'Choose your smartphone brand, exact model variant, and internal storage capacity from our searchable database.',
  },
  {
    step: '02',
    icon: CheckSquare,
    title: 'Tell Us Its Condition',
    desc: 'Answer a few quick questions about power, screen, battery, and liquid exposure. No technical jargon required.',
  },
  {
    step: '03',
    icon: Coins,
    title: 'Get an Estimated Price',
    desc: 'Review an indicative, condition-based estimate built from component recovery potential and base market value.',
  },
  {
    step: '04',
    icon: Send,
    title: 'Submit Your Request',
    desc: 'Share your pickup or drop-off preference in Kashmir. Our team contacts you to verify and schedule evaluation.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 z-10">
      {/* Section glow divider */}
      <div className="section-glow-divider mb-24" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal effect="fade-up" className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400">
            Simple 4-Step Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Reboot Scrap Works
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            From dead drawer clutter to fair value in four transparent steps. No complicated middlemen, no endless negotiations.
          </p>
        </ScrollReveal>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connector Line on Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500/10 via-emerald-500/40 to-emerald-500/10 -translate-y-8 z-0" />

          <StaggerReveal
            stagger={0.12}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
          >
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="glass-card-interactive p-6 rounded-2xl group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl font-black text-slate-700 group-hover:text-emerald-400/50 transition-colors">
                        {item.step}
                      </span>
                      <div className="w-12 h-12 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/40 group-hover:shadow-lg group-hover:shadow-emerald-500/20 transition-all">
                        <Icon className="w-6 h-6 text-emerald-400" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-white/5 flex items-center text-xs font-semibold text-emerald-400/70 group-hover:text-emerald-400 transition-colors">
                    <span>Step {index + 1}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
