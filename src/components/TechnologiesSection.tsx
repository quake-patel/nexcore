'use client';

import { motion } from 'framer-motion';
import { 
  Laptop, 
  Database, 
  BarChart3, 
  ShoppingBag, 
  CheckCircle2 
} from 'lucide-react';

const techGroups = [
  {
    category: 'Frontend & Apps',
    desc: 'Powering immersive user interfaces and lightweight apps.',
    icon: Laptop,
    techs: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'React Native'],
    color: 'from-cyan-500/20 to-blue-500/5'
  },
  {
    category: 'Cloud & Database',
    desc: 'Ensuring 99.99% system availability and secure workflows.',
    icon: Database,
    techs: ['Node.js', 'AWS', 'Firebase', 'PostgreSQL', 'Docker'],
    color: 'from-violet-500/20 to-fuchsia-500/5'
  },
  {
    category: 'Acquisition Analytics',
    desc: 'Measuring campaign pipelines and acquisition attribution.',
    icon: BarChart3,
    techs: ['Google Analytics', 'Meta Ads', 'Google Tag Manager', 'Mixpanel'],
    color: 'from-emerald-500/20 to-teal-500/5'
  },
  {
    category: 'CMS & Headless Commerce',
    desc: 'Creating lightning-fast custom headless catalog checkouts.',
    icon: ShoppingBag,
    techs: ['Shopify Plus', 'WordPress', 'Strapi Headless', 'WooCommerce'],
    color: 'from-pink-500/20 to-rose-500/5'
  }
];

export default function TechnologiesSection() {
  return (
    <section id="technologies" className="bg-navy py-24 px-6 md:px-12 relative overflow-hidden font-manrope">
      
      {/* Glow shapes */}
      <div className="absolute top-[40%] right-0 w-[420px] h-[420px] bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <span className="text-xs font-semibold font-sora text-accent tracking-widest uppercase">
              Technology Stack
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-sora text-heading tracking-tight leading-tight mt-3">
              Standardized on Enterprise Capabilities
            </h2>
          </div>
          <p className="text-sm text-muted max-w-sm leading-relaxed font-light font-manrope">
            We avoid outdated builders. NexCore utilizes production-tested engineering stacks and high-attribution marketing scripts.
          </p>
        </div>

        {/* Tech Stack Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techGroups.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group p-8 rounded-3xl border border-border bg-card shadow-xl hover:border-accent/30 hover:shadow-accent/5 transition-all duration-300 backdrop-blur-sm flex flex-col md:flex-row gap-6 items-start"
            >
              {/* Category Icon */}
              <div className="w-12 h-12 rounded-xl bg-subtle-bg border border-border flex items-center justify-center text-accent shrink-0 group-hover:scale-105 transition-transform duration-300">
                <group.icon size={22} className="stroke-[1.5]" />
              </div>

              {/* Group details */}
              <div className="flex-1">
                <h3 className="text-base font-bold font-sora text-heading mb-1.5 group-hover:text-accent transition-colors">
                  {group.category}
                </h3>
                <p className="text-xs text-muted font-light leading-relaxed mb-6 font-manrope">
                  {group.desc}
                </p>

                {/* Tech Pills Grid */}
                <div className="flex flex-wrap gap-2">
                  {group.techs.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-subtle-bg border border-border/80 text-xs text-muted hover:text-accent hover:border-accent/40 transition-colors"
                    >
                      <CheckCircle2 size={11} className="text-accent" />
                      <span className="font-semibold font-manrope tracking-tight">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
