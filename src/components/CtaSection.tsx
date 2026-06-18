'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Send } from 'lucide-react';
import Link from 'next/link';

export default function CtaSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    alert(`Thank you! Consultation requested for ${email}`);
    setEmail('');
  };

  return (
    <section className="bg-navy py-24 px-6 md:px-12 relative overflow-hidden font-manrope">
      
      {/* Decorative Blur Backdrops */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-accent/20 to-accent2/25 rounded-full blur-[140px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl p-10 md:p-16 border border-border/80 bg-gradient-to-br from-navy2/90 via-navy/95 to-navy2/90 shadow-2xl overflow-hidden backdrop-blur-md text-center max-w-5xl mx-auto"
        >
          
          {/* Top spark indicator */}
          <div className="mx-auto w-fit flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/8 border border-accent/20 mb-6">
            <Sparkles size={11} className="text-accent animate-pulse" />
            <span className="text-[10px] font-bold font-sora text-accent tracking-widest uppercase">
              Schedule Your Session
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-extrabold font-sora text-heading tracking-tight leading-tight max-w-2xl mx-auto mb-4">
            Ready to{' '}
            <span className="bg-gradient-to-r from-accent via-accent2 to-accent3 bg-clip-text text-transparent">
              Scale Your Business
            </span>{' '}
            to the Next Level?
          </h2>

          {/* Value subtext */}
          <p className="text-sm text-muted max-w-lg mx-auto leading-relaxed font-light font-manrope mb-10">
            Tell us about your IT engineering requirements or active customer acquisition goals. Our consultants will prepare a customized audit within one business day.
          </p>

          {/* Conversion Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto items-center justify-center">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your corporate email"
              className="w-full px-5 py-3.5 rounded-full text-xs bg-subtle-bg border border-border text-heading outline-none focus:border-accent/40 font-manrope placeholder-muted shadow-inner"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-semibold font-sora text-navy bg-accent hover:opacity-90 shadow-lg shadow-accent/15 flex items-center justify-center gap-1.5 transition-all shrink-0 cursor-pointer"
            >
              Get Free Audit <ArrowRight size={13} />
            </button>
          </form>

          {/* Below form trust info */}
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 mt-8 text-[10px] text-muted font-light font-manrope select-none opacity-85">
            <span>✓ Response in &lt; 24 hours</span>
            <span>✓ No-obligation discovery call</span>
            <span>✓ Full NDA assured</span>
          </div>

        </motion.div>
      </div>

    </section>
  );
}
