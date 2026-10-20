import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { AmbientGlow } from '@/components/common/AmbientGlow';
import { ShieldCheck, Lock, HardDrive, Smartphone, AlertTriangle } from 'lucide-react';
import { Metadata } from 'next';
import { BRAND_CONFIG } from '@/config/brand';

export const metadata: Metadata = {
  title: 'Device Data Security Policy | Reboot Scrap',
  description:
    'Our transparent protocol for handling customer data, factory resets, and dead phone chip isolation before electronics salvage.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen bg-[#070b12] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      <AmbientGlow />
      <Navbar />

      <main className="flex-1 relative z-10 pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 mb-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Customer Data Protection</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Responsible Device Data Policy
            </h1>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              How we safeguard customer personal information, prevent unauthorized storage access, and handle non-booting memory chips.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 space-y-8 text-sm text-slate-300 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-400" />
                1. Customer Preparation Checklist (Working or Partially Working Units)
              </h2>
              <p>
                If your phone turns on or shows partial screen activity, we strongly advise customers to carry out the following before handing over the device:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-400">
                <li>Create an encrypted cloud backup (iCloud, Google Drive, or local computer) of photos, messages, and contacts.</li>
                <li>Remove your physical SIM card and any expandable microSD memory cards.</li>
                <li>Sign out of Apple ID, Google Account, Samsung Account, or Mi Account to remove activation lock.</li>
                <li>Perform a complete factory reset (<code className="text-emerald-400 font-mono">Settings &gt; General &gt; Reset &gt; Erase All Content and Settings</code>).</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-cyan-400" />
                2. Protocol for Non-Booting &amp; Completely Dead Phones
              </h2>
              <p>
                When a smartphone is completely dead (burned power management IC, shorted motherboard, or water-corroded circuit rails), standard software data wiping cannot be run via the operating system.
              </p>
              <p className="text-xs text-slate-400">
                In these circumstances:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-400">
                <li>We do not attempt to bypass encryption or crack user credentials. Modern iOS and Android devices utilize hardware-bound AES-256 encryption tied to the Secure Enclave / Titan chip.</li>
                <li>When harvesting peripheral hardware (camera modules, aluminum housings, speaker units), the flash memory chip remains intact or is safely demagnetized/perforated upon customer request.</li>
                <li>Customers with classified or enterprise security concerns may request certified physical chip destruction prior to transfer.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                3. Non-Disclosure &amp; Technician Integrity
              </h2>
              <p>
                Technicians at {BRAND_CONFIG.legalName} are legally bound to uphold confidentiality. Our workshop facilities are monitored and restricted to authorized repair and salvage personnel.
              </p>
            </section>

            <div className="pt-4 border-t border-white/10 text-xs text-slate-500">
              Last updated: October 2026. For questions regarding data erasure, contact us at{' '}
              <a href={`mailto:${BRAND_CONFIG.contact.email}`} className="text-emerald-400 underline">
                {BRAND_CONFIG.contact.email}
              </a>.
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
