'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Post } from '@/lib/posts';
import { slugify } from '@/lib/utils';
import { Sparkles, Calendar, Clock } from 'lucide-react';

const tagStyles: Record<string, string> = {
  'Cloud': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'AI & ML': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  'Security': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  'DevOps': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'Data': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

const defaultTagStyle = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';

type Props = {
  post: Post;
  related: Post[];
};

export default function ArticleSidebar({ post, related }: Props) {
  const [activeId, setActiveId] = useState<string>('');

  function goTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  useEffect(() => {
    const headingIds = post.content
      .filter((b) => b.type === 'h2')
      .map((b) => slugify(b.text ?? ''));

    const headingEls = headingIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (headingEls.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-100px 0px -55% 0px', threshold: 0 }
    );

    headingEls.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [post.content]);

  const h2Items = post.content.filter((b) => b.type === 'h2');

  return (
    <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-8 font-manrope">
      
      {/* ── TABLE OF CONTENTS ── */}
      {h2Items.length > 0 && (
        <div className="p-6 rounded-3xl border border-border bg-card shadow-xl backdrop-blur-sm">
          <h4 className="text-xs font-bold font-sora text-heading uppercase tracking-wider pb-3 border-b border-border/40 mb-4">
            In this article
          </h4>
          <nav className="flex flex-col gap-2.5" aria-label="Table of contents">
            {h2Items.map((b, i) => {
              const id = slugify(b.text ?? '');
              const isActive = activeId === id;
              return (
                <button
                  key={i}
                  className={`text-left text-xs font-medium font-manrope transition-colors cursor-pointer py-1.5 px-2.5 rounded-lg border leading-relaxed ${
                    isActive
                      ? 'border-accent/20 bg-accent/5 text-accent font-semibold'
                      : 'border-transparent text-muted hover:text-heading hover:bg-subtle-bg'
                  }`}
                  onClick={() => goTo(id)}
                >
                  {b.text}
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* ── RELATED ARTICLES ── */}
      {related.length > 0 && (
        <div className="p-6 rounded-3xl border border-border bg-card shadow-xl backdrop-blur-sm">
          <h4 className="text-xs font-bold font-sora text-heading uppercase tracking-wider pb-3 border-b border-border/40 mb-4">
            Related Insights
          </h4>
          <div className="flex flex-col gap-4">
            {related.map((rp) => (
              <Link
                key={rp.slug}
                href={`/blog/${rp.slug}`}
                className="group flex gap-3.5 items-start p-3 rounded-2xl border border-transparent hover:border-border hover:bg-subtle-bg transition-all duration-300"
              >
                <span className="text-xl shrink-0 mt-0.5">{rp.emoji}</span>
                <div className="flex-1">
                  <span className={`text-[8px] font-bold font-sora uppercase tracking-wider px-2 py-0.5 rounded-full border ${tagStyles[rp.tag] ?? defaultTagStyle}`}>
                    {rp.tag}
                  </span>
                  <p className="text-xs font-bold font-sora text-heading mt-1.5 leading-snug tracking-tight group-hover:text-accent transition-colors">
                    {rp.title}
                  </p>
                  <span className="text-[9px] text-muted font-manrope mt-1 block">
                    {rp.read}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── SIDEBAR CONVERSION CTA ── */}
      <div className="p-6 rounded-3xl border border-accent/20 bg-accent/[0.02] shadow-xl backdrop-blur-sm relative overflow-hidden text-center flex flex-col items-center gap-4">
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-accent/5 blur-xl pointer-events-none" />
        
        <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
          <Sparkles size={14} className="animate-pulse" />
        </div>

        <h4 className="text-sm font-bold font-sora text-heading leading-snug">
          Need tech roadmap help?
        </h4>
        
        <p className="text-[11px] text-muted leading-relaxed font-light font-manrope max-w-[190px]">
          Talk directly to our lead engineers. No obligations or sales loops.
        </p>

        <Link
          href="/contact"
          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-sora font-semibold text-xs text-navy bg-accent hover:opacity-90 shadow-md shadow-accent/15 transition-all"
        >
          Book Expert Call
        </Link>
      </div>

    </aside>
  );
}
