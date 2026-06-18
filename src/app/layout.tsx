import type { Metadata } from 'next';
import './globals.css';
import '@/components/curationchamp/curationchamp.css';
import CurationChampLayoutWrapper from '@/components/curationchamp/CurationChampLayoutWrapper';

export const metadata: Metadata = {
  title: {
    default: 'CurationChamp — Content Curation, Writing & Marketing Agency',
    template: '%s — CurationChamp',
  },
  description:
    'CurationChamp turns scattered ideas into content that ranks, reads, and converts. Curation, writing, and marketing under one roof, with fixed scope and predictable pricing. Get a free content sample.',
  openGraph: {
    title: 'CurationChamp — Content Curation, Writing & Marketing Agency',
    description:
      'CurationChamp turns scattered ideas into content that ranks, reads, and converts. Curation, writing, and marketing under one roof, with fixed scope and predictable pricing. Get a free content sample.',
    url: 'https://curationchamp.com',
    siteName: 'CurationChamp',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CurationChamp — Content Curation, Writing & Marketing Agency',
    description:
      'CurationChamp turns scattered ideas into content that ranks, reads, and converts. Curation, writing, and marketing under one roof, with fixed scope and predictable pricing. Get a free content sample.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Manrope:wght@200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CurationChampLayoutWrapper>{children}</CurationChampLayoutWrapper>
      </body>
    </html>
  );
}
