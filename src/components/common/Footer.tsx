'use client';

import React from 'react';
import Link from 'next/link';
import {
  Smartphone,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Recycle,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { BRAND_CONFIG } from '@/config/brand';

export function Footer() {
  return (
    <footer className="relative z-10 bg-slate-950 border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          {/* Col 1 & 2: Brand & Purpose */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 p-[1px] shadow-lg shadow-emerald-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Reboot<span className="text-emerald-400">Scrap</span>
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              We collect dead, damaged, and non-working smartphones and offer fair, condition-based valuations. 
              Salvaging working components and recycling electronic waste responsibly.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                <Recycle className="w-3.5 h-3.5 text-emerald-400" /> E-Waste Conscious
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Data Privacy Aware
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Kashmiri Enterprise
              </span>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-emerald-400 transition-colors">
                  Sell Your Phone
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-emerald-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#why-us" className="hover:text-emerald-400 transition-colors">
                  Why Reboot Scrap?
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-emerald-400 transition-colors">
                  Track Request Status
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  Admin Dashboard <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Policy & Legal */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase">
              Trust & Legal
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                  Device Data Security Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                  Terms of Valuation & Sale
                </Link>
              </li>
              <li>
                <Link href="/#faqs" className="hover:text-emerald-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-emerald-400 transition-colors">
                  Responsible E-Waste Handling
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Local Coverage & Contact */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase">
              Service Areas
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Primary hub: Srinagar, Jammu & Kashmir.
                  <br />
                  <span className="text-slate-500">
                    Covering Budgam, Baramulla, Anantnag, Pulwama, Sopore & Jammu.
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={`tel:${BRAND_CONFIG.contact.phone}`} className="hover:text-white transition-colors">
                  {BRAND_CONFIG.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={`mailto:${BRAND_CONFIG.contact.email}`} className="hover:text-white transition-colors">
                  {BRAND_CONFIG.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{BRAND_CONFIG.contact.operatingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimers & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p className="max-w-2xl text-center md:text-left leading-relaxed">
            <strong className="text-slate-400">Important Notice:</strong> Online valuations generated by Reboot Scrap are illustrative demo estimates based on self-reported condition and parts salvage value. Final payout is subject to physical hardware bench testing. Customers are advised to backup and wipe their device data before handover.
          </p>
          <div className="shrink-0 text-center md:text-right">
            <p>© 2026 {BRAND_CONFIG.name}. All rights reserved.</p>
            <p className="text-[11px] text-slate-600 mt-0.5">Designed with Glassmorphism & Framer Motion</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
