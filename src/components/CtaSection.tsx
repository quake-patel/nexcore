export default function CtaSection() {
  return (
    <section id="contact" style={{ padding: '5rem 5% 5rem' }}>
      <div className="cta-box">
        <h2>Ready to build something extraordinary?</h2>
        <p>Tell us about your project and we&apos;ll get back to you within one business day.</p>
        <div className="cta-form">
          <input
            className="cta-input"
            type="email"
            placeholder="Your work email"
          />
          <a href="/contact" className="btn-primary">
            Start a conversation →
          </a>
        </div>
      </div>
    </section>
  );
}
