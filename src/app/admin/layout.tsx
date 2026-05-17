import type { Metadata } from 'next';
import AdminAuthGate from '@/components/AdminAuthGate';

export const metadata: Metadata = {
  title: 'Admin — NexCore',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthGate>
      <div className="admin-shell">
        {/* Admin top bar */}
        <header className="admin-topbar">
          <div className="admin-topbar-inner">
            <span className="logo">
              <span>Nex</span>Core <span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: '0.85rem', marginLeft: '0.5rem' }}>Admin</span>
            </span>
            <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <a href="/admin" className="admin-nav-link">Dashboard</a>
              <a href="/admin/blog/new" className="admin-nav-link">New Post</a>
              <a href="/" className="admin-nav-link" target="_blank" rel="noreferrer">View Site ↗</a>
            </nav>
          </div>
        </header>
        <main className="admin-main">{children}</main>
      </div>
    </AdminAuthGate>
  );
}
