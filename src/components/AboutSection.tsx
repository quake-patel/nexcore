export default function AboutSection() {
  return (
    <section id="about" style={{ background: 'linear-gradient(180deg,var(--navy) 0%,var(--navy2) 100%)' }}>
      <div className="section-inner">
        <div className="about-grid">
          <div className="about-visual" aria-hidden="true">
            <div className="about-visual-content">
              <div className="av-card accent">
                <div className="av-num">500<small>+</small></div>
                <div className="av-label">Projects delivered</div>
              </div>
              <div className="av-card">
                <div className="av-num">120<small>+</small></div>
                <div className="av-label">Engineers &amp; designers</div>
              </div>
              <div className="av-card">
                <div className="av-num">40<small>+</small></div>
                <div className="av-label">Countries served</div>
              </div>
              <div className="av-card accent">
                <div className="av-num">14<small>yrs</small></div>
                <div className="av-label">In the industry</div>
              </div>
            </div>
          </div>
          <div className="about-text">
            <p className="section-tag">Who we are</p>
            <h2 className="section-title">
              We&apos;re builders.
              <br />
              Not just consultants.
            </h2>
            <p className="section-sub">
              Founded in 2010 in Ahmedabad, NexCore started as a small team of
              developers with a big idea: technology should empower businesses,
              not slow them down.
            </p>
            <div className="feat">
              <div className="feat-dot" />
              <div>
                <h4>Mission-driven engineering</h4>
                <p>Every line of code we write is purpose-built to solve a real business problem — not to add complexity.</p>
              </div>
            </div>
            <div className="feat">
              <div className="feat-dot" />
              <div>
                <h4>Long-term partnerships</h4>
                <p>98% of our clients return for follow-on work. We invest in understanding your domain as deeply as you do.</p>
              </div>
            </div>
            <div className="feat">
              <div className="feat-dot" />
              <div>
                <h4>Global reach, local presence</h4>
                <p>With delivery centres across India, Europe, and the US, we follow the sun to keep your projects moving.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
