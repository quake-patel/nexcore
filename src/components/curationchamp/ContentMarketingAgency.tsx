'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { logoBase64 } from './logo';
import './curationchamp.css';

export default function ContentMarketingAgency() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'strategy' | 'creation' | 'promo' | 'optimise'>('strategy');
  const [openFaq, setOpenFaq] = useState<number | null>(0); // Matches 'qa open' in index 0 of FAQ list
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

  const handleTabClick = (tab: 'strategy' | 'creation' | 'promo' | 'optimise') => {
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
            <div className="eyebrow">Content Marketing Agency</div>
            <h1>
              The Content Marketing Agency That Turns Words Into <span className="accent">Pipeline</span>.
            </h1>
            <p className="hero-sub">
              Writing is only half the job. We run the whole engine: strategy, creation, optimisation, promotion, and distribution, so your content reaches the right people at the right moment and turns attention into revenue. One partner, every channel, reporting you can actually use.
            </p>
            <div className="hero-cta-row">
              <a href="#engine" className="btn btn-primary">
                See the Engine <span className="arrow">→</span>
              </a>
              <a href="#lead" className="btn btn-ghost">Book a Free Call</a>
            </div>
            <div className="hero-meta">
              <div className="hero-meta-item">
                <span className="check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>{' '}
                One partner, every channel
              </div>
              <div className="hero-meta-item">
                <span className="check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>{' '}
                Reporting tied to revenue
              </div>
              <div className="hero-meta-item">
                <span className="check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>{' '}
                Fixed scope, no surprises
              </div>
              <div className="hero-meta-item">
                <span className="check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>{' '}
                Trusted by 200+ brands
              </div>
            </div>
          </div>

          <div className="hero-visual reveal" id="lead">
            <form className="hv-card hv-form" onSubmit={handleFormSubmit}>
              {!formSubmitted ? (
                <>
                  <div className="form-head">
                    <div className="form-eyebrow">Free strategy call</div>
                    <h3>Tell us about your business. We will build you a plan.</h3>
                    <p>Takes 30 seconds. No sales pressure. Walk away with at least three usable ideas.</p>
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
                      <span>What's your main goal?</span>
                      <select name="goal">
                        <option value="">Choose a goal</option>
                        <option>More organic traffic</option>
                        <option>More qualified leads</option>
                        <option>Build brand authority</option>
                        <option>A full content engine</option>
                        <option>Not sure yet</option>
                      </select>
                    </label>
                    <button type="submit" className="btn btn-primary form-submit">
                      Book my free call <span className="arrow">→</span>
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
                  <h3>Thanks. We will be in touch shortly.</h3>
                  <p>A strategist will review your details and reply within one business day to book your free call.</p>
                </div>
              )}
            </form>
            <div className="hv-card hv-float">
              <div className="stars">★★★★★</div>
              <div className="quote">"My visibility and authority climbed fast. The leads followed."</div>
              <div className="src">James P. · CEO, Okuneva Group</div>
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
            <div className="eyebrow">Why content marketing</div>
            <h2 style={{ marginTop: '14px' }}>Great content is wasted if the right people never see it.</h2>
            <p style={{ marginTop: '18px', color: 'var(--muted)', fontSize: '17px', lineHeight: '1.65' }}>
              The average buyer is drowning in content, yet they still reward the brands that consistently help them. That gap is your opening. Unlike paid ads that vanish the moment you stop spending, great content keeps working: it ranks, it gets shared, and it generates leads for months. Invest once, earn for years.
            </p>
            <div className="intro-points">
              <div className="ip">
                <div className="ic">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <circle cx="12" cy="12" r="6"/>
                    <circle cx="12" cy="12" r="2"/>
                  </svg>
                </div>
                <div>
                  <h4>Audience-first, always.</h4>
                  <p>We define exactly who we are trying to reach, then build everything around what makes them stop, read, and act.</p>
                </div>
              </div>
              <div className="ip">
                <div className="ic">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                  </svg>
                </div>
                <div>
                  <h4>A process, not guesswork.</h4>
                  <p>Every channel, format, and metric is mapped to a goal before we create a thing, so nothing is left to chance.</p>
                </div>
              </div>
              <div className="ip">
                <div className="ic">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18"/>
                    <path d="M7 14l4-4 3 3 5-6"/>
                  </svg>
                </div>
                <div>
                  <h4>Measured on what matters.</h4>
                  <p>We report on reach, rankings, leads, and pipeline in plain language, not a pile of vanity metrics you cannot use.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="intro-stats reveal">
            <div className="intro-stats-head">
              <div className="ish-eyebrow">Marketing by the numbers</div>
              <p>Marketing that drives revenue, not just views, across hundreds of engagements.</p>
              <div className="ish-sub">
                When the engine runs right, content stops being a cost centre and starts compounding. Here is what that looks like.
              </div>
            </div>
            <div className="intro-stats-grid">
              <div className="stat">
                <div className="n">
                  3.4<span className="unit">×</span>
                </div>
                <div className="l">More organic reach in six months</div>
              </div>
              <div className="stat">
                <div className="n">
                  212<span className="unit">%</span>
                </div>
                <div className="l">Lift in content velocity</div>
              </div>
              <div className="stat">
                <div className="n">
                  $42<span className="unit">M+</span>
                </div>
                <div className="l">Pipeline influenced for clients</div>
              </div>
              <div className="stat">
                <div className="n">
                  87<span className="unit">%</span>
                </div>
                <div className="l">More qualified leads</div>
              </div>
            </div>
            <div className="intro-stats-foot">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>
                <strong>Compounding by design.</strong> Campaigns stop the day you stop paying. Your content stays up and keeps converting.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ENGINE / TABS */}
      <section className="section packages" id="engine">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">The content marketing engine</div>
            <h2 style={{ marginTop: '14px' }}>Six Moving Parts, Working as One Machine Behind Your Growth</h2>
            <p>
              From the first idea to long-term upkeep, we own every stage so your content stays sharp, visible, and on message. Pick a stage below to see exactly what it covers.
            </p>
          </div>

          <div className="tablist cols-4" role="tablist">
            <button className={`tab ${activeTab === 'strategy' ? 'active' : ''}`} onClick={() => handleTabClick('strategy')} role="tab">
              <div className="tab-num">Stage 01</div>
              <div className="tab-ttl">Strategy</div>
              <div className="tab-sub">Goals, topics, channels</div>
            </button>
            <button className={`tab ${activeTab === 'creation' ? 'active' : ''}`} onClick={() => handleTabClick('creation')} role="tab">
              <div className="tab-num">Stage 02</div>
              <div className="tab-ttl">Creation</div>
              <div className="tab-sub">On-brand, on-strategy</div>
            </button>
            <button className={`tab ${activeTab === 'promo' ? 'active' : ''}`} onClick={() => handleTabClick('promo')} role="tab">
              <div className="tab-num">Stage 03 · Popular</div>
              <div className="tab-ttl">Promotion &amp; Distribution</div>
              <div className="tab-sub">Get it seen everywhere</div>
            </button>
            <button className={`tab ${activeTab === 'optimise' ? 'active' : ''}`} onClick={() => handleTabClick('optimise')} role="tab">
              <div className="tab-num">Stage 04</div>
              <div className="tab-ttl">Optimise &amp; Maintain</div>
              <div className="tab-sub">Keep it ranking</div>
            </button>
          </div>

          {/* STRATEGY */}
          <div className={`panel ${activeTab === 'strategy' ? 'active' : ''}`} data-panel="strategy">
            <div className="panel-body">
              <div className="ribbon">Where it starts</div>
              <h3 className="ph">Strategy</h3>
              <p className="lede">
                We start with your goals, then map the topics, channels, timing, and metrics that will actually move them. No content gets made until there is a clear plan tying every piece to an outcome you care about.
              </p>
              <div className="section-mini-title">What's included</div>
              <ul className="feat-list">
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  Audience and competitor research
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  A topic and channel plan tied to goals
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  An editorial calendar everyone can see
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  The metrics we will report on, agreed up front
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
                <p>Teams tired of publishing on instinct who want a clear, accountable plan before the work begins.</p>
              </div>
              <div className="panel-cta-row">
                <a href="#lead" className="btn btn-primary">Get a content plan →</a>
              </div>
            </div>
            <aside className="panel-side">
              <div className="ps-top">
                <div className="ps-tag">Stage 01</div>
                <div className="ps-kicker">STRATEGY</div>
              </div>
              <div>
                <div className="ps-head">
                  A plan before
                  <br />
                  a single word.
                </div>
                <p className="ps-lede">Every theme, channel, and metric maps to a goal, so nothing gets published on a hunch.</p>
              </div>
              <div className="ps-card">
                <h4>What you get</h4>
                <div className="ps-row">
                  <span className="k">Research</span>
                  <span className="v ok">● Included</span>
                </div>
                <div className="ps-row">
                  <span className="k">Topic &amp; channel plan</span>
                  <span className="v ok">● Included</span>
                </div>
                <div className="ps-row">
                  <span className="k">Editorial calendar</span>
                  <span className="v ok">● Shared</span>
                </div>
                <div className="ps-row">
                  <span className="k">Metrics</span>
                  <span className="v">Agreed up front</span>
                </div>
              </div>
              <p className="ps-foot">
                <strong>No guesswork.</strong> A clear strategy is the difference between busy and effective.
              </p>
            </aside>
          </div>

          {/* CREATION */}
          <div className={`panel ${activeTab === 'creation' ? 'active' : ''}`} data-panel="creation">
            <div className="panel-body">
              <div className="ribbon">On-brand, on-strategy</div>
              <h3 className="ph">Creation</h3>
              <p className="lede">
                Blogs, social posts, infographics, ebooks, and case studies, written and designed to fit the strategy and your brand. One team for the whole library, so your voice stays consistent everywhere.
              </p>
              <div className="section-mini-title">What's included</div>
              <ul className="feat-list">
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  Articles, web copy, social, and email
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  Ebooks, case studies, and lead magnets
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  Written by specialists, edited by humans
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  A consistent voice across every format
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
                <p>Brands that need a reliable production engine, not a freelancer they have to manage and chase.</p>
              </div>
              <div className="panel-cta-row">
                <Link href="/content-writing-agency" className="btn btn-primary">
                  Explore content writing →
                </Link>
              </div>
            </div>
            <aside className="panel-side">
              <div className="ps-top">
                <div className="ps-tag">Stage 02</div>
                <div className="ps-kicker">CREATION</div>
              </div>
              <div>
                <div className="ps-head">
                  Every format,
                  <br />
                  one voice.
                </div>
                <p className="ps-lede">From blogs to ebooks, made to fit the strategy and sound unmistakably like you.</p>
              </div>
              <div className="ps-card">
                <h4>What we produce</h4>
                <div className="ps-row">
                  <span className="k">Articles &amp; copy</span>
                  <span className="v ok">● Included</span>
                </div>
                <div className="ps-row">
                  <span className="k">Social &amp; email</span>
                  <span className="v ok">● Included</span>
                </div>
                <div className="ps-row">
                  <span className="k">Ebooks &amp; cases</span>
                  <span className="v ok">● Included</span>
                </div>
                <div className="ps-row">
                  <span className="k">Voice</span>
                  <span className="v">Consistent</span>
                </div>
              </div>
              <p className="ps-foot">
                <strong>Quality at scale.</strong> A full team behind every piece, not a single overstretched writer.
              </p>
            </aside>
          </div>

          {/* PROMOTION */}
          <div className={`panel ${activeTab === 'promo' ? 'active' : ''}`} data-panel="promo">
            <div className="panel-body">
              <div className="ribbon popular">★ Most Popular · Get it seen</div>
              <h3 className="ph">Promotion &amp; Distribution</h3>
              <p className="lede">
                A multi-channel push across paid, organic, PR, influencer, and email, so your best content never sits unseen. Then we syndicate and repurpose one strong piece into many, stretching every asset across the channels that convert.
              </p>
              <div className="section-mini-title">What's included</div>
              <ul className="feat-list">
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  Paid, organic, PR, influencer, and email reach
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  One asset repurposed into many formats
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  Syndication across the channels that convert
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  Reporting on reach, leads, and pipeline
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
                <p>Teams sitting on good content that nobody sees, who want every piece to earn its full reach.</p>
              </div>
              <div className="panel-cta-row">
                <a href="#lead" className="btn btn-primary">Get my content seen →</a>
              </div>
            </div>
            <aside className="panel-side">
              <div className="ps-top">
                <div className="ps-tag">Stage 03 · Most Popular</div>
                <div className="ps-kicker">PROMOTION</div>
              </div>
              <div>
                <div className="ps-head">
                  Make every
                  <br />
                  piece travel.
                </div>
                <p className="ps-lede">Great content nobody sees is wasted. We push it across every channel and repurpose it into many.</p>
              </div>
              <div className="ps-card">
                <h4>Channels we cover</h4>
                <div className="ps-row">
                  <span className="k">Organic &amp; SEO</span>
                  <span className="v ok">● Included</span>
                </div>
                <div className="ps-row">
                  <span className="k">Email &amp; social</span>
                  <span className="v ok">● Included</span>
                </div>
                <div className="ps-row">
                  <span className="k">PR &amp; influencer</span>
                  <span className="v ok">● Included</span>
                </div>
                <div className="ps-row">
                  <span className="k">Repurposing</span>
                  <span className="v">1 into many</span>
                </div>
              </div>
              <p className="ps-foot">
                <strong>More reach per asset.</strong> One strong piece becomes a dozen touchpoints across the funnel.
              </p>
            </aside>
          </div>

          {/* OPTIMISE */}
          <div className={`panel ${activeTab === 'optimise' ? 'active' : ''}`} data-panel="optimise">
            <div className="panel-body">
              <div className="ribbon">Keep it ranking</div>
              <h3 className="ph">Optimise &amp; Maintain</h3>
              <p className="lede">
                Keywords, meta tags, links, and headlines tuned for reach and click-through, then a schedule to refresh, update, and prune your library so older content keeps ranking instead of going stale.
              </p>
              <div className="section-mini-title">What's included</div>
              <ul className="feat-list">
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  On-page SEO and click-through tuning
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  Scheduled refreshes of older content
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  Pruning and consolidation to keep authority high
                </li>
                <li>
                  <span className="ck">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>{' '}
                  Monthly reporting in plain language
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
                <p>Brands with a growing library that want their best content to keep earning, not quietly decay.</p>
              </div>
              <div className="panel-cta-row">
                <a href="#lead" className="btn btn-primary">Audit my content →</a>
              </div>
            </div>
            <aside className="panel-side">
              <div className="ps-top">
                <div className="ps-tag">Stage 04</div>
                <div className="ps-kicker">OPTIMISE</div>
              </div>
              <div>
                <div className="ps-head">
                  Content that
                  <br />
                  keeps earning.
                </div>
                <p className="ps-lede">We tune and refresh on a schedule, so your library compounds instead of going stale.</p>
              </div>
              <div className="ps-card">
                <h4>Ongoing care</h4>
                <div className="ps-row">
                  <span className="k">On-page SEO</span>
                  <span className="v ok">● Tuned</span>
                </div>
                <div className="ps-row">
                  <span className="k">Refresh schedule</span>
                  <span className="v ok">● Included</span>
                </div>
                <div className="ps-row">
                  <span className="k">Pruning</span>
                  <span className="v ok">● Included</span>
                </div>
                <div className="ps-row">
                  <span className="k">Reporting</span>
                  <span className="v">Monthly</span>
                </div>
              </div>
              <p className="ps-foot">
                <strong>Nothing decays.</strong> Older pages get refreshed before they slip, so rankings hold and grow.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section className="section diff">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Why choose us</div>
            <h2 style={{ marginTop: '14px' }}>The Upside Goes Well Beyond Traffic</h2>
            <p>Partner with us and the wins compound, on your site, in your pipeline, and across your customer base. Here is what that looks like in practice.</p>
          </div>
          <div className="diff-grid">
            <div className="dcard">
              <span className="num">01</span>
              <div className="ic">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
                </svg>
              </div>
              <h3>Expand Your Reach.</h3>
              <p>Fresh content is the surest way to grow organic traffic, and organic traffic generates leads month after month for next to nothing.</p>
            </div>
            <div className="dcard">
              <span className="num">02</span>
              <div className="ic">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3>Convert Leads for Less.</h3>
              <p>Content is one of the cheapest ways to generate demand, far below the cost of paid ads, and it keeps converting after launch.</p>
            </div>
            <div className="dcard">
              <span className="num">03</span>
              <div className="ic">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3>Delight Your Customers.</h3>
              <p>A steady stream of original content grows your share of voice and keeps existing customers close, from helpful emails to fresh FAQs.</p>
            </div>
            <div className="dcard">
              <span className="num">04</span>
              <div className="ic">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" />
                  <path d="M7 14l4-4 3 3 5-6" />
                </svg>
              </div>
              <h3>Reporting Tied to Revenue.</h3>
              <p>We report on reach, rankings, leads, and pipeline in plain language, so you always know exactly what your content is returning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHT: CLUSTER STRATEGY */}
      <section className="section highlight">
        <div className="container">
          <div className="hl-card">
            <div className="hl-body">
              <div className="hl-tag">★ Pairs with every marketing engagement</div>
              <h2>Power the Engine With a Content Cluster Strategy</h2>
              <p>
                Promotion gets content seen. Clusters make it rank. We build a strong pillar page surrounded by focused supporting pieces, all linked so your whole topic ranks as one authority, giving your marketing engine a compounding foundation that paid channels can never match.
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
              Marketing should be accountable. We have always believed you should know what your content is for, where it is going, and what it returns. Every engine we run ties back to a number you care about. That is why our clients treat content as an investment, not a cost, and why they stay with us for years.
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
              <h2 style={{ marginTop: '14px' }}>Results Our Clients Talk About</h2>
              <p>Pricing is easy to compare on a spreadsheet. Whether the content actually moves the needle is what matters. Here is what clients say.</p>
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
                "A great content marketing partner. They created and distributed content tailored to my niche, and my visibility and authority climbed fast."
              </div>
              <div className="ppl">
                <div className="ava" style={{ background: 'linear-gradient(135deg,#7FB6E8,#0C609C)' }}>JP</div>
                <div>
                  <div className="name">James Philson</div>
                  <div className="when">CEO, Okuneva Group</div>
                </div>
              </div>
            </div>
            <div className="review">
              <div className="stars">★★★★★</div>
              <div className="body">
                "They are not just a content company, they are a marketing partner. Reliable, responsive, and always in step with my goals."
              </div>
              <div className="ppl">
                <div className="ava" style={{ background: 'linear-gradient(135deg,#FBB07A,#F26223)' }}>RA</div>
                <div>
                  <div className="name">Rosie Alarcon</div>
                  <div className="when">Office Manager, Schroeder Group</div>
                </div>
              </div>
            </div>
            <div className="review">
              <div className="stars">★★★★★</div>
              <div className="body">
                "Talented, professional, and always on time and on budget. Their content helped me pull in more leads and customers."
              </div>
              <div className="ppl">
                <div className="ava" style={{ background: 'linear-gradient(135deg,#a3b8d8,#13294B)' }}>WC</div>
                <div>
                  <div className="name">William Calhoun</div>
                  <div className="when">CFO, Glover LLC</div>
                </div>
              </div>
            </div>
            <div className="review">
              <div className="stars">★★★★★</div>
              <div className="body">
                "The reporting finally tied content to pipeline. For the first time I could see exactly what our marketing was returning."
              </div>
              <div className="ppl">
                <div className="ava" style={{ background: 'linear-gradient(135deg,#9AE0BA,#1F9A6A)' }}>GL</div>
                <div>
                  <div className="name">Gracie Leclaire</div>
                  <div className="when">Director, Wolff LLC</div>
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
            <h2 style={{ marginTop: '14px' }}>Questions Businesses Ask Before Choosing a Marketing Partner</h2>
            <p>Still wondering about something? Book a free call and we will walk you through it.</p>
            <div className="help-card">
              <h4>Question not answered here?</h4>
              <p>Ask us directly. No sales pressure, just clear answers on scope, channels, and reporting.</p>
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
                What is content marketing, really?
                <span className="plus">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>
              <div className="qa-a">
                <div className="qa-a-inner">
                  It is the practice of creating and sharing valuable, relevant content on a consistent basis to attract and keep a clearly defined audience, and ultimately to drive profitable action from them.
                </div>
              </div>
            </div>

            <div className={`qa ${openFaq === 1 ? 'open' : ''}`}>
              <button className="qa-q" onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}>
                What kinds of content do you produce?
                <span className="plus">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>
              <div className="qa-a">
                <div className="qa-a-inner">
                  Blog posts, articles, web copy, product descriptions, videos, infographics, ebooks, and more. The right mix depends on your audience and the message you want to land.
                </div>
              </div>
            </div>

            <div className={`qa ${openFaq === 2 ? 'open' : ''}`}>
              <button className="qa-q" onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}>
                Does my small business need an agency for this?
                <span className="plus">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>
              <div className="qa-a">
                <div className="qa-a-inner">
                  Some teams handle content in-house, but an agency brings specialist skills, industry insight, and dedicated resources, so you can stay focused on the business while the engine runs.
                </div>
              </div>
            </div>

            <div className={`qa ${openFaq === 3 ? 'open' : ''}`}>
              <button className="qa-q" onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}>
                How does it fit the customer journey?
                <span className="plus">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>
              <div className="qa-a">
                <div className="qa-a-inner">
                  We tailor content to every stage: awareness, consideration, and decision. Each piece answers the questions a buyer has at that moment, guiding them toward a purchase and a lasting relationship.
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
      <section className="bottom-cta">
        <div className="container">
          <div className="eyebrow">Let's talk</div>
          <h2 style={{ marginTop: '14px' }}>
            Let's Make Something Amazing Together.
            <br />
            Start With a Free Strategy Call.
          </h2>
          <p>
            Book a free strategy call and walk away with a clear plan and at least three ideas you can use, whether we work together or not. No pressure, no overselling, genuinely useful either way.
          </p>
          <div className="cta-row">
            <a href="#lead" className="btn btn-primary">
              Book my free call <span className="arrow">→</span>
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
              Three ideas to keep
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
