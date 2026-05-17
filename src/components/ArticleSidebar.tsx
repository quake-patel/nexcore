'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Post } from '@/lib/posts';
import { slugify } from '@/lib/utils';

const tagColors: Record<string, { bg: string; color: string }> = {
  Cloud:    { bg: 'rgba(0,212,255,0.12)',   color: 'var(--accent)' },
  'AI & ML':{ bg: 'rgba(6,255,165,0.12)',   color: 'var(--accent3)' },
  Security: { bg: 'rgba(124,58,237,0.15)',  color: '#a78bfa' },
  DevOps:   { bg: 'rgba(0,212,255,0.08)',   color: 'var(--accent)' },
  Data:     { bg: 'rgba(255,184,0,0.12)',   color: '#fbbf24' },
};

type Props = {
  post: Post;
  related: Post[];
};

export default function ArticleSidebar({ post, related }: Props) {
  const [activeId, setActiveId] = useState<string>('');

  // ── Smooth scroll to heading ──────────────────────────────────────────────
  function goTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  // ── Highlight active TOC item as headings enter viewport ─────────────────
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
    <aside className="article-sidebar">
      {/* ── TABLE OF CONTENTS ── */}
      <div className="sidebar-widget">
        <h4 className="sidebar-widget-title">In this article</h4>
        <nav className="toc-nav" aria-label="Table of contents">
          {h2Items.map((b, i) => {
            const id = slugify(b.text ?? '');
            return (
              <button
                key={i}
                className={`toc-item${activeId === id ? ' toc-active' : ''}`}
                onClick={() => goTo(id)}
              >
                {b.text}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ── RELATED ARTICLES ── */}
      <div className="sidebar-widget">
        <h4 className="sidebar-widget-title">Related articles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {related.map((rp) => {
            const rtc = tagColors[rp.tag] ?? { bg: 'rgba(0,212,255,0.1)', color: 'var(--accent)' };
            return (
              <Link key={rp.slug} href={`/blog/${rp.slug}`} className="related-card">
                <span className="related-card-emoji">{rp.emoji}</span>
                <div>
                  <span
                    className="article-tag-pill"
                    style={{
                      background: rtc.bg,
                      color: rtc.color,
                      fontSize: '0.65rem',
                      padding: '0.15rem 0.5rem',
                      marginBottom: '0.35rem',
                      display: 'inline-block',
                    }}
                  >
                    {rp.tag}
                  </span>
                  <p className="related-card-title">{rp.title}</p>
                  <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{rp.read}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="sidebar-cta">
        <p className="section-tag" style={{ marginBottom: '0.5rem' }}>Work with us</p>
        <h4
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            color: '#fff',
            fontSize: '1.1rem',
            marginBottom: '0.6rem',
            lineHeight: 1.3,
          }}
        >
          Need help with your next project?
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '1.2rem', lineHeight: 1.6 }}>
          Talk to one of our engineers — no obligation, no sales pitch.
        </p>
        <Link
          href="/contact"
          className="btn-primary"
          style={{ fontSize: '0.85rem', padding: '0.6rem 1.3rem', display: 'inline-flex' }}
        >
          Get in touch →
        </Link>
      </div>
    </aside>
  );
}
