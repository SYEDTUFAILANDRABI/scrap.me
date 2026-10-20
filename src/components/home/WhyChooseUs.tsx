'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Zap,
  Sparkles,
  Recycle,
  CheckCircle2,
  Headphones,
} from 'lucide-react';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400">
            Why Reboot Scrap?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built for Honest Phone Recovery
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            A reliable way to liquidate broken and retired smartphones without false promises or technical stress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="glass-card-interactive p-6 rounded-2xl border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 text-emerald-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
