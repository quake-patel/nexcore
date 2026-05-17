'use client';

import { useState, useEffect, type ReactNode } from 'react';

const ADMIN_PASSWORD = 'nexcore2025'; // Change this in production

export default function AdminAuthGate({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const ok = sessionStorage.getItem('nexcore_admin') === 'ok';
    setAuthed(ok);
    setChecked(true);
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (input === ADMIN_PASSWORD) {
      sessionStorage.setItem('nexcore_admin', 'ok');
      setAuthed(true);
      setError('');
    } else {
      setError('Incorrect password. Try again.');
      setInput('');
    }
  }

  if (!checked) return null;

  if (!authed) {
    return (
      <div className="admin-gate">
        <div className="admin-gate-card">
          <div className="admin-gate-logo">
            <span style={{ color: 'var(--accent)' }}>Nex</span>Core
          </div>
          <p className="admin-gate-sub">Admin Dashboard</p>
          <form onSubmit={handleLogin} className="admin-gate-form">
            <label htmlFor="admin-pw" className="admin-label">Password</label>
            <input
              id="admin-pw"
              type="password"
              autoFocus
              autoComplete="current-password"
              className="admin-input"
              placeholder="Enter admin password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            {error && <p className="admin-error">{error}</p>}
            <button type="submit" className="btn-primary admin-submit">
              Sign in →
            </button>
          </form>
          <p className="admin-hint">Hint: nexcore2025</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
