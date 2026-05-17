'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { posts as staticPosts } from '@/lib/posts';
import {
  getLocalPosts, saveLocalPost, deleteLocalPost, isLive, STATUS_META, initializeLocalPosts,
  type LocalPost, type PostStatus,
} from '@/lib/localPosts';
import { getPagesMetadata, savePageMetadata } from '@/lib/localPages';

const TAG_COLORS: Record<string, string> = {
  Cloud: '#00d4ff', 'AI & ML': '#06ffa5', Security: '#a78bfa',
  DevOps: '#00d4ff', Data: '#fbbf24',
};

function StatusBadge({ status, scheduledAt }: { status: PostStatus; scheduledAt?: string }) {
  const m = STATUS_META[status];
  return (
    <span
      style={{
        fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.07em', color: m.color, background: m.bg,
        padding: '0.2rem 0.6rem', borderRadius: '50px', whiteSpace: 'nowrap',
      }}
    >
      {m.label}
      {status === 'scheduled' && scheduledAt
        ? ` · ${new Date(scheduledAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`
        : ''}
    </span>
  );
}

export default function AdminDashboard() {
  const [customPosts, setCustomPosts] = useState<LocalPost[]>([]);
  const [deleteId, setDeleteId]       = useState<string | null>(null);
  const [toggling, setToggling]       = useState<string | null>(null);
  const [activeTab, setActiveTab]     = useState<'blog' | 'seo'>('blog');
  const [pagesMeta, setPagesMeta]     = useState<Record<string, { title: string; description: string }>>({
    home: { title: '', description: '' },
    about: { title: '', description: '' },
    services: { title: '', description: '' },
    process: { title: '', description: '' },
    technologies: { title: '', description: '' },
    contact: { title: '', description: '' },
    blog: { title: '', description: '' },
  });

  useEffect(() => {
    initializeLocalPosts();
    setCustomPosts(getLocalPosts());
  }, []);

  useEffect(() => {
    const data = getPagesMetadata();
    setPagesMeta((prev) => {
      const updated = { ...prev };
      Object.keys(data).forEach((key) => {
        updated[key] = {
          title: data[key].title || '',
          description: data[key].description || '',
        };
      });
      return updated;
    });
  }, []);
  function refresh() { setCustomPosts(getLocalPosts()); }

  function handleDelete(id: string) {
    deleteLocalPost(id); refresh(); setDeleteId(null);
  }

  function handleTogglePublish(post: LocalPost) {
    setToggling(post.id);
    const newStatus: PostStatus = post.status === 'published' ? 'draft' : 'published';
    saveLocalPost({ ...post, status: newStatus });
    refresh();
    setToggling(null);
  }

  function handleSavePageMeta(pageKey: string) {
    savePageMetadata(pageKey, pagesMeta[pageKey]);
    alert(`Saved metadata for ${pageKey}`);
  }

  const published  = customPosts.filter((p) => p.status === 'published');
  const drafts     = customPosts.filter((p) => p.status === 'draft');
  const scheduled  = customPosts.filter((p) => p.status === 'scheduled');
  const totalLive  = published.length + scheduled.filter(isLive).length;

  return (
    <div className="admin-page">
      {/* ── Header ── */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Blog Dashboard</h1>
          <p className="admin-page-sub">
            {staticPosts.length + customPosts.length} total posts ·{' '}
            <span style={{ color: '#4ade80' }}>{totalLive} live</span>
            {drafts.length > 0 && <> · <span style={{ color: '#94a3b8' }}>{drafts.length} draft{drafts.length !== 1 ? 's' : ''}</span></>}
            {scheduled.length > 0 && <> · <span style={{ color: '#fbbf24' }}>{scheduled.length} scheduled</span></>}
          </p>
        </div>
        <Link href="/admin/blog/new" className="btn-primary" style={{ border: 'none', cursor: 'pointer', display: 'inline-flex' }}>
          + New Post
        </Link>
      </div>
      {/* ── Tabs ── */}
      <div className="admin-tabs" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
        <button
          className={`admin-tab-btn ${activeTab === 'blog' ? 'active' : ''}`}
          onClick={() => setActiveTab('blog')}
          style={{ background: 'none', border: 'none', color: activeTab === 'blog' ? 'var(--accent)' : 'var(--muted)', padding: '0.5rem 1rem', cursor: 'pointer', borderBottom: activeTab === 'blog' ? '2px solid var(--accent)' : 'none', fontWeight: 600 }}
        >
          Blog Posts
        </button>
        <button
          className={`admin-tab-btn ${activeTab === 'seo' ? 'active' : ''}`}
          onClick={() => setActiveTab('seo')}
          style={{ background: 'none', border: 'none', color: activeTab === 'seo' ? 'var(--accent)' : 'var(--muted)', padding: '0.5rem 1rem', cursor: 'pointer', borderBottom: activeTab === 'seo' ? '2px solid var(--accent)' : 'none', fontWeight: 600 }}
        >
          Page SEO
        </button>
      </div>

      {activeTab === 'blog' && (
        <>
          {/* ── Stats bar ── */}
          <div className="admin-stats-bar">
            {[
              { label: 'Total Posts',  value: staticPosts.length + customPosts.length, color: '#fff' },
              { label: 'Published',    value: published.length,  color: '#4ade80' },
              { label: 'Drafts',       value: drafts.length,     color: '#94a3b8' },
              { label: 'Scheduled',    value: scheduled.length,  color: '#fbbf24' },
              { label: 'Built-in',     value: staticPosts.length, color: 'var(--accent)' },
            ].map((s) => (
              <div key={s.label} className="admin-stat-card">
                <div className="admin-stat-value" style={{ color: s.color }}>{s.value}</div>
                <div className="admin-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* ── Custom Posts ── */}
          {customPosts.length > 0 ? (
            <div className="admin-section">
              <h2 className="admin-section-title">Your Posts</h2>
              <div className="admin-post-list">
                {customPosts.map((post) => (
                  <div key={post.id} className={`admin-post-row ${post.status === 'draft' ? 'is-draft' : ''}`}>
                    <div className="admin-post-emoji">{post.emoji}</div>
                    <div className="admin-post-info">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                        <span className="admin-tag-pill" style={{ color: TAG_COLORS[post.tag] ?? 'var(--accent)' }}>
                          {post.tag}
                        </span>
                        <StatusBadge status={post.status} scheduledAt={post.scheduledAt} />
                        {isLive(post) && post.status === 'scheduled' && (
                          <span style={{ fontSize: '0.62rem', color: '#4ade80', background: 'rgba(74,222,128,0.08)', padding: '0.15rem 0.5rem', borderRadius: '50px', border: '1px solid rgba(74,222,128,0.2)' }}>
                            Now Live
                          </span>
                        )}
                      </div>
                      <h3 className="admin-post-title">{post.title}</h3>
                      <p className="admin-post-meta">
                        {post.date} · {post.read} · by {post.author.name}
                        {post.updatedAt && (
                          <span style={{ marginLeft: '0.6rem', opacity: 0.6 }}>
                            · updated {new Date(post.updatedAt).toLocaleDateString()}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="admin-post-actions">
                      {/* View on site */}
                      <Link href={`/blog/${post.slug}`} target="_blank" className="admin-action-btn" title="View on public site">
                        View ↗
                      </Link>
                      {/* Edit */}
                      <Link href={`/admin/blog/edit/${post.id}`} className="admin-action-btn" title="Edit post">
                        Edit ✏️
                      </Link>
                      {/* Quick toggle: publish/unpublish */}
                      <button
                        className={`admin-action-btn ${post.status === 'published' ? '' : 'success'}`}
                        onClick={() => handleTogglePublish(post)}
                        disabled={toggling === post.id}
                        title={post.status === 'published' ? 'Set to Draft' : 'Publish Now'}
                        style={post.status !== 'published' ? { color: '#4ade80', borderColor: 'rgba(74,222,128,0.3)' } : {}}
                      >
                        {post.status === 'published' ? 'Unpublish' : 'Publish'}
                      </button>
                      {/* Delete */}
                      {deleteId === post.id ? (
                        <>
                          <button className="admin-action-btn danger" onClick={() => handleDelete(post.id)}>Confirm</button>
                          <button className="admin-action-btn" onClick={() => setDeleteId(null)}>Cancel</button>
                        </>
                      ) : (
                        <button className="admin-action-btn" onClick={() => setDeleteId(post.id)}>Delete</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="admin-empty-state">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✍️</div>
              <h3 style={{ color: '#fff', fontFamily: 'Syne,sans-serif', marginBottom: '0.5rem' }}>No posts yet</h3>
              <p style={{ color: 'var(--muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                Start by creating your first blog post.
              </p>
              <Link href="/admin/blog/new" className="btn-primary" style={{ border: 'none', display: 'inline-flex' }}>
                Write your first post →
              </Link>
            </div>
          )}

          {/* Built-in posts are now merged into local storage and editable */}
        </>
      )}

      {activeTab === 'seo' && (
        <div className="admin-section">
          <h2 className="admin-section-title">Page SEO Settings</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {Object.keys(pagesMeta).map((pageKey) => (
              <div key={pageKey} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem' }}>
                <h3 style={{ fontFamily: 'Syne, sans-serif', textTransform: 'capitalize', marginBottom: '1rem', color: '#fff' }}>{pageKey} Page</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '0.4rem' }}>Meta Title</label>
                    <input
                      type="text"
                      className="cta-input"
                      style={{ width: '100%', minWidth: 'unset', borderRadius: '8px' }}
                      value={pagesMeta[pageKey].title}
                      onChange={(e) => setPagesMeta(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], title: e.target.value } }))}
                      placeholder={`Enter title for ${pageKey} page`}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '0.4rem' }}>Meta Description</label>
                    <textarea
                      className="cta-input"
                      style={{ width: '100%', minWidth: 'unset', borderRadius: '8px', resize: 'vertical' }}
                      rows={3}
                      value={pagesMeta[pageKey].description}
                      onChange={(e) => setPagesMeta(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], description: e.target.value } }))}
                      placeholder={`Enter description for ${pageKey} page`}
                    />
                  </div>
                  <button
                    className="btn-primary"
                    style={{ width: 'fit-content', border: 'none', padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                    onClick={() => handleSavePageMeta(pageKey)}
                  >
                    Save {pageKey} SEO
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
