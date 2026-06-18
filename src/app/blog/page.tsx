import type { Metadata } from 'next';
import BlogFilter from '@/components/BlogFilter';
import ClientMetaUpdater from '@/components/ClientMetaUpdater';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights on software engineering, cloud architecture, cybersecurity, and performance marketing from the NexCore team.',
  openGraph: {
    title: 'Blog — NexCore IT Solutions & Marketing',
    description: 'Insights on software engineering, cloud architecture, cybersecurity, and performance marketing from the NexCore team.',
  },
};

export default function BlogPage() {
  return (
    <>
      <ClientMetaUpdater pageKey="blog" />
      
      {/* ── PAGE HERO ── */}
      <div className="relative pt-36 pb-16 px-6 md:px-12 bg-navy overflow-hidden text-center font-manrope">
        {/* Glow Spots */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[20%] left-[20%] w-[380px] h-[380px] rounded-full bg-accent/10 blur-[130px]" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(6,182,212,0.04)_1px,transparent_1px)] [background-size:32px_32px]" />
        </div>

        <div className="max-w-4xl mx-auto z-10 relative flex flex-col items-center gap-5">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/8 border border-accent/20">
            <Sparkles size={11} className="text-accent animate-pulse" />
            <span className="text-[10px] font-bold font-sora text-accent tracking-widest uppercase">
              Insights &amp; Perspectives
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-sora tracking-tight leading-tight text-heading">
            The NexCore Blog
          </h1>
          <p className="text-sm md:text-base text-muted font-light leading-relaxed max-w-xl">
            Read engineering roadmaps, ROI performance guides, cloud infrastructure updates, and AI agent frameworks directly from our active developers.
          </p>
        </div>
      </div>

      {/* Main Blog Filters & Listing Grid */}
      <section className="bg-navy py-12 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <BlogFilter />
        </div>
      </section>
    </>
  );
}
