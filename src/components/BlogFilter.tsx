'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Star, Inbox, ArrowRight } from 'lucide-react';
import { posts as staticPosts } from '@/lib/posts';
import { getLocalPosts, isLive } from '@/lib/localPosts';
import type { Post } from '@/lib/posts';

const ALL = 'All';

const getTagClass = (tag: string) => {
  const normalized = tag.toLowerCase().replace(/ & /g, '-').replace(/[^a-z0-9-]/g, '');
  return `tag-badge tag-${normalized}`;
};

export default function BlogFilter() {
  const [activeTag, setActiveTag] = useState(ALL);
  const [allPosts, setAllPosts] = useState<Post[]>(staticPosts);
  const [email, setEmail] = useState('');

  // Merge localStorage custom posts on the client
  useEffect(() => {
    const custom = getLocalPosts().filter(isLive);
    if (custom.length > 0) {
      const existingSlugs = new Set(custom.map(p => p.slug));
      const uniqueStatic = staticPosts.filter(p => !existingSlugs.has(p.slug));
      setAllPosts([...custom, ...uniqueStatic]);
    }
  }, []);

  const tags = [ALL, ...Array.from(new Set(allPosts.map((p) => p.tag)))];
  const filtered = activeTag === ALL ? allPosts : allPosts.filter((p) => p.tag === activeTag);
  const [featured, ...rest] = filtered;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    alert(`Thank you for subscribing, ${email}!`);
    setEmail('');
  };

  return (
    <>
      {/* ── CATEGORY FILTER BAR ── */}
      <div className="flex flex-wrap justify-center items-center gap-2 mb-12" role="tablist" aria-label="Filter by category">
        {tags.map((tag) => {
          const isActive = activeTag === tag;
          return (
            <button
              key={tag}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-full text-xs font-semibold font-sora border transition-all cursor-pointer ${
                isActive
                  ? 'bg-accent text-navy border-accent'
                  : 'bg-card border-border text-muted hover:text-heading hover:border-accent/40'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* ── FEATURED POST ── */}
      <AnimatePresence mode="wait">
        {featured && (
          <motion.div
            key={`featured-${featured.slug}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="mb-12"
          >
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8 rounded-3xl border border-border bg-card shadow-2xl overflow-hidden backdrop-blur-sm hover:border-accent/30 hover:shadow-accent/5 transition-all duration-300"
            >
              {/* Image Col (5 cols) */}
              <div className="lg:col-span-6 h-64 md:h-80 w-full rounded-2xl overflow-hidden relative border border-border/40 shrink-0">
                {featured.thumbnailUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={featured.thumbnailUrl}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${featured.imgCls || 'from-cyan-500/20 to-blue-500/10'} flex items-center justify-center text-6xl group-hover:scale-102 transition-transform duration-500`}>
                    {featured.emoji}
                  </div>
                )}
                {/* Featured Badge */}
                {activeTag === ALL && (
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-1 px-3 py-1.5 rounded-full bg-navy2/90 border border-border/80 text-[9px] font-bold font-sora text-accent tracking-wider uppercase shadow-lg">
                    <Star size={9} className="fill-accent text-accent" />
                    Featured
                  </div>
                )}
              </div>

              {/* Content Col (7 cols) */}
              <div className="lg:col-span-6 flex flex-col justify-between py-2">
                <div>
                  <span className={getTagClass(featured.tag)}>
                    {featured.tag}
                  </span>
                  
                  <h2 className="text-xl md:text-2xl font-extrabold font-sora text-heading leading-tight mt-4 tracking-tight group-hover:text-accent transition-colors duration-200">
                    {featured.title}
                  </h2>
                  
                  <p className="text-xs md:text-sm text-muted leading-relaxed font-light mt-4 font-manrope">
                    {featured.excerpt}
                  </p>
                </div>

                {/* Author & Meta */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border/40 mt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-subtle-bg border border-border flex items-center justify-center font-sora font-bold text-xs text-accent">
                      {featured.author.initials}
                    </div>
                    <div>
                      <div className="text-xs font-bold font-sora text-heading">{featured.author.name}</div>
                      <div className="text-[10px] text-muted font-manrope">{featured.author.role}</div>
                    </div>
                  </div>

                  <div className="flex gap-4 text-[10px] text-muted font-manrope">
                    <span className="flex items-center gap-1"><Calendar size={11} className="text-accent" />{featured.date}</span>
                    <span className="flex items-center gap-1"><Clock size={11} className="text-accent" />{featured.read}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── POST GRID ── */}
      <AnimatePresence mode="popLayout">
        {rest.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          >
            {rest.map((post) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group rounded-3xl border border-border bg-card shadow-xl overflow-hidden backdrop-blur-sm flex flex-col justify-between h-[450px] hover:border-accent/30 hover:shadow-accent/5 transition-all duration-300"
              >
                
                {/* Image */}
                <Link href={`/blog/${post.slug}`} className="h-48 w-full overflow-hidden relative block border-b border-border/60">
                  {post.thumbnailUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.thumbnailUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${post.imgCls || 'from-cyan-500/20 to-blue-500/10'} flex items-center justify-center text-4xl group-hover:scale-102 transition-transform duration-500`}>
                      {post.emoji}
                    </div>
                  )}
                  <div className={`absolute top-4 left-4 z-10 shadow-lg ${getTagClass(post.tag)}`}>
                    {post.tag}
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-sm md:text-base font-bold font-sora text-heading leading-snug line-clamp-2 tracking-tight group-hover:text-accent transition-colors duration-200">
                      <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-muted leading-relaxed font-light mt-3 line-clamp-3 font-manrope">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Metadata Row */}
                  <div className="pt-4 border-t border-border/40 mt-4 flex items-center justify-between text-[10px] text-muted font-manrope">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-subtle-bg border border-border flex items-center justify-center text-[8px] font-bold font-sora text-accent">
                        {post.author.initials}
                      </div>
                      <span className="font-semibold text-heading">{post.author.name}</span>
                    </div>

                    <div className="flex gap-2">
                      <span className="flex items-center gap-0.5"><Calendar size={9} className="text-accent" />{post.date}</span>
                      <span className="flex items-center gap-0.5"><Clock size={9} className="text-accent" />{post.read}</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── EMPTY STATE ── */}
      {filtered.length === 0 && (
        <div className="text-center py-20 px-6 rounded-3xl border border-border bg-card shadow-inner flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-subtle-bg border border-border flex items-center justify-center text-muted">
            <Inbox size={20} />
          </div>
          <h3 className="text-sm font-bold font-sora text-heading">No insights in this category</h3>
          <p className="text-xs text-muted max-w-xs font-light font-manrope">
            We are writing tech articles for this stack. Please choose another tab or check back later!
          </p>
        </div>
      )}

      {/* ── NEWSLETTER CTA ── */}
      <div className="relative rounded-3xl p-10 md:p-12 border border-border/80 bg-gradient-to-br from-navy2/90 to-navy/95 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 mt-20 font-manrope overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none bg-accent2/[0.02] blur-md" />
        
        <div className="flex-1 max-w-xl text-left z-10">
          <span className="text-[9px] font-bold font-sora text-accent tracking-widest uppercase">
            Stay Sharp
          </span>
          <h3 className="text-xl md:text-2xl font-extrabold font-sora text-heading tracking-tight leading-tight mt-2">
            Get our tech insights in your inbox
          </h3>
          <p className="text-xs text-muted mt-2 font-light leading-relaxed">
            No spam. Just the best enterprise software architecture and ROI-marketing reviews once a month.
          </p>
        </div>

        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md w-full shrink-0 z-10">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your work email"
            className="w-full px-4 py-3 rounded-xl text-xs bg-subtle-bg border border-border text-heading outline-none focus:border-accent/40 font-manrope placeholder-muted"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl text-xs font-semibold font-sora text-navy bg-accent hover:opacity-90 shadow-lg shadow-accent/15 flex items-center justify-center gap-1.5 transition-all shrink-0 cursor-pointer"
          >
            Subscribe <ArrowRight size={12} />
          </button>
        </form>
      </div>
    </>
  );
}
