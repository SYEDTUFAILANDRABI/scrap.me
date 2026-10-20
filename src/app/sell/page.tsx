import { Suspense } from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { AmbientGlow } from '@/components/common/AmbientGlow';
import { SellWizard } from '@/components/sell/SellWizard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sell Your Phone | Valuation & Doorstep Collection | Reboot Scrap',
  description:
    'Turn your dead, broken, or unwanted smartphone into cash. Free condition-based valuation and pickup across Srinagar, Kashmir.',
};

export default function SellPage() {
  return (
    <div className="relative min-h-screen bg-[#070b12] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      <AmbientGlow />
      <Navbar />

      <main className="flex-1 relative z-10 pt-24">
        <Suspense
          fallback={
            <div className="min-h-[60vh] flex items-center justify-center text-slate-400 text-sm">
              Loading valuation engine...
            </div>
          }
        >
          <SellWizard />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
