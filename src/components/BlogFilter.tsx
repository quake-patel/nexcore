'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { posts as staticPosts } from '@/lib/posts';
import { getLocalPosts, isLive } from '@/lib/localPosts';
import type { Post } from '@/lib/posts';

const ALL = 'All';

const tagStyle: Record<string, { bg: string; color: string }> = {
  'Cloud':    { bg: 'rgba(0,212,255,0.12)',   color: 'var(--accent)' },
  'AI & ML':  { bg: 'rgba(6,255,165,0.12)',   color: 'var(--accent3)' },
  'Security': { bg: 'rgba(124,58,237,0.15)',  color: '#a78bfa' },
  'DevOps':   { bg: 'rgba(0,212,255,0.08)',   color: 'var(--accent)' },
  'Data':     { bg: 'rgba(255,184,0,0.12)',   color: '#fbbf24' },
};

const defaultStyle = { bg: 'rgba(0,212,255,0.1)', color: 'var(--accent)' };

export default function BlogFilter() {
  const [activeTag, setActiveTag] = useState(ALL);
  const [allPosts, setAllPosts] = useState<Post[]>(staticPosts);

  // Merge localStorage custom posts on the client
  useEffect(() => {
    const custom = getLocalPosts();
    if (custom.length > 0) {
      // Custom posts appear first (most recent)
      // Deduplicate by slug so that edited static posts override original ones
      const existingSlugs = new Set(custom.map(p => p.slug));
      const uniqueStatic = staticPosts.filter(p => !existingSlugs.has(p.slug));
      setAllPosts([...custom, ...uniqueStatic]);
    }
  }, []);

  // Derive tag list from merged posts
  const tags = [ALL, ...Array.from(new Set(allPosts.map((p) => p.tag)))];

  const filtered = activeTag === ALL ? allPosts : allPosts.filter((p) => p.tag === activeTag);
  const [featured, ...rest] = filtered;

  return (
    <>
      {/* ── CATEGORY FILTER BAR ── */}
      <div className="blog-filter-bar" role="tablist" aria-label="Filter by category">
        {tags.map((tag) => {
          const ts = tagStyle[tag] ?? defaultStyle;
          return (
            <button
              key={tag}
              role="tab"
              aria-selected={activeTag === tag}
              onClick={() => setActiveTag(tag)}
              className="blog-filter-pill"
              style={
                activeTag === tag
                  ? { background: ts.bg, color: ts.color, borderColor: ts.color, opacity: 1 }
                  : {}
              }
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* ── FEATURED POST ── */}
      {featured && (
        <Link href={`/blog/${featured.slug}`} className="featured-card">
          <div className={`featured-img blog-img ${featured.imgCls}`} aria-hidden="true" style={featured.thumbnailUrl ? { backgroundImage: `url(${featured.thumbnailUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
            {!featured.thumbnailUrl && <span className="featured-emoji">{featured.emoji}</span>}
          </div>
          <div className="featured-body">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
              <span
                className="blog-tag"
                style={{
                  ...(tagStyle[featured.tag] ?? defaultStyle),
                  background: (tagStyle[featured.tag] ?? defaultStyle).bg,
                  padding: '0.25rem 0.75rem',
                  borderRadius: '50px',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                {featured.tag}
              </span>
              {activeTag === ALL && (
                <span
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--accent)',
                    fontWeight: 600,
                    background: 'rgba(0,212,255,0.08)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '50px',
                    border: '1px solid rgba(0,212,255,0.2)',
                  }}
                >
                  ✦ Featured
                </span>
              )}
            </div>
            <h2 className="featured-title">{featured.title}</h2>
            <p className="featured-excerpt">{featured.excerpt}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
              <div className="testi-avatar">{featured.author.initials}</div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 500, color: '#fff' }}>
                  {featured.author.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{featured.author.role}</div>
              </div>
              <div className="blog-meta" style={{ marginLeft: 'auto' }}>
                <span>{featured.date}</span>
                <span>·</span>
                <span>{featured.read}</span>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* ── POST GRID ── */}
      {rest.length > 0 && (
        <div className="blog-grid" style={{ marginTop: '2.5rem' }}>
          {rest.map((post) => {
            const ts = tagStyle[post.tag] ?? defaultStyle;
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card-link">
                <article className="blog-card">
                  <div className={`blog-img ${post.imgCls}`} style={post.thumbnailUrl ? { backgroundImage: `url(${post.thumbnailUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
                    {!post.thumbnailUrl && post.emoji}
                  </div>
                  <div className="blog-body">
                    <span
                      className="blog-tag"
                      style={{
                        background: ts.bg,
                        color: ts.color,
                        padding: '0.2rem 0.6rem',
                        borderRadius: '50px',
                        display: 'inline-block',
                        marginBottom: '0.6rem',
                      }}
                    >
                      {post.tag}
                    </span>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: 'auto' }}>
                      <div className="testi-avatar" style={{ width: '28px', height: '28px', fontSize: '0.65rem' }}>
                        {post.author.initials}
                      </div>
                      <div className="blog-meta">
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{post.read}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      )}

      {/* ── EMPTY STATE ── */}
      {filtered.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '5rem 2rem',
            color: 'var(--muted)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            marginTop: '2rem',
          }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📭</div>
          <p style={{ fontSize: '1rem' }}>No posts in this category yet. Check back soon!</p>
        </div>
      )}

      {/* ── NEWSLETTER CTA ── */}
      <div className="newsletter-box">
        <div className="newsletter-body">
          <p className="section-tag" style={{ marginBottom: '0.5rem' }}>Stay sharp</p>
          <h3
            style={{
              fontFamily: 'Sora, sans-serif',
              fontWeight: 800,
              fontSize: '1.6rem',
              color: 'var(--heading-color)',
              marginBottom: '0.5rem',
            }}
          >
            Get our insights in your inbox
          </h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', fontWeight: 300 }}>
            No spam. Just the best articles from the NexCore team, once a month.
          </p>
        </div>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Your work email"
            className="cta-input"
            style={{ borderRadius: '10px', minWidth: '240px' }}
          />
          <button
            type="submit"
            className="btn-primary"
            style={{ border: 'none', cursor: 'pointer', borderRadius: '10px' }}
          >
            Subscribe →
          </button>
        </form>
      </div>
    </>
  );
}
