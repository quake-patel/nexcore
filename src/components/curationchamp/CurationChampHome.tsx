'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { logoBase64 } from './logo';
import './curationchamp.css';

export default function CurationChampHome() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'curation' | 'writing' | 'marketing'>('curation');
  const [openFaq, setOpenFaq] = useState<number | null>(0); // Default first open matching index.html 'qa open'
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle intersection observer scroll reveal
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

    // Failsafe timeout
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

  const handleTabClick = (tab: 'curation' | 'writing' | 'marketing') => {
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
            <div className="eyebrow">Content marketing agency</div>
            <h1>
              Turn scattered ideas into content that <span className="accent">ranks</span> and <span className="blue">converts.</span>
            </h1>
            <p className="hero-sub">
              Curation, writing, and marketing under one roof, with fixed scope and predictable pricing. Get a free content sample on any topic to see our quality.
            </p>
            <div className="hero-cta-row">
              <a href="#services" className="btn btn-primary">
                View our services <span className="arrow">→</span>
              </a>
              <a href="#faq" className="btn btn-ghost">
                Read FAQs
              </a>
            </div>
            <div className="hero-meta">
              <div className="hero-meta-item">
                <span className="check">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                No contracts
              </div>
              <div className="hero-meta-item">
                <span className="check">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                Fixed price scope
              </div>
              <div className="hero-meta-item">
                <span className="check">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                Human specialists only
              </div>
            </div>
          </div>
          <div className="hero-visual reveal" id="lead">
            <form className="hv-card hv-form" onSubmit={handleFormSubmit}>
              {!formSubmitted ? (
                <>
                  <div className="form-head">
                    <div className="form-eyebrow">Free content sample</div>
                    <h3>Claim your free content sample</h3>
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
                      <span>What do you need most?</span>
                      <select name="service">
                        <option value="">Choose a service</option>
                        <option>Content Curation</option>
                        <option>Content Writing</option>
                        <option>Content Marketing</option>
                        <option>A full content engine</option>
                        <option>Not sure yet</option>
                      </select>
                    </label>
                    <button type="submit" className="btn btn-primary form-submit">
                      Send my topic <span className="arrow">→</span>
                    </button>
                    <div className="form-trust">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      Your details stay with us. We never share or sell contact data.
                    </div>
                  </div>
                </>
              ) : (
                <div className="form-thanks">
                  <div className="thanks-icon">
                    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3>Thanks. Your sample is on its way.</h3>
                  <p>A CurationChamp strategist will review your topic and reply within one business day with a free sample.</p>
                </div>
              )}
            </form>
            <div className="hv-card hv-float">
              <div className="stars">★★★★★</div>
              <div className="quote">"They are not just a content company, they are a content marketing partner."</div>
              <div className="src">Rosie A. · Client since 2021</div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="trust">
        <div className="container trust-inner">
          <div className="trust-label">Words that earned their keep for</div>
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
            <div className="eyebrow">Why this matters</div>
            <h2 style={{ marginTop: '14px' }}>Your content should be your hardest-working asset, not your biggest question mark.</h2>
            <p style={{ marginTop: '18px', color: 'var(--muted)', fontSize: '17px', lineHeight: '1.65' }}>
              Random blog posts and a quiet social feed will not move your pipeline. We believe you should know exactly what gets published, exactly what it costs, and exactly how it performs. Our process is strategy-led, our scope is fixed, and our team is built to make good content reliable instead of lucky.
            </p>
            <div className="intro-points">
              <div className="ip">
                <div className="ic">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <h4>One scope. One predictable invoice.</h4>
                  <p>You approve the plan before we write a word, and the price does not creep because you asked for one more round.</p>
                </div>
              </div>
              <div className="ip">
                <div className="ic">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 7h-9M14 17H5M17 3l4 4-4 4M7 21l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <h4>Built to your goals, not a template.</h4>
                  <p>Every brief maps to a business outcome, then we tailor format, tone, and cadence to fit your audience.</p>
                </div>
              </div>
              <div className="ip">
                <div className="ic">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 11l18-8-8 18-2-7-8-3z" />
                  </svg>
                </div>
                <div>
                  <h4>SEO baked in from the brief.</h4>
                  <p>Keywords, structure, and internal links are planned up front, so each piece is built to rank, not just to read well.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="intro-stats reveal">
            <div className="intro-stats-head">
              <div className="intro-stats-head-eyebrow">CurationChamp by the numbers</div>
              <p>Nine years of turning content into compounding growth, without the guesswork.</p>
              <div className="ish-sub">
                When your content just works, you stop worrying about your pipeline and start scaling it. Here is what doing it right looks like.
              </div>
            </div>
            <div className="intro-stats-grid">
              <div className="stat">
                <div className="n">
                  12,400<span className="unit">+</span>
                </div>
                <div className="l">Pieces written, curated, and published</div>
              </div>
              <div className="stat">
                <div className="n">
                  3.4<span className="unit">×</span>
                </div>
                <div className="l">Average lift in organic reach</div>
              </div>
              <div className="stat">
                <div className="n">
                  $42<span className="unit">M+</span>
                </div>
                <div className="l">Pipeline influenced for clients</div>
              </div>
              <div className="stat">
                <div className="n">
                  200<span className="unit">+</span>
                </div>
                <div className="l">Brands and founders served</div>
              </div>
            </div>
            <div className="intro-stats-foot">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>
                <strong>Real specialists, real editors.</strong> No spun drafts, no junior bylines. Every piece is researched, written, and double-checked by humans who know your space.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES / TABS */}
      <section className="section packages" id="services">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">What we do</div>
            <h2 style={{ marginTop: '14px' }}>Three Disciplines, One Team, A Voice That Stays Unmistakably Yours</h2>
            <p>
              Whether you need a curated content library, a steady stream of original writing, or a full marketing engine that gets it all seen, CurationChamp has a service built around your goals. Pick a discipline below to see exactly what is included.
            </p>
          </div>

          <div className="tablist" role="tablist">
            <button className={`tab ${activeTab === 'curation' ? 'active' : ''}`} onClick={() => handleTabClick('curation')} role="tab">
              <div className="tab-num">Service 01</div>
              <div className="tab-ttl">Content Curation</div>
              <div className="tab-sub">The right content, organised</div>
            </button>
            <button className={`tab ${activeTab === 'writing' ? 'active' : ''}`} onClick={() => handleTabClick('writing')} role="tab">
              <div className="tab-num">Service 02</div>
              <div className="tab-ttl">Content Writing</div>
              <div className="tab-sub">Original, on-brand, on time</div>
            </button>
            <button className={`tab ${activeTab === 'marketing' ? 'active' : ''}`} onClick={() => handleTabClick('marketing')} role="tab">
              <div className="tab-num">Service 03 · Popular</div>
              <div className="tab-ttl">Content Marketing</div>
              <div className="tab-sub">Strategy to distribution</div>
            </button>
          </div>

          {/* PANEL CURATION */}
          <div className={`panel ${activeTab === 'curation' ? 'active' : ''}`} data-panel="curation">
            <div className="panel-body">
              <div className="ribbon">Best for busy teams</div>
              <h3 className="ph">Content Curation</h3>
              <p className="lede">
                When your audience is drowning in noise, curation is how you become the signal. We hand-pick, organise, and frame the most relevant content in your space, so your brand becomes the trusted filter people come back to.
              </p>
              <div className="section-mini-title">What's included</div>
              <ul className="feat-list">
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>{' '}
                  Topic and source research tuned to your audience
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>{' '}
                  Editorial framing and original commentary in your voice
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>{' '}
                  Newsletter, social, and resource-hub ready formats
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>{' '}
                  A repeatable calendar so you never run dry
                </li>
              </ul>
              <div className="whofor">
                <div className="lbl">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>{' '}
                  Who this is for
                </div>
                <p>Teams that want to publish high-signal newsletters and feeds without spending hours digging for articles.</p>
              </div>
              <div className="panel-cta-row">
                <a href="#lead" className="btn btn-primary">
                  Get curation sample →
                </a>
              </div>
            </div>
            <aside className="panel-side">
              <div className="ps-top">
                <div className="ps-tag">Service 01</div>
                <div className="ps-kicker">CURATION</div>
              </div>
              <div>
                <div className="ps-head">
                  Become the
                  <br />
                  trusted filter.
                </div>
                <p className="ps-lede">We turn the firehose of your industry into a clear, credible feed your audience actually relies on.</p>
              </div>
              <div className="ps-card">
                <h4>What you get each month</h4>
                <div className="ps-row">
                  <span className="k">Curated picks</span>
                  <span className="v">Hand-selected</span>
                </div>
                <div className="ps-row">
                  <span className="k">Original commentary</span>
                  <span className="v ok">● Included</span>
                </div>
                <div className="ps-row">
                  <span className="k">Formats</span>
                  <span className="v">Social, email, hub</span>
                </div>
                <div className="ps-row">
                  <span className="k">Calendar</span>
                  <span className="v ok">● Always-on</span>
                </div>
              </div>
              <p className="ps-foot">
                <strong>Authority compounds.</strong> Show up consistently with genuinely useful picks and your brand becomes the one people check first.
              </p>
            </aside>
          </div>

          {/* PANEL WRITING */}
          <div className={`panel ${activeTab === 'writing' ? 'active' : ''}`} data-panel="writing">
            <div className="panel-body">
              <div className="ribbon">Original &amp; SEO-ready</div>
              <h3 className="ph">Content Writing</h3>
              <p className="lede">
                From SEO articles and web copy to ebooks and founder ghostwriting, our specialists craft content that earns attention, builds authority, and quietly turns readers into customers. You bring the vision, we make it land.
              </p>
              <div className="section-mini-title">What's included</div>
              <ul className="feat-list">
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>{' '}
                  SEO blogs, landing copy, ebooks, case studies, and email
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>{' '}
                  Category specialists, edited and fact-checked twice
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>{' '}
                  A full Content Cluster Strategy so whole topics rank
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>{' '}
                  First draft in five days, revisions until you love it
                </li>
              </ul>
              <div className="whofor">
                <div className="lbl">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>{' '}
                  Who this is for
                </div>
                <p>Brands that need a reliable stream of original, search-ready writing without hiring a whole in-house team.</p>
              </div>
              <div className="panel-cta-row">
                <Link href="/content-writing-agency" className="btn btn-primary">
                  Explore content writing →
                </Link>
              </div>
            </div>
            <aside className="panel-side">
              <div className="ps-top">
                <div className="ps-tag">Service 02</div>
                <div className="ps-kicker">WRITING</div>
              </div>
              <div>
                <div className="ps-head">
                  Impossible to
                  <br />
                  scroll past.
                </div>
                <p className="ps-lede">Every format your funnel needs, written by specialists and built to rank from the first draft.</p>
              </div>
              <div className="ps-card">
                <h4>By the numbers</h4>
                <div className="ps-row">
                  <span className="k">First draft</span>
                  <span className="v">5 days</span>
                </div>
                <div className="ps-row">
                  <span className="k">First-draft approval</span>
                  <span className="v">92%</span>
                </div>
                <div className="ps-row">
                  <span className="k">Cluster strategy</span>
                  <span className="v ok">● Included</span>
                </div>
                <div className="ps-row">
                  <span className="k">Plagiarism</span>
                  <span className="v ok">● Zero</span>
                </div>
              </div>
              <p className="ps-foot">
                <strong>Built to rank.</strong> Ask about our Content Cluster Strategy to make a whole topic rank, not just one page.
              </p>
            </aside>
          </div>

          {/* PANEL MARKETING */}
          <div className={`panel ${activeTab === 'marketing' ? 'active' : ''}`} data-panel="marketing">
            <div className="panel-body">
              <div className="ribbon popular">★ Most Popular · Full engine</div>
              <h3 className="ph">Content Marketing</h3>
              <p className="lede">
                Great content is wasted if the right people never see it. We run the whole engine: strategy, creation, optimisation, promotion, and distribution, so your content reaches the right people at the right moment and turns attention into pipeline.
              </p>
              <div className="section-mini-title">What's included</div>
              <ul className="feat-list">
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>{' '}
                  A strategy that ties every theme and channel to a goal
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>{' '}
                  Creation, optimisation, promotion, and distribution
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>{' '}
                  One asset repurposed across every channel that converts
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>{' '}
                  Reporting tied to reach, leads, and revenue
                </li>
              </ul>
              <div className="whofor">
                <div className="lbl">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>{' '}
                  Who this is for
                </div>
                <p>Growing businesses that want one partner owning the whole funnel and a single number that ties content to pipeline.</p>
              </div>
              <div className="panel-cta-row">
                <Link href="/content-marketing-agency" className="btn btn-primary">
                  Explore content marketing →
                </Link>
              </div>
            </div>
            <aside className="panel-side">
              <div className="ps-top">
                <div className="ps-tag">Service 03 · Most Popular</div>
                <div className="ps-kicker">MARKETING</div>
              </div>
              <div>
                <div className="ps-head">
                  Words into
                  <br />
                  pipeline.
                </div>
                <p className="ps-lede">Strategy, creation, promotion, and distribution, working as one machine behind your growth.</p>
              </div>
              <div className="ps-card">
                <h4>What's covered</h4>
                <div className="ps-row">
                  <span className="k">Strategy</span>
                  <span className="v ok">● Included</span>
                </div>
                <div className="ps-row">
                  <span className="k">Creation</span>
                  <span className="v ok">● Included</span>
                </div>
                <div className="ps-row">
                  <span className="k">Promotion</span>
                  <span className="v ok">● Multi-channel</span>
                </div>
                <div className="ps-row">
                  <span className="k">Reporting</span>
                  <span className="v">Tied to revenue</span>
                </div>
              </div>
              <p className="ps-foot">
                <strong>Compounding by design.</strong> Unlike ads that vanish when you stop paying, this content keeps ranking and converting for months.
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
            <h2 style={{ marginTop: '14px' }}>Why Brands Keep Their Content With Us Year After Year</h2>
            <p>Plenty of agencies can hand you words. The real question is whether the content performs, whether your voice stays consistent, and whether the team shows up. Here is what sets us apart.</p>
          </div>
          <div className="diff-grid">
            <div className="dcard">
              <span className="num">01</span>
              <div className="ic">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="6" x2="12" y2="12" />
                  <line x1="12" y1="12" x2="16" y2="14" />
                </svg>
              </div>
              <h3>Fixed Scope, Predictable Price.</h3>
              <p>You approve the plan and the number before we start. No surprise invoices because a project ran long or a round got added.</p>
            </div>
            <div className="dcard">
              <span className="num">02</span>
              <div className="ic">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2 4 5v6c0 5 3.4 9.5 8 11 4.6-1.5 8-6 8-11V5l-8-3z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <h3>Senior Craft, Start to Finish.</h3>
              <p>Your work is shaped by specialists who have shipped content in your space. No juniors hidden in the byline, no spun drafts.</p>
            </div>
            <div className="dcard">
              <span className="num">03</span>
              <div className="ic">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
                </svg>
              </div>
              <h3>SEO That Actually Ranks.</h3>
              <p>Search is built into every brief, and our Content Cluster Strategy lifts whole topics, not just a single page, up the rankings.</p>
            </div>
            <div className="dcard">
              <span className="num">04</span>
              <div className="ic">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3>One Voice, Every Channel.</h3>
              <p>Curation, writing, and marketing under one roof means your brand sounds like itself from first click to closed deal.</p>
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
              We started CurationChamp on a simple belief: businesses should never wonder what their content will cost, when it will land, or whether it will actually perform. Every engagement we offer is built around that promise. Clear scope, predictable pricing, and a team that treats your audience like our own. That has been the standard since day one.
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
              <h2 style={{ marginTop: '14px' }}>What Founders and Marketing Leads Say About Working With Us</h2>
              <p>Quality is easy to claim and hard to prove. Here is what clients say after the drafts land, the rankings climb, and the leads start to show up.</p>
            </div>
            <div className="google-card">
              <div className="google-logo" style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '18px', color: 'var(--navy-900)' }}>
                G<span style={{ color: '#EA4335' }}>o</span>
                <span style={{ color: 'var(--gold)' }}>o</span>gle
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
                "They are not just a content writing company, they are a content marketing partner. Reliable, responsive, and flexible. For anything content related, look no further."
              </div>
              <div className="ppl">
                <div className="ava" style={{ background: 'linear-gradient(135deg,#7FB6E8,#0C609C)' }}>
                  RA
                </div>
                <div>
                  <div className="name">Rosie Alarcon</div>
                  <div className="when">Office Manager, Schroeder Group</div>
                </div>
              </div>
            </div>
            <div className="review">
              <div className="stars">★★★★★</div>
              <div className="body">"Five years in and still the most reliable agency I have worked with. Skilled writers, on time, on budget, and content that genuinely ranks."</div>
              <div className="ppl">
                <div className="ava" style={{ background: 'linear-gradient(135deg,#FBB07A,#F26223)' }}>
                  VE
                </div>
                <div>
                  <div className="name">Viviana Erwin</div>
                  <div className="when">Founder, Casper Ltd</div>
                </div>
              </div>
            </div>
            <div className="review">
              <div className="stars">★★★★★</div>
              <div className="body">"Engaging, original, and perfectly on tone from the first draft. They captured the essence of every topic and exceeded what I thought was possible."</div>
              <div className="ppl">
                <div className="ava" style={{ background: 'linear-gradient(135deg,#a3b8d8,#13294B)' }}>
                  GL
                </div>
                <div>
                  <div className="name">Gracie Leclaire</div>
                  <div className="when">Director, Wolff LLC</div>
                </div>
              </div>
            </div>
            <div className="review">
              <div className="stars">★★★★★</div>
              <div className="body">"Our visibility and authority climbed fast. They created and distributed content tailored to our niche and the leads followed."</div>
              <div className="ppl">
                <div className="ava" style={{ background: 'linear-gradient(135deg,#9AE0BA,#1F9A6A)' }}>
                  JP
                </div>
                <div>
                  <div className="name">James Philson</div>
                  <div className="when">CEO, Okuneva Group</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHT: CLUSTER STRATEGY */}
      <section className="section highlight">
        <div className="container">
          <div className="hl-card">
            <div className="hl-body">
              <div className="hl-tag">★ Included with every writing engagement</div>
              <h2>Make Google Take You Seriously With a Content Cluster Strategy</h2>
              <p>
                One-off articles compete alone. We build clusters: a strong pillar page surrounded by focused supporting pieces, all linked together so your whole topic ranks as one authority. More ranking pages means more doors into your pipeline.
              </p>
              <Link href="/content-writing-agency#cluster" className="btn btn-primary">
                See how clusters work →
              </Link>
            </div>
            <div className="hl-visual">
              <svg width="180" height="150" viewBox="0 0 180 150" fill="none" aria-hidden="true">
                <rect x="60" y="8" width="60" height="30" rx="7" fill="#fff" />
                <rect x="10" y="108" width="44" height="30" rx="7" fill="rgba(255,255,255,.16)" stroke="rgba(255,255,255,.4)" />
                <rect x="68" y="108" width="44" height="30" rx="7" fill="rgba(255,255,255,.16)" stroke="rgba(255,255,255,.4)" />
                <rect x="126" y="108" width="44" height="30" rx="7" fill="rgba(255,255,255,.16)" stroke="rgba(255,255,255,.4)" />
                <path d="M90 38 V72 M32 108 V90 H148 V108 M90 90 V108" stroke="#F26223" strokeWidth="2.5" fill="none" />
                <circle cx="90" cy="90" r="3.5" fill="#F26223" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq" id="faq">
        <div className="container faq-grid">
          <div className="faq-side">
            <div className="eyebrow">FAQs</div>
            <h2 style={{ marginTop: '14px' }}>Questions Brands Ask Before Choosing a Content Partner</h2>
            <p>Real questions from founders and marketing leads weighing up their first, or fifth, content agency.</p>
            <div className="help-card">
              <h4>Question not answered here?</h4>
              <p>Ask us directly. No sales pressure, just clear answers on scope, timelines, and pricing.</p>
              <a href="tel:+441801333712" className="ph">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
                </svg>
                +44 (0) 1801 333 712
              </a>
            </div>
          </div>
          <div className="qlist">
            <div className={`qa ${openFaq === 0 ? 'open' : ''}`}>
              <button className="qa-q" onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}>
                How quickly can we get started?
                <span className="plus">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>
              <div className="qa-a">
                <div className="qa-a-inner">
                  Most clients kick off within a week. After a short call we send a clear plan, and once you approve it our team begins producing right away. Your first draft typically lands within five business days.
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
                Do I have to sign a long contract?
                <span className="plus">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>
              <div className="qa-a">
                <div className="qa-a-inner">
                  No. We start with a flexible engagement so you can feel the results first. Many clients move to a monthly partnership once they see the work, but it is always your call.
                </div>
              </div>
            </div>

            <div className={`qa ${openFaq === 3 ? 'open' : ''}`}>
              <button className="qa-q" onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}>
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

            <div className={`qa ${openFaq === 4 ? 'open' : ''}`}>
              <button className="qa-q" onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}>
                How do you measure success?
                <span className="plus">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>
              <div className="qa-a">
                <div className="qa-a-inner">
                  We agree on the metrics that matter to you up front, from organic traffic and rankings to qualified leads and pipeline, then report on them in plain language every month.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bottom-cta" id="cta">
        <div className="container">
          <div className="eyebrow">Let's talk</div>
          <h2 style={{ marginTop: '14px' }}>
            Not Sure Which Service Is Right for You?
            <br />
            Let's Figure It Out Together.
          </h2>
          <p>
            Tell us your goals, your audience, and how you handle content today, and we will give you an honest recommendation plus at least three ideas you can use, whether we work together or not. No pressure, no overselling.
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
              No sales pressure
            </span>
            <span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>{' '}
              Fixed price before you commit
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
