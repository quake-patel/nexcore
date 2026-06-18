'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

const categories = ['All', 'Web Engineering', 'App Engineering', 'Performance Marketing', 'Cloud & AI'];

const projects = [
  {
    title: 'Acme Pay - Global Fintech Portal',
    category: 'Web Engineering',
    metrics: '+$42M Volume',
    desc: 'Engineered a highly secure, React-based global merchant dashboard with custom chart analytics and real-time transaction processing.',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'SaaSFlow - B2B Acquisition',
    category: 'Performance Marketing',
    metrics: '+340% Conversion',
    desc: 'Formulated a comprehensive Google Ads funnel, high-performance SEO landing pages, and automated retargeting that cut acquisition costs by 45%.',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    color: 'from-violet-500 to-fuchsia-600',
  },
  {
    title: 'CarePulse - Telehealth Mobile App',
    category: 'App Engineering',
    metrics: '4.9★ Rating',
    desc: 'Designed and developed a cross-platform React Native mobile application for instant virtual consultations and prescription management.',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'CloudSec - Kubernetes Auto-Scaler',
    category: 'Cloud & AI',
    metrics: '99.999% Uptime',
    desc: 'Architected an automated multi-region AWS infrastructure with smart Kubernetes clusters and AI-driven load-balancing policies.',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    color: 'from-amber-500 to-orange-600',
  },
  {
    title: 'ApexShop - Headless E-Commerce',
    category: 'Web Engineering',
    metrics: '1.2s Load Speed',
    desc: 'Rebuilt a Legacy Retailer storefront using Next.js, Tailwind CSS, and a serverless API, accelerating checkout rates by 38%.',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'CognitiveBot - Enterprise AI Agent',
    category: 'Cloud & AI',
    metrics: '82% Automation',
    desc: 'Implemented an LLM customer service automation pipeline linked with internal databases, processing 10,000+ tickets daily.',
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
    color: 'from-pink-500 to-rose-600',
  },
];

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredProjects = activeTab === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <section id="portfolio" className="relative py-24 px-6 md:px-12 bg-navy2 border-t border-border overflow-hidden font-manrope">
      
      {/* Background shape */}
      <div className="absolute top-[30%] left-[5%] w-[450px] h-[450px] rounded-full bg-accent/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col items-center">
          <span className="text-xs font-semibold font-sora text-accent tracking-widest uppercase">
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-sora text-heading tracking-tight leading-tight mt-3">
            Case Studies That Prove Performance
          </h2>
          <p className="text-sm text-muted mt-4 leading-relaxed font-light font-manrope">
            We don&apos;t just deliver assets — we engineer commercial results. Explore our latest custom engineering and digital acquisition case studies.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-16 max-w-4xl mx-auto">
          {categories.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-semibold font-sora transition-colors cursor-pointer border ${
                  isActive 
                    ? 'border-accent text-navy bg-accent' 
                    : 'border-border text-muted bg-card hover:text-heading hover:border-accent/40'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Portfolio Showcase Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="group relative flex flex-col justify-between h-[420px] rounded-3xl border border-border bg-card shadow-xl overflow-hidden backdrop-blur-sm"
              >
                {/* Visual Image Area */}
                <div className="h-48 w-full overflow-hidden relative border-b border-border/60">
                  {/* Subtle Color Mask */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} mix-blend-multiply opacity-25 group-hover:opacity-40 transition-opacity duration-300 z-10`} />
                  
                  {/* Actual Mock Image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  
                  {/* Floating Metric Pill */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-navy2/90 border border-border/80 shadow-lg text-[10px] font-bold font-sora text-heading">
                    <TrendingUp size={11} className="text-accent" />
                    {project.metrics}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[9px] font-bold font-sora text-accent uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-base font-bold font-sora text-heading tracking-tight leading-tight mt-1.5 group-hover:text-accent transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed font-light mt-3 line-clamp-3 font-manrope">
                      {project.desc}
                    </p>
                  </div>

                  {/* Read More Trigger */}
                  <div className="pt-4 border-t border-border/40 mt-4 flex items-center justify-between text-[11px] font-semibold text-accent group-hover:text-heading transition-colors">
                    <span>View Case Metric</span>
                    <ArrowUpRight size={13} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
