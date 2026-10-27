import { AmbientGlow } from '@/components/common/AmbientGlow';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { PhoneDisassembly } from '@/components/home/PhoneDisassembly';
import { ValuationWidget } from '@/components/home/ValuationWidget';
import { HowItWorks } from '@/components/home/HowItWorks';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { AcceptedDevices } from '@/components/home/AcceptedDevices';
import { TrustSustainability } from '@/components/home/TrustSustainability';
import { Testimonials } from '@/components/home/Testimonials';
import { FaqSection } from '@/components/home/FaqSection';
import { FinalCta } from '@/components/home/FinalCta';
import { ScrollProgressBar } from '@/components/common/ScrollReveal';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#070b12] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      <ScrollProgressBar />
      <AmbientGlow />
      <Navbar />

      <main className="flex-1 relative z-10">
        <HeroSection />
        <PhoneDisassembly />
        <ValuationWidget />
        <HowItWorks />
        <WhyChooseUs />
        <AcceptedDevices />
        <TrustSustainability />
        <Testimonials />
        <FaqSection />
        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}
