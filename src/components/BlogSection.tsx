'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { getLocalPosts, isLive } from '@/lib/localPosts';

const staticPosts = [
  {
    emoji: '☁️',
    cls: 'from-cyan-500/25 to-blue-500/20',
    tag: 'Cloud & Infrastructure',
    title: 'Why multi-cloud is no longer optional for enterprise in 2026',
    desc: 'Vendor lock-in risk, multi-region resilience requirements, and cost optimisation have converged to make multi-cloud strategy a board-level conversation.',
    date: 'May 8, 2026',
    read: '6 min read',
    slug: 'multi-cloud-enterprise-2025',
  },
  {
    emoji: '🤖',
    cls: 'from-violet-500/25 to-fuchsia-500/20',
    tag: 'AI & Automation',
    title: 'Integrating LLMs into your existing product — a practical guide',
    desc: 'Lessons from 20+ enterprise AI integrations: what works, what fails, and how to build AI agent features that your users will actually trust and use.',
    date: 'Apr 21, 2026',
    read: '9 min read',
    slug: 'llm-integration-guide',
  },
  {
    emoji: '🔐',
    cls: 'from-pink-500/25 to-rose-500/20',
    tag: 'Cybersecurity',
    title: 'Zero-trust architecture: beyond the marketing buzzword',
    desc: 'A clear technical breakdown of how zero-trust actually works in practice, and what a real implementation looks like for a mid-sized engineering team.',
    date: 'Apr 2, 2026',
    read: '7 min read',
    slug: 'zero-trust-architecture',
  },
];

export default function BlogSection() {
  const [posts, setPosts] = useState<any[]>(staticPosts);

  useEffect(() => {
    const custom = getLocalPosts().filter(isLive);
    if (custom.length > 0) {
      const existingSlugs = new Set(custom.map(p => p.slug));
      const uniqueStatic = staticPosts.filter(p => !existingSlugs.has(p.slug));
      setPosts([...custom, ...uniqueStatic].slice(0, 3));
    }
  }, []);

  return (
    <section id="blog" className="bg-navy2 py-24 px-6 md:px-12 relative overflow-hidden font-manrope">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <span className="text-xs font-semibold font-sora text-accent tracking-widest uppercase">
              Insights &amp; Trends
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-sora text-heading tracking-tight leading-tight mt-3">
              Perspective from Our Builders
            </h2>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-1.5 text-xs font-semibold font-sora text-accent hover:underline shrink-0"
          >
            View All Articles <ArrowRight size={13} />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => {
            const isCustom = 'thumbnailUrl' in post;
            const thumbnailUrl = isCustom ? (post as any).thumbnailUrl : undefined;
            const bgClass = (post as any).cls || 'from-cyan-500/20 to-blue-500/10';

            return (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-3xl border border-border bg-card shadow-xl overflow-hidden backdrop-blur-sm flex flex-col justify-between h-[440px] hover:border-accent/30 hover:shadow-accent/5 transition-all duration-300"
              >
                
                {/* Blog Image */}
                <Link href={`/blog/${post.slug}`} className="h-48 w-full overflow-hidden relative block border-b border-border/60">
                  {thumbnailUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumbnailUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${bgClass} flex items-center justify-center text-4xl group-hover:scale-103 transition-transform duration-500`}>
                      {post.emoji}
                    </div>
                  )}
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 z-10 text-[9px] font-bold font-sora text-accent uppercase tracking-wider bg-navy2/90 border border-border/80 px-3 py-1.5 rounded-full shadow-lg">
                    {post.tag}
                  </div>
                </Link>

                {/* Blog Content */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-sm md:text-base font-bold font-sora text-heading leading-snug line-clamp-2 tracking-tight group-hover:text-accent transition-colors duration-200">
                      <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-muted leading-relaxed font-light mt-3 line-clamp-3 font-manrope">
                      {(post as any).desc || (post as any).excerpt}
                    </p>
                  </div>

                  {/* Metadata Row */}
                  <div className="pt-4 border-t border-border/40 mt-4 flex items-center justify-between text-[10px] text-muted font-manrope">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} className="text-accent" />
                      {post.date || new Date((post as any).createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} className="text-accent" />
                      {post.read || '5 min read'}
                    </span>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
