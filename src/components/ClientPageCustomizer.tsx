'use client';

import React, { useState, useEffect } from 'react';
import { isPageCustomized, getPageLayout, type PageLayout } from '@/lib/builderLayouts';
import DynamicPageRenderer from '@/components/DynamicPageRenderer';
import ClientMetaUpdater from '@/components/ClientMetaUpdater';

interface ClientPageCustomizerProps {
  pageKey: string;
  children: React.ReactNode;
}

export default function ClientPageCustomizer({ pageKey, children }: ClientPageCustomizerProps) {
  const [mounted, setMounted] = useState(false);
  const [customLayout, setCustomLayout] = useState<PageLayout | null>(null);

  useEffect(() => {
    setMounted(true);
    if (isPageCustomized(pageKey)) {
      setCustomLayout(getPageLayout(pageKey));
    }
  }, [pageKey]);

  // Keep it SSR-friendly: render children initially to preserve SSR markup and SEO title/description
  if (!mounted) {
    return <>{children}</>;
  }

  // If the admin has saved a customized visual builder design, render that instead
  if (customLayout && customLayout.sections.length > 0) {
    return (
      <>
        <ClientMetaUpdater pageKey={pageKey} />
        <DynamicPageRenderer layout={customLayout} />
      </>
    );
  }

  // Fallback to original hardcoded code files
  return <>{children}</>;
}
