import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import ClientMetaUpdater from '@/components/ClientMetaUpdater';
import TrustLogos from '@/components/TrustLogos';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import ProcessSection from '@/components/ProcessSection';
import TechnologiesSection from '@/components/TechnologiesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BlogSection from '@/components/BlogSection';
import CtaSection from '@/components/CtaSection';
import HiringModelsSection from '@/components/HiringModelsSection';
import IndustriesSection from '@/components/IndustriesSection';

export const metadata: Metadata = {
  title: {
    absolute: 'NexCore IT Solutions — Engineering Digital Futures',
  },
  description:
    'Enterprise software development, cloud infrastructure, cybersecurity, and AI solutions from a trusted IT partner since 2010.',
  openGraph: {
    title: 'NexCore IT Solutions — Engineering Digital Futures',
    description: 'Enterprise software development, cloud infrastructure, cybersecurity, and AI solutions from a trusted IT partner since 2010.',
  },
};

export default function HomePage() {
  return (
    <>
      <ClientMetaUpdater pageKey="home" />
      <HeroSection />
      <TrustLogos />
      <ServicesSection />
      <HiringModelsSection />
      <IndustriesSection />
      <AboutSection />
      <ProcessSection />
      <TechnologiesSection />
      <TestimonialsSection />
      <BlogSection />
      <CtaSection />
    </>
  );
}
