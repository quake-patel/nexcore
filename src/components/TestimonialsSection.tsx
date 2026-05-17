const testimonials = [
  {
    initials: 'RK',
    name: 'Rohan Kapoor',
    role: 'CTO, ShopBridge India',
    quote: '"NexCore delivered our e-commerce platform three weeks ahead of schedule. The codebase is clean, the architecture scales beautifully, and the team communicated brilliantly throughout."',
  },
  {
    initials: 'AS',
    name: 'Anita Shah',
    role: 'VP Engineering, FinEdge',
    quote: '"Their cloud migration cut our infrastructure costs by 38% in the first quarter. More importantly, our uptime went from 99.1% to 99.98%. Exceptional work."',
  },
  {
    initials: 'MP',
    name: 'Marcus Petit',
    role: 'CEO, Logiflo Europe',
    quote: '"We\'ve worked with NexCore on four separate projects now. Every time, they bring a level of technical depth and genuine care that\'s rare to find in an IT partner."',
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" style={{ background: 'var(--navy)' }}>
      <div className="section-inner">
        <p className="section-tag">Client voices</p>
        <h2 className="section-title">Results speak louder</h2>
        <div className="testi-grid">
          {testimonials.map((t) => (
            <div key={t.name} className="testi-card">
              <div className="testi-stars">
                {[...Array(5)].map((_, i) => <div key={i} className="star" />)}
              </div>
              <blockquote>{t.quote}</blockquote>
              <div className="testi-author">
                <div className="testi-avatar">{t.initials}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
