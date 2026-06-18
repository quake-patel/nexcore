import type { Metadata } from 'next';
import Link from 'next/link';
import ClientMetaUpdater from '@/components/ClientMetaUpdater';
import AboutSection from '@/components/AboutSection';
import ClientPageCustomizer from '@/components/ClientPageCustomizer';
import { ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about NexCore — our software engineering heritage, ROI-focused acquisition philosophies, and our global delivery infrastructure.',
  openGraph: {
    title: 'About Us — NexCore IT Solutions & Marketing',
    description: 'Learn about NexCore — our software engineering heritage, ROI-focused acquisition philosophies, and our global delivery infrastructure.',
  },
};

export default function AboutPage() {
  return (
    <ClientPageCustomizer pageKey="about">
      <ClientMetaUpdater pageKey="about" />
      
      {/* ── PAGE HERO ── */}
      <div className="relative pt-36 pb-20 px-6 md:px-12 bg-navy overflow-hidden text-center font-manrope">
        {/* Glow Spots */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[20%] left-[20%] w-[380px] h-[380px] rounded-full bg-accent2/10 blur-[130px]" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(6,182,212,0.04)_1px,transparent_1px)] [background-size:32px_32px]" />
        </div>

        <div className="max-w-4xl mx-auto z-10 relative flex flex-col items-center gap-5">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/8 border border-accent/20">
            <Sparkles size={11} className="text-accent animate-pulse" />
            <span className="text-[10px] font-bold font-sora text-accent tracking-widest uppercase">
              Our Journey &amp; Culture
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-sora tracking-tight leading-tight text-heading">
            Builders at Heart.<br />Engineered for Results.
          </h1>
          <p className="text-sm md:text-base text-muted font-light leading-relaxed max-w-xl">
            Founded in GIFT City, Ahmedabad in 2010, NexCore started with a primary mission: custom digital platforms should directly drive buyer actions and business growth.
          </p>
        </div>
      </div>

      {/* Stats and Narrative Blocks */}
      <AboutSection />

      {/* Secondary Values Grid */}
      <section className="bg-navy2 py-24 px-6 md:px-12 relative overflow-hidden font-manrope">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
            <span className="text-xs font-semibold font-sora text-accent tracking-widest uppercase">
              Our Core Philosophies
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-sora text-heading tracking-tight mt-3">
              Values That Govern Our Work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'High-Integrity Codebase',
                desc: 'We write clear, type-safe, document-backed scripts. We hate code shortcuts or quick patches that create system technical debt later.'
              },
              {
                title: 'Strict Commercial ROI',
                desc: 'Every product feature we map and every ad asset we launch is audited against high conversion performance and user engagement.'
              },
              {
                title: 'Seamless Collaboration',
                desc: 'We integrate deeply with your internal product planning and engineering teams via Slack channels, daily sprints, and transparent reviews.'
              }
            ].map((value, idx) => (
              <div key={idx} className="p-8 rounded-3xl border border-border bg-card shadow-lg flex flex-col gap-4">
                <span className="text-2xl font-bold font-sora text-accent">0{idx + 1}</span>
                <h3 className="text-base font-bold font-sora text-heading">{value.title}</h3>
                <p className="text-xs text-muted leading-relaxed font-light font-manrope">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Banner */}
      <section className="bg-navy py-24 px-6 md:px-12 font-manrope relative overflow-hidden">
        <div className="max-w-5xl mx-auto z-10 relative">
          <div className="relative rounded-3xl p-10 md:p-12 border border-border/80 bg-gradient-to-br from-navy2/90 to-navy/95 shadow-2xl text-center flex flex-col items-center gap-6">
            <h2 className="text-2xl md:text-3xl font-extrabold font-sora text-heading tracking-tight leading-tight max-w-lg">
              Want to scale your product or traffic pipeline?
            </h2>
            <p className="text-xs text-muted max-w-md font-light leading-relaxed">
              We would love to discuss your engineering obstacles and custom customer-acquisition goals.
            </p>
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="flex items-center gap-2 px-8 py-3.5 rounded-full font-sora font-semibold text-xs text-navy bg-accent hover:opacity-90 shadow-lg shadow-accent/15 transition-all cursor-pointer"
              >
                Schedule Consultation <ArrowRight size={13} />
              </Link>
              <Link
                href="/services"
                className="flex items-center gap-2 px-8 py-3.5 rounded-full font-sora font-semibold text-xs text-heading border border-border bg-subtle-bg hover:bg-border/20 transition-all"
              >
                View Capabilities
              </Link>
            </div>
          </div>
        </div>
      </section>
    </ClientPageCustomizer>
  );
}
