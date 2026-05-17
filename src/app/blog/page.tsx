import type { Metadata } from 'next';
import BlogFilter from '@/components/BlogFilter';
import ClientMetaUpdater from '@/components/ClientMetaUpdater';
import LightRays from '@/components/LightRays';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights on software engineering, cloud architecture, cybersecurity, and AI from the NexCore team.',
  openGraph: {
    title: 'Blog — NexCore IT Solutions',
    description: 'Insights on software engineering, cloud architecture, cybersecurity, and AI from the NexCore team.',
  },
};

export default function BlogPage() {
  return (
    <>
      <ClientMetaUpdater pageKey="blog" />
      {/* ── PAGE HERO ── */}
      <div className="page-hero">
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <LightRays
            raysOrigin="top-center"
            raysColor="#e8601b"
            raysSpeed={1.2}
            lightSpread={0.7}
            rayLength={3}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0}
            distortion={0}
            className="custom-rays"
            pulsating={false}
            fadeDistance={1.1}
            saturation={1.2}
          />
        </div>
        <div className="page-hero-inner">
          <p className="section-tag">Insights</p>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)' }}>
            From the NexCore blog
          </h1>
          <p className="section-sub">
            Perspectives on engineering, cloud, security, and the future of
            enterprise technology — written by the people building it.
          </p>
        </div>
      </div>

      <section style={{ background: 'var(--navy)' }}>
        <div className="section-inner">
          {/* Client component handles filtering + all post rendering */}
          <BlogFilter />
        </div>
      </section>
    </>
  );
}
