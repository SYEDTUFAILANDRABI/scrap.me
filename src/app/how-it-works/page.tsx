import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { AmbientGlow } from '@/components/common/AmbientGlow';
import { Smartphone, CheckSquare, Coins, Send, Cpu, Recycle, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ScrollReveal } from '@/components/common/ScrollReveal';

export const metadata: Metadata = {
  title: 'How It Works | Dead Phone Evaluation & Recycling | Reboot Scrap',
  description:
    'Learn how Reboot Scrap evaluates non-working smartphones, calculates salvage pricing, and responsibly recycles electronic scrap in Kashmir.',
};

export default function HowItWorksPage() {
  return (
    <div className="relative min-h-screen bg-[#070b12] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      <AmbientGlow />
      <Navbar />

      <main className="flex-1 relative z-10 pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <ScrollReveal effect="fade-up" className="text-center space-y-4">
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400">
              Transparent Engineering
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Behind the Valuation Engine
            </h1>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
              How we determine real value in dead smartphones without guesswork, arbitrary markdowns, or broken promises.
            </p>
          </ScrollReveal>

          {/* Section 1: Anatomy of a Dead Phone */}
          <ScrollReveal effect="zoom-in" delay={0.1}>
            <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <Cpu className="w-5 h-5 text-emerald-400" />
                <span>Why Does a Dead Phone Still Have Cash Value?</span>
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                When a smartphone stops powering on, consumers often assume it is completely worthless. In reality, modern smartphones are assemblies of over 40 distinct sub-components:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="glass-card p-4 rounded-xl border border-white/5 space-y-1">
                  <strong className="text-emerald-400 block text-sm">Optical Sensors &amp; Cameras</strong>
                  <p className="text-slate-400">
                    Multi-lens camera arrays (OIS telephoto, ultra-wide) often survive drops and electrical shorts completely unscathed and can be reused in repairs.
                  </p>
                </div>

                <div className="glass-card p-4 rounded-xl border border-white/5 space-y-1">
                  <strong className="text-teal-400 block text-sm">CNC Metal &amp; Ceramic Housing</strong>
                  <p className="text-slate-400">
                    Precision aluminum or titanium side rails, buttons, and internal structural mid-plates retain substantial manufacturing and raw material value.
                  </p>
                </div>

                <div className="glass-card p-4 rounded-xl border border-white/5 space-y-1">
                  <strong className="text-cyan-400 block text-sm">Secondary Flex &amp; Peripherals</strong>
                  <p className="text-slate-400">
                    Haptic linear motors (Taptic engines), bottom loudspeaker enclosures, microphone arrays, and proximity sensors remain functional.
                  </p>
                </div>

                <div className="glass-card p-4 rounded-xl border border-white/5 space-y-1">
                  <strong className="text-purple-400 block text-sm">Precious Metal Recovery</strong>
                  <p className="text-slate-400">
                    Dead motherboards contain gold contact pins, palladium, copper wiring, and silver soldering that are professionally extracted through certified e-waste refiners.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Section 2: Step by step walkthrough */}
          <ScrollReveal effect="fade-up" delay={0.15}>
            <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
                <CheckSquare className="w-5 h-5 text-teal-400" />
                <span>The 4-Stage Selling Flow</span>
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-sm shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Online Indicative Quote</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Select your exact model (e.g. iPhone 12, Samsung S22, OnePlus 9) and storage. Answer transparent diagnostic toggles covering power, display, cracks, and water exposure.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-sm shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Scheduling &amp; Doorstep Verification</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Provide your contact number and preferred appointment slot in Srinagar, Budgam, Baramulla, or neighboring districts. Our technician arrives with test equipment.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-sm shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Hands-on Bench Inspection</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      We verify current consumption, check for short-circuit traces, inspect display backlight condition, and verify chassis straightness. If it matches your online answers, the offer matches your estimate.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-sm shrink-0 mt-1">
                    4
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Instant Payment &amp; Ownership Handover</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Once you approve the verified final offer, payout is made on the spot via UPI or cash with an instant receipt. If you decline, there is zero charge or penalty.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 text-center">
                <Link
                  href="/sell"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
                >
                  <span>Check Your Phone’s Value Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
