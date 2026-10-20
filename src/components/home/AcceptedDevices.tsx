'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ZapOff,
  Smartphone,
  BatteryWarning,
  Droplets,
  PlugZap,
  Archive,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

const acceptedCategories = [
  {
    icon: ZapOff,
    title: 'Completely Dead Phones',
    badge: 'High Salvage Demand',
    desc: 'Devices that show zero signs of life, no LED, no display, and no response to chargers. We test logic boards, cameras, and structural housing for recovery.',
    accent: 'rose',
  },
  {
    icon: Smartphone,
    title: 'Cracked & Broken Screens',
    badge: 'Active Buyback',
    desc: 'From single hairline cracks to shattered glass with bleeding OLED panels or dead touch responsiveness. Even when the display is gone, sub-components remain valuable.',
    accent: 'amber',
  },
  {
    icon: BatteryWarning,
    title: 'Severe Battery Issues',
    badge: 'Safe Disposal',
    desc: 'Bulging or swollen battery backs, phones that shut down at 50%, or devices that only operate when connected permanently to a wall plug.',
    accent: 'emerald',
  },
  {
    icon: Droplets,
    title: 'Liquid & Water Damaged',
    badge: 'Component Salvage',
    desc: 'Phones dropped in water, tea, or rain. Although corrosion occurs, ceramic capacitors, speaker grills, camera glass, and external shells are often preserved.',
    accent: 'cyan',
  },
  {
    icon: PlugZap,
    title: 'Non-Charging Devices',
    badge: 'Repair & Salvage',
    desc: 'Damaged USB-C or Lightning ports, burned pin traces, or broken charging flex cables that render the phone impossible to recharge normally.',
    accent: 'purple',
  },
  {
    icon: Archive,
    title: 'Older Unwanted Models',
    badge: 'Recycling',
    desc: 'Outdated smartphones stored in drawers for years. Turn legacy tech into cash while ensuring lithium and heavy metals are kept out of municipal trash.',
    accent: 'teal',
  },
];

export function AcceptedDevices() {
  return (
    <section className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400">
            Hardware Acceptance Scope
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            What Kind of Phones Do We Buy?
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Almost any condition is considered. Acceptance and valuation depend on device authenticity, ownership verification, and salvageable internal parts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {acceptedCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="glass-card-interactive p-6 rounded-2xl border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-emerald-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-900/90 text-emerald-400 border border-emerald-500/20">
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-white/5">
                  <Link
                    href="/sell"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <span>Check value for this condition</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
