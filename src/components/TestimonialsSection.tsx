'use client';

import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const testimonials = [
  {
    initials: 'RK',
    name: 'Rohan Kapoor',
    role: 'CTO, ShopBridge Commerce',
    quote: 'NexCore completely rebuilt our headless e-commerce storefront. Our page speed score jumped from 42 to 96, and customer checkout rates surged by 38% in the first month. The codebase is incredibly clean and modular.',
    rating: 5,
    tag: 'Web Dev & Speed'
  },
  {
    initials: 'AS',
    name: 'Anita Shah',
    role: 'VP Engineering, FinEdge India',
    quote: 'Their combined cloud engineering and technical SEO strategy cut our AWS infrastructure spend by 35% while multiplying our search organic lead pipeline by 4.2x. A world-class technical partner.',
    rating: 5,
    tag: 'Cloud & Growth'
  },
  {
    initials: 'MP',
    name: 'Marcus Petit',
    role: 'CEO, Logiflo SaaS',
    quote: 'We contracted NexCores marketing team to scale our European B2B customer acquisition. The team set up high-precision Google and Meta campaigns that slashed our Cost-Per-Acquisition by 45% in 60 days.',
    rating: 5,
    tag: 'Performance Ads'
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-navy py-24 px-6 md:px-12 relative overflow-hidden font-manrope">
      
      {/* Decorative Gradient Backgrounds */}
      <div className="absolute top-[40%] left-[10%] w-[380px] h-[380px] bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <span className="text-xs font-semibold font-sora text-accent tracking-widest uppercase">
            Client Voices
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-sora text-heading tracking-tight leading-tight mt-3">
            What Our Partners Say
          </h2>
          <p className="text-sm text-muted mt-4 leading-relaxed font-light font-manrope">
            We partner with leading tech startups and global firms to deliver exceptional technological capability and massive user growth.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative p-8 rounded-3xl border border-border bg-card shadow-xl hover:border-accent/30 hover:shadow-accent/5 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between group"
            >
              
              {/* Quote Mark */}
              <Quote className="absolute top-6 right-6 text-border group-hover:text-accent/20 transition-colors w-8 h-8 stroke-[1.2]" />

              <div>
                {/* Review Header: Stars & Tag */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={13} className="fill-accent text-accent" />
                    ))}
                  </div>
                  <span className="text-[9px] font-bold font-sora text-accent uppercase tracking-wider bg-accent/5 px-2 py-0.5 rounded-full border border-accent/20">
                    {t.tag}
                  </span>
                </div>

                {/* Quote Content */}
                <blockquote className="text-xs md:text-sm text-muted leading-relaxed font-light mb-8 italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>

              {/* Author Block */}
              <div className="flex items-center gap-4 pt-4 border-t border-border/40">
                <div className="w-10 h-10 rounded-full bg-subtle-bg border border-border flex items-center justify-center font-sora font-bold text-xs text-accent">
                  {t.initials}
                </div>
                <div>
                  <div className="text-xs font-bold font-sora text-heading flex items-center gap-1.5">
                    {t.name}
                    <CheckCircle2 size={12} className="text-accent3 fill-accent3/10" />
                  </div>
                  <div className="text-[10px] text-muted font-manrope mt-0.5">
                    {t.role}
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
