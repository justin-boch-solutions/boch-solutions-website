import HeroSection from '@/components/home/HeroSection';
import ProblemSolutionSection from '@/components/home/ProblemSolutionSection';
import TargetAudienceSection from '@/components/home/TargetAudienceSection';
import WhyWebsiteSection from '@/components/home/WhyWebsiteSection';
import ProcessSection from '@/components/home/ProcessSection';
import ServicesSection from '@/components/home/ServicesSection';
import QuickLinksSection from '@/components/home/QuickLinksSection';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full bg-slate-950 overflow-hidden">
      <HeroSection />
      <ProblemSolutionSection />
      <TargetAudienceSection />
      <WhyWebsiteSection />
      <ProcessSection />
      <ServicesSection />
      <QuickLinksSection />
      <CTASection />
    </main>
  );
}
