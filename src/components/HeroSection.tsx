'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, LineChart, Cpu, ShieldCheck, Zap } from 'lucide-react';

const mockClients = [
  { name: 'Vercel', url: '#' },
  { name: 'Stripe', url: '#' },
  { name: 'Supabase', url: '#' },
  { name: 'AWS', url: '#' },
  { name: 'HubSpot', url: '#' },
  { name: 'Linear', url: '#' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center pt-32 pb-16 px-6 md:px-12 bg-navy overflow-hidden">
      
      {/* Background Gradients & Glow Spots */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Glow 1 */}
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-accent/15 blur-[120px] dark:bg-accent/10" />
        {/* Glow 2 */}
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-accent2/15 blur-[160px] dark:bg-accent2/10" />
        {/* Modern Dot Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(6,182,212,0.06)_1px,transparent_1px)] [background-size:32px_32px] dark:bg-[radial-gradient(rgba(6,182,212,0.04)_1px,transparent_1px)]" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center z-10 w-full">
        
        {/* Left Column: Heading, Value Prop, Actions, Stats */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-fit flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/8 border border-accent/20 dark:bg-accent/5"
          >
            <Sparkles size={13} className="text-accent animate-pulse" />
            <span className="text-xs font-semibold font-sora text-accent tracking-wide uppercase">
              Next-Gen IT &amp; Performance Marketing
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-sora tracking-tight leading-[1.1] text-heading"
          >
            Transform Your Business with{' '}
            <span className="bg-gradient-to-r from-accent via-accent2 to-accent3 bg-clip-text text-transparent">
              Digital Innovation
            </span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-muted font-manrope font-light leading-relaxed max-w-xl"
          >
            NexCore merges premium software engineering with performance marketing to scale your enterprise, drive rapid customer acquisition, and secure cloud operations globally.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mt-2"
          >
            <Link
              href="/contact"
              className="flex items-center gap-2 px-8 py-3.5 rounded-full font-sora font-semibold text-xs text-navy bg-accent hover:opacity-90 shadow-lg shadow-accent/20 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              Book a Free Audit <ArrowRight size={14} />
            </Link>
            <Link
              href="/services"
              className="flex items-center gap-2 px-8 py-3.5 rounded-full font-sora font-semibold text-xs text-heading border border-border bg-subtle-bg hover:bg-border/20 transition-all duration-300 cursor-pointer"
            >
              Explore Services
            </Link>
          </motion.div>

          {/* Quick Metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-6 pt-10 mt-6 border-t border-border"
          >
            {[
              { num: '500+', label: 'Projects Delivered' },
              { num: '14 Years', label: 'Agency Experience' },
              { num: '98%', label: 'Client Retention' },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <span className="text-xl md:text-2xl font-extrabold font-sora text-heading bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
                  {stat.num}
                </span>
                <span className="text-xs text-muted font-manrope">{stat.label}</span>
              </div>
            ))}
          </motion.div>

        </div>

        {/* Right Column: Premium Interactive Floating Dashboard */}
        <div className="lg:col-span-5 relative w-full flex items-center justify-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-[460px] aspect-[4/3] rounded-3xl border border-border bg-card shadow-2xl overflow-hidden backdrop-blur-md p-6"
          >
            {/* Visual Header / Mockup Nav */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
                <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                <span className="w-3 h-3 rounded-full bg-[#10b981]" />
              </div>
              <span className="text-[10px] text-muted tracking-wider font-semibold font-sora">NEXCORE ENGINE v2.8</span>
            </div>

            {/* Mockup Content Grid */}
            <div className="grid grid-cols-12 gap-4 mt-5 h-[calc(100%-48px)]">
              
              {/* Traffic Wave Card (8 cols) */}
              <div className="col-span-8 bg-subtle-bg border border-border rounded-2xl p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-heading">Acquisition Traffic</span>
                  <span className="text-[10px] text-accent font-bold font-sora">+312% Growth</span>
                </div>
                {/* SVG Curve chart */}
                <div className="h-16 w-full mt-2 relative">
                  <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="gradientCurve" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 25 C10 22, 20 10, 30 18 C40 26, 50 8, 60 12 C70 16, 80 4, 90 2 C95 1, 100 0, 100 0 L100 30 L0 30 Z"
                      fill="url(#gradientCurve)"
                    />
                    <path
                      d="M0 25 C10 22, 20 10, 30 18 C40 26, 50 8, 60 12 C70 16, 80 4, 90 2 C95 1, 100 0, 100 0"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="flex justify-between items-center text-[9px] text-muted pt-2 border-t border-border/40">
                  <span>Q1 Campaigns</span>
                  <span>42.8k users/mo</span>
                </div>
              </div>

              {/* Status Indicator Pill (4 cols) */}
              <div className="col-span-4 bg-subtle-bg border border-border rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-accent3/10 flex items-center justify-center text-accent3">
                  <ShieldCheck size={18} />
                </div>
                <span className="text-[10px] font-semibold text-heading">System Security</span>
                <span className="text-xs font-bold text-accent3">Active / Secure</span>
              </div>

              {/* Server Speed Bar (4 cols) */}
              <div className="col-span-4 bg-subtle-bg border border-border rounded-2xl p-4 flex flex-col justify-between">
                <span className="text-[9px] font-semibold text-muted uppercase">Latency</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-heading font-sora">12</span>
                  <span className="text-[9px] text-muted font-light">ms</span>
                </div>
                <div className="w-full bg-border rounded-full h-1.5">
                  <div className="bg-accent2 h-1.5 rounded-full w-[85%]" />
                </div>
              </div>

              {/* Code Deploy Status (8 cols) */}
              <div className="col-span-8 bg-subtle-bg border border-border rounded-2xl p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-accent2/10 flex items-center justify-center text-accent2 shrink-0">
                  <Cpu size={16} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold text-heading">Automated DevOps Pipeline</span>
                  <span className="text-[10px] text-muted">99.98% Deploy Success Rate</span>
                </div>
              </div>

            </div>

            {/* Absolute Decorative Floating Elements */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 bg-navy2/90 border border-border px-4 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-xl backdrop-blur-md"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
              <span className="text-[10px] font-bold font-sora text-heading tracking-wide">LEADS: +240%</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-4 -left-6 bg-navy2/90 border border-border px-4 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-xl backdrop-blur-md"
            >
              <Zap size={12} className="text-accent3" />
              <span className="text-[10px] font-bold font-sora text-heading tracking-wide">ROI: 8.4x GAIN</span>
            </motion.div>

          </motion.div>

        </div>

      </div>

      {/* Trust Client Logos Bar */}
      <div className="absolute bottom-6 left-0 right-0 z-10 w-full px-6 md:px-12 pointer-events-none">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
          <p className="text-[9px] font-semibold text-muted uppercase tracking-[0.15em]">
            Trust badges from fast-growing global giants
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 opacity-30 select-none">
            {mockClients.map((client, idx) => (
              <span key={idx} className="text-sm font-extrabold font-sora tracking-wide text-heading">
                {client.name}
              </span>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
