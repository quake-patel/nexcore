'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { getLocalPostById, type LocalPost } from '@/lib/localPosts';
import PostForm from '@/components/PostForm';

export default function EditBlogPostPage() {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : '';

  const [post, setPost]       = useState<LocalPost | null | undefined>(undefined);

  useEffect(() => {
    if (!id) { setPost(null); return; }
    const found = getLocalPostById(id);
    setPost(found ?? null);
  }, [id]);

  // Loading
  if (post === undefined) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--muted)', fontFamily: 'Syne, sans-serif' }}>Loading post…</div>
      </div>
    );
  }

  // Not found
  if (post === null) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <div style={{ fontSize: '2.5rem' }}>🔍</div>
        <h2 style={{ color: '#fff', fontFamily: 'Syne, sans-serif' }}>Post not found</h2>
        <p style={{ color: 'var(--muted)' }}>This post may have been deleted.</p>
        <a href="/admin" className="btn-outline">← Back to dashboard</a>
      </div>
    );
  }

  return <PostForm mode="edit" initialData={post} />;
}
