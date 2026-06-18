'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, Share2, Globe } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/curationchamp')) {
    return null;
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <footer className="bg-navy border-t border-border pt-16 pb-8 px-6 md:px-12 font-manrope">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-12">
          
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold font-sora tracking-tight text-heading">
              <span className="bg-gradient-to-r from-accent via-accent2 to-accent3 bg-clip-text text-transparent">
                Nex
              </span>
              <span className="text-heading">Core</span>
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-sm">
              Engineering digital futures since 2010. We deliver high-end enterprise software development, robust cloud infrastructure, and ROI-driven performance marketing for leading global brands.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Share2, href: '#', label: 'Share' },
                { icon: Globe, href: '#', label: 'Website' },
                { icon: Mail, href: '#', label: 'Contact' },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent hover:bg-accent/5 transition-all duration-300 shadow-sm"
                  aria-label={item.label}
                >
                  <item.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services Links (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <h4 className="font-sora font-semibold text-xs text-heading uppercase tracking-widest">Services</h4>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              {[
                { name: 'Web Engineering', href: '/services' },
                { name: 'App Engineering', href: '/services' },
                { name: 'Performance Ads', href: '/services' },
                { name: 'Branding & UI/UX', href: '/services' },
                { name: 'Cloud & DevOps', href: '/services' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted hover:text-accent transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <h4 className="font-sora font-semibold text-xs text-heading uppercase tracking-widest">Company</h4>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Our Process', href: '/process' },
                { name: 'Tech Stack', href: '/technologies' },
                { name: 'Insights Blog', href: '/blog' },
                { name: 'Get In Touch', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted hover:text-accent transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscription (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <h4 className="font-sora font-semibold text-xs text-heading uppercase tracking-widest">Newsletter</h4>
            <p className="text-sm text-muted leading-relaxed">
              Stay ahead of digital innovations. Subscribe to receive monthly tech perspectives and marketing trends.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md">
              <input
                type="email"
                required
                placeholder="Enter your work email"
                className="w-full px-4 py-2.5 rounded-full text-sm bg-subtle-bg border border-border text-heading outline-none focus:border-accent/40 font-manrope placeholder-muted"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full text-xs font-semibold font-sora text-navy bg-accent hover:opacity-90 shadow-lg shadow-accent/15 flex items-center justify-center gap-1.5 transition-all shrink-0 cursor-pointer"
              >
                Join <ArrowRight size={12} />
              </button>
            </form>
          </div>

        </div>

        {/* Middle Contact Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8 my-8 border-y border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-subtle-bg border border-border flex items-center justify-center text-accent">
              <Mail size={16} />
            </div>
            <div>
              <div className="text-[10px] text-muted uppercase tracking-wider font-semibold">Drop us a line</div>
              <a href="mailto:hello@nexcore.io" className="text-sm text-heading hover:text-accent font-medium transition-colors">
                hello@nexcore.io
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-subtle-bg border border-border flex items-center justify-center text-accent">
              <Phone size={16} />
            </div>
            <div>
              <div className="text-[10px] text-muted uppercase tracking-wider font-semibold">Call our experts</div>
              <a href="tel:+917940000000" className="text-sm text-heading hover:text-accent font-medium transition-colors">
                +91 79 4000 0000
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:col-span-2 lg:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-subtle-bg border border-border flex items-center justify-center text-accent">
              <MapPin size={16} />
            </div>
            <div>
              <div className="text-[10px] text-muted uppercase tracking-wider font-semibold">Global HQ</div>
              <span className="text-sm text-heading font-medium">
                GIFT City, Ahmedabad, India
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <span>
            © 2026 NexCore IT Solutions Pvt Ltd. All rights reserved. Registered under ISO 9001:2015.
          </span>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-accent transition-colors">Terms of Service</Link>
            <span className="flex items-center gap-1.5">
              <Globe size={12} className="text-accent" /> English (US)
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
