import type { Post } from './posts';
import { posts as staticPosts } from './posts';

export const LOCAL_POSTS_KEY = 'nexcore_custom_posts';
export const LOCAL_POSTS_INIT_KEY = 'nexcore_posts_initialized';

export type PostStatus = 'draft' | 'published' | 'scheduled';

export type LocalPost = Post & {
  id: string;
  createdAt: string;
  updatedAt?: string;
  isCustom: true;
  /** draft = hidden from public; published = live; scheduled = live after scheduledAt */
  status: PostStatus;
  /** ISO string — only used when status === 'scheduled' */
  scheduledAt?: string;
  /** SEO overrides — fall back to title / excerpt if empty */
  metaTitle?: string;
  metaDescription?: string;
};

// ── Helpers ─────────────────────────────────────────────────────────────────

export function getLocalPosts(): LocalPost[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_POSTS_KEY);
    const posts = raw ? (JSON.parse(raw) as LocalPost[]) : [];
    // Back-compat: old posts without status field default to published
    return posts.map((p) => ({ ...p, status: p.status ?? 'published' }));
  } catch {
    return [];
  }
}

export function getLocalPostById(id: string): LocalPost | undefined {
  return getLocalPosts().find((p) => p.id === id);
}

export function saveLocalPost(post: LocalPost): void {
  const all = getLocalPosts();
  const idx = all.findIndex((p) => p.id === post.id);
  const updated = { ...post, updatedAt: new Date().toISOString() };
  if (idx >= 0) all[idx] = updated;
  else all.unshift(updated);
  localStorage.setItem(LOCAL_POSTS_KEY, JSON.stringify(all));
}

export function deleteLocalPost(id: string): void {
  const filtered = getLocalPosts().filter((p) => p.id !== id);
  localStorage.setItem(LOCAL_POSTS_KEY, JSON.stringify(filtered));
}

/** Returns true if the post should be visible on the public site right now */
export function isLive(post: LocalPost): boolean {
  if (post.status === 'published') return true;
  if (post.status === 'scheduled' && post.scheduledAt) {
    return new Date(post.scheduledAt) <= new Date();
  }
  return false;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

/** Turn a title into a URL-safe slug */
export function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/** Human-readable status label + colour */
export const STATUS_META: Record<PostStatus, { label: string; color: string; bg: string }> = {
  published: { label: 'Published',  color: '#4ade80', bg: 'rgba(74,222,128,0.1)'  },
  draft:     { label: 'Draft',      color: '#94a3b8', bg: 'rgba(148,163,184,0.1)' },
  scheduled: { label: 'Scheduled',  color: '#fbbf24', bg: 'rgba(251,191,36,0.1)'  },
};

export function initializeLocalPosts(): void {
  if (typeof window === 'undefined') return;
  if (localStorage.getItem(LOCAL_POSTS_INIT_KEY)) return;

  const currentLocal = getLocalPosts();
  const existingSlugs = new Set(currentLocal.map(p => p.slug));

  const toAdd: LocalPost[] = [];
  staticPosts.forEach(post => {
    if (!existingSlugs.has(post.slug)) {
      toAdd.push({
        ...post,
        id: `static-${post.slug}`, // Stable ID for static posts
        createdAt: new Date().toISOString(),
        isCustom: true, // Treat as custom so it's editable
        status: 'published',
      });
    }
  });

  if (toAdd.length > 0) {
    localStorage.setItem(LOCAL_POSTS_KEY, JSON.stringify([...toAdd, ...currentLocal]));
  }
  localStorage.setItem(LOCAL_POSTS_INIT_KEY, 'true');
}
