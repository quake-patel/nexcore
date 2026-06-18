'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getLocalPosts, type LocalPost } from '@/lib/localPosts';
import { slugify } from '@/lib/utils';
import ArticleSidebar from '@/components/ArticleSidebar';
import type { Post } from '@/lib/posts';
import { Calendar, Clock, ArrowLeft, Send } from 'lucide-react';

const tagStyles: Record<string, string> = {
  'Cloud': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'AI & ML': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  'Security': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  'DevOps': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'Data': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

const defaultTagStyle = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';

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
      const title = ('metaTitle' in post ? post.metaTitle : undefined) || post.title;
      document.title = `${title} — NexCore Blog`;

      let descEl = document.querySelector('meta[name="description"]');
      if (!descEl) {
        descEl = document.createElement('meta');
        descEl.setAttribute('name', 'description');
        document.head.appendChild(descEl);
      }
      descEl.setAttribute('content', ('metaDescription' in post ? post.metaDescription : undefined) || post.excerpt);

      let keywordsEl = document.querySelector('meta[name="keywords"]');
      if (!keywordsEl) {
        keywordsEl = document.createElement('meta');
        keywordsEl.setAttribute('name', 'keywords');
        document.head.appendChild(keywordsEl);
      }
      keywordsEl.setAttribute('content', `${post.tag}, NexCore, Tech Blog`);

      let authorEl = document.querySelector('meta[name="author"]');
      if (!authorEl) {
        authorEl = document.createElement('meta');
        authorEl.setAttribute('name', 'author');
        document.head.appendChild(authorEl);
      }
      authorEl.setAttribute('content', post.author.name);

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
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-center font-manrope bg-navy px-6">
        <div className="text-5xl">📭</div>
        <h1 className="text-2xl font-bold font-sora text-heading">Post Not Found</h1>
        <p className="text-xs text-muted font-light max-w-xs leading-relaxed">
          The requested dynamic content could not be located in our production system or local draft workspace.
        </p>
        <Link
          href="/blog"
          className="flex items-center gap-2 px-6 py-3 rounded-full font-sora font-semibold text-xs text-heading border border-border bg-subtle-bg hover:bg-border/20 transition-all mt-4"
        >
          ← Back to insights
        </Link>
      </div>
    );
  }

  const tagStyle = tagStyles[post.tag] ?? defaultTagStyle;

  return (
    <>
      <div className="bg-navy font-manrope min-h-screen">
        
        {/* ── ARTICLE HERO ── */}
        <div className="relative pt-36 pb-16 px-6 md:px-12 bg-navy overflow-hidden border-b border-border">
          {/* Glow Spots */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-[20%] left-[20%] w-[380px] h-[380px] rounded-full bg-accent/10 blur-[130px]" />
          </div>

          <div className="max-w-4xl mx-auto z-10 relative flex flex-col items-start gap-6">
            <Link
              href="/blog"
              className="flex items-center gap-1 text-xs font-semibold font-sora text-accent hover:underline"
            >
              <ArrowLeft size={12} /> Back to insights
            </Link>

            <div className="flex flex-wrap items-center gap-4 text-[10px] text-muted font-manrope">
              <span className={`font-bold font-sora uppercase tracking-wider px-2.5 py-1 rounded-full border ${tagStyle}`}>
                {post.tag}
              </span>
              <span className="flex items-center gap-1"><Calendar size={11} className="text-accent" />{post.date}</span>
              <span className="flex items-center gap-1"><Clock size={11} className="text-accent" />{post.read}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold font-sora tracking-tight leading-tight text-heading max-w-3xl">
              {post.title}
            </h1>

            <p className="text-xs md:text-sm text-muted font-light leading-relaxed max-w-2xl">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-3.5 pt-4 border-t border-border/40 w-full max-w-md">
              <div className="w-10 h-10 rounded-full bg-subtle-bg border border-border flex items-center justify-center font-sora font-bold text-xs text-accent">
                {post.author.initials}
              </div>
              <div>
                <div className="text-xs font-bold font-sora text-heading">{post.author.name}</div>
                <div className="text-[10px] text-muted font-manrope">{post.author.role} · NexCore</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── ARTICLE BODY ── */}
        <section className="py-20 px-6 md:px-12 relative overflow-hidden bg-navy2">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
            
            {/* ── MAIN CONTENT ── */}
            <article className="flex-1 w-full max-w-3xl">
              {post.content.map((block, i) => {
                if (block.type === 'h2') {
                  const id = slugify(block.text ?? '');
                  return (
                    <h2 key={i} id={id} className="text-xl md:text-2xl font-extrabold font-sora text-heading mt-10 mb-4 tracking-tight leading-tight border-b border-border/40 pb-2">
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === 'h3') {
                  const id = slugify(block.text ?? '');
                  return (
                    <h3 key={i} id={id} className="text-lg font-bold font-sora text-heading mt-8 mb-3 tracking-tight leading-tight">
                      {block.text}
                    </h3>
                  );
                }
                if (block.type === 'p') {
                  return (
                    <p key={i} className="text-xs md:text-sm text-muted font-light leading-relaxed font-manrope mb-6">
                      {block.text}
                    </p>
                  );
                }
                if (block.type === 'ul') {
                  return (
                    <ul key={i} className="list-disc pl-6 text-xs md:text-sm text-muted font-light leading-relaxed font-manrope mb-6 flex flex-col gap-2">
                      {block.items?.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  );
                }
                if (block.type === 'ol') {
                  return (
                    <ol key={i} className="list-decimal pl-6 text-xs md:text-sm text-muted font-light leading-relaxed font-manrope mb-6 flex flex-col gap-2">
                      {block.items?.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ol>
                  );
                }
                if (block.type === 'blockquote') {
                  return (
                    <blockquote key={i} className="border-l-2 border-accent bg-subtle-bg p-5 rounded-r-2xl text-xs md:text-sm text-heading italic font-light font-manrope mb-6 leading-relaxed">
                      &ldquo;{block.text}&rdquo;
                    </blockquote>
                  );
                }
                if (block.type === 'callout') {
                  return (
                    <div key={i} className="flex gap-3.5 items-start p-5 rounded-2xl border border-accent/20 bg-accent/[0.03] text-xs md:text-sm text-heading leading-relaxed mb-6 font-manrope shadow-sm">
                      <div className="w-5 h-5 rounded bg-accent/15 border border-accent/25 flex items-center justify-center text-accent text-[10px] shrink-0 mt-0.5 font-sora font-bold">💡</div>
                      <p className="font-light">{block.text}</p>
                    </div>
                  );
                }
                if (block.type === 'section') {
                  const TitleTag = (block.titleType || 'h2') as 'h2' | 'h3';
                  const id = slugify(block.title ?? '');
                  const headingCls = TitleTag === 'h2'
                    ? 'text-xl md:text-2xl font-extrabold font-sora text-heading mt-10 mb-4 tracking-tight leading-tight border-b border-border/40 pb-2'
                    : 'text-lg font-bold font-sora text-heading mt-8 mb-3 tracking-tight leading-tight';

                  return (
                    <div key={i} className="mb-8">
                      <TitleTag id={id} className={headingCls}>
                        {block.title}
                      </TitleTag>
                      {block.subBlocks?.map((sub, j) => {
                        if (sub.type === 'p') {
                          return (
                            <p key={j} className="text-xs md:text-sm text-muted font-light leading-relaxed font-manrope mb-4">
                              {sub.text}
                            </p>
                          );
                        }
                        if (sub.type === 'ul') {
                          return (
                            <ul key={j} className="list-disc pl-6 text-xs md:text-sm text-muted font-light leading-relaxed font-manrope mb-4 flex flex-col gap-2">
                              {sub.items?.map((item, k) => (
                                <li key={k}>{item}</li>
                              ))}
                            </ul>
                          );
                        }
                        if (sub.type === 'ol') {
                          return (
                            <ol key={j} className="list-decimal pl-6 text-xs md:text-sm text-muted font-light leading-relaxed font-manrope mb-4 flex flex-col gap-2">
                              {sub.items?.map((item, k) => (
                                <li key={k}>{item}</li>
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
                    <div key={i} className="w-full overflow-x-auto rounded-2xl border border-border bg-card mb-6 shadow-sm">
                      <table className="w-full text-left text-xs border-collapse">
                        {block.headers && block.headers.length > 0 && (
                          <thead>
                            <tr className="bg-subtle-bg border-b border-border/80">
                              {block.headers.map((header, j) => (
                                <th key={j} className="p-3.5 text-xs font-bold font-sora text-heading tracking-wide">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                        )}
                        {block.rows && block.rows.length > 0 && (
                          <tbody className="divide-y divide-border/40">
                            {block.rows.map((row, j) => (
                              <tr key={j}>
                                {row.map((cell, k) => (
                                  <td key={k} className="p-3.5 text-xs text-muted font-manrope font-light">
                                    {cell}
                                  </td>
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
              <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-border/40 mt-12">
                <span className={`text-[9px] font-bold font-sora uppercase tracking-wider px-2.5 py-1 rounded-full border ${tagStyle}`}>
                  {post.tag}
                </span>
                
                <div className="flex gap-2">
                  {['Share on X', 'LinkedIn', 'Copy Link'].map((label) => (
                    <button
                      key={label}
                      className="px-3.5 py-1.5 rounded-full border border-border bg-card text-[10px] font-semibold text-muted hover:text-accent hover:border-accent/40 transition-colors cursor-pointer"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── AUTHOR BIO CARD ── */}
              <div className="flex gap-5 items-start p-6 md:p-8 rounded-3xl border border-border bg-card shadow-xl backdrop-blur-sm mt-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-accent/5 blur-xl pointer-events-none" />
                <div className="w-12 h-12 rounded-full bg-subtle-bg border border-border flex items-center justify-center font-sora font-bold text-sm text-accent shrink-0">
                  {post.author.initials}
                </div>
                <div>
                  <span className="text-[8px] font-bold font-sora text-accent uppercase tracking-widest block mb-1">
                    WRITTEN BY
                  </span>
                  <h4 className="text-sm font-bold font-sora text-heading leading-tight mb-2">
                    {post.author.name}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed font-light font-manrope">
                    {post.author.role} at NexCore. Specialises in production-grade React architectures, serverless DevOps, and multi-region microservice deployments.
                  </p>
                </div>
              </div>
            </article>

            {/* ── SIDEBAR ── */}
            <ArticleSidebar post={post as unknown as Post} related={[]} />
          </div>
        </section>

        {/* RELATED BACK BTN */}
        <section className="py-12 px-6 md:px-12 bg-navy border-t border-border">
          <div className="max-w-7xl mx-auto flex justify-center">
            <Link
              href="/blog"
              className="flex items-center gap-2 px-6 py-3 rounded-full font-sora font-semibold text-xs text-heading border border-border bg-subtle-bg hover:bg-border/20 transition-all"
            >
              ← Back to insights
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
