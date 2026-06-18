import type { Metadata } from 'next';
import Link from 'next/link';
import ProcessSection from '@/components/ProcessSection';
import ClientMetaUpdater from '@/components/ClientMetaUpdater';
import ClientPageCustomizer from '@/components/ClientPageCustomizer';
import { ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Process',
  description: 'Our transparent 6-stage delivery workflow: Discovery, Strategy, Development, Marketing, Optimization, and Growth.',
  openGraph: {
    title: 'Our Process — NexCore IT Solutions & Marketing',
    description: 'Our transparent 6-stage delivery workflow: Discovery, Strategy, Development, Marketing, Optimization, and Growth.',
  },
};

export default function ProcessPage() {
  return (
    <ClientPageCustomizer pageKey="process">
      <ClientMetaUpdater pageKey="process" />
      
      {/* ── PAGE HERO ── */}
      <div className="relative pt-36 pb-20 px-6 md:px-12 bg-navy overflow-hidden text-center font-manrope">
        {/* Glow Spots */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[20%] left-[20%] w-[380px] h-[380px] rounded-full bg-accent/10 blur-[130px]" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(6,182,212,0.04)_1px,transparent_1px)] [background-size:32px_32px]" />
        </div>

        <div className="max-w-4xl mx-auto z-10 relative flex flex-col items-center gap-5">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/8 border border-accent/20">
            <Sparkles size={11} className="text-accent animate-pulse" />
            <span className="text-[10px] font-bold font-sora text-accent tracking-widest uppercase">
              Our Methodology
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-sora tracking-tight leading-tight text-heading">
            Sprints Engineered for Clarity
          </h1>
          <p className="text-sm md:text-base text-muted font-light leading-relaxed max-w-xl">
            No scope surprises or communication blackouts. We maintain absolute operational visibility from the initial workshop audit to launch Day.
          </p>
        </div>
      </div>

      {/* 6-step timeline section */}
      <ProcessSection />

      {/* Conversion Banner */}
      <section className="bg-navy py-24 px-6 md:px-12 font-manrope relative overflow-hidden">
        <div className="max-w-5xl mx-auto z-10 relative">
          <div className="relative rounded-3xl p-10 md:p-12 border border-border/80 bg-gradient-to-br from-navy2/90 to-navy/95 shadow-2xl text-center flex flex-col items-center gap-6">
            <h2 className="text-2xl md:text-3xl font-extrabold font-sora text-heading tracking-tight leading-tight max-w-lg">
              Ready to start your technical discovery sprint?
            </h2>
            <p className="text-xs text-muted max-w-md font-light leading-relaxed">
              Every great custom web panel or campaign conversion curve starts with a structured discovery call. Let&apos;s talk about your roadmap.
            </p>
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="flex items-center gap-2 px-8 py-3.5 rounded-full font-sora font-semibold text-xs text-navy bg-accent hover:opacity-90 shadow-lg shadow-accent/15 transition-all cursor-pointer"
              >
                Start Discovery Call <ArrowRight size={13} />
              </Link>
              <Link
                href="/services"
                className="flex items-center gap-2 px-8 py-3.5 rounded-full font-sora font-semibold text-xs text-heading border border-border bg-subtle-bg hover:bg-border/20 transition-all"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </ClientPageCustomizer>
  );
}
