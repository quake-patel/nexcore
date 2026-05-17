import type { Metadata } from 'next';
import Link from 'next/link';
import ServicesSection from '@/components/ServicesSection';
import ClientMetaUpdater from '@/components/ClientMetaUpdater';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore our full range of IT services: software development, cloud infrastructure, cybersecurity, data & AI, consulting, and DevOps.',
  openGraph: {
    title: 'Services — NexCore IT Solutions',
    description: 'Explore our full range of IT services: software development, cloud infrastructure, cybersecurity, data & AI, consulting, and DevOps.',
  },
};

export default function ServicesPage() {
  return (
    <>
      <ClientMetaUpdater pageKey="services" />
      <div className="page-hero">
        <div className="page-hero-inner">
          <p className="section-tag">What we do</p>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)' }}>
            Enterprise-grade services<br />for every stage of growth
          </h1>
          <p className="section-sub">
            From startups to Fortune 500s, we deliver technology solutions that
            are built to scale and designed to last.
          </p>
        </div>
      </div>

      <ServicesSection />

      <section style={{ padding: '0 5% 5rem' }}>
        <div className="cta-box">
          <h2>Not sure which service you need?</h2>
          <p>Talk to one of our consultants — we&apos;ll help you find the right solution for your goals.</p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Link href="/contact" className="btn-primary">Book a free call →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
