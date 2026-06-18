'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Laptop, 
  Smartphone, 
  Search, 
  Share2, 
  Target, 
  Palette, 
  Workflow, 
  Cloud,
  ArrowUpRight
} from 'lucide-react';

const services = [
  {
    title: 'Web Engineering',
    desc: 'High-performance Next.js & React architectures, secure custom headless commerce, API ecosystems, and modern serverless platforms.',
    icon: Laptop,
    badge: 'Core',
    color: 'from-accent to-accent2'
  },
  {
    title: 'App Engineering',
    desc: 'Immersive cross-platform native iOS & Android applications built with React Native and Flutter, designed to scale with millions of users.',
    icon: Smartphone,
    badge: 'Mobile',
    color: 'from-accent2 to-accent3'
  },
  {
    title: 'SEO & Growth Engine',
    desc: 'Rigorous organic technical SEO audit, high-impact content clustering, speed optimization, and semantic search authority architectures.',
    icon: Search,
    badge: 'ROI',
    color: 'from-accent3 to-accent'
  },
  {
    title: 'Performance Marketing',
    desc: 'Data-driven Google Search, Display, and Video campaigns engineered to scale business pipeline, lower acquisition costs, and maximize ROI.',
    icon: Target,
    badge: 'Growth',
    color: 'from-accent to-accent3'
  },
  {
    title: 'Social & Brand Engagement',
    desc: 'Creative social media campaign strategies, influencer management, highly aesthetic graphic asset production, and community scaling.',
    icon: Share2,
    badge: 'Brand',
    color: 'from-accent2 to-accent'
  },
  {
    title: 'Branding & UI/UX Design',
    desc: 'Sleek design assets, interactive prototypes, high-fidelity mockups, enterprise design system definitions, and beautiful typography choices.',
    icon: Palette,
    badge: 'Creative',
    color: 'from-accent3 to-accent2'
  },
  {
    title: 'AI & Automation Solutions',
    desc: 'AI agents, LLM tool chains, workflows automation, data intelligence scrapers, and predictive machine learning models for corporate process scaling.',
    icon: Workflow,
    badge: 'Future',
    color: 'from-accent to-accent2'
  },
  {
    title: 'Cloud & IT Consulting',
    desc: 'AWS & Azure deployments, multi-region auto-scaling setups, Kubernetes orchestrations, strict cybersecurity audits, and 24/7 DevOps support.',
    icon: Cloud,
    badge: 'Infra',
    color: 'from-accent2 to-accent3'
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function ServicesSection() {
  return (
    <section id="services" className="bg-navy py-24 px-6 md:px-12 relative overflow-hidden font-manrope">
      
      {/* Background shape */}
      <div className="absolute top-[40%] right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <span className="text-xs font-semibold font-sora text-accent tracking-widest uppercase">
              Core Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-sora text-heading tracking-tight leading-tight mt-3">
              Premium Solutions for High-Velocity Enterprises
            </h2>
          </div>
          <p className="text-sm text-muted max-w-sm leading-relaxed font-light">
            We operate at the convergence of advanced digital engineering and aggressive performance marketing to fuel sustainable enterprise expansion.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants as any}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((svc, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants as any}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col justify-between h-[340px] p-6 rounded-2xl border border-border bg-card shadow-lg hover:shadow-accent/5 hover:border-accent/30 transition-all duration-300 backdrop-blur-sm overflow-hidden"
            >
              {/* Corner Glow Overlay on Hover */}
              <div className={`absolute -right-16 -top-16 w-32 h-32 rounded-full bg-gradient-to-br ${svc.color} opacity-0 group-hover:opacity-10 blur-xl transition-all duration-300`} />
              
              <div>
                {/* Top Badge & Icon Row */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-subtle-bg border border-border flex items-center justify-center text-accent group-hover:text-heading group-hover:bg-gradient-to-r group-hover:${svc.color} group-hover:border-transparent transition-all duration-300 shadow-inner`}>
                    <svc.icon size={22} className="stroke-[1.5]" />
                  </div>
                  <span className="text-[10px] font-semibold font-sora uppercase tracking-wider text-muted px-2 py-0.5 rounded-full bg-subtle-bg border border-border/60">
                    {svc.badge}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-base font-bold font-sora text-heading mb-3 group-hover:text-accent transition-colors duration-200">
                  {svc.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed font-light font-manrope">
                  {svc.desc}
                </p>
              </div>

              {/* Action Trigger */}
              <div className="pt-4 border-t border-border/40 mt-4 flex items-center justify-between text-[11px] font-semibold text-accent group-hover:text-heading transition-colors">
                <Link href="/contact" className="flex items-center gap-1.5 hover:underline">
                  Configure Project
                </Link>
                <ArrowUpRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
