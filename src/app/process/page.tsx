import type { Metadata } from 'next';
import Link from 'next/link';
import ProcessSection from '@/components/ProcessSection';
import ClientMetaUpdater from '@/components/ClientMetaUpdater';

export const metadata: Metadata = {
  title: 'Our Process',
  description: 'A transparent, four-stage delivery process: Discovery, Architecture, Build & Test, and Launch & Scale.',
  openGraph: {
    title: 'Our Process — NexCore IT Solutions',
    description: 'A transparent, four-stage delivery process: Discovery, Architecture, Build & Test, and Launch & Scale.',
  },
};

export default function ProcessPage() {
  return (
    <>
      <ClientMetaUpdater pageKey="process" />
      <div className="page-hero">
        <div className="page-hero-inner">
          <p className="section-tag">How we work</p>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)' }}>
            A process built for clarity
          </h1>
          <p className="section-sub">
            No surprises. No scope creep. Just a structured four-stage approach
            that keeps everyone aligned from kickoff to launch.
          </p>
        </div>
      </div>

      <ProcessSection />

      <section style={{ padding: '0 5% 5rem' }}>
        <div className="cta-box">
          <h2>Ready to start your journey?</h2>
          <p>Every great product starts with a discovery call. Let&apos;s map out your project together.</p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Link href="/contact" className="btn-primary">Start with Discovery →</Link>
            <Link href="/services" className="btn-outline">See our services</Link>
          </div>
        </div>
      </section>
    </>
  );
}
