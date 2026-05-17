const industries = [
  { name: 'Retail & Commerce', icon: '🛒' },
  { name: 'Healthcare & Medical', icon: '🏥' },
  { name: 'E-Learning & Education', icon: '🎓' },
  { name: 'Real Estate', icon: '🏢' },
  { name: 'Logistics & Distribution', icon: '🚚' },
  { name: 'Travel & Hospitality', icon: '✈️' },
  { name: 'Fintech & Finance', icon: '💰' },
  { name: 'Social Media & Entertainment', icon: '📱' },
];

export default function IndustriesSection() {
  return (
    <section id="industries" style={{ background: 'var(--navy)' }}>
      <div className="section-inner">
        <p className="section-tag">Expertise</p>
        <h2 className="section-title">
          Industries We Serve
        </h2>
        <p className="section-sub">
          We deliver tailored digital solutions across diverse industry verticals, solving real problems and driving growth.
        </p>

        <div className="blog-grid" style={{ marginTop: '3rem', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
          {industries.map((ind) => (
            <div key={ind.name} className="service-card" style={{ padding: '1.5rem', textAlign: 'center', background: 'var(--navy2)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{ind.icon}</div>
              <h3 style={{ fontSize: '1rem', margin: 0 }}>{ind.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
