'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Users, Target, Rocket } from 'lucide-react';

const stats = [
  { value: '500+', label: 'Digital Products Built', desc: 'SaaS, Apps & Web Platforms', icon: Rocket, accent: true },
  { value: '120+', label: 'Elite Software Engineers', desc: 'Full-stack & DevOps leaders', icon: Users, accent: false },
  { value: '40+', label: 'Countries Served Globally', desc: 'US, UK, Europe, & APAC', icon: Target, accent: false },
  { value: '14+', label: 'Years Active Agency', desc: 'Delivering ROI-focused growth', icon: ShieldCheck, accent: true },
];

const features = [
  {
    title: 'Mission-Driven Digital Engineering',
    desc: 'We write robust, secure, production-grade code that resolves real business friction and scales smoothly from day one — no technical debt.',
  },
  {
    title: 'Performance Marketing Converged',
    desc: 'Unlike traditional software consultancies, we integrate marketing intelligence directly into our apps to accelerate lead acquisition and conversion.',
  },
  {
    title: 'Global Delivery, Local Compliance',
    desc: 'With offices in GIFT City India, Canary Wharf London, and Austin Texas, we operate a 24/7 lifecycle with full data governance.',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 px-6 md:px-12 bg-navy border-t border-border overflow-hidden font-manrope">
      
      {/* Decorative background glow */}
      <div className="absolute bottom-[10%] left-0 w-[400px] h-[400px] rounded-full bg-accent2/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Glassmorphic Stats Counters Grid (5 cols) */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-5 rounded-2xl border flex flex-col justify-between h-[180px] backdrop-blur-sm transition-all duration-300 hover:border-accent/20 ${
                stat.accent 
                  ? 'border-accent/15 bg-accent/[0.02]' 
                  : 'border-border bg-card'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className={`p-2.5 rounded-lg bg-subtle-bg border border-border flex items-center justify-center text-accent`}>
                  <stat.icon size={16} />
                </div>
              </div>
              <div>
                <div className="text-2xl font-extrabold font-sora text-heading bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-heading mt-1.5 font-sora tracking-tight leading-tight">
                  {stat.label}
                </div>
                <div className="text-[10px] text-muted mt-0.5 leading-snug">
                  {stat.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Column: Dynamic Core Value Narrative (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          <div>
            <span className="text-xs font-semibold font-sora text-accent tracking-widest uppercase">
              Who We Are
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-sora text-heading tracking-tight leading-tight mt-3">
              We build custom digital platforms that accelerate growth
            </h2>
          </div>

          <p className="text-sm text-muted leading-relaxed font-light">
            Founded with the belief that technology should directly amplify a company&apos;s commercial capabilities, NexCore has grown into a premier international engineering and marketing partner for fast-scaling enterprise SaaS and consumer brands.
          </p>

          <div className="flex flex-col gap-6 mt-2">
            {features.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="flex gap-4 items-start"
              >
                {/* Glowing Bullet */}
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0 animate-pulse shadow-glow shadow-accent" />
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-bold font-sora text-heading leading-tight">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed font-light font-manrope max-w-xl">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
