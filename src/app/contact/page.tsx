import type { Metadata } from 'next';
import ClientMetaUpdater from '@/components/ClientMetaUpdater';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with NexCore. Tell us about your project and we\'ll respond within one business day.',
  openGraph: {
    title: 'Contact Us — NexCore IT Solutions',
    description: 'Get in touch with NexCore. Tell us about your project and we\'ll respond within one business day.',
  },
};

export default function ContactPage() {
  return (
    <>
      <ClientMetaUpdater pageKey="contact" />
      <div className="page-hero">
        <div className="page-hero-inner">
          <p className="section-tag">Get in touch</p>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)' }}>
            Let&apos;s build something<br />extraordinary
          </h1>
          <p className="section-sub">
            Tell us about your project and we&apos;ll get back to you within
            one business day.
          </p>
        </div>
      </div>

      <section style={{ background: 'var(--navy2)' }}>
        <div className="section-inner">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
            {/* Contact form */}
            <div>
              <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>
                Send us a message
              </h2>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.4rem', fontWeight: 500 }}>
                      First name
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      className="cta-input"
                      style={{ width: '100%', minWidth: 'unset', borderRadius: '10px' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.4rem', fontWeight: 500 }}>
                      Last name
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="cta-input"
                      style={{ width: '100%', minWidth: 'unset', borderRadius: '10px' }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.4rem', fontWeight: 500 }}>
                    Work email
                  </label>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    className="cta-input"
                    style={{ width: '100%', minWidth: 'unset', borderRadius: '10px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.4rem', fontWeight: 500 }}>
                    Company
                  </label>
                  <input
                    type="text"
                    placeholder="Your company name"
                    className="cta-input"
                    style={{ width: '100%', minWidth: 'unset', borderRadius: '10px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.4rem', fontWeight: 500 }}>
                    Tell us about your project
                  </label>
                  <textarea
                    placeholder="Describe your project, goals, and timeline..."
                    rows={5}
                    className="cta-input"
                    style={{ width: '100%', minWidth: 'unset', borderRadius: '10px', resize: 'vertical' }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ border: 'none', cursor: 'pointer', width: 'fit-content' }}
                >
                  Send message →
                </button>
              </form>
            </div>

            {/* Contact info */}
            <div>
              <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>
                Our offices
              </h2>
              {[
                { city: 'Ahmedabad', country: 'India (HQ)', address: '7th Floor, GIFT One Tower, GIFT City, Gandhinagar, GJ 382355', phone: '+91 79 4000 0000', email: 'india@nexcore.io' },
                { city: 'London', country: 'United Kingdom', address: '1 Canada Square, Canary Wharf, London, E14 5AB', phone: '+44 20 7946 0958', email: 'uk@nexcore.io' },
                { city: 'Austin', country: 'United States', address: '500 W 2nd St, Suite 1900, Austin, TX 78701', phone: '+1 512 900 0000', email: 'us@nexcore.io' },
              ].map((office) => (
                <div
                  key={office.city}
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    marginBottom: '1.2rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                    <div>
                      <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#fff', fontSize: '1rem' }}>{office.city}</h3>
                      <span style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 500 }}>{office.country}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '0.8rem' }}>{office.address}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <a href={`tel:${office.phone.replace(/\s/g, '')}`} style={{ fontSize: '0.84rem', color: 'var(--muted)', textDecoration: 'none' }}>{office.phone}</a>
                    <a href={`mailto:${office.email}`} style={{ fontSize: '0.84rem', color: 'var(--accent)', textDecoration: 'none' }}>{office.email}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
