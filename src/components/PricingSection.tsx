'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, HelpCircle, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

const pricingTiers = [
  {
    name: 'Starter Tier',
    priceMonthly: 2499,
    priceYearly: 1999,
    desc: 'Perfect for early-stage SaaS & local business scale.',
    features: [
      'Basic Custom Web or App consulting',
      'Single Campaign funnel setup (Google or Meta)',
      'Technical SEO audit & strategy roadmap',
      '1 Dedicated IT/Growth Specialist',
      'Standard Email & Slack support',
      '2-week development sprint updates'
    ],
    popular: false,
    cta: 'Launch Campaign'
  },
  {
    name: 'Professional Tier',
    priceMonthly: 5999,
    priceYearly: 4999,
    desc: 'Best for high-growth enterprises scaling digital operations.',
    features: [
      'Comprehensive custom Web & Mobile App development',
      'Multi-funnel performance ads (Google, Meta & LinkedIn)',
      'High-impact keyword clustering & speed optimization',
      '3 Dedicated software & marketing specialists',
      '24/7 Slack channel & weekly coordination calls',
      'Agile sprints with bi-weekly demo previews',
      'Basic AI agent automation setups'
    ],
    popular: true,
    cta: 'Accelerate Scale'
  },
  {
    name: 'Enterprise Tier',
    priceMonthly: 11999,
    priceYearly: 9999,
    desc: 'For global corporate organizations requiring multi-region power.',
    features: [
      'Custom software engineering + Kubernetes DevOps',
      'Unlimited ad budget management & media buying',
      'Full semantic SEO & dynamic rendering setups',
      'Dedicated delivery pod (6+ engineering & growth experts)',
      '24/7 Priority support with strict uptime SLAs',
      'Advanced corporate AI agent & database pipelines',
      'Continuous programmatic security auditing'
    ],
    popular: false,
    cta: 'Partner With Us'
  }
];

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section id="pricing" className="bg-navy2 py-24 px-6 md:px-12 relative overflow-hidden font-manrope">
      
      {/* Glow Spots */}
      <div className="absolute top-[30%] right-[5%] w-[450px] h-[450px] bg-accent/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[450px] h-[450px] bg-accent2/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-10 flex flex-col items-center">
          <span className="text-xs font-semibold font-sora text-accent tracking-widest uppercase">
            Flexible Models
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-sora text-heading tracking-tight leading-tight mt-3">
            Predictable Engagement Pricing
          </h2>
          <p className="text-sm text-muted mt-4 leading-relaxed font-light font-manrope">
            Whether you need a dedicated engineering team or a comprehensive growth engine, we provide transparent engagement tiers.
          </p>
        </div>

        {/* Toggle Billing Switch */}
        <div className="flex justify-center items-center gap-3 mb-16 select-none">
          <span className={`text-xs font-semibold font-manrope transition-colors ${billingCycle === 'monthly' ? 'text-accent' : 'text-muted'}`}>
            Bill Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="w-12 h-6.5 rounded-full bg-subtle-bg border border-border p-1 flex items-center justify-start cursor-pointer transition-colors relative"
            aria-label="Toggle billing cycle"
          >
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="w-4 h-4 rounded-full bg-accent"
              style={{
                marginLeft: billingCycle === 'yearly' ? 'auto' : '0px'
              }}
            />
          </button>
          <span className={`text-xs font-semibold font-manrope transition-colors flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'text-accent' : 'text-muted'}`}>
            Bill Annually
            <span className="text-[9px] font-bold font-sora text-accent3 bg-accent3/10 border border-accent3/20 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
              Save 20%
            </span>
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`relative rounded-3xl p-8 border flex flex-col justify-between backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 ${
                tier.popular 
                  ? 'border-accent bg-accent/[0.02] shadow-accent/5 shadow-2xl' 
                  : 'border-border bg-card'
              }`}
            >
              
              {/* Featured Badge */}
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-1 rounded-full bg-accent text-navy font-sora font-extrabold text-[9px] tracking-widest uppercase shadow-md shadow-accent/15">
                  <Star size={10} className="fill-navy" />
                  Most Popular
                </div>
              )}

              {/* Tier Header */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xs font-bold font-sora text-heading uppercase tracking-wider">
                    {tier.name}
                  </span>
                </div>
                
                <p className="text-xs text-muted mb-6 leading-relaxed font-light min-h-[36px]">
                  {tier.desc}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-border/60">
                  <span className="text-3xl md:text-4xl font-extrabold font-sora text-heading">
                    ${billingCycle === 'monthly' ? tier.priceMonthly : tier.priceYearly}
                  </span>
                  <span className="text-xs text-muted font-light">/month</span>
                </div>

                {/* Feature List */}
                <ul className="flex flex-col gap-4 list-none p-0 m-0 mb-8">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex gap-3 items-start">
                      <div className="w-4.5 h-4.5 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-0.5">
                        <Check size={11} className="stroke-[2.5]" />
                      </div>
                      <span className="text-xs text-muted leading-relaxed font-light">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Trigger */}
              <Link
                href="/contact"
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-sora font-semibold text-xs transition-all duration-300 shadow-md ${
                  tier.popular
                    ? 'bg-accent text-navy hover:opacity-95 shadow-accent/15'
                    : 'bg-subtle-bg border border-border text-heading hover:bg-border/20'
                }`}
              >
                {tier.cta} <ArrowRight size={13} />
              </Link>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
