import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { posts, getPost, getRelatedPosts } from '@/lib/posts';
import { slugify } from '@/lib/utils';
import ArticleSidebar from '@/components/ArticleSidebar';
import CustomPostLoader from '@/components/CustomPostLoader';
import ClientOverrideLoader from '@/components/ClientOverrideLoader';
import LightRays from '@/components/LightRays';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  
  if (!post) {
    return { 
      title: 'Post Not Found — NexCore Blog',
      robots: { index: false, follow: false }
    };
  }

  // Fallback keywords based on tag
  const defaultKeywords = ['NexCore', 'IT Solutions', 'Tech Blog', 'Enterprise Tech'];
  const tagKeywords: Record<string, string[]> = {
    'Cloud': ['Multi-Cloud', 'Cloud Architecture', 'AWS', 'Azure', 'GCP', 'FinOps'],
    'AI & ML': ['LLM', 'Artificial Intelligence', 'Machine Learning', 'RAG', 'AI Integration'],
    'Security': ['Zero Trust', 'Cybersecurity', 'OWASP', 'MFA', 'Network Security'],
    'DevOps': ['Kubernetes', 'CI/CD', 'Docker', 'Platform Engineering', 'Observability'],
    'Data': ['Real-time Analytics', 'Data Architecture', 'Kafka', 'ClickHouse', 'Big Data'],
  };

  const keywords = [...(tagKeywords[post.tag] || []), ...defaultKeywords];

  return {
    title: `${post.title} — NexCore Blog`,
    description: post.excerpt,
    keywords: keywords.join(', '),
    authors: [{ name: post.author.name }],
    publisher: 'NexCore IT Solutions',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: {
      canonical: `http://localhost:3000/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author.name],
      tags: [post.tag],
    },
  };
}

const tagColors: Record<string, { bg: string; color: string }> = {
  Cloud:    { bg: 'rgba(0,212,255,0.12)',   color: 'var(--accent)' },
  'AI & ML':{ bg: 'rgba(6,255,165,0.12)',   color: 'var(--accent3)' },
  Security: { bg: 'rgba(124,58,237,0.15)',  color: '#a78bfa' },
  DevOps:   { bg: 'rgba(0,212,255,0.08)',   color: 'var(--accent)' },
  Data:     { bg: 'rgba(255,184,0,0.12)',   color: '#fbbf24' },
};

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  // Static post not found → might be a custom localStorage post; render client loader
  if (!post) {
    return <CustomPostLoader slug={slug} />;
  }

  const related = getRelatedPosts(post.related).slice(0, 3);
  const tc = tagColors[post.tag] ?? { bg: 'rgba(0,212,255,0.1)', color: 'var(--accent)' };

  return (
    <>
      <div id="server-post-content">
        {/* ── ARTICLE HERO ── */}
      <div className="article-hero">
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
              <div style={{ fontSize: '0.95rem', fontWeight: 500, color: '#fff' }}>
                {post.author.name}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                {post.author.role} · NexCore
              </div>
            </div>
          </div>
        </div>
        {/* Hero image strip */}
        <div className={`article-hero-img blog-img ${post.imgCls}`} aria-hidden="true" style={post.bannerUrl ? { backgroundImage: `url(${post.bannerUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
          {!post.bannerUrl && <span style={{ fontSize: '5rem' }}>{post.emoji}</span>}
        </div>
      </div>

      {/* ── ARTICLE BODY ── */}
      <section className="article-body-section">
        <div className="article-layout">

          {/* ── MAIN CONTENT ── */}
          <article className="article-content">
            {post.content.map((block, i) => {
              if (block.type === 'h2') {
                const id = slugify(block.text ?? '');
                return (
                  <h2 key={i} id={id} className="article-h2">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === 'h3') {
                const id = slugify(block.text ?? '');
                return (
                  <h3 key={i} id={id} className="article-h3">
                    {block.text}
                  </h3>
                );
              }
              if (block.type === 'p') {
                return <p key={i} className="article-p">{block.text}</p>;
              }
              if (block.type === 'ul') {
                return (
                  <ul key={i} className="article-ul">
                    {block.items?.map((item, j) => (
                      <li key={j} className="article-li">{item}</li>
                    ))}
                  </ul>
                );
              }
              if (block.type === 'ol') {
                return (
                  <ol key={i} className="article-ol">
                    {block.items?.map((item, j) => (
                      <li key={j} className="article-li">{item}</li>
                    ))}
                  </ol>
                );
              }
              if (block.type === 'blockquote') {
                return (
                  <blockquote key={i} className="article-blockquote">
                    {block.text}
                  </blockquote>
                );
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
                      if (sub.type === 'p') {
                        return <p key={j} className="article-p">{sub.text}</p>;
                      }
                      if (sub.type === 'ul') {
                        return (
                          <ul key={j} className="article-ul">
                            {sub.items?.map((item, k) => (
                              <li key={k} className="article-li">{item}</li>
                            ))}
                          </ul>
                        );
                      }
                      if (sub.type === 'ol') {
                        return (
                          <ol key={j} className="article-ol">
                            {sub.items?.map((item, k) => (
                              <li key={k} className="article-li">{item}</li>
                            ))}
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

            {/* ── SHARE / TAG ROW ── */}
            <div className="article-footer-row">
              <span
                className="article-tag-pill"
                style={{ background: tc.bg, color: tc.color, fontSize: '0.8rem', padding: '0.3rem 0.9rem' }}
              >
                {post.tag}
              </span>
              <div style={{ display: 'flex', gap: '0.6rem', marginLeft: 'auto' }}>
                {(['Share on X', 'LinkedIn', 'Copy link'] as const).map((label) => (
                  <button key={label} className="share-btn">{label}</button>
                ))}
              </div>
            </div>

            {/* ── AUTHOR BIO ── */}
            <div className="author-bio-card">
              <div className="testi-avatar author-bio-avatar">{post.author.initials}</div>
              <div>
                <div
                  style={{
                    fontSize: '0.78rem',
                    color: 'var(--accent)',
                    fontWeight: 600,
                    marginBottom: '0.2rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  Written by
                </div>
                <div
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#fff',
                    fontFamily: 'Syne, sans-serif',
                    marginBottom: '0.3rem',
                  }}
                >
                  {post.author.name}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                  {post.author.role} at NexCore IT Solutions. Specialising in enterprise-grade
                  engineering, cloud architecture, and scalable system design.
                </div>
              </div>
            </div>
          </article>

          {/* ── SIDEBAR (client component — handles sticky + active TOC) ── */}
          <ArticleSidebar post={post} related={related} />
        </div>
      </section>

      {/* ── RELATED POSTS FOOTER ── */}
      <section className="article-related-section">
        <div className="section-inner">
          <p className="section-tag">Keep reading</p>
          <h2
            className="section-title"
            style={{ fontSize: '1.8rem', marginBottom: '2.5rem' }}
          >
            More from the blog
          </h2>
          <div className="blog-grid">
            {related.map((rp) => {
              const rtc = tagColors[rp.tag] ?? { bg: 'rgba(0,212,255,0.1)', color: 'var(--accent)' };
              return (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="blog-card-link">
                  <article className="blog-card">
                    <div className={`blog-img ${rp.imgCls}`}>{rp.emoji}</div>
                    <div className="blog-body">
                      <span
                        className="blog-tag"
                        style={{
                          background: rtc.bg,
                          color: rtc.color,
                          padding: '0.2rem 0.6rem',
                          borderRadius: '50px',
                          display: 'inline-block',
                          marginBottom: '0.6rem',
                        }}
                      >
                        {rp.tag}
                      </span>
                      <h3>{rp.title}</h3>
                      <p>{rp.excerpt}</p>
                      <div className="blog-meta" style={{ marginTop: '1rem' }}>
                        <span>{rp.date}</span><span>·</span><span>{rp.read}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/blog" className="btn-outline">← Back to all articles</Link>
          </div>
        </div>
      </section>
      </div>
      <ClientOverrideLoader slug={slug} />
    </>
  );
}
