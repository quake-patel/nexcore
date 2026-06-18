'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { logoBase64 } from './logo';
import './curationchamp.css';

export default function ContentWritingAgency() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'seo' | 'web' | 'lead' | 'ghost'>('seo');
  const [openFaq, setOpenFaq] = useState<number | null>(0); // Matches first open item in index.html/content-writing faq
  const [formSubmitted, setFormSubmitted] = useState(false);

  // IntersectionObserver for reveal on scroll animations
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    els.forEach((el) => io.observe(el));

    const timeout = setTimeout(() => {
      els.forEach((el) => el.classList.add('in'));
    }, 1200);

    return () => {
      io.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleTabClick = (tab: 'seo' | 'web' | 'lead' | 'ghost') => {
    setActiveTab(tab);
    if (window.innerWidth < 880) {
      const activeEl = document.querySelector(`[data-panel="${tab}"]`);
      if (activeEl) {
        window.scrollTo({
          top: activeEl.getBoundingClientRect().top + window.scrollY - 80,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <>

      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy reveal">
            <div className="eyebrow">Content Writing Agency</div>
            <h1>
              The Content Writing Agency That Makes You Impossible to <span className="accent">Scroll Past</span>.
            </h1>
            <p className="hero-sub">
              SEO articles, web copy, ebooks, and founder ghostwriting by category specialists, plus a Content Cluster Strategy that ranks whole subject areas. Send one keyword to see a free sample in your voice.
            </p>
            <div className="hero-cta-row">
              <a href="#formats" className="btn btn-primary">
                View Formats <span className="arrow">→</span>
              </a>
              <a href="#lead" className="btn btn-ghost">Get Free Sample</a>
            </div>
            <div className="hero-meta">
              <div className="hero-meta-item">
                <span className="check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>{' '}
                One partner, every format
              </div>
              <div className="hero-meta-item">
                <span className="check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>{' '}
                Human category specialists
              </div>
              <div className="hero-meta-item">
                <span className="check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>{' '}
                First draft in 5 business days
              </div>
              <div className="hero-meta-item">
                <span className="check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>{' '}
                Cluster strategy included
              </div>
            </div>
          </div>

          <div className="hero-visual reveal" id="lead">
            <form className="hv-card hv-form" onSubmit={handleFormSubmit}>
              {!formSubmitted ? (
                <>
                  <div className="form-head">
                    <div className="form-eyebrow">Free content sample</div>
                    <h3>Get a free sample on any topic</h3>
                    <p>Takes 30 seconds. No sales pressure. A strategist replies within one business day.</p>
                  </div>
                  <div className="form-fields">
                    <div className="field-row">
                      <label className="field">
                        <span>Your name</span>
                        <input type="text" name="name" placeholder="Jane Doe" required />
                      </label>
                      <label className="field">
                        <span>Work email</span>
                        <input type="email" name="email" placeholder="jane@company.com" required />
                      </label>
                    </div>
                    <label className="field">
                      <span>Company / website</span>
                      <input type="text" name="company" placeholder="company.com" />
                    </label>
                    <label className="field">
                      <span>Keyword or topic theme?</span>
                      <input type="text" name="theme" placeholder="e.g. content marketing checklist" required />
                    </label>
                    <button type="submit" className="btn btn-primary form-submit">
                      Send my topic <span className="arrow">→</span>
                    </button>
                    <div className="form-trust">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>{' '}
                      Your details stay with us. We never share or sell contact data.
                    </div>
                  </div>
                </>
              ) : (
                <div className="form-thanks">
                  <div className="thanks-icon">
                    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <h3>Thanks. Your sample is on its way.</h3>
                  <p>A strategist will review your details and send you a custom sample within one business day.</p>
                </div>
              )}
            </form>
            <div className="hv-card hv-float">
              <div className="stars">★★★★★</div>
              <div className="quote">"They captured the essence of every topic. Revisions were next to none."</div>
              <div className="src">Rosie A. · Client since 2021</div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="trust">
        <div className="container trust-inner">
          <div className="trust-label">Driving reach and revenue for</div>
          <div className="trust-logos">
            <span className="tl">Northbeam</span>
            <span className="tl">Vellum</span>
            <span className="tl">Brightwork</span>
            <span className="tl">Cadence</span>
            <span className="tl">Orbital</span>
            <span className="tl">Lumen</span>
            <span className="tl">Fieldstone</span>
          </div>
        </div>
      </section>

      {/* INTRO / PROBLEM */}
      <section className="section intro">
        <div className="container intro-grid">
          <div className="reveal">
            <div className="eyebrow">Why CurationChamp</div>
            <h2 style={{ marginTop: '14px' }}>Nuance Matters. Spun Drafts and Hidden AI Will Not Convert.</h2>
            <p style={{ marginTop: '18px', color: 'var(--muted)', fontSize: '17px', lineHeight: '1.65' }}>
              Your audience can tell in three seconds if a piece was researched by an expert or scraped by a bot. We hire only human category specialists who know your industry's terms, trends, and pain points. Every piece is written from scratch, Fact-checked twice, and edited by a real strategist.
            </p>
            <div className="intro-points">
              <div className="ip">
                <div className="ic">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <h4>Zero plagiarism. Zero bots.</h4>
                  <p>Every brief is built on original research, interviews, and source material, never spun from existing search results.</p>
                </div>
              </div>
              <div className="ip">
                <div className="ic">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="6" x2="12" y2="12" />
                    <line x1="12" y1="12" x2="16" y2="14" />
                  </svg>
                </div>
                <div>
                  <h4>First draft in five business days.</h4>
                  <p>Fast production that never compromises on craft, with updates so you always know when your copy will land.</p>
                </div>
              </div>
              <div className="ip">
                <div className="ic">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </div>
                <div>
                  <h4>Unlimited revisions.</h4>
                  <p>We work until you love the result. Revisions are structured, clear, and included in the scope from day one.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="intro-stats reveal">
            <div className="intro-stats-head">
              <div className="ish-eyebrow">Writing by the numbers</div>
              <p>Nuanced, original writing that drives pipeline, across 12,000+ shipped pieces.</p>
              <div className="ish-sub">
                Our team is built to make good copy reliable, not a lucky exception. Here is what we have delivered.
              </div>
            </div>
            <div className="intro-stats-grid">
              <div className="stat">
                <div className="n">
                  12,400<span className="unit">+</span>
                </div>
                <div className="l">Articles, guides, and pages shipped</div>
              </div>
              <div className="stat">
                <div className="n">
                  92<span className="unit">%</span>
                </div>
                <div className="l">First-draft approval rate from clients</div>
              </div>
              <div className="stat">
                <div className="n">
                  100<span className="unit">%</span>
                </div>
                <div className="l">Human written, double-edited</div>
              </div>
              <div className="stat">
                <div className="n">
                  5<span className="unit">days</span>
                </div>
                <div className="l">Average delivery time for first draft</div>
              </div>
            </div>
            <div className="intro-stats-foot">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>
                <strong>Always original.</strong> We check every draft through copyscape and internal editors before it lands in your inbox.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FORMATS / TABS */}
      <section className="section packages" id="formats">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">What we write</div>
            <h2 style={{ marginTop: '14px' }}>Every Format Your Funnel Actually Needs, in One Consistent Voice</h2>
            <p>
              One team for the whole library, so your brand sounds like itself from the first blog to the final case study. Pick a format below to see exactly what is included and who it is built for.
            </p>
          </div>

          <div className="tablist cols-4" role="tablist">
            <button className={`tab ${activeTab === 'seo' ? 'active' : ''}`} onClick={() => handleTabClick('seo')} role="tab">
              <div className="tab-num">Format 01</div>
              <div className="tab-ttl">SEO Blogs &amp; Articles</div>
              <div className="tab-sub">Rank and read well</div>
            </button>
            <button className={`tab ${activeTab === 'web' ? 'active' : ''}`} onClick={() => handleTabClick('web')} role="tab">
              <div className="tab-num">Format 02</div>
              <div className="tab-ttl">Website &amp; Landing Copy</div>
              <div className="tab-sub">Clear, converting pages</div>
            </button>
            <button className={`tab ${activeTab === 'lead' ? 'active' : ''}`} onClick={() => handleTabClick('lead')} role="tab">
              <div className="tab-num">Format 03 · Popular</div>
              <div className="tab-ttl">Ebooks &amp; Lead Magnets</div>
              <div className="tab-sub">Substance worth an email</div>
            </button>
            <button className={`tab ${activeTab === 'ghost' ? 'active' : ''}`} onClick={() => handleTabClick('ghost')} role="tab">
              <div className="tab-num">Format 04</div>
              <div className="tab-ttl">Founder Ghostwriting</div>
              <div className="tab-sub">Thought leadership, your voice</div>
            </button>
          </div>

          {/* SEO */}
          <div className={`panel ${activeTab === 'seo' ? 'active' : ''}`} data-panel="seo">
            <div className="panel-body">
              <div className="ribbon">Search-ready</div>
              <h3 className="ph">SEO Blogs &amp; Articles</h3>
              <p className="lede">
                Search-ready articles that answer real buyer questions and climb the rankings without sounding like a robot wrote them. Researched, structured, and optimised so each piece earns traffic for months.
              </p>
              <div className="section-mini-title">What's included</div>
              <ul className="feat-list">
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  Keyword research and search-intent mapping
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  On-page structure, headings, and meta included
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  Internal links planned around your cluster
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  First draft in five days, revisions included
                </li>
              </ul>
              <div className="whofor">
                <div className="lbl">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>{' '}
                  Who this is for
                </div>
                <p>Brands that want a steady stream of articles that rank, educate buyers, and feed the top of the funnel.</p>
              </div>
              <div className="panel-cta-row">
                <a href="#lead" className="btn btn-primary">Get a free article sample →</a>
              </div>
            </div>
            <aside className="panel-side">
              <div className="ps-top">
                <div className="ps-tag">Format 01</div>
                <div className="ps-kicker">SEO ARTICLES</div>
              </div>
              <div>
                <div className="ps-head">
                  Built to rank,
                  <br />
                  made to read.
                </div>
                <p className="ps-lede">No keyword stuffing, no fluff. Just useful articles that earn traffic and trust at the same time.</p>
              </div>
              <div className="ps-card">
                <h4>Every article includes</h4>
                <div className="ps-row">
                  <span className="k">Keyword research</span>
                  <span className="v ok">● Included</span>
                </div>
                <div className="ps-row">
                  <span className="k">Meta &amp; headings</span>
                  <span className="v ok">● Included</span>
                </div>
                <div className="ps-row">
                  <span className="k">Internal links</span>
                  <span className="v ok">● Cluster-aware</span>
                </div>
                <div className="ps-row">
                  <span className="k">First draft</span>
                  <span className="v">5 days</span>
                </div>
              </div>
              <p className="ps-foot">
                <strong>Compounds over time.</strong> One ranking article keeps pulling in readers long after it is published.
              </p>
            </aside>
          </div>

          {/* WEB */}
          <div className={`panel ${activeTab === 'web' ? 'active' : ''}`} data-panel="web">
            <div className="panel-body">
              <div className="ribbon">Conversion-focused</div>
              <h3 className="ph">Website &amp; Landing Copy</h3>
              <p className="lede">
                Pages that make your value obvious in seconds and guide visitors straight to the next step you want them to take. Clear, persuasive, and tuned to convert without the hard sell.
              </p>
              <div className="section-mini-title">What's included</div>
              <ul className="feat-list">
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  Homepage, product, and landing-page copy
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  Messaging hierarchy and clear calls to action
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  Voice and tone matched to your brand
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  SEO-aware headings and metadata
                </li>
              </ul>
              <div className="whofor">
                <div className="lbl">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>{' '}
                  Who this is for
                </div>
                <p>Teams launching or refreshing a site who need pages that explain the value fast and move visitors to act.</p>
              </div>
              <div className="panel-cta-row">
                <a href="#lead" className="btn btn-primary">Get a copy sample →</a>
              </div>
            </div>
            <aside className="panel-side">
              <div className="ps-top">
                <div className="ps-tag">Format 02</div>
                <div className="ps-kicker">WEB COPY</div>
              </div>
              <div>
                <div className="ps-head">
                  Clear in five
                  <br />
                  seconds flat.
                </div>
                <p className="ps-lede">Visitors should know what you do, who it is for, and what to do next, before they scroll.</p>
              </div>
              <div className="ps-card">
                <h4>What you get</h4>
                <div className="ps-row">
                  <span className="k">Page copy</span>
                  <span className="v ok">● Full set</span>
                </div>
                <div className="ps-row">
                  <span className="k">Messaging hierarchy</span>
                  <span className="v ok">● Included</span>
                </div>
                <div className="ps-row">
                  <span className="k">CTAs</span>
                  <span className="v ok">● Optimised</span>
                </div>
                <div className="ps-row">
                  <span className="k">Brand voice</span>
                  <span className="v">Matched</span>
                </div>
              </div>
              <p className="ps-foot">
                <strong>Less bounce, more action.</strong> Clear copy is the cheapest conversion lever you have.
              </p>
            </aside>
          </div>

          {/* LEAD MAGNETS */}
          <div className={`panel ${activeTab === 'lead' ? 'active' : ''}`} data-panel="lead">
            <div className="panel-body">
              <div className="ribbon popular">★ Most Popular · Lead magnets</div>
              <h3 className="ph">Ebooks &amp; Lead Magnets</h3>
              <p className="lede">
                Lead magnets with real substance, the kind people happily trade an email for and your sales team loves to send. Ebooks, whitepapers, and guides that build authority and fill your list.
              </p>
              <div className="section-mini-title">What's included</div>
              <ul className="feat-list">
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  Researched ebooks, whitepapers, and guides
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  Case studies that turn wins into proof
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  Email sequences to nurture every download
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  A landing page to capture the lead
                </li>
              </ul>
              <div className="whofor">
                <div className="lbl">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>{' '}
                  Who this is for
                </div>
                <p>Marketing teams that need substantial assets to capture leads and give sales something worth sending.</p>
              </div>
              <div className="panel-cta-row">
                <a href="#lead" className="btn btn-primary">Plan a lead magnet →</a>
              </div>
            </div>
            <aside className="panel-side">
              <div className="ps-top">
                <div className="ps-tag">Format 03 · Most Popular</div>
                <div className="ps-kicker">LEAD MAGNETS</div>
              </div>
              <div>
                <div className="ps-head">
                  Worth trading
                  <br />
                  an email for.
                </div>
                <p className="ps-lede">Substance people actually read, packaged to capture leads and earn trust before the first call.</p>
              </div>
              <div className="ps-card">
                <h4>The full package</h4>
                <div className="ps-row">
                  <span className="k">Ebook / guide</span>
                  <span className="v ok">● Researched</span>
                </div>
                <div className="ps-row">
                  <span className="k">Landing page</span>
                  <span className="v ok">● Included</span>
                </div>
                <div className="ps-row">
                  <span className="k">Nurture emails</span>
                  <span className="v ok">● Included</span>
                </div>
                <div className="ps-row">
                  <span className="k">Design-ready</span>
                  <span className="v">Yes</span>
                </div>
              </div>
              <p className="ps-foot">
                <strong>Built to convert.</strong> A great lead magnet earns its keep long after launch.
              </p>
            </aside>
          </div>

          {/* GHOST */}
          <div className={`panel ${activeTab === 'ghost' ? 'active' : ''}`} data-panel="ghost">
            <div className="panel-body">
              <div className="ribbon">Personal brand</div>
              <h3 className="ph">Founder Ghostwriting</h3>
              <p className="lede">
                Thought leadership in your voice that builds a personal brand and the kind of trust no ad budget can buy. We capture how you think and turn it into posts, essays, and articles people follow.
              </p>
              <div className="section-mini-title">What's included</div>
              <ul className="feat-list">
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  A voice guide built from how you actually talk
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  LinkedIn posts, essays, and long-form articles
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  A repeatable cadence so you stay visible
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  Light interviews, so it takes minutes of your week
                </li>
              </ul>
              <div className="whofor">
                <div className="lbl">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>{' '}
                  Who this is for
                </div>
                <p>Founders and execs who know thought leadership matters but do not have hours a week to write it.</p>
              </div>
              <div className="panel-cta-row">
                <a href="#lead" className="btn btn-primary">Build my personal brand →</a>
              </div>
            </div>
            <aside className="panel-side">
              <div className="ps-top">
                <div className="ps-tag">Format 04</div>
                <div className="ps-kicker">GHOSTWRITING</div>
              </div>
              <div>
                <div className="ps-head">
                  Your voice,
                  <br />
                  your authority.
                </div>
                <p className="ps-lede">We capture how you think and ship it consistently, so your audience grows while you run the business.</p>
              </div>
              <div className="ps-card">
                <h4>How it works</h4>
                <div className="ps-row">
                  <span className="k">Voice guide</span>
                  <span className="v ok">● Built for you</span>
                </div>
                <div className="ps-row">
                  <span className="k">Your time</span>
                  <span className="v">Minutes a week</span>
                </div>
                <div className="ps-row">
                  <span className="k">Cadence</span>
                  <span className="v ok">● Consistent</span>
                </div>
                <div className="ps-row">
                  <span className="k">Formats</span>
                  <span className="v">Posts, essays</span>
                </div>
              </div>
              <p className="ps-foot">
                <strong>Trust that compounds.</strong> A strong founder voice opens doors no ad ever will.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section className="section diff">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Why CurationChamp</div>
            <h2 style={{ marginTop: '14px' }}>Why Brands Keep Their Writing With Us, Year After Year</h2>
            <p>Anyone can deliver words. The real question is whether the writing performs, whether your voice stays consistent, and whether the team shows up on time. Here is what sets us apart.</p>
          </div>
          <div className="diff-grid">
            <div className="dcard">
              <span className="num">01</span>
              <div className="ic">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v8M8 12h8"/>
                </svg>
              </div>
              <h3>Senior Craft, Start to Finish.</h3>
              <p>Your work is shaped by writers who have shipped content in your space. No juniors hidden in the byline, no spun first drafts.</p>
            </div>
            <div className="dcard">
              <span className="num">02</span>
              <div className="ic">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
              </div>
              <h3>Real Industry Expertise.</h3>
              <p>SaaS, finance, health, e-commerce, and more. We bring the research and nuance that makes content credible, not generic.</p>
            </div>
            <div className="dcard">
              <span className="num">03</span>
              <div className="ic">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>
                </svg>
              </div>
              <h3>SEO That Actually Ranks.</h3>
              <p>Search is built into every brief, and our Content Cluster Strategy lifts whole topics, not just a single page, up the results.</p>
            </div>
            <div className="dcard">
              <span className="num">04</span>
              <div className="ic">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                  <path d="M12 22c4.97 0 9-1.34 9-3V5c0-1.66-4.03-3-9-3S3 3.34 3 5v14c0 1.66 4.03 3 9 3z"/>
                </svg>
              </div>
              <h3>Quality, Double-Checked.</h3>
              <p>A dedicated editor and proofreader review every piece, so what lands in your inbox is accurate and ready to publish.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTENT CLUSTER STRATEGY ===== */}
      <section className="section packages" id="cluster">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">The SEO edge</div>
            <h2 style={{ marginTop: '14px' }}>Content Cluster Strategy That Makes Google Take You Seriously</h2>
            <p>
              One-off articles compete alone. We build clusters: a strong pillar page surrounded by focused supporting pieces, all linked together so your whole topic ranks as one authority, not a scatter of orphan posts.
            </p>
          </div>

          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', padding: '48px 44px' }}>
            <div className="cluster-tree">
              <div className="cluster-pillar">
                <div className="k">Pillar page</div>
                <h4>Your core topic</h4>
                <p>The complete, authoritative guide buyers and search engines both trust.</p>
              </div>
              <div className="cluster-drop"></div>
              <div className="cluster-branches">
                <div className="cluster-leaf">
                  <div className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" width="21" height="21">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                    </svg>
                  </div>
                  <b>How-to guides</b>
                  <span>Capture intent at the top</span>
                </div>
                <div className="cluster-leaf">
                  <div className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" width="21" height="21">
                      <path d="M16 3h5v5M21 3l-7 7M8 21H3v-5M3 21l7-7"/>
                    </svg>
                  </div>
                  <b>Comparisons</b>
                  <span>Win the buying decision</span>
                </div>
                <div className="cluster-leaf">
                  <div className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" width="21" height="21">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <b>Best practices</b>
                  <span>Build mid-funnel trust</span>
                </div>
                <div className="cluster-leaf">
                  <div className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" width="21" height="21">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                      <path d="M12 17h.01"/>
                    </svg>
                  </div>
                  <b>FAQ &amp; glossary</b>
                  <span>Own the long-tail searches</span>
                </div>
              </div>
            </div>

            <div className="cluster-benefits">
              <div className="cb">
                <div className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" width="21" height="21">
                    <path d="M18 20V10M12 20V4M6 20v-6"/>
                  </svg>
                </div>
                <div>
                  <h4>Topical authority</h4>
                  <p>Covering a subject in depth signals real expertise, and search engines reward depth with higher rankings.</p>
                </div>
              </div>
              <div className="cb">
                <div className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" width="21" height="21">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                </div>
                <div>
                  <h4>Internal links that rank</h4>
                  <p>Every cluster piece points back to the pillar, passing authority where it counts and lifting the whole topic.</p>
                </div>
              </div>
              <div className="cb">
                <div className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" width="21" height="21">
                    <path d="M3 11l18-8-8 18-2-7-8-3z"/>
                  </svg>
                </div>
                <div>
                  <h4>More doors, more leads</h4>
                  <p>A dozen ranking pages means a dozen ways in, each one a fresh chance to capture a reader and grow pipeline.</p>
                </div>
              </div>
            </div>

            <div className="panel-cta-row" style={{ marginTop: '36px', justifyContent: 'center' }}>
              <a href="#lead" className="btn btn-primary">Map my content cluster →</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER QUOTE */}
      <section className="section founder">
        <div className="container fnd-grid">
          <div className="fnd-photo">
            <span className="ini">CP</span>
            <div className="badge">
              Chirag Parekh<small>Founder &amp; CEO, CurationChamp</small>
            </div>
          </div>
          <div className="reveal">
            <div className="eyebrow on-dark">A message from our founder</div>
            <div className="fnd-mark">"</div>
            <p className="fnd-quote">
              Good writing is not about sounding clever. It is about being so clear and useful that your reader cannot look away. That is the bar we hold every draft to, and it is why our clients stay. We treat your topic like ours, your voice like a promise, and your deadline like a deadline.
            </p>
            <div className="fnd-attr">
              <div className="sig">Chirag</div>
              <div>
                <div className="who">Chirag Parekh</div>
                <div className="role">Founder &amp; CEO, CurationChamp</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section testimonials" id="reviews">
        <div className="container">
          <div className="review-head">
            <div>
              <div className="eyebrow">Client reviews</div>
              <h2 style={{ marginTop: '14px' }}>Do Not Just Take Our Word for It</h2>
              <p>Quality is easy to claim and hard to prove. Here is what clients say once the drafts land and the rankings climb.</p>
            </div>
            <div className="google-card">
              <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '18px', color: 'var(--navy-900)' }}>
                G<span style={{ color: '#EA4335' }}>o</span><span style={{ color: 'var(--gold)' }}>o</span>gle
              </div>
              <div>
                <div className="rate">4.9</div>
                <div className="stars">★★★★★</div>
                <div className="meta">200+ reviews</div>
              </div>
            </div>
          </div>
          <div className="review-grid">
            <div className="review">
              <div className="stars">★★★★★</div>
              <div className="body">
                "They are not just a content writing company, they are a content marketing partner. Reliable, responsive, and flexible. Look no further."
              </div>
              <div className="ppl">
                <div className="ava" style={{ background: 'linear-gradient(135deg,#7FB6E8,#0C609C)' }}>RA</div>
                <div>
                  <div className="name">Rosie Alarcon</div>
                  <div className="when">Office Manager, Schroeder Group</div>
                </div>
              </div>
            </div>
            <div className="review">
              <div className="stars">★★★★★</div>
              <div className="body">
                "Five years in and still the most reliable agency I have worked with. Skilled writers, on time, on budget, and content that genuinely ranks."
              </div>
              <div className="ppl">
                <div className="ava" style={{ background: 'linear-gradient(135deg,#FBB07A,#F26223)' }}>VE</div>
                <div>
                  <div className="name">Viviana Erwin</div>
                  <div className="when">Founder, Casper Ltd</div>
                </div>
              </div>
            </div>
            <div className="review">
              <div className="stars">★★★★★</div>
              <div className="body">
                "Engaging, original, and perfectly on tone from the first draft. They captured the essence of every topic. Genuinely unparalleled."
              </div>
              <div className="ppl">
                <div className="ava" style={{ background: 'linear-gradient(135deg,#a3b8d8,#13294B)' }}>GL</div>
                <div>
                  <div className="name">Gracie Leclaire</div>
                  <div className="when">Director, Wolff LLC</div>
                </div>
              </div>
            </div>
            <div className="review">
              <div className="stars">★★★★★</div>
              <div className="body">
                "The articles started ranking within months and the leads followed. The cluster approach made all the difference for us."
              </div>
              <div className="ppl">
                <div className="ava" style={{ background: 'linear-gradient(135deg,#9AE0BA,#1F9A6A)' }}>JP</div>
                <div>
                  <div className="name">James Philson</div>
                  <div className="when">CEO, Okuneva Group</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq" id="faq">
        <div className="container faq-grid">
          <div className="faq-side">
            <div className="eyebrow">FAQs</div>
            <h2 style={{ marginTop: '14px' }}>Questions Brands Ask Before Hiring a Writing Agency</h2>
            <p>Still curious about something? Grab a free sample and we will walk you through it.</p>
            <div className="help-card">
              <h4>Question not answered here?</h4>
              <p>Ask us directly. No sales pressure, just clear answers on scope, timelines, and pricing.</p>
              <a href="tel:+441801333712" className="ph">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/>
                </svg>{' '}
                +44 (0) 1801 333 712
              </a>
            </div>
          </div>
          <div className="qlist">
            <div className={`qa ${openFaq === 0 ? 'open' : ''}`}>
              <button className="qa-q" onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}>
                How fast can I get my first draft?
                <span className="plus">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>
              <div className="qa-a">
                <div className="qa-a-inner">
                  Most first drafts land within five business days of an approved brief. Need it sooner? Tell us your deadline and we will flag what is realistic before you commit.
                </div>
              </div>
            </div>

            <div className={`qa ${openFaq === 1 ? 'open' : ''}`}>
              <button className="qa-q" onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}>
                Is the content original and human-written?
                <span className="plus">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>
              <div className="qa-a">
                <div className="qa-a-inner">
                  Always. Every piece is written by a real specialist, edited by a human, and checked for originality. You get content that is yours alone, never spun or scraped.
                </div>
              </div>
            </div>

            <div className={`qa ${openFaq === 2 ? 'open' : ''}`}>
              <button className="qa-q" onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}>
                Will it actually match our brand voice?
                <span className="plus">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>
              <div className="qa-a">
                <div className="qa-a-inner">
                  Yes. We build a short voice guide from your existing material and a quick kickoff, then every writer works to it. Most clients approve the first draft without changes.
                </div>
              </div>
            </div>

            <div className={`qa ${openFaq === 3 ? 'open' : ''}`}>
              <button className="qa-q" onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}>
                Do you handle SEO and keywords?
                <span className="plus">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>
              <div className="qa-a">
                <div className="qa-a-inner">
                  Search is built into the brief, from keyword targets to structure, headings, and internal links. Ask about our Content Cluster Strategy if you want a whole topic to rank, not just one page.
                </div>
              </div>
            </div>

            <div className={`qa ${openFaq === 4 ? 'open' : ''}`}>
              <button className="qa-q" onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}>
                What if I need revisions?
                <span className="plus">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>
              <div className="qa-a">
                <div className="qa-a-inner">
                  Revisions are part of the process, not an extra. We refine each piece until it is right for you, with clear rounds so nothing drags on.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bottom-cta">
        <div className="container">
          <div className="eyebrow">Free sample</div>
          <h2 style={{ marginTop: '14px' }}>
            Ready to Read Your Free Sample?
            <br />
            One Topic Is All We Need.
          </h2>
          <p>
            Send us one topic or keyword and we will write a sample on the house, so you can judge the quality before you spend a thing. No pressure, and genuinely useful either way.
          </p>
          <div className="cta-row">
            <a href="#lead" className="btn btn-primary">
              Get my free sample <span className="arrow">→</span>
            </a>
            <a href="tel:+441801333712" className="btn btn-outline-light">
              Call +44 (0) 1801 333 712
            </a>
          </div>
          <div className="reassure">
            <span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>{' '}
              Free, no pressure
            </span>
            <span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>{' '}
              100% original
            </span>
            <span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>{' '}
              Reply within one business day
            </span>
          </div>
        </div>
      </section>

    </>
  );
}
