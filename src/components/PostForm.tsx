'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  saveLocalPost,
  generateId,
  titleToSlug,
  type LocalPost,
  type PostStatus,
} from '@/lib/localPosts';
import type { Post } from '@/lib/posts';

// ── Constants ───────────────────────────────────────────────────────────────
const TAGS    = ['Cloud', 'AI & ML', 'Security', 'DevOps', 'Data'];
const EMOJIS  = ['☁️','🤖','🔐','⚙️','📊','🛡️','🚀','💡','🔬','🌐','🧠','🏗️','📱','🔧','🎯','📈'];
const IMG_CLS = [
  { label: 'Blue / Purple (Default)', value: '' },
  { label: 'Green / Cyan',            value: 'b2' },
  { label: 'Purple / Blue',           value: 'b3' },
];

// ── Block types ─────────────────────────────────────────────────────────────
type BlockType = 'h2' | 'h3' | 'p' | 'ul' | 'ol' | 'blockquote' | 'callout' | 'section' | 'table';
type Block = {
  id: string;
  type: BlockType;
  text?: string;
  items?: string[];
  title?: string;
  titleType?: 'h2' | 'h3';
  subBlocks?: Array<{ id: string; type: 'p' | 'ul' | 'ol'; text?: string; items?: string[] }>;
  headers?: string[];
  rows?: string[][];
};

const BLOCK_LABELS: Record<BlockType, string> = {
  h2: 'H2 Heading', h3: 'H3 Sub-heading', p: 'Paragraph',
  ul: 'Bullet List', ol: 'Numbered List', blockquote: 'Quote', callout: 'Callout Box',
  section: 'Compound Section', table: 'Table',
};

function makeBlock(type: BlockType): Block {
  const isList = type === 'ul' || type === 'ol';
  if (type === 'section') {
    return {
      id: Math.random().toString(36).slice(2),
      type,
      title: '',
      titleType: 'h2',
      subBlocks: [],
    };
  }
  if (type === 'table') {
    return {
      id: Math.random().toString(36).slice(2),
      type,
      headers: ['Column 1', 'Column 2'],
      rows: [['Cell 1', 'Cell 2'], ['Cell 3', 'Cell 4']],
    };
  }
  return {
    id: Math.random().toString(36).slice(2),
    type,
    text: isList ? undefined : '',
    items: isList ? [''] : undefined,
  };
}

function contentToBlocks(content: Post['content']): Block[] {
  return content.map((b) => ({
    id: Math.random().toString(36).slice(2),
    type: b.type as BlockType,
    text: b.text,
    items: b.items ? [...b.items] : undefined,
    title: b.title,
    titleType: b.titleType,
    subBlocks: b.subBlocks ? b.subBlocks.map((sb) => ({ id: Math.random().toString(36).slice(2), type: sb.type, text: sb.text, items: sb.items ? [...sb.items] : undefined })) : undefined,
    headers: b.headers ? [...b.headers] : undefined,
    rows: b.rows ? b.rows.map((r) => [...r]) : undefined,
  }));
}

// ── BlockEditor sub-component ────────────────────────────────────────────────
function BlockEditor({
  block, index, total, onChange, onDelete, onMove,
}: {
  block: Block; index: number; total: number;
  onChange: (b: Block) => void; onDelete: () => void; onMove: (dir: -1 | 1) => void;
}) {
  return (
    <div className="block-editor-item">
      <div className="block-editor-header">
        <span className="block-type-badge">{BLOCK_LABELS[block.type]}</span>
        <div style={{ display: 'flex', gap: '0.4rem', marginLeft: 'auto' }}>
          <button className="block-btn" onClick={() => onMove(-1)} disabled={index === 0} title="Move up">↑</button>
          <button className="block-btn" onClick={() => onMove(1)} disabled={index === total - 1} title="Move down">↓</button>
          <button className="block-btn danger" onClick={onDelete} title="Delete">✕</button>
        </div>
      </div>

      {(block.type === 'ul' || block.type === 'ol') ? (
        <div className="block-list-editor">
          {(block.items ?? []).map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ color: 'var(--accent)', fontSize: '0.8rem', paddingTop: '0.55rem' }}>
                {block.type === 'ul' ? '•' : `${i + 1}.`}
              </span>
              <input
                className="admin-input" style={{ flex: 1 }}
                placeholder={`Item ${i + 1}…`} value={item}
                onChange={(e) => {
                  const items = [...(block.items ?? [])]; items[i] = e.target.value;
                  onChange({ ...block, items });
                }}
              />
              <button className="block-btn danger" style={{ flexShrink: 0 }}
                onClick={() => {
                  const items = (block.items ?? []).filter((_, j) => j !== i);
                  onChange({ ...block, items: items.length ? items : [''] });
                }}
              >✕</button>
            </div>
          ))}
          <button className="add-item-btn"
            onClick={() => onChange({ ...block, items: [...(block.items ?? []), ''] })}>
            + Add item
          </button>
        </div>
      ) : block.type === 'table' ? (
        <div className="block-table-editor">
          <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {(block.headers ?? []).map((header, j) => (
                    <th key={j} style={{ padding: '0.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.2rem' }}>
                        <input
                          className="admin-input" style={{ minWidth: '80px' }}
                          value={header}
                          onChange={(e) => {
                            const headers = [...(block.headers ?? [])];
                            headers[j] = e.target.value;
                            onChange({ ...block, headers });
                          }}
                        />
                        <button className="block-btn danger" onClick={() => {
                          const headers = (block.headers ?? []).filter((_, k) => k !== j);
                          const rows = (block.rows ?? []).map((row) => row.filter((_, k) => k !== j));
                          onChange({ ...block, headers, rows });
                        }}>✕</button>
                      </div>
                    </th>
                  ))}
                  <th style={{ padding: '0.5rem' }}>
                    <button className="add-item-btn" style={{ width: 'auto' }} onClick={() => {
                      const headers = [...(block.headers ?? []), `Column ${(block.headers ?? []).length + 1}`];
                      const rows = (block.rows ?? []).map((row) => [...row, '']);
                      onChange({ ...block, headers, rows });
                    }}>+ Col</button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {(block.rows ?? []).map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: '0.5rem' }}>
                        <input
                          className="admin-input" style={{ minWidth: '80px' }}
                          value={cell}
                          onChange={(e) => {
                            const rows = [...(block.rows ?? [])];
                            const newRow = [...rows[i]];
                            newRow[j] = e.target.value;
                            rows[i] = newRow;
                            onChange({ ...block, rows });
                          }}
                        />
                      </td>
                    ))}
                    <td style={{ padding: '0.5rem' }}>
                      <button className="block-btn danger" onClick={() => {
                        const rows = (block.rows ?? []).filter((_, k) => k !== i);
                        onChange({ ...block, rows });
                      }}>✕</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="add-item-btn" onClick={() => {
            const newRow = Array((block.headers ?? []).length).fill('');
            const rows = [...(block.rows ?? []), newRow];
            onChange({ ...block, rows });
          }}>+ Add Row</button>
        </div>
      ) : block.type === 'section' ? (
        <div className="block-section-editor">
          <div className="admin-field" style={{ marginBottom: '1rem' }}>
            <label className="admin-label">Section Title</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <select
                className="admin-input" style={{ width: 'auto' }}
                value={block.titleType || 'h2'}
                onChange={(e) => onChange({ ...block, titleType: e.target.value as 'h2' | 'h3' })}
              >
                <option value="h2">H2</option>
                <option value="h3">H3</option>
              </select>
              <input
                className="admin-input" style={{ flex: 1 }}
                placeholder="Section title…" value={block.title ?? ''}
                onChange={(e) => onChange({ ...block, title: e.target.value })}
              />
            </div>
          </div>
          
          {/* Sub-blocks */}
          <div className="sub-blocks-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1rem' }}>
            {(block.subBlocks ?? []).map((sub, i) => (
              <div key={sub.id} style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(0,212,255,0.05)', borderRadius: '8px', padding: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--muted)', textTransform: 'uppercase' }}>
                    {sub.type === 'p' ? 'Paragraph' : sub.type === 'ul' ? 'Bullet List' : 'Numbered List'}
                  </span>
                  <button className="block-btn danger" onClick={() => {
                    const subBlocks = (block.subBlocks ?? []).filter((s) => s.id !== sub.id);
                    onChange({ ...block, subBlocks });
                  }}>✕</button>
                </div>
                
                {sub.type === 'p' ? (
                  <textarea
                    className="admin-textarea" rows={3}
                    placeholder="Paragraph text…" value={sub.text ?? ''}
                    onChange={(e) => {
                      const subBlocks = [...(block.subBlocks ?? [])];
                      subBlocks[i] = { ...sub, text: e.target.value };
                      onChange({ ...block, subBlocks });
                    }}
                  />
                ) : (
                  <div className="block-list-editor">
                    {(sub.items ?? []).map((item, j) => (
                      <div key={j} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span style={{ color: 'var(--accent)', fontSize: '0.8rem' }}>
                          {sub.type === 'ul' ? '•' : `${j + 1}.`}
                        </span>
                        <input
                          className="admin-input" style={{ flex: 1 }}
                          placeholder={`Item ${j + 1}…`} value={item}
                          onChange={(e) => {
                            const subBlocks = [...(block.subBlocks ?? [])];
                            const items = [...(sub.items ?? [])];
                            items[j] = e.target.value;
                            subBlocks[i] = { ...sub, items };
                            onChange({ ...block, subBlocks });
                          }}
                        />
                        <button className="block-btn danger" onClick={() => {
                          const subBlocks = [...(block.subBlocks ?? [])];
                          const items = (sub.items ?? []).filter((_, k) => k !== j);
                          subBlocks[i] = { ...sub, items: items.length ? items : [''] };
                          onChange({ ...block, subBlocks });
                        }}>✕</button>
                      </div>
                    ))}
                    <button className="add-item-btn" onClick={() => {
                      const subBlocks = [...(block.subBlocks ?? [])];
                      subBlocks[i] = { ...sub, items: [...(sub.items ?? []), ''] };
                      onChange({ ...block, subBlocks });
                    }}>+ Add item</button>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="add-sub-block-bar" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--muted)', display: 'flex', alignItems: 'center' }}>Add inside section:</span>
            <button className="add-block-btn" onClick={() => {
              const subBlocks = [...(block.subBlocks ?? []), { id: Math.random().toString(36).slice(2), type: 'p' as const, text: '' }];
              onChange({ ...block, subBlocks });
            }}>+ Paragraph</button>
            <button className="add-block-btn" onClick={() => {
              const subBlocks = [...(block.subBlocks ?? []), { id: Math.random().toString(36).slice(2), type: 'ul' as const, items: [''] }];
              onChange({ ...block, subBlocks });
            }}>+ Bullet List</button>
            <button className="add-block-btn" onClick={() => {
              const subBlocks = [...(block.subBlocks ?? []), { id: Math.random().toString(36).slice(2), type: 'ol' as const, items: [''] }];
              onChange({ ...block, subBlocks });
            }}>+ Numbered List</button>
          </div>
        </div>
      ) : (
        <textarea
          className="admin-textarea"
          placeholder={
            block.type === 'h2' ? 'Section heading…'
            : block.type === 'h3' ? 'Sub-section heading…'
            : block.type === 'blockquote' ? '"Quote text here…"'
            : block.type === 'callout' ? 'Key insight or tip…'
            : 'Write your paragraph…'
          }
          rows={block.type === 'p' ? 4 : 2}
          value={block.text ?? ''}
          onChange={(e) => onChange({ ...block, text: e.target.value })}
        />
      )}
    </div>
  );
}

// ── Main Props ───────────────────────────────────────────────────────────────
type Props = {
  mode: 'create' | 'edit';
  initialData?: LocalPost;
};

// ── PostForm ─────────────────────────────────────────────────────────────────
export default function PostForm({ mode, initialData }: Props) {
  const router = useRouter();
  const isEdit = mode === 'edit';

  // Basic fields
  const [title,    setTitle]    = useState(initialData?.title    ?? '');
  const [excerpt,  setExcerpt]  = useState(initialData?.excerpt  ?? '');
  const [tag,      setTag]      = useState(initialData?.tag      ?? TAGS[0]);
  const [emoji,    setEmoji]    = useState(initialData?.emoji    ?? EMOJIS[0]);
  const [imgCls,   setImgCls]   = useState(initialData?.imgCls   ?? '');
  const [readTime, setReadTime] = useState(initialData?.read     ?? '5 min read');

  // Slug state
  const [slug, setSlug] = useState(initialData?.slug ?? '');
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(!!initialData?.slug);

  // Author
  const [authorName,     setAuthorName]     = useState(initialData?.author.name     ?? '');
  const [authorRole,     setAuthorRole]     = useState(initialData?.author.role     ?? '');
  const [authorInitials, setAuthorInitials] = useState(initialData?.author.initials ?? '');

  // SEO meta
  const [metaTitle, setMetaTitle]           = useState(initialData?.metaTitle       ?? '');
  const [metaDescription, setMetaDesc]      = useState(initialData?.metaDescription ?? '');
  const [bannerUrl, setBannerUrl]           = useState(initialData?.bannerUrl       ?? '');
  const [thumbnailUrl, setThumbnailUrl]     = useState(initialData?.thumbnailUrl     ?? '');

  // Status
  const [status,      setStatus]      = useState<PostStatus>(initialData?.status ?? 'published');
  const [scheduledAt, setScheduledAt] = useState(
    initialData?.scheduledAt
      ? new Date(initialData.scheduledAt).toISOString().slice(0, 16) // "YYYY-MM-DDTHH:MM"
      : ''
  );

  // Content blocks
  const [blocks, setBlocks] = useState<Block[]>(
    initialData?.content ? contentToBlocks(initialData.content) : [makeBlock('p')]
  );

  // UI state
  const [saving, setSaving]   = useState(false);
  const [saved,  setSaved]    = useState(false);
  const [errors, setErrors]   = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');

  // Derived slug fallback if empty
  const displaySlug = slug || titleToSlug(title) || 'untitled-post';
  const wordCount = blocks.reduce((acc, b) => {
    let text = '';
    if (b.type === 'section') {
      text = (b.title ?? '') + ' ' + (b.subBlocks ?? []).map((sb) => sb.type === 'p' ? (sb.text ?? '') : (sb.items ?? []).join(' ')).join(' ');
    } else if (b.type === 'table') {
      text = (b.headers ?? []).join(' ') + ' ' + (b.rows ?? []).map((r) => r.join(' ')).join(' ');
    } else {
      const isList = b.type === 'ul' || b.type === 'ol';
      text = isList ? (b.items ?? []).join(' ') : (b.text ?? '');
    }
    return acc + text.split(/\s+/).filter(Boolean).length;
  }, 0);
  const estRead = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

  // Handler for title change to auto-update slug
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!isSlugManuallyEdited) {
      setSlug(titleToSlug(newTitle));
    }
  };

  // Block ops
  const addBlock = useCallback((type: BlockType) => {
    setBlocks((p) => [...p, makeBlock(type)]);
  }, []);
  const updateBlock = useCallback((id: string, b: Block) =>
    setBlocks((p) => p.map((x) => (x.id === id ? b : x))), []);
  const deleteBlock = useCallback((id: string) =>
    setBlocks((p) => p.filter((x) => x.id !== id)), []);
  const moveBlock = useCallback((i: number, dir: -1 | 1) => {
    setBlocks((p) => {
      const arr = [...p]; const t = i + dir;
      if (t < 0 || t >= arr.length) return arr;
      [arr[i], arr[t]] = [arr[t], arr[i]]; return arr;
    });
  }, []);

  // Validation
  function validate() {
    const e: string[] = [];
    if (!title.trim())          e.push('Title is required.');
    if (!excerpt.trim())        e.push('Excerpt is required.');
    if (!authorName.trim())     e.push('Author name is required.');
    if (!authorInitials.trim()) e.push('Author initials are required.');
    if (status === 'scheduled' && !scheduledAt) e.push('Scheduled date/time is required.');
    if (status === 'scheduled' && scheduledAt && new Date(scheduledAt) <= new Date())
      e.push('Scheduled date must be in the future.');
    return e;
  }

  // Save
  function handleSave(overrideStatus?: PostStatus) {
    const finalStatus = overrideStatus ?? status;
    const errs = validate();
    if (errs.length) { setErrors(errs); return; }
    setErrors([]); setSaving(true);

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const contentBlocks: Post['content'] = blocks
      .filter((b) => {
        if (b.type === 'section') {
          return (b.title ?? '').trim() || (b.subBlocks ?? []).length > 0;
        }
        if (b.type === 'table') {
          return (b.headers ?? []).length > 0 || (b.rows ?? []).length > 0;
        }
        const isList = b.type === 'ul' || b.type === 'ol';
        return isList
          ? (b.items ?? []).some((i) => i.trim())
          : (b.text ?? '').trim();
      })
      .map((b) => {
        if (b.type === 'section') {
          return {
            type: 'section',
            title: b.title?.trim(),
            titleType: b.titleType,
            subBlocks: (b.subBlocks ?? [])
              .filter((sub) => {
                const isList = sub.type === 'ul' || sub.type === 'ol';
                return isList
                  ? (sub.items ?? []).some((i) => i.trim())
                  : (sub.text ?? '').trim();
              })
              .map((sub) => {
                const isList = sub.type === 'ul' || sub.type === 'ol';
                return {
                  type: sub.type,
                  text: !isList ? (sub.text ?? '').trim() : undefined,
                  items: isList ? (sub.items ?? []).filter((i) => i.trim()) : undefined,
                };
              }),
          };
        }
        if (b.type === 'table') {
          return {
            type: 'table',
            headers: b.headers,
            rows: b.rows,
          };
        }
        const isList = b.type === 'ul' || b.type === 'ol';
        return {
          type: b.type,
          text: !isList ? (b.text ?? '').trim() : undefined,
          items: isList ? (b.items ?? []).filter((i) => i.trim()) : undefined,
        };
      });

    const post: LocalPost = {
      id:          initialData?.id ?? generateId(),
      slug:        displaySlug,
      title:       title.trim(),
      excerpt:     excerpt.trim(),
      tag, emoji, imgCls,
      date:        initialData?.date ?? dateStr,
      read:        readTime || estRead,
      author: {
        name:     authorName.trim(),
        role:     authorRole.trim() || 'Contributor',
        initials: authorInitials.trim().toUpperCase().slice(0, 2),
      },
      content:    contentBlocks,
      related:    initialData?.related ?? [],
      createdAt:  initialData?.createdAt ?? now.toISOString(),
      isCustom:   true,
      status:     finalStatus,
      scheduledAt: finalStatus === 'scheduled' ? new Date(scheduledAt).toISOString() : undefined,
      metaTitle:      metaTitle.trim() || undefined,
      metaDescription: metaDescription.trim() || undefined,
      bannerUrl:      bannerUrl.trim() || undefined,
      thumbnailUrl:   thumbnailUrl.trim() || undefined,
    };

    saveLocalPost(post);
    setSaving(false);
    setSaved(true);
    setTimeout(() => router.push('/admin'), 900);
  }

  return (
    <div className="admin-page">
      {/* ── Header ── */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">{isEdit ? 'Edit Post' : 'New Blog Post'}</h1>
          <p className="admin-page-sub">
            URL: <code className="slug-preview">/blog/{displaySlug}</code>
            {isEdit && initialData?.updatedAt && (
              <span style={{ marginLeft: '1rem', color: 'var(--muted)', fontSize: '0.75rem' }}>
                Last saved: {new Date(initialData.updatedAt).toLocaleString()}
              </span>
            )}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}>
          <button className="admin-action-btn" onClick={() => router.push('/admin')}>← Back</button>
          {status !== 'draft' && (
            <button className="admin-action-btn" onClick={() => handleSave('draft')} disabled={saving}>
              Save Draft
            </button>
          )}
          <button
            className="btn-primary"
            style={{ border: 'none', cursor: 'pointer', opacity: saving ? 0.7 : 1 }}
            onClick={() => handleSave()}
            disabled={saving}
          >
            {saving ? 'Saving…' : saved ? '✓ Saved!' : isEdit ? 'Update Post' : 'Publish Post'}
          </button>
        </div>
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div className="admin-error-box">
          {errors.map((e, i) => <p key={i}>⚠ {e}</p>)}
        </div>
      )}

      <div className="admin-editor-layout">
        {/* ── LEFT: CONTENT + SEO TABS ── */}
        <div>
          {/* Tab bar */}
          <div className="admin-tab-bar">
            <button
              className={`admin-tab ${activeTab === 'content' ? 'active' : ''}`}
              onClick={() => setActiveTab('content')}
            >
              ✏️ Content
            </button>
            <button
              className={`admin-tab ${activeTab === 'seo' ? 'active' : ''}`}
              onClick={() => setActiveTab('seo')}
            >
              🔍 SEO & Meta
            </button>
          </div>

          {/* ── CONTENT TAB ── */}
          {activeTab === 'content' && (
            <div className="admin-section">
              {blocks.length === 0 && (
                <div className="block-empty">No blocks yet. Add one below to start writing.</div>
              )}
              {blocks.map((block, i) => (
                <BlockEditor
                  key={block.id} block={block} index={i} total={blocks.length}
                  onChange={(b) => updateBlock(block.id, b)}
                  onDelete={() => deleteBlock(block.id)}
                  onMove={(dir) => moveBlock(i, dir)}
                />
              ))}
              <div className="add-block-bar">
                <span style={{ fontSize: '0.72rem', color: 'var(--muted)', marginRight: '0.3rem' }}>+ Add:</span>
                {(Object.entries(BLOCK_LABELS) as [BlockType, string][]).map(([type, label]) => (
                  <button key={type} className="add-block-btn" onClick={() => addBlock(type)}>{label}</button>
                ))}
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '1rem', textAlign: 'right' }}>
                ~{wordCount} words · estimated {estRead}
              </p>
            </div>
          )}

          {/* ── SEO TAB ── */}
          {activeTab === 'seo' && (
            <div className="admin-section">
              <div className="seo-preview-box">
                <div className="seo-preview-url">nexcore.io/blog/{displaySlug}</div>
                <div className="seo-preview-title">{metaTitle || title || 'Your post title'} — NexCore Blog</div>
                <div className="seo-preview-desc">{metaDescription || excerpt || 'Your post excerpt will appear here as the meta description.'}</div>
              </div>

              <div className="admin-field">
                <label className="admin-label">
                  Meta Title
                  <span className="admin-label-hint">Leave blank to use post title ({(metaTitle || title || '').length}/60)</span>
                </label>
                <input
                  className="admin-input"
                  placeholder={title || 'Your post title — NexCore Blog'}
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  maxLength={70}
                />
                <div className={`char-bar ${(metaTitle || title).length > 60 ? 'over' : ''}`}>
                  <div className="char-bar-fill" style={{ width: `${Math.min(100, ((metaTitle || title).length / 60) * 100)}%` }} />
                </div>
              </div>

              <div className="admin-field">
                <label className="admin-label">
                  Meta Description
                  <span className="admin-label-hint">Leave blank to use excerpt ({(metaDescription || excerpt || '').length}/160)</span>
                </label>
                <textarea
                  className="admin-textarea" rows={3}
                  placeholder={excerpt || 'A brief description for search engines…'}
                  value={metaDescription}
                  onChange={(e) => setMetaDesc(e.target.value)}
                  maxLength={200}
                />
                <div className={`char-bar ${(metaDescription || excerpt).length > 160 ? 'over' : ''}`}>
                  <div className="char-bar-fill" style={{ width: `${Math.min(100, ((metaDescription || excerpt).length / 160) * 100)}%` }} />
                </div>
              </div>

              <div className="admin-field">
                <label className="admin-label">Blog Banner URL</label>
                <input
                  className="admin-input"
                  placeholder="https://images.unsplash.com/... (Full width header)"
                  value={bannerUrl}
                  onChange={(e) => setBannerUrl(e.target.value)}
                />
                {bannerUrl && (
                  <div style={{ marginTop: '0.5rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={bannerUrl} alt="Banner Preview" style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
                  </div>
                )}
              </div>

              <div className="admin-field">
                <label className="admin-label">Blog Thumbnail URL</label>
                <input
                  className="admin-input"
                  placeholder="https://images.unsplash.com/... (Card image)"
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                />
                {thumbnailUrl && (
                  <div style={{ marginTop: '0.5rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)', width: '100px', height: '100px' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={thumbnailUrl} alt="Thumbnail Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </div>

              <div className="admin-field">
                <label className="admin-label">Canonical URL Slug</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>nexcore.io/blog/</span>
                  <input 
                    className="admin-input" 
                    value={slug} 
                    placeholder={displaySlug}
                    onChange={(e) => {
                      setSlug(titleToSlug(e.target.value));
                      setIsSlugManuallyEdited(true);
                    }}
                  />
                </div>
                <p style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '0.3rem' }}>
                  Auto-generated from title. Type here to customize.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <aside className="admin-editor-sidebar">

          {/* Publish settings */}
          <div className="admin-sidebar-widget">
            <h3 className="admin-section-title" style={{ fontSize: '0.82rem', marginBottom: '1.2rem' }}>
              Publish Settings
            </h3>

            {/* Status selector */}
            <div className="admin-field">
              <label className="admin-label">Status</label>
              <div className="status-selector">
                {(['published','draft','scheduled'] as PostStatus[]).map((s) => (
                  <button
                    key={s}
                    className={`status-btn ${status === s ? 'active' : ''}`}
                    data-status={s}
                    onClick={() => setStatus(s)}
                  >
                    {s === 'published' ? '🟢 Published' : s === 'draft' ? '⚫ Draft' : '🟡 Scheduled'}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '0.5rem', lineHeight: 1.5 }}>
                {status === 'published' && 'This post is live and visible on the public blog.'}
                {status === 'draft'     && 'Draft is saved but not visible on the public blog.'}
                {status === 'scheduled' && 'Will go live automatically at the date/time below.'}
              </p>
            </div>

            {/* Schedule date/time picker */}
            {status === 'scheduled' && (
              <div className="admin-field">
                <label className="admin-label">Publish Date & Time</label>
                <input
                  type="datetime-local"
                  className="admin-input"
                  value={scheduledAt}
                  min={new Date(Date.now() + 60000).toISOString().slice(0, 16)}
                  onChange={(e) => setScheduledAt(e.target.value)}
                />
                {scheduledAt && (
                  <p style={{ fontSize: '0.72rem', color: 'var(--accent)', marginTop: '0.4rem' }}>
                    Goes live: {new Date(scheduledAt).toLocaleString()}
                  </p>
                )}
              </div>
            )}

            {/* Quick actions */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <button
                className="btn-primary" style={{ border: 'none', cursor: 'pointer', flex: 1, justifyContent: 'center', opacity: saving ? 0.7 : 1 }}
                onClick={() => handleSave()} disabled={saving}
              >
                {saving ? 'Saving…' : saved ? '✓ Done!' : isEdit ? 'Update' : 'Publish'}
              </button>
              {status !== 'draft' && (
                <button className="admin-action-btn" style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => handleSave('draft')} disabled={saving}>
                  Save Draft
                </button>
              )}
            </div>
          </div>

          {/* Post Details */}
          <div className="admin-sidebar-widget">
            <h3 className="admin-section-title" style={{ fontSize: '0.82rem' }}>Post Details</h3>

            <div className="admin-field">
              <label className="admin-label">Title *</label>
              <input className="admin-input" placeholder="Your post title…" value={title} onChange={(e) => handleTitleChange(e.target.value)} />
            </div>

            <div className="admin-field">
              <label className="admin-label">Excerpt *</label>
              <textarea className="admin-textarea" rows={3} placeholder="One-two sentence summary…" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
            </div>

            <div className="admin-field">
              <label className="admin-label">Category</label>
              <select className="admin-input" value={tag} onChange={(e) => setTag(e.target.value)}>
                {TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div className="admin-field-row">
              <div className="admin-field" style={{ flex: 1 }}>
                <label className="admin-label">Emoji</label>
                <select className="admin-input" value={emoji} onChange={(e) => setEmoji(e.target.value)}>
                  {EMOJIS.map((e) => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
              <div className="admin-field" style={{ flex: 1 }}>
                <label className="admin-label">Card Colour</label>
                <select className="admin-input" value={imgCls} onChange={(e) => setImgCls(e.target.value)}>
                  {IMG_CLS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
            </div>

            <div className="admin-field">
              <label className="admin-label">
                Read time
                <span className="admin-label-hint">auto: {estRead}</span>
              </label>
              <input className="admin-input" placeholder={estRead} value={readTime} onChange={(e) => setReadTime(e.target.value)} />
            </div>
          </div>

          {/* Author */}
          <div className="admin-sidebar-widget">
            <h3 className="admin-section-title" style={{ fontSize: '0.82rem' }}>Author</h3>

            <div className="admin-field">
              <label className="admin-label">Full Name *</label>
              <input className="admin-input" placeholder="e.g. Arjun Mehta" value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-label">Role / Title</label>
              <input className="admin-input" placeholder="e.g. Cloud Architect" value={authorRole} onChange={(e) => setAuthorRole(e.target.value)} />
            </div>
            <div className="admin-field">
              <label className="admin-label">Initials * <span className="admin-label-hint">max 2 chars</span></label>
              <input className="admin-input" placeholder="e.g. AM" maxLength={2} value={authorInitials} onChange={(e) => setAuthorInitials(e.target.value)} />
            </div>

            {authorInitials && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.7rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                <div className="testi-avatar" style={{ width: 38, height: 38, fontSize: '0.75rem' }}>
                  {authorInitials.toUpperCase().slice(0, 2)}
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 500 }}>{authorName || 'Author Name'}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{authorRole || 'Role'}</div>
                </div>
              </div>
            )}
          </div>

          {/* Live preview card */}
          <div className="admin-sidebar-widget">
            <h3 className="admin-section-title" style={{ fontSize: '0.82rem' }}>Card Preview</h3>
            <div className="blog-card" style={{ pointerEvents: 'none', marginTop: '0.5rem' }}>
              <div className={`blog-img ${imgCls}`}>{emoji}</div>
              <div className="blog-body">
                <span className="blog-tag">{tag}</span>
                <h3 style={{ marginTop: '0.4rem' }}>{title || 'Your post title…'}</h3>
                <p style={{ fontSize: '0.82rem' }}>{excerpt || 'Your excerpt will appear here…'}</p>
                <div className="blog-meta" style={{ marginTop: '0.8rem' }}>
                  <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span>·</span>
                  <span>{readTime || estRead}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
