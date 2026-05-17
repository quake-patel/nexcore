import Link from 'next/link';

const services = [
  {
    title: 'Custom Software Development',
    desc: 'Tailored enterprise software, SaaS platforms, and custom applications using secure, scalable full-stack technologies.',
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: 'SAAS & Cloud Solutions',
    desc: 'Architect and build scalable cloud-native SaaS platforms with microservices, secure deployment, and auto-scaling.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    title: 'eCommerce & API Development',
    desc: 'Build secure, high-performing eCommerce platforms and robust APIs for seamless integration and growth.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'AI/ML Development',
    desc: 'Transform your business with intelligent solutions, machine learning pipelines, and AI-driven automation.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    title: 'Web & Mobile Apps',
    desc: 'Build powerful, responsive web applications and native or cross-platform mobile apps for iOS and Android.',
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="2" y="2" width="9" height="9" rx="1" />
        <rect x="13" y="2" width="9" height="9" rx="1" />
        <rect x="2" y="13" width="9" height="9" rx="1" />
        <rect x="13" y="13" width="9" height="9" rx="1" />
      </svg>
    ),
  },
  {
    title: 'Dedicated Dev Teams',
    desc: 'Hire skilled developers to extend your team with flexible hourly, part-time, or full-time engagement models.',
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93A10 10 0 116.93 19.07" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83" />
      </svg>
    ),
  },
];

export default function ServicesSection() {
  return (
    <section id="services" style={{ background: 'var(--navy)' }}>
      <div className="section-inner">
        <p className="section-tag">What we do</p>
        <h2 className="section-title">
          Enterprise-grade services
          <br />
          for every stage of growth
        </h2>
        <p className="section-sub">
          From startups to Fortune 500s, we deliver technology solutions that
          are built to scale and designed to last.
        </p>
        <div className="services-grid">
          {services.map((svc) => (
            <div key={svc.title} className="service-card">
              <div className="svc-icon">{svc.icon}</div>
              <h3>{svc.title}</h3>
              <p>{svc.desc}</p>
              <Link href="/contact" className="svc-link">
                Learn more{' '}
                <svg viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
