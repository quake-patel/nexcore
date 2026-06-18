'use client';

import React, { use, useState, useEffect } from 'react';
import { isPageCustomized, getPageLayout, type PageLayout } from '@/lib/builderLayouts';
import DynamicPageRenderer from '@/components/DynamicPageRenderer';
import ClientMetaUpdater from '@/components/ClientMetaUpdater';
import Link from 'next/link';

interface CustomPageProps {
  params: Promise<{
    customPage: string;
  }>;
}

export default function CustomPage({ params }: CustomPageProps) {
  const { customPage } = use(params);
  const [mounted, setMounted] = useState(false);
  const [layout, setLayout] = useState<PageLayout | null>(null);

  useEffect(() => {
    setMounted(true);
    if (isPageCustomized(customPage)) {
      setLayout(getPageLayout(customPage));
    }
  }, [customPage]);

  // SSR safety fallbacks to avoid hydration mismatches
  if (!mounted) {
    return <div className="min-h-screen bg-navy" />;
  }

  // Render the visually customized builder design
  if (layout && layout.sections.length > 0) {
    return (
      <>
        <ClientMetaUpdater pageKey={customPage} />
        <DynamicPageRenderer layout={layout} />
      </>
    );
  }

  // Graceful visual 404 if no page layout is defined in localStorage
  return (
    <div className="min-h-screen bg-navy text-text flex flex-col items-center justify-center p-6 text-center font-manrope relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[30%] left-[30%] w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px]" />
      </div>
      
      <div className="max-w-md z-10 relative flex flex-col items-center gap-4">
        <h1 className="text-7xl font-extrabold text-accent font-sora tracking-tight leading-none">404</h1>
        <h2 className="text-xl font-bold text-heading font-sora mt-2">Custom Page Not Found</h2>
        <p className="text-xs text-muted max-w-xs leading-relaxed">
          The route <code className="text-accent font-mono bg-white/5 px-2 py-0.5 rounded text-[10px]">/{customPage}</code> has not been visually designed or published inside the NexCore Builder dashboard yet.
        </p>
        <div className="flex gap-4 mt-6">
          <Link 
            href="/" 
            className="px-6 py-3 rounded-full bg-accent text-navy font-sora font-semibold text-xs transition-opacity hover:opacity-90 shadow-lg shadow-accent/15"
          >
            Return Home
          </Link>
          <Link 
            href="/admin/builder" 
            className="px-6 py-3 rounded-full border border-border bg-subtle-bg hover:bg-border/20 text-heading font-sora font-semibold text-xs transition-all"
          >
            Open Live Builder
          </Link>
        </div>
      </div>
    </div>
  );
}
