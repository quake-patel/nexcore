import type { Metadata } from 'next';
import Link from 'next/link';
import ClientMetaUpdater from '@/components/ClientMetaUpdater';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about NexCore — our story, mission, team, and the values that drive everything we build.',
  openGraph: {
    title: 'About Us — NexCore IT Solutions',
    description: 'Learn about NexCore — our story, mission, team, and the values that drive everything we build.',
  },
};

export default function AboutPage() {
  return (
    <>
      <ClientMetaUpdater pageKey="about" />
      <div className="page-hero">
        <div className="page-hero-inner">
          <p className="section-tag">Who we are</p>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)' }}>
            We&apos;re builders.<br />Not just consultants.
          </h1>
          <p className="section-sub">
            Founded in 2010 in Ahmedabad, NexCore started as a small team of
            developers with a big idea: technology should empower businesses,
            not slow them down.
          </p>
        </div>
      </div>

      <section style={{ background: 'var(--navy2)' }}>
        <div className="section-inner">
          <div className="about-grid">
            <div className="about-visual" aria-hidden="true">
              <div className="about-visual-content">
                <div className="av-card accent">
                  <div className="av-num">500<small>+</small></div>
                  <div className="av-label">Projects delivered</div>
                </div>
                <div className="av-card">
                  <div className="av-num">120<small>+</small></div>
                  <div className="av-label">Engineers &amp; designers</div>
                </div>
                <div className="av-card">
                  <div className="av-num">40<small>+</small></div>
                  <div className="av-label">Countries served</div>
                </div>
                <div className="av-card accent">
                  <div className="av-num">14<small>yrs</small></div>
                  <div className="av-label">In the industry</div>
                </div>
              </div>
            </div>
            <div className="about-text">
              <p className="section-tag">Our mission</p>
              <h2 className="section-title">Technology that moves business forward</h2>
              <p className="section-sub">
                Every project we take on is guided by one question: how does this
                create real value for the people who use it?
              </p>
              <div className="feat">
                <div className="feat-dot" />
                <div>
                  <h4>Mission-driven engineering</h4>
                  <p>Every line of code we write is purpose-built to solve a real business problem — not to add complexity.</p>
                </div>
              </div>
              <div className="feat">
                <div className="feat-dot" />
                <div>
                  <h4>Long-term partnerships</h4>
                  <p>98% of our clients return for follow-on work. We invest in understanding your domain as deeply as you do.</p>
                </div>
              </div>
              <div className="feat">
                <div className="feat-dot" />
                <div>
                  <h4>Global reach, local presence</h4>
                  <p>With delivery centres across India, Europe, and the US, we follow the sun to keep your projects moving.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 5% 5rem' }}>
        <div className="cta-box">
          <h2>Want to work with us?</h2>
          <p>We&apos;d love to hear about your project and explore how we can help.</p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <Link href="/contact" className="btn-primary">Get in touch →</Link>
            <Link href="/services" className="btn-outline">View our services</Link>
          </div>
        </div>
      </section>
    </>
  );
}
