import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="logo" style={{ fontSize: '1.2rem' }}>
              Nex<span>Core</span>
            </Link>
            <p>Engineering digital futures since 2010. Headquartered in Ahmedabad with delivery teams across 3 continents.</p>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><Link href="/services">Software Dev</Link></li>
              <li><Link href="/services">Cloud &amp; Infra</Link></li>
              <li><Link href="/services">Cybersecurity</Link></li>
              <li><Link href="/services">Data &amp; AI</Link></li>
              <li><Link href="/services">DevOps</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About us</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="#">Careers</Link></li>
              <li><Link href="#">Case studies</Link></li>
              <li><Link href="#">Press</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><Link href="mailto:hello@nexcore.io">hello@nexcore.io</Link></li>
              <li><Link href="tel:+917940000000">+91 79 4000 0000</Link></li>
              <li><span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Ahmedabad, GJ</span></li>
              <li><span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>London, UK</span></li>
              <li><span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Austin, TX</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 NexCore IT Solutions Pvt Ltd. All rights reserved.</span>
          <div className="socials">
            <a className="social-btn" href="#" title="LinkedIn">in</a>
            <a className="social-btn" href="#" title="Twitter">𝕏</a>
            <a className="social-btn" href="#" title="GitHub">gh</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
