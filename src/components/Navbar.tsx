'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Shield, Zap, Target } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

const navItems = [
  { label: 'Services', href: '/services', desc: 'IT Consulting & Performance Marketing', icon: Zap },
  { label: 'About', href: '/about', desc: 'Who we are and our global presence', icon: Shield },
  { label: 'Process', href: '/process', desc: 'Our transparent 6-stage lifecycle', icon: Target },
  { label: 'Technologies', href: '/technologies', desc: 'SaaS & enterprise tech stack expertise', icon: Menu },
  { label: 'Blog', href: '/blog', desc: 'Engineering insights & market strategies', icon: Menu },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  if (pathname?.startsWith('/curationchamp')) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-navy/85 backdrop-blur-md py-3 border-b border-border shadow-lg shadow-black/5'
            : 'bg-transparent py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2 text-2xl font-extrabold font-sora tracking-tight text-heading">
            <span className="bg-gradient-to-r from-accent via-accent2 to-accent3 bg-clip-text text-transparent transition-all duration-300 group-hover:opacity-80">
              Nex
            </span>
            <span className="text-heading transition-colors group-hover:text-accent">Core</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-8 list-none">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`relative font-manrope text-[0.92rem] font-medium tracking-wide transition-colors duration-200 py-2 ${
                        isActive ? 'text-accent' : 'text-muted hover:text-heading'
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="activeNavLine"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-accent2 rounded-full"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Action Area */}
          <div className="hidden lg:flex items-center gap-5">
            <ThemeToggle />
            <Link
              href="/contact"
              className="relative inline-flex items-center justify-center px-6 py-2.5 rounded-full font-sora font-semibold text-xs text-navy bg-accent hover:opacity-90 overflow-hidden shadow-lg shadow-accent/15 transition-all duration-300 hover:-translate-y-[1px]"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex lg:hidden items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-subtle-bg border border-border text-heading hover:text-accent transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-40 w-full sm:w-[380px] bg-navy2 border-l border-border px-8 py-24 flex flex-col justify-between shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between pb-6 border-b border-border">
                  <span className="text-xl font-extrabold font-sora text-heading">
                    <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">Nex</span>Core Navigation
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg bg-subtle-bg border border-border text-muted hover:text-heading"
                  >
                    <X size={16} />
                  </button>
                </div>

                <nav className="flex flex-col gap-6">
                  {navItems.map((item, index) => {
                    const isActive = pathname === item.href;
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          className={`flex items-start gap-4 p-3 rounded-xl transition-all ${
                            isActive
                              ? 'bg-accent/5 border border-accent/20 text-accent'
                              : 'hover:bg-subtle-bg border border-transparent text-muted hover:text-heading'
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${isActive ? 'bg-accent/10' : 'bg-subtle-bg'}`}>
                            <item.icon size={18} />
                          </div>
                          <div>
                            <div className="font-semibold text-sm tracking-wide font-sora">{item.label}</div>
                            <div className="text-xs text-muted mt-0.5">{item.desc}</div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 pt-6 border-t border-border flex flex-col gap-4"
              >
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-sora font-semibold text-xs text-navy bg-accent hover:opacity-90 shadow-lg shadow-accent/15 transition-all"
                >
                  Book a Consultation <ArrowRight size={14} />
                </Link>
                <p className="text-[10px] text-center text-muted">
                  © 2026 NexCore IT Solutions & Marketing.
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
