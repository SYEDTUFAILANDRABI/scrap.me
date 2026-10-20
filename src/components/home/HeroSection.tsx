'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Recycle,
  CheckCircle2,
  Cpu,
  ZapOff,
  BatteryCharging,
  Coins,
} from 'lucide-react';
import { BRAND_CONFIG } from '@/config/brand';

export function HeroSection() {
  const [deviceVisualMode, setDeviceVisualMode] = useState<'damaged' | 'salvaged'>('damaged');

  const benefits = [
    {
      icon: Coins,
      title: 'Fair, condition-based valuation',
      desc: 'No arbitrary deductions. Valued by salvageable components.',
    },
    {
      icon: ShieldCheck,
      title: 'Transparent offers',
      desc: 'Clear breakdown between estimated and physical offer.',
    },
    {
      icon: Recycle,
      title: 'Responsible recycling',
      desc: 'Eco-conscious e-waste recovery & component repurposing.',
    },
  ];

  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-medium shadow-lg shadow-emerald-500/10"
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{BRAND_CONFIG.altTagline}</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">Serving Kashmir</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                Your Dead Phone{' '}
                <span className="text-gradient-emerald">
                  Deserves a Better Ending.
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                {BRAND_CONFIG.heroSubtitle}
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="#valuation-widget"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-300 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:from-emerald-300 hover:to-teal-200 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Coins className="w-5 h-5 text-slate-950" />
                <span>Check My Phone’s Value</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-semibold text-slate-200 glass-card-interactive border border-white/10 hover:border-emerald-500/40"
              >
                <span>How It Works</span>
              </a>
            </motion.div>

            {/* 3 Compact Benefit Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4"
            >
              {benefits.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <div
                    key={idx}
                    className="glass-card p-3.5 rounded-xl border border-white/5 flex flex-col gap-1.5 text-left"
                  >
                    <div className="flex items-center gap-2 text-emerald-400">
                      <Icon className="w-4 h-4" />
                      <span className="text-xs font-semibold text-slate-200 leading-tight">
                        {b.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      {b.desc}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column: Premium Interactive Smartphone Visual */}
          <div className="lg:col-span-5 flex justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-md"
            >
              {/* Outer Glow Circle */}
              <div className="absolute inset-0 bg-emerald-500/15 rounded-3xl blur-3xl transform -rotate-3 scale-95" />

              {/* Main Phone Mockup Frame */}
              <div className="relative glass-panel rounded-3xl p-6 border border-white/15 shadow-2xl backdrop-blur-2xl">
                {/* State Switcher Tab */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Live Visualizer
                  </span>
                  <div className="flex rounded-lg bg-slate-900/80 p-0.5 border border-white/10 text-xs">
                    <button
                      onClick={() => setDeviceVisualMode('damaged')}
                      className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                        deviceVisualMode === 'damaged'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Dead / Damaged
                    </button>
                    <button
                      onClick={() => setDeviceVisualMode('salvaged')}
                      className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                        deviceVisualMode === 'salvaged'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Reclaimed Value
                    </button>
                  </div>
                </div>

                {/* Smartphone Silhouette */}
                <div className="relative mt-5 aspect-[9/16] max-h-[380px] mx-auto w-48 sm:w-56 rounded-[32px] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-3 border-2 border-slate-700/60 shadow-2xl overflow-hidden flex flex-col justify-between">
                  {/* Dynamic Island / Notch */}
                  <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto flex items-center justify-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-950 border border-emerald-500/40" />
                  </div>

                  {/* Screen Content Depending on Mode */}
                  {deviceVisualMode === 'damaged' ? (
                    <div className="relative my-auto flex flex-col items-center justify-center text-center p-3">
                      {/* Realistic Crack SVG Overlay */}
                      <svg
                        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 stroke-rose-400"
                        viewBox="0 0 100 100"
                        fill="none"
                      >
                        <path d="M10,20 L45,55 L30,85 M45,55 L85,45 M45,55 L65,80" strokeWidth="1.2" />
                      </svg>

                      <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mb-3">
                        <ZapOff className="w-6 h-6 text-rose-400" />
                      </div>
                      <span className="text-xs font-bold text-rose-300 uppercase tracking-wide">
                        Non-Working Unit
                      </span>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Black screen • Dead battery • Liquid traces
                      </p>
                      <div className="mt-4 px-3 py-1.5 rounded-lg bg-rose-950/40 border border-rose-500/20 text-[11px] text-rose-200">
                        Discarded as useless?
                      </div>
                    </div>
                  ) : (
                    <div className="relative my-auto flex flex-col items-center justify-center text-center p-3 animate-fade-in">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center mb-3 shadow-lg shadow-emerald-500/20">
                        <Coins className="w-6 h-6 text-emerald-400" />
                      </div>
                      <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
                        Salvageable Potential
                      </span>
                      <span className="text-2xl font-black text-white mt-1">
                        ₹1,200 – ₹2,400
                      </span>
                      <p className="text-[11px] text-emerald-400/90 mt-1">
                        Camera • Housing • Precious Metals
                      </p>
                      <div className="mt-4 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] text-emerald-200 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Reclaimed Component Cash
                      </div>
                    </div>
                  )}

                  {/* Home Indicator Bar */}
                  <div className="w-24 h-1 bg-slate-700 rounded-full mx-auto mb-1" />
                </div>

                {/* Floating Micro-Badge 1 */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -left-4 bottom-12 glass-card py-2 px-3 rounded-xl border border-emerald-500/30 shadow-lg flex items-center gap-2"
                >
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <div className="text-left">
                    <div className="text-[10px] text-slate-400">Motherboard & IC</div>
                    <div className="text-xs font-semibold text-slate-200">Tested For Scrap</div>
                  </div>
                </motion.div>

                {/* Floating Micro-Badge 2 */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -right-4 top-16 glass-card py-2 px-3 rounded-xl border border-emerald-500/30 shadow-lg flex items-center gap-2"
                >
                  <BatteryCharging className="w-4 h-4 text-teal-400" />
                  <div className="text-left">
                    <div className="text-[10px] text-slate-400">Dead Battery?</div>
                    <div className="text-xs font-semibold text-emerald-400">Still Accepted</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
