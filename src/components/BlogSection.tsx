'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from 'next/link';
import { useState } from 'react';
import { getLocalPosts, isLive } from '@/lib/localPosts';

const staticPosts = [
  {
    emoji: '☁️',
    cls: '',
    tag: 'Cloud',
    title: 'Why multi-cloud is no longer optional for enterprise in 2025',
    desc: 'Vendor lock-in risk, resilience requirements, and cost optimisation have converged to make multi-cloud strategy a board-level conversation.',
    date: 'May 8, 2025',
    read: '6 min read',
    slug: 'multi-cloud-enterprise-2025',
  },
  {
    emoji: '🤖',
    cls: 'b2',
    tag: 'AI & ML',
    title: 'Integrating LLMs into your existing product — a practical guide',
    desc: 'Lessons from 20+ AI integrations: what works, what fails, and how to build AI features that your users will actually trust and use.',
    date: 'Apr 21, 2025',
    read: '9 min read',
    slug: 'llm-integration-guide',
  },
  {
    emoji: '🔐',
    cls: 'b3',
    tag: 'Security',
    title: 'Zero-trust architecture: beyond the buzzword',
    desc: 'A clear breakdown of how zero-trust actually works in practice, and what a real implementation looks like for a mid-sized engineering team.',
    date: 'Apr 2, 2025',
    read: '7 min read',
    slug: 'zero-trust-architecture',
  },
];

export default function BlogSection() {
  const [posts] = useState(() => {
    if (typeof window !== 'undefined') {
      const custom = getLocalPosts().filter(isLive);
      if (custom.length > 0) {
        const existingSlugs = new Set(custom.map(p => p.slug));
        const uniqueStatic = staticPosts.filter(p => !existingSlugs.has(p.slug));
        // Show latest 3 posts
        return [...custom, ...uniqueStatic].slice(0, 3);
      }
    }
    return staticPosts;
  });

  return (
    <section id="blog" style={{ background: 'var(--navy2)' }}>
      <div className="section-inner">
        <p className="section-tag">Insights</p>
        <h2 className="section-title">From the NexCore blog</h2>
        <p className="section-sub">
          Perspectives on engineering, cloud, security, and the future of
          enterprise technology.
        </p>
        <div className="blog-grid">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <div className="blog-card">
                <div className={`blog-img ${(post as any).cls || ''}`} style={{ backgroundImage: (post as any).thumbnailUrl ? `url(${(post as any).thumbnailUrl})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  {!(post as any).thumbnailUrl && (post as any).emoji}
                </div>
                <div className="blog-body">
                  <p className="blog-tag">{(post as any).tag}</p>
                  <h3>{(post as any).title}</h3>
                  <p>{(post as any).desc || (post as any).excerpt}</p>
                  <div className="blog-meta">
                    <span>{(post as any).date || new Date((post as any).createdAt).toLocaleDateString()}</span>
                    <span>·</span>
                    <span>{(post as any).read || '5 min read'}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
