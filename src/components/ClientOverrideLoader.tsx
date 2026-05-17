'use client';

import { useEffect, useState } from 'react';
import { getLocalPosts } from '@/lib/localPosts';
import CustomPostLoader from '@/components/CustomPostLoader';

export default function ClientOverrideLoader({ slug }: { slug: string }) {
  const [hasOverride] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!getLocalPosts().find((p) => p.slug === slug);
    }
    return false;
  });

  useEffect(() => {
    if (hasOverride) {
      // Hide server-rendered content to avoid duplication
      const serverContent = document.getElementById('server-post-content');
      if (serverContent) {
        serverContent.style.display = 'none';
      }
    }
  }, [hasOverride]);

  if (hasOverride) {
    return <CustomPostLoader slug={slug} />;
  }

  return null;
}
