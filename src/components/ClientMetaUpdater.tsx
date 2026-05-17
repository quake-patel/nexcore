'use client';

import { useEffect } from 'react';

export default function ClientMetaUpdater({ pageKey }: { pageKey: string }) {
  useEffect(() => {
    // Small delay to ensure Next.js has applied static metadata first
    const timer = setTimeout(() => {
      const raw = localStorage.getItem('nexcore_pages_metadata');
      if (raw) {
        const data = JSON.parse(raw);
        const pageMeta = data[pageKey];
        if (pageMeta) {
          if (pageMeta.title) document.title = pageMeta.title;
          if (pageMeta.description) {
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.setAttribute('content', pageMeta.description);
          }
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pageKey]);
  return null;
}
