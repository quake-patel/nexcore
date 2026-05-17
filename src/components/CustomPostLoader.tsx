'use client';

/**
 * When the server can't find the post (it's a custom localStorage post),
 * this component tries to load it from localStorage and renders the full article.
 */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getLocalPosts, type LocalPost } from '@/lib/localPosts';
import { slugify } from '@/lib/utils';
import ArticleSidebar from '@/components/ArticleSidebar';
import type { Post } from '@/lib/posts';

const tagColors: Record<string, { bg: string; color: string }> = {
  Cloud:    { bg: 'rgba(0,212,255,0.12)',   color: 'var(--accent)' },
  'AI & ML':{ bg: 'rgba(6,255,165,0.12)',   color: 'var(--accent3)' },
  Security: { bg: 'rgba(124,58,237,0.15)',  color: '#a78bfa' },
  DevOps:   { bg: 'rgba(0,212,255,0.08)',   color: 'var(--accent)' },
  Data:     { bg: 'rgba(255,184,0,0.12)',   color: '#fbbf24' },
};

export default function CustomPostLoader({ slug, fallbackPost }: { slug: string; fallbackPost?: Post }) {
  const [post] = useState<(LocalPost | Post) | null>(() => {
    if (typeof window !== 'undefined') {
      const found = getLocalPosts().find((p) => p.slug === slug);
      if (found) return found;
    }
    return fallbackPost ?? null;
  });

  useEffect(() => {
    if (post) {
      // Set document title
      const title = ('metaTitle' in post ? post.metaTitle : undefined) || post.title;
      document.title = `${title} — NexCore Blog`;

      // Update meta description
      let descEl = document.querySelector('meta[name="description"]');
      if (!descEl) {
        descEl = document.createElement('meta');
        descEl.setAttribute('name', 'description');
        document.head.appendChild(descEl);
      }
      descEl.setAttribute('content', ('metaDescription' in post ? post.metaDescription : undefined) || post.excerpt);

      // Update keywords
      let keywordsEl = document.querySelector('meta[name="keywords"]');
      if (!keywordsEl) {
        keywordsEl = document.createElement('meta');
        keywordsEl.setAttribute('name', 'keywords');
        document.head.appendChild(keywordsEl);
      }
      keywordsEl.setAttribute('content', `${post.tag}, NexCore, Tech Blog`);

      // Update author
      let authorEl = document.querySelector('meta[name="author"]');
      if (!authorEl) {
        authorEl = document.createElement('meta');
        authorEl.setAttribute('name', 'author');
        document.head.appendChild(authorEl);
      }
      authorEl.setAttribute('content', post.author.name);

      // Update canonical
      let canonicalEl = document.querySelector('link[rel="canonical"]');
      if (!canonicalEl) {
        canonicalEl = document.createElement('link');
        canonicalEl.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute('href', `http://localhost:3000/blog/${slug}`);
    }
  }, [post, slug]);

  if (!post) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <div style={{ fontSize: '3rem' }}>📭</div>
        <h1 style={{ color: '#fff', fontFamily: 'Syne,sans-serif' }}>Post not found</h1>
        <Link href="/blog" className="btn-outline">← Back to blog</Link>
      </div>
    );
  }

  const tc = tagColors[post.tag] ?? { bg: 'rgba(0,212,255,0.1)', color: 'var(--accent)' };

  return (
    <>
      {/* ── HERO ── */}
      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="article-hero-meta">
            <span className="article-tag-pill" style={{ background: tc.bg, color: tc.color }}>
              {post.tag}
            </span>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>{post.date}</span>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>·</span>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>{post.read}</span>
          </div>
          <h1 className="article-title">{post.title}</h1>
          <p className="article-excerpt">{post.excerpt}</p>
          <div className="article-author-row">
            <div className="testi-avatar article-avatar">{post.author.initials}</div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 500, color: '#fff' }}>{post.author.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{post.author.role} · NexCore</div>
            </div>
          </div>
        </div>
        <div className={`article-hero-img blog-img ${post.imgCls}`} aria-hidden="true" style={post.bannerUrl ? { backgroundImage: `url(${post.bannerUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
          {!post.bannerUrl && <span style={{ fontSize: '5rem' }}>{post.emoji}</span>}
        </div>
      </div>

      {/* ── BODY ── */}
      <section className="article-body-section">
        <div className="article-layout">
          <article className="article-content">
            {post.content.map((block, i) => {
              if (block.type === 'h2') {
                return <h2 key={i} id={slugify(block.text ?? '')} className="article-h2">{block.text}</h2>;
              }
              if (block.type === 'h3') {
                return <h3 key={i} id={slugify(block.text ?? '')} className="article-h3">{block.text}</h3>;
              }
              if (block.type === 'p') return <p key={i} className="article-p">{block.text}</p>;
              if (block.type === 'ul') {
                return (
                  <ul key={i} className="article-ul">
                    {block.items?.map((item, j) => <li key={j} className="article-li">{item}</li>)}
                  </ul>
                );
              }
              if (block.type === 'ol') {
                return (
                  <ol key={i} className="article-ol">
                    {block.items?.map((item, j) => <li key={j} className="article-li">{item}</li>)}
                  </ol>
                );
              }
              if (block.type === 'blockquote') {
                return <blockquote key={i} className="article-blockquote">{block.text}</blockquote>;
              }
              if (block.type === 'callout') {
                return (
                  <div key={i} className="article-callout">
                    <span className="callout-icon">💡</span>
                    <p>{block.text}</p>
                  </div>
                );
              }
              if (block.type === 'section') {
                const TitleTag = (block.titleType || 'h2') as 'h2' | 'h3';
                const id = slugify(block.title ?? '');
                return (
                  <div key={i} className="article-section-container">
                    <TitleTag id={id} className={`article-${TitleTag}`}>
                      {block.title}
                    </TitleTag>
                    {block.subBlocks?.map((sub, j) => {
                      if (sub.type === 'p') return <p key={j} className="article-p">{sub.text}</p>;
                      if (sub.type === 'ul') {
                        return (
                          <ul key={j} className="article-ul">
                            {sub.items?.map((item, k) => <li key={k} className="article-li">{item}</li>)}
                          </ul>
                        );
                      }
                      if (sub.type === 'ol') {
                        return (
                          <ol key={j} className="article-ol">
                            {sub.items?.map((item, k) => <li key={k} className="article-li">{item}</li>)}
                          </ol>
                        );
                      }
                      return null;
                    })}
                  </div>
                );
              }
              if (block.type === 'table') {
                return (
                  <div key={i} className="article-table-wrapper">
                    <table className="article-table">
                      {block.headers && block.headers.length > 0 && (
                        <thead>
                          <tr>
                            {block.headers.map((header, j) => (
                              <th key={j}>{header}</th>
                            ))}
                          </tr>
                        </thead>
                      )}
                      {block.rows && block.rows.length > 0 && (
                        <tbody>
                          {block.rows.map((row, j) => (
                            <tr key={j}>
                              {row.map((cell, k) => (
                                <td key={k}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      )}
                    </table>
                  </div>
                );
              }
              return null;
            })}

            <div className="article-footer-row">
              <span className="article-tag-pill" style={{ background: tc.bg, color: tc.color, fontSize: '0.8rem', padding: '0.3rem 0.9rem' }}>
                {post.tag}
              </span>
              <div style={{ display: 'flex', gap: '0.6rem', marginLeft: 'auto' }}>
                {(['Share on X', 'LinkedIn', 'Copy link'] as const).map((label) => (
                  <button key={label} className="share-btn">{label}</button>
                ))}
              </div>
            </div>

            <div className="author-bio-card">
              <div className="testi-avatar author-bio-avatar">{post.author.initials}</div>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Written by</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', fontFamily: 'Syne, sans-serif', marginBottom: '0.3rem' }}>{post.author.name}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>{post.author.role} at NexCore IT Solutions.</div>
              </div>
            </div>
          </article>

          <ArticleSidebar post={post as unknown as Post} related={[]} />
        </div>
      </section>

      <section className="article-related-section">
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <Link href="/blog" className="btn-outline">← Back to all articles</Link>
        </div>
      </section>
    </>
  );
}
