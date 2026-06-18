'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

interface WrapperProps {
  children: React.ReactNode;
}

export default function CurationChampLayoutWrapper({ children }: WrapperProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="curationchamp-body">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
