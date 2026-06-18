'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ClientMetaUpdater from '@/components/ClientMetaUpdater';
import ClientPageCustomizer from '@/components/ClientPageCustomizer';
import { Mail, Phone, MapPin, ArrowRight, Sparkles, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    projectDesc: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;
    alert(`Thank you ${formData.firstName}! We have received your query for ${formData.company}.`);
    setFormData({ firstName: '', lastName: '', email: '', company: '', projectDesc: '' });
  };

  return (
    <ClientPageCustomizer pageKey="contact">
      <ClientMetaUpdater pageKey="contact" />
      
      {/* ── PAGE HERO ── */}
      <div className="relative pt-36 pb-20 px-6 md:px-12 bg-navy overflow-hidden text-center font-manrope">
        {/* Glow Spots */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[20%] left-[20%] w-[380px] h-[380px] rounded-full bg-accent/10 blur-[130px]" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(6,182,212,0.04)_1px,transparent_1px)] [background-size:32px_32px]" />
        </div>

        <div className="max-w-4xl mx-auto z-10 relative flex flex-col items-center gap-5">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/8 border border-accent/20">
            <Sparkles size={11} className="text-accent animate-pulse" />
            <span className="text-[10px] font-bold font-sora text-accent tracking-widest uppercase">
              Start a Conversation
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-sora tracking-tight leading-tight text-heading">
            Let&apos;s Engineering Your Growth
          </h1>
          <p className="text-sm md:text-base text-muted font-light leading-relaxed max-w-xl">
            Tell us about your next digital initiative. Our lead planners and engineers respond with audits within one business day.
          </p>
        </div>
      </div>

      {/* Main Form & Location Layout */}
      <section className="bg-navy2 py-20 px-6 md:px-12 relative overflow-hidden font-manrope">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Premium Lead capture Form (7 cols) */}
            <div className="lg:col-span-7 p-8 rounded-3xl border border-border bg-card shadow-2xl backdrop-blur-md relative">
              <h2 className="text-xl md:text-2xl font-bold font-sora text-heading mb-6 tracking-tight">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold font-sora uppercase text-muted tracking-wider">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 text-xs rounded-xl bg-subtle-bg border border-border text-heading outline-none focus:border-accent/40 font-manrope placeholder-muted"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold font-sora uppercase text-muted tracking-wider">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 text-xs rounded-xl bg-subtle-bg border border-border text-heading outline-none focus:border-accent/40 font-manrope placeholder-muted"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold font-sora uppercase text-muted tracking-wider">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 text-xs rounded-xl bg-subtle-bg border border-border text-heading outline-none focus:border-accent/40 font-manrope placeholder-muted"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold font-sora uppercase text-muted tracking-wider">
                    Company Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your company name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 text-xs rounded-xl bg-subtle-bg border border-border text-heading outline-none focus:border-accent/40 font-manrope placeholder-muted"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold font-sora uppercase text-muted tracking-wider">
                    Describe your initiative
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Provide details about your technical requirements, goals, and desired budget/timeline..."
                    value={formData.projectDesc}
                    onChange={(e) => setFormData({ ...formData, projectDesc: e.target.value })}
                    className="w-full px-4 py-3 text-xs rounded-xl bg-subtle-bg border border-border text-heading outline-none focus:border-accent/40 font-manrope placeholder-muted resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-fit flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-sora font-semibold text-xs text-navy bg-accent hover:opacity-95 shadow-lg shadow-accent/15 transition-all mt-2 cursor-pointer"
                >
                  Send Inquiry <Send size={12} />
                </button>
              </form>
            </div>

            {/* Right Column: Global Locations & Interactive Styled Map (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <h2 className="text-xl md:text-2xl font-bold font-sora text-heading mb-2 tracking-tight">
                Our Global Offices
              </h2>
              
              {[
                { city: 'Ahmedabad', country: 'India (HQ)', address: '7th Floor, GIFT One Tower, GIFT City, Gandhinagar, GJ 382355', phone: '+91 79 4000 0000', email: 'india@nexcore.io' },
                { city: 'London', country: 'United Kingdom', address: '1 Canada Square, Canary Wharf, London, E14 5AB', phone: '+44 20 7946 0958', email: 'uk@nexcore.io' },
                { city: 'Austin', country: 'United States', address: '500 W 2nd St, Suite 1900, Austin, TX 78701', phone: '+1 512 900 0000', email: 'us@nexcore.io' },
              ].map((office) => (
                <div
                  key={office.city}
                  className="p-6 rounded-3xl border border-border bg-card hover:border-accent/30 hover:shadow-accent/5 transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="flex justify-between items-baseline mb-4 pb-2 border-b border-border/40">
                    <span className="text-sm font-bold font-sora text-heading">{office.city}</span>
                    <span className="text-[9px] font-bold font-sora text-accent uppercase tracking-wider bg-accent/5 px-2 py-0.5 rounded-full border border-accent/20">
                      {office.country}
                    </span>
                  </div>
                  
                  <div className="flex gap-2 items-start text-xs text-muted mb-4 font-manrope leading-relaxed">
                    <MapPin size={14} className="text-accent shrink-0 mt-0.5" />
                    <span>{office.address}</span>
                  </div>

                  <div className="flex flex-col gap-2 pt-2 border-t border-border/40 font-manrope">
                    <a href={`tel:${office.phone}`} className="flex gap-2 items-center text-xs text-muted hover:text-accent transition-colors">
                      <Phone size={13} className="text-accent" />
                      {office.phone}
                    </a>
                    <a href={`mailto:${office.email}`} className="flex gap-2 items-center text-xs text-accent hover:underline">
                      <Mail size={13} className="text-accent" />
                      {office.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </ClientPageCustomizer>
  );
}
