import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/home/HeroSection';

const ProblemSolutionSection = dynamic(() => import('@/components/home/ProblemSolutionSection'));
const TargetAudienceSection = dynamic(() => import('@/components/home/TargetAudienceSection'));
const WhyWebsiteSection = dynamic(() => import('@/components/home/WhyWebsiteSection'));
const ProcessSection = dynamic(() => import('@/components/home/ProcessSection'));
const ServicesSection = dynamic(() => import('@/components/home/ServicesSection'));
const QuickLinksSection = dynamic(() => import('@/components/home/QuickLinksSection'));
const CTASection = dynamic(() => import('@/components/home/CTASection'));

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://boch-solutions.de',
  },
};

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
