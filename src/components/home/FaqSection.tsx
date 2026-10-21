'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { ScrollReveal, StaggerReveal } from '@/components/common/ScrollReveal';

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: 'Can I sell a phone that does not turn on at all?',
    a: 'Yes, absolutely. That is our core specialty. Even if a smartphone has a dead motherboard, depleted battery, or zero screen life, internal modules such as camera sensors, secondary flex cables, vibration motors, buttons, and housing frames retain real value for repairs and scrap recovery.',
  },
  {
    q: 'How is my phone\u2019s price calculated?',
    a: 'We begin with the base working market benchmark of your specific model and storage tier, then apply calibrated factor deductions based on what you report (power state, display condition, liquid contact, cosmetic integrity). Every device retains a guaranteed minimum scrap floor valuation.',
  },
  {
    q: 'Is the online calculated price final?',
    a: 'No. The online valuation is an indicative estimate based on self-reported details. Our local technician performs a physical bench test to verify condition. If the device matches what you described, the final offer closely reflects the estimate. You are never obligated to accept the final offer.',
  },
  {
    q: 'What if the phone has a broken screen?',
    a: 'Broken screens are one of our most common purchases. If the underlying OLED/LCD is intact and only the top glass is fractured, the deduction is minor. If the display panel is blacked out or has lines, the deduction is larger, but the phone is still readily accepted.',
  },
  {
    q: 'Do you accept water-damaged phones?',
    a: 'Yes. Water damage creates corrosion on sensitive circuit rails, so we perform an ultrasonic and multimeter check during inspection. Parts that survived moisture exposure (such as external chassis, camera lenses, and speaker boxes) are credited towards your offer.',
  },
  {
    q: 'How does pickup work in Kashmir?',
    a: 'Once you submit a request, our team contacts you to confirm your address in Srinagar or surrounding service areas (Budgam, Baramulla, Anantnag, Pulwama, Sopore, Jammu). You can choose between a doorstep evaluation appointment or a drop-off at our collection point.',
  },
  {
    q: 'When and how will I receive payment?',
    a: 'Payment is disbursed immediately upon physical handover once you agree to the verified final offer. We support instant UPI transfers (Google Pay, PhonePe, Paytm, mPay), direct bank transfer (IMPS), or cash on spot.',
  },
  {
    q: 'What happens to my old phone after I sell it?',
    a: 'Working sub-components are tested and refurbished to service existing devices. Non-working boards and hazardous materials (like degraded lithium-ion cells) are segregated and dispatched to authorized e-waste aggregators to avoid polluting landfills or water sources.',
  },
  {
    q: 'How do I protect my personal data before selling?',
    a: 'If your device powers on, we request that you back up personal files and perform a full factory reset while signed out of your Apple ID or Google Account. If your phone is completely dead and cannot boot, we discuss whether board-level data isolation or physical chip destruction is preferred before salvage.',
  },
  {
    q: 'Can I cancel my request after submitting online?',
    a: 'Yes, at any time before the physical handover. There is no cancellation penalty, no hidden fee, and no obligation to sell.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="relative py-24 z-10">
      {/* Section glow divider */}
      <div className="section-glow-divider" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal effect="fade-up" className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Clear, transparent answers about our valuation engine, pickup process, data safety, and payouts.
          </p>
        </ScrollReveal>

        {/* Accordions */}
        <StaggerReveal className="space-y-3" stagger={0.06}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="glass-card rounded-2xl border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-8 h-8 rounded-lg bg-slate-900/80 border border-white/10 flex items-center justify-center shrink-0 text-slate-400"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
}
