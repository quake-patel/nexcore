import type { Metadata } from 'next';
import Link from 'next/link';
import TechnologiesSection from '@/components/TechnologiesSection';
import ClientMetaUpdater from '@/components/ClientMetaUpdater';

export const metadata: Metadata = {
  title: 'Technologies',
  description: 'Our battle-tested tech stack: React, Next.js, Node.js, Python, AWS, Kubernetes, and more.',
  openGraph: {
    title: 'Technologies — NexCore IT Solutions',
    description: 'Our battle-tested tech stack: React, Next.js, Node.js, Python, AWS, Kubernetes, and more.',
  },
};

export default function TechnologiesPage() {
  return (
    <>
      <ClientMetaUpdater pageKey="technologies" />
      <div className="page-hero">
        <div className="page-hero-inner">
          <p className="section-tag">Our stack</p>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)' }}>
            Battle-tested technologies
          </h1>
          <p className="section-sub">
            We pick the right tool for each job — not the trendiest one. Our
            stack has been forged through 500+ real-world projects.
          </p>
        </div>
      </div>

      <TechnologiesSection />

      <section style={{ padding: '0 5% 5rem' }}>
        <div className="cta-box">
          <h2>Have a specific tech requirement?</h2>
          <p>Tell us your stack and we&apos;ll match you with the right team.</p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Link href="/contact" className="btn-primary">Talk to an engineer →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
