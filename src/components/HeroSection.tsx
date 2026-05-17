import Link from 'next/link';
import LightRays from '@/components/LightRays';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-bg" />
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
      <div className="hero-grid" />
      <div className="hero-content">
        <div className="hero-badge">Custom Software Development Company</div>
        <h1>
          Turning Vision
          <br />
          Into Powerful
          <br />
          <em>Digital</em> Solutions
        </h1>
        <p>
          We build custom web, mobile, and AI-driven software solutions that solve real problems and drive business growth.
        </p>
        <div className="hero-actions">
          <Link href="/services" className="btn-primary">
            Explore Services →
          </Link>
          <Link href="/about" className="btn-outline">
            Learn About Us
          </Link>
        </div>
        <div className="hero-stats">
          <div>
            <div className="stat-num">
              500<span>+</span>
            </div>
            <div className="stat-label">Projects delivered</div>
          </div>
          <div>
            <div className="stat-num">
              14<span>yrs</span>
            </div>
            <div className="stat-label">Industry experience</div>
          </div>
          <div>
            <div className="stat-num">
              98<span>%</span>
            </div>
            <div className="stat-label">Client retention</div>
          </div>
        </div>
      </div>
      <div className="hero-visual" aria-hidden="true">
        <div className="hero-visual-inner">
          <div className="hv-bar w60" />
          <div className="hv-bar w40" />
          <div className="hv-row">
            <div className="hv-block acc" />
            <div className="hv-block" />
            <div className="hv-block" />
          </div>
          <div className="hv-bar w80" />
          <div className="hv-row">
            <div className="hv-block" />
            <div className="hv-block acc" />
          </div>
        </div>
      </div>
    </section>
  );
}
