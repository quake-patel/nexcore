'use client';

import { motion } from 'framer-motion';
import { 
  Compass, 
  Map, 
  Code, 
  Megaphone, 
  Gauge, 
  TrendingUp 
} from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Discovery & Audit',
    icon: Compass,
    desc: 'We host interactive alignment workshops, audit your legacy systems, and analyze target buyer behaviors to establish a clean scope and metric framework.',
    color: 'border-cyan-500/20 text-cyan-400 bg-cyan-500/5'
  },
  {
    num: '02',
    title: 'Strategy & Architecture',
    icon: Map,
    desc: 'Our enterprise software architects design solid blueprint systems while our digital marketing strategists construct clear funnel projections.',
    color: 'border-violet-500/20 text-violet-400 bg-violet-500/5'
  },
  {
    num: '03',
    title: 'Agile Development',
    icon: Code,
    desc: 'We execute modern, fast-paced agile development sprints. With continuous automated testing, we deliver working product iterations every fortnight.',
    color: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5'
  },
  {
    num: '04',
    title: 'Performance Marketing',
    icon: Megaphone,
    desc: 'We launch ROI-driven performance campaigns across search and social channels, building custom landers optimized for high buyer conversion.',
    color: 'border-cyan-500/20 text-cyan-400 bg-cyan-500/5'
  },
  {
    num: '05',
    title: 'Optimization & Scaling',
    icon: Gauge,
    desc: 'We execute multi-variant A/B tests on landing copy, refine application speed performance, and optimize cloud database query latencies.',
    color: 'border-violet-500/20 text-violet-400 bg-violet-500/5'
  },
  {
    num: '06',
    title: 'Growth Acceleration',
    icon: TrendingUp,
    desc: 'We deliver monthly analytics reviews, implement scale patches, and run product iteration sprints to maintain market authority long-term.',
    color: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5'
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="bg-navy2 py-24 px-6 md:px-12 relative overflow-hidden font-manrope">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] bg-accent/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[350px] h-[350px] bg-accent2/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <span className="text-xs font-semibold font-sora text-accent tracking-widest uppercase">
            Our Workflow
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-sora text-heading tracking-tight leading-tight mt-3">
            A Structured Architecture for Scaling
          </h2>
          <p className="text-sm text-muted mt-4 leading-relaxed font-light font-manrope">
            We avoid guess-work and scope creep. Our structured six-stage process keeps engineering milestones and commercial conversions perfectly aligned.
          </p>
        </div>

        {/* Workflow Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          
          {/* Connector Line overlay for Desktop */}
          <div className="hidden lg:block absolute inset-y-12 inset-x-8 border-t border-dashed border-border/40 pointer-events-none z-0" />
          <div className="hidden lg:block absolute inset-y-80 inset-x-8 border-t border-dashed border-border/40 pointer-events-none z-0" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative z-10 p-6 rounded-2xl border border-border bg-card shadow-lg hover:border-accent/30 hover:shadow-accent/5 transition-all duration-300 backdrop-blur-sm group"
            >
              
              {/* Step Header: Number & Glow Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${step.color} shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                  <step.icon size={22} className="stroke-[1.5]" />
                </div>
                <span className="text-3xl font-extrabold font-sora text-border group-hover:text-accent/20 transition-colors">
                  {step.num}
                </span>
              </div>

              {/* Step Content */}
              <h3 className="text-base font-bold font-sora text-heading mb-3 group-hover:text-accent transition-colors">
                {step.title}
              </h3>
              <p className="text-xs text-muted leading-relaxed font-light font-manrope">
                {step.desc}
              </p>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
