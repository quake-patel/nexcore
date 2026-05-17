import Link from 'next/link';

const models = [
  {
    title: 'Hourly Model',
    price: 'Flexible',
    desc: 'Pay only for the hours worked on your project. Perfect for small tasks, maintenance, and ad-hoc updates.',
    features: ['No minimum commitment', 'Tracked hours', 'Pay-as-you-go', 'Agile scaling'],
  },
  {
    title: 'Part-Time Model',
    price: 'Popular',
    desc: 'Get a dedicated developer for 4 hours a day, 5 days a week. Ideal for medium projects and ongoing support.',
    features: ['80 hours/month', 'Dedicated resource', 'Daily reporting', 'Skype/Slack communication'],
  },
  {
    title: 'Full-Time Model',
    price: 'Best Value',
    desc: 'A dedicated developer working 8 hours a day, 5 days a week. Best for large-scale development and long-term projects.',
    features: ['160 hours/month', 'Complete control', 'Direct management', 'Seamless team extension'],
  },
];

export default function HiringModelsSection() {
  return (
    <section id="hiring-models" style={{ background: 'var(--navy2)' }}>
      <div className="section-inner">
        <p className="section-tag">Flexible Engagement</p>
        <h2 className="section-title">
          Hire Dedicated Developers
          <br />
          That Fit Your Needs
        </h2>
        <p className="section-sub">
          Choose the right engagement model to scale your team and accelerate your digital transformation.
        </p>

        <div className="services-grid" style={{ marginTop: '3rem' }}>
          {models.map((model) => (
            <div key={model.title} className="service-card" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0 }}>{model.title}</h3>
                <span className="admin-custom-badge" style={{ background: 'rgba(0,212,255,0.1)', color: 'var(--accent)', padding: '0.2rem 0.6rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 600 }}>
                  {model.price}
                </span>
              </div>
              <p style={{ marginBottom: '1.5rem' }}>{model.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {model.features.map((feature) => (
                  <li key={feature} style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--accent)' }}>✓</span> {feature}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: '2rem' }}>
                <Link href="/contact" className="btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
