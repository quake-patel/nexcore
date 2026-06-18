'use client';

import React from 'react';
import Link from 'next/link';
import { logoBase64 } from './logo';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link className="footer-logo" href="/">
              <img src={logoBase64} alt="CurationChamp Logo" />
            </Link>
            <p className="footer-intro">Scattered ideas into content that ranks, reads, and converts. Predictable fixed pricing.</p>
            <div className="footer-contact">
              <a href="mailto:hello@curationchamp.com">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                hello@curationchamp.com
              </a>
              <a href="tel:+441801333712">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +44 (0) 1801 333 712
              </a>
              <a href="#">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                London, United Kingdom
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h5>Services</h5>
            <ul>
              <li>
                <Link href="/#services">Content Curation</Link>
              </li>
              <li>
                <Link href="/content-writing-agency">Content Writing</Link>
              </li>
              <li>
                <Link href="/content-marketing-agency">Content Marketing</Link>
              </li>
              <li>
                <Link href="/content-writing-agency#cluster">Cluster Strategy</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li>
                <Link href="/#services">About</Link>
              </li>
              <li>
                <Link href="/#cta">Results</Link>
              </li>
              <li>
                <Link href="/#faq">FAQ</Link>
              </li>
              <li>
                <Link href="/#lead">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Resources</h5>
            <ul>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/#faq">FAQ</Link>
              </li>
              <li>
                <Link href="/#cta">Case studies</Link>
              </li>
              <li>
                <Link href="/#lead">Newsletter</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <span>&copy; 2026 CurationChamp. All rights reserved.</span>
          <div className="socials">
            <a href="#" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.5 8h4V24h-4Zm7 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.1c0-1.7 0-3.9-2.38-3.9s-2.74 1.85-2.74 3.78V24h-4Z" />
              </svg>
            </a>
            <a href="#" aria-label="X">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.9 2H22l-7.3 8.3L23 22h-6.9l-5.4-6.9L4.6 22H1.5l7.8-8.9L1 2h7.1l4.9 6.4Zm-1.2 18h1.7L7.4 3.8H5.6Z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5.5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
