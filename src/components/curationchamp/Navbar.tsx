'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { logoBase64 } from './logo';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* ANNOUNCE */}
      <div className="announce">
        <div className="container">
          <strong>See the quality before you spend a thing.</strong> Get a free content sample on any topic.{' '}
          <Link href="/#lead">Claim yours →</Link>
        </div>
      </div>

      {/* HEADER */}
      <header className="site-header">
        <div className="nav">
          <Link className="logo" href="/" aria-label="CurationChamp home">
            <img src={logoBase64} alt="CurationChamp Logo" />
          </Link>
          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/#services">Services</Link>
            <Link href="/content-writing-agency">Content Writing</Link>
            <Link href="/content-marketing-agency">Content Marketing</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/#faq">FAQ</Link>
          </div>
          <div className="nav-right">
            <a className="phone-link" href="tel:+441801333712">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +44 (0) 1801 333 712
            </a>
            <Link className="btn btn-primary nav-cta" href="/#lead">Get Free Sample</Link>
            <button className="menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle mobile menu">
              <span></span>
            </button>
          </div>
        </div>
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/#services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
          <Link href="/content-writing-agency" onClick={() => setMobileMenuOpen(false)}>Content Writing</Link>
          <Link href="/content-marketing-agency" onClick={() => setMobileMenuOpen(false)}>Content Marketing</Link>
          <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
          <Link href="/#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
          <Link className="btn btn-primary" href="/#lead" onClick={() => setMobileMenuOpen(false)}>Get Free Sample</Link>
        </div>
      </header>
    </>
  );
}
