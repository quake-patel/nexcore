'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';

const navItems = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Process', href: '/process' },
  { label: 'Technologies', href: '/technologies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav>
      <Link href="/" className="logo">
        Nex<span>Core</span>
      </Link>
      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={pathname === item.href ? 'active' : ''}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <ThemeToggle />
        <Link href="/contact" className="nav-cta">
          Get Started
        </Link>
      </div>
    </nav>
  );
}
